"use client";

import { useState } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

type Category =
  | "Credit Score"
  | "Personal Loan"
  | "Personal Finance"
  | "Business Loan"
  | "Home Loan";

interface Article {
  id: number;
  cat: Category;
  title: string;
  author: string;
  date: string;
  mins: number;
  excerpt: string;
  body: string[];
}

const categories = [
  "All",
  "Credit Score",
  "Personal Loan",
  "Personal Finance",
  "Business Loan",
  "Home Loan",
] as const;

const articles: Article[] = [
  {
    id: 1,
    cat: "Credit Score",
    title: "What actually moves your credit score (and what doesn’t)",
    author: "Ananya Rao",
    date: "02 JUL 2026",
    mins: 5,
    excerpt:
      "Checking your own score, closing an old card, one missed EMI — which of these matter? A working tour of the CIBIL model, minus the folklore.",
    body: [
      "Bureau models weigh five things, in roughly this order: repayment history (~35%), credit utilisation (~30%), account age, credit mix, and recent enquiries. Everything else you’ve heard — salary, employer brand, checking your own score — is folklore. Your income affects what a lender approves, but the score itself never sees your payslip.",
      "The practical reading: one 30-day late payment can cost 50–100 points and lingers for months, while high card utilisation is a fast, reversible drag. Pay a maxed card down below 30% of its limit and the score typically recovers within one or two reporting cycles.",
      "What doesn’t matter: soft enquiries (checking your own score), debit card usage, UPI activity, or closing a loan early. What quietly hurts: closing your oldest credit card, because account age falls — keep it alive with a small recurring charge instead.",
    ],
  },
  {
    id: 2,
    cat: "Personal Loan",
    title: "Flat vs reducing interest: the 30-second check that saves lakhs",
    author: "Vikram Shetty",
    date: "24 JUN 2026",
    mins: 4,
    excerpt:
      'A "12% flat" quote is not cheaper than a "16% reducing" one — it is dearer. The one question to ask every lender before comparing anything.',
    body: [
      'A flat rate charges interest on the full original principal for the entire tenure, even as you repay it. A reducing rate charges only on what you still owe. The same words — "twelve percent" — can describe two very different loans: 12% flat works out to roughly 21–22% reducing on a 3-year loan.',
      'The 30-second check: ask every lender, in writing, "What is the annualised reducing-balance rate, and what is the APR including processing fees?" RBI’s Key Facts Statement rules require lenders to disclose the APR — insist on seeing it before you compare offers.',
      "On a ₹5 lakh, 3-year loan, mistaking flat for reducing can cost upwards of ₹70,000 in extra interest. It is the single most expensive vocabulary confusion in Indian retail lending — and the easiest to avoid.",
    ],
  },
  {
    id: 3,
    cat: "Personal Finance",
    title: "The 50/30/20 rule, rewritten for Indian households",
    author: "Meera Kulkarni",
    date: "15 JUN 2026",
    mins: 6,
    excerpt:
      "Family obligations, festival seasons and single-income years don’t fit a Silicon Valley budget template. A version that survives contact with reality.",
    body: [
      'The classic split — 50% needs, 30% wants, 20% savings — assumes a nuclear household with no dependents beyond it. Most Indian budgets carry parents, siblings’ education, festival and wedding obligations. Pretending these are "wants" makes the budget fail in its first quarter, and the failure becomes an excuse to stop budgeting.',
      'Our advisors suggest 50/20/20/10: 50% essentials including family support, 20% savings and investments before anything else, 20% lifestyle, and 10% held as an "obligations sinking fund" for the festival season, ceremonies and the inevitable relative’s emergency.',
      "The one non-negotiable: total EMIs inside the 50%, never above 40% of take-home. Lenders underwrite to this line, and so should you — it is the difference between a loan that serves the household and one that runs it.",
    ],
  },
  {
    id: 4,
    cat: "Business Loan",
    title: "Collateral-free credit: what NBFCs really look for",
    author: "Vikram Shetty",
    date: "08 JUN 2026",
    mins: 5,
    excerpt:
      "No property to pledge? Digital-first lenders underwrite on three signals instead. Get them right and unsecured credit stops being a lottery.",
    body: [
      "When there is no collateral, the lender’s only security is evidence that your business behaves well with money. Three artefacts carry that evidence: GST returns (real turnover, filed on time), bank statements (inflow rhythm, no bounces, healthy average balance) and the promoter’s personal bureau file.",
      "Vintage matters more than size: a ₹40-lakh-turnover firm with three clean years usually out-scores a ₹2-crore firm with one. Before applying, spend a quarter fixing the fixable — route all revenue through one current account, stop cash top-ups, clear small overdue card balances.",
      'Expect 14–24% p.a. unsecured, against several points lower if you can offer security. The honest comparison is not "secured vs unsecured" but "rate saved vs asset at risk" — a call worth making with an advisor, not a slogan.',
    ],
  },
  {
    id: 5,
    cat: "Home Loan",
    title: "Prepay the home loan or invest the bonus?",
    author: "Ananya Rao",
    date: "30 MAY 2026",
    mins: 6,
    excerpt:
      "The eternal March question. The arithmetic is simple; the behaviour is not. A framework instead of a slogan.",
    body: [
      "The arithmetic: prepaying a 9% home loan is a guaranteed, tax-free 9% return. Beating it through investing requires equity-level risk, and Section 24 interest deductions soften — not erase — the comparison for most tax brackets.",
      'The behaviour: money earmarked "to invest later" often becomes consumption. A prepayment is irreversible in the good sense — it compounds silently and cannot be spent on a car.',
      "Our framework: first fill the emergency fund to six months, clear any credit above 12% (cards, personal loans), then split the remainder — half prepayment, half long-term investing. It is rarely optimal, and almost always right.",
    ],
  },
  {
    id: 6,
    cat: "Credit Score",
    title: "646 to 758 in six months: a repair diary",
    author: "PDS Advisory Desk",
    date: "21 MAY 2026",
    mins: 7,
    excerpt:
      "A real borrower’s month-by-month log — the disputes filed, the balances paid, and what moved the number (with her permission, and her name changed).",
    body: [
      'Month 1–2: "Shalini" pulled reports from all four bureaus and found a personal loan she had closed in 2023 still marked active, plus a ₹4,200 card balance written off without notice. Both disputes were filed online; the card was settled and re-reported as closed. Score: 646 → 671.',
      "Month 3–4: utilisation was the drag — two cards at 85% and 92% of limit. She paid both below 30% and asked one issuer for a limit increase (which lowers utilisation arithmetically). No new applications. Score: 671 → 712.",
      'Month 5–6: the old entries aged, the clean months stacked, and a forgotten ₹350 telecom due was cleared. Score: 758. Total cash outlay beyond dues she genuinely owed: zero. The lesson our advisors repeat — most "credit repair" is bookkeeping hygiene, and no paid agent can do it faster than you can.',
    ],
  },
  {
    id: 7,
    cat: "Personal Loan",
    title: "Loan against FD vs personal loan: the quiet alternative",
    author: "Meera Kulkarni",
    date: "12 MAY 2026",
    mins: 4,
    excerpt:
      "If you hold a fixed deposit, you may already have the cheapest loan available to you — at your own bank, against your own money.",
    body: [
      "A loan against FD is an overdraft up to 90% of your deposit, priced at just 1–2% above the FD rate — effectively 8.5–9.5% today, versus 11–24% for unsecured personal loans. The FD keeps earning interest throughout; approval is same-day, with no bureau enquiry.",
      "It suits short, certain needs: a 6-month cash gap, a medical deposit, bridging a payment. It does not suit needs larger than your deposit or longer than its term — breaking a large FD’s compounding to avoid a loan can cost more than the loan.",
      "The comparison to run: FD-loan interest paid minus FD interest earned, against the personal-loan quote for the same amount and tenure. Five minutes with both numbers usually settles it — and your advisor will happily run it with you before recommending anything.",
    ],
  },
  {
    id: 8,
    cat: "Personal Finance",
    title: "Emergency funds: how large is large enough?",
    author: "PDS Advisory Desk",
    date: "05 MAY 2026",
    mins: 5,
    excerpt:
      "Three months? Six? Twelve? The right answer depends on two questions about your income — not on a universal rule.",
    body: [
      "Question one: how replaceable is your income? A dual-income salaried household can hold three months of essential expenses; a single-earner family or a commission-based professional should hold six to nine; a seasonal business owner, up to twelve.",
      "Question two: what would a gap actually cost? List the obligations that cannot pause — EMIs, rent, school fees, insurance premiums, family support. That monthly figure, not your full spending, is what the fund must cover.",
      "Park it boring: sweep-in FDs or liquid funds, never equity, never locked products. And once it is full, stop — an oversized emergency fund is a quiet tax on your future. Surplus beyond the target belongs in investments, or in retiring expensive debt.",
    ],
  },
];

