import { waHref } from "@/lib/config";
import type {
  ContactInput,
  CreditScoreInput,
  LeadTypeKey,
  PartnerInput,
  PersonalLoanInput,
  QuickApplyInput,
} from "@/lib/schemas";

/**
 * Server-side WhatsApp handoff URLs. Each lead type has its own
 * message template — so the advisor-side
 * experience stays consistent no matter where the link was built.
 */

const fmtInr = new Intl.NumberFormat("en-IN");

type PayloadFor = {
  quick_apply: QuickApplyInput;
  personal_loan: PersonalLoanInput;
  credit_score: CreditScoreInput;
  partner: PartnerInput;
  contact: ContactInput;
};

const templates: {
  [K in LeadTypeKey]: (refCode: string, p: PayloadFor[K]) => string;
} = {
  quick_apply: (ref, p) =>
    `Hi PDS Global! I'd like personal loan offers. My reference is ${ref} and my number is +91 ${p.mobile}.`,
  personal_loan: (ref, p) =>
    `Hi PDS Global! I've submitted my personal loan application. Ref ${ref}. Name: ${p.firstName} ${p.lastName}. Loan: ₹${fmtInr.format(p.loanAmount)} for ${p.tenureMonths} months. Please take it forward.`,
  credit_score: (ref, p) =>
    `Hi PDS Global! I'd like my free credit score check. Ref ${ref}. Name: ${p.name}.`,
  partner: (ref, p) =>
    `Hi PDS Global! I applied to become a lending partner. Ref ${ref}. ${p.name}, ${p.profession}, ${p.city}.`,
  contact: (ref, p) =>
    `Hi PDS Global! Ref ${ref}. ${p.topic || "Enquiry"}. ${p.message} — ${p.name}, +91 ${p.mobile}`,
};

export function leadWhatsappUrl<K extends LeadTypeKey>(
  type: K,
  refCode: string,
  payload: PayloadFor[K],
): string {
  return waHref(templates[type](refCode, payload));
}
