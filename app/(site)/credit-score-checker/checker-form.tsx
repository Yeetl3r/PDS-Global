"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { telHref } from "@/lib/config";
import { postLead, type LeadResult } from "@/lib/submit-lead";
import { routes } from "@/lib/routes";

const schema = z.object({
  nm: z
    .string()
    .refine(
      (v) => v.trim().length >= 3 && /^[A-Za-z][A-Za-z .'-]*$/.test(v.trim()),
      "Enter your full name as it appears on your PAN.",
    ),
  pan: z
    .string()
    .regex(
      /^[A-Z]{5}[0-9]{4}[A-Z]$/,
      "PAN looks like ABCDE1234F — five letters, four digits, one letter.",
    ),
  mob: z
    .string()
    .regex(/^[6-9][0-9]{9}$/, "Enter the 10-digit mobile you use on WhatsApp."),
  consent: z
    .boolean()
    .refine((v) => v, "Please authorise the bureau check to continue."),
});

type CheckerData = z.infer<typeof schema>;

/** Persists the lead server-side; the server returns the real reference
 *  code and WhatsApp URL the success UI renders. */
async function submitLead(data: CheckerData): Promise<LeadResult> {
  return postLead("credit-score", {
    name: data.nm.trim(),
    pan: data.pan,
    mobile: data.mob,
    consent: data.consent,
  });
}

const inputClass = (bad: boolean) =>
  `w-full rounded-xl border-[1.5px] ${bad ? "border-[#CE6B57]" : "border-[#E2D8BF]"} bg-white px-3.5 py-[13px] text-base text-ink outline-none transition-[border-color,box-shadow] duration-150 focus:border-gold-mid focus:shadow-[0_0_0_3.5px_rgba(176,138,46,.15)]`;

const labelClass =
  "mb-[7px] block font-mono text-[11px] font-semibold tracking-[.12em] text-body";

const errClass = "mt-1.5 text-[12.5px] text-[#B23B27]";

export function CheckerForm() {
  const [done, setDone] = useState<{
    refCode: string;
    whatsappUrl: string;
    firstName: string;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitting, submitCount },
  } = useForm<CheckerData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { nm: "", pan: "", mob: "", consent: false },
  });

  const tried = submitCount > 0;
  const show = (k: "nm" | "pan" | "mob") =>
    (touchedFields[k] || tried) && !!errors[k];

  const nmReg = register("nm");
  const panReg = register("pan");
  const mobReg = register("mob");

  const onSubmit = handleSubmit(async (data) => {
    setSubmitError(null);
    try {
      const { refCode, whatsappUrl } = await submitLead(data);
      setDone({
        refCode,
        whatsappUrl,
        firstName: data.nm.trim().split(" ")[0],
      });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "We couldn't save your details just now. Please retry, or WhatsApp us directly.",
      );
    }
  });

  if (done) {
    return (
      <div
        role="status"
        className="relative max-w-[520px] overflow-hidden rounded-[130px_130px_24px_24px] border border-line-strong bg-[linear-gradient(180deg,#FFFFFF,#FBF6EA)] px-[clamp(24px,4vw,40px)] pt-[52px] pb-9 text-center shadow-[0_28px_70px_rgba(59,42,4,.14)] rise [animation-duration:.5s]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[repeating-radial-gradient(circle_at_50%_-16%,rgba(176,138,46,.12)_0_1px,transparent_1px_14px)]"
        />
        <div className="relative">
          <div
            aria-hidden="true"
            className="mx-auto mb-[18px] grid h-[58px] w-[58px] place-items-center rounded-full bg-[repeating-conic-gradient(rgba(255,255,255,.16)_0_3deg,rgba(0,0,0,0)_3deg_6deg),radial-gradient(circle_at_32%_28%,#F4E4AC,#C9A24B_52%,#8E6B21_96%)] shadow-[0_6px_16px_rgba(140,101,21,.35)]"
          >
            <span className="text-2xl text-[#FFF8E2]">✓</span>
          </div>
          <p className="mb-2.5 font-mono text-[10.5px] tracking-[.26em] text-gold">
            REFERENCE {done.refCode}
          </p>
          <h2 className="mb-3 font-display text-[clamp(28px,3.6vw,36px)] font-semibold">
            Request received.
          </h2>
          <p className="mx-auto mb-6 max-w-[40ch] text-[15px] leading-[1.7] text-body">
            Thanks, {done.firstName}. An advisor will verify your details on
            WhatsApp and share your report access within about 15 working
            minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={done.whatsappUrl}
              target="_blank"
              rel="noopener"
              className="btn-gold px-7 py-3.5 text-[15px]"
            >
              Chat now on WhatsApp →
            </a>
            <a href={telHref} className="btn-ghost px-6 py-[13px] text-[14.5px]">
              Call an advisor
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative max-w-[520px] overflow-hidden rounded-3xl border border-line-strong bg-white p-[clamp(24px,3.5vw,40px)] shadow-[0_28px_70px_rgba(59,42,4,.12)] rise [animation-duration:.8s] [animation-delay:.12s]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 rounded-[17px] border border-[rgba(176,138,46,.3)]"
      />
      <div className="relative">
        <p className="mb-5 font-mono text-[10.5px] tracking-[.24em] text-gold">
          CHECK MY SCORE — FREE
        </p>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="nm" className={labelClass}>
              FULL NAME
            </label>
            <input
              id="nm"
              autoComplete="name"
              placeholder="As on PAN"
              aria-invalid={show("nm")}
              className={inputClass(show("nm"))}
              {...nmReg}
              onChange={(e) => {
                e.target.value = e.target.value
                  .replace(/[^A-Za-z .'-]/g, "")
                  .slice(0, 60);
                nmReg.onChange(e);
              }}
            />
            {show("nm") && <p className={errClass}>{errors.nm?.message}</p>}
          </div>
          <div>
            <label htmlFor="pan" className={labelClass}>
              PAN
            </label>
            <input
              id="pan"
              autoComplete="off"
              placeholder="ABCDE1234F"
              aria-invalid={show("pan")}
              className={inputClass(show("pan"))}
              {...panReg}
              onChange={(e) => {
                e.target.value = e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, "")
                  .slice(0, 10);
                panReg.onChange(e);
              }}
            />
            {show("pan") && <p className={errClass}>{errors.pan?.message}</p>}
          </div>
          <div>
            <label htmlFor="mob" className={labelClass}>
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
                aria-invalid={show("mob")}
                className={`${inputClass(show("mob"))} pl-[46px]`}
                {...mobReg}
                onChange={(e) => {
                  e.target.value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                  mobReg.onChange(e);
                }}
              />
            </div>
            {show("mob") && <p className={errClass}>{errors.mob?.message}</p>}
          </div>
        </div>
        <label className="mt-[22px] flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer accent-gold"
            {...register("consent")}
          />
          <span className="text-[13px] leading-[1.65] text-body">
            I authorise PDS Global to fetch my credit report from RBI-licensed
            bureaus on my behalf, and accept the{" "}
            <Link href={routes.terms}>terms</Link> and{" "}
            <Link href={routes.privacy}>privacy policy</Link>. This soft
            enquiry never affects my score.
          </span>
        </label>
        {tried && !!errors.consent && (
          <p className="mt-2 ml-[30px] text-[12.5px] text-[#B23B27]">
            Please authorise the bureau check to continue.
          </p>
        )}
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`mt-6 flex w-full items-center justify-center gap-[9px] rounded-full border px-[30px] py-4 text-[15.5px] font-bold whitespace-nowrap transition-[transform,filter] duration-[.18s] ${
            isValid && !isSubmitting
              ? "cursor-pointer border-gold-deep bg-[linear-gradient(180deg,#E9CF79,#BB932F_55%,#A5801F)] text-[#241B07] shadow-[inset_0_1px_0_rgba(255,255,255,.55),0_2px_12px_rgba(140,101,21,.3)]"
              : "cursor-not-allowed border-[#E2D8BF] bg-[#EFE9D8] text-[#A69D84]"
          }`}
        >
          {isSubmitting ? "Submitting…" : "Get my free score →"}
        </button>
        {submitError && (
          <p role="alert" className="mt-3 text-[12.5px] text-[#B23B27]">
            {submitError}
          </p>
        )}
      </div>
    </form>
  );
}
