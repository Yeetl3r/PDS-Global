"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { config, telHref } from "@/lib/config";
import { routes } from "@/lib/routes";

type Menu = "loans" | "tools" | null;

const loanItems = [
  {
    href: routes.personalLoanApplication,
    title: "Personal loan",
    desc: "Up to ₹50 lakhs · from 10.49% p.a.",
  },
  {
    href: routes.businessLoanCalculator,
    title: "Business loan",
    desc: "Working capital up to ₹75 lakhs, collateral-free options",
  },
  {
    href: routes.goldLoanCalculator,
    title: "Gold loan",
    desc: "From 9.50% p.a. against jewellery",
  },
];

const toolItems = [
  {
    href: routes.creditScoreChecker,
    title: "Credit score checker",
    desc: "Free, and it never affects your score",
  },
  {
    href: routes.personalLoanCalculator,
    title: "Personal loan EMI calculator",
    desc: "Plan your monthly outflow before you apply",
  },
  {
    href: routes.businessLoanCalculator,
    title: "Business loan EMI calculator",
    desc: "Working-capital EMIs, mapped clearly",
  },
  {
    href: routes.goldLoanCalculator,
    title: "Gold loan calculator",
    desc: "EMIs on gold-backed borrowing",
  },
];

function DropdownItem({
  href,
  title,
  desc,
  accent,
}: {
  href: string;
  title: string;
  desc: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-[3px] rounded-[11px] px-3.5 py-3 text-ink hover:bg-paper-tint hover:text-ink"
    >
      <span
        className={`flex items-center justify-between text-[15px] font-semibold ${accent ? "text-gold" : ""}`}
      >
        {title}{" "}
        <span aria-hidden="true" className={accent ? "" : "text-gold-mid"}>
          →
        </span>
      </span>
      <span className="text-[13px] leading-[1.45] text-caption">{desc}</span>
    </Link>
  );
}

