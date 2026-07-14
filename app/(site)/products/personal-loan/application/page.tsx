import type { Metadata } from "next";
import { config } from "@/lib/config";
import ApplicationForm from "./application-form";

export const metadata: Metadata = {
  title: "Personal Loan Application",
  description:
    "Apply for a PDS Global personal loan — up to ₹50 lakhs from 40+ RBI-regulated lenders. A named advisor takes it from there.",
};

const afterSubmitSteps = [
  {
    n: "01",
    text: "Your advisor reviews the profile and calls or messages within ~15 working minutes.",
  },
  {
    n: "02",
    text: "You receive a lender shortlist with rates and terms, side by side, on WhatsApp.",
  },
  {
    n: "03",
    text: "Choose a lender; we help with documents through to disbursal — typically 1–4 days.",
  },
];

/** Gold orb bullet, as on Home. */
function GoldDot() {
  return (
    <span
      aria-hidden="true"
      className="mt-[7px] h-[9px] w-[9px] shrink-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,#F4E4AC,#C9A24B_55%,#8E6B21)]"
    />
  );
}

export default function PersonalLoanApplicationPage() {
  return (
    <main className="relative overflow-hidden [background:radial-gradient(900px_480px_at_100%_-10%,rgba(201,162,75,.13),transparent_60%),#FCFAF5]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-[clamp(36px,5vw,72px)] px-[clamp(20px,4.5vw,48px)] pt-[clamp(40px,6vw,72px)]">
        <div>
          <p className="mb-4 font-mono text-[11.5px] tracking-[.22em] text-gold rise">
            PERSONAL LOAN · UP TO ₹50,00,000
          </p>
          <h1 className="mb-[18px] max-w-[16ch] font-display text-[clamp(36px,4.6vw,60px)] leading-[1.04] font-semibold tracking-[-.01em] text-balance rise [animation-delay:.08s]">
            A considered application.
          </h1>
          <p className="mb-8 max-w-[48ch] text-[16.5px] leading-[1.68] text-body rise [animation-delay:.16s]">
            Ten fields, three minutes. Once you submit, a named PDS Global
            advisor reviews your profile and reaches you on WhatsApp — nothing
            is auto-approved, and nothing is spammed.
          </p>
          <div className="mb-9 flex flex-col gap-4 rise [animation-delay:.22s]">
            <div className="flex gap-[13px]">
              <GoldDot />
              <p className="max-w-[46ch] text-[14.5px] leading-[1.65] text-body">
                <strong className="text-ink">Encrypted end to end.</strong>{" "}
                Your details travel over 256-bit encryption and are shared only
                with lenders you choose.
              </p>
            </div>
            <div className="flex gap-[13px]">
              <GoldDot />
              <p className="max-w-[46ch] text-[14.5px] leading-[1.65] text-body">
                <strong className="text-ink">No score impact today.</strong> A
                hard bureau enquiry happens only if you proceed with a lender,
                with your consent.
              </p>
            </div>
            <div className="flex gap-[13px]">
              <GoldDot />
              <p className="max-w-[46ch] text-[14.5px] leading-[1.65] text-body">
                <strong className="text-ink">
                  One advisor, till disbursal.
                </strong>{" "}
                Reachable on WhatsApp or call — {config.phone}.
              </p>
            </div>
          </div>
          <div className="relative max-w-[420px] overflow-hidden rounded-[110px_110px_20px_20px] border border-line-strong bg-[linear-gradient(180deg,#FFFFFF,#FBF6EA)] px-7 pt-10 pb-[26px] shadow-[0_20px_52px_rgba(59,42,4,.1)] rise [animation-duration:.8s] [animation-delay:.28s]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[repeating-radial-gradient(circle_at_50%_-22%,rgba(176,138,46,.1)_0_1px,transparent_1px_14px)]"
            />
            <p className="relative mb-4 text-center font-mono text-[10.5px] tracking-[.24em] text-gold">
              AFTER YOU SUBMIT
            </p>
            <div className="relative flex flex-col gap-[13px]">
              {afterSubmitSteps.map((s) => (
                <p
                  key={s.n}
                  className="flex gap-3 text-sm leading-[1.6] text-body"
                >
                  <span className="mt-[2px] font-mono text-[11px] text-gold-mid">
                    {s.n}
                  </span>
                  {s.text}
                </p>
              ))}
            </div>
          </div>
        </div>
        <ApplicationForm />
      </div>
    </main>
  );
}
