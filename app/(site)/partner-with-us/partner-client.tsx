"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { telHref, waHref } from "@/lib/config";
import { routes } from "@/lib/routes";

/* ————— DSA lead form ————— */

const leadSchema = z.object({
  fullName: z.string().trim().min(3, "Enter your full name."),
  mobile: z
    .string()
    .regex(/^[6-9][0-9]{9}$/, "Enter the 10-digit mobile you use on WhatsApp."),
  email: z
    .string()
    .trim()
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      "Enter a valid email — payout statements go here.",
    ),
  profession: z
    .string()
    .min(
      1,
      "Pick the option closest to your work — it helps us assign the right manager.",
    ),
  city: z.string().trim().min(2, "Enter the city you work from."),
});

type LeadValues = z.infer<typeof leadSchema>;

// TODO(backend): POST /api/leads/partner — swap this stub for the real API call.
async function submitLead(
  data: LeadValues,
): Promise<{ refCode: string; whatsappUrl: string }> {
  const refCode = "PT-" + (100000 + Math.floor(Math.random() * 900000));
  const whatsappUrl = waHref(
    `Hi PDS Global! I applied to become a lending partner. Ref ${refCode}. ${data.fullName.trim()}, ${data.profession}, ${data.city.trim()}.`,
  );
  return { refCode, whatsappUrl };
}

const professions = [
  "Chartered Accountant",
  "Financial advisor / MFD",
  "Real-estate consultant",
  "Insurance agent",
  "Ex-banker",
  "Business owner",
  "Other",
];

const labelClass =
  "mb-[7px] block font-mono text-[11px] font-semibold tracking-[.12em] text-body";
const errorClass = "mt-1.5 text-[12.5px] text-[#B23B27]";

function inputClass(bad: boolean, extra = "") {
  return `w-full rounded-xl border-[1.5px] bg-white py-[13px] text-base text-ink outline-none transition-[border-color,box-shadow] duration-150 focus:border-gold-mid focus:shadow-[0_0_0_3.5px_rgba(176,138,46,.15)] ${
    bad ? "border-[#CE6B57]" : "border-[#E2D8BF]"
  } ${extra}`;
}

