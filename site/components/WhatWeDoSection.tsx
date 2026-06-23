"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const capabilities = [
  {
    n: "01",
    headline: "A clearer company story",
    sub: "Narrative architecture",
    description: "One version of what you do, why it matters, and who it's for, that everyone on the team can actually repeat.",
  },
  {
    n: "02",
    headline: "A better product narrative",
    sub: "Positioning & messaging",
    description: "Product depth translated into buyer language without stripping out the technical credibility.",
  },
  {
    n: "03",
    headline: "A demo that does not turn into a feature tour",
    sub: "Demo engineering",
    description: "A structured flow that guides buyers toward value instead of wandering through capability screens.",
  },
  {
    n: "04",
    headline: "Messaging that changes by buyer role",
    sub: "Persona segmentation",
    description: "The same product told differently to the buyer, the user, the exec, and the IT team, without contradicting itself.",
  },
  {
    n: "05",
    headline: "Partner enablement people can actually use",
    sub: "Channel readiness",
    description: "Materials, talk tracks, and certification logic that lets your channel carry the story without you in the room.",
  },
  {
    n: "06",
    headline: "Executive framing that connects to urgency, risk, cost, and efficiency",
    sub: "C-suite narrative",
    description: "The board and executive version of your story, tied to outcomes, not architecture.",
  },
  {
    n: "07",
    headline: "A field story the team can carry without the founder",
    sub: "Sales scalability",
    description: "The moment your team stops needing you in every strategic call is when GTM actually starts to scale.",
  },
];

function CapabilityRow({
  item,
  index,
  inView,
}: {
  item: (typeof capabilities)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-default"
    >
      {/* Hover background */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        style={{
          background:
            "linear-gradient(105deg, rgba(63,107,255,0.055) 0%, rgba(139,92,246,0.03) 100%)",
        }}
      />

      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full pointer-events-none"
        animate={{
          opacity: hovered ? 1 : 0,
          background: hovered
            ? "linear-gradient(to bottom, #3f6bff, #8b5cf6)"
            : "transparent",
        }}
        transition={{ duration: 0.2 }}
      />

      <div className="relative flex items-start gap-6 px-6 py-5 md:py-6">
        {/* Number */}
        <div className="flex-shrink-0 w-12 pt-0.5">
          <motion.span
            className="block text-[13px] font-bold tabular-nums"
            animate={{
              background: hovered
                ? "linear-gradient(135deg, #3f6bff, #8b5cf6)"
                : "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08))",
            }}
            transition={{ duration: 0.2 }}
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            {item.n}
          </motion.span>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
            <motion.h3
              className="text-[17px] md:text-[18px] font-semibold leading-snug"
              animate={{ color: hovered ? "#ffffff" : "rgba(255,255,255,0.82)" }}
              transition={{ duration: 0.15 }}
            >
              {item.headline}
            </motion.h3>
            <span
              className="text-[10px] font-semibold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border transition-colors duration-200"
              style={{
                color: hovered ? "#3f6bff" : "rgba(255,255,255,0.25)",
                borderColor: hovered ? "rgba(63,107,255,0.4)" : "rgba(255,255,255,0.1)",
                background: hovered ? "rgba(63,107,255,0.08)" : "transparent",
              }}
            >
              {item.sub}
            </span>
          </div>

          {/* Description — reveals on hover */}
          <motion.p
            className="text-[14px] leading-[1.65] overflow-hidden"
            animate={{
              height: hovered ? "auto" : 0,
              opacity: hovered ? 1 : 0,
              marginTop: hovered ? 2 : 0,
            }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {item.description}
          </motion.p>
        </div>

        {/* Arrow indicator */}
        <motion.div
          className="flex-shrink-0 pt-1"
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
          transition={{ duration: 0.18 }}
        >
          <svg
            className="w-4 h-4 text-[#3f6bff]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </div>

      {/* Bottom divider */}
      {index < capabilities.length - 1 && (
        <div className="mx-6 h-px bg-white/[0.05]" />
      )}
    </motion.div>
  );
}

export default function WhatWeDoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 md:py-32 bg-[#061126] overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(63,107,255,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header row */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            ref={ref}
          >
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#3f6bff] mb-3">
              What We Do
            </p>
            <div className="w-10 h-[3px] rounded-full bg-gradient-to-r from-[#3f6bff] to-[#8b5cf6] mb-5" />
            <h2 className="text-3xl md:text-[42px] font-bold text-white leading-[1.15] tracking-[-0.01em]">
              Successfulbob helps technical companies close the translation gap.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-end"
          >
            <p className="text-white/55 text-base md:text-[17px] leading-[1.8] mb-4">
              I help technical startups translate what they built into the business problems, workflows, buyer pains, and market moments it actually addresses. Heavy technical capability is valuable only when the right people can understand it, trust it, and repeat it.
            </p>
            <p className="text-white/40 text-[14px] leading-relaxed">
              Hover any capability below to see what it means in practice.
            </p>
          </motion.div>
        </div>

        {/* Capabilities list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.018)",
          }}
        >
          {capabilities.map((item, i) => (
            <CapabilityRow key={i} item={item} index={i} inView={inView} />
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10 text-white/35 text-[14px] leading-relaxed max-w-xl"
        >
          The goal is not to create dependency. The goal is to help your team understand the story well enough to use it, improve it, and keep carrying it forward.
        </motion.p>
      </div>
    </section>
  );
}
