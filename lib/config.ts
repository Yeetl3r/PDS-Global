/**
 * Site-wide constants for PDS Global. Every contact detail, entity string and
 * templated message derives from here — components must not hardcode them.
 * All values are env-overridable for deploys.
 */

export const config = {
  brand: "PDS Global",
  entity:
    process.env.NEXT_PUBLIC_ENTITY_NAME ??
    "PDS Global Financial Services Pvt. Ltd.",
  group: "Finance Buddha group",
  cin: process.env.NEXT_PUBLIC_CIN ?? "U65999TN2012PTC087654",

  /** Human-readable phone, e.g. shown in the header. */
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+91 88388 20230",
  /** Digits-only WhatsApp number (country code, no +). */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "918838820230",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "pdsglobalfinance@gmail.com",
  address:
    process.env.NEXT_PUBLIC_ADDRESS ??
    "No. 13/16 Saurashtra Nagar 1st Street, Choolaimedu, Chennai 600094",
  hours: "Mon–Sat · 9:30–18:30 IST",
} as const;

/** tel: link derived from the display phone. */
export const telHref = "tel:+" + config.phone.replace(/\D/g, "");

/** wa.me link with a pre-filled message. */
export function waHref(message: string): string {
  return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** The generic "just start a conversation" WhatsApp link. */
export const waGeneric = waHref(
  "Hi PDS Global! I'd like to explore a loan. Please guide me.",
);
