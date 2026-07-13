"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { telHref, waHref } from "@/lib/config";
import { routes } from "@/lib/routes";

const mobilePattern = /^[6-9][0-9]{9}$/;

const leadSchema = z.object({
  mobile: z
    .string()
    .regex(
      mobilePattern,
      "Enter the 10-digit mobile you use on WhatsApp — it should start with 6, 7, 8 or 9.",
    ),
});

type LeadValues = z.infer<typeof leadSchema>;

// TODO(backend): POST /api/leads/apply — swap this client-side stub for the
// real API call. The success UI consumes only this function's return value.
async function submitLead(
  data: LeadValues,
): Promise<{ refCode: string; whatsappUrl: string }> {
  const refCode = "ML-" + (100000 + Math.floor(Math.random() * 900000));
  const whatsappUrl = waHref(
    "Hi PDS Global! I'd like personal loan offers. My reference is " +
      refCode +
      " and my number is +91 " +
      data.mobile +
      ".",
  );
  return { refCode, whatsappUrl };
}

const faqs = [
  {
    q: "Am I eligible for a personal loan?",
    a: "Broadly: age 21–55, a minimum income of ₹20,000 per month, and Indian residency. Both salaried and self-employed applicants are welcome — each lender then applies its own criteria, which your advisor will explain upfront.",
  },
  {
    q: "My credit score is low. Should I still apply?",
    a: "Yes. Several of our partner NBFCs consider profiles from around 650, and weigh income stability alongside the score. If no lender fits today, your advisor will tell you honestly and show you what to improve — applying here never affects your score.",
  },
  {
    q: "How fast is approval and disbursal?",
    a: "Most partner lenders decide within 24–72 hours of receiving complete documents, and the fastest disbursals land in about 24 hours. Timelines rest with the lender, so treat these as typical, not promised.",
  },
  {
    q: "What interest rate will I get?",
    a: "Rates across our partners currently range from 10.49% to about 24% p.a. Your exact rate is set by the lender based on your credit profile, income and tenure — your advisor will always show the full comparison before you choose.",
  },
  {
    q: "What documents do I need?",
    a: "PAN, Aadhaar, the last 3 months of bank statements, and salary slips (salaried) or ITR (self-employed). Everything is collected digitally and shared only with the lender you proceed with.",
  },
];

const eligibility = [
  { label: "AGE", big: "21–55 years", sub: "at the time of application", nums: false },
  {
    label: "INCOME",
    big: "₹20,000/mo",
    sub: "minimum — salaried or self-employed",
    nums: true,
  },
  {
    label: "DOCUMENTS",
    big: "PAN + Aadhaar",
    sub: "plus 3-month bank statements",
    nums: false,
  },
] as const;

