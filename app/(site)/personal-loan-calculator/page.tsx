import type { Metadata } from "next";
import PersonalLoanCalculatorClient from "./calculator-client";

export const metadata: Metadata = {
  title: "Personal Loan EMI Calculator",
  description:
    "Personal loan EMI calculator — real EMI math on amounts from ₹50,000 to ₹10 lakhs, 1–30% interest, 3–60 months. Estimates only, not an approval guarantee.",
};

export default function PersonalLoanCalculatorPage() {
  return <PersonalLoanCalculatorClient />;
}
