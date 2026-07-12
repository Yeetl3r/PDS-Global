/**
 * Central route map — every page in the platform
 * has exactly one route here.
 */
export const routes = {
  home: "/",
  apply: "/apply",
  personalLoanApplication: "/products/personal-loan/application",
  creditScoreChecker: "/credit-score-checker",
  personalLoanCalculator: "/personal-loan-calculator",
  businessLoanCalculator: "/business-loan-calculator",
  goldLoanCalculator: "/gold-loan-calculator",
  partnerWithUs: "/partner-with-us",
  blogs: "/blogs",
  about: "/about",
  contactUs: "/contact-us",
  terms: "/terms",
  privacy: "/privacy",
  grievanceRedressal: "/grievance-redressal",
  digitalLendingGuidelines: "/digital-lending-guidelines",
  consentRevocation: "/consent-revocation",
  applicationConsent: "/application-consent",
} as const;
