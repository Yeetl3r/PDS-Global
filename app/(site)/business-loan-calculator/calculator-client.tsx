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
    title: "Vintage & turnover",
    body: "Lenders price 3+ years of operations and steady GST-filed turnover at visibly lower rates.",
  },
  {
    title: "Collateral",
    body: "Unsecured (collateral-free) loans run 14–24% p.a.; secured facilities can drop several points below that.",
  },
  {
    title: "Banking discipline",
    body: "Clean current-account conduct — no cheque bounces, healthy average balance — directly improves the quote.",
  },
  {
    title: "Promoter's score",
    body: "For proprietorships and small firms, the owner's personal credit score carries much of the decision.",
  },
];

const benefits = [
  {
    strong: "Protect working capital",
    rest: " — confirm the EMI clears comfortably even in your slowest quarter.",
  },
  {
    strong: "Price expansion honestly",
    rest: " — weigh the machine, the stock or the fit-out against its true monthly cost.",
  },
  {
    strong: "Compare structures",
    rest: " — a shorter unsecured loan versus a longer secured one becomes a five-second comparison.",
  },
  {
    strong: "No bureau footprint",
    rest: " — model freely; nothing here touches your or your firm's credit record.",
  },
];

const faqs = [
  {
    q: "Do I need collateral for a business loan?",
    a: "Not necessarily. Several partner NBFCs offer collateral-free loans up to about ₹75 lakhs for businesses with 2–3 years of vintage and healthy banking. Secured options exist too, usually at lower rates — your advisor will lay out both.",
  },
  {
    q: "What documents will lenders ask for?",
    a: "Typically: PAN (firm and promoter), GST returns for 12 months, bank statements for 6–12 months, ITR for 2 years, and proof of business address. Requirements vary by lender and loan size.",
  },
  {
    q: "Flat rate vs reducing rate — what should I enter here?",
    a: 'This calculator uses the reducing-balance method, which is how most bank and NBFC term loans actually charge. If a quote you received is a "flat rate", it is not comparable — a 12% flat is roughly 21–22% reducing. Ask every lender for the reducing rate or the APR.',
  },
  {
    q: "How fast can a business loan disburse?",
    a: "Collateral-free loans from digital-first NBFCs can disburse in 2–5 working days after documents. Secured or larger facilities take longer — typically 2–4 weeks including valuation. Timelines rest with the lender.",
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

export default function BusinessLoanCalculatorClient() {
  const [faq, setFaq] = useState(-1);

  return (
    <main>
      {/* ————— Hero ————— */}
      <section className="bg-[radial-gradient(800px_400px_at_50%_-20%,rgba(201,162,75,.13),transparent_62%),#FCFAF5] px-[clamp(20px,4.5vw,48px)] pt-[clamp(36px,5vw,60px)] text-center">
        <p className="mb-4 font-mono text-[11.5px] tracking-[.22em] text-gold">
          TOOLS · BUSINESS LOAN
        </p>
        <h1 className="mx-auto mb-4 max-w-[22ch] font-display text-[clamp(34px,4.4vw,56px)] leading-[1.05] font-semibold tracking-[-.01em] text-balance">
          Business loan EMI calculator
        </h1>
        <p className="mx-auto max-w-[56ch] text-base leading-[1.65] text-body">
          Before working capital becomes a working worry — see exactly what a
          borrowing will cost your business each month.
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
            label="Business loan"
            applyHref={routes.contactUs}
            applyLabel="Talk to an advisor"
            defaultAmount={1000000}
            defaultRate={16}
            defaultMonths={36}
          />
          <p className="mx-1 mt-3 font-mono text-[10.5px] tracking-[.1em] text-faint">
            BUSINESS LOANS ON OUR PANEL GO UP TO ₹75,00,000 — FOR AMOUNTS
            BEYOND THE SLIDER, YOUR ADVISOR WILL MODEL IT WITH YOU.
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
            An EMI your cash flow can carry.
          </h2>
          <p className="mb-3.5 max-w-[70ch] text-[15.5px] leading-[1.75] text-body">
            A business loan EMI works like any other — principal and interest
            in one fixed monthly payment — but the stakes differ: the
            instalment must clear from operating cash flow in lean months as
            well as good ones.
          </p>
          <p className="max-w-[70ch] text-[15.5px] leading-[1.75] text-body">
            Bankers commonly look for EMIs within 30–40% of average monthly
            business surplus. Model your borrowing here first, and you&apos;ll
            know whether to trim the amount, stretch the tenure, or negotiate
            the rate before you commit.
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
              Borrow <strong className="text-ink">₹10,00,000</strong> at{" "}
              <strong className="text-ink">16% p.a.</strong> for{" "}
              <strong className="text-ink">36 months</strong>. Monthly rate r ≈
              0.0133, and (1.0133)<sup>36</sup> ≈ 1.611. EMI = 10,00,000 ×
              0.0133 × 1.611 ÷ 0.611 ≈{" "}
              <strong className="text-gold">₹35,157 a month</strong> — about
              ₹2.66 lakh of total interest over the three years.
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
            What moves a business loan EMI.
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
            Model first, borrow second.
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
                Enter the <strong className="text-ink">amount</strong> the
                business plan actually needs — resist rounding up.
              </p>
            </div>
            <div className="border-t border-line-soft pt-5">
              <p className="mb-2.5 font-mono text-[11px] tracking-[.2em] text-caption">
                STEP 02
              </p>
              <p className="text-[15px] leading-[1.7] text-body">
                Set a <strong className="text-ink">rate</strong> from your
                quotes; unsecured business loans on our panel run 14–24% p.a.
              </p>
            </div>
            <div className="border-t border-line-soft pt-5">
              <p className="mb-2.5 font-mono text-[11px] tracking-[.2em] text-caption">
                STEP 03
              </p>
              <p className="text-[15px] leading-[1.7] text-body">
                Tune <strong className="text-ink">tenure</strong> until the EMI
                fits your monthly surplus with room to breathe — then talk to
                an advisor.
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
            Business borrowing, answered.
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
                Growth shouldn&apos;t wait for paperwork.
              </h2>
              <p className="mx-auto mb-[26px] max-w-[54ch] text-[15.5px] text-[#5B4E23]">
                Tell an advisor about your business — they&apos;ll shortlist
                lenders for your turnover, vintage and sector, collateral-free
                where possible.
              </p>
              <div className="flex flex-wrap justify-center gap-3.5">
                <Link
                  href={routes.contactUs}
                  className="inline-flex items-center gap-[9px] rounded-full border border-ink bg-ink px-[30px] py-[15px] text-[15.5px] font-bold whitespace-nowrap text-[#F3E7C4] shadow-[0_10px_26px_rgba(33,26,7,.3)] transition-transform duration-[.18s] hover:-translate-y-px hover:text-[#F3E7C4]"
                >
                  Talk to an advisor →
                </Link>
                <a
                  href={waHref(
                    "Hi PDS Global! I'd like to discuss a business loan for my firm.",
                  )}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-[9px] rounded-full border-[1.5px] border-ink bg-transparent px-7 py-3.5 text-[15.5px] font-bold whitespace-nowrap text-[#211505] transition-all duration-[.18s] hover:bg-[rgba(33,26,7,.08)] hover:text-[#211505]"
                >
                  WhatsApp us
                </a>
              </div>
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
