"use client";

import Link from "next/link";
import { useState } from "react";
import EmiCalculator from "@/components/EmiCalculator";
import { routes } from "@/lib/routes";

const navItems = [
  ["#overview", "Overview"],
  ["#formula", "Formula"],
  ["#factors", "Factors"],
  ["#benefits", "Benefits"],
  ["#how", "How to use"],
  ["#faqs", "FAQs"],
] as const;

const factors = [
  {
    title: "Principal",
    body: "EMI scales linearly — borrow 20% less and the EMI drops 20%. Borrow only what the purpose truly needs.",
  },
  {
    title: "Interest rate",
    body: "Set by the lender on your credit profile. On ₹3L over 24 months, each 1% p.a. is roughly ₹140 a month.",
  },
  {
    title: "Tenure",
    body: "Longer tenure shrinks the EMI but grows total interest. Stretch only as far as comfort demands.",
  },
  {
    title: "Credit profile",
    body: "A 750+ score, stable income and low existing EMIs earn you the lower end of every lender's rate band.",
  },
];

const benefits = [
  {
    strong: "Budget certainty",
    rest: " — know the exact monthly outflow before committing, and test it against your other obligations.",
  },
  {
    strong: "Tenure comparison",
    rest: " — slide between 24 and 48 months and watch the interest cost of comfort, in rupees.",
  },
  {
    strong: "Negotiating power",
    rest: " — when you know what 11.5% versus 13% costs monthly, lender conversations change tone.",
  },
  {
    strong: "Zero footprint",
    rest: " — calculators involve no bureau enquiry. Model as many scenarios as you like.",
  },
];

const faqs = [
  {
    q: "Is the EMI shown here what I will actually pay?",
    a: "It is the exact EMI for the amount, rate and tenure you set — but your final rate is decided by the lender, and processing fees (typically 1–3%) are charged separately. Treat this as a planning estimate, never an approval or an offer.",
  },
  {
    q: "Should I pick the longest tenure for the smallest EMI?",
    a: "Only if cash flow demands it. On ₹3,00,000 at 12%, moving from 24 to 60 months cuts the EMI from about ₹14,123 to ₹6,673 — but total interest more than doubles, from roughly ₹39,000 to over ₹1,00,000. Choose the shortest tenure that stays comfortable.",
  },
  {
    q: "Does using the calculator affect my credit score?",
    a: "No. It runs entirely on this page with no bureau enquiry. Even applying through PDS Global begins with a soft check — a hard enquiry happens only when you proceed with a lender.",
  },
  {
    q: "What is a realistic personal loan rate today?",
    a: "Across our 40+ partners, personal loans currently run from 10.49% p.a. for strong salaried profiles to about 24% p.a. for thinner files. Your advisor will show the genuine band for your profile before you commit to anything.",
  },
];

/** Gold orb bullet used in the benefits list. */
function GoldDot() {
  return (
    <span
      aria-hidden="true"
      className="mt-2 h-[9px] w-[9px] shrink-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,#F4E4AC,#C9A24B_55%,#8E6B21)]"
    />
  );
}

