import type { ReactNode } from "react";

/**
 * Partner logo wall — 20 typographic wordmarks rendered in the site's
 * ink-and-gold treatment (clean 4×5 on desktop).
 */
function Tile({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-[90px] place-items-center rounded-2xl border border-line bg-white px-3.5 py-4 shadow-[0_1px_2px_rgba(59,42,4,.04)] transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:border-gold-bright hover:shadow-[0_14px_34px_rgba(59,42,4,.1)]">
      {children}
    </div>
  );
}

const inkMark = "text-[#1B1710]";
const subMark = "text-[#6B6350]";

export function PartnerGrid() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,196px),1fr))] gap-3">
      <Tile>
        <span
          className={`font-sans text-[19px] leading-none font-extrabold tracking-[.03em] ${inkMark}`}
        >
          TATA <span className={`font-medium ${subMark}`}>CAPITAL</span>
        </span>
      </Tile>
      <Tile>
        <div className="text-center leading-none">
          <span
            className={`font-sans text-[22px] font-extrabold tracking-[-.02em] ${inkMark}`}
          >
            kotak
          </span>
          <div className="mt-[5px] font-mono text-[7.5px] tracking-[.2em] text-caption">
            MAHINDRA BANK
          </div>
        </div>
      </Tile>
      <Tile>
        <div className="text-center leading-none">
          <span
            className={`font-sans text-[20px] font-extrabold tracking-[-.01em] ${inkMark}`}
          >
            In<span className="text-gold-deep">Cred</span>
          </span>
          <div className={`mt-[3px] font-display text-[13px] font-semibold italic ${subMark}`}>
            finance
          </div>
        </div>
      </Tile>
      <Tile>
        <div className="text-center leading-none">
          <span className={`font-sans text-[20px] font-extrabold ${inkMark}`}>
            <span className="text-gold-deep">pnb</span> Housing
          </span>
          <div className="mt-[5px] font-mono text-[7.5px] tracking-[.16em] text-caption">
            FINANCE LIMITED
          </div>
        </div>
      </Tile>
      <Tile>
        <span
          className={`font-display text-[22px] font-bold tracking-[.01em] italic ${inkMark}`}
        >
          IndusInd <span className={`font-semibold ${subMark}`}>Bank</span>
        </span>
      </Tile>
      <Tile>
        <div className="text-center leading-none">
          <span className="inline-flex items-center gap-[5px]">
            <span
              aria-hidden="true"
              className="h-0 w-0 border-x-[6px] border-b-[9px] border-x-transparent border-b-gold-mid"
            />
            <span
              className={`font-sans text-[20px] font-extrabold tracking-[.02em] ${inkMark}`}
            >
              UNICO
            </span>
          </span>
          <div className="mt-1.5 font-mono text-[7.5px] tracking-[.18em] text-caption">
            HOUSING FINANCE
          </div>
        </div>
      </Tile>
      <Tile>
        <span
          className={`font-sans text-[20px] font-extrabold tracking-[-.01em] ${inkMark}`}
        >
          Kredit<span className="text-gold-deep">Bee</span>
        </span>
      </Tile>
      <Tile>
        <div className="text-center leading-none">
          <span
            aria-hidden="true"
            className="mb-[9px] inline-block h-[13px] w-[13px] rotate-45 rounded-[2px] bg-[linear-gradient(135deg,#E9CF79,#8E6B21)]"
          />
          <div
            className={`font-sans text-sm font-extrabold tracking-[.05em] whitespace-nowrap ${inkMark}`}
          >
            ADITYA BIRLA
          </div>
          <div className="mt-[5px] font-mono text-[8px] tracking-[.2em] text-caption">
            CAPITAL
          </div>
        </div>
      </Tile>
      <Tile>
        <span className="inline-flex items-center gap-[9px]">
          <span
            aria-hidden="true"
            className="h-[15px] w-[15px] shrink-0 rounded-[2px] bg-[linear-gradient(135deg,#C9A24B,#8E6B21)]"
          />
          <span
            className={`font-sans text-[19px] font-extrabold tracking-[.02em] whitespace-nowrap ${inkMark}`}
          >
            HDFC <span className={`font-semibold ${subMark}`}>BANK</span>
          </span>
        </span>
      </Tile>
      <Tile>
        <span
          className={`relative inline-block font-sans text-[25px] leading-none font-extrabold tracking-[-.03em] ${inkMark}`}
        >
          fibe
          <span
            aria-hidden="true"
            className="absolute -top-[3px] -right-2 h-[5px] w-[5px] rounded-full bg-gold-mid"
          />
        </span>
      </Tile>
      <Tile>
        <span className="inline-flex items-center gap-[7px]">
          <span
            aria-hidden="true"
            className="h-[15px] w-[15px] shrink-0 -skew-x-12 rounded-[2px] bg-[linear-gradient(135deg,#E9CF79,#8E6B21)]"
          />
          <span
            className={`font-sans text-[22px] font-extrabold tracking-[-.01em] ${inkMark}`}
          >
            zype
          </span>
        </span>
      </Tile>
      <Tile>
        <span
          className={`font-sans text-[21px] font-extrabold tracking-[-.01em] ${inkMark}`}
        >
          <span className="text-gold-deep">m</span>Pokket
        </span>
      </Tile>
      <Tile>
        <span className="inline-flex items-baseline gap-[7px]">
          <span
            className={`font-sans text-[20px] font-extrabold tracking-[.01em] ${inkMark}`}
          >
            L&amp;T
          </span>
          <span className={`font-sans text-base font-medium ${subMark}`}>
            Finance
          </span>
        </span>
      </Tile>
      <Tile>
        <div className="text-center leading-none">
          <span
            className={`font-sans text-[20px] font-extrabold tracking-[.03em] ${inkMark}`}
          >
            BAJAJ
          </span>
          <div className="mt-1.5 font-mono text-[7.5px] tracking-[.14em] text-caption">
            HOUSING FINANCE
          </div>
        </div>
      </Tile>
      <Tile>
        <span className="inline-flex items-center gap-[7px]">
          <span
            aria-hidden="true"
            className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#E9CF79,#8E6B21)] text-[11px] font-extrabold text-[#3A2A06]"
          >
            ₹
          </span>
          <span
            className={`font-sans text-[20px] font-extrabold tracking-[-.01em] ${inkMark}`}
          >
            Rupeek
          </span>
        </span>
      </Tile>
      <Tile>
        <span
          className={`font-sans text-[17px] font-extrabold tracking-[.04em] ${inkMark}`}
        >
          BAJAJ <span className="text-gold-deep">MARKETS</span>
        </span>
      </Tile>
      <Tile>
        <span
          className={`font-display text-[21px] font-bold italic ${inkMark}`}
        >
          Muthoot <span className={`font-semibold ${subMark}`}>Finance</span>
        </span>
      </Tile>
      <Tile>
        <div className="text-center leading-none">
          <span
            className={`font-sans text-[19px] font-extrabold tracking-[-.01em] ${inkMark}`}
          >
            muthoot
          </span>
          <div className="mt-1 font-sans text-[11px] font-bold tracking-[.22em] text-caption">
            FINCORP
          </div>
        </div>
      </Tile>
      <Tile>
        <span
          className={`font-sans text-[21px] font-extrabold tracking-[-.01em] ${inkMark}`}
        >
          <span className="text-gold-deep">v</span>ivifi
        </span>
      </Tile>
      <Tile>
        <span
          className={`relative font-sans text-[20px] font-extrabold tracking-[.01em] ${inkMark}`}
        >
          Protium
          <span
            aria-hidden="true"
            className="absolute -top-0.5 -right-[7px] h-[5px] w-[5px] rounded-full bg-gold-mid"
          />
        </span>
      </Tile>
    </div>
  );
}