export function BlogsIndex() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);

  const list = articles.filter((a) => cat === "All" || a.cat === cat);
  const openArt = articles.find((a) => a.id === open);

  return (
    <div className="mx-auto max-w-[1180px] px-[clamp(20px,4.5vw,48px)] pt-[clamp(28px,4vw,44px)]">
      {/* ————— Category filter pills ————— */}
      <div
        role="group"
        aria-label="Filter articles by category"
        className="mb-[clamp(26px,3.5vw,38px)] flex flex-wrap justify-center gap-2"
      >
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`cursor-pointer rounded-full px-[18px] py-[9px] text-[13.5px] font-semibold whitespace-nowrap transition-all duration-150 ${
              cat === c
                ? "border border-ink bg-ink text-[#F3E7C4] shadow-[0_2px_8px_rgba(33,29,18,.25)]"
                : "border border-[#E2D8BF] bg-white text-body"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,640px),1fr))_minmax(min(100%,280px),320px)] items-start gap-[clamp(24px,3vw,36px)]">
        {/* ————— Article cards ————— */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-[18px]">
          {list.map((a) => (
            <article
              key={a.id}
              className="flex flex-col rounded-[20px] border border-line bg-white px-[26px] pt-[26px] pb-[22px] shadow-[0_1px_3px_rgba(59,42,4,.05)] transition-[transform,box-shadow,border-color] duration-[.25s] hover:-translate-y-1 hover:border-line-gold hover:shadow-[0_20px_48px_rgba(59,42,4,.1)]"
            >
              <span className="self-start rounded-full border border-[#EDE0BE] bg-[#F6EFDD] px-[11px] py-[5px] font-mono text-[9.5px] tracking-[.18em] text-gold">
                {a.cat.toUpperCase()}
              </span>
              <h2 className="mt-3.5 mb-2.5 font-display text-2xl leading-[1.18] font-semibold text-balance">
                {a.title}
              </h2>
              <p className="mb-[18px] flex-1 text-sm leading-[1.68] text-body">
                {a.excerpt}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[10.5px] tracking-[.08em] text-caption">
                  {a.author.toUpperCase()} · {a.date}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(a.id)}
                  className="cursor-pointer border-none bg-transparent px-0 py-1.5 text-[13.5px] font-bold whitespace-nowrap text-gold hover:text-gold-dark"
                >
                  Read more →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* ————— Sidebar ————— */}
        <aside className="sticky top-24 flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-[90px_90px_18px_18px] border border-line-strong bg-[linear-gradient(180deg,#FFFFFF,#FBF6EA)] px-6 pt-[34px] pb-6 text-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[repeating-radial-gradient(circle_at_50%_-24%,rgba(176,138,46,.1)_0_1px,transparent_1px_14px)]"
            />
            <div className="relative">
              <p className="mb-2 font-mono text-[10px] tracking-[.22em] text-gold">
                FREE · NO SCORE IMPACT
              </p>
              <p className="mb-4 font-display text-[23px] leading-[1.2] font-semibold">
                Check your credit score first.
              </p>
              <Link
                href={routes.creditScoreChecker}
                className="btn-gold gap-2 px-6 py-3 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,.55)]"
              >
                Check now →
              </Link>
            </div>
          </div>

          <div className="rounded-[18px] border border-line bg-white p-6">
            <p className="mb-2 font-mono text-[10px] tracking-[.22em] text-gold">
              NEED THE LOAN, NOT THE READING?
            </p>
            <p className="mb-3.5 text-sm leading-[1.65] text-body">
              Two minutes, one advisor, offers from 40+ lenders.
            </p>
            <Link href={routes.apply} className="text-sm font-bold">
              Apply now →
            </Link>
          </div>

          <div className="rounded-[18px] border border-[rgba(201,162,75,.4)] bg-night p-6">
            <p className="mb-2 font-mono text-[10px] tracking-[.22em] text-gold-bright">
              EARN WITH US
            </p>
            <p className="mb-3.5 font-display text-[21px] leading-[1.25] font-semibold text-cream">
              Become a lending partner.
            </p>
            <Link
              href={routes.partnerWithUs}
              className="text-sm font-bold text-[#E9CF79] hover:text-[#F4E4AC]"
            >
              Learn more →
            </Link>
          </div>
        </aside>
      </div>

      {/* ————— Article reader dialog ————— */}
      {openArt && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Article"
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[rgba(25,21,18,.55)] px-[clamp(12px,3vw,24px)] py-[clamp(16px,4vw,56px)] backdrop-blur-[4px]"
        >
          <div className="w-full max-w-[720px] overflow-hidden rounded-3xl border border-line-strong bg-paper shadow-[0_40px_100px_rgba(0,0,0,.4)] rise [animation-duration:.3s]">
            <div className="h-1 bg-[linear-gradient(90deg,#E3C568,#8E6B21)]" />
            <div className="p-[clamp(24px,4vw,44px)]">
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full border border-[#EDE0BE] bg-[#F6EFDD] px-[11px] py-[5px] font-mono text-[10px] tracking-[.18em] text-gold">
                  {openArt.cat.toUpperCase()}
                </span>
                <button
                  type="button"
                  aria-label="Close article"
                  onClick={() => setOpen(null)}
                  className="h-10 w-10 shrink-0 cursor-pointer rounded-[11px] border border-[#E6DCC2] bg-white text-[15px] text-ink hover:border-gold-mid"
                >
                  ✕
                </button>
              </div>
              <h2 className="mt-[18px] mb-2.5 font-display text-[clamp(27px,4vw,38px)] leading-[1.12] font-semibold text-balance">
                {openArt.title}
              </h2>
              <p className="mb-6 font-mono text-[11px] tracking-[.08em] text-caption">
                {openArt.author.toUpperCase()} · {openArt.date} · {openArt.mins}{" "}
                MIN READ
              </p>
              <div
                aria-hidden="true"
                className="mb-6 h-px bg-[linear-gradient(90deg,rgba(176,138,46,.5),rgba(176,138,46,0))]"
              />
              {openArt.body.map((t) => (
                <p
                  key={t}
                  className="mb-[18px] max-w-[64ch] text-base leading-[1.8] text-ink-soft"
                >
                  {t}
                </p>
              ))}
              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3.5 rounded-2xl border border-[#EDE0BE] bg-[#F6EFDD] px-6 py-5">
                <p className="text-sm font-semibold text-body">
                  Want this applied to your own numbers?
                </p>
                <Link
                  href={routes.apply}
                  className="btn-gold gap-2 px-[22px] py-[11px] text-[13.5px] shadow-[inset_0_1px_0_rgba(255,255,255,.55)]"
                >
                  Talk to an advisor →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
