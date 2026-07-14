import type { Metadata } from "next";
import { PartnerFaq, PartnerLeadForm } from "./partner-client";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "Become a PDS Global lending partner (DSA) — refer loans, earn commissions up to 3% of disbursed amounts, with training and monthly payouts.",
};

const heroStats: [string, string][] = [
  ["Up to 3%", "OF DISBURSED AMOUNT"],
  ["Monthly", "PAYOUT CYCLE, NO CAP"],
  ["Zero", "JOINING FEE, EVER"],
];

const infoCards: { label: string; items: string[] }[] = [
  {
    label: "ELIGIBILITY",
    items: [
      "— 21 years or older, resident in India",
      "— Any profession; no finance degree needed",
      "— A smartphone and a working bank account",
      "— Clean personal credit conduct",
    ],
  },
  {
    label: "DOCUMENTS",
    items: [
      "— PAN and Aadhaar",
      "— One passport photo",
      "— Cancelled cheque for payouts",
      "— GST registration, if you have one",
    ],
  },
  {
    label: "TRAINING & SUPPORT",
    items: [
      "— 2-hour online certification at onboarding",
      "— Product refreshers every quarter",
      "— Dedicated relationship manager",
      "— Co-branded marketing material",
    ],
  },
];

const steps = [
  {
    n: "STEP 01",
    title: "Apply",
    body: "The form above takes a minute; our team calls within one working day.",
  },
  {
    n: "STEP 02",
    title: "KYC & agreement",
    body: "Digital KYC and a plain-language partner agreement — no fees, no deposits.",
  },
  {
    n: "STEP 03",
    title: "Certify",
    body: "A 2-hour online session covering products, compliance and the referral app.",
  },
  {
    n: "STEP 04",
    title: "Start earning",
    body: "Refer your first client; payouts land in the monthly cycle after disbursal.",
  },
];

const earnings: [string, string][] = [
  ["Personal loans", "1.0% – 2.5% OF DISBURSAL"],
  ["Business loans", "1.5% – 3.0% OF DISBURSAL"],
  ["Gold loans", "0.75% – 1.5% OF DISBURSAL"],
];

