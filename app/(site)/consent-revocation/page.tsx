import type { Metadata } from "next";
import Link from "next/link";
import { config, telHref } from "@/lib/config";
import { routes } from "@/lib/routes";
import {
  LegalCard,
  LegalDashItem,
  LegalDashList,
  LegalH2,
  LegalP,
  LegalPage,
} from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Consent Revocation",
  description:
    "Withdraw your consent at PDS Global — how to revoke data-sharing and contact consent, what happens next, and how to request deletion of your data.",
};

export default function ConsentRevocationPage() {
  return (
    <LegalPage
      title="Consent revocation"
      lastUpdated="LAST UPDATED 10 JULY 2026"
      intro="The consent you gave us is yours to withdraw. This page explains exactly what you consented to, how to revoke it, and what happens once you do."
    >
      <LegalH2>1. What you consented to</LegalH2>
      <LegalP>
        When you applied or checked your score, you allowed us to contact you
        across call, SMS, email and WhatsApp, and to share your details with
        partner lenders and RBI-licensed bureaus for the purpose of your
        enquiry. You can withdraw any part of this at any time.
      </LegalP>
      <LegalH2>2. How to revoke</LegalH2>
      <LegalP className="mb-2.5">
        Send us a revocation request through any of these, from your
        registered details:
      </LegalP>
      <LegalDashList className="mb-1.5">
        <LegalDashItem>
          Email <a href={`mailto:${config.email}`}>{config.email}</a> with the
          subject &quot;Revoke consent&quot;.
        </LegalDashItem>
        <LegalDashItem>
          WhatsApp or call <a href={telHref}>{config.phone}</a>.
        </LegalDashItem>
        <LegalDashItem>
          Write to us at our Chennai office (address in the footer).
        </LegalDashItem>
      </LegalDashList>
      <LegalP className="mt-3.5">
        Please include your name, registered mobile and any application
        reference so we can verify and act on the request.
      </LegalP>
      <LegalH2>3. What happens next</LegalH2>
      <LegalP>
        We stop the contact and processing you have withdrawn, and confirm
        once done — normally within 7 working days. Because we act as an
        intermediary, if a lender is already assessing or servicing your loan,
        you may also need to withdraw consent with that lender directly; we
        will tell you who to contact and help you do it.
      </LegalP>
      <LegalH2>4. Requesting deletion</LegalH2>
      <LegalP>
        You can ask us to delete your personal data. We will do so unless we
        are required to retain certain records by law (for example, completed
        KYC or tax records), in which case we keep only the minimum necessary
        and delete the rest.
      </LegalP>
      <LegalH2>5. What revocation does not undo</LegalH2>
      <LegalP>
        Withdrawing consent is not retrospective: it does not reverse
        processing already carried out lawfully, or affect a loan you have
        already taken from a lender. It simply stops further use of your data
        for the purposes you have withdrawn.
      </LegalP>
      <LegalCard label="RELATED">
        See our <Link href={routes.privacy}>privacy policy</Link> and{" "}
        <Link href={routes.applicationConsent}>application consent</Link>. Any
        difficulty? Use our{" "}
        <Link href={routes.grievanceRedressal}>grievance redressal</Link>{" "}
        process.
      </LegalCard>
    </LegalPage>
  );
}
