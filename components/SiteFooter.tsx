"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { config, telHref, waGeneric } from "@/lib/config";
import { routes } from "@/lib/routes";

const columns: { heading: string; links: [string, string][] }[] = [
  {
    heading: "LOANS",
    links: [
      ["Personal loan", routes.personalLoanApplication],
      ["Business loan", routes.businessLoanCalculator],
      ["Gold loan", routes.goldLoanCalculator],
      ["Quick apply", routes.apply],
    ],
  },
  {
    heading: "TOOLS",
    links: [
      ["Credit score checker", routes.creditScoreChecker],
      ["Personal loan EMI", routes.personalLoanCalculator],
      ["Business loan EMI", routes.businessLoanCalculator],
      ["Gold loan EMI", routes.goldLoanCalculator],
    ],
  },
  {
    heading: "COMPANY",
    links: [
      ["About PDS Global", routes.about],
      ["Partner with Us", routes.partnerWithUs],
      ["Blogs", routes.blogs],
      ["Contact us", routes.contactUs],
    ],
  },
  {
    heading: "LEGAL",
    links: [
      ["Terms of use", routes.terms],
      ["Privacy policy", routes.privacy],
      ["Grievance redressal", routes.grievanceRedressal],
      ["Digital lending guidelines", routes.digitalLendingGuidelines],
      ["Consent revocation", routes.consentRevocation],
      ["Application consent", routes.applicationConsent],
    ],
  },
];

export default function SiteFooter() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <footer className="relative mt-[clamp(56px,8vw,96px)] overflow-hidden rounded-t-[28px] border-t border-[rgba(201,162,75,.45)] bg-night text-night-text">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-radial-gradient(circle_at_88%_-20%,rgba(201,162,75,.07)_0_1px,transparent_1px_16px)]"
      />
      <div className="relative mx-auto max-w-[1180px] px-[clamp(20px,4.5vw,48px)] pt-[clamp(44px,6vw,72px)]">
        <div className="flex flex-wrap items-start gap-[clamp(32px,5vw,72px)]">
          {/* Brand + contact */}
          <div className="min-w-[260px] flex-[1_1_280px]">
            <span className="flex items-center gap-[11px]">
              <Image
                src="/assets/pds-logo.png"
                alt="PDS Global"
                width={40}
                height={40}
                className="shrink-0 rounded-[11px] border border-[rgba(201,162,75,.55)] bg-white object-contain shadow-[0_4px_12px_rgba(0,0,0,.4)]"
              />
              <span className="flex flex-col leading-none">
                <span className="whitespace-nowrap font-display text-[25px] font-semibold text-cream">
                  PDS Global
                </span>
                <span className="mt-1 font-mono text-[8.5px] tracking-[.42em] text-gold-bright">
                  FINANCE
                </span>
              </span>
            </span>
            <p className="mt-[18px] mb-[26px] font-display text-[19px] leading-[1.4] italic text-[#A99E85]">
              Loans, arranged with candour.
            </p>
            <div className="flex flex-col gap-[11px] text-[14.5px]">
              <a
                href={telHref}
                className="font-mono text-[15px] tracking-[.02em] text-[#E8DFC8] hover:text-[#F4E4AC]"
              >
                {config.phone}
              </a>
              <a
                href={waGeneric}
                target="_blank"
                rel="noopener"
                className="text-night-text hover:text-[#F4E4AC]"
              >
                WhatsApp an advisor →
              </a>
              <a
                href={`mailto:${config.email}`}
                className="text-night-text hover:text-[#F4E4AC]"
              >
                {config.email}
              </a>
              <span className="leading-relaxed text-night-muted">
                No. 13/16 Saurashtra Nagar 1st Street,
                <br />
                Choolaimedu, Chennai 600094 · {config.hours}
              </span>
            </div>
          </div>

          {/* Desktop link columns (>760px) */}
          <div className="hidden flex-[2_1_560px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-6 gap-y-8 foot:grid">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="mb-4 font-mono text-[11px] tracking-[.22em] text-gold-bright">
                  {col.heading}
                </p>
                <div className="flex flex-col gap-[11px] text-[14.5px]">
                  {col.links.map(([label, href]) => (
                    <Link
                      key={href + label}
                      href={href}
                      className="text-night-text hover:text-[#F4E4AC]"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile accordions (≤760px) */}
          <div className="flex w-full flex-[1_1_100%] flex-col foot:hidden">
            {columns.map((col, i) => (
              <div
                key={col.heading}
                className={`border-t border-[rgba(201,162,75,.2)] ${
                  i === columns.length - 1
                    ? "border-b border-b-[rgba(201,162,75,.2)]"
                    : ""
                }`}
              >
                <button
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-0.5 py-[17px] font-mono text-[11.5px] tracking-[.22em] text-gold-bright"
                >
                  {col.heading}{" "}
                  <span aria-hidden="true" className="text-[15px]">
                    {open === i ? "–" : "+"}
                  </span>
                </button>
                {open === i && (
                  <div className="flex flex-col gap-[13px] px-0.5 pb-5 text-[15px]">
                    {col.links.map(([label, href]) => (
                      <Link
                        key={href + label}
                        href={href}
                        className="text-night-text"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer + colophon */}
        <div className="mt-[clamp(36px,5vw,56px)] border-t border-[rgba(201,162,75,.22)] pt-7">
          <p className="m-0 max-w-[105ch] text-[12.5px] leading-[1.75] text-night-muted">
            PDS Global is the brand of {config.entity}, a loan service provider
            (LSP) and direct selling agent of RBI-regulated banks and NBFCs,
            and part of the {config.group}. PDS Global does not lend from its
            own balance sheet and does not guarantee loan approval — sanction,
            disbursal, interest rates and terms rest solely with our partner
            lenders and depend on each applicant&apos;s eligibility and credit
            profile. Calculators on this site produce estimates for planning,
            not offers. Partner brand names and marks belong to their
            respective owners.
          </p>
          <div className="flex flex-col gap-[9px] pt-[22px] pb-[26px]">
            <p className="m-0 font-mono text-[11px] leading-[1.8] tracking-[.06em] text-[#7A7059]">
              © 2026 PDS GLOBAL FINANCIAL SERVICES PVT. LTD. · CIN {config.cin}
            </p>
            <p className="m-0 font-mono text-[11px] leading-[1.8] tracking-[.06em] text-[#7A7059]">
              PART OF THE FINANCE BUDDHA GROUP · ISO/IEC 27001 CERTIFIED
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
