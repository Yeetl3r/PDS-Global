import type { Metadata } from "next";
import Link from "next/link";
import { config } from "@/lib/config";
import { routes } from "@/lib/routes";
import {
  LegalCard,
  LegalH2,
  LegalP,
  LegalPage,
} from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Application Consent",
  description:
    "The consent you give when you apply through PDS Global — to be contacted, and to share your details with partner lenders and credit bureaus for your enquiry.",
};

export default function ApplicationConsentPage() {
  return (
    <LegalPage
      title="Application consent"
      lastUpdated="LAST UPDATED 10 JULY 2026"
      intro="This is the consent you give when you submit an application or a score check through PDS Global. We keep it in plain language so you know exactly what you are agreeing to."
    >
      <LegalH2>1. You agree to be contacted</LegalH2>
      <LegalP>
        You allow PDS Global and its partner lenders to contact you by phone,
        SMS, email and WhatsApp about your enquiry and related loan offers,
        even if your number is on the DND / NDNC registry. This overrides DND
        only for this stated purpose, and you can withdraw it any time.
      </LegalP>
      <LegalH2>2. You allow us to share your details</LegalH2>
      <LegalP>
        You authorise us to share the information you provide with our partner
        banks and NBFCs so they can assess your eligibility, and — where you
        ask us to check your credit — to fetch your report from RBI-licensed
        bureaus on your behalf. We share only with lenders relevant to your
        enquiry, and we never sell your data.
      </LegalP>
      <LegalH2>3. Soft check now, hard enquiry only if you proceed</LegalH2>
      <LegalP>
        Checking your eligibility or score through us is a soft enquiry and
        does not affect your credit score. A hard enquiry — which can affect
        your score — is made by a lender only when you decide to proceed with
        a formal loan application, and only with your specific consent at that
        stage.
      </LegalP>
      <LegalH2>4. Your declaration</LegalH2>
      <LegalP>
        You confirm the details you submit are true, current and your own, and
        that you are authorised to share them. Providing false information can
        lead to rejection by lenders and may have legal consequences.
      </LegalP>
      <LegalH2>
        5. We&apos;re an intermediary — approval isn&apos;t guaranteed
      </LegalH2>
      <LegalP>
        You acknowledge that PDS Global is a loan service provider and DSA,
        not a lender, and that submitting an application does not guarantee a
        loan. Sanction, interest rate, amount and terms are decided solely by
        the lender, based on its policy and your credit profile.
      </LegalP>
      <LegalH2>6. Duration and withdrawal</LegalH2>
      <LegalP>
        This consent stays in force for as long as needed to serve your
        enquiry, or until you withdraw it. You can revoke it at any time — see{" "}
        <Link href={routes.consentRevocation}>consent revocation</Link>.
      </LegalP>
      <LegalCard label="RELATED">
        See our <Link href={routes.privacy}>privacy policy</Link>,{" "}
        <Link href={routes.digitalLendingGuidelines}>
          digital lending guidelines
        </Link>
        , and <Link href={routes.terms}>terms of use</Link>. Questions?{" "}
        <a href={`mailto:${config.email}`}>{config.email}</a>.
      </LegalCard>
    </LegalPage>
  );
}