function Dropdown({
  items,
  quickApply,
}: {
  items: { href: string; title: string; desc: string }[];
  quickApply?: boolean;
}) {
  return (
    <div className="absolute top-full left-0 w-[330px] pt-[10px] rise [animation-duration:.18s] [animation-timing-function:ease]">
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_rgba(59,42,4,.16)]">
        <div className="h-[3px] bg-[linear-gradient(90deg,#E3C568,#8E6B21)]" />
        <div className="flex flex-col p-2">
          {items.map((it) => (
            <DropdownItem key={it.title} {...it} />
          ))}
          {quickApply && (
            <>
              <div className="mx-[10px] my-[6px] h-px bg-[#F1EAD8]" />
              <DropdownItem
                href={routes.apply}
                title="Quick apply"
                desc="2-minute check, advisor replies on WhatsApp"
                accent
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Logo({ size = 40 }: { size?: number }) {
  return (
    <span className="flex items-center gap-[11px]">
      <Image
        src="/assets/pds-logo.png"
        alt="PDS Global"
        width={size}
        height={size}
        priority
        className="shrink-0 rounded-[11px] border border-[rgba(176,138,46,.4)] bg-white object-contain shadow-[0_3px_8px_rgba(140,101,21,.22)]"
        style={{ width: size, height: size }}
      />
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap font-display text-[23px] font-semibold tracking-[.005em]">
          PDS Global
        </span>
        <span className="mt-[3px] font-mono text-[8.5px] tracking-[.42em] text-gold">
          FINANCE
        </span>
      </span>
    </span>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState<Menu>(null);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(max-width: 960px)");
    const onMq = () => {
      if (!mq.matches) setMenu(false);
    };
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      clearTimeout(closeTimer.current);
    };
  }, []);

  const show = (m: Menu) => {
    clearTimeout(closeTimer.current);
    setOpen(m);
  };
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-80 border-b border-[rgba(176,138,46,.28)] bg-[rgba(252,250,245,.92)] backdrop-blur-[14px] backdrop-saturate-[1.3] transition-shadow"
        style={{
          boxShadow: scrolled ? "0 12px 32px rgba(59,42,4,.09)" : "none",
        }}
      >
        <div className="mx-auto flex h-[74px] max-w-[1280px] items-center gap-[26px] px-[clamp(16px,3vw,32px)]">
          <Link
            href={routes.home}
            aria-label="PDS Global — home"
            className="shrink-0 text-ink hover:text-ink"
          >
            <Logo />
          </Link>

          {/* Desktop navigation (>960px) */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-[2px] nav:flex"
          >
            <div
              className="relative"
              onMouseEnter={() => show("loans")}
              onMouseLeave={closeSoon}
            >
              <button
                type="button"
                aria-expanded={open === "loans"}
                aria-haspopup="true"
                onClick={() => setOpen(open === "loans" ? null : "loans")}
                className="flex cursor-pointer items-center gap-[7px] rounded-full border-none bg-transparent px-3.5 py-[9px] text-[15px] font-semibold text-ink transition-colors duration-150 hover:bg-[#F3EDDD]"
              >
                Loans{" "}
                <span
                  aria-hidden="true"
                  className="translate-y-px text-[9px] text-gold"
                >
                  ▼
                </span>
              </button>
              {open === "loans" && <Dropdown items={loanItems} quickApply />}
            </div>
            <div
              className="relative"
              onMouseEnter={() => show("tools")}
              onMouseLeave={closeSoon}
            >
              <button
                type="button"
                aria-expanded={open === "tools"}
                aria-haspopup="true"
                onClick={() => setOpen(open === "tools" ? null : "tools")}
                className="flex cursor-pointer items-center gap-[7px] rounded-full border-none bg-transparent px-3.5 py-[9px] text-[15px] font-semibold text-ink transition-colors duration-150 hover:bg-[#F3EDDD]"
              >
                Tools{" "}
                <span
                  aria-hidden="true"
                  className="translate-y-px text-[9px] text-gold"
                >
                  ▼
                </span>
              </button>
              {open === "tools" && <Dropdown items={toolItems} />}
            </div>
            <Link
              href={routes.partnerWithUs}
              className="rounded-full px-3.5 py-[9px] text-[15px] font-semibold text-ink transition-colors duration-150 hover:bg-[#F3EDDD] hover:text-ink"
            >
              Partner with Us
            </Link>
            <Link
              href={routes.blogs}
              className="rounded-full px-3.5 py-[9px] text-[15px] font-semibold text-ink transition-colors duration-150 hover:bg-[#F3EDDD] hover:text-ink"
            >
              Blogs
            </Link>
          </nav>
          <div className="ml-auto hidden shrink-0 items-center gap-[18px] nav:flex">
            <a
              href={telHref}
              className="font-mono text-[13px] tracking-[.02em] text-body hover:text-gold"
            >
              {config.phone}
            </a>
            <Link
              href={routes.apply}
              className="btn-gold px-[22px] py-[11px] text-[14.5px]"
            >
              Apply now
            </Link>
          </div>

          {/* Mobile controls (≤960px) */}
          <div className="ml-auto flex items-center gap-2.5 nav:hidden">
            <Link
              href={routes.apply}
              className="btn-gold px-[18px] py-2.5 text-sm"
            >
              Apply
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-[#E6DCC2] bg-white"
            >
              <span aria-hidden="true" className="flex flex-col gap-[5px]">
                <span className="block h-0.5 w-[19px] rounded-[2px] bg-ink" />
                <span className="block h-0.5 w-[19px] rounded-[2px] bg-gold" />
                <span className="block h-0.5 w-[19px] rounded-[2px] bg-ink" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <div className="h-[74px]" />

      {/* Mobile full-screen menu */}
      {menu && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-90 overflow-y-auto bg-paper rise [animation-duration:.22s] [animation-timing-function:ease]"
        >
          <div className="flex items-center justify-between border-b border-[rgba(176,138,46,.28)] px-[clamp(16px,4vw,28px)] py-[15px]">
            <span className="flex items-center gap-2.5">
              <Image
                src="/assets/pds-logo.png"
                alt="PDS Global"
                width={34}
                height={34}
                className="shrink-0 rounded-[10px] border border-[rgba(176,138,46,.4)] bg-white object-contain"
              />
              <span className="whitespace-nowrap font-display text-[22px] font-semibold">
                PDS Global
              </span>
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenu(false)}
              className="h-11 w-11 cursor-pointer rounded-xl border border-[#E6DCC2] bg-white text-[17px] text-ink"
            >
              ✕
            </button>
          </div>
          <nav
            aria-label="Mobile"
            className="mx-auto max-w-[560px] px-[clamp(16px,4vw,28px)] pt-[26px] pb-10"
          >
            <p className="mb-2.5 font-mono text-[11px] tracking-[.22em] text-gold">
              LOANS
            </p>
            <div className="flex flex-col">
              {loanItems.map((it) => (
                <Link
                  key={it.title}
                  href={it.href}
                  onClick={() => setMenu(false)}
                  className="py-[9px] font-display text-[29px] font-semibold text-ink hover:text-gold"
                >
                  {it.title}
                </Link>
              ))}
            </div>
            <p className="mt-[26px] mb-2.5 font-mono text-[11px] tracking-[.22em] text-gold">
              TOOLS
            </p>
            <div className="flex flex-col">
              {toolItems.map((it) => (
                <Link
                  key={it.title}
                  href={it.href}
                  onClick={() => setMenu(false)}
                  className="py-[9px] text-[17.5px] font-semibold text-ink hover:text-gold"
                >
                  {it.title}
                </Link>
              ))}
            </div>
            <p className="mt-[26px] mb-2.5 font-mono text-[11px] tracking-[.22em] text-gold">
              COMPANY
            </p>
            <div className="flex flex-col">
              {(
                [
                  ["Partner with Us", routes.partnerWithUs],
                  ["Blogs", routes.blogs],
                  ["About", routes.about],
                  ["Contact us", routes.contactUs],
                ] as const
              ).map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenu(false)}
                  className="py-[9px] text-[17.5px] font-semibold text-ink hover:text-gold"
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3.5">
              <Link
                href={routes.apply}
                onClick={() => setMenu(false)}
                className="btn-gold justify-center px-7 py-4 text-base"
              >
                Apply now
              </Link>
              <a
                href={telHref}
                className="btn-ghost justify-center gap-2.5 px-7 py-[15px] text-[15.5px]"
              >
                Call {config.phone}
              </a>
            </div>
            <p className="mt-[22px] text-center font-mono text-[11px] tracking-[.14em] text-faint">
              MON–SAT · 9:30–18:30 IST
            </p>
          </nav>
        </div>
      )}
    </>
  );
}
