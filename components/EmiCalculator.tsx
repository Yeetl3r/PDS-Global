"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Shared EMI calculator card. Rendered by the
 * three calculator pages with product-specific defaults and CTA.
 */
export interface EmiCalculatorProps {
  label?: string;
  applyHref: string;
  applyLabel?: string;
  defaultAmount?: number;
  defaultRate?: number;
  defaultMonths?: number;
}

const AMT_MIN = 50000;
const AMT_MAX = 1000000;
const RATE_MIN = 1;
const RATE_MAX = 30;
const MO_MIN = 3;
const MO_MAX = 60;

const CHIP_MONTHS = [3, 6, 9, 12, 24, 36];

function clamp(v: number, a: number, b: number): number {
  return Math.min(b, Math.max(a, v));
}

/** Indian digit grouping, rounded to the rupee. */
function fmt(n: number): string {
  return Math.round(n).toLocaleString("en-IN");
}

/** Gold-filled slider track up to the current value. */
function track(v: number, a: number, b: number): string {
  const p = ((clamp(v, a, b) - a) / (b - a)) * 100;
  return `linear-gradient(90deg,#B08A2E 0%,#B08A2E ${p}%,#EDE5D0 ${p}%,#EDE5D0 100%)`;
}

/* Range slider: gold-orb thumb, 6px pill track. */
const rangeClass =
  "m-0 h-1.5 w-full cursor-pointer appearance-none rounded-full " +
  "[&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[2.5px] [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[radial-gradient(circle_at_32%_28%,#F4E4AC,#C9A24B_55%,#8E6B21)] [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(87,61,10,.45)] " +
  "[&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[2.5px] [&::-moz-range-thumb]:border-solid [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[radial-gradient(circle_at_32%_28%,#F4E4AC,#C9A24B_55%,#8E6B21)] [&::-moz-range-thumb]:shadow-[0_2px_6px_rgba(87,61,10,.45)]";

const fieldLabelClass =
  "font-mono text-[11px] font-semibold tracking-[.14em] text-body";
const fieldBoxClass =
  "inline-flex items-center gap-[5px] rounded-[10px] border-[1.5px] border-[#E2D8BF] bg-white px-3 py-[7px]";
const scaleRowClass =
  "mt-2 flex justify-between font-mono text-[11px] text-faint";

function segClass(on: boolean): string {
  return `cursor-pointer rounded-full border-none px-4 py-2 text-[13px] font-semibold transition-all duration-150 ${
    on
      ? "bg-ink text-[#F3E7C4] shadow-[0_2px_6px_rgba(33,29,18,.3)]"
      : "bg-transparent text-body"
  }`;
}

function chipClass(on: boolean): string {
  return `cursor-pointer rounded-full px-[15px] py-2 text-[13px] font-semibold transition-all duration-150 tabular-nums ${
    on
      ? "border border-ink bg-ink text-[#F3E7C4]"
      : "border border-[#E2D8BF] bg-white text-body"
  }`;
}

