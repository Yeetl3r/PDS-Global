import type { Metadata } from "next";
import Link from "next/link";
import { config, telHref } from "@/lib/config";
import { routes } from "@/lib/routes";
import {
  LegalCard,
  LegalH2,
  LegalP,
  LegalPage,
} from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Digital Lending Guidelines",
  description:
    "How PDS Global aligns with the RBI Digital Lending Guidelines — LSP disclosure, Key Fact Statement, direct disbursal, cooling-off period and data privacy.",
};

export default function DigitalLendingGuidelinesPage() {
  return (
    <LegalPage
      title="Digital lending guidelines"
      lastUpdated="LAST UPDATED 10 JULY 2026"
      intro={
        "PDS Global operates as a loan service provider (LSP) for RBI-regulated lenders, and follows the Reserve Bank of India's Guidelines on Digital Lending. This page summarises what that means for you in practice."
      }
    >
      <LegalH2>1. We act for the lender, and tell you so</LegalH2>
      <LegalP>
        We are an LSP and direct selling agent engaged by our partner banks
        and NBFCs. Before you apply, we disclose which lender(s) your
        application is being made to. The loan contract is always between you
        and the regulated lender — never with PDS Global.
      </LegalP>
      <LegalH2>2. Key Fact Statement and all-in cost</LegalH2>
      <LegalP>
        Before you sign, the lender provides a Key Fact Statement (KFS)
        stating the Annual Percentage Rate (APR), the total cost of the loan,
        all fees, the repayment schedule and the recovery mechanism. There are
        no hidden charges: any cost not in the KFS cannot be levied. We
        encourage you to read it in full.
      </LegalP>
      <LegalH2>3. Money flows directly</LegalH2>
      <LegalP>
        Loan amounts are disbursed directly from the lender to your bank
        account, and repayments go directly from you to the lender. Funds do
        not pass through PDS Global or any third-party pool account, and we
        never collect your EMIs.
      </LegalP>
      <LegalH2>4. Cooling-off period</LegalH2>
      <LegalP>
        Every loan carries a cooling-off (look-up) period defined by the
        lender, during which you may exit the loan by repaying the principal
        and the proportionate APR, without penalty. The exact window is stated
        in your KFS.
      </LegalP>
      <LegalH2>5. Your data, need-based only</LegalH2>
      <LegalP>
        We collect only data needed for your application, with your explicit
        consent, and store personal data of Indian users on servers in India.
        We do not access your phone contacts, media, or files. You can review
        or withdraw consent at any time — see{" "}
        <Link href={routes.consentRevocation}>consent revocation</Link>.
      </LegalP>
      <LegalH2>6. No surprise limit increases</LegalH2>
      <LegalP>
        A credit limit is never increased automatically. Any enhancement
        requires your explicit request and consent, and a fresh assessment by
        the lender.
      </LegalP>
      <LegalH2>7. Fair conduct and recovery</LegalH2>
      <LegalP>
        Recovery is carried out by the lender or its authorised agents, within
        RBI&apos;s fair-practices norms and lawful hours. Any guarantee
        arrangement between a lender and a partner does not change your rights
        or expose you to the recovery of another borrower&apos;s dues. Report
        any coercive or improper conduct to us immediately.
      </LegalP>
      <LegalCard label="RAISE A CONCERN">
        Contact us at <a href={`mailto:${config.email}`}>{config.email}</a> or{" "}
        <a href={telHref}>{config.phone}</a>, or follow our{" "}
        <Link href={routes.grievanceRedressal}>grievance redressal</Link>{" "}
        process. Concerns about unauthorised lending can also be raised on the
        RBI Sachet portal at sachet.rbi.org.in.
      </LegalCard>
    </LegalPage>
  );
}
