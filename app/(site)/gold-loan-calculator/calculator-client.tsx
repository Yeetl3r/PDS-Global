"use client";

import Link from "next/link";
import { useState } from "react";
import EmiCalculator from "@/components/EmiCalculator";
import { waHref } from "@/lib/config";
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
    title: "Purity & weight",
    body: "Only the gold content counts — 22K jewellery is valued on its fine-gold weight; stones and making charges aren't.",
  },
  {
    title: "Loan-to-value",
    body: "RBI caps LTV at 75%. Borrowing below the cap often earns a better rate and keeps a cushion against price dips.",
  },
  {
    title: "Repayment scheme",
    body: "EMI, interest-only, or bullet at closure — same principal, quite different interest totals. Compare before signing.",
  },
  {
    title: "Gold price movement",
    body: "If prices fall sharply, lenders may ask for part-payment or extra pledge to restore the LTV — plan margin for it.",
  },
];

const benefits = [
  {
    strong: "Pledge less than you could",
    rest: " — knowing the EMI first often means borrowing against fewer ornaments.",
  },
  {
    strong: "Release the gold sooner",
    rest: " — test shorter tenures; gold loans reward quick closure with far less interest.",
  },
  {
    strong: "Compare against a personal loan",
    rest: " — run both calculators and let the totals, not habit, decide.",
  },
  {
    strong: "No enquiry, no pledge",
    rest: " — modelling here commits nothing and touches no bureau record.",
  },
];

