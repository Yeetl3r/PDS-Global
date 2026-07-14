import type { Metadata } from "next";
import { CheckerForm } from "./checker-form";
import { ScoreFaq } from "./score-faq";

export const metadata: Metadata = {
  title: "Credit Score Checker",
  description:
    "Check your credit score free with PDS Global — no impact on your score. Understand your range and how to improve it.",
};

const benefits: [string, string][] = [
  ["LOWER RATES", "A 750+ score routinely earns 2–5% lower interest."],
  ["BETTER OFFERS", "More lenders compete for a strong profile."],
  ["FASTER APPROVAL", "Clean reports sail through underwriting."],
  ["DATA SECURITY", "ISO 27001 processes; your PAN is never resold."],
];

const ranges: { label: string; body: string; gold?: boolean }[] = [
  {
    label: "300–649 · NEEDS WORK",
    body: "Most banks decline; some NBFCs lend at higher rates. Fixable in months, not years.",
  },
  {
    label: "650–699 · FAIR",
    body: "Several NBFC partners consider you, with moderate rates and closer income scrutiny.",
  },
  {
    label: "700–749 · GOOD",
    body: "Most lenders approve; rates land mid-band. Small fixes push you into the top tier.",
  },
  {
    label: "750–900 · EXCELLENT",
    body: "The best rates, highest limits and fastest approvals — lenders compete for you.",
    gold: true,
  },
];

const habits: { n: string; strong: string; rest: string }[] = [
  {
    n: "01",
    strong: "Pay every EMI and card bill on time.",
    rest: " Payment history is ~35% of the score; one 30-day delay can cost 50–100 points.",
  },
  {
    n: "02",
    strong: "Keep card utilisation under 30%.",
    rest: " Maxed-out limits read as stress, even when you pay in full.",
  },
  {
    n: "03",
    strong: "Don't close your oldest cards.",
    rest: " Account age matters; an old, well-behaved card is an asset.",
  },
  {
    n: "04",
    strong: "Space out loan applications.",
    rest: " Every hard enquiry dents the score a little; a burst of them dents it a lot.",
  },
  {
    n: "05",
    strong: "Dispute report errors fast.",
    rest: " Roughly 1 in 10 reports carries a mistake — closed loans shown open, someone else's default. Bureaus must fix verified errors within 30 days.",
  },
];

export default function CreditScoreCheckerPage() {
  return (
    <main>
      {/* ————— Hero: benefits + checker form ————— */}
      <section className="relative overflow-hidden [background:radial-gradient(900px_480px_at_0%_-10%,rgba(201,162,75,.13),transparent_60%),#FCFAF5]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-[clamp(36px,5vw,72px)] px-[clamp(20px,4.5vw,48px)] pt-[clamp(40px,6vw,76px)]">
          <div>
            <p className="mb-4 font-mono text-[11.5px] tracking-[.22em] text-gold rise">
              FREE CREDIT SCORE CHECK · NO SCORE IMPACT
            </p>
            <h1 className="mb-[18px] max-w-[16ch] font-display text-[clamp(36px,4.6vw,60px)] leading-[1.04] font-semibold tracking-[-.01em] text-balance rise [animation-delay:.08s]">
              Know your score before lenders do.
            </h1>
            <p className="mb-[30px] max-w-[48ch] text-[16.5px] leading-[1.68] text-body rise [animation-delay:.16s]">
              Your credit score decides the rate you&apos;re offered — often to
              the tune of lakhs over a loan&apos;s life. Check it free,
              understand it, and walk into any negotiation prepared.
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-3 rise [animation-delay:.22s]">
              {benefits.map(([label, body]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-line bg-white px-5 py-[18px]"
                >
                  <p className="mb-1.5 font-mono text-[10px] tracking-[.18em] text-gold">
                    {label}
                  </p>
                  <p className="text-[13.5px] leading-[1.6] text-body">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <CheckerForm />
          </div>
        </div>
      </section>

      {/* ————— What a credit score is ————— */}
      <section
        aria-label="What a credit score is"
        className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(64px,9vw,104px)]"
      >
        <div className="mx-auto max-w-[900px]">
          <p className="mb-3.5 text-center font-mono text-[11.5px] tracking-[.22em] text-gold">
            UNDERSTAND IT
          </p>
          <h2 className="mx-auto mb-[18px] max-w-[24ch] text-center font-display text-[clamp(30px,3.6vw,46px)] leading-[1.06] font-semibold text-balance">
            What a credit score actually is.
          </h2>
          <p className="mx-auto mb-[clamp(32px,4.5vw,44px)] max-w-[66ch] text-center text-base leading-[1.7] text-body">
            A three-digit number between 300 and 900, computed by RBI-licensed
            bureaus (CIBIL, Experian, Equifax, CRIF) from your repayment
            history, credit utilisation, account age and recent enquiries.
            Lenders read it as the probability you&apos;ll repay on time — and
            price your loan accordingly.
          </p>
          <div
            aria-label="Score ranges from 300 to 900"
            className="flex h-4 overflow-hidden rounded-full border border-line-soft"
          >
            <span className="flex-[0_0_41%] bg-[#EBDDB6]" title="300–649" />
            <span className="flex-[0_0_12%] bg-[#DCC17C]" title="650–699" />
            <span className="flex-[0_0_12%] bg-gold-bright" title="700–749" />
            <span
              className="flex-1 bg-[linear-gradient(90deg,#A9812C,#8E6B21)]"
              title="750–900"
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[11px] text-faint">
            <span>300</span>
            <span>650</span>
            <span>700</span>
            <span>750</span>
            <span>900</span>
          </div>
          <div className="mt-[26px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
            {ranges.map((r) => (
              <div
                key={r.label}
                className="rounded-2xl border border-line bg-white p-5"
              >
                <p
                  className={`mb-1.5 font-mono text-[10.5px] tracking-[.14em] ${r.gold ? "text-gold" : "text-caption"}`}
                >
                  {r.label}
                </p>
                <p className="text-[13.5px] leading-[1.65] text-body">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— How to improve your score ————— */}
      <section
        aria-label="How to improve your score"
        className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(64px,9vw,104px)]"
      >
        <div className="mx-auto max-w-[900px]">
          <h2 className="mx-auto mb-7 max-w-[24ch] text-center font-display text-[clamp(30px,3.6vw,46px)] leading-[1.06] font-semibold text-balance">
            Five habits that move it.
          </h2>
          <div className="flex flex-col overflow-hidden rounded-[20px] border border-line bg-white">
            {habits.map((h) => (
              <div
                key={h.n}
                className="flex gap-[18px] border-t border-[#F1EAD8] px-6 py-5"
              >
                <span className="mt-[3px] font-mono text-xs text-gold-mid">
                  {h.n}
                </span>
                <p className="max-w-[70ch] text-[15px] leading-[1.7] text-body">
                  <strong className="text-ink">{h.strong}</strong>
                  {h.rest}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— FAQ ————— */}
      <section
        aria-label="Frequently asked questions"
        className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(64px,9vw,104px)]"
      >
        <div className="mx-auto max-w-[760px]">
          <h2 className="mb-[22px] text-center font-display text-[clamp(26px,3.4vw,38px)] font-semibold">
            Score questions, answered.
          </h2>
          <ScoreFaq />
        </div>
      </section>
    </main>
  );
}
