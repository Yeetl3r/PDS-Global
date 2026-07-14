"use client";

import Link from "next/link";
import { useEffect, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { config, telHref, waHref } from "@/lib/config";
import { routes } from "@/lib/routes";

/* ——— helpers ——— */

const digits = (s: string) => String(s).replace(/\D/g, "");
const fmt = (n: number) => Math.round(n).toLocaleString("en-IN");

function parseDob(v: string): Date | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v);
  if (!m) return null;
  const d = new Date(+m[3], +m[2] - 1, +m[1]);
  if (
    d.getDate() !== +m[1] ||
    d.getMonth() !== +m[2] - 1 ||
    d.getFullYear() !== +m[3]
  )
    return null;
  return d;
}

function age(d: Date): number {
  const t = new Date();
  let a = t.getFullYear() - d.getFullYear();
  const mm = t.getMonth() - d.getMonth();
  if (mm < 0 || (mm === 0 && t.getDate() < d.getDate())) a--;
  return a;
}

function words(v: number): string {
  if (v >= 10000000)
    return "₹" + (v / 10000000).toFixed(2).replace(/\.?0+$/, "") + " crore";
  if (v >= 100000)
    return "₹" + (v / 100000).toFixed(2).replace(/\.?0+$/, "") + " lakh";
  if (v >= 1000)
    return "₹" + (v / 1000).toFixed(1).replace(/\.?0+$/, "") + " thousand";
  return "₹" + v;
}

/** Indian-format a numeric string as the user types, e.g. "55000" → "55,000". */
const inFmt = (v: string) => {
  const d = digits(v).slice(0, 8);
  return d ? Number(d).toLocaleString("en-IN") : "";
};

/* ——— validation ——— */

