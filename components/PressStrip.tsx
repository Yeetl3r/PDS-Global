/**
 * Press wordmarks card — "Part of the Finance Buddha group, featured in:"
 * Styled typographic marks in the ink-and-gold treatment.
 */
export function PressStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-[clamp(30px,4vw,58px)] gap-y-[22px] rounded-[20px] border border-line bg-white px-[clamp(20px,4vw,48px)] py-[clamp(24px,4vw,38px)] shadow-[0_14px_44px_rgba(59,42,4,.08)]">
      <span className="font-sans text-[23px] leading-none text-[#2A2417]">
        <span className="font-normal">live</span>
        <span className="font-extrabold text-gold-deep">mint</span>
      </span>
      <span className="font-display text-[22px] font-bold tracking-[.01em] text-[#2A2417]">
        Business Standard
      </span>
      <span className="inline-block text-center font-display text-[15px] leading-[1.05] font-bold tracking-[.08em] text-[#2A2417]">
        BUSINESS
        <br />
        INSIDER
      </span>
      <span className="font-display text-lg font-semibold tracking-[.04em] text-[#2A2417] [font-variant:small-caps]">
        The Economic Times
      </span>
      <span className="font-sans text-[19px] font-extrabold tracking-[.03em] text-[#2A2417]">
        YOUR<span className="text-gold-deep">STORY</span>
      </span>
    </div>
  );
}