const faqs = [
  {
    q: "Is my gold safe with the lender?",
    a: "Pledged gold is sealed in tamper-evident packets in your presence, stored in bank-grade vaults, and insured by the lender. You receive a receipt listing weight and purity, and the same sealed packet returns to you at closure.",
  },
  {
    q: "How much can I borrow per gram?",
    a: "It moves daily with the gold price. RBI permits up to 75% of market value — at recent prices that is roughly ₹5,500–₹6,500 per gram of 22K gold. Your advisor will share the day’s per-gram rates across partners.",
  },
  {
    q: "Does my credit score matter for a gold loan?",
    a: "Far less than for unsecured loans, because the gold itself secures the lender. Most partners approve thin-file or low-score borrowers on valuation alone — which makes gold loans a practical route while you rebuild a score.",
  },
  {
    q: "What happens if I can’t repay on time?",
    a: "Lenders first offer renewal or part-payment options. Auction of pledged gold is the last resort, only after mandated notices, and any surplus over dues is returned to you. If cash flow is uncertain, prefer a lower LTV and keep margin.",
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

export default function GoldLoanCalculatorClient() {
  const [faq, setFaq] = useState(-1);

  return (
    <main>
      {/* ————— Hero ————— */}
      <section className="bg-[radial-gradient(800px_400px_at_50%_-20%,rgba(201,162,75,.15),transparent_62%),#FCFAF5] px-[clamp(20px,4.5vw,48px)] pt-[clamp(36px,5vw,60px)] text-center">
        <p className="mb-4 font-mono text-[11.5px] tracking-[.22em] text-gold">
          TOOLS · GOLD LOAN
        </p>
        <h1 className="mx-auto mb-4 max-w-[22ch] font-display text-[clamp(34px,4.4vw,56px)] leading-[1.05] font-semibold tracking-[-.01em] text-balance">
          Gold loan calculator
        </h1>
        <p className="mx-auto max-w-[56ch] text-base leading-[1.65] text-body">
          Family gold can raise money in hours, at some of the lowest rates in
          lending. Plan the repayment before you pledge a single gram.
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
            href={routes.contactUs}
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
            label="Gold loan"
            applyHref={routes.contactUs}
            applyLabel="Talk to an advisor"
            defaultAmount={200000}
            defaultRate={10}
            defaultMonths={12}
          />
          <p className="mx-1 mt-3 font-mono text-[10.5px] tracking-[.1em] text-faint">
            THIS MODELS EMI-STYLE GOLD LOANS. MANY LENDERS ALSO OFFER
            INTEREST-ONLY OR BULLET REPAYMENT — YOUR ADVISOR WILL COMPARE ALL
            THREE.
          </p>
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
            Secured by gold, priced accordingly.
          </h2>
          <p className="mb-3.5 max-w-[70ch] text-[15.5px] leading-[1.75] text-body">
            A gold loan is money lent against pledged jewellery or coins.
            Because the lender holds security, rates start around 9.5% p.a. —
            far below unsecured credit — and your credit score matters far
            less. The gold sits sealed in the lender&apos;s vault and returns
            to you on closure.
          </p>
          <p className="max-w-[70ch] text-[15.5px] leading-[1.75] text-body">
            RBI caps lending at 75% of the gold&apos;s market value (the
            loan-to-value ratio), so a per-gram rate moves daily with the gold
            price. What stays in your control is the repayment plan — which is
            exactly what this calculator models.
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
              Pledge gold for <strong className="text-ink">₹2,00,000</strong>{" "}
              at <strong className="text-ink">10% p.a.</strong> over{" "}
              <strong className="text-ink">12 months</strong>. Monthly rate r ≈
              0.0083, and (1.0083)<sup>12</sup> ≈ 1.1047. EMI = 2,00,000 ×
              0.0083 × 1.1047 ÷ 0.1047 ≈{" "}
              <strong className="text-gold">₹17,583 a month</strong> — about
              ₹11,000 of total interest for the year.
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
            What moves a gold loan.
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
            Why plan it here first.
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
                Estimate your <strong className="text-ink">amount</strong> —
                roughly 75% of your gold&apos;s market value is the ceiling
                lenders can offer.
              </p>
            </div>
            <div className="border-t border-line-soft pt-5">
              <p className="mb-2.5 font-mono text-[11px] tracking-[.2em] text-caption">
                STEP 02
              </p>
              <p className="text-[15px] leading-[1.7] text-body">
                Set the <strong className="text-ink">rate</strong> — gold loans
                on our panel run 9.5%–17% p.a. depending on lender and scheme.
              </p>
            </div>
            <div className="border-t border-line-soft pt-5">
              <p className="mb-2.5 font-mono text-[11px] tracking-[.2em] text-caption">
                STEP 03
              </p>
              <p className="text-[15px] leading-[1.7] text-body">
                Keep <strong className="text-ink">tenure</strong> short if you
                can — 6–12 months is the sweet spot for most gold borrowers.
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
            Gold loan questions, answered.
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
                Let the gold work; keep the gold.
              </h2>
              <p className="mx-auto mb-[26px] max-w-[52ch] text-[15.5px] text-[#5B4E23]">
                An advisor will compare per-gram rates and schemes across our
                gold-lending partners, including doorstep valuation options.
              </p>
              <div className="flex flex-wrap justify-center gap-3.5">
                <Link
                  href={routes.contactUs}
                  className="inline-flex items-center gap-[9px] rounded-full border border-ink bg-ink px-[30px] py-[15px] text-[15.5px] font-bold whitespace-nowrap text-[#F3E7C4] shadow-[0_10px_26px_rgba(33,26,7,.3)] transition-transform duration-[.18s] hover:-translate-y-px hover:text-[#F3E7C4]"
                >
                  Talk to an advisor →
                </Link>
                <a
                  href={waHref("Hi PDS Global! I'd like to discuss a gold loan.")}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-[9px] rounded-full border-[1.5px] border-ink bg-transparent px-7 py-3.5 text-[15.5px] font-bold whitespace-nowrap text-[#211505] transition-all duration-[.18s] hover:bg-[rgba(33,26,7,.08)] hover:text-[#211505]"
                >
                  WhatsApp us
                </a>
              </div>
              <p className="mt-[22px] font-mono text-[10.5px] tracking-[.12em] text-[#6E5D28]">
                ESTIMATES ONLY — OFFERS DEPEND ON LENDER ELIGIBILITY, GOLD
                VALUATION AND RBI LTV NORMS.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