export default function PersonalLoanCalculatorClient() {
  const [faq, setFaq] = useState(-1);

  return (
    <main>
      {/* ————— Hero ————— */}
      <section className="bg-[radial-gradient(800px_400px_at_50%_-20%,rgba(201,162,75,.13),transparent_62%),#FCFAF5] px-[clamp(20px,4.5vw,48px)] pt-[clamp(36px,5vw,60px)] text-center">
        <p className="mb-4 font-mono text-[11.5px] tracking-[.22em] text-gold">
          TOOLS · PERSONAL LOAN
        </p>
        <h1 className="mx-auto mb-4 max-w-[22ch] font-display text-[clamp(34px,4.4vw,56px)] leading-[1.05] font-semibold tracking-[-.01em] text-balance">
          Personal loan EMI calculator
        </h1>
        <p className="mx-auto max-w-[56ch] text-base leading-[1.65] text-body">
          Set the amount, rate and tenure — see your monthly EMI, total
          interest and full repayment picture before you speak to a single
          lender.
        </p>
      </section>

      {/* ————— Anchor nav ————— */}
      <nav
        aria-label="On this page"
        className="sticky top-[74px] z-40 mt-[clamp(28px,4vw,44px)] border-b border-[rgba(176,138,46,.24)] bg-[rgba(252,250,245,.94)] backdrop-blur-[12px]"
      >
        <div className="mx-auto flex max-w-[1180px] items-center gap-1 overflow-x-auto px-[clamp(20px,4.5vw,48px)] py-2.5 whitespace-nowrap">
          {navItems.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-3.5 py-2 text-[13.5px] font-semibold text-body hover:bg-[#F3EDDD] hover:text-ink"
            >
              {label}
            </a>
          ))}
          <Link
            href={routes.personalLoanApplication}
            className="btn-gold ml-auto gap-[7px] px-5 py-[9px] text-[13.5px] shadow-[inset_0_1px_0_rgba(255,255,255,.55)]"
          >
            Apply now
          </Link>
        </div>
      </nav>

      {/* ————— Calculator ————— */}
      <section
        id="calculator"
        className="scroll-mt-[150px] px-[clamp(20px,4.5vw,48px)] pt-[clamp(28px,4vw,44px)]"
      >
        <div className="mx-auto max-w-[1180px]">
          <EmiCalculator
            label="Personal loan"
            applyHref={routes.personalLoanApplication}
            applyLabel="Apply now"
            defaultAmount={300000}
            defaultRate={12}
            defaultMonths={24}
          />
        </div>
      </section>

      {/* ————— Overview ————— */}
      <section
        id="overview"
        className="scroll-mt-[150px] px-[clamp(20px,4.5vw,48px)] pt-[clamp(56px,8vw,88px)]"
      >
        <div className="mx-auto max-w-[820px]">
          <p className="mb-3 font-mono text-[11px] tracking-[.22em] text-gold">
            OVERVIEW
          </p>
          <h2 className="mb-4 font-display text-[clamp(28px,3.4vw,40px)] font-semibold">
            Why plan the EMI before the loan?
          </h2>
          <p className="mb-3.5 max-w-[70ch] text-[15.5px] leading-[1.75] text-body">
            An EMI — equated monthly instalment — is the fixed amount you repay
            each month, blending principal and interest so the loan retires
            exactly at tenure&apos;s end. Early instalments are interest-heavy;
            later ones repay mostly principal.
          </p>
          <p className="max-w-[70ch] text-[15.5px] leading-[1.75] text-body">
            Working the number out first tells you what tenure your salary can
            absorb comfortably — most advisors suggest keeping all EMIs within
            40–50% of monthly income. It also gives you a benchmark: when a
            lender&apos;s quote arrives, you&apos;ll know exactly what each
            0.5% of interest costs you.
          </p>
        </div>
      </section>

      {/* ————— Formula ————— */}
      <section
        id="formula"
        className="scroll-mt-[150px] px-[clamp(20px,4.5vw,48px)] pt-[clamp(56px,8vw,88px)]"
      >
        <div className="mx-auto max-w-[820px]">
          <p className="mb-3 font-mono text-[11px] tracking-[.22em] text-gold">
            FORMULA
          </p>
          <h2 className="mb-[18px] font-display text-[clamp(28px,3.4vw,40px)] font-semibold">
            The arithmetic, in the open.
          </h2>
          <div className="rounded-[18px] border border-line bg-white p-[clamp(22px,3vw,32px)] text-center">
            <p className="font-mono text-[clamp(15px,2.2vw,19px)] tracking-[.04em] text-ink">
              EMI = P × r × (1 + r)<sup>n</sup> ÷ ((1 + r)<sup>n</sup> − 1)
            </p>
            <p className="mt-3.5 text-[13.5px] leading-[1.7] text-caption">
              P = principal · r = monthly rate (annual ÷ 12 ÷ 100) · n = tenure
              in months
            </p>
          </div>
          <div className="mt-3.5 rounded-[18px] border border-[#EFE7D2] bg-paper-warm p-[clamp(20px,3vw,28px)]">
            <p className="mb-3 font-mono text-[10.5px] tracking-[.2em] text-gold">
              WORKED EXAMPLE
            </p>
            <p className="max-w-[70ch] text-[15px] leading-[1.8] text-body">
              Borrow <strong className="text-ink">₹3,00,000</strong> at{" "}
              <strong className="text-ink">12% p.a.</strong> for{" "}
              <strong className="text-ink">24 months</strong>. Monthly rate r =
              0.01, and (1.01)<sup>24</sup> ≈ 1.2697. EMI = 3,00,000 × 0.01 ×
              1.2697 ÷ 0.2697 ≈{" "}
              <strong className="text-gold">₹14,123 a month</strong> — about
              ₹38,950 of total interest over the two years.
            </p>
          </div>
        </div>
      </section>

      {/* ————— Factors ————— */}
      <section
        id="factors"
        className="scroll-mt-[150px] px-[clamp(20px,4.5vw,48px)] pt-[clamp(56px,8vw,88px)]"
      >
        <div className="mx-auto max-w-[1020px]">
          <p className="mb-3 text-center font-mono text-[11px] tracking-[.22em] text-gold">
            FACTORS
          </p>
          <h2 className="mx-auto mb-[26px] max-w-[24ch] text-center font-display text-[clamp(28px,3.4vw,40px)] font-semibold">
            What moves your EMI.
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-3.5">
            {factors.map((f) => (
              <div
                key={f.title}
                className="rounded-[18px] border border-line bg-white px-6 py-[22px]"
              >
                <h3 className="mb-2 font-display text-[22px] font-semibold">
                  {f.title}
                </h3>
                <p className="text-sm leading-[1.7] text-body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Benefits ————— */}
      <section
        id="benefits"
        className="scroll-mt-[150px] px-[clamp(20px,4.5vw,48px)] pt-[clamp(56px,8vw,88px)]"
      >
        <div className="mx-auto max-w-[820px]">
          <p className="mb-3 font-mono text-[11px] tracking-[.22em] text-gold">
            BENEFITS
          </p>
          <h2 className="mb-[22px] font-display text-[clamp(28px,3.4vw,40px)] font-semibold">
            What the ten seconds buy you.
          </h2>
          <div className="flex flex-col gap-4">
            {benefits.map((b) => (
              <div key={b.strong} className="flex gap-3.5">
                <GoldDot />
                <p className="max-w-[64ch] text-[15px] leading-[1.7] text-body">
                  <strong className="text-ink">{b.strong}</strong>
                  {b.rest}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— How to use ————— */}
      <section
        id="how"
        className="scroll-mt-[150px] px-[clamp(20px,4.5vw,48px)] pt-[clamp(56px,8vw,88px)]"
      >
        <div className="mx-auto max-w-[1020px]">
          <p className="mb-3 text-center font-mono text-[11px] tracking-[.22em] text-gold">
            HOW TO USE
          </p>
          <h2 className="mx-auto mb-[26px] text-center font-display text-[clamp(28px,3.4vw,40px)] font-semibold">
            Three moves, one clear answer.
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-[clamp(20px,3vw,32px)]">
            <div className="border-t border-line-soft pt-5">
              <p className="mb-2.5 font-mono text-[11px] tracking-[.2em] text-caption">
                STEP 01
              </p>
              <p className="text-[15px] leading-[1.7] text-body">
                Set the <strong className="text-ink">amount</strong> you
                actually need — type it or slide between ₹50,000 and
                ₹10,00,000.
              </p>
            </div>
            <div className="border-t border-line-soft pt-5">
              <p className="mb-2.5 font-mono text-[11px] tracking-[.2em] text-caption">
                STEP 02
              </p>
              <p className="text-[15px] leading-[1.7] text-body">
                Enter the <strong className="text-ink">rate</strong> you
                expect. Personal loans on our panel currently run 10.49%–24%
                p.a. by profile.
              </p>
            </div>
            <div className="border-t border-line-soft pt-5">
              <p className="mb-2.5 font-mono text-[11px] tracking-[.2em] text-caption">
                STEP 03
              </p>
              <p className="text-[15px] leading-[1.7] text-body">
                Adjust <strong className="text-ink">tenure</strong> until the
                EMI sits comfortably inside your monthly budget — then apply
                with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ————— FAQs ————— */}
      <section
        id="faqs"
        className="scroll-mt-[150px] px-[clamp(20px,4.5vw,48px)] pt-[clamp(56px,8vw,88px)]"
      >
        <div className="mx-auto max-w-[760px]">
          <p className="mb-3 text-center font-mono text-[11px] tracking-[.22em] text-gold">
            FAQS
          </p>
          <h2 className="mb-[22px] text-center font-display text-[clamp(26px,3.4vw,38px)] font-semibold">
            Calculator questions, answered.
          </h2>
          <div className="overflow-hidden rounded-[18px] border border-line bg-white">
            {faqs.map((f, i) => {
              const open = faq === i;
              return (
                <div key={f.q} className="border-t border-[#F1EAD8]">
                  <button
                    type="button"
                    onClick={() => setFaq(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent px-[22px] py-[18px] text-left transition-[background] duration-150 hover:bg-paper-warm"
                  >
                    <span className="text-[15.5px] font-semibold text-ink">
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-mono text-[17px] text-gold"
                    >
                      {open ? "–" : "+"}
                    </span>
                  </button>
                  {open && (
                    <div className="max-w-[68ch] px-[22px] pb-5 text-[14.5px] leading-[1.75] text-body [animation:rise_.25s_ease_both]">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ————— Apply CTA ————— */}
      <section
        aria-label="Apply"
        className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(56px,8vw,88px)]"
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="relative overflow-hidden rounded-3xl border border-gold-bright bg-[linear-gradient(120deg,#F6ECCB,#E7CE85_55%,#DBBC62)] p-[clamp(32px,5vw,56px)] text-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[repeating-radial-gradient(circle_at_100%_-20%,rgba(120,89,18,.09)_0_1px,transparent_1px_16px)]"
            />
            <div className="relative">
              <h2 className="mb-2.5 font-display text-[clamp(28px,3.6vw,42px)] font-semibold text-[#211505]">
                The number works? Let&apos;s find the lender.
              </h2>
              <p className="mx-auto mb-[26px] max-w-[52ch] text-[15.5px] text-[#5B4E23]">
                Three minutes to apply — a named advisor compares your profile
                across 40+ lenders and reaches you on WhatsApp.
              </p>
              <Link
                href={routes.personalLoanApplication}
                className="inline-flex items-center gap-[9px] rounded-full border border-ink bg-ink px-[30px] py-[15px] text-[15.5px] font-bold whitespace-nowrap text-[#F3E7C4] shadow-[0_10px_26px_rgba(33,26,7,.3)] transition-transform duration-[.18s] hover:-translate-y-px hover:text-[#F3E7C4]"
              >
                Apply now →
              </Link>
              <p className="mt-[22px] font-mono text-[10.5px] tracking-[.12em] text-[#6E5D28]">
                ESTIMATES ONLY — OFFERS DEPEND ON LENDER ELIGIBILITY AND YOUR
                CREDIT PROFILE.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
