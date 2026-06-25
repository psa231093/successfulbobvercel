"use client";

const leftItems = [
  { label: "Founder context" },
  { label: "Engineering depth" },
  { label: "Features" },
  { label: "Technical reality" },
];

const rightItems = [
  { label: "Buyers" },
  { label: "Sales" },
  { label: "Partners" },
  { label: "Executives" },
];

export default function TranslationGapVisual() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{ background: "#0b1433", border: "1px solid rgba(63,107,255,0.2)" }}
    >
      {/* Header */}
      <div className="text-center px-8 pt-8 pb-6">
        <p className="text-white text-xl md:text-2xl font-bold leading-snug">
          The product is strong.
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #3f6bff, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The story is not carrying.
          </span>
        </p>
        <p className="text-white/40 text-xs mt-2 tracking-wide">
          Technical depth does not automatically become buyer understanding.
        </p>
      </div>

      {/* Diagram */}
      <div className="flex items-stretch mx-6 mb-8 rounded-xl overflow-hidden" style={{ minHeight: 200 }}>

        {/* Left — Product truth */}
        <div className="flex-1 px-5 py-5" style={{ background: "rgba(255,255,255,0.04)", borderRight: "none" }}>
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/30 mb-4">Product<br/>truth</p>
          <ul className="space-y-3">
            {leftItems.map(({ label }) => (
              <li key={label} className="flex items-center justify-between gap-2">
                <span className="text-white/70 text-[12px] font-medium">{label}</span>
                {/* Arrow tail pointing right */}
                <svg width="28" height="10" viewBox="0 0 28 10" fill="none" className="flex-shrink-0 opacity-40">
                  <line x1="0" y1="5" x2="20" y2="5" stroke="#7c9fff" strokeWidth="1.5" strokeDasharray="3 2" />
                  <path d="M18 2L24 5L18 8" stroke="#7c9fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </li>
            ))}
          </ul>
        </div>

        {/* Center — Gap */}
        <div
          className="flex flex-col items-center justify-center relative"
          style={{
            width: 96,
            flexShrink: 0,
            background: "linear-gradient(180deg, rgba(139,92,246,0.06) 0%, rgba(63,107,255,0.06) 100%)",
            borderLeft: "1px dashed rgba(99,102,241,0.3)",
            borderRight: "1px dashed rgba(99,102,241,0.3)",
          }}
        >
          {/* Broken X symbol */}
          <div className="flex flex-col items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" stroke="rgba(239,68,68,0.4)" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M10 10L22 22M22 10L10 22" stroke="rgba(239,68,68,0.7)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div
              className="rounded-full px-2.5 py-1 text-center"
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}
            >
              <p className="text-[9px] font-bold tracking-widest uppercase text-indigo-300 whitespace-nowrap">
                Translation
              </p>
              <p className="text-[9px] font-bold tracking-widest uppercase text-indigo-300">
                gap
              </p>
            </div>
          </div>
        </div>

        {/* Right — Market understanding */}
        <div
          className="flex-1 px-5 py-5"
          style={{ background: "linear-gradient(135deg, rgba(63,107,255,0.12) 0%, rgba(139,92,246,0.12) 100%)" }}
        >
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/30 mb-4 text-right">
            Market understanding
          </p>
          <ul className="space-y-3">
            {rightItems.map(({ label }) => (
              <li key={label} className="flex items-center justify-end gap-2">
                {/* Arrow tail pointing left (unreached) */}
                <svg width="28" height="10" viewBox="0 0 28 10" fill="none" className="flex-shrink-0 opacity-30">
                  <line x1="28" y1="5" x2="8" y2="5" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="3 2" />
                  <path d="M10 2L4 5L10 8" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <span className="text-white/50 text-[12px] font-medium">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer message */}
      <div
        className="mx-6 mb-6 px-5 py-3.5 rounded-xl flex items-center gap-3"
        style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.15)" }}
      >
        <svg className="flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2L14 13H2L8 2Z" stroke="rgba(248,113,113,0.8)" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
          <path d="M8 6V9" stroke="rgba(248,113,113,0.8)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="11" r="0.75" fill="rgba(248,113,113,0.8)" />
        </svg>
        <p className="text-white/50 text-[11px] leading-snug">
          The gap isn&apos;t a product problem.{" "}
          <span className="text-white/75 font-semibold">It&apos;s a story problem.</span>{" "}
          Fix the translation, and the market can finally see what you built.
        </p>
      </div>
    </div>
  );
}
