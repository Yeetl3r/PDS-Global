import { randomInt } from "node:crypto";
import type { LeadType } from "@/lib/generated/prisma/enums";

/**
 * Reference codes shown to the user and quoted in WhatsApp messages.
 * Reference-code prefixes by lead type:
 * ML- for the loan funnels, CS- credit score, PT- partner, CT- contact.
 * Codes are generated server-side only — the client's value is never trusted.
 */
const PREFIX: Record<LeadType, string> = {
  quick_apply: "ML",
  personal_loan: "ML",
  credit_score: "CS",
  partner: "PT",
  contact: "CT",
};

export function newRefCode(type: LeadType): string {
  return `${PREFIX[type]}-${randomInt(100000, 1000000)}`;
}

/** Grievance / consent-revocation tickets. */
export function newGrievanceRefCode(): string {
  return `GR-${randomInt(100000, 1000000)}`;
}
