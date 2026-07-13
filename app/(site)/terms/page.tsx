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
  title: "Terms of Use",
  description:
    "Terms of use for PDS Global — a loan service provider and DSA of RBI-regulated lenders, part of the Finance Buddha group.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      lastUpdated="LAST UPDATED 10 JULY 2026"
      intro="These terms govern your use of the PDS Global website and services. PDS Global is the brand of PDS Global Financial Services Private Limited, a loan service provider (LSP) and direct selling agent of RBI-regulated banks and NBFCs, and part of the Finance Buddha group. By using this site, you agree to what follows."
    >
      <LegalH2>1. What we do — and don&apos;t</LegalH2>
      <LegalP className="mb-3.5">
        We help you discover, compare and apply for loans offered by our
        partner lenders. We are not a bank or NBFC and do not lend from our
        own funds. Every sanction, interest rate, fee and disbursal decision
        rests solely with the lender you choose, based on its own credit
        policy and your eligibility.
      </LegalP>
      <LegalP>
        Nothing on this site is an offer of credit or a commitment to lend. We
        never promise or guarantee loan approval, a specific rate, or a
        specific amount.
      </LegalP>
      <LegalH2>2. Eligibility</LegalH2>
      <LegalP>
        You must be at least 18 years old, a resident of India, and legally
        able to enter a contract. Product-specific criteria (for example, age
        21–55 and a minimum income for personal loans) are set by lenders and
        shown alongside each product.
      </LegalP>
      <LegalH2>3. Your responsibilities</LegalH2>
      <LegalP className="mb-3.5">
        You agree to give information that is true, current and your own, and
        to keep your login and one-time passwords confidential. You will not
        use the site unlawfully, submit another person&apos;s details without
        authority, or attempt to disrupt or reverse-engineer the service.
      </LegalP>
      <LegalP>
        You are responsible for reading each lender&apos;s Key Fact Statement
        and loan agreement before you accept an offer.
      </LegalP>
      <LegalH2>4. Fees</LegalH2>
      <LegalP>
        Our service is free for borrowers. We are compensated by partner
        lenders when a loan we refer is disbursed. We will never ask you to
        pay a fee, deposit or &quot;processing charge&quot; to us in order to
        secure a loan — treat any such request as fraudulent and report it to
        us.
      </LegalP>
      <LegalH2>5. Third-party lenders and links</LegalH2>
      <LegalP>
        When you proceed with a lender, your relationship for that loan is
        with the lender, governed by its terms. We are not responsible for
        lenders&apos; decisions, products or conduct, though we will help you
        raise and escalate any concern. Partner names and marks belong to
        their respective owners.
      </LegalP>
      <LegalH2>6. Intellectual property</LegalH2>
      <LegalP>
        The PDS Global name, logo, copy, design and calculators are our
        property or licensed to us, and may not be copied or reused without
        written permission. Calculator outputs are estimates for your personal
        planning only.
      </LegalP>
      <LegalH2>7. Disclaimers and liability</LegalH2>
      <LegalP>
        The site is provided &quot;as is&quot;. To the extent permitted by
        law, we are not liable for indirect or consequential loss, or for
        decisions taken by lenders. Our aggregate liability for any claim
        relating to the service is limited to ₹10,000. Nothing here limits
        liability that cannot be excluded under applicable law.
      </LegalP>
      <LegalH2>8. Governing law</LegalH2>
      <LegalP>
        These terms are governed by the laws of India, and the courts at
        Chennai, Tamil Nadu have exclusive jurisdiction. We may update these
        terms; the &quot;last updated&quot; date above reflects the current
        version, and continued use means you accept the change.
      </LegalP>
      <LegalCard label="QUESTIONS ABOUT THESE TERMS?">
        Write to{" "}
        <a href={`mailto:${config.email}`}>{config.email}</a> or call{" "}
        <a href={telHref}>{config.phone}</a>. See also our{" "}
        <Link href={routes.privacy}>privacy policy</Link> and{" "}
        <Link href={routes.grievanceRedressal}>grievance redressal</Link>{" "}
        process.
      </LegalCard>
    </LegalPage>
  );
}
