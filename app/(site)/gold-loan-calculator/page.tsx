import type { Metadata } from "next";
import GoldLoanCalculatorClient from "./calculator-client";

export const metadata: Metadata = {
  title: "Gold Loan Calculator",
  description:
    "Gold loan EMI calculator — plan repayments on gold-backed borrowing from 9.5% p.a. Estimates only, not an approval guarantee.",
};

export default function GoldLoanCalculatorPage() {
  return <GoldLoanCalculatorClient />;
}
