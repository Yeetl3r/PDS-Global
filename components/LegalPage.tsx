import Link from "next/link";
import { routes } from "@/lib/routes";

/**
 * Shared narrow-prose wrapper for the legal pages (terms, privacy, grievance
 * redressal, digital lending guidelines, consent revocation, application
 * consent). Shared legal page layout: LEGAL eyebrow, display
 * h1, mono "last updated" line, intro paragraph, gold hairline divider, the
 * page's sections, and a "← Back to home" link.
 */
export function LegalPage({
  title,
  lastUpdated,
  intro,
  children,
}: {
  title: string;
  lastUpdated: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="px-[clamp(20px,4.5vw,48px)]">
      <div className="mx-auto max-w-[820px] pt-[clamp(40px,6vw,72px)]">
        <p className="mb-3.5 font-mono text-[11.5px] tracking-[.22em] text-gold">
          LEGAL
        </p>
        <h1 className="mb-3.5 font-display text-[clamp(34px,4.4vw,54px)] leading-[1.05] font-semibold tracking-[-.01em] text-balance">
          {title}
        </h1>
        <p className="mb-[18px] font-mono text-[11px] tracking-[.06em] text-caption">
          {lastUpdated}
        </p>
        <p className="max-w-[68ch] text-[16.5px] leading-[1.7] text-body">
          {intro}
        </p>
        <div
          aria-hidden="true"
          className="my-[34px] h-px bg-[linear-gradient(90deg,rgba(176,138,46,.5),rgba(176,138,46,0))]"
        />
        {children}
        <p className="mt-7 text-[14.5px]">
          <Link href={routes.home} className="font-semibold">
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}

/** Numbered section heading, e.g. "1. What we collect". */
export function LegalH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-[34px] mb-3 font-display text-[clamp(22px,2.6vw,28px)] font-semibold">
      {children}
    </h2>
  );
}

/** Standard legal body paragraph; pass margin utilities via className. */
export function LegalP({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={`max-w-[70ch] text-[15.5px] leading-[1.78] text-ink-soft ${className}`.trim()}
    >
      {children}
    </p>
  );
}

/** Column of em-dash bullet lines; pass bottom margin via className. */
export function LegalDashList({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-[9px] ${className}`.trim()}>
      {children}
    </div>
  );
}

/** One em-dash bullet line inside a LegalDashList. */
export function LegalDashItem({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex max-w-[70ch] gap-3 text-[15px] leading-[1.7] text-ink-soft">
      <span className="text-gold-mid">—</span> {children}
    </p>
  );
}

/** Warm end-of-page card ("QUESTIONS…", "RELATED", "RAISE A CONCERN"). */
export function LegalCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-[38px] rounded-[18px] border border-[#EFE7D2] bg-paper-warm px-[26px] py-6">
      <p className="mb-2.5 font-mono text-[10.5px] tracking-[.2em] text-gold">
        {label}
      </p>
      <p className="max-w-[66ch] text-[15px] leading-[1.7] text-body">
        {children}
      </p>
    </div>
  );
}
