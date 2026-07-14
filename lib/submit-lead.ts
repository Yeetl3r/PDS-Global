"use client";

/**
 * Client-side lead submission. POSTs to /api/leads/[type]; the server
 * validates again, persists, and returns the real reference code and the
 * WhatsApp handoff URL. Success screens must only use these returned values.
 */

export class LeadSubmitError extends Error {}

export interface LeadResult {
  refCode: string;
  whatsappUrl: string;
}

/** utm_* params + referrer, captured at submit time. */
function collectAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  const attribution: Record<string, string> = {};
  const map: Record<string, string> = {
    utm_source: "utmSource",
    utm_medium: "utmMedium",
    utm_campaign: "utmCampaign",
    utm_term: "utmTerm",
    utm_content: "utmContent",
  };
  for (const [param, key] of Object.entries(map)) {
    const v = q.get(param);
    if (v) attribution[key] = v.slice(0, 120);
  }
  attribution.source = window.location.pathname;
  return attribution;
}

export async function postLead(
  type: "apply" | "personal-loan" | "credit-score" | "partner" | "contact",
  payload: unknown,
  opts?: { honeypot?: string },
): Promise<LeadResult> {
  let res: Response;
  try {
    res = await fetch(`/api/leads/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payload,
        attribution: collectAttribution(),
        website: opts?.honeypot ?? "",
      }),
    });
  } catch {
    throw new LeadSubmitError(
      "We couldn't reach our servers — check your connection and try again, or WhatsApp us directly.",
    );
  }

  const data = (await res.json().catch(() => null)) as {
    ok?: boolean;
    refCode?: string;
    whatsappUrl?: string;
    error?: string;
  } | null;

  if (!res.ok || !data?.ok || !data.refCode || !data.whatsappUrl) {
    throw new LeadSubmitError(
      data?.error ??
        "We couldn't save your details just now. Please retry, or WhatsApp us directly.",
    );
  }
  return { refCode: data.refCode, whatsappUrl: data.whatsappUrl };
}
