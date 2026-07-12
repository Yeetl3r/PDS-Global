import Image from "next/image";
import Link from "next/link";
import { telHref, waGeneric } from "@/lib/config";
import { routes } from "@/lib/routes";
import { PartnerGrid } from "@/components/PartnerGrid";
import { PressStrip } from "@/components/PressStrip";

const stats: [string, string][] = [
  ["₹50,000 Cr+", "DISBURSED THROUGH OUR GROUP"],
  ["Since 2012", "13+ YEARS IN CREDIT"],
  ["19,000+", "PINCODES SERVED"],
  ["ISO 27001", "CERTIFIED INFORMATION SECURITY"],
];

const steps = [
  {
    n: "STEP 01",
    title: "Tell us about yourself",
    body: "Ten fields, three minutes. PAN, income and the loan you have in mind are all we need to begin.",
  },
  {
    n: "STEP 02",
    title: "We shortlist your lenders",
    body: "Your profile is matched across 40+ partner banks and NBFCs for rate, tenure and approval likelihood.",
  },
  {
    n: "STEP 03",
    title: "One advisor, till the money lands",
    body: "A named advisor walks you through offers, documents and disbursal — on WhatsApp or a call, your choice.",
  },
];

const candourPoints = [
  {
    strong: "We are a loan service provider, not a lender",
    rest: " — our job is finding your best fit across 40+ institutions, and we say so plainly.",
  },
  {
    strong: "Free for borrowers.",
    rest: " Partner lenders pay us on disbursal, so our service costs you nothing — ever.",
  },
  {
    strong: "Your data moves encrypted, always.",
    rest: " ISO 27001-certified processes, shared only with lenders you choose to proceed with.",
  },
  {
    strong: "No call-centre barrage.",
    rest: " One named advisor, reachable on WhatsApp, from first hello to disbursal.",
  },
];

const testimonials = [
  {
    quote:
      "I expected a dozen calls from a dozen banks. Instead, one advisor handled everything on WhatsApp — sanction in two days, money in four.",
    name: "Ritika Sharma",
    meta: "PERSONAL LOAN · ₹6.5 L · JAIPUR",
  },
  {
    quote:
      "As a first-generation manufacturer, banks kept asking for collateral I didn't have. PDS Global found me a collateral-free ₹22 lakh line at a rate I could live with.",
    name: "K. Srinivasan",
    meta: "BUSINESS LOAN · ₹22 L · COIMBATORE",
  },
  {
    quote:
      "My score was 646 and everyone said no. Their advisor told me exactly what to fix — five months later I borrowed at 12.5% for my sister's wedding.",
    name: "Ayesha Khan",
    meta: "CREDIT REPAIR → PERSONAL LOAN · LUCKNOW",
  },
];

/** Gold orb bullet used for steps and the candour list. */
function GoldDot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`rounded-full bg-[radial-gradient(circle_at_32%_28%,#F4E4AC,#C9A24B_55%,#8E6B21)] ${className}`}
    />
  );
}

