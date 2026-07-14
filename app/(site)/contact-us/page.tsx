import type { Metadata } from "next";
import Link from "next/link";
import { config, telHref, waHref } from "@/lib/config";
import { routes } from "@/lib/routes";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact PDS Global — call ${config.phone}, message us on WhatsApp, or email ${config.email}. Choolaimedu, Chennai. A real person replies.`,
};

const waLink = waHref(
  "Hi PDS Global! I'd like to talk about a loan. Please guide me.",
);

/** Design shows the address on three lines, ending "Tamil Nadu, India". */
const [addressLine1, ...addressRest] = config.address.split(/,\s*/);

const contactCardClass =
  "flex items-center gap-[18px] rounded-[18px] border border-line bg-white px-6 py-[22px] text-ink transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-line-gold hover:text-ink hover:shadow-[0_16px_40px_rgba(59,42,4,.1)]";

export default function ContactUsPage() {
  return (
    <main>
      {/* ————— Hero ————— */}
      <section className="relative overflow-hidden [background:radial-gradient(900px_460px_at_50%_-18%,rgba(201,162,75,.15),transparent_62%),#FCFAF5] px-[clamp(20px,4.5vw,48px)] pt-[clamp(44px,6vw,84px)] text-center">
        <p className="mb-[18px] font-mono text-[11.5px] tracking-[.22em] text-gold rise">
          CONTACT US
        </p>
        <h1 className="mx-auto mb-[18px] max-w-[18ch] font-display text-[clamp(38px,5vw,66px)] leading-[1.04] font-semibold tracking-[-.012em] text-balance rise [animation-delay:.08s]">
          Talk to a person, today.
        </h1>
        <p className="mx-auto mb-8 max-w-[52ch] text-[16.5px] leading-[1.65] text-body rise [animation-delay:.16s]">
          No IVR maze, no ticket number. Call or message and a named PDS
          Global advisor answers — usually within 15 working minutes.
        </p>
        <div className="flex flex-wrap justify-center gap-3.5 rise [animation-delay:.24s]">
          <a href={telHref} className="btn-gold gap-2.5 px-[30px] py-4 text-base">
            Call {config.phone}
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener"
            className="btn-ghost gap-2.5 px-7 py-[15px] text-[15.5px]"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full bg-[#1FA855]"
            />
            WhatsApp us
          </a>
        </div>
        <p className="mt-[26px] font-mono text-[11px] tracking-[.16em] text-caption rise [animation-delay:.3s]">
          MON–SAT · 9:30–18:30 IST · FREE FOR BORROWERS
        </p>
      </section>

      {/* ————— Contact channels + message form ————— */}
      <section className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(48px,7vw,88px)]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-[clamp(24px,3.5vw,44px)]">
          <div className="flex flex-col gap-4">
            {/* Call card */}
            <a href={telHref} className={contactCardClass}>
              <span
                aria-hidden="true"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-[13px] border border-gold-mid bg-[linear-gradient(180deg,#F4E4AC,#C9A24B)] shadow-[inset_0_1px_1px_rgba(255,255,255,.5)]"
              >
                <span className="h-[19px] w-[19px] rotate-[8deg] rounded-[6px_6px_7px_4px] border-[2.2px] border-[#4A350B]" />
              </span>
              <span>
                <span className="mb-[5px] block font-mono text-[10px] tracking-[.18em] text-gold">
                  CALL US
                </span>
                <span className="block font-display text-2xl leading-none font-bold tabular-nums">
                  {config.phone}
                </span>
                <span className="mt-[5px] block text-[12.5px] text-caption">
                  Mon–Sat, 9:30–18:30 IST
                </span>
              </span>
            </a>
            {/* WhatsApp card */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener"
              className={contactCardClass}
            >
              <span
                aria-hidden="true"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-[13px] bg-[#1FA855] shadow-[inset_0_1px_1px_rgba(255,255,255,.35)]"
              >
                <span className="h-5 w-5 rounded-[50%_50%_50%_3px] border-[2.4px] border-white" />
              </span>
              <span>
                <span className="mb-[5px] block font-mono text-[10px] tracking-[.18em] text-gold">
                  WHATSAPP
                </span>
                <span className="block font-display text-2xl leading-none font-bold tabular-nums">
                  {config.phone}
                </span>
                <span className="mt-[5px] block text-[12.5px] text-caption">
                  Chat with a pre-filled message
                </span>
              </span>
            </a>
            {/* Email card */}
            <a href={`mailto:${config.email}`} className={contactCardClass}>
              <span
                aria-hidden="true"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-[13px] border border-gold-mid bg-[linear-gradient(180deg,#F4E4AC,#C9A24B)] shadow-[inset_0_1px_1px_rgba(255,255,255,.5)]"
              >
                <span className="relative h-4 w-[22px] overflow-hidden rounded-[3px] border-[2.2px] border-[#4A350B]">
                  <span className="absolute -top-px right-px left-px h-[11px] rounded-[0_0_8px_8px] border-b-[2.2px] border-[#4A350B]" />
                </span>
              </span>
              <span className="min-w-0">
                <span className="mb-[5px] block font-mono text-[10px] tracking-[.18em] text-gold">
                  EMAIL
                </span>
                <span className="block text-[16.5px] leading-[1.35] font-bold tracking-[.005em] [word-break:break-word]">
                  {config.email}
                </span>
                <span className="mt-[5px] block text-[12.5px] text-caption">
                  We reply within one working day
                </span>
              </span>
            </a>
            {/* Address / locator card */}
            <div className="relative overflow-hidden rounded-[18px] border border-[rgba(201,162,75,.4)] bg-night px-[26px] py-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(201,162,75,.09)_0_1px,transparent_1px_26px),repeating-linear-gradient(90deg,rgba(201,162,75,.09)_0_1px,transparent_1px_26px)]"
              />
              <div
                aria-hidden="true"
                className="absolute top-10 right-[34px] h-4 w-4 -rotate-45 rounded-[50%_50%_50%_2px] bg-[linear-gradient(180deg,#F4E4AC,#C9A24B)] shadow-[0_0_0_5px_rgba(201,162,75,.18)]"
              />
              <div className="relative">
                <span className="mb-2.5 block font-mono text-[10px] tracking-[.2em] text-gold-bright">
                  VISIT / WRITE TO US
                </span>
                <p className="mb-2 font-display text-[22px] leading-[1.3] font-semibold text-cream">
                  PDS Global — Chennai
                </p>
                <p className="max-w-[34ch] text-[14.5px] leading-[1.7] text-night-text">
                  {addressLine1},
                  <br />
                  {addressRest.join(", ")},
                  <br />
                  Tamil Nadu, India
                </p>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ————— Grievance officer ————— */}
      <section
        aria-label="Grievance officer"
        className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(56px,8vw,88px)]"
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-center gap-[clamp(22px,3vw,44px)] rounded-[22px] border border-[#EFE7D2] bg-paper-warm p-[clamp(28px,4vw,44px)]">
            <div>
              <p className="mb-3 font-mono text-[10.5px] tracking-[.22em] text-gold">
                GRIEVANCE REDRESSAL
              </p>
              <h2 className="mb-3 font-display text-[clamp(26px,3.2vw,36px)] leading-[1.1] font-semibold">
                A complaint that isn&apos;t heard isn&apos;t resolved.
              </h2>
              <p className="max-w-[52ch] text-[15px] leading-[1.7] text-body">
                If any part of your experience falls short, our Grievance
                Officer is accountable for putting it right — with defined
                timelines and an escalation path to the RBI Ombudsman.
              </p>
              <p className="mt-[18px] text-[14.5px]">
                <Link href={routes.grievanceRedressal} className="font-bold">
                  Read the full redressal policy →
                </Link>
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white px-[26px] py-6">
              <p className="mb-1 font-mono text-[10px] tracking-[.16em] text-caption">
                GRIEVANCE OFFICER
              </p>
              <p className="mb-3.5 font-display text-[22px] font-bold">
                Mr. Prabhu D.
              </p>
              <div className="flex flex-col gap-2.5 text-sm">
                <a
                  href={`mailto:${config.email}`}
                  className="text-body hover:text-gold"
                >
                  {config.email}
                </a>
                <a
                  href={telHref}
                  className="text-body tabular-nums hover:text-gold"
                >
                  {config.phone}
                </a>
                <span className="leading-[1.6] text-caption">
                  Response within 48 working hours · resolution within 7
                  working days
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
