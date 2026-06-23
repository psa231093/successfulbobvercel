"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { AnimateIn, Stagger, StaggerItem } from "@/components/AnimateIn";
import { useCalendarModal } from "@/components/CalendarModal";

/* --- Shared primitives ----------------------------------------- */

function CalendarIcon() {
  return (
    <svg className="fit-call-icon w-[17px] h-[17px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
      <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function GradientButton({ href, children, external, fitCall, onClick }: { href?: string; children: React.ReactNode; external?: boolean; fitCall?: boolean; onClick?: () => void }) {
  const cls = "relative flex items-center justify-center w-full px-7 py-3.5 rounded-lg text-[15px] font-semibold text-white overflow-hidden group";
  const inner = (
    <>
      <span className="absolute inset-0 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, #3f6bff 0%, #8b5cf6 100%)" }} />
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, #5580ff 0%, #a070ff 100%)" }} />
      <span className="relative z-10 flex items-center gap-2.5">{fitCall && <CalendarIcon />}{children}</span>
    </>
  );
  return (
    <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto" style={{ borderRadius: 8 }}>
      {onClick
        ? <button onClick={onClick} className={cls}>{inner}</button>
        : external
          ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
          : <Link href={href!} className={cls}>{inner}</Link>}
    </motion.div>
  );
}

