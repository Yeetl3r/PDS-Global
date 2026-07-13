import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { config, telHref } from "@/lib/config";
import { routes } from "@/lib/routes";
import { ApplyClient } from "./apply-client";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply for a personal loan up to ₹50 lakhs at rates from 10.49% p.a. A PDS Global advisor replies on WhatsApp within 15 minutes.",
};

/**
 * Quick apply funnel. Deliberately outside the (site) route group: the design
 * renders its own compact chrome (logo left, Help right) instead of the shared
 * SiteHeader/SiteFooter.
 */
export default function ApplyPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[rgba(176,138,46,.28)] bg-[rgba(252,250,245,.92)] backdrop-blur-[14px]">
        <div className="mx-auto flex h-[66px] max-w-[960px] items-center justify-between gap-4 px-[clamp(16px,4vw,32px)]">
          <Link
            href={routes.home}
            aria-label="PDS Global — home"
            className="flex items-center gap-2.5 text-ink hover:text-ink"
          >
            <Image
              src="/assets/pds-logo.png"
              alt="PDS Global"
              width={36}
              height={36}
              priority
              className="h-9 w-9 shrink-0 rounded-[10px] border border-[rgba(176,138,46,.4)] bg-white object-contain shadow-[0_3px_8px_rgba(140,101,21,.22)]"
            />
            <span className="flex flex-col leading-none">
              <span className="whitespace-nowrap font-display text-[21px] font-semibold">
                PDS Global
              </span>
              <span className="mt-[3px] font-mono text-[8px] tracking-[.4em] text-gold">
                FINANCE
              </span>
            </span>
          </Link>
          <a
            href={telHref}
            className="inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap text-body hover:text-gold"
          >
            <span
              aria-hidden="true"
              className="h-[7px] w-[7px] rounded-full bg-gold-mid [animation:pulse-dot_2.2s_infinite]"
            />
            Help · {config.phone}
          </a>
        </div>
      </header>

      <ApplyClient />

      <footer className="mt-[clamp(48px,7vw,80px)] border-t border-[rgba(176,138,46,.28)] px-[clamp(20px,4.5vw,48px)] pt-7 pb-9">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="mb-4 text-xs leading-[1.75] text-caption">
            {config.brand} ({config.entity}) is a loan service provider and DSA
            of RBI-regulated banks and NBFCs, part of the {config.group}. We do
            not lend from our own books and never guarantee approval — offers
            depend on lender eligibility and your credit profile.
          </p>
          <p className="m-0 flex flex-wrap justify-center gap-x-[18px] gap-y-1.5 text-[13px]">
            <Link href={routes.home}>Home</Link>{" "}
            <Link href={routes.terms}>Terms</Link>{" "}
            <Link href={routes.privacy}>Privacy</Link>{" "}
            <Link href={routes.grievanceRedressal}>Grievance redressal</Link>{" "}
            <Link href={routes.contactUs}>Contact</Link>
          </p>
          <p className="mt-[18px] font-mono text-[10.5px] tracking-[.08em] text-faint">
            © 2026 PDS GLOBAL FINANCIAL SERVICES PVT. LTD.
          </p>
        </div>
      </footer>
    </>
  );
}
