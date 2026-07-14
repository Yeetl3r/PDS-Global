import { z } from "zod";

/**
 * Shared validation schemas — the SAME schema validates in the browser
 * (react-hook-form zodResolver) and again on the server (API routes).
 * Validation rules; error copy is written as
 * direction, not apology.
 */

/** Bump when the consent wording on the forms changes. */
export const CONSENT_TEXT_VERSION = "2026-07-v1";

export const mobileSchema = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, "Enter the 10-digit mobile you use on WhatsApp.");

export const panSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(
    /^[A-Z]{5}[0-9]{4}[A-Z]$/,
    "Enter a valid PAN — five letters, four digits, one letter.",
  );

export const pincodeSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, "Enter the 6-digit pincode of your current address.");

/** DD/MM/YYYY, age 21–55 as of today. */
export const dobSchema = z
  .string()
  .trim()
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Enter your date of birth as DD/MM/YYYY.")
  .superRefine((value, ctx) => {
    const [dd, mm, yyyy] = value.split("/").map(Number);
    const date = new Date(yyyy, mm - 1, dd);
    if (
      date.getFullYear() !== yyyy ||
      date.getMonth() !== mm - 1 ||
      date.getDate() !== dd
    ) {
      ctx.addIssue({ code: "custom", message: "Enter a real calendar date." });
      return;
    }
    const today = new Date();
    let age = today.getFullYear() - yyyy;
    const beforeBirthday =
      today.getMonth() < mm - 1 ||
      (today.getMonth() === mm - 1 && today.getDate() < dd);
    if (beforeBirthday) age -= 1;
    if (age < 21 || age > 55) {
      ctx.addIssue({
        code: "custom",
        message: "Applicants need to be between 21 and 55 years old.",
      });
    }
  });

export const consentSchema = z.literal(true, {
  error: "Please accept the consent to continue.",
});

const nameField = (msg: string) => z.string().trim().min(2, msg).max(60);

const emailSchema = z
  .string()
  .trim()
  .max(80)
  .regex(
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    "Enter a valid email — payout statements go here.",
  );

/** 1. Quick apply funnel (/apply) — mobile only. */
export const quickApplySchema = z.object({
  mobile: mobileSchema,
});

/** 2. Full personal loan application. */
export const personalLoanSchema = z.object({
  firstName: nameField("Enter your first name as on PAN."),
  lastName: nameField("Enter your last name as on PAN."),
  pan: panSchema,
  dob: dobSchema,
  pincode: pincodeSchema,
  company: z.string().trim().min(2, "Enter your company name.").max(80),
  monthlyIncome: z.coerce
    .number<number>()
    .min(20000, "Lenders on our panel need a monthly income of ₹20,000 or more."),
  loanAmount: z.coerce
    .number<number>()
    .min(50000, "Loan amounts start at ₹50,000.")
    .max(5000000, "Personal loans go up to ₹50,00,000."),
  tenureMonths: z.coerce
    .number<number>()
    .int()
    .min(12, "Tenure runs from 12 to 72 months.")
    .max(72, "Tenure runs from 12 to 72 months."),
  mobile: mobileSchema,
  consent: consentSchema,
});

/** 3. Credit score checker. */
export const creditScoreSchema = z.object({
  name: nameField("Enter your full name as on PAN."),
  pan: panSchema,
  mobile: mobileSchema,
  consent: consentSchema,
});

/** 4. Partner (DSA) application. */
export const partnerSchema = z.object({
  name: z.string().trim().min(3, "Enter your full name.").max(60),
  mobile: mobileSchema,
  email: emailSchema,
  profession: z
    .string()
    .trim()
    .min(1, "Pick the option closest to your work — it helps us assign the right manager.")
    .max(60),
  city: z.string().trim().min(2, "Enter the city you work from.").max(40),
});

/** 5. Contact form. */
export const contactSchema = z.object({
  name: nameField("Enter your name."),
  mobile: mobileSchema,
  email: emailSchema.optional().or(z.literal("")),
  topic: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Tell us a little about what you need.").max(2000),
});

/** Grievance / consent-revocation intake. */
export const grievanceSchema = z.object({
  kind: z.enum(["grievance", "consent_revocation"]),
  name: nameField("Enter your name."),
  mobile: mobileSchema,
  email: emailSchema.optional().or(z.literal("")),
  refCode: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Describe your concern.").max(4000),
});

export const leadSchemas = {
  quick_apply: quickApplySchema,
  personal_loan: personalLoanSchema,
  credit_score: creditScoreSchema,
  partner: partnerSchema,
  contact: contactSchema,
} as const;

export type LeadTypeKey = keyof typeof leadSchemas;

export type QuickApplyInput = z.infer<typeof quickApplySchema>;
export type PersonalLoanInput = z.infer<typeof personalLoanSchema>;
export type CreditScoreInput = z.infer<typeof creditScoreSchema>;
export type PartnerInput = z.infer<typeof partnerSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type GrievanceInput = z.infer<typeof grievanceSchema>;

/** Optional attribution block accepted alongside any lead payload. */
export const attributionSchema = z
  .object({
    source: z.string().trim().max(200).optional(),
    utmSource: z.string().trim().max(120).optional(),
    utmMedium: z.string().trim().max(120).optional(),
    utmCampaign: z.string().trim().max(120).optional(),
    utmTerm: z.string().trim().max(120).optional(),
    utmContent: z.string().trim().max(120).optional(),
  })
  .partial();

export type Attribution = z.infer<typeof attributionSchema>;