export default function EmiCalculator({
  label = "Your loan",
  applyHref,
  applyLabel = "Apply now",
  defaultAmount = 300000,
  defaultRate = 12,
  defaultMonths = 24,
}: EmiCalculatorProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const [rate, setRate] = useState(defaultRate);
  const [months, setMonths] = useState(defaultMonths);
  const [view, setView] = useState<"amount" | "percent">("amount");
  const [amtText, setAmtText] = useState(() =>
    defaultAmount.toLocaleString("en-IN"),
  );
  const [rateText, setRateText] = useState(() => String(defaultRate));

  /* EMI = [P·r·(1+r)^n] / [(1+r)^n − 1]; zero interest → simple division. */
  const P = clamp(Number(amount) || AMT_MIN, AMT_MIN, AMT_MAX);
  const R = clamp(Number(rate) || RATE_MIN, RATE_MIN, RATE_MAX);
  const N = clamp(Math.round(Number(months)) || MO_MIN, MO_MIN, MO_MAX);
  const r = R / 1200;
  const pow = Math.pow(1 + r, N);
  let emi = r > 0 ? (P * r * pow) / (pow - 1) : P / N;
  if (!isFinite(emi) || isNaN(emi)) emi = P / N;
  const total = emi * N;
  const interest = Math.max(0, total - P);
  const pctI = total > 0 ? (interest / total) * 100 : 0;
  const pctP = 100 - pctI;

  const emiStr = "₹" + fmt(emi);
  const monthsStr = String(N);
  const rateNow = Math.round(R * 100) / 100 + "%";
  const pStr = view === "amount" ? "₹" + fmt(P) : pctP.toFixed(1) + "%";
  const iStr = view === "amount" ? "₹" + fmt(interest) : pctI.toFixed(1) + "%";

  const onAmtInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = e.target.value.replace(/[^\d]/g, "").slice(0, 8);
    setAmtText(d ? Number(d).toLocaleString("en-IN") : "");
    setAmount(Number(d) || 0);
  };
  const onAmtBlur = () => {
    const v = clamp(
      Number(String(amtText).replace(/\D/g, "")) || 300000,
      AMT_MIN,
      AMT_MAX,
    );
    setAmount(v);
    setAmtText(v.toLocaleString("en-IN"));
  };
  const onAmtSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setAmount(v);
    setAmtText(v.toLocaleString("en-IN"));
  };
  const onRateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = e.target.value.replace(/[^\d.]/g, "").slice(0, 5);
    setRateText(t);
    setRate(Number(t) || 1);
  };
  const onRateBlur = () => {
    const v = clamp(Number(rateText) || 12, RATE_MIN, RATE_MAX);
    setRate(v);
    setRateText(String(Math.round(v * 100) / 100));
  };
  const onRateSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setRate(v);
    setRateText(String(v));
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-[linear-gradient(180deg,#FFFFFF,#FDFAF2)] p-[clamp(24px,4.5vw,48px)] shadow-[0_24px_64px_rgba(59,42,4,.10),0_2px_5px_rgba(59,42,4,.05)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 rounded-[17px] border border-[rgba(176,138,46,.35)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-radial-gradient(circle_at_100%_0%,rgba(176,138,46,.07)_0_1px,transparent_1px_15px)]"
      />
      <div className="relative mb-[clamp(24px,3.5vw,36px)] flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2.5">
        <div>
          <p className="mb-2 font-mono text-[11px] tracking-[.22em] text-gold">
            EMI CALCULATOR
          </p>
          <h2 className="font-display text-[clamp(26px,3vw,34px)] leading-[1.1] font-semibold">
            {label}, planned to the rupee.
          </h2>
        </div>
        <div
          role="group"
          aria-label="Show split as"
          className="inline-flex rounded-full border border-[#E6DCC2] bg-[#F3EDDD] p-[3px]"
        >
          <button
            type="button"
            onClick={() => setView("amount")}
            className={segClass(view === "amount")}
          >
            ₹ Amount
          </button>
          <button
            type="button"
            onClick={() => setView("percent")}
            className={segClass(view === "percent")}
          >
            % Share
          </button>
        </div>
      </div>
      <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] items-start gap-[clamp(28px,4.5vw,64px)]">
        {/* Inputs */}
        <div className="flex flex-col gap-[30px]">
          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <label htmlFor="mg-amt" className={fieldLabelClass}>
                LOAN AMOUNT
              </label>
              <span className={fieldBoxClass}>
                <span className="text-[15px] text-caption">₹</span>
                <input
                  id="mg-amt"
                  inputMode="numeric"
                  autoComplete="off"
                  value={amtText}
                  onChange={onAmtInput}
                  onBlur={onAmtBlur}
                  aria-label="Loan amount in rupees"
                  className="w-[100px] border-none bg-transparent p-0 text-right text-base font-bold outline-none tabular-nums"
                />
              </span>
            </div>
            <input
              type="range"
              min={AMT_MIN}
              max={AMT_MAX}
              step={10000}
              value={amount}
              onChange={onAmtSlide}
              aria-label="Loan amount slider"
              className={rangeClass}
              style={{ background: track(amount, AMT_MIN, AMT_MAX), outlineOffset: 6 }}
            />
            <div className={scaleRowClass}>
              <span>₹50,000</span>
              <span>₹10,00,000</span>
            </div>
          </div>
          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <label htmlFor="mg-rate" className={fieldLabelClass}>
                INTEREST RATE (P.A.)
              </label>
              <span className={fieldBoxClass}>
                <input
                  id="mg-rate"
                  inputMode="decimal"
                  autoComplete="off"
                  value={rateText}
                  onChange={onRateInput}
                  onBlur={onRateBlur}
                  aria-label="Annual interest rate percentage"
                  className="w-14 border-none bg-transparent p-0 text-right text-base font-bold outline-none tabular-nums"
                />
                <span className="text-[15px] text-caption">%</span>
              </span>
            </div>
            <input
              type="range"
              min={RATE_MIN}
              max={RATE_MAX}
              step={0.5}
              value={rate}
              onChange={onRateSlide}
              aria-label="Interest rate slider"
              className={rangeClass}
              style={{ background: track(rate, RATE_MIN, RATE_MAX), outlineOffset: 6 }}
            />
            <div className={scaleRowClass}>
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>
          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <label htmlFor="mg-mo" className={fieldLabelClass}>
                TENURE
              </label>
              <span className="rounded-[10px] border-[1.5px] border-[#E2D8BF] bg-white px-3 py-[7px] text-base font-bold tabular-nums">
                {monthsStr} months
              </span>
            </div>
            <input
              id="mg-mo"
              type="range"
              min={MO_MIN}
              max={MO_MAX}
              step={1}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              aria-label="Tenure in months"
              className={rangeClass}
              style={{ background: track(months, MO_MIN, MO_MAX), outlineOffset: 6 }}
            />
            <div className={scaleRowClass}>
              <span>3 mo</span>
              <span>60 mo</span>
            </div>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {CHIP_MONTHS.map((m) => {
                const on = m === Number(months);
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonths(m)}
                    aria-pressed={on}
                    className={chipClass(on)}
                  >
                    {m} mo
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* Results */}
        <div className="flex flex-col gap-[22px]">
          <div className="flex flex-wrap items-center gap-[clamp(20px,3vw,36px)]">
            <div
              aria-hidden="true"
              className="grid h-[188px] w-[188px] shrink-0 place-items-center rounded-full shadow-[inset_0_0_0_1px_rgba(176,138,46,.3)]"
              style={{
                background: `conic-gradient(#B08A2E 0 ${pctP}%, #EBDDB6 ${pctP}% 100%)`,
              }}
            >
              <div className="grid h-[132px] w-[132px] place-items-center rounded-full border border-[#F0E7D2] bg-white text-center shadow-[0_4px_14px_rgba(59,42,4,.08)]">
                <div>
                  <div className="font-mono text-[9.5px] tracking-[.18em] text-caption">
                    MONTHLY EMI
                  </div>
                  <div className="font-display text-[29px] leading-[1.15] font-bold tabular-nums">
                    {emiStr}
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[200px] flex-[1_1_200px]">
              <p className="mb-1 font-mono text-[10.5px] tracking-[.18em] text-caption">
                YOU PAY MONTHLY
              </p>
              <p className="font-display text-[clamp(38px,4vw,50px)] leading-none font-bold tabular-nums">
                {emiStr}
              </p>
              <p className="mt-2 text-[13.5px] text-caption">
                for {monthsStr} months at {rateNow} p.a.
              </p>
              <div className="mt-[18px] flex flex-col gap-2">
                <span className="flex items-center gap-[9px] text-sm text-body">
                  <span
                    aria-hidden="true"
                    className="h-[11px] w-[11px] shrink-0 rounded-[3px] bg-gold-mid"
                  />
                  Principal{" "}
                  <strong className="ml-auto text-ink tabular-nums">
                    {pStr}
                  </strong>
                </span>
                <span className="flex items-center gap-[9px] text-sm text-body">
                  <span
                    aria-hidden="true"
                    className="h-[11px] w-[11px] shrink-0 rounded-[3px] bg-[#EBDDB6]"
                  />
                  Total interest{" "}
                  <strong className="ml-auto text-ink tabular-nums">
                    {iStr}
                  </strong>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-x-7 gap-y-2.5 rounded-[14px] border border-[#EFE7D2] bg-paper-warm px-5 py-4">
            <span className="text-[13.5px] text-body">
              Total interest
              <br />
              <strong className="font-display text-[21px] text-ink tabular-nums">
                ₹{fmt(interest)}
              </strong>
            </span>
            <span className="text-[13.5px] text-body">
              Principal
              <br />
              <strong className="font-display text-[21px] text-ink tabular-nums">
                ₹{fmt(P)}
              </strong>
            </span>
            <span className="text-[13.5px] text-body">
              Total payable
              <br />
              <strong className="font-display text-[21px] text-gold tabular-nums">
                ₹{fmt(total)}
              </strong>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              href={applyHref}
              className="btn-gold gap-2 px-7 py-3.5 text-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,.55),0_2px_12px_rgba(140,101,21,.28)]"
            >
              {applyLabel} →
            </Link>
            <span className="flex-[1_1_220px] font-mono text-[10.5px] leading-[1.6] tracking-[.06em] text-caption">
              ESTIMATES ONLY — NOT AN APPROVAL GUARANTEE. FINAL RATES AND TERMS
              ARE SET BY YOUR LENDER.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
