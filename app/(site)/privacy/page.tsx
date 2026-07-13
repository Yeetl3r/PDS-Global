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
  title: "Privacy Policy",
  description:
    "Privacy policy for PDS Global — what we collect, how we use it, who we share it with, and your rights. ISO 27001-certified processes.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      lastUpdated="LAST UPDATED 10 JULY 2026"
      intro="Your financial details are sensitive, and we treat them that way. This policy explains what PDS Global Financial Services Private Limited collects, why, who we share it with, and the control you keep. Our information-security processes are ISO/IEC 27001 certified."
    >
      <LegalH2>1. What we collect</LegalH2>
      <LegalP className="mb-2.5">
        We collect only what a loan application genuinely needs:
      </LegalP>
      <LegalDashList className="mb-1">
        <LegalDashItem>
          Identity and contact: name, date of birth, PAN, mobile, email,
          address, pincode.
        </LegalDashItem>
        <LegalDashItem>
          Financial: employer, income, loan amount and tenure sought, and —
          with your consent — your credit report.
        </LegalDashItem>
        <LegalDashItem>
          Technical: device, browser and usage data collected through standard
          cookies and analytics.
        </LegalDashItem>
      </LegalDashList>
      <LegalH2>2. How we use it</LegalH2>
      <LegalP>
        To match your profile with suitable lenders, help you apply, keep you
        updated by your chosen channel, meet legal and KYC obligations, and
        improve our service. We do not make fully automated decisions that
        produce legal effects — a human advisor is always in the loop.
      </LegalP>
      <LegalH2>3. Who we share it with</LegalH2>
      <LegalP className="mb-3.5">
        With the partner lenders you choose to proceed with; with RBI-licensed
        credit bureaus to fetch your report on your authority; and with vetted
        service providers (for example, secure hosting and communications)
        bound by confidentiality. We share within the Finance Buddha group
        only as needed to provide the service.
      </LegalP>
      <LegalP>
        <strong className="text-ink">We never sell your data</strong>, and we
        never share it with a lender you have not asked to proceed with.
      </LegalP>
      <LegalH2>4. Security and storage</LegalH2>
      <LegalP>
        Data is encrypted in transit and at rest, access is role-restricted
        and logged, and our controls are audited annually under ISO/IEC 27001.
        Personal data of Indian users is stored on servers located in India,
        in line with RBI&apos;s directions.
      </LegalP>
      <LegalH2>5. How long we keep it</LegalH2>
      <LegalP>
        We retain your data only as long as needed for the purpose collected,
        or as required by law (for example, KYC and tax records). When neither
        applies, we delete or anonymise it.
      </LegalP>
      <LegalH2>6. Your rights</LegalH2>
      <LegalP>
        You may ask to access, correct or delete your data, and you may
        withdraw consent at any time through our{" "}
        <Link href={routes.consentRevocation}>consent revocation</Link>{" "}
        process. Withdrawing consent may mean we can no longer progress an
        application, but it will not affect processing already completed
        lawfully.
      </LegalP>
      <LegalH2>7. Cookies</LegalH2>
      <LegalP>
        We use essential cookies to run the site and optional analytics
        cookies to understand usage. You can control cookies through your
        browser settings; disabling some may affect how the site works.
      </LegalP>
      <LegalCard label={"DATA REQUESTS & QUESTIONS"}>
        Contact our Grievance Officer at{" "}
        <a href={`mailto:${config.email}`}>{config.email}</a> or{" "}
        <a href={telHref}>{config.phone}</a>. See also{" "}
        <Link href={routes.digitalLendingGuidelines}>
          digital lending guidelines
        </Link>{" "}
        and <Link href={routes.grievanceRedressal}>grievance redressal</Link>.
      </LegalCard>
    </LegalPage>
  );
}
