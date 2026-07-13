import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "About",
  description:
    "About PDS Global — a loan service provider in the Finance Buddha group, arranging personal, business and gold loans across India since 2012.",
};

const numbers: [string, string][] = [
  ["₹50,000 Cr+", "GROUP DISBURSALS FACILITATED"],
  ["4 crore+", "INDIANS SERVED BY THE GROUP"],
  ["19,000+", "PINCODES SERVED"],
];

const values = [
  {
    title: "Candour",
    body: "We say who pays us, we never promise approval, and when no lender fits, we say that too — with a plan for what to fix.",
  },
  {
    title: "Care",
    body: "One named advisor per borrower, reachable on WhatsApp, accountable from first hello to disbursal. No call-centre roulette.",
  },
  {
    title: "Craft",
    body: "Clean files move fast. We obsess over documentation quality because a well-prepared application is the cheapest rate cut there is.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* ————— Hero ————— */}
      <section className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(48px,7vw,96px)] text-center [background:radial-gradient(900px_460px_at_50%_-18%,rgba(201,162,75,.15),transparent_62%),#FCFAF5]">
        <p className="mb-[18px] font-mono text-[11.5px] tracking-[.22em] text-gold rise">
          ABOUT PDS GLOBAL
        </p>
        <h1 className="mx-auto mb-5 max-w-[20ch] font-display text-[clamp(38px,5vw,68px)] leading-[1.04] font-semibold tracking-[-.012em] text-balance rise [animation-delay:.08s]">
          Credit should feel considered, not chaotic.
        </h1>
        <p className="mx-auto max-w-[56ch] text-[17px] leading-[1.68] text-body rise [animation-delay:.16s]">
          PDS Global is the direct lending marketplace of the Finance Buddha
          group — built on a simple conviction: a loan is a household decision,
          and it deserves a human standing beside it.
        </p>
      </section>

      {/* ————— Our story ————— */}
      <section
        aria-label="Our story"
        className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(64px,9vw,100px)]"
      >
        <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(36px,5vw,72px)]">
          <div>
            <p className="mb-3 font-mono text-[11px] tracking-[.22em] text-gold">
              SINCE 2012
            </p>
            <h2 className="mb-5 max-w-[18ch] font-display text-[clamp(30px,3.6vw,46px)] leading-[1.06] font-semibold text-balance">
              Thirteen years of walking borrowers to the right door.
            </h2>
            <p className="mb-3.5 max-w-[64ch] text-[15.5px] leading-[1.75] text-body">
              The Finance Buddha group began in 2012 with a desk, a phone, and
              an unfashionable idea: that a loan intermediary should work for
              the borrower, not the loudest lender. Thirteen years on, the
              group has facilitated over ₹50,000 crore in disbursals across
              19,000+ pincodes — one matched borrower at a time.
            </p>
            <p className="mb-3.5 max-w-[64ch] text-[15.5px] leading-[1.75] text-body">
              PDS Global is the group&apos;s consumer brand — the globe in our
              mark standing for reach, and the plain promise that wherever you
              are among 19,000+ pincodes, we work to find the right lender for
              you. We are a loan service provider: we do not lend, we arrange.
              That distinction keeps our incentives clean. We compare your
              profile across 40+ RBI-regulated banks and NBFCs, tell you
              plainly who pays us, and stay with you until the money lands.
            </p>
            <p className="max-w-[64ch] text-[15.5px] leading-[1.75] text-body">
              The model is deliberately human. Every applicant gets a named
              advisor on WhatsApp — not a queue, not a chatbot pretending
              otherwise. Our ISO 27001-certified processes keep the paperwork
              safe; our advisors keep it honest.
            </p>
          </div>

          {/* By-the-numbers arch card */}
          <div className="relative mx-auto w-full max-w-[400px]">
            <div className="relative overflow-hidden rounded-[200px_200px_24px_24px] border border-line-strong bg-[linear-gradient(180deg,#FFFFFF_0%,#FBF6EA_68%,#F5EEDC_100%)] px-[30px] pt-16 pb-8 text-center shadow-[0_28px_70px_rgba(59,42,4,.14)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[repeating-radial-gradient(circle_at_50%_-12%,rgba(176,138,46,.13)_0_1px,transparent_1px_13px)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[9px] rounded-[192px_192px_18px_18px] border border-[rgba(176,138,46,.45)]"
              />
              <div className="relative">
                <Image
                  src="/assets/pds-logo.png"
                  alt="PDS Global"
                  width={66}
                  height={66}
                  className="mx-auto mb-[18px] block h-[66px] w-[66px] rounded-[17px] border border-[rgba(176,138,46,.4)] bg-white object-contain shadow-[0_6px_16px_rgba(140,101,21,.26)]"
                />
                <p className="mb-[18px] font-mono text-[10px] tracking-[.3em] text-gold">
                  BY THE NUMBERS
                </p>
                <div className="flex flex-col gap-4">
                  {numbers.map(([big, small], i) => (
                    <div key={small} className="contents">
                      {i > 0 && (
                        <div
                          aria-hidden="true"
                          className="mx-[30px] h-px bg-[linear-gradient(90deg,rgba(176,138,46,0),rgba(176,138,46,.5),rgba(176,138,46,0))]"
                        />
                      )}
                      <div>
                        <p className="font-display text-[34px] font-bold tabular-nums">
                          {big}
                        </p>
                        <p className="mt-1 font-mono text-[9.5px] tracking-[.16em] text-caption">
                          {small}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ————— Values ————— */}
      <section
        aria-label="Values"
        className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(64px,9vw,100px)]"
      >
        <div className="mx-auto max-w-[1180px]">
          <p className="mb-3 text-center font-mono text-[11px] tracking-[.22em] text-gold">
            HOW WE WORK
          </p>
          <h2 className="mx-auto mb-7 max-w-[20ch] text-center font-display text-[clamp(30px,3.6vw,46px)] font-semibold text-balance">
            Three words we hire for.
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-[18px]">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-[20px] border border-line bg-white px-[30px] pt-[30px] pb-[26px]"
              >
                <h3 className="mb-2.5 font-display text-[27px] font-semibold">
                  {v.title}
                </h3>
                <p className="text-[14.5px] leading-[1.7] text-body">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Group ————— */}
      <section
        aria-label="Group"
        className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(64px,9vw,100px)]"
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="relative overflow-hidden rounded-3xl border border-[rgba(201,162,75,.4)] bg-night p-[clamp(32px,5vw,56px)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[repeating-radial-gradient(circle_at_92%_-30%,rgba(201,162,75,.08)_0_1px,transparent_1px_16px)]"
            />
            <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-[clamp(24px,4vw,48px)]">
              <div>
                <p className="mb-3 font-mono text-[10.5px] tracking-[.24em] text-gold-bright">
                  THE GROUP BEHIND US
                </p>
                <h2 className="mb-3.5 font-display text-[clamp(26px,3.2vw,38px)] leading-[1.15] font-semibold text-cream">
                  Part of the Finance Buddha group.
                </h2>
                <p className="max-w-[56ch] text-[15px] leading-[1.75] text-[#A99E85]">
                  Founded 2012, headquartered in Chennai, ISO/IEC 27001
                  certified. The group&apos;s work has been featured in
                  LiveMint, Business Standard, Business Insider, The Economic
                  Times and YourStory.
                </p>
              </div>
              <div className="flex flex-wrap items-baseline justify-center gap-x-[26px] gap-y-2.5">
                <span className="font-sans text-xl leading-none text-[#E8DFC8]">
                  <span className="font-normal">live</span>
                  <span className="font-extrabold text-[#E9CF79]">mint</span>
                </span>
                <span className="font-display text-xl font-bold tracking-[.01em] text-night-text">
                  Business Standard
                </span>
                <span className="inline-block text-center font-display text-[13.5px] leading-[1.05] font-bold tracking-[.08em] text-night-text">
                  BUSINESS
                  <br />
                  INSIDER
                </span>
                <span className="font-display text-base font-semibold tracking-[.04em] text-night-text [font-variant:small-caps]">
                  The Economic Times
                </span>
                <span className="font-sans text-[17px] font-extrabold tracking-[.03em] text-night-text">
                  YOUR<span className="text-[#E9CF79]">STORY</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ————— Get in touch ————— */}
      <section
        aria-label="Get in touch"
        className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(64px,9vw,100px)]"
      >
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="mb-3 font-display text-[clamp(28px,3.6vw,42px)] font-semibold">
            Judge us by a conversation.
          </h2>
          <p className="mx-auto mb-[26px] max-w-[48ch] text-[15.5px] leading-[1.65] text-body">
            Two minutes with an advisor says more than any about-page.
            We&apos;re glad to be tested.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link href={routes.apply} className="btn-gold px-[30px] py-[15px] text-[15.5px]">
              Apply now →
            </Link>
            <Link
              href={routes.contactUs}
              className="btn-ghost px-[26px] py-3.5 text-[15px]"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
