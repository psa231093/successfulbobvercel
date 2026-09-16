import type { ReactNode } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import styles from "./MarketingDesign.module.css";
import {
  FitCallButton,
  FitCallGhostButton,
  GradientButton,
  GhostButton,
} from "@/components/Primitives";

export function Copy({
  paragraphs,
  dark = false,
}: {
  paragraphs: string[];
  dark?: boolean;
}) {
  return (
    <div
      className={`space-y-5 text-base md:text-[17px] leading-[1.8] ${dark ? "text-white/70" : "text-[#526078]"}`}
    >
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

export function MarketingSection({
  eyebrow,
  title,
  children,
  tone = "white",
  id,
  aside,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  tone?: "white" | "soft" | "dark";
  id?: string;
  aside?: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${styles.section} py-16 md:py-24 scroll-mt-24 ${tone === "dark" ? "bg-[#0b1433] text-white" : tone === "soft" ? "bg-[#f5f7fb]" : "bg-white"}`}
    >
      {tone === "dark" && (
        <>
          <div aria-hidden="true" className={styles.glow} />
          <div aria-hidden="true" className={styles.texture} />
          <div aria-hidden="true" className={styles.hairline} />
        </>
      )}
      <div
        className={`${styles.sectionBody} max-w-6xl mx-auto px-6 ${aside ? "grid lg:grid-cols-2 gap-10 lg:gap-16 items-start" : ""}`}
      >
        <div>
          <AnimateIn className="max-w-3xl mb-10">
            <p
              className={`text-[11px] font-semibold tracking-[0.14em] uppercase mb-3 ${tone === "dark" ? "text-[#9db4ff]" : "text-[#3f6bff]"}`}
            >
              {eyebrow}
            </p>
            <div
              aria-hidden="true"
              className="w-10 h-[3px] rounded-full bg-gradient-to-r from-[#3f6bff] to-[#8b5cf6] mb-5"
            />
            <h2 className="text-3xl md:text-[42px] font-bold leading-[1.15] tracking-[-0.02em]">
              {title}
            </h2>
          </AnimateIn>
          {children}
        </div>
        {aside}
      </div>
    </section>
  );
}

export function MarketingHero({
  eyebrow,
  title,
  paragraphs,
  primary,
  secondary,
  primaryHref,
  secondaryHref,
  supporting,
  visual,
}: {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  primary: string;
  secondary: string;
  primaryHref?: string;
  secondaryHref?: string;
  supporting?: string;
  visual?: ReactNode;
}) {
  return (
    <section className="relative bg-[#061126] text-white py-20 md:py-28 overflow-hidden">
      <div aria-hidden="true" className={styles.texture} />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 30%,rgba(63,107,255,.16),transparent 65%)",
        }}
      />
      <div
        className={`relative max-w-6xl mx-auto px-6 ${visual ? "grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-16 items-center" : ""}`}
      >
        <AnimateIn className="max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#a4b9ff] mb-5">
            {eyebrow}
          </p>
          <h1 className="text-[38px] md:text-[56px] leading-[1.1] tracking-[-0.025em] font-bold mb-7">
            {title}
          </h1>
          <Copy paragraphs={paragraphs} dark />
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            {primaryHref ? (
              <GradientButton href={primaryHref}>{primary}</GradientButton>
            ) : (
              <FitCallButton>{primary}</FitCallButton>
            )}
            {secondaryHref ? (
              <GhostButton href={secondaryHref}>{secondary}</GhostButton>
            ) : (
              <FitCallGhostButton>{secondary}</FitCallGhostButton>
            )}
          </div>
          {supporting && (
            <p className="text-sm leading-relaxed text-white/55 mt-6">
              {supporting}
            </p>
          )}
        </AnimateIn>
        {visual}
      </div>
    </section>
  );
}

export function MarketingClose({
  title,
  paragraphs,
  primary,
  secondary = "Email Bob Directly",
}: {
  title: string;
  paragraphs: string[];
  primary: string;
  secondary?: string;
}) {
  return (
    <section
      className={`${styles.section} bg-[#061126] text-white py-16 md:py-24`}
    >
      <div aria-hidden="true" className={styles.glow} />
      <div aria-hidden="true" className={styles.texture} />
      <div aria-hidden="true" className={styles.hairline} />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9db4ff] mb-4">
          Get started
        </p>
        <div
          aria-hidden="true"
          className="w-10 h-[3px] mx-auto rounded-full bg-gradient-to-r from-[#3f6bff] to-[#8b5cf6] mb-5"
        />
        <h2 className="text-3xl md:text-[44px] font-bold leading-[1.15] tracking-tight mb-6">
          {title}
        </h2>
        <Copy paragraphs={paragraphs} dark />
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <FitCallButton>{primary}</FitCallButton>
          <GhostButton href="mailto:bob@successfulbob.com">
            {secondary}
          </GhostButton>
        </div>
      </div>
    </section>
  );
}

export function CheckList({
  items,
  dark = false,
}: {
  items: string[];
  dark?: boolean;
}) {
  return (
    <ul>
      {items.map((item) => (
        <li
          key={item}
          className={`${styles.check} ${dark ? "text-white/75" : "text-[#526078]"} text-[15px] leading-relaxed`}
        >
          <span aria-hidden="true" className={styles.checkIcon}>
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 4 4 10-10" />
            </svg>
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
