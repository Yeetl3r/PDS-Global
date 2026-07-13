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
  title: "Grievance Redressal",
  description:
    "Grievance redressal at PDS Global — how to raise a complaint, our Grievance Officer, response timelines, and escalation to the RBI Ombudsman.",
};

const timelines: [string, string][] = [
  ["Acknowledgement", "WITHIN 48 WORKING HOURS"],
  ["Resolution (Level 1)", "WITHIN 7 WORKING DAYS"],
  ["Escalated resolution", "WITHIN 21 WORKING DAYS"],
];

export default function GrievanceRedressalPage() {
  return (
    <LegalPage
      title="Grievance redressal"
      lastUpdated="LAST UPDATED 10 JULY 2026"
      intro="If something goes wrong, we want to hear it and fix it. This policy sets out how to raise a grievance with PDS Global, who owns it, how quickly we respond, and how to escalate if you are not satisfied."
    >
      <LegalH2>1. How to raise a grievance</LegalH2>
      <LegalP>
        Reach us by email at{" "}
        <a href={`mailto:${config.email}`}>{config.email}</a>, by phone or
        WhatsApp on <a href={telHref}>{config.phone}</a>, or by post to the
        address below. Please include your name, registered mobile, any
        application reference, and a clear description of the issue so we can
        act quickly.
      </LegalP>
      <div className="mt-[22px] rounded-[18px] border border-[rgba(201,162,75,.4)] bg-night px-7 py-[26px]">
        <p className="mb-1 font-mono text-[10px] tracking-[.2em] text-gold-bright">
          LEVEL 1 · GRIEVANCE OFFICER
        </p>
        <p className="mb-3.5 font-display text-[23px] font-bold text-cream">
          Mr. Prabhu D.
        </p>
        <div className="flex flex-col gap-[9px] text-[14.5px]">
          <a
            href={`mailto:${config.email}`}
            className="text-night-text hover:text-[#F4E4AC]"
          >
            {config.email}
          </a>
          <a
            href={telHref}
            className="text-night-text tabular-nums hover:text-[#F4E4AC]"
          >
            {config.phone}
          </a>
          <span className="leading-[1.6] text-night-muted">
            {config.address}
          </span>
        </div>
      </div>
      <LegalH2>2. Our timelines</LegalH2>
      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        {timelines.map(([stage, when], i) => (
          <div
            key={stage}
            className={`flex flex-wrap justify-between gap-3.5 px-5 py-[15px] ${
              i > 0 ? "border-t border-[#F1EAD8]" : ""
            }`}
          >
            <span className="text-[14.5px] font-semibold">{stage}</span>
            <span className="font-mono text-[13px] text-gold">{when}</span>
          </div>
        ))}
      </div>
      <LegalH2>3. If you&apos;re still not satisfied</LegalH2>
      <LegalP className="mb-3.5">
        If your grievance is not resolved within 30 days, or you are
        dissatisfied with the outcome, you may escalate to the lender&apos;s
        own grievance channel (shared with you on request) and, where
        applicable, to the Reserve Bank of India under the Reserve Bank –
        Integrated Ombudsman Scheme.
      </LegalP>
      <LegalP>
        You can file a complaint on the RBI Complaint Management System at
        cms.rbi.org.in, or lodge concerns about unauthorised lending activity
        on the RBI Sachet portal at sachet.rbi.org.in. We will assist you with
        references and documents for any escalation.
      </LegalP>
      <LegalH2>4. Records</LegalH2>
      <LegalP>
        We log every grievance with a unique reference, track it to closure,
        and retain records as required by regulation. You may ask for the
        status of your grievance at any time using its reference.
      </LegalP>
      <LegalCard label="RELATED">
        See our{" "}
        <Link href={routes.digitalLendingGuidelines}>
          digital lending guidelines
        </Link>
        , <Link href={routes.privacy}>privacy policy</Link>, and{" "}
        <Link href={routes.terms}>terms of use</Link>.
      </LegalCard>
    </LegalPage>
  );
}