export default function PartnerWithUsPage() {
  return (
    <main>
      {/* ————— Hero + lead form ————— */}
      <section className="relative overflow-hidden [background:radial-gradient(900px_480px_at_100%_-10%,rgba(201,162,75,.14),transparent_60%),#FCFAF5]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-[clamp(36px,5vw,72px)] px-[clamp(20px,4.5vw,48px)] pt-[clamp(40px,6vw,76px)] pb-0">
          <div>
            <p className="mb-4 font-mono text-[11.5px] tracking-[.22em] text-gold rise">
              PARTNER PROGRAMME · DSA
            </p>
            <h1 className="mb-[18px] max-w-[17ch] font-display text-[clamp(36px,4.6vw,60px)] leading-[1.04] font-semibold tracking-[-.01em] text-balance rise [animation-delay:.08s]">
              Build a lending practice, without a lending licence.
            </h1>
            <p className="mb-7 max-w-[48ch] text-[16.5px] leading-[1.68] text-body rise [animation-delay:.16s]">
              Refer clients who need loans; PDS Global and its 40+ partner
              lenders do the rest. You earn a commission on every disbursal —
              with training, marketing material and a relationship manager
              behind you.
            </p>
            <div className="flex flex-wrap gap-3 rise [animation-delay:.22s]">
              {heroStats.map(([big, small]) => (
                <div
                  key={small}
                  className="rounded-2xl border border-line bg-white px-[22px] py-4"
                >
                  <p className="font-display text-[27px] font-bold">{big}</p>
                  <p className="mt-1 font-mono text-[10px] tracking-[.16em] text-caption">
                    {small}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <PartnerLeadForm />
          </div>
        </div>
      </section>

      {/* ————— What a DSA is ————— */}
      <section
        aria-label="What a DSA is"
        className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(64px,9vw,100px)]"
      >
        <div className="mx-auto max-w-[820px]">
          <p className="mb-3 font-mono text-[11px] tracking-[.22em] text-gold">
            THE ROLE
          </p>
          <h2 className="mb-4 font-display text-[clamp(28px,3.4vw,40px)] font-semibold">
            What a lending partner does.
          </h2>
          <p className="mb-3.5 max-w-[70ch] text-[15.5px] leading-[1.75] text-body">
            A DSA — direct selling agent — is the human bridge between
            borrowers and lenders. You identify people and businesses who need
            credit, help them assemble a clean application, and hand it to PDS
            Global. We run the lender matching, compliance and paperwork; the
            lender sanctions and disburses; you&apos;re paid a commission on
            every rupee disbursed.
          </p>
          <p className="max-w-[70ch] text-[15.5px] leading-[1.75] text-body">
            It suits anyone whose work already earns financial trust — CAs,
            advisors, property consultants, ex-bankers — and anyone with a
            strong local network willing to learn. Your responsibilities:
            represent products honestly, never promise approval, collect
            documents with consent, and stay reachable to your clients. We
            handle the rest.
          </p>
        </div>
      </section>

      {/* ————— Eligibility, documents, training ————— */}
      <section
        aria-label="Eligibility and documents"
        className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(56px,8vw,88px)]"
      >
        <div className="mx-auto grid max-w-[1020px] grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[18px]">
          {infoCards.map((card) => (
            <div
              key={card.label}
              className="rounded-[20px] border border-line bg-white px-[30px] py-7"
            >
              <p className="mb-3.5 font-mono text-[10.5px] tracking-[.22em] text-gold">
                {card.label}
              </p>
              <div className="flex flex-col gap-2.5 text-[14.5px] leading-[1.65] text-body">
                {card.items.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ————— Registration process ————— */}
      <section
        aria-label="Registration process"
        className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(64px,9vw,100px)]"
      >
        <div className="mx-auto max-w-[1020px]">
          <p className="mb-3 text-center font-mono text-[11px] tracking-[.22em] text-gold">
            GETTING STARTED
          </p>
          <h2 className="mx-auto mb-[26px] text-center font-display text-[clamp(28px,3.4vw,40px)] font-semibold">
            Registered in four steps.
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-[clamp(18px,3vw,28px)]">
            {steps.map((s) => (
              <div key={s.n} className="border-t border-line-soft pt-5">
                <p className="mb-2.5 font-mono text-[11px] tracking-[.2em] text-caption">
                  {s.n}
                </p>
                <h3 className="mb-2 font-display text-[23px] font-semibold">
                  {s.title}
                </h3>
                <p className="text-sm leading-[1.7] text-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Earnings ————— */}
      <section
        aria-label="Earnings"
        className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(64px,9vw,100px)]"
      >
        <div className="mx-auto max-w-[820px]">
          <p className="mb-3 font-mono text-[11px] tracking-[.22em] text-gold">
            EARNINGS
          </p>
          <h2 className="mb-5 font-display text-[clamp(28px,3.4vw,40px)] font-semibold">
            What partners actually earn.
          </h2>
          <div className="overflow-hidden rounded-[20px] border border-line bg-white">
            {earnings.map(([product, rate]) => (
              <div
                key={product}
                className="flex flex-wrap items-baseline justify-between gap-4 border-t border-[#F1EAD8] px-6 py-[18px]"
              >
                <span className="text-[15.5px] font-semibold">{product}</span>
                <span className="font-mono text-[13.5px] font-semibold text-gold">
                  {rate}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3.5 rounded-[18px] border border-[#EFE7D2] bg-paper-warm px-6 py-5">
            <p className="max-w-[70ch] text-[14.5px] leading-[1.75] text-body">
              <strong className="text-ink">A working example:</strong> refer
              ₹20 lakhs of personal loan disbursals in a month — three or four
              typical clients — and you earn{" "}
              <strong className="text-gold">₹20,000–₹50,000</strong> that
              cycle. There is no cap and no monthly minimum; slow months simply
              pay less.
            </p>
          </div>
          <p className="mt-3.5 font-mono text-[10.5px] tracking-[.1em] text-faint">
            RATES VARY BY LENDER AND PRODUCT MIX · COMMISSIONS ARE PAID ONLY ON
            DISBURSED LOANS · TDS APPLIES
          </p>
        </div>
      </section>

      {/* ————— FAQ ————— */}
      <section
        aria-label="Frequently asked questions"
        className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(64px,9vw,100px)]"
      >
        <div className="mx-auto max-w-[760px]">
          <h2 className="mb-[22px] text-center font-display text-[clamp(26px,3.4vw,38px)] font-semibold">
            Partner questions, answered.
          </h2>
          <PartnerFaq />
        </div>
      </section>
    </main>
  );
}