export default function HomePage() {
  return (
    <main>
      {/* ————— Hero ————— */}
      <section
        aria-label="Hero"
        className="relative overflow-hidden bg-paper [background:radial-gradient(1000px_520px_at_88%_-12%,rgba(201,162,75,.16),transparent_60%),radial-gradient(700px_400px_at_-10%_110%,rgba(201,162,75,.08),transparent_60%),#FCFAF5]"
      >
        <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,430px),1fr))] items-center gap-[clamp(40px,5vw,64px)] px-[clamp(20px,4.5vw,48px)] pt-[clamp(48px,7vw,104px)] pb-[clamp(56px,7vw,96px)]">
          <div className="max-w-[640px]">
            <p className="mb-[22px] font-mono text-xs tracking-[.2em] text-gold rise">
              40+ RBI-REGULATED PARTNER LENDERS · SINCE 2012
            </p>
            <h1 className="mb-6 font-display text-[clamp(42px,5.6vw,76px)] leading-[1.02] font-semibold tracking-[-.015em] text-balance rise [animation-delay:.08s]">
              India&apos;s <em className="italic text-gold">trusted</em>{" "}
              destination for personal &amp; business loans.
            </h1>
            <p className="mb-[34px] max-w-[52ch] text-[clamp(16.5px,1.5vw,18.5px)] leading-[1.65] text-body text-pretty rise [animation-delay:.16s]">
              We compare offers across 40+ RBI-regulated banks and NBFCs, then
              a named PDS Global advisor walks you from application to
              disbursal. No spam, no jargon, no surprises.
            </p>
            <div className="flex flex-wrap gap-3.5 rise [animation-delay:.24s]">
              <Link
                href={routes.apply}
                className="btn-gold px-8 py-4 text-base"
              >
                Apply now →
              </Link>
              <a
                href={telHref}
                className="btn-ghost px-7 py-[15px] text-[15.5px]"
              >
                Talk to an advisor
              </a>
            </div>
            <p className="mt-[30px] font-mono text-[11px] leading-loose tracking-[.16em] text-caption rise [animation-delay:.32s]">
              FREE FOR BORROWERS · NO IMPACT ON CREDIT SCORE · ISO 27001
              CERTIFIED
            </p>
          </div>

          {/* Signature arch card */}
          <div className="relative mx-auto w-full max-w-[430px] rise [animation-duration:.9s] [animation-delay:.2s]">
            <div className="relative overflow-hidden rounded-[240px_240px_26px_26px] border border-line-strong bg-[linear-gradient(180deg,#FFFFFF_0%,#FBF6EA_68%,#F5EEDC_100%)] px-[30px] pt-[76px] pb-[34px] shadow-[0_32px_80px_rgba(59,42,4,.16),0_2px_6px_rgba(59,42,4,.05)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[repeating-radial-gradient(circle_at_50%_-12%,rgba(176,138,46,.13)_0_1px,transparent_1px_13px),repeating-radial-gradient(circle_at_50%_118%,rgba(176,138,46,.08)_0_1px,transparent_1px_17px)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[9px] rounded-[231px_231px_19px_19px] border border-[rgba(176,138,46,.45)]"
              />
              <div className="relative text-center">
                <Image
                  src="/assets/pds-logo.png"
                  alt="PDS Global"
                  width={70}
                  height={70}
                  priority
                  className="mx-auto mb-5 block h-[70px] w-[70px] rounded-[18px] border border-[rgba(176,138,46,.4)] bg-white object-contain shadow-[0_6px_16px_rgba(140,101,21,.26)]"
                />
                <p className="mb-2.5 font-mono text-[10.5px] tracking-[.3em] text-gold">
                  PDS GLOBAL · PERSONAL LOAN
                </p>
                <p className="font-display text-[clamp(44px,4.5vw,56px)] leading-none font-bold tabular-nums">
                  ₹50,00,000
                </p>
                <p className="mt-2 text-sm text-caption">
                  loans up to, at rates from{" "}
                  <strong className="text-ink">10.49% p.a.*</strong>
                </p>
                <div
                  aria-hidden="true"
                  className="mx-2.5 my-6 h-px bg-[linear-gradient(90deg,rgba(176,138,46,0),rgba(176,138,46,.55),rgba(176,138,46,0))]"
                />
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      ["12–72", "MONTHS"],
                      ["24 hrs", "FASTEST DISBURSAL"],
                      ["40+", "LENDERS"],
                    ] as const
                  ).map(([big, small]) => (
                    <div key={small}>
                      <p className="font-display text-[23px] font-bold">
                        {big}
                      </p>
                      <p className="mt-1 font-mono text-[9.5px] tracking-[.14em] text-caption">
                        {small}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-[26px] font-mono text-[9.5px] leading-[1.7] tracking-[.08em] text-faint">
                  *FINAL RATE IS SET BY YOUR LENDER,
                  <br />
                  BASED ON YOUR CREDIT PROFILE.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-5 left-[18px] flex items-center gap-[9px] rounded-full border border-line bg-white px-4 py-2.5 text-[13px] font-semibold whitespace-nowrap text-body shadow-[0_12px_32px_rgba(59,42,4,.14)]">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-gold-mid [animation:pulse-dot_2.2s_infinite]"
              />
              Advisors online · replies in ~15 min
            </div>
          </div>
        </div>
      </section>

      {/* ————— Track record ————— */}
      <section
        aria-label="Track record"
        className="border-y border-[rgba(176,138,46,.3)]"
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-px bg-[rgba(176,138,46,.26)]">
          {stats.map(([big, small]) => (
            <div
              key={small}
              className="bg-paper-warm px-[clamp(20px,3vw,36px)] py-[clamp(26px,3.5vw,40px)] text-center"
            >
              <p className="font-display text-[clamp(32px,3.2vw,44px)] font-bold tabular-nums">
                {big}
              </p>
              <p className="mt-2 font-mono text-[10.5px] tracking-[.16em] text-caption">
                {small}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ————— Loan products ————— */}
      <section aria-label="Loan products" className="pt-[clamp(64px,9vw,110px)]">
        <div className="mx-auto max-w-[1180px] px-[clamp(20px,4.5vw,48px)]">
          <p className="mb-3.5 text-center font-mono text-[11.5px] tracking-[.22em] text-gold">
            WHAT WE ARRANGE
          </p>
          <h2 className="mx-auto mb-[18px] max-w-[22ch] text-center font-display text-[clamp(32px,3.8vw,50px)] leading-[1.06] font-semibold text-balance">
            Three ways to borrow well.
          </h2>
          <p className="mx-auto mb-[clamp(36px,5vw,56px)] max-w-[58ch] text-center text-[16.5px] leading-[1.65] text-body">
            Every product below is arranged, not lent — we shortlist across our
            partner lenders and you choose with clear eyes.
          </p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[22px]">
            {/* Personal loan */}
            <div className="group relative rounded-[150px_150px_22px_22px] border border-line bg-white px-[30px] pt-[52px] pb-[34px] text-center shadow-[0_1px_3px_rgba(59,42,4,.05)] transition-[transform,box-shadow,border-color] duration-[.25s] hover:-translate-y-1.5 hover:border-line-gold hover:shadow-[0_24px_56px_rgba(59,42,4,.12)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-2 rounded-[143px_143px_16px_16px] border border-[rgba(176,138,46,.28)]"
              />
              <p className="mb-3.5 font-mono text-[10.5px] tracking-[.24em] text-gold">
                PERSONAL LOAN
              </p>
              <p className="font-display text-[38px] font-bold tabular-nums">
                ₹50 lakhs
              </p>
              <p className="mt-1.5 font-mono text-[10.5px] tracking-[.12em] text-caption">
                UP TO · FROM 10.49% P.A. · 12–72 MO
              </p>
              <p className="mx-auto mt-[18px] mb-[26px] max-w-[34ch] text-[15px] leading-[1.65] text-body">
                For weddings, medical needs, education or consolidation —
                without touching your savings.
              </p>
              <Link
                href={routes.personalLoanApplication}
                className="btn-gold px-[26px] py-[13px] text-[14.5px]"
              >
                Apply now →
              </Link>
              <p className="mt-4 text-[13.5px]">
                <Link
                  href={routes.personalLoanCalculator}
                  className="font-semibold"
                >
                  Estimate your EMI →
                </Link>
              </p>
            </div>
            {/* Business loan */}
            <div className="relative rounded-[150px_150px_22px_22px] border border-line bg-white px-[30px] pt-[52px] pb-[34px] text-center shadow-[0_1px_3px_rgba(59,42,4,.05)] transition-[transform,box-shadow,border-color] duration-[.25s] hover:-translate-y-1.5 hover:border-line-gold hover:shadow-[0_24px_56px_rgba(59,42,4,.12)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-2 rounded-[143px_143px_16px_16px] border border-[rgba(176,138,46,.28)]"
              />
              <p className="mb-3.5 font-mono text-[10.5px] tracking-[.24em] text-gold">
                BUSINESS LOAN
              </p>
              <p className="font-display text-[38px] font-bold tabular-nums">
                ₹75 lakhs
              </p>
              <p className="mt-1.5 font-mono text-[10.5px] tracking-[.12em] text-caption">
                UP TO · FROM 14% P.A. · COLLATERAL-FREE OPTIONS
              </p>
              <p className="mx-auto mt-[18px] mb-[26px] max-w-[34ch] text-[15px] leading-[1.65] text-body">
                Working capital and expansion finance for proprietors,
                partnerships and private firms.
              </p>
              <Link
                href={routes.contactUs}
                className="btn-ghost px-[26px] py-[13px] text-[14.5px]"
              >
                Talk to an advisor
              </Link>
              <p className="mt-4 text-[13.5px]">
                <Link
                  href={routes.businessLoanCalculator}
                  className="font-semibold"
                >
                  Estimate your EMI →
                </Link>
              </p>
            </div>
            {/* Gold loan */}
            <div className="relative rounded-[150px_150px_22px_22px] border border-line bg-white px-[30px] pt-[52px] pb-[34px] text-center shadow-[0_1px_3px_rgba(59,42,4,.05)] transition-[transform,box-shadow,border-color] duration-[.25s] hover:-translate-y-1.5 hover:border-line-gold hover:shadow-[0_24px_56px_rgba(59,42,4,.12)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-2 rounded-[143px_143px_16px_16px] border border-[rgba(176,138,46,.28)]"
              />
              <p className="mb-3.5 font-mono text-[10.5px] tracking-[.24em] text-gold">
                GOLD LOAN
              </p>
              <p className="font-display text-[38px] font-bold">9.50% p.a.</p>
              <p className="mt-1.5 font-mono text-[10.5px] tracking-[.12em] text-caption">
                FROM · PER-GRAM RATES UPDATED DAILY
              </p>
              <p className="mx-auto mt-[18px] mb-[26px] max-w-[34ch] text-[15px] leading-[1.65] text-body">
                Unlock the value in family gold at secured-lending rates, and
                release it any time.
              </p>
              <Link
                href={routes.contactUs}
                className="btn-ghost px-[26px] py-[13px] text-[14.5px]"
              >
                Talk to an advisor
              </Link>
              <p className="mt-4 text-[13.5px]">
                <Link
                  href={routes.goldLoanCalculator}
                  className="font-semibold"
                >
                  Estimate your EMI →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ————— How it works ————— */}
      <section aria-label="How it works" className="pt-[clamp(64px,9vw,110px)]">
        <div className="mx-auto max-w-[1180px] px-[clamp(20px,4.5vw,48px)]">
          <div className="mb-[clamp(32px,4.5vw,52px)] flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div>
              <p className="mb-3.5 font-mono text-[11.5px] tracking-[.22em] text-gold">
                THE PDS GLOBAL WAY
              </p>
              <h2 className="max-w-[20ch] font-display text-[clamp(32px,3.8vw,50px)] leading-[1.06] font-semibold text-balance">
                From application to disbursal, accompanied.
              </h2>
            </div>
            <p className="max-w-[38ch] text-[15.5px] leading-[1.65] text-body">
              Most loan sites hand your number to a call centre. We assign you
              one person, and they stay with you.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-[clamp(24px,3vw,40px)]">
            {steps.map((s) => (
              <div
                key={s.n}
                className="relative border-t border-line-soft pt-6"
              >
                <GoldDot className="absolute -top-[5px] left-0 h-[9px] w-[9px]" />
                <p className="mb-3 font-mono text-[11px] tracking-[.2em] text-caption">
                  {s.n}
                </p>
                <h3 className="mb-2.5 font-display text-[27px] font-semibold">
                  {s.title}
                </h3>
                <p className="max-w-[40ch] text-[15px] leading-[1.68] text-body">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Lending partners ————— */}
      <section
        aria-label="Lending partners"
        className="pt-[clamp(64px,9vw,110px)]"
      >
        <div className="mx-auto max-w-[1180px] px-[clamp(20px,4.5vw,48px)]">
          <p className="mb-3.5 text-center font-mono text-[11.5px] tracking-[.22em] text-gold">
            OUR NETWORK
          </p>
          <h2 className="mx-auto mb-[18px] max-w-[24ch] text-center font-display text-[clamp(32px,3.8vw,50px)] leading-[1.06] font-semibold text-balance">
            Trusted by 4 crore+ Indians.
          </h2>
          <p className="mx-auto mb-[clamp(36px,5vw,52px)] max-w-[60ch] text-center text-[16.5px] leading-[1.65] text-body">
            …who have checked, compared or borrowed through the Finance Buddha
            group — matched against the institutions they already bank with.
          </p>
          <PartnerGrid />
          <p className="mt-[18px] text-center font-mono text-[10.5px] tracking-[.08em] text-faint">
            PARTNER BRANDS BELONG TO THEIR RESPECTIVE OWNERS · FINAL OFFERS
            DEPEND ON LENDER ELIGIBILITY CHECKS
          </p>
        </div>
      </section>

      {/* ————— Why PDS Global ————— */}
      <section
        aria-label="Why PDS Global"
        className="pt-[clamp(64px,9vw,110px)]"
      >
        <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(36px,5vw,72px)] px-[clamp(20px,4.5vw,48px)]">
          <div>
            <p className="mb-3.5 font-mono text-[11.5px] tracking-[.22em] text-gold">
              WHY PDS GLOBAL
            </p>
            <h2 className="mb-7 max-w-[18ch] font-display text-[clamp(32px,3.8vw,50px)] leading-[1.06] font-semibold text-balance">
              Candour is our credit policy.
            </h2>
            <div className="flex flex-col gap-5">
              {candourPoints.map((pt) => (
                <div key={pt.strong} className="flex gap-3.5">
                  <GoldDot className="mt-[7px] h-2.5 w-2.5 shrink-0" />
                  <p className="max-w-[52ch] text-[15.5px] leading-[1.68] text-body">
                    <strong className="text-ink">{pt.strong}</strong>
                    {pt.rest}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-[440px] flex-col gap-[18px]">
            <div className="relative overflow-hidden rounded-[120px_120px_20px_20px] border border-line-strong bg-[linear-gradient(180deg,#FFFFFF,#FBF6EA)] px-[30px] pt-11 pb-7 text-center shadow-[0_20px_52px_rgba(59,42,4,.1)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[repeating-radial-gradient(circle_at_50%_-20%,rgba(176,138,46,.1)_0_1px,transparent_1px_14px)]"
              />
              <p className="mb-2 font-mono text-[10.5px] tracking-[.26em] text-gold">
                CERTIFIED SECURE
              </p>
              <p className="font-display text-[34px] font-bold">
                ISO/IEC 27001:2022
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-caption">
                Information security audited annually.
                <br />
                256-bit encryption in transit and at rest.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3.5 rounded-[20px] border border-[rgba(201,162,75,.4)] bg-night px-[30px] py-[26px]">
              <div>
                <p className="mb-1.5 font-mono text-[10.5px] tracking-[.22em] text-gold-bright">
                  PREFER TO JUST ASK?
                </p>
                <p className="font-display text-2xl font-semibold text-cream">
                  Message us first.
                </p>
              </div>
              <a
                href={waGeneric}
                target="_blank"
                rel="noopener"
                className="btn-gold px-6 py-3 text-sm"
              >
                WhatsApp us →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ————— Borrower stories ————— */}
      <section
        aria-label="Borrower stories"
        className="pt-[clamp(64px,9vw,110px)]"
      >
        <div className="mx-auto max-w-[1180px] px-[clamp(20px,4.5vw,48px)]">
          <p className="mb-3.5 text-center font-mono text-[11.5px] tracking-[.22em] text-gold">
            BORROWER STORIES
          </p>
          <h2 className="mx-auto mb-[clamp(36px,5vw,52px)] max-w-[20ch] text-center font-display text-[clamp(32px,3.8vw,50px)] leading-[1.06] font-semibold text-balance">
            In their words.
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[22px]">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="m-0 flex flex-col rounded-[20px] border border-line bg-white px-[30px] pt-[30px] pb-[26px] shadow-[0_1px_3px_rgba(59,42,4,.05)] transition-[transform,box-shadow] duration-[.25s] hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(59,42,4,.1)]"
              >
                <span
                  aria-hidden="true"
                  className="mb-4 font-display text-[58px] leading-[.6] text-[#D9BF7F]"
                >
                  &ldquo;
                </span>
                <blockquote className="m-0 mb-[22px] flex-1 text-[15.5px] leading-[1.7] text-ink-soft">
                  {t.quote}
                </blockquote>
                <figcaption>
                  <p className="text-[15px] font-bold">{t.name}</p>
                  <p className="mt-1 font-mono text-[10.5px] tracking-[.14em] text-caption">
                    {t.meta}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Press mentions ————— */}
      <section
        aria-label="Press mentions"
        className="pt-[clamp(56px,8vw,90px)]"
      >
        <div className="mx-auto max-w-[1180px] px-[clamp(20px,4.5vw,48px)] text-center">
          <p className="mb-[26px] font-mono text-[11px] tracking-[.18em] text-caption">
            PART OF THE FINANCE BUDDHA GROUP, FEATURED IN:
          </p>
          <PressStrip />
        </div>
      </section>

      {/* ————— Apply CTA ————— */}
      <section
        aria-label="Apply call to action"
        className="pt-[clamp(64px,9vw,110px)]"
      >
        <div className="mx-auto max-w-[1180px] px-[clamp(20px,4.5vw,48px)]">
          <div className="relative overflow-hidden rounded-[26px] border border-gold-bright bg-[linear-gradient(120deg,#F6ECCB,#E7CE85_55%,#DBBC62)] px-[clamp(24px,5vw,64px)] py-[clamp(40px,6vw,72px)] text-center shadow-[0_24px_64px_rgba(140,101,21,.18)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[repeating-radial-gradient(circle_at_0%_120%,rgba(120,89,18,.1)_0_1px,transparent_1px_15px),repeating-radial-gradient(circle_at_100%_-20%,rgba(120,89,18,.08)_0_1px,transparent_1px_18px)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-2.5 rounded-[18px] border border-[rgba(120,89,18,.35)]"
            />
            <div className="relative">
              <h2 className="mb-3.5 font-display text-[clamp(34px,4.2vw,54px)] leading-[1.05] font-semibold text-[#211505]">
                Ready when you are.
              </h2>
              <p className="mx-auto mb-8 max-w-[52ch] text-[16.5px] leading-relaxed text-[#5B4E23]">
                Apply in three minutes, or start with a conversation —
                we&apos;re equally glad either way.
              </p>
              <div className="flex flex-wrap justify-center gap-3.5">
                <Link
                  href={routes.apply}
                  className="inline-flex items-center gap-[9px] rounded-full border border-ink bg-ink px-8 py-4 text-[15.5px] font-bold whitespace-nowrap text-[#F3E7C4] shadow-[0_10px_26px_rgba(33,26,7,.3)] transition-[transform,box-shadow] duration-[.18s] hover:-translate-y-px hover:text-[#F3E7C4] hover:shadow-[0_14px_34px_rgba(33,26,7,.38)]"
                >
                  Apply now →
                </Link>
                <a
                  href={waGeneric}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-[9px] rounded-full border-[1.5px] border-ink bg-transparent px-7 py-[15px] text-[15.5px] font-bold whitespace-nowrap text-[#211505] transition-all duration-[.18s] hover:bg-[rgba(33,26,7,.08)] hover:text-[#211505]"
                >
                  WhatsApp an advisor
                </a>
              </div>
              <p className="mt-[26px] font-mono text-[10.5px] tracking-[.12em] text-[#6E5D28]">
                OFFERS DEPEND ON LENDER ELIGIBILITY AND YOUR CREDIT PROFILE —
                NEVER GUARANTEED.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