const nameRe = /^[A-Za-z][A-Za-z .'-]{0,39}$/;

const schema = z.object({
  fn: z
    .string()
    .refine(
      (v) => nameRe.test(v.trim()) && v.trim().length >= 2,
      "Enter your first name as it appears on your PAN.",
    ),
  ln: z
    .string()
    .refine(
      (v) => nameRe.test(v.trim()) && v.trim().length >= 1,
      "Enter your surname.",
    ),
  pan: z
    .string()
    .regex(
      /^[A-Z]{5}[0-9]{4}[A-Z]$/,
      "PAN looks like ABCDE1234F — five letters, four digits, one letter.",
    ),
  dob: z.string().superRefine((v, ctx) => {
    const d = parseDob(v);
    if (!d) {
      ctx.addIssue({
        code: "custom",
        message: "Enter your date of birth as DD/MM/YYYY.",
      });
      return;
    }
    const a = age(d);
    if (a < 21 || a > 55)
      ctx.addIssue({
        code: "custom",
        message:
          "Lenders on our panel serve applicants aged 21–55. You are " +
          a +
          ".",
      });
  }),
  pin: z
    .string()
    .regex(/^[1-9][0-9]{5}$/, "Enter the 6-digit pincode of your current home."),
  co: z
    .string()
    .refine((v) => v.trim().length >= 2, "Enter your employer or firm name."),
  inc: z.string().superRefine((v, ctx) => {
    const n = Number(digits(v));
    if (!n)
      ctx.addIssue({
        code: "custom",
        message: "Enter your monthly income in rupees.",
      });
    else if (n < 20000)
      ctx.addIssue({
        code: "custom",
        message:
          "A minimum of ₹20,000 per month is needed to match you with lenders.",
      });
  }),
  mob: z
    .string()
    .regex(/^[6-9][0-9]{9}$/, "Enter the 10-digit mobile you use on WhatsApp."),
  amt: z.string().superRefine((v, ctx) => {
    const n = Number(digits(v));
    if (!n)
      ctx.addIssue({
        code: "custom",
        message: "Enter the amount you want to borrow.",
      });
    else if (n < 50000 || n > 5000000)
      ctx.addIssue({
        code: "custom",
        message: "Choose between ₹50,000 and ₹50,00,000.",
      });
  }),
  ten: z.number(),
  consent: z
    .boolean()
    .refine((v) => v, "Please agree so we can process your application."),
});

type FormValues = z.infer<typeof schema>;
type TextField = "fn" | "ln" | "pan" | "dob" | "pin" | "co" | "inc" | "mob" | "amt";

/* ——— submit ———
 * TODO(backend): POST /api/leads/personal-loan — replace this client-side stub
 * with the real API call. The success UI consumes only this function's return.
 */
async function submitLead(
  data: FormValues,
): Promise<{ refCode: string; whatsappUrl: string }> {
  const refCode = "ML-" + (100000 + Math.floor(Math.random() * 900000));
  const amtN = Number(digits(data.amt)) || 0;
  const whatsappUrl = waHref(
    "Hi PDS Global! I've submitted my personal loan application. Ref " +
      refCode +
      ". Name: " +
      data.fn.trim() +
      " " +
      data.ln.trim() +
      ". Loan: ₹" +
      fmt(amtN) +
      " for " +
      data.ten +
      " months. Please take it forward.",
  );
  return { refCode, whatsappUrl };
}

/* ——— shared styling fragments ——— */

const labelCls =
  "mb-[7px] block font-mono text-[11px] font-semibold tracking-[.12em] text-body";

const inputCls = (bad: boolean, extra = "") =>
  "w-full rounded-xl border-[1.5px] bg-white px-3.5 py-[13px] text-base text-ink transition-[border-color,box-shadow] duration-150 focus:border-gold-mid focus:shadow-[0_0_0_3.5px_rgba(176,138,46,.15)] " +
  (bad ? "border-[#CE6B57]" : "border-[#E2D8BF]") +
  (extra ? " " + extra : "");

/** Suppress the browser focus outline on text inputs (custom ring below). */
const noOutline = { outline: "none" } as const;

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-[12.5px] text-[#B23B27]">{msg}</p>;
}

export default function ApplicationForm() {
  const [done, setDone] = useState<{
    refCode: string;
    whatsappUrl: string;
    data: FormValues;
  } | null>(null);
  const [dobRange, setDobRange] = useState<{ min?: string; max?: string }>({});

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, submitCount },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      fn: "",
      ln: "",
      pan: "",
      dob: "",
      pin: "",
      co: "",
      inc: "",
      mob: "",
      amt: "",
      ten: 36,
      consent: false,
    },
  });

  // Calendar bounds depend on "today" — derive after mount to keep SSR stable.
  useEffect(() => {
    const p = (x: number) => String(x).padStart(2, "0");
    const f = (d: Date) =>
      d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
    const now = new Date();
    setDobRange({
      min: f(new Date(now.getFullYear() - 55, now.getMonth(), now.getDate())),
      max: f(new Date(now.getFullYear() - 21, now.getMonth(), now.getDate())),
    });
  }, []);

  /** register() + per-field input transform. */
  const withTx = (name: TextField, tx: (v: string) => string) => {
    const reg = register(name);
    return {
      ...reg,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        e.target.value = tx(e.target.value);
        return reg.onChange(e);
      },
    };
  };

  const amtV = watch("amt");
  const ten = Number(watch("ten"));
  const consentV = watch("consent");

  const amtN = Number(digits(amtV)) || 0;
  const amtOk = amtN >= 50000 && amtN <= 5000000;
  const r = 13 / 1200;
  const pow = Math.pow(1 + r, ten);
  let emi = amtN > 0 ? (amtN * r * pow) / (pow - 1) : 0;
  if (!isFinite(emi) || isNaN(emi)) emi = 0;
  const emiHint = emi > 0 ? "₹" + fmt(emi) + "/mo" : "—";
  const tenPct = ((ten - 12) / 60) * 100;
  const tenTrack = `linear-gradient(90deg,#B08A2E 0%,#B08A2E ${tenPct}%,#EDE5D0 ${tenPct}%,#EDE5D0 100%)`;
  const tenLabel =
    ten + " months" + (ten % 12 === 0 ? " (" + ten / 12 + " yr)" : "");
  const consentErr = submitCount > 0 && !consentV;

  const onSubmit = handleSubmit(async (data) => {
    const lead = await submitLead(data);
    setDone({ ...lead, data });
  });

  if (done) {
    const firstName = done.data.fn.trim();
    const mobileShown = done.data.mob.replace(/(\d{5})(\d{5})/, "$1 $2");
    const doneAmt = Number(digits(done.data.amt)) || 0;
    const summary = "₹" + fmt(doneAmt) + " over " + done.data.ten + " months";
    return (
      <div>
        <div
          role="status"
          className="relative overflow-hidden rounded-[140px_140px_24px_24px] border border-line-strong bg-[linear-gradient(180deg,#FFFFFF,#FBF6EA)] px-[clamp(24px,4vw,44px)] pt-14 pb-[38px] text-center shadow-[0_28px_70px_rgba(59,42,4,.14)] rise [animation-duration:.5s]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[repeating-radial-gradient(circle_at_50%_-16%,rgba(176,138,46,.12)_0_1px,transparent_1px_14px)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[9px] rounded-[132px_132px_18px_18px] border border-[rgba(176,138,46,.4)]"
          />
          <div className="relative">
            <div
              aria-hidden="true"
              className="mx-auto mb-[18px] grid h-[62px] w-[62px] place-items-center rounded-full bg-[repeating-conic-gradient(rgba(255,255,255,.16)_0_3deg,rgba(0,0,0,0)_3deg_6deg),radial-gradient(circle_at_32%_28%,#F4E4AC,#C9A24B_52%,#8E6B21_96%)] shadow-[0_6px_16px_rgba(140,101,21,.35)]"
            >
              <span className="text-[26px] text-[#FFF8E2]">✓</span>
            </div>
            <p className="mb-2.5 font-mono text-[10.5px] tracking-[.26em] text-gold">
              REFERENCE {done.refCode}
            </p>
            <h2 className="mb-3 font-display text-[clamp(30px,4vw,40px)] font-semibold">
              Application received.
            </h2>
            <p className="mx-auto mb-[26px] max-w-[46ch] text-[15.5px] leading-[1.7] text-body">
              Thank you, {firstName}. Your advisor is being assigned now and
              will reach you on WhatsApp at{" "}
              <strong className="text-ink tabular-nums">
                +91 {mobileShown}
              </strong>{" "}
              within about 15 working minutes (9:30–18:30 IST).
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={done.whatsappUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-[9px] rounded-full border border-gold-deep bg-[linear-gradient(180deg,#E9CF79,#BB932F_55%,#A5801F)] px-[30px] py-[15px] text-[15.5px] font-bold whitespace-nowrap text-[#241B07] shadow-[inset_0_1px_0_rgba(255,255,255,.55),0_2px_12px_rgba(140,101,21,.3)] transition-[transform,filter] duration-[.18s] hover:-translate-y-px hover:text-[#241B07] hover:brightness-105"
              >
                Chat now on WhatsApp →
              </a>
              <a
                href={telHref}
                className="inline-flex items-center gap-[9px] rounded-full border border-line-gold bg-white px-[26px] py-3.5 text-[15px] font-semibold whitespace-nowrap text-ink transition-all duration-[.18s] hover:border-gold-mid hover:bg-paper-warm hover:text-ink"
              >
                Call {config.phone}
              </a>
            </div>
            <div
              aria-hidden="true"
              className="mx-5 my-[30px] h-px bg-[linear-gradient(90deg,rgba(176,138,46,0),rgba(176,138,46,.5),rgba(176,138,46,0))]"
            />
            <p className="mx-auto max-w-[46ch] text-[13.5px] leading-[1.7] text-caption">
              Requested:{" "}
              <strong className="text-body tabular-nums">{summary}</strong>.
              Keep PAN, Aadhaar and 3-month bank statements handy — your
              advisor will collect them digitally.
            </p>
            <p className="mt-[22px] text-sm">
              <Link href={routes.home} className="font-semibold">
                ← Back to home
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        noValidate
        className="relative overflow-hidden rounded-3xl border border-line-strong bg-white p-[clamp(24px,3.5vw,40px)] shadow-[0_28px_70px_rgba(59,42,4,.12),0_2px_5px_rgba(59,42,4,.05)] rise [animation-duration:.8s] [animation-delay:.12s]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 rounded-[17px] border border-[rgba(176,138,46,.3)]"
        />
        <div className="relative">
          <p className="mb-1.5 font-mono text-[10.5px] tracking-[.24em] text-gold">
            SECTION 1 OF 3 · ABOUT YOU
          </p>
          <div className="mt-3.5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
            <div>
              <label htmlFor="fn" className={labelCls}>
                FIRST NAME
              </label>
              <input
                id="fn"
                autoComplete="given-name"
                placeholder="As on PAN"
                aria-invalid={!!errors.fn}
                className={inputCls(!!errors.fn)}
                style={noOutline}
                {...withTx("fn", (v) =>
                  v.replace(/[^A-Za-z .'-]/g, "").slice(0, 40),
                )}
              />
              <FieldError msg={errors.fn?.message} />
            </div>
            <div>
              <label htmlFor="ln" className={labelCls}>
                LAST NAME
              </label>
              <input
                id="ln"
                autoComplete="family-name"
                placeholder="Surname"
                aria-invalid={!!errors.ln}
                className={inputCls(!!errors.ln)}
                style={noOutline}
                {...withTx("ln", (v) =>
                  v.replace(/[^A-Za-z .'-]/g, "").slice(0, 40),
                )}
              />
              <FieldError msg={errors.ln?.message} />
            </div>
            <div>
              <label htmlFor="pan" className={labelCls}>
                PAN
              </label>
              <input
                id="pan"
                autoComplete="off"
                placeholder="ABCDE1234F"
                aria-invalid={!!errors.pan}
                className={inputCls(!!errors.pan)}
                style={noOutline}
                {...withTx("pan", (v) =>
                  v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10),
                )}
              />
              <FieldError msg={errors.pan?.message} />
            </div>
            <div>
              <label htmlFor="dob" className={labelCls}>
                DATE OF BIRTH
              </label>
              <div className="relative">
                <input
                  id="dob"
                  inputMode="numeric"
                  autoComplete="bday"
                  placeholder="DD/MM/YYYY"
                  aria-invalid={!!errors.dob}
                  className={inputCls(!!errors.dob)}
                  style={noOutline}
                  {...withTx("dob", (v) => {
                    const d = digits(v).slice(0, 8);
                    let out = d.slice(0, 2);
                    if (d.length > 2) out += "/" + d.slice(2, 4);
                    if (d.length > 4) out += "/" + d.slice(4);
                    return out;
                  })}
                />
                <span
                  title="Open date picker"
                  className="absolute top-1/2 right-1.5 grid h-[38px] w-[38px] -translate-y-1/2 cursor-pointer place-items-center rounded-[9px] border border-line bg-paper-warm"
                >
                  <span
                    aria-hidden="true"
                    className="relative block h-3.5 w-[15px] rounded-[3px] border-[1.5px] border-gold"
                  >
                    <span className="absolute top-[2px] right-0 left-0 h-[3px] bg-gold-bright" />
                  </span>
                  <input
                    type="date"
                    aria-label="Pick date of birth from calendar"
                    min={dobRange.min}
                    max={dobRange.max}
                    onChange={(e) => {
                      const parts = e.target.value.split("-");
                      if (parts.length === 3)
                        setValue(
                          "dob",
                          parts[2] + "/" + parts[1] + "/" + parts[0],
                          { shouldValidate: true, shouldTouch: true },
                        );
                    }}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </span>
              </div>
              <FieldError msg={errors.dob?.message} />
            </div>
          </div>

          <p className="mt-7 mb-1.5 font-mono text-[10.5px] tracking-[.24em] text-gold">
            SECTION 2 OF 3 · WORK &amp; HOME
          </p>
          <div className="mt-3.5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
            <div>
              <label htmlFor="pin" className={labelCls}>
                PINCODE
              </label>
              <input
                id="pin"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="6-digit pincode"
                aria-invalid={!!errors.pin}
                className={inputCls(!!errors.pin)}
                style={noOutline}
                {...withTx("pin", (v) => digits(v).slice(0, 6))}
              />
              <FieldError msg={errors.pin?.message} />
            </div>
            <div>
              <label htmlFor="co" className={labelCls}>
                COMPANY NAME
              </label>
              <input
                id="co"
                autoComplete="organization"
                placeholder="Employer or your firm"
                aria-invalid={!!errors.co}
                className={inputCls(!!errors.co)}
                style={noOutline}
                {...withTx("co", (v) => v.slice(0, 60))}
              />
              <FieldError msg={errors.co?.message} />
            </div>
            <div>
              <label htmlFor="inc" className={labelCls}>
                MONTHLY INCOME
              </label>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[15px] text-caption"
                >
                  ₹
                </span>
                <input
                  id="inc"
                  inputMode="numeric"
                  placeholder="e.g. 55,000"
                  aria-invalid={!!errors.inc}
                  className={inputCls(!!errors.inc, "pl-[30px]")}
                  style={noOutline}
                  {...withTx("inc", inFmt)}
                />
              </div>
              <FieldError msg={errors.inc?.message} />
            </div>
            <div>
              <label htmlFor="mob" className={labelCls}>
                MOBILE
              </label>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 left-3.5 -translate-y-1/2 font-mono text-sm text-caption"
                >
                  +91
                </span>
                <input
                  id="mob"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="10-digit mobile"
                  aria-invalid={!!errors.mob}
                  className={inputCls(!!errors.mob, "pl-[46px]")}
                  style={noOutline}
                  {...withTx("mob", (v) => digits(v).slice(0, 10))}
                />
              </div>
              <FieldError msg={errors.mob?.message} />
            </div>
          </div>

          <p className="mt-7 mb-1.5 font-mono text-[10.5px] tracking-[.24em] text-gold">
            SECTION 3 OF 3 · YOUR LOAN
          </p>
          <div className="mt-3.5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] items-start gap-4">
            <div>
              <label htmlFor="amt" className={labelCls}>
                LOAN AMOUNT
              </label>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[15px] text-caption"
                >
                  ₹
                </span>
                <input
                  id="amt"
                  inputMode="numeric"
                  placeholder="50,000 – 50,00,000"
                  aria-invalid={!!errors.amt}
                  className={inputCls(!!errors.amt, "pl-[30px]")}
                  style={noOutline}
                  {...withTx("amt", inFmt)}
                />
              </div>
              <FieldError msg={errors.amt?.message} />
              {amtOk && (
                <p className="mt-1.5 text-[12.5px] text-caption">
                  {words(amtN)}
                </p>
              )}
            </div>
            <div>
              <div className="mb-[7px] flex items-baseline justify-between gap-2.5">
                <label
                  htmlFor="ten"
                  className="font-mono text-[11px] font-semibold tracking-[.12em] text-body"
                >
                  TENURE
                </label>
                <span className="text-[14.5px] font-bold tabular-nums">
                  {tenLabel}
                </span>
              </div>
              <div className="px-1 pt-[15px]">
                <input
                  id="ten"
                  type="range"
                  min={12}
                  max={72}
                  step={6}
                  aria-label="Tenure in months, 12 to 72"
                  style={{ background: tenTrack, outlineOffset: "6px" }}
                  className="m-0 h-1.5 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[2.5px] [&::-moz-range-thumb]:border-solid [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[radial-gradient(circle_at_32%_28%,#F4E4AC,#C9A24B_55%,#8E6B21)] [&::-moz-range-thumb]:shadow-[0_2px_6px_rgba(87,61,10,.45)] [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[2.5px] [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[radial-gradient(circle_at_32%_28%,#F4E4AC,#C9A24B_55%,#8E6B21)] [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(87,61,10,.45)] [&::-webkit-slider-thumb]:[-webkit-appearance:none]"
                  {...register("ten", { valueAsNumber: true })}
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10.5px] text-faint">
                <span>12 MO</span>
                <span>72 MO</span>
              </div>
              <p className="mt-2.5 text-[12.5px] leading-[1.6] text-caption">
                Indicative EMI at 13% p.a.:{" "}
                <strong className="text-ink tabular-nums">{emiHint}</strong> —
                final rate is your lender&apos;s.
              </p>
            </div>
          </div>

          <label className="mt-[26px] flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="mt-[2px] h-[18px] w-[18px] shrink-0 cursor-pointer accent-gold"
              {...register("consent")}
            />
            <span className="text-[13px] leading-[1.65] text-body">
              I confirm the details above are mine and accurate, and I agree to
              PDS Global&apos;s{" "}
              <Link href={routes.applicationConsent}>application consent</Link>
              , <Link href={routes.terms}>terms of use</Link> and{" "}
              <Link href={routes.privacy}>privacy policy</Link> — including
              being contacted by PDS Global and partner lenders on call, SMS,
              email and WhatsApp.
            </span>
          </label>
          {consentErr && (
            <p className="mt-2 ml-[30px] text-[12.5px] text-[#B23B27]">
              Please agree so we can process your application.
            </p>
          )}

          <button
            type="submit"
            disabled={!isValid}
            className={
              "mt-6 flex w-full items-center justify-center gap-[9px] rounded-full border px-[30px] py-[17px] text-base font-bold whitespace-nowrap transition-[transform,filter] duration-[.18s] " +
              (isValid
                ? "cursor-pointer border-gold-deep bg-[linear-gradient(180deg,#E9CF79,#BB932F_55%,#A5801F)] text-[#241B07] shadow-[inset_0_1px_0_rgba(255,255,255,.55),0_2px_12px_rgba(140,101,21,.3)]"
                : "cursor-not-allowed border-[#E2D8BF] bg-[#EFE9D8] text-[#A69D84]")
            }
          >
            Submit application →
          </button>
          <p className="mt-4 text-center font-mono text-[10px] leading-[1.7] tracking-[.1em] text-faint">
            SANCTION RESTS WITH PARTNER LENDERS · OFFERS DEPEND ON ELIGIBILITY
            AND CREDIT PROFILE
          </p>
        </div>
      </form>
    </div>
  );
}
