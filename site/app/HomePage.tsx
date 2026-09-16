"use client";

import Link from "next/link";
import Image from "next/image";
import { HomeOfferPaths } from "@/components/MarketingDesign";
import copy from "@/content/home.json";
import {
  Copy,
  MarketingSection,
  MarketingClose,
} from "@/components/MarketingSections";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import type { Testimonial } from "@/lib/testimonials";
import TranslationGapVisual from "@/components/TranslationGapVisual";
import { motion, type Variants } from "framer-motion";
import { AnimateIn } from "@/components/AnimateIn";
import { useCalendarModal } from "@/components/CalendarModal";

import ParticleCanvas from "@/components/ParticleCanvas";

/* --- Hero word reveal ------------------------------------------ */

const heroWordV: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function HeroWord({
  children,
  gradient,
}: {
  children: string;
  gradient?: boolean;
}) {
  return (
    <motion.span
      variants={heroWordV}
      className={`inline-block ${gradient ? "bg-clip-text text-transparent" : ""}`}
      style={
        gradient
          ? {
              backgroundImage:
                "linear-gradient(90deg, #3f6bff 0%, #8b5cf6 100%)",
            }
          : undefined
      }
    >
      {children}
    </motion.span>
  );
}

/* --- Primitives ------------------------------------------------ */

function CalendarIcon() {
  return (
    <svg
      className="fit-call-icon w-[17px] h-[17px] flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.2}
    >
      <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function GradientButtonInner({
  href,
  children,
  external,
  fitCall,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  external?: boolean;
  fitCall?: boolean;
  onClick?: () => void;
}) {
  const cls =
    "relative flex items-center justify-center px-7 py-3.5 rounded-lg text-[15px] font-semibold text-white overflow-hidden group w-full";

  const inner = (
    <>
      <span
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, #3f6bff 0%, #8b5cf6 100%)",
        }}
      />
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, #5580ff 0%, #a070ff 100%)",
        }}
      />
      <span className="relative z-10 flex items-center gap-2.5">
        {fitCall && <CalendarIcon />}
        {children}
      </span>
    </>
  );

  if (onClick)
    return (
      <button onClick={onClick} className={cls}>
        {inner}
      </button>
    );
  if (external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  return (
    <Link href={href!} className={cls}>
      {inner}
    </Link>
  );
}

function GradientButton({
  href,
  children,
  external,
  fitCall,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  external?: boolean;
  fitCall?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="w-full sm:w-auto"
      style={{ borderRadius: 8 }}
    >
      <GradientButtonInner
        href={href}
        external={external}
        fitCall={fitCall}
        onClick={onClick}
      >
        {children}
      </GradientButtonInner>
    </motion.div>
  );
}

function GhostButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="w-full sm:w-auto"
      style={{ borderRadius: 8 }}
    >
      <a
        href={href}
        className="flex items-center justify-center w-full px-7 py-3.5 rounded-lg text-[15px] font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.06] transition-all duration-200"
      >
        {children}
      </a>
    </motion.div>
  );
}

/* --- Page ------------------------------------------------------ */

export default function HomePage({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const { openModal } = useCalendarModal();
  return (
    <>
      {/* -- HERO ----------------------------------------------- */}
      <section className="relative bg-[#061126] text-white pt-28 pb-32 md:pt-40 md:pb-44 overflow-hidden">
        {/* Particle network canvas */}
        <ParticleCanvas />

        {/* Glow orbs — behind content, above canvas */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[900px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(63,107,255,0.12) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.09) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8b5cf6] mb-7"
          >
            {copy.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.07, delayChildren: 0.15 },
              },
            }}
            className="text-[38px] md:text-[64px] font-bold leading-[1.08] tracking-[-0.02em] mb-8"
          >
            {copy.hero.title.split(" ").map((word, i) => (
              <span key={i}>
                <HeroWord gradient={i > 7}>{word}</HeroWord>{" "}
              </span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-10"
          >
            <p className="text-[17px] md:text-[19px] text-white/65 max-w-2xl mx-auto leading-[1.7]">
              {copy.hero.paragraphs[0]}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.36,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <GradientButton onClick={openModal} fitCall>
              {copy.hero.primary}
            </GradientButton>
            <GhostButton href="#ways-to-work">
              {copy.hero.secondary}
            </GhostButton>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #061126)",
          }}
        />
      </section>

      <MarketingSection eyebrow="The Problem" title={copy.problem.title}>
        <div className="grid xl:grid-cols-2 gap-10 md:gap-16 items-center">
          <Copy paragraphs={copy.problem.paragraphs} />
          <AnimateIn className="hidden md:block w-full max-w-[560px] mx-auto">
            <TranslationGapVisual />
          </AnimateIn>
        </div>
      </MarketingSection>
      <MarketingSection
        id="ways-to-work"
        eyebrow="Ways to work together"
        title={copy.waysTitle}
        tone="soft"
      >
        <HomeOfferPaths items={copy.ways} flagship={copy.flagship} />
      </MarketingSection>
      <TestimonialsCarousel items={testimonials} />
      <MarketingSection eyebrow="About Bob" title={copy.about.title}>
        <div className="grid md:grid-cols-[0.65fr_1.35fr] gap-10 md:gap-16 items-center">
          <div className="max-w-[280px] md:max-w-full mx-auto">
            <Image
              src="/bob-headshot-portrait.webp"
              alt="Bob Hart"
              width={480}
              height={600}
              sizes="(max-width: 767px) 280px, 360px"
              className="rounded-2xl max-w-[280px] md:max-w-full w-full h-auto mx-auto"
            />
          </div>
          <div>
            <Copy paragraphs={copy.about.paragraphs} />
            <Link
              href="/about"
              className="inline-block mt-6 text-[#3f6bff] font-semibold underline underline-offset-4"
            >
              More about Bob
            </Link>
          </div>
        </div>
      </MarketingSection>
      <MarketingClose {...copy.close} />
    </>
  );
}
