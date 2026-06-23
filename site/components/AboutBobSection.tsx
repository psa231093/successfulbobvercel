"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const domains = [
  { label: "Field CTO", color: "#3f6bff" },
  { label: "Solutions Engineering", color: "#8b5cf6" },
  { label: "Product Marketing", color: "#3f6bff" },
  { label: "Partner Enablement", color: "#8b5cf6" },
  { label: "Technical Sales", color: "#3f6bff" },
  { label: "Executive Storytelling", color: "#8b5cf6" },
  { label: "Customer Strategy", color: "#3f6bff" },
];

export default function AboutBobSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Subtle background detail */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 60%, rgba(63,107,255,0.03) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">

          {/* ── Photo column ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative">
              {/* Decorative glow behind photo */}
              <div
                className="absolute -inset-4 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 40% 50%, rgba(63,107,255,0.10) 0%, transparent 70%)",
                }}
              />

              {/* Photo frame */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.35 }}
                className="relative rounded-2xl overflow-hidden"
                style={{
                  width: 380,
                  height: 500,
                  boxShadow:
                    "0 0 0 1px rgba(63,107,255,0.15), 0 0 0 4px rgba(63,107,255,0.05), 0 24px 60px rgba(0,0,0,0.12)",
                }}
              >
                <Image
                  src="/bob-headshot-portrait.webp"
                  alt="Bob Hart, Successfulbob LLC"
                  fill
                  sizes="380px"
                  className="object-cover object-top"
                  priority
                />

                {/* Bottom gradient overlay */}
                <div
                  className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(6,17,38,0.75) 0%, transparent 100%)",
                  }}
                />

                {/* Credential badge */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute bottom-5 left-4 right-4"
                >
                  <div
                    className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl backdrop-blur-md"
                    style={{
                      background: "rgba(6,17,38,0.70)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}
                    />
                    <span className="text-white text-[12px] font-semibold tracking-tight">
                      Field CTO → GTM Consultant
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Small accent card — floats bottom-right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={inView ? { opacity: 1, scale: 1, y: [0, -6, 0] } : {}}
                transition={{
                  opacity: { duration: 0.45, delay: 0.65, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: 0.45, delay: 0.65, ease: [0.22, 1, 0.36, 1] },
                  y: { duration: 3.5, delay: 1, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute -bottom-6 -right-6 rounded-xl px-4 py-3 hidden md:block"
                style={{
                  background: "#ffffff",
                  border: "1px solid #e8eaf0",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              >
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#526078]/50 mb-1">
                  Background spans
                </p>
                <p className="text-[13px] font-bold text-[#111827]">7 GTM disciplines</p>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Text column ──────────────────────────────────── */}
          <div className="flex flex-col">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#3f6bff] mb-3">
                About Bob
              </p>
              <div className="w-10 h-[3px] rounded-full bg-gradient-to-r from-[#3f6bff] to-[#8b5cf6] mb-6" />
            </motion.div>

            {/* Name + headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7"
            >
              <h2 className="text-4xl md:text-[44px] font-bold text-[#111827] leading-[1.1] tracking-[-0.02em] mb-3">
                Bob Hart
              </h2>
              <p className="text-[18px] text-[#526078] font-medium leading-snug">
                I've been in the rooms where this breaks.
              </p>
            </motion.div>

            {/* Body copy */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 text-[#526078] text-[15px] md:text-[16px] leading-[1.8] mb-7"
            >
              <p>
                I've worked across Field CTO, solutions engineering, product marketing, partner enablement, executive storytelling, technical sales, and customer-facing strategy.
              </p>
              <p>
                That matters because technical GTM problems rarely live in only one department. The product team may be explaining capabilities. Sales may be trying to create urgency. Partners may be repeating the wrong message.
              </p>
              <p>
                My advantage isn't that I'm the deepest engineer in every room. It's that I can understand technical products quickly, see where the audience is getting lost, and help turn that into a story real people can use.
              </p>
            </motion.div>

            {/* Domain tags */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {domains.map((d, i) => (
                <motion.span
                  key={d.label}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium"
                  style={{
                    background: `${d.color}10`,
                    border: `1px solid ${d.color}22`,
                    color: d.color,
                  }}
                >
                  <span className="w-1 h-1 rounded-full" style={{ background: d.color }} />
                  {d.label}
                </motion.span>
              ))}
            </motion.div>

            {/* Pull quote */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-5 py-1"
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                style={{ background: "linear-gradient(to bottom, #8b5cf6, #3f6bff)" }}
              />
              <p className="text-[15px] md:text-[16px] font-semibold text-[#111827] italic leading-relaxed">
                The goal is simple: help the right buyers understand why your solution matters before their attention runs out.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
