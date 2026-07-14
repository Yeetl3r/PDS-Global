"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Does checking my score here reduce it?",
    a: "No. When you check your own score it is recorded as a soft enquiry, which bureaus ignore in scoring. Only hard enquiries — a lender pulling your report to underwrite a loan — have any effect.",
  },
  {
    q: "How often does my score update?",
    a: "Lenders report to bureaus in monthly cycles, so expect movement every 30–45 days. A payment you made today typically shows in next month’s report.",
  },
  {
    q: "Why is my score different across bureaus?",
    a: "CIBIL, Experian, Equifax and CRIF each use their own model and may receive data from lenders at different times. A 10–40 point spread is normal; lenders know this and usually pick one bureau as primary.",
  },
  {
    q: "What score do I need for a personal loan?",
    a: "Most banks prefer 750+, several NBFC partners consider profiles from about 650, and secured products like gold loans depend far less on the score. Whatever your number, an advisor will tell you honestly which lenders realistically fit — approval is never guaranteed.",
  },
];

export function ScoreFaq() {
  const [open, setOpen] = useState(-1);

  return (
    <div className="overflow-hidden rounded-[18px] border border-line bg-white">
      {faqs.map((f, i) => (
        <div key={f.q} className="border-t border-[#F1EAD8]">
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
            className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent px-[22px] py-[18px] text-left transition-[background] duration-150 hover:bg-paper-warm"
          >
            <span className="text-[15.5px] font-semibold text-ink">{f.q}</span>
            <span
              aria-hidden="true"
              className="shrink-0 font-mono text-[17px] text-gold"
            >
              {open === i ? "–" : "+"}
            </span>
          </button>
          {open === i && (
            <div className="max-w-[68ch] px-[22px] pb-5 text-[14.5px] leading-[1.75] text-body rise [animation-duration:.25s] [animation-timing-function:ease]">
              {f.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