export function PartnerLeadForm() {
  const [success, setSuccess] = useState<{
    refCode: string;
    whatsappUrl: string;
    firstName: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      profession: "",
      city: "",
    },
  });

  const onSubmit = async (data: LeadValues) => {
    const { refCode, whatsappUrl } = await submitLead(data);
    setSuccess({
      refCode,
      whatsappUrl,
      firstName: data.fullName.trim().split(" ")[0],
    });
  };

  const nameReg = register("fullName");
  const mobileReg = register("mobile");
  const emailReg = register("email");
  const cityReg = register("city");

  if (success) {
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
            REFERENCE {success.refCode}
          </p>
          <h2 className="mb-3 font-display text-[clamp(28px,3.6vw,36px)] font-semibold">
            Application received.
          </h2>
          <p className="mx-auto mb-6 max-w-[40ch] text-[15px] leading-[1.7] text-body">
            Welcome, {success.firstName}. Our partnerships team will call you
            within one working day to complete KYC and onboarding.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={success.whatsappUrl}
              target="_blank"
              rel="noopener"
              className="btn-gold px-7 py-3.5 text-[15px]"
            >
              Chat now on WhatsApp →
            </a>
            <a href={telHref} className="btn-ghost px-6 py-[13px] text-[14.5px]">
              Call the team
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="relative max-w-[520px] overflow-hidden rounded-3xl border border-line-strong bg-white p-[clamp(24px,3.5vw,40px)] shadow-[0_28px_70px_rgba(59,42,4,.12)] rise [animation-duration:.8s] [animation-delay:.12s]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 rounded-[17px] border border-[rgba(176,138,46,.3)]"
      />
      <div className="relative">
        <p className="mb-5 font-mono text-[10.5px] tracking-[.24em] text-gold">
          BECOME A PARTNER
        </p>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="nm" className={labelClass}>
              FULL NAME
            </label>
            <input
              id="nm"
              autoComplete="name"
              placeholder="Your name"
              aria-invalid={!!errors.fullName}
              className={inputClass(!!errors.fullName, "px-3.5")}
              {...nameReg}
              onChange={(e) => {
                e.target.value = e.target.value
                  .replace(/[^A-Za-z .'-]/g, "")
                  .slice(0, 60);
                return nameReg.onChange(e);
              }}
            />
            {errors.fullName && (
              <p className={errorClass}>{errors.fullName.message}</p>
            )}
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-4">
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
                  placeholder="10 digits"
                  aria-invalid={!!errors.mobile}
                  className={inputClass(!!errors.mobile, "pr-3.5 pl-[46px]")}
                  {...mobileReg}
                  onChange={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                    return mobileReg.onChange(e);
                  }}
                />
              </div>
              {errors.mobile && (
                <p className={errorClass}>{errors.mobile.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="city" className={labelClass}>
                CITY
              </label>
              <input
                id="city"
                autoComplete="address-level2"
                placeholder="Where you work"
                aria-invalid={!!errors.city}
                className={inputClass(!!errors.city, "px-3.5")}
                {...cityReg}
                onChange={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^A-Za-z .'-]/g, "")
                    .slice(0, 40);
                  return cityReg.onChange(e);
                }}
              />
              {errors.city && (
                <p className={errorClass}>{errors.city.message}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="em" className={labelClass}>
              EMAIL
            </label>
            <input
              id="em"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              className={inputClass(!!errors.email, "px-3.5")}
              {...emailReg}
              onChange={(e) => {
                e.target.value = e.target.value.slice(0, 80);
                return emailReg.onChange(e);
              }}
            />
            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="prof" className={labelClass}>
              PROFESSION
            </label>
            <select
              id="prof"
              className="w-full cursor-pointer appearance-auto rounded-xl border-[1.5px] border-[#E2D8BF] bg-white px-3.5 py-[13px] text-[15.5px] text-ink outline-none focus:border-gold-mid focus:shadow-[0_0_0_3.5px_rgba(176,138,46,.15)]"
              {...register("profession")}
            >
              <option value="">Select your profession</option>
              {professions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {errors.profession && (
              <p className={errorClass}>{errors.profession.message}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className="mt-6 flex w-full cursor-pointer items-center justify-center gap-[9px] rounded-full border border-gold-deep bg-[linear-gradient(180deg,#E9CF79,#BB932F_55%,#A5801F)] px-[30px] py-4 text-[15.5px] font-bold whitespace-nowrap text-[#241B07] shadow-[inset_0_1px_0_rgba(255,255,255,.55),0_2px_12px_rgba(140,101,21,.3)] transition-[transform,filter] duration-[.18s] disabled:cursor-not-allowed disabled:border-[#E2D8BF] disabled:bg-[#EFE9D8] disabled:bg-none disabled:text-[#A69D84] disabled:shadow-none"
        >
          Apply to partner →
        </button>
        <p className="mt-3.5 text-xs leading-[1.7] text-caption">
          By applying you agree to our <Link href={routes.terms}>terms</Link>{" "}
          and <Link href={routes.privacy}>privacy policy</Link>. Our
          partnerships team will contact you on call or WhatsApp.
        </p>
      </div>
    </form>
  );
}

/* ————— FAQ accordion ————— */

const faqs = [
  {
    q: "Do I need to invest or pay anything to join?",
    a: "No. There is no joining fee, no deposit and no target. Be wary of any programme that charges partners upfront — legitimate DSA models are paid by lenders, not by you.",
  },
  {
    q: "Can I do this alongside my current work?",
    a: "Yes — most of our partners run it beside a practice or business. CAs refer during tax season, property consultants during purchases; the referral app takes minutes per client.",
  },
  {
    q: "When and how am I paid?",
    a: "Commissions are computed on disbursed amounts and paid monthly to your registered bank account, with a statement to your email. TDS is deducted as per law; GST-registered partners invoice us.",
  },
  {
    q: "What am I responsible for, legally?",
    a: "Representing products honestly. You must never promise approval, never collect cash from clients, and always take consent before sharing documents. Our certification covers this in plain language, and your RM is a call away for grey areas.",
  },
];

export function PartnerFaq() {
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
            <div className="max-w-[68ch] px-[22px] pb-5 text-[14.5px] leading-[1.75] text-body [animation:rise_.25s_ease_both]">
              {f.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
