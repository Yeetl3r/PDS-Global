"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { telHref, waHref } from "@/lib/config";
import { routes } from "@/lib/routes";

const topics = [
  "A new loan enquiry",
  "An existing application",
  "Credit score help",
  "Partnering with PDS Global",
  "A grievance or complaint",
  "Something else",
] as const;

const schema = z.object({
  nm: z.string().refine((v) => v.trim().length >= 3, "Enter your full name."),
  mob: z
    .string()
    .regex(/^[6-9][0-9]{9}$/, "Enter the 10-digit mobile you use on WhatsApp."),
  em: z
    .string()
    .refine(
      (v) => !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
      "That email doesn’t look right — or leave it blank.",
    ),
  topic: z
    .string()
    .min(1, "Pick a topic so we route you to the right advisor."),
  msg: z
    .string()
    .refine(
      (v) => v.trim().length >= 10,
      "A little more detail helps us route you — 10 characters or more.",
    ),
});

type ContactData = z.infer<typeof schema>;

// TODO(backend): POST /api/leads/contact — replace this client-side stub
// with the real API call. The success UI consumes only this return value.
async function submitLead(
  data: ContactData,
): Promise<{ refCode: string; whatsappUrl: string }> {
  const refCode = `CT-${100000 + Math.floor(Math.random() * 900000)}`;
  const whatsappUrl = waHref(
    `Hi PDS Global! Ref ${refCode}. ${data.topic || "Enquiry"}. ${data.msg.trim()} — ${data.nm.trim()}, +91 ${data.mob}`,
  );
  return { refCode, whatsappUrl };
}

const inputClass = (bad: boolean) =>
  `w-full rounded-xl border-[1.5px] ${bad ? "border-[#CE6B57]" : "border-[#E2D8BF]"} bg-white px-3.5 py-[13px] text-base text-ink outline-none transition-[border-color,box-shadow] duration-150 focus:border-gold-mid focus:shadow-[0_0_0_3.5px_rgba(176,138,46,.15)]`;

const labelClass =
  "mb-[7px] block font-mono text-[11px] font-semibold tracking-[.12em] text-body";

const errClass = "mt-1.5 text-[12.5px] text-[#B23B27]";

export function ContactForm() {
  const [done, setDone] = useState<{
    refCode: string;
    whatsappUrl: string;
    firstName: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields, isValid, submitCount },
  } = useForm<ContactData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { nm: "", mob: "", em: "", topic: "", msg: "" },
  });

  const tried = submitCount > 0;
  const show = (k: "nm" | "mob" | "em" | "msg") =>
    (touchedFields[k] || tried) && !!errors[k];
  const topicErr =
    (touchedFields.topic || dirtyFields.topic || tried) && !!errors.topic;

  const nmReg = register("nm");
  const mobReg = register("mob");
  const emReg = register("em");
  const msgReg = register("msg");

  const onSubmit = handleSubmit(async (data) => {
    const { refCode, whatsappUrl } = await submitLead(data);
    setDone({
      refCode,
      whatsappUrl,
      firstName: data.nm.trim().split(" ")[0],
    });
  });

  if (done) {
    return (
      <div
        role="status"
        className="relative overflow-hidden rounded-[130px_130px_24px_24px] border border-line-strong bg-[linear-gradient(180deg,#FFFFFF,#FBF6EA)] px-[clamp(24px,4vw,40px)] pt-[52px] pb-9 text-center shadow-[0_28px_70px_rgba(59,42,4,.14)] rise [animation-duration:.5s]"
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
            Message received.
          </h2>
          <p className="mx-auto mb-6 max-w-[42ch] text-[15px] leading-[1.7] text-body">
            Thanks, {done.firstName}. We&apos;ll reply within one working day.
            For a faster answer, continue the same message on WhatsApp now.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={done.whatsappUrl}
              target="_blank"
              rel="noopener"
              className="btn-gold px-7 py-3.5 text-[15px]"
            >
              Continue on WhatsApp →
            </a>
            <a href={telHref} className="btn-ghost px-6 py-[13px] text-[14.5px]">
              Call instead
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
      className="relative overflow-hidden rounded-3xl border border-line-strong bg-white p-[clamp(24px,3.5vw,40px)] shadow-[0_28px_70px_rgba(59,42,4,.12)] rise [animation-duration:.8s] [animation-delay:.12s]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 rounded-[17px] border border-[rgba(176,138,46,.3)]"
      />
      <div className="relative">
        <h2 className="mb-1.5 font-display text-[clamp(24px,3vw,30px)] font-semibold">
          Send a message
        </h2>
        <p className="mb-[22px] text-sm leading-[1.6] text-caption">
          Prefer to type it out? Tell us what you need and we&apos;ll pick the
          right advisor.
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
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,170px),1fr))] gap-4">
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
            <div>
              <label htmlFor="em" className={labelClass}>
                EMAIL{" "}
                <span className="font-normal text-faint">(OPTIONAL)</span>
              </label>
              <input
                id="em"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={show("em")}
                className={inputClass(show("em"))}
                {...emReg}
                onChange={(e) => {
                  e.target.value = e.target.value.slice(0, 80);
                  emReg.onChange(e);
                }}
              />
              {show("em") && <p className={errClass}>{errors.em?.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="topic" className={labelClass}>
              WHAT&apos;S THIS ABOUT?
            </label>
            <select
              id="topic"
              className="w-full cursor-pointer appearance-auto rounded-xl border-[1.5px] border-[#E2D8BF] bg-white px-3.5 py-[13px] text-[15.5px] text-ink outline-none focus:border-gold-mid focus:shadow-[0_0_0_3.5px_rgba(176,138,46,.15)]"
              {...register("topic")}
            >
              <option value="">Choose a topic</option>
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {topicErr && (
              <p className={errClass}>
                Pick a topic so we route you to the right advisor.
              </p>
            )}
          </div>
          <div>
            <label htmlFor="msg" className={labelClass}>
              MESSAGE
            </label>
            <textarea
              id="msg"
              rows={4}
              placeholder="A line or two about what you need."
              aria-invalid={show("msg")}
              className={`${inputClass(show("msg"))} min-h-[104px] resize-y leading-[1.6]`}
              {...msgReg}
              onChange={(e) => {
                e.target.value = e.target.value.slice(0, 600);
                msgReg.onChange(e);
              }}
            />
            {show("msg") && <p className={errClass}>{errors.msg?.message}</p>}
          </div>
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className={`mt-6 flex w-full items-center justify-center gap-[9px] rounded-full border px-[30px] py-4 text-[15.5px] font-bold whitespace-nowrap transition-[transform,filter] duration-[.18s] ${
            isValid
              ? "cursor-pointer border-gold-deep bg-[linear-gradient(180deg,#E9CF79,#BB932F_55%,#A5801F)] text-[#241B07] shadow-[inset_0_1px_0_rgba(255,255,255,.55),0_2px_12px_rgba(140,101,21,.3)]"
              : "cursor-not-allowed border-[#E2D8BF] bg-[#EFE9D8] text-[#A69D84]"
          }`}
        >
          Send message →
        </button>
        <p className="mt-3.5 text-xs leading-[1.7] text-caption">
          By sending this you agree to our <Link href={routes.terms}>terms</Link>{" "}
          and <Link href={routes.privacy}>privacy policy</Link>. We&apos;ll
          only use your details to reply to this enquiry.
        </p>
      </div>
    </form>
  );
}
