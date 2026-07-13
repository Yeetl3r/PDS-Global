import type { Metadata } from "next";
import { BlogsIndex } from "./blogs-client";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "The PDS Ledger — plain-spoken writing on credit scores, personal loans, business credit and money habits for Indian households.",
};

export default function BlogsPage() {
  return (
    <main>
      {/* ————— Masthead ————— */}
      <section className="px-[clamp(20px,4.5vw,48px)] pt-[clamp(36px,5vw,64px)] text-center [background:radial-gradient(800px_400px_at_50%_-20%,rgba(201,162,75,.13),transparent_62%),#FCFAF5]">
        <p className="mb-4 font-mono text-[11.5px] tracking-[.22em] text-gold">
          THE PDS LEDGER
        </p>
        <h1 className="mx-auto mb-4 max-w-[22ch] font-display text-[clamp(34px,4.4vw,56px)] leading-[1.05] font-semibold tracking-[-.01em] text-balance">
          Money, written plainly.
        </h1>
        <p className="mx-auto max-w-[52ch] text-base leading-[1.65] text-body">
          Credit, borrowing and household finance — explained the way our
          advisors explain it on WhatsApp: specific, honest, useful.
        </p>
      </section>

      <BlogsIndex />
    </main>
  );
}
