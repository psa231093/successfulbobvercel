"use client";

import { motion, useInView } from "framer-motion";
import ChallengesVisual from "@/components/ChallengesVisual";
import { useRef } from "react";

const signals = [
  {
    n: "01",
    text: "The founder is still pulled into too many strategic sales calls.",
    category: "Scale",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    n: "02",
    text: "Demos are technically accurate but feel like feature tours.",
    category: "Demo",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    n: "03",
    text: "Sales, product, marketing, partners, and executives explain the company differently.",
    category: "Alignment",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    n: "04",
    text: "Buyers understand the category, but not why your company wins.",
    category: "Positioning",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    n: "05",
    text: "Partner interest exists, but partner repeatability does not.",
    category: "Channel",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    n: "06",
    text: "Events, webinars, launches, or executive conversations are coming up and the message needs to be sharper.",
    category: "Growth",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
];

function SignalCard({
  item,
  index,
  inView,
}: {
  item: (typeof signals)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.15 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl p-5 flex flex-col gap-4 overflow-hidden cursor-default"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(63,107,255,0.30)",
        boxShadow: "0 0 0 4px rgba(63,107,255,0.05), 0 6px 24px rgba(63,107,255,0.10), 0 2px 6px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(63,107,255,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Top row: icon + category */}
      <div className="relative flex items-center justify-between">
        <div style={{ color: "#3f6bff" }}>{item.icon}</div>
        <span
          className="text-[9px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border"
          style={{
            color: "#3f6bff",
            background: "rgba(63,107,255,0.08)",
            borderColor: "rgba(63,107,255,0.20)",
          }}
        >
          {item.category}
        </span>
      </div>

      {/* Number */}
      <span
        className="text-[11px] font-bold tabular-nums"
        style={{
          background: "linear-gradient(135deg, #3f6bff, #8b5cf6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {item.n}
      </span>

      {/* Signal text */}
      <p className="text-[13px] md:text-[14px] font-medium leading-[1.6] text-[#111827]">
        {item.text}
      </p>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-full rounded-full"
        style={{ background: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}
      />
    </motion.div>
  );
}

export default function WhoItsForSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#f8f9fc" }}
    >
      {/* Subtle diagonal texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(63,107,255,0.03) 0px, rgba(63,107,255,0.03) 1px, transparent 1px, transparent 40px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-3"
              style={{ color: "#7c9fff" }}
            >
              Who This Is For
            </p>
            <div
              className="w-10 h-[3px] rounded-full mb-5"
              style={{ background: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}
            />
            <h2 className="text-3xl md:text-[40px] font-bold text-[#111827] leading-[1.15] tracking-[-0.01em]">
              Built for technical companies whose product is strong, but the story is not carrying enough weight.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-end"
          >
            <p className="text-[17px] leading-[1.8]" style={{ color: "#526078" }}>
              If any of the signals below feel familiar, that&apos;s the gap Production Ready is designed to close.
            </p>
          </motion.div>
        </div>

        {/* Signal cards — 3 columns, 2 rows, both centered */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {signals.map((s, i) => (
            <SignalCard key={s.n} item={s} index={i} inView={inView} />
          ))}
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <ChallengesVisual />
        </motion.div>
      </div>
    </section>
  );
}
