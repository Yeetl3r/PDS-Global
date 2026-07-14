import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { getDb } from "@/lib/db";
import { config } from "@/lib/config";
import type { Prisma } from "@/lib/generated/prisma/client";
import { hashIp, maskMobile } from "@/lib/hash";
import { notify } from "@/lib/notify";
import { rateLimit } from "@/lib/rate-limit";
import { newGrievanceRefCode } from "@/lib/refcode";
import { grievanceSchema } from "@/lib/schemas";

/**
 * POST /api/grievance
 * Grievance and consent-revocation intake. Emails the grievance officer
 * (the legal pages promise acknowledgement within 48 hours) and stores a
 * ticket. Body: { payload: {...}, website?: string }.
 */
export async function POST(req: NextRequest) {
  let body: { payload?: unknown; website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, refCode: newGrievanceRefCode() });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "0.0.0.0";
  const ipKey = hashIp(ip);

  const limit = await rateLimit(`gr:${ipKey}`, 5, 3600);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many requests from this connection — please try again later, or email us directly.",
      },
      { status: 429 },
    );
  }

  const parsed = grievanceSchema.safeParse(body.payload);
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
  const { kind, ...payload } = parsed.data;

  const db = getDb();
  let ticket: { refCode: string } | null = null;
  for (let attempt = 0; attempt < 5 && !ticket; attempt++) {
    try {
      ticket = await db.grievanceTicket.create({
        data: {
          refCode: newGrievanceRefCode(),
          kind,
          payload: payload as Prisma.InputJsonValue,
          ipHash: ipKey,
          userAgent: req.headers.get("user-agent")?.slice(0, 400) ?? null,
        },
        select: { refCode: true },
      });
    } catch (err) {
      if ((err as { code?: string }).code !== "P2002") {
        console.error("[grievance] persist failed:", err);
        break;
      }
    }
  }
  if (!ticket) {
    return NextResponse.json(
      {
        ok: false,
        error: `We couldn't record this just now. Please email ${config.email} directly.`,
      },
      { status: 500 },
    );
  }

  const refCode = ticket.refCode;
  console.log(
    `[grievance] created ${refCode} kind=${kind} mobile=${maskMobile(payload.mobile)}`,
  );

  after(() =>
    notify({
      refCode,
      subject: `${kind === "consent_revocation" ? "Consent revocation" : "Grievance"} ${refCode} — acknowledge within 48h`,
      summary: `New ${kind.replace("_", " ")} ticket ${refCode}`,
      text: [
        `Kind: ${kind}`,
        `Reference: ${refCode}`,
        `Name: ${payload.name}`,
        `Mobile: +91 ${payload.mobile}`,
        payload.email ? `Email: ${payload.email}` : null,
        payload.refCode ? `Related lead ref: ${payload.refCode}` : null,
        "",
        payload.message,
        "",
        `Received: ${new Date().toISOString()}`,
        "Committed acknowledgement window: 48 hours.",
      ]
        .filter((l): l is string => l !== null)
        .join("\n"),
    }),
  );

  return NextResponse.json({ ok: true, refCode });
}
