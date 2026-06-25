"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import pathsAnimation from "@/public/paths-animation.json";

/* ── Production Ready — flagship dark card ───────────────────── */
function FlagshipCard({ inView }: { inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  const outcomes = [
    "A company story the whole team can repeat",
    "A demo that guides buyers toward value",
    "Messaging that shifts by buyer role",
    "Partner enablement that actually gets used",
    "Executive framing tied to outcomes, not architecture",
    "A field story that scales without the founder",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        background: "#061126",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: hovered
          ? "0 24px 64px rgba(63,107,255,0.18), 0 0 0 1px rgba(63,107,255,0.2)"
          : "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)",
        transition: "box-shadow 0.35s ease",
      }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Glow */}
      <motion.div
        className="absolute -top-20 -left-20 w-[380px] h-[380px] rounded-full pointer-events-none"
        animate={{ opacity: hovered ? 0.18 : 0.1 }}
        transition={{ duration: 0.4 }}
        style={{
          background: "radial-gradient(circle, #3f6bff 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-[280px] h-[280px] rounded-full pointer-events-none"
        animate={{ opacity: hovered ? 0.14 : 0.07 }}
        transition={{ duration: 0.4 }}
        style={{
          background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
        }}
      />

      {/* Top gradient bar */}
      <div
        className="relative h-[3px] w-full flex-shrink-0"
        style={{ background: "linear-gradient(90deg, #3f6bff 0%, #8b5cf6 100%)" }}
      />

      <div className="relative flex flex-col flex-1 p-8 md:p-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] uppercase px-2.5 py-1 rounded-full mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(63,107,255,0.2), rgba(139,92,246,0.15))",
                border: "1px solid rgba(63,107,255,0.3)",
                color: "#7b9fff",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3f6bff] animate-pulse" />
              Flagship Offering
            </span>
            <h3 className="text-[28px] md:text-[32px] font-bold text-white leading-tight tracking-[-0.01em]">
              Production Ready
            </h3>
          </div>
          {/* Lottie checklist animation */}
          <div className="flex-shrink-0 -mt-4 -mr-4 opacity-90">
            <Lottie
              animationData={pathsAnimation}
              loop
              autoplay
              style={{ width: 160, height: 160 }}
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-white/55 text-[15px] leading-[1.8] mb-8">
          For technical companies that need the GTM system built. Production Ready creates the story, messaging architecture, demo flow, partner narrative, executive framing, and rollout structure your team can use.
        </p>

        {/* Outcomes */}
        <div className="flex-1 mb-8">
          <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-4">
            What gets built
          </p>
          <div className="space-y-2.5">
            {outcomes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3"
              >
                <div
                  className="mt-[3px] w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(63,107,255,0.15)", border: "1px solid rgba(63,107,255,0.3)" }}
                >
                  <svg className="w-2 h-2 text-[#3f6bff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/60 text-[13px] leading-[1.6]">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/production-ready"
          className="relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-[14px] font-semibold text-white overflow-hidden group"
          style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}
        >
          <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
          <span className="relative">Make GTM Production Ready</span>
          <svg className="relative w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Advisory Work card ───────────────────────────────────────── */
