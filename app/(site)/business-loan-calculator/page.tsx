import type { Metadata } from "next";
import BusinessLoanCalculatorClient from "./calculator-client";

export const metadata: Metadata = {
  title: "Business Loan EMI Calculator",
  description:
    "Business loan EMI calculator — plan working-capital repayments with real EMI math. Estimates only, not an approval guarantee.",
};

export default function BusinessLoanCalculatorPage() {
  return <BusinessLoanCalculatorClient />;
}
