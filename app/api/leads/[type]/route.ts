import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { getDb } from "@/lib/db";
import type { Prisma } from "@/lib/generated/prisma/client";
import { hashIp, maskMobile, maskPan } from "@/lib/hash";
import { notify } from "@/lib/notify";
import { rateLimit } from "@/lib/rate-limit";
import { newRefCode } from "@/lib/refcode";
import {
  attributionSchema,
  CONSENT_TEXT_VERSION,
  leadSchemas,
  type LeadTypeKey,
} from "@/lib/schemas";
import { leadWhatsappUrl } from "@/lib/whatsapp";

/**
 * POST /api/leads/[type]
 * Body: { payload: <form fields>, attribution?: {...}, turnstileToken?: string, website?: string }
 * → { ok: true, refCode, whatsappUrl }
 *
 * Capture + human handoff only: no approval, no routing, no scoring.
 * The refCode and WhatsApp URL are generated server-side — the client's
 * values are never trusted.
 */

/** URL segment → lead type (accepts kebab and snake aliases). */
const TYPE_ALIASES: Record<string, LeadTypeKey> = {
  apply: "quick_apply",
  "quick-apply": "quick_apply",
  quick_apply: "quick_apply",
  "personal-loan": "personal_loan",
  personal_loan: "personal_loan",
  "credit-score": "credit_score",
  credit_score: "credit_score",
  partner: "partner",
  contact: "contact",
};

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "0.0.0.0";
}

async function verifyTurnstile(
  token: string | undefined,
  ip: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // captcha not enabled
  if (!token) return false;
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token, remoteip: ip }),
      },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return true; // fail open — captcha outage must not block borrowers
  }
}

/** Render the notification email body. Full fields — this goes to the
 *  lead owner's inbox, not to logs. */
function notificationText(
  type: LeadTypeKey,
  refCode: string,
  payload: Record<string, unknown>,
  whatsappUrl: string,
): string {
  const lines = Object.entries(payload)
    .filter(([k]) => k !== "consent")
    .map(([k, v]) => `${k}: ${String(v)}`);
  return [
    `New ${type.replace("_", " ")} lead`,
    `Reference: ${refCode}`,
    "",
    ...lines,
    "",
    `Reply on WhatsApp: ${whatsappUrl}`,
    `Received: ${new Date().toISOString()}`,
  ].join("\n");
}

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ type: string }> },
) {
  const { type: rawType } = await ctx.params;
  const type = TYPE_ALIASES[rawType];
  if (!type) {
    return NextResponse.json(
      { ok: false, error: "Unknown lead type." },
      { status: 404 },
    );
  }

  let body: {
    payload?: unknown;
    attribution?: unknown;
    turnstileToken?: string;
    website?: string; // honeypot — humans never fill this
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot: pretend success, store nothing, teach bots nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({
      ok: true,
      refCode: newRefCode(type),
      whatsappUrl: "https://wa.me/",
    });
  }

  const ip = clientIp(req);
  const ipKey = hashIp(ip);

  if (!(await verifyTurnstile(body.turnstileToken, ip))) {
    return NextResponse.json(
      { ok: false, error: "Captcha verification failed — please retry." },
      { status: 400 },
    );
  }

  // Per-IP window first (cheap), then per-mobile after validation.
  const ipLimit = await rateLimit(`ip:${ipKey}`, 8, 600);
  if (!ipLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many submissions from this connection. Please wait a few minutes and try again.",
      },
      { status: 429 },
    );
  }

  const parsed = leadSchemas[type].safeParse(body.payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 422 },
    );
  }
  const payload = parsed.data as Record<string, unknown> & {
    mobile?: string;
    consent?: true;
  };

  if (payload.mobile) {
    const mobileLimit = await rateLimit(`mob:${hashIp(payload.mobile)}`, 5, 3600);
    if (!mobileLimit.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "We already have recent submissions for this number — our advisor will reach out shortly.",
        },
        { status: 429 },
      );
    }
  }

  const attribution = attributionSchema.safeParse(body.attribution ?? {});
  const attr = attribution.success ? attribution.data : {};

  const db = getDb();
  const consentGiven = payload.consent === true;

  // refCode is unique — retry a few times on the (rare) collision.
  let lead: { refCode: string } | null = null;
  let lastError: unknown;
  for (let attempt = 0; attempt < 5 && !lead; attempt++) {
    const refCode = newRefCode(type);
    try {
      lead = await db.lead.create({
        data: {
          refCode,
          type,
          payload: payload as Prisma.InputJsonValue,
          source: attr.source,
          utmSource: attr.utmSource,
          utmMedium: attr.utmMedium,
          utmCampaign: attr.utmCampaign,
          utmTerm: attr.utmTerm,
          utmContent: attr.utmContent,
          ipHash: ipKey,
          userAgent: req.headers.get("user-agent")?.slice(0, 400) ?? null,
          consentGiven,
          consentTextVersion: consentGiven ? CONSENT_TEXT_VERSION : null,
          consentTimestamp: consentGiven ? new Date() : null,
        },
        select: { refCode: true },
      });
    } catch (err) {
      lastError = err;
      if ((err as { code?: string }).code !== "P2002") break; // not a refCode collision
    }
  }
  if (!lead) {
    console.error("[lead] persist failed:", lastError);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't save your details just now. Please retry, or WhatsApp us directly.",
      },
      { status: 500 },
    );
  }

  const refCode = lead.refCode;
  // Type-narrowed template dispatch (payload is validated for `type`).
  const whatsappUrl = leadWhatsappUrl(
    type,
    refCode,
    payload as never,
  );

  // PII-safe structured log.
  console.log(
    `[lead] created ${refCode} type=${type}` +
      (payload.mobile ? ` mobile=${maskMobile(String(payload.mobile))}` : "") +
      (typeof payload.pan === "string"
        ? ` pan=${maskPan(String(payload.pan))}`
        : ""),
  );

  // Notify the humans after the response is sent — never on its critical path.
  after(() =>
    notify({
      refCode,
      subject: `New lead ${refCode} — ${type.replace("_", " ")}`,
      summary: `New ${type.replace("_", " ")} lead ${refCode}`,
      text: notificationText(type, refCode, payload, whatsappUrl),
    }),
  );

  return NextResponse.json({ ok: true, refCode, whatsappUrl });
}