function AdvisoryCard({ inView }: { inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  const uses = [
    "Messaging review or narrative restructure",
    "Demo flow critique and rebuild",
    "Partner enablement strategy",
    "Executive story development",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden flex flex-col bg-white"
      style={{
        border: "1px solid #e8eaf0",
        boxShadow: hovered
          ? "0 16px 48px rgba(139,92,246,0.12), 0 0 0 1px rgba(139,92,246,0.2)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Top accent bar */}
      <motion.div
        className="h-[3px] w-full flex-shrink-0"
        animate={{
          background: hovered
            ? "linear-gradient(90deg, #8b5cf6, #3f6bff)"
            : "linear-gradient(90deg, #e8eaf0, #e8eaf0)",
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative flex flex-col flex-1 p-7 md:p-8">
        <div className="flex items-start justify-between mb-5">
          <div>
            <span className="inline-block text-[10px] font-bold tracking-[0.14em] uppercase text-[#8b5cf6] mb-3">
              Targeted Help
            </span>
            <h3 className="text-[22px] font-bold text-[#111827] leading-tight tracking-[-0.01em]">
              Advisory Work
            </h3>
          </div>
        </div>

        <p className="text-[#526078] text-[14px] leading-[1.75] mb-6">
          For technical companies that need senior guidance without a full buildout. Advisory is for pressure-testing messaging, demos, launches, partner strategy, executive narrative, and field readiness decisions.
        </p>

        <div className="flex-1 mb-7">
          <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#526078]/50 mb-3">
            Common use cases
          </p>
          <div className="space-y-2">
            {uses.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div
                  className="w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-200"
                  style={{ background: hovered ? "#8b5cf6" : "#d1d5db" }}
                />
                <span className="text-[#526078] text-[13px] leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/advisory-work"
          className="inline-flex items-center gap-2 text-[13px] font-semibold transition-all duration-200 group"
          style={{ color: hovered ? "#8b5cf6" : "#3f6bff" }}
        >
          Explore Advisory Work
          <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Fit Call card ────────────────────────────────────────────── */
function FitCallCard({ inView }: { inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        border: hovered ? "1.5px dashed rgba(63,107,255,0.5)" : "1.5px dashed rgba(63,107,255,0.2)",
        background: hovered ? "rgba(63,107,255,0.025)" : "rgba(63,107,255,0.01)",
        boxShadow: hovered ? "0 8px 32px rgba(63,107,255,0.08)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div className="relative flex flex-col flex-1 p-7 md:p-8">
        <div className="flex items-start justify-between mb-5">
          <div>
            <span className="inline-block text-[10px] font-bold tracking-[0.14em] uppercase text-[#3f6bff]/60 mb-3">
              Start Here
            </span>
            <h3 className="text-[22px] font-bold text-[#111827] leading-tight tracking-[-0.01em]">
              Not sure yet?
            </h3>
          </div>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
            style={{
              background: hovered ? "rgba(63,107,255,0.12)" : "rgba(63,107,255,0.06)",
              border: "1px solid rgba(63,107,255,0.2)",
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              style={{ color: "#3f6bff" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <p className="text-[#526078] text-[14px] leading-[1.75] mb-6 flex-1">
          For teams that know something is not connecting, but are not sure what help they need. A short fit call usually makes the right next step obvious.
        </p>

        <a
          href="#fit-call"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#3f6bff] transition-all duration-200 group"
        >
          Schedule a 30-Minute Fit Call
          <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────── */
export default function WaysToWorkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Subtle background detail */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(63,107,255,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(139,92,246,0.04) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="max-w-2xl mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#3f6bff] mb-3">
              Ways to Work Together
            </p>
            <div className="w-10 h-[3px] rounded-full bg-gradient-to-r from-[#3f6bff] to-[#8b5cf6] mb-5" />
            <h2 className="text-3xl md:text-[42px] font-bold text-[#111827] leading-[1.15] tracking-[-0.01em] mb-4">
              A few paths, depending<br className="hidden md:block" /> on where you are.
            </h2>
            <p className="text-[#526078] text-base md:text-[17px] leading-[1.75]">
              Whether you need the full system or a sharper second opinion, there's a right entry point.
            </p>
          </motion.div>
        </div>

        {/* Layout: large left card + two stacked right cards */}
        <div className="grid md:grid-cols-[1fr_420px] gap-5">
          {/* Left: flagship */}
          <FlagshipCard inView={inView} />

          {/* Right: two stacked */}
          <div className="flex flex-col gap-5">
            <AdvisoryCard inView={inView} />
            <FitCallCard inView={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}