function GhostButton({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls = "flex items-center justify-center w-full px-7 py-3.5 rounded-lg text-[15px] font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.06] transition-all duration-200";
  return (
    <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto" style={{ borderRadius: 8 }}>
      {external
        ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
        : <Link href={href} className={cls}>{children}</Link>}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#3f6bff] mb-3">{children}</p>;
}

function AccentBar() {
  return <div className="w-10 h-[3px] rounded-full bg-gradient-to-r from-[#3f6bff] to-[#8b5cf6] mb-5" />;
}

/* --- Contrast Card (What I Tend to Notice) -------------------- */

function ContrastCard({ claim, reality, delay }: { claim: string; reality: string; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-default"
      style={{
        border: hovered ? "1px solid rgba(63,107,255,0.3)" : "1px solid #e5e7eb",
        background: hovered ? "rgba(63,107,255,0.02)" : "#ffffff",
        transition: "border-color 0.25s, background 0.25s",
        boxShadow: hovered ? "0 8px 24px rgba(63,107,255,0.08)" : "none",
      }}
    >
      <div className="p-6">
        {/* Claim side */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#9ca3af] mb-2">The observation</p>
          <p className="text-[15px] font-semibold text-[#111827] leading-snug">{claim}</p>
        </div>

        {/* Divider with arrow */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-[#e5e7eb]" />
          <motion.div
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-[#3f6bff] flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.div>
          <div className="flex-1 h-px bg-[#e5e7eb]" />
        </div>

        {/* Reality side */}
        <div>
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#3f6bff] mb-2">What it doesn't mean</p>
          <AnimatePresence>
            <motion.p
              key={hovered ? "hovered" : "idle"}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: hovered ? 1 : 0.55 }}
              transition={{ duration: 0.2 }}
              className="text-[15px] text-[#526078] leading-snug"
            >
              {reality}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Gradient bar at bottom on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ transformOrigin: "left", background: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

/* --- Room Card (The Rooms I've Been In) ----------------------- */

function RoomItem({ icon, text, delay }: { icon: React.ReactNode; text: string; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex items-start gap-4 group"
    >
      <motion.div
        animate={{ scale: hovered ? 1.08 : 1, y: hovered ? -1 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
        style={{
          background: hovered
            ? "linear-gradient(135deg, rgba(63,107,255,0.15) 0%, rgba(139,92,246,0.15) 100%)"
            : "linear-gradient(135deg, rgba(63,107,255,0.08) 0%, rgba(139,92,246,0.08) 100%)",
          border: `1px solid ${hovered ? "rgba(63,107,255,0.3)" : "rgba(63,107,255,0.12)"}`,
          transition: "background 0.2s, border-color 0.2s",
        }}
      >
        {icon}
      </motion.div>
      <p className="text-[#526078] text-[15px] md:text-[16px] leading-[1.75] pt-1.5">{text}</p>
    </motion.div>
  );
}

/* --- About FAQ ------------------------------------------------- */

const aboutFaqs = [
  {
    q: "Who is Bob Hart?",
    a: "Bob Hart, also known as Robert J. Hart, is the founder of Successfulbob LLC. He is a technical GTM advisor with experience across Field CTO work, solutions engineering, product marketing, partner enablement, executive storytelling, and enterprise technology. His work focuses on helping technical companies explain, sell, demo, and scale complex products more clearly.",
  },
  {
    q: "What does Successfulbob LLC do?",
    a: "Successfulbob LLC helps technical companies translate product depth into market clarity. That can include go to market strategy, product messaging, demo review, partner enablement, executive narrative, advisory work, and the Production Ready framework. The goal is to help the company explain its value in a way buyers, sales teams, partners, and executives can understand and repeat.",
  },
  {
    q: "Why hire Bob instead of a traditional GTM agency?",
    a: "A traditional GTM agency may bring a team of specialists. That can be useful, but complex technical GTM problems often break in the handoffs between product, sales, partners, marketing, executives, and the field. Bob has personally worked across those areas, which helps him see where the story is getting lost and how to make it more useful for the people who need to carry it.",
  },
  {
    q: "Is Bob a technical advisor or a marketing advisor?",
    a: "Bob sits between those worlds. He is technical enough to understand complex products and practical enough to connect them to buyer pain, business value, sales conversations, partner readiness, and executive priorities. Successfulbob is most useful when a company needs technical depth translated into a story the market can understand and trust.",
  },
  {
    q: "What kinds of companies does Bob work with?",
    a: "Bob usually works with technical startups and B2B technology companies whose products are stronger than their market story. That often includes companies working through founder-led sales, technical product marketing, partner enablement, demo clarity, executive narrative, or go to market strategy for startups.",
  },
];

function AboutFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-24 md:py-32 bg-[#f5f7fb]">
      <div className="max-w-3xl mx-auto px-6">
        <AnimateIn>
          <SectionLabel>About Bob and Successfulbob</SectionLabel>
          <AccentBar />
          <h2 className="text-3xl md:text-[40px] font-bold text-[#111827] mb-14 leading-[1.15]">
            Questions people usually ask
          </h2>
        </AnimateIn>

        <Stagger stagger={0.07}>
          {aboutFaqs.map((faq, i) => (
            <StaggerItem key={i}>
              <div className="border-b border-[#e5e7eb] last:border-b-0">
                <button
                  className="flex items-start justify-between w-full text-left gap-4 py-6 group"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${open === i ? "text-[#3f6bff]" : "text-[#111827] group-hover:text-[#3f6bff]"}`}>
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex-shrink-0 mt-0.5"
                  >
                    <svg className={`w-5 h-5 transition-colors duration-200 ${open === i ? "text-[#3f6bff]" : "text-[#9ca3af]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[#526078] text-[15px] leading-[1.8]">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* --- Page ------------------------------------------------------ */

export default function AboutPage() {
  const bgRef = useRef(null);
  const bgInView = useInView(bgRef, { once: true, margin: "-80px" });
  const { openModal } = useCalendarModal();

  return (
    <>
      {/* -- HERO — photo-led split (distinct from homepage) ---- */}
      <section className="relative bg-[#061126] text-white pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Distinct background: diagonal dot-grid band + corner glow, no particle field */}
        <div className="absolute inset-0 opacity-[0.5] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "linear-gradient(115deg, black 0%, transparent 55%)",
            WebkitMaskImage: "linear-gradient(115deg, black 0%, transparent 55%)",
          }} />
        <div className="absolute -top-20 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.14) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.10) 0%, transparent 70%)" }} />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-12 md:gap-16 items-center">

            {/* -- Text column ----------------------------------- */}
            <div className="order-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-7"
                style={{ background: "rgba(139,92,246,0.10)", border: "1px solid rgba(139,92,246,0.22)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }} />
                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#b899ff]">
                  Founder · Successfulbob LLC
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[34px] md:text-[52px] font-bold leading-[1.08] tracking-[-0.02em] mb-6"
              >
                Hi, I'm Bob Hart.<br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #3f6bff 0%, #8b5cf6 100%)" }}>
                  I translate technical value
                </span>{" "}
                into stories the market can carry.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="text-[16px] md:text-[18px] text-white/65 max-w-xl md:max-w-none mx-auto leading-[1.7] mb-9"
              >
                I've spent my career in the rooms where technical products either become easier for the market to understand, or stay trapped inside the heads of the people who built them. Helping companies cross that gap is the whole job.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
              >
                <GradientButton onClick={openModal} fitCall>
                  Schedule a 30-Minute Fit Call
                </GradientButton>
                <GhostButton href="mailto:bob@successfulbob.com" external>
                  Email Bob
                </GhostButton>
              </motion.div>
            </div>

            {/* -- Photo column ---------------------------------- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 flex justify-center md:justify-end"
            >
              <div className="relative">
                {/* Glow behind photo */}
                <div className="absolute -inset-6 rounded-[2rem] pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(63,107,255,0.18) 0%, transparent 70%)" }} />

                {/* Photo frame */}
                <div className="relative rounded-3xl overflow-hidden w-[280px] h-[360px] md:w-[340px] md:h-[440px]"
                  style={{ boxShadow: "0 0 0 1px rgba(63,107,255,0.25), 0 0 0 5px rgba(63,107,255,0.07), 0 30px 70px rgba(0,0,0,0.45)" }}>
                  <Image
                    src="/bob-headshot-portrait.webp"
                    alt="Bob Hart, founder of Successfulbob LLC"
                    fill
                    sizes="(max-width: 768px) 280px, 340px"
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 h-36 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(6,17,38,0.92) 0%, transparent 100%)" }} />

                  {/* Name plate over photo */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-white text-[19px] font-bold tracking-tight leading-none mb-1.5">Robert "Bob" Hart</p>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg backdrop-blur-md"
                      style={{ background: "rgba(6,17,38,0.6)", border: "1px solid rgba(255,255,255,0.14)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }} />
                      <span className="text-white/85 text-[11px] font-semibold tracking-tight">Field CTO → GTM Advisor</span>
                    </div>
                  </div>
                </div>

                {/* Floating "20 years" accent card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.7 },
                    scale: { duration: 0.5, delay: 0.7 },
                    y: { duration: 3.8, delay: 1.2, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute -top-5 -left-5 md:-left-10 rounded-2xl px-4 py-3 backdrop-blur-md hidden sm:block"
                  style={{ background: "rgba(11,23,52,0.85)", border: "1px solid rgba(63,107,255,0.25)", boxShadow: "0 12px 30px rgba(0,0,0,0.35)" }}
                >
                  <p className="text-[22px] font-bold bg-clip-text text-transparent leading-none"
                    style={{ backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}>20+ years</p>
                  <p className="text-[11px] text-white/50 mt-1">enterprise tech</p>
                </motion.div>

                {/* Floating "Harvard / MIT" accent card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1, y: [0, 7, 0] }}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.85 },
                    scale: { duration: 0.5, delay: 0.85 },
                    y: { duration: 4.2, delay: 1.4, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute -bottom-5 -right-4 md:-right-9 rounded-2xl px-4 py-3 backdrop-blur-md hidden sm:block"
                  style={{ background: "rgba(11,23,52,0.85)", border: "1px solid rgba(139,92,246,0.25)", boxShadow: "0 12px 30px rgba(0,0,0,0.35)" }}
                >
                  <p className="text-[13px] font-bold text-white leading-none">Harvard · MIT</p>
                  <p className="text-[11px] text-white/50 mt-1">graduate study</p>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #061126)" }} />
      </section>

      {/* -- WHY THIS WORK MATTERS ------------------------------- */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 text-[160px] font-bold leading-none pointer-events-none select-none"
          style={{ color: "#f5f7fb", lineHeight: 0.9 }}>
          01
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[3fr_2fr] gap-14 md:gap-16 items-center">

            {/* -- Text column -- */}
            <div>
              <AnimateIn>
                <SectionLabel>Why this work matters to me</SectionLabel>
                <AccentBar />
                <h2 className="text-3xl md:text-[42px] font-bold text-[#111827] mb-10 leading-[1.15] tracking-[-0.01em]">
                  Great technology deserves a better chance to be understood.
                </h2>
              </AnimateIn>

              <Stagger className="space-y-5" stagger={0.1} delay={0.1}>
                {[
                  "I have always been drawn to companies building things that are hard to explain because they are actually doing something different. That is exciting. It is also dangerous.",
                  "When a product is truly technical, innovative, or early to a market shift, the company often understands the problem long before the market does. The founder sees it. The engineers see it. The earliest customers may see it.",
                  "But the next buyer may not. They may not know the problem has a name. They may not know a solution exists. They may not know why this product is different from the thing they already bought, ignored, or misunderstood.",
                  "That is where a lot of good technology gets stuck.",
                ].map((p, i) => (
                  <StaggerItem key={i}>
                    <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">{p}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {/* -- Illustration column -- */}
            <AnimateIn delay={0.2} className="flex justify-center">
              <Image src="/translating.png" alt="Translating technical value" width={480} height={400} className="w-full h-auto rounded-2xl" />
            </AnimateIn>

          </div>

          {/* -- Pull quote — full width below both columns -- */}
          <AnimateIn delay={0.4} className="mt-10 max-w-3xl">
            <div className="relative pl-6 py-4">
              <div className="absolute left-0 top-0 w-[3px] h-full rounded-full" style={{ background: "linear-gradient(to bottom, #3f6bff, #8b5cf6)" }} />
              <div className="absolute inset-0 rounded-r-lg" style={{ background: "linear-gradient(to right, rgba(63,107,255,0.04), transparent)" }} />
              <p className="relative text-[17px] font-semibold text-[#111827] italic leading-relaxed">
                I started Successfulbob because I care about helping technical companies cross that gap. Not by watering the product down. Not by covering it in generic marketing language.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- THE ROOMS I'VE BEEN IN ------------------------------ */}
      <section className="relative py-24 md:py-32 bg-[#f5f7fb] overflow-hidden">
        <div className="absolute top-0 right-0 text-[160px] font-bold leading-none pointer-events-none select-none"
          style={{ color: "#eef0f5", lineHeight: 0.9 }}>
          02
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn className="max-w-3xl mb-16">
            <SectionLabel>The rooms I've been in</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[42px] font-bold text-[#111827] mb-5 leading-[1.15] tracking-[-0.01em]">
              I have seen the story from a lot of seats.
            </h2>
            <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">
              A lot of firms split this work across different specialists. That can work, but it can also create handoffs where the real meaning gets lost. My advantage is that I have personally worked across many of those handoffs.
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: <svg className="w-5 h-5 text-[#3f6bff]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                text: "Close to the product team, trying to explain what the technology actually does.",
              },
              {
                icon: <svg className="w-5 h-5 text-[#8b5cf6]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                text: "In pre-sales, turning complex products into demos buyers could believe.",
              },
              {
                icon: <svg className="w-5 h-5 text-[#3f6bff]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                text: "With partners that needed a clearer story before they could create momentum.",
              },
              {
                icon: <svg className="w-5 h-5 text-[#8b5cf6]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
                text: "Presenting technical thought leadership to executives, analysts, customers, and field teams.",
              },
              {
                icon: <svg className="w-5 h-5 text-[#3f6bff]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
                text: "In conversations with CEOs, investors, strategic partners, and buyers who needed the market story to be cleaner, sharper, and more useful.",
              },
              {
                icon: <svg className="w-5 h-5 text-[#8b5cf6]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                text: "In support and post-sale conversations where missed expectations became very real.",
              },
            ].map((item, i) => (
              <RoomItem key={i} icon={item.icon} text={item.text} delay={i * 0.07} />
            ))}
          </div>
        </div>
      </section>

      {/* -- PROFESSIONAL BACKGROUND ----------------------------- */}
      <section ref={bgRef} className="relative py-24 md:py-32 bg-[#061126] text-white overflow-hidden">
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
        <div className="absolute left-0 bottom-0 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.08) 0%, transparent 70%)" }} />
        <div className="absolute top-0 right-0 text-[160px] font-bold leading-none pointer-events-none select-none"
          style={{ color: "rgba(255,255,255,0.02)", lineHeight: 0.9 }}>
          03
        </div>

        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <AnimateIn>
            <SectionLabel>Professional background</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[42px] font-bold mb-8 leading-[1.15] tracking-[-0.01em]">
              Technical enough to understand the product. Business-minded enough to translate it.
            </h2>
            <div className="space-y-5 text-white/60 text-base md:text-[17px] leading-[1.8]">
              <p>
                My background includes roughly 20 years in enterprise technology across roles including Field CTO, VP of Channel, Principal Solution Engineer, Product Marketing Manager, and technical GTM advisor.
              </p>
              <p>
                I've worked across infrastructure, cloud, IT operations, data, cybersecurity, storage, dependency mapping, application modernization, partner ecosystems, and complex B2B software.
              </p>
              <p>
                I also earned a master's from Harvard, where I studied Information Management Systems, and an executive certificate in innovation and strategy from MIT.
              </p>
            </div>
          </AnimateIn>

          {/* Right: credential cards */}
          <AnimateIn delay={0.2}>
            {/* Roles */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-7 mb-5"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.07)" }}>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/35 mb-5">Roles held</p>
              <div className="flex flex-wrap gap-2">
                {["Field CTO", "VP of Channel", "Principal Solution Engineer", "Product Marketing Manager", "Technical GTM Advisor", "Solutions Engineering Leader", "Executive Storyteller"].map((role, i) => (
                  <motion.span
                    key={role}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={bgInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.35, delay: 0.3 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium"
                    style={{ background: "rgba(63,107,255,0.12)", border: "1px solid rgba(63,107,255,0.22)", color: "#7a9fff" }}
                  >
                    {role}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-7 mb-5"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.07)" }}>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/35 mb-5">Education</p>
              <div className="space-y-4">
                {[
                  { school: "Harvard University", credential: "Master's: Information Management Systems" },
                  { school: "MIT", credential: "Executive Certificate: Innovation & Strategy" },
                ].map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={bgInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }} />
                    <div>
                      <p className="text-[13px] font-semibold text-white/80">{edu.school}</p>
                      <p className="text-[12px] text-white/45">{edu.credential}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Acquisitions */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-7"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.07)" }}>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/35 mb-5">M&A experience</p>
              <div className="flex flex-wrap gap-2">
                {["EMC/Dell", "NTP Software", "Panzura", "Device42/Freshworks"].map((co, i) => (
                  <motion.span
                    key={co}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={bgInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.35, delay: 0.65 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-[12px] font-medium"
                    style={{ background: "rgba(139,92,246,0.10)", border: "1px solid rgba(139,92,246,0.2)", color: "#b899ff" }}
                  >
                    {co}
                  </motion.span>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- WHAT I TEND TO NOTICE ------------------------------- */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 text-[160px] font-bold leading-none pointer-events-none select-none"
          style={{ color: "#f5f7fb", lineHeight: 0.9 }}>
          04
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn className="max-w-3xl mb-6">
            <SectionLabel>What I tend to notice</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[42px] font-bold text-[#111827] mb-5 leading-[1.15] tracking-[-0.01em]">
              I am unrelenting about one question: why should this person care?
            </h2>
            <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">
              Hover each card. The gap between what's true and what it means for the buyer is exactly where most technical GTM breaks.
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-4 mt-12">
            <ContrastCard
              claim="A feature may be impressive."
              reality="That does not mean the buyer cares yet."
              delay={0}
            />
            <ContrastCard
              claim="A demo may be accurate."
              reality="That does not mean it is persuasive."
              delay={0.08}
            />
            <ContrastCard
              claim="A deck may be beautiful."
              reality="That does not mean the story is clear."
              delay={0.16}
            />
          </div>

          <AnimateIn delay={0.3} className="mt-14 max-w-3xl">
            <div className="relative pl-6 py-4">
              <div className="absolute left-0 top-0 w-[3px] h-full rounded-full" style={{ background: "linear-gradient(to bottom, #3f6bff, #8b5cf6)" }} />
              <div className="absolute inset-0 rounded-r-lg" style={{ background: "linear-gradient(to right, rgba(63,107,255,0.04), transparent)" }} />
              <p className="relative text-[17px] font-semibold text-[#111827] italic leading-relaxed">
                The audience's attention starts running down the second the conversation begins. My job is to help companies spend it on the parts that matter.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- HOW I WORK --------------------------------------------- */}
      <section className="relative py-24 md:py-32 bg-[#f5f7fb] overflow-hidden">
        <div className="absolute top-0 right-0 text-[160px] font-bold leading-none pointer-events-none select-none"
          style={{ color: "#eef0f5", lineHeight: 0.9 }}>
          05
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn className="max-w-3xl mb-16">
            <SectionLabel>How I work</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[42px] font-bold text-[#111827] mb-5 leading-[1.15] tracking-[-0.01em]">
              Direct, honest, practical, and on your side.
            </h2>
            <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">
              I try to treat clients the way I like to be treated: transparently, honestly, and with real care. That means I will be direct when something is not working. It also means I will not make the company feel foolish for having the problem.
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "I make the company stronger, not dependent.",
                body: "Good work should leave the team understanding the story better. The founder should not have to be in every room for the value to make sense.",
                color: "#3f6bff",
              },
              {
                title: "Unclear GTM is not a failure.",
                body: "Most of the time, unclear technical GTM is a sign the company built something complicated enough that the story needs real work.",
                color: "#8b5cf6",
              },
              {
                title: "The field gains confidence.",
                body: "Sales should have more confidence. Partners should have a better path. Executives should have clearer language. If that happens, everyone wins.",
                color: "#3f6bff",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(63,107,255,0.10)" }}
                className="bg-white rounded-2xl p-7 border border-[#e5e7eb] transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${card.color}12`, border: `1px solid ${card.color}20` }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: `linear-gradient(135deg, #3f6bff, #8b5cf6)` }} />
                </div>
                <h3 className="text-[16px] font-bold text-[#111827] mb-3 leading-snug">{card.title}</h3>
                <p className="text-[#526078] text-[14px] leading-[1.75]">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -- A LITTLE MORE HUMAN ------------------------------------ */}
      <section className="relative py-24 md:py-32 bg-[#061126] text-white overflow-hidden">
        <div className="absolute -left-10 top-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.10) 0%, transparent 70%)" }} />
        <div className="absolute right-0 bottom-0 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.10) 0%, transparent 70%)" }} />
        <div className="absolute top-0 right-0 text-[160px] font-bold leading-none pointer-events-none select-none"
          style={{ color: "rgba(255,255,255,0.02)", lineHeight: 0.9 }}>
          06
        </div>

        <div className="relative max-w-3xl mx-auto px-6">
          <AnimateIn>
            <SectionLabel>A little more human</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[42px] font-bold mb-10 leading-[1.15] tracking-[-0.01em]">
              Serious work can still be human.
            </h2>
          </AnimateIn>

          <Stagger className="space-y-6" stagger={0.1} delay={0.1}>
            <StaggerItem>
              <p className="text-white/65 text-base md:text-[17px] leading-[1.8]">
                I am a husband, a father of three, a lifelong technology nerd, and someone who still gets excited when a company has built something genuinely useful.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="text-white/65 text-base md:text-[17px] leading-[1.8]">
                I also believe <span className="text-white font-semibold">humor is hospitality.</span> Not every business conversation needs to feel like it was written by a committee wearing uncomfortable shoes.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="text-white/65 text-base md:text-[17px] leading-[1.8]">
                People buy from people. Partners trust people. Teams learn from people. Buyers ask hard questions because their jobs, budgets, reputations, and goals are on the line. The work is serious. That does not mean we have to make it miserable.
              </p>
            </StaggerItem>
          </Stagger>

          <AnimateIn delay={0.4} className="mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "20+ years", sub: "in enterprise tech" },
                { label: "7 disciplines", sub: "of GTM experience" },
                { label: "1 question", sub: "why should they care?" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-5 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                  <p className="text-[24px] font-bold text-white mb-1 bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}>
                    {stat.label}
                  </p>
                  <p className="text-[12px] text-white/40">{stat.sub}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- WHY SUCCESSFULBOB EXISTS ---------------------------- */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 text-[160px] font-bold leading-none pointer-events-none select-none"
          style={{ color: "#f5f7fb", lineHeight: 0.9 }}>
          07
        </div>
        <div className="relative max-w-3xl mx-auto px-6">
          <AnimateIn>
            <SectionLabel>Why Successfulbob exists</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[42px] font-bold text-[#111827] mb-10 leading-[1.15] tracking-[-0.01em]">
              The world may need your solution. They still need to understand it.
            </h2>
          </AnimateIn>

          <Stagger className="space-y-5" stagger={0.1} delay={0.1}>
            <StaggerItem>
              <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">
                Successfulbob exists because I believe a lot of great technical products are harder to buy, sell, explain, and trust than they need to be. That is fixable.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">
                The answer is not to make the product less technical. The answer is to make the technical value easier for the right people to understand.
              </p>
            </StaggerItem>
          </Stagger>

          <AnimateIn delay={0.3} className="mt-10">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Production Ready", body: "If you need the full technical GTM system built.", href: "/production-ready" },
                { title: "Advisory Work", body: "If you need ongoing judgment, coaching, or a sharper outside view.", href: "/advisory" },
                { title: "Start with a call", body: "A 30-minute conversation to figure out whether there is a real fit.", href: null, external: false, onClickModal: true },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3 }}
                  className="group rounded-2xl border border-[#e5e7eb] p-6 hover:border-[#3f6bff]/40 hover:shadow-[0_8px_24px_rgba(63,107,255,0.08)] transition-all duration-200"
                >
                  <h3 className="text-[15px] font-bold text-[#111827] mb-2 group-hover:text-[#3f6bff] transition-colors">{item.title}</h3>
                  <p className="text-[13px] text-[#526078] leading-relaxed mb-4">{item.body}</p>
                  {(item as any).onClickModal
                    ? <button onClick={openModal} className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#3f6bff]">
                        Book a call <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                      </button>
                    : item.external
                      ? <a href={item.href!} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#3f6bff]">
                          Learn more <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </a>
                      : <Link href={item.href!} className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#3f6bff]">
                          Learn more <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </Link>
                  }
                </motion.div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- FAQ ---------------------------------------------------- */}
      <AboutFAQ />

      {/* -- FINAL CTA ---------------------------------------------- */}
      <section className="relative py-24 md:py-36 bg-[#061126] text-white overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #061126 0%, #0d1a3a 50%, #061126 100%)" }} />
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 0%, transparent 100%)",
          }} />
        <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <AnimateIn>
            <SectionLabel>Want to see if there is a fit?</SectionLabel>
            <h2 className="text-3xl md:text-[48px] font-bold mb-6 leading-[1.1] tracking-[-0.02em]">
              If your product is strong but<br className="hidden md:block" />{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}>
                the story isn't ready to scale,
              </span>
              <br className="hidden md:block" /> I'm happy to talk.
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <p className="text-white/60 text-[17px] leading-[1.75] mb-3 max-w-xl mx-auto">
              Schedule a 30-minute fit call and we can figure out whether Production Ready, Advisory Work, or a different next step makes sense.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.25} className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <GradientButton onClick={openModal} fitCall>
              Schedule a 30-Minute Fit Call
            </GradientButton>
            <GhostButton href="mailto:bob@successfulbob.com" external>
              Email Bob Directly
            </GhostButton>
          </AnimateIn>

          <AnimateIn delay={0.35}>
            <p className="text-[13px] text-white/30">
              Prefer email? Reach me directly at{" "}
              <a href="mailto:bob@successfulbob.com" className="text-white/50 hover:text-white transition-colors underline underline-offset-2">
                bob@successfulbob.com
              </a>
            </p>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