export function ApplyClient() {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { touchedFields },
  } = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
    mode: "onChange",
    defaultValues: { mobile: "" },
  });
  const [result, setResult] = useState<{
    refCode: string;
    whatsappUrl: string;
    mobile: string;
  } | null>(null);
  const [openFaq, setOpenFaq] = useState(-1);

  const mobile = watch("mobile");
  const ok = mobilePattern.test(mobile);
  const showHint = Boolean(touchedFields.mobile) && mobile.length === 10 && !ok;

  const onSubmit = handleSubmit(
    async (data) => {
      const { refCode, whatsappUrl } = await submitLead(data);
      setResult({ refCode, whatsappUrl, mobile: data.mobile });
    },
    () => {
      // On invalid submit, mark the field touched.
      setValue("mobile", mobile, { shouldTouch: true, shouldValidate: true });
    },
  );

  return (
    <main>
      {/* ————— Hero + funnel ————— */}
      <section className="relative overflow-hidden [background:radial-gradient(760px_420px_at_50%_-18%,rgba(201,162,75,.16),transparent_62%),#FCFAF5] px-[clamp(20px,4.5vw,48px)] pt-[clamp(44px,7vw,84px)] pb-[clamp(48px,6vw,72px)]">
        <div className="mx-auto max-w-[620px] text-center">
          <p className="mb-[18px] font-mono text-[11.5px] tracking-[.22em] text-gold rise">
            PERSONAL LOAN · 2-MINUTE CHECK
          </p>
          <h1 className="mb-4 font-display text-[clamp(36px,6vw,58px)] leading-[1.05] font-semibold tracking-[-.01em] text-balance rise [animation-delay:.08s]">
            Up to <span className="text-gold">₹50 lakhs</span>, from 10.49%
            p.a.
          </h1>
          <p className="mx-auto mb-[34px] max-w-[44ch] text-[16.5px] leading-[1.65] text-body rise [animation-delay:.16s]">
            Leave your number — a named PDS Global advisor will WhatsApp your
            best offers from 40+ RBI-regulated lenders.
          </p>

          {!result && (
            <form
              onSubmit={onSubmit}
              noValidate
              className="rise [animation-delay:.24s]"
            >
              <div className="mx-auto flex max-w-[520px] flex-wrap justify-center gap-3">
                <div className="flex flex-[1_1_300px] items-center rounded-full border-[1.5px] border-[#E2D8BF] bg-white py-1.5 pr-1.5 pl-[22px] transition-[border-color,box-shadow] duration-150 focus-within:border-gold-mid focus-within:shadow-[0_0_0_3.5px_rgba(176,138,46,.15)]">
                  <span className="border-r border-line pr-3 font-mono text-[15px] whitespace-nowrap text-caption">
                    +91
                  </span>
                  <label htmlFor="mob" className="sr-only">
                    10-digit mobile number
                  </label>
                  <input
                    id="mob"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="Your 10-digit mobile"
                    value={mobile}
                    onChange={(e) =>
                      setValue(
                        "mobile",
                        e.target.value.replace(/\D/g, "").slice(0, 10),
                        { shouldValidate: true, shouldTouch: true },
                      )
                    }
                    className="min-w-[80px] flex-1 border-none bg-transparent px-3.5 py-3 text-[16.5px] font-semibold tracking-[.04em] tabular-nums outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!ok}
                  className={`inline-flex items-center justify-center gap-[9px] rounded-full border px-[30px] py-4 text-[15.5px] font-bold whitespace-nowrap transition-[transform,box-shadow,filter] duration-[.18s] ${
                    ok
                      ? "cursor-pointer border-gold-deep bg-[linear-gradient(180deg,#E9CF79,#BB932F_55%,#A5801F)] text-[#241B07] shadow-[inset_0_1px_0_rgba(255,255,255,.55),0_2px_12px_rgba(140,101,21,.3)]"
                      : "cursor-not-allowed border-[#E2D8BF] bg-[#EFE9D8] text-[#A69D84] shadow-none"
                  }`}
                >
                  Get my offers →
                </button>
              </div>
              {showHint && (
                <p role="status" className="mt-3 text-[13px] text-[#B23B27]">
                  Enter the 10-digit mobile you use on WhatsApp — it should
                  start with 6, 7, 8 or 9.
                </p>
              )}
              <p className="mx-auto mt-5 max-w-[52ch] text-[12.5px] leading-[1.7] text-caption">
                By continuing you agree to be contacted by PDS Global and its
                partner lenders on call, SMS and WhatsApp, and accept our{" "}
                <Link href={routes.applicationConsent}>
                  application consent
                </Link>
                , <Link href={routes.terms}>terms</Link> and{" "}
                <Link href={routes.privacy}>privacy policy</Link>. Checking
                offers never affects your credit score.
              </p>
            </form>
          )}

          {result && (
            <div
              role="status"
              className="relative overflow-hidden rounded-[120px_120px_24px_24px] border border-line-strong bg-[linear-gradient(180deg,#FFFFFF,#FBF6EA)] px-[clamp(22px,4vw,40px)] pt-[52px] pb-[34px] shadow-[0_28px_70px_rgba(59,42,4,.14)] rise [animation-duration:.5s]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[repeating-radial-gradient(circle_at_50%_-20%,rgba(176,138,46,.11)_0_1px,transparent_1px_14px)]"
              />
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="mx-auto mb-[18px] grid h-[58px] w-[58px] place-items-center rounded-full bg-[repeating-conic-gradient(rgba(255,255,255,.16)_0_3deg,rgba(0,0,0,0)_3deg_6deg),radial-gradient(circle_at_32%_28%,#F4E4AC,#C9A24B_52%,#8E6B21_96%)] shadow-[0_6px_16px_rgba(140,101,21,.35)]"
                >
                  <span className="text-2xl text-[#FFF8E2]">✓</span>
                </div>
                <p className="mb-2.5 font-mono text-[10.5px] tracking-[.26em] text-gold">
                  REFERENCE {result.refCode}
                </p>
                <h2 className="mb-3 font-display text-[clamp(28px,4vw,38px)] font-semibold">
                  Number received.
                </h2>
                <p className="mx-auto mb-[26px] max-w-[44ch] text-[15.5px] leading-[1.7] text-body">
                  Your advisor will WhatsApp{" "}
                  <strong className="text-ink tabular-nums">
                    +91 {result.mobile.replace(/(\d{5})(\d{5})/, "$1 $2")}
                  </strong>{" "}
                  within about 15 working minutes (9:30–18:30 IST). Prefer not
                  to wait?
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href={result.whatsappUrl}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-[9px] rounded-full border border-gold-deep bg-[linear-gradient(180deg,#E9CF79,#BB932F_55%,#A5801F)] px-[30px] py-[15px] text-[15.5px] font-bold whitespace-nowrap text-[#241B07] shadow-[inset_0_1px_0_rgba(255,255,255,.55),0_2px_12px_rgba(140,101,21,.3)] transition-[transform,filter] duration-[.18s] hover:-translate-y-px hover:brightness-[1.05] hover:text-[#241B07]"
                  >
                    Chat now on WhatsApp →
                  </a>
                  <a
                    href={telHref}
                    className="inline-flex items-center gap-[9px] rounded-full border border-line-gold bg-white px-[26px] py-3.5 text-[15px] font-semibold whitespace-nowrap text-ink transition-all duration-[.18s] hover:border-gold-mid hover:bg-paper-warm hover:text-ink"
                  >
                    Call an advisor
                  </a>
                </div>
                <p className="mt-6 font-mono text-[10px] tracking-[.1em] text-faint">
                  KEEP YOUR PAN AND 3-MONTH BANK STATEMENTS HANDY.
                </p>
              </div>
            </div>
          )}

          <div className="mt-[34px] flex flex-wrap justify-center gap-x-[22px] gap-y-2 rise [animation-delay:.3s]">
            <span className="font-mono text-[10.5px] tracking-[.14em] text-caption">
              NO IMPACT ON CREDIT SCORE
            </span>
            <span aria-hidden="true" className="text-line-gold">
              ·
            </span>
            <span className="font-mono text-[10.5px] tracking-[.14em] text-caption">
              FREE FOR BORROWERS
            </span>
            <span aria-hidden="true" className="text-line-gold">
              ·
            </span>
            <span className="font-mono text-[10.5px] tracking-[.14em] text-caption">
              ISO 27001
            </span>
          </div>
        </div>
      </section>

      {/* ————— Eligibility ————— */}
      <section
        aria-label="Eligibility"
        className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(40px,6vw,64px)]"
      >
        <div className="mx-auto max-w-[760px]">
          <h2 className="mb-[22px] text-center font-display text-[clamp(26px,3.4vw,34px)] font-semibold">
            Will I qualify?
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3.5">
            {eligibility.map((card) => (
              <div
                key={card.label}
                className="rounded-[18px] border border-line bg-white p-6 text-center"
              >
                <p className="mb-2.5 font-mono text-[10.5px] tracking-[.2em] text-gold">
                  {card.label}
                </p>
                <p
                  className={`font-display text-[30px] font-bold ${card.nums ? "tabular-nums" : ""}`}
                >
                  {card.big}
                </p>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-caption">
                  {card.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— FAQ ————— */}
      <section
        aria-label="Frequently asked questions"
        className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(48px,7vw,80px)]"
      >
        <div className="mx-auto max-w-[760px]">
          <h2 className="mb-[22px] text-center font-display text-[clamp(26px,3.4vw,34px)] font-semibold">
            Asked often, answered plainly.
          </h2>
          <div className="overflow-hidden rounded-[18px] border border-line bg-white">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-t border-[#F1EAD8]">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent px-[22px] py-[18px] text-left transition-[background] duration-150 hover:bg-paper-warm"
                >
                  <span className="text-[15.5px] font-semibold text-ink">
                    {f.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-mono text-[17px] text-gold"
                  >
                    {openFaq === i ? "–" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="max-w-[68ch] px-[22px] pb-5 text-[14.5px] leading-[1.75] text-body rise [animation-duration:.25s] [animation-timing-function:ease]">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
