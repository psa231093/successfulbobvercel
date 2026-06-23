"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { AnimateIn, Stagger, StaggerItem } from "@/components/AnimateIn";
import { PointerGlow } from "@/components/Primitives";
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

function GradientButton({
  href, children, external, fitCall, onClick,
}: {
  href?: string; children: React.ReactNode; external?: boolean; fitCall?: boolean; onClick?: () => void;
}) {
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
      {onClick ? <button onClick={onClick} className={cls}>{inner}</button>
        : external ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
        : <Link href={href!} className={cls}>{inner}</Link>}
    </motion.div>
  );
}

function GhostButton({ href, children, external, onClick }: { href?: string; children: React.ReactNode; external?: boolean; onClick?: () => void }) {
  const cls = "flex items-center justify-center w-full px-7 py-3.5 rounded-lg text-[15px] font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.06] transition-all duration-200";
  return (
    <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto" style={{ borderRadius: 8 }}>
      {onClick ? <button onClick={onClick} className={cls}>{children}</button>
        : external ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
        : <Link href={href!} className={cls}>{children}</Link>}
    </motion.div>
  );
}

function OutlineButton({ href, children, external, onClick }: { href?: string; children: React.ReactNode; external?: boolean; onClick?: () => void }) {
  const cls = "flex items-center justify-center w-full px-6 py-3 rounded-lg text-[14px] font-semibold text-[#3f6bff] border border-[#3f6bff]/30 hover:border-[#3f6bff]/60 hover:bg-[#3f6bff]/[0.05] transition-all duration-200";
  return (
    <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} className="w-full" style={{ borderRadius: 8 }}>
      {onClick ? <button onClick={onClick} className={cls}>{children}</button>
        : external ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
        : <Link href={href!} className={cls}>{children}</Link>}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#3f6bff] mb-3">{children}</p>;
}

function AccentBar({ className }: { className?: string }) {
  return <div className={`w-10 h-[3px] rounded-full bg-gradient-to-r from-[#3f6bff] to-[#8b5cf6] mb-5 ${className ?? ""}`} />;
}

function Numeral({ n }: { n: string }) {
  return (
    <div className="absolute top-0 right-0 text-[160px] font-bold leading-none pointer-events-none select-none"
      style={{ color: "rgba(63,107,255,0.05)", lineHeight: 0.9 }}>
      {n}
    </div>
  );
}

/* --- Hero access panel (signature interactive element) --------- */

const TIERS = [
  { key: "monthly", name: "Monthly Advisory", price: "$5k", unit: "/mo", cadence: "Monthly call + async email", accent: "#3f6bff" },
  { key: "weekly", name: "Weekly Advisory", price: "$20k", unit: "/mo", cadence: "Weekly call + async email", accent: "#8b5cf6" },
  { key: "board", name: "Advisory Board", price: "Custom", unit: "", cadence: "Cash, equity, or a mix", accent: "#5b8def" },
];

function AccessPanel() {
  const [active, setActive] = useState(1); // Weekly selected by default
  const filled = 4; // taken slots
  const total = 6;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, x: 24 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[440px]"
    >
      <div className="absolute -inset-6 rounded-[2rem] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 60% 30%, rgba(63,107,255,0.18) 0%, transparent 70%)" }} />

      <div className="relative rounded-3xl p-6 md:p-7 backdrop-blur-md"
        style={{
          background: "rgba(11,23,52,0.82)",
          border: "1px solid rgba(63,107,255,0.22)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 30px 70px rgba(0,0,0,0.45)",
        }}>

        {/* Capacity meter */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/45">Advisory capacity</p>
          <span className="text-[11px] font-semibold text-[#b899ff]">Limited</span>
        </div>
        <div className="flex items-center gap-2 mb-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.5 + i * 0.08 }}
              className="h-2.5 flex-1 rounded-full"
              style={
                i < filled
                  ? { background: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }
                  : { background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.08)" }
              }
            />
          ))}
        </div>
        <p className="text-[12px] text-white/40 mb-6">A small number of clients at a time, so the work gets real attention.</p>

        {/* Tier selector */}
        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/45 mb-3">Choose your access</p>
        <div className="space-y-2.5">
          {TIERS.map((t, i) => {
            const selected = active === i;
            return (
              <button
                key={t.key}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="w-full text-left rounded-xl px-4 py-3 transition-all duration-200"
                style={{
                  background: selected ? "rgba(63,107,255,0.12)" : "rgba(255,255,255,0.02)",
                  border: selected ? `1px solid ${t.accent}66` : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <motion.span
                      animate={{ scale: selected ? 1 : 0.6, opacity: selected ? 1 : 0.4 }}
                      transition={{ duration: 0.2 }}
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${t.accent}, #8b5cf6)` }}
                    />
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-white leading-tight truncate">{t.name}</p>
                      <p className="text-[12px] text-white/45 leading-tight mt-0.5 truncate">{t.cadence}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[16px] font-bold bg-clip-text text-transparent"
                      style={{ backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}>{t.price}</span>
                    <span className="text-[12px] text-white/35">{t.unit}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 pt-4 flex items-center gap-2.5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <svg className="w-3.5 h-3.5 text-white/30 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" d="M12 8v4l2.5 2.5" />
          </svg>
          <p className="text-[12px] text-white/40">3-month minimum. Real context beats drive-by opinions.</p>
        </div>
      </div>
    </motion.div>
  );
}

/* --- Section data ---------------------------------------------- */

const SCENARIOS = [
  { t: "Pressure-test a launch", d: "You're preparing for a product launch and want to stress the story before it's in front of the market.", help: "We pressure-test the launch narrative against the buyer's pain before the market ever sees it." },
  { t: "Demo that lands", d: "Your demo is accurate, but you're not sure it's actually helping buyers care.", help: "We rework the demo so it guides buyers toward a reason to care, not a tour of every feature." },
  { t: "Partners who repeat it", d: "Your partners are interested, but not yet confident enough to repeat the message on their own.", help: "We tighten the partner story into something they can repeat confidently without you in the room." },
  { t: "Objections you can't see", d: "Your sales team is hearing objections that product and marketing aren't fully seeing yet.", help: "We surface what the field is actually hearing and fold those objections back into the story." },
  { t: "Founder-to-market translation", d: "Your founder or exec team needs help turning technical depth into a story the market can follow.", help: "We translate founder-level context into a story the rest of the market can actually follow." },
  { t: "A high-stakes moment", d: "You're planning an event, webinar, analyst call, board discussion, or strategic customer meeting.", help: "We sharpen the narrative for the room, whether that's a stage, a board, or a key account." },
  { t: "Not sure which path", d: "You're unsure whether you need Production Ready, a smaller sprint, or just focused advisory support.", help: "We talk it through and point you to the right next step, even when that next step isn't me." },
];

const TOPICS = [
  "Technical GTM advisory",
  "Messaging & positioning review",
  "Demo review & coaching",
  "Partner & channel strategy",
  "Executive narrative coaching",
  "Event & webinar prep",
  "Product launch messaging",
  "Sales enablement review",
  "Founder coaching",
  "Fractional Field CTO guidance",
  "Advisory board participation",
  "One-off strategy sessions",
];

const PRICING = [
  {
    name: "Monthly Advisory",
    price: "$5k",
    unit: "/month",
    structure: "Monthly standing call + asynchronous email support.",
    copy: "Senior technical GTM guidance without a heavy weekly cadence. A trusted outside perspective on messaging, demos, partner strategy, launch decisions, and field conversations as they come up.",
    fit: "Companies that want ongoing access to Bob's judgment, but don't need weekly working sessions.",
    note: "3-month minimum. Annual prepay available at $50k (2-month discount).",
    cta: "Discuss Monthly Advisory",
    featured: false,
  },
  {
    name: "Weekly Advisory",
    price: "$20k",
    unit: "/month",
    structure: "Weekly standing call + asynchronous email support.",
    copy: "Closer support, faster iteration, and more frequent access. Built for launches, major events, partner pushes, enterprise sales motions, or executive narrative shifts where the story needs sharper attention.",
    fit: "Companies that need regular senior input across GTM, messaging, demos, partners, and founder-level decisions.",
    note: "3-month minimum. Annual prepay available at $200k (2-month discount).",
    cta: "Discuss Weekly Advisory",
    featured: true,
  },
  {
    name: "Advisory Board Support",
    price: "Custom",
    unit: "",
    structure: "Based on involvement, company stage, scope, and cash/equity mix.",
    copy: "Longer-term strategic involvement as a formal or informal advisor. Ongoing perspective on technical GTM, market narrative, partner strategy, and product-to-value translation, without a fixed weekly cadence.",
    fit: "Founders, executives, or boards that want Bob involved as a trusted strategic advisor over time.",
    note: "Structured around the relationship, the involvement, and the stage.",
    cta: "Discuss Advisory Board Fit",
    featured: false,
  },
];

const FIT = [
  "You have a technical product and need help explaining it in a way buyers care about.",
  "You want to pressure-test your messaging before a launch, event, investor conversation, or strategic sales push.",
  "Your founder, sales, product, marketing, and partner teams are not telling the same story.",
  "You need a technical GTM advisor who understands the product without losing the business context.",
  "You want someone who can ask hard questions without turning every conversation into consultant theater.",
  "You need help thinking through partner strategy, demos, executive narrative, field enablement, or buyer value.",
  "You want an advisor who cares about helping the team get better, not creating dependency.",
];

const ADVISORY_FAQS = [
  {
    q: "What does a go to market consultant do?",
    a: "A go to market consultant helps a company figure out how to bring a product to market, explain its value, reach the right buyers, and improve sales or marketing execution. Some consultants focus on demand generation or sales process. Successfulbob is most useful when the product is technical and the company needs help turning product depth into a story buyers, sales teams, partners, and executives can understand and repeat.",
  },
  {
    q: "When should a startup use advisory work instead of Production Ready?",
    a: "Advisory work is usually better when the company needs guidance, review, coaching, or help making better decisions. Production Ready is better when the company needs the full technical GTM system built and transferred. If you need the roadmap, messaging matrix, demo structure, executive narrative, and partner framework created, that is Production Ready. If you need senior help thinking through what to do next, Advisory may be the better fit.",
  },
  {
    q: "Why is there a 3-month minimum?",
    a: "Useful advice requires context. I need to understand the product, market, buyer, team, current story, and where the company is trying to go. A single call can be useful, but better advisory work comes from learning enough about the company to give advice that fits the situation instead of generic reactions from the outside.",
  },
  {
    q: "Why is advisory capacity limited?",
    a: "Advisory work takes focus. I only take on a small number of advisory clients because the advice gets better when I am close enough to understand the company. Limited capacity also protects the value of the relationship for current clients. If I am involved, I want to be involved enough to actually help.",
  },
  {
    q: "What is included in Monthly Advisory?",
    a: "Monthly Advisory includes a monthly standing call and asynchronous email support. It is designed for companies that want ongoing access to senior technical GTM guidance without a weekly cadence. It can support messaging questions, demo review, partner strategy, executive narrative, product launch thinking, and other strategic GTM topics.",
  },
  {
    q: "What is included in Weekly Advisory?",
    a: "Weekly Advisory includes a weekly standing call and asynchronous email support. It is designed for companies that need closer strategic support, faster feedback, and more frequent access. It is often a better fit around launches, events, partner pushes, enterprise sales motions, executive narrative work, or other moments where the company needs sharper GTM judgment.",
  },
  {
    q: "Can advisory include board or advisor support?",
    a: "Yes. Advisory board support is negotiated based on involvement, company stage, expected scope, and whether the relationship is cash-based, equity-based, or a mix of both. It may make sense when a founder, executive team, or board wants longer-term strategic perspective from Bob without a standard monthly or weekly advisory structure.",
  },
  {
    q: "Does Advisory Work include content creation?",
    a: "No. Advisory Work can include review, coaching, strategy, brainstorming, and guidance around content or messaging, but it is not a content creation package. If the company needs the full GTM system built, that belongs in Production Ready. If the company needs high-volume writing, design, video, campaign execution, or LMS production, that should be handled by internal teams or production resources.",
  },
];

/* --- Scenario spotlight (auto-advances, click a tab to take over) */

function ScenarioSpotlight() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance only while the section is on screen and the user hasn't taken over.
  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % SCENARIOS.length), 4200);
    return () => clearInterval(id);
  }, [inView, paused]);

  const s = SCENARIOS[active];

  return (
    <div ref={ref} className="grid md:grid-cols-[0.82fr_1.18fr] gap-5 md:gap-8 items-stretch">
      {/* Tab rail: horizontal scroll on mobile, vertical list on desktop */}
      <div className="order-2 md:order-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SCENARIOS.map((sc, i) => {
          const on = i === active;
          return (
            <button
              key={i}
              onClick={() => { setActive(i); setPaused(true); }}
              aria-pressed={on}
              className="relative flex-shrink-0 md:flex-shrink-0 text-left rounded-xl px-4 py-3 overflow-hidden transition-colors duration-200"
              style={{
                background: on ? "rgba(63,107,255,0.06)" : "transparent",
                border: on ? "1px solid rgba(63,107,255,0.30)" : "1px solid #e5e7eb",
              }}
            >
              <span className="flex items-center gap-3 whitespace-nowrap md:whitespace-normal">
                <span className={`text-[12px] font-bold transition-colors duration-200 ${on ? "text-[#3f6bff]" : "text-[#9ca3af]"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`text-[14px] font-semibold leading-snug transition-colors duration-200 ${on ? "text-[#111827]" : "text-[#526078]"}`}>
                  {sc.t}
                </span>
              </span>
              {/* Auto-advance timer line on the active tab */}
              {on && !paused && (
                <motion.span
                  key={active}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 4.2, ease: "linear" }}
                  className="absolute left-0 bottom-0 h-[2px] w-full origin-left"
                  style={{ background: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Spotlight detail panel */}
      <div className="order-1 md:order-2">
        <div className="relative h-full rounded-3xl p-8 md:p-10 overflow-hidden bg-white border border-[#e5e7eb]"
          style={{ boxShadow: "0 18px 48px rgba(63,107,255,0.08)" }}>
          {/* soft corner wash */}
          <div className="absolute -right-16 -top-16 w-[260px] h-[260px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.10) 0%, transparent 70%)" }} />

          <div className="relative min-h-[280px] md:min-h-[300px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[12px] font-bold tracking-[0.12em] uppercase"
                style={{ color: "#3f6bff" }}>
                Situation {String(active + 1).padStart(2, "0")}
                <span className="text-[#9ca3af]"> / {String(SCENARIOS.length).padStart(2, "0")}</span>
              </span>
              <span className="text-[11px] font-medium text-[#9ca3af]">{paused ? "Paused" : "Auto-playing"}</span>
            </div>

            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col"
            >
              <h3 className="text-[24px] md:text-[30px] font-bold text-[#111827] mb-4 leading-[1.18] tracking-[-0.01em]">
                {s.t}
              </h3>
              <p className="text-[#526078] text-[15px] md:text-[17px] leading-[1.75] mb-7">{s.d}</p>

              <div className="mt-auto relative rounded-2xl p-5"
                style={{ background: "linear-gradient(135deg, rgba(63,107,255,0.05), rgba(139,92,246,0.05))", border: "1px solid rgba(63,107,255,0.14)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#sg)" strokeWidth={2.2}>
                    <defs>
                      <linearGradient id="sg" x1="0" y1="0" x2="24" y2="24">
                        <stop stopColor="#3f6bff" /><stop offset="1" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                  <span className="text-[11px] font-bold tracking-[0.1em] uppercase bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}>
                    Where advisory helps
                  </span>
                </div>
                <p className="text-[#111827] text-[14.5px] md:text-[15px] font-medium leading-[1.6]">{s.help}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Page ------------------------------------------------------ */

export default function AdvisoryWork() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { openModal } = useCalendarModal();

  return (
    <>
      {/* -- HERO -- split: oversized headline + interactive access panel -- */}
      <section className="relative bg-[#061126] text-white pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Distinct background: concentric ring lines + corner glow */}
        <div className="absolute inset-0 opacity-[0.6] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage: "radial-gradient(ellipse 70% 80% at 75% 30%, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 75% 30%, black 0%, transparent 70%)",
          }} />
        <div className="absolute -top-24 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.13) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.10) 0%, transparent 70%)" }} />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-14 md:gap-12 items-center">

            {/* -- Text column -- */}
            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-7"
                style={{ background: "rgba(63,107,255,0.10)", border: "1px solid rgba(63,107,255,0.22)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }} />
                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff]">
                  Advisory Work
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[33px] md:text-[52px] font-bold leading-[1.08] tracking-[-0.02em] mb-6"
              >
                Senior technical GTM advice,{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #3f6bff 0%, #8b5cf6 100%)" }}>
                  without turning it into a full buildout.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="text-[16px] md:text-[18px] text-white/65 max-w-xl md:max-w-none mx-auto leading-[1.7] mb-9"
              >
                Sometimes you do not need a full Production Ready engagement. You need someone who can look at the product, the market, the buyer, the demo, the partner strategy, or the executive story and help you see where the message is breaking. Advisory is for companies that need senior judgment, pressure-testing, and practical guidance, not a content factory or a full GTM system build.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
              >
                <GradientButton onClick={openModal} fitCall>
                  Discuss Advisory Fit
                </GradientButton>
                <GhostButton href="mailto:bob@successfulbob.com" external>
                  Email Bob
                </GhostButton>
              </motion.div>
            </div>

            {/* -- Interactive access panel -- */}
            <div className="flex justify-center md:justify-end">
              <AccessPanel />
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #061126)" }} />
      </section>

      {/* -- WHEN ADVISORY MAKES SENSE (01) -- */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <Numeral n="01" />
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn className="max-w-3xl mb-14">
            <SectionLabel>When advisory work makes sense</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[42px] font-bold text-[#111827] mb-5 leading-[1.15] tracking-[-0.01em]">
              When you need a sharper outside view, but not the whole Production Ready path.
            </h2>
            <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">
              Advisory Work is usually the right fit when the company has specific questions, decisions, or pressure points that would benefit from senior technical GTM judgment. The work is practical: we look at what is happening, where the story or strategy is breaking, and what would make the next step more useful.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <ScenarioSpotlight />
          </AnimateIn>
        </div>
      </section>

      {/* -- WHAT ADVISORY CAN COVER (02) -- */}
      <section className="relative py-24 md:py-32 bg-[#f5f7fb] overflow-hidden">
        <Numeral n="02" />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-16 items-center">
            <AnimateIn>
              <SectionLabel>What advisory work can cover</SectionLabel>
              <AccentBar />
              <h2 className="text-3xl md:text-[42px] font-bold text-[#111827] mb-6 leading-[1.15] tracking-[-0.01em]">
                The topics are flexible. The role is focused.
              </h2>
              <p className="text-[#526078] text-base md:text-[17px] leading-[1.8] mb-8">
                Advisory can support a wide range of technical GTM and company-building conversations. The common thread is not the topic. It is the type of help.
              </p>
              <div className="relative pl-6 py-4">
                <div className="absolute left-0 top-0 w-[3px] h-full rounded-full" style={{ background: "linear-gradient(to bottom, #3f6bff, #8b5cf6)" }} />
                <div className="absolute inset-0 rounded-r-lg" style={{ background: "linear-gradient(to right, rgba(63,107,255,0.04), transparent)" }} />
                <p className="relative text-[16px] font-semibold text-[#111827] italic leading-relaxed">
                  Review, strategy, coaching, pressure-testing, and brainstorming from someone who has worked across the technical, field, partner, product marketing, and executive sides of the problem.
                </p>
              </div>
            </AnimateIn>

            <Stagger className="grid sm:grid-cols-2 gap-3" stagger={0.05}>
              {TOPICS.map((topic, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.18 }}
                    className="group flex items-center gap-3 rounded-xl px-4 py-3.5 bg-white border border-[#e5e7eb] transition-all duration-200 hover:border-[#3f6bff]/30 hover:shadow-[0_6px_18px_rgba(63,107,255,0.08)]"
                  >
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, rgba(63,107,255,0.12), rgba(139,92,246,0.12))" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }} />
                    </span>
                    <span className="text-[14px] font-medium text-[#111827] leading-snug group-hover:text-[#3f6bff] transition-colors duration-200">{topic}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* -- ADVISORY VS PRODUCTION READY -- */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn className="max-w-3xl mb-14">
            <SectionLabel>Advisory vs Production Ready</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[42px] font-bold text-[#111827] mb-5 leading-[1.15] tracking-[-0.01em]">
              Advisory helps you think through the work. Production Ready builds the system.
            </h2>
            <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">
              They solve related problems, but they are not the same offer. The right answer is not always the bigger engagement. It is the one that fits the problem.
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <AnimateIn>
              <div className="h-full rounded-2xl p-8 border border-[#3f6bff]/25 bg-[#3f6bff]/[0.03]">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(63,107,255,0.15), rgba(139,92,246,0.15))" }}>
                    <svg className="w-4.5 h-4.5 text-[#3f6bff]" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m0 16v.01M5.6 5.6l.7.7m12.1-.7l-.7.7M3 12h1m16 0h1M12 17a5 5 0 002-9.584A5 5 0 109 16.5" />
                    </svg>
                  </span>
                  <h3 className="text-[20px] font-bold text-[#111827]">Advisory</h3>
                </div>
                <p className="text-[#526078] text-[15px] leading-[1.7] mb-5">Best when you need ongoing guidance, review, coaching, or decision support.</p>
                <p className="text-[13px] font-semibold text-[#3f6bff] uppercase tracking-[0.1em]">If you need senior help making better decisions</p>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.1}>
              <div className="h-full rounded-2xl p-8 border border-[#e5e7eb] bg-white">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(63,107,255,0.10), rgba(139,92,246,0.10))" }}>
                    <svg className="w-4.5 h-4.5 text-[#8b5cf6]" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
                    </svg>
                  </span>
                  <h3 className="text-[20px] font-bold text-[#111827]">Production Ready</h3>
                </div>
                <p className="text-[#526078] text-[15px] leading-[1.7] mb-5">Best when you need the actual technical GTM system built: gap map, messaging matrix, demo architecture, executive narrative, partner strategy, roadmap, training, and transfer plan.</p>
                <p className="text-[13px] font-semibold text-[#8b5cf6] uppercase tracking-[0.1em]">If you need the GTM system built and transferred</p>
              </div>
            </AnimateIn>
          </div>

          <AnimateIn delay={0.15}>
            <div className="rounded-2xl px-7 py-6 bg-[#f5f7fb] border border-[#e5e7eb] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <p className="text-[#111827] text-[16px] font-semibold leading-snug">
                Not sure which fits? A short fit call usually makes it obvious.
              </p>
              <div className="sm:w-auto w-full sm:flex-shrink-0">
                <OutlineButton onClick={openModal}>Schedule a Fit Call</OutlineButton>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- WHO ADVISORY IS FOR -- */}
      <section className="relative py-24 md:py-32 bg-[#f5f7fb] overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn className="max-w-3xl mb-10">
            <SectionLabel>Who advisory is for</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[40px] font-bold text-[#111827] mb-5 leading-[1.15] tracking-[-0.01em]">
              Senior help, not generic advice.
            </h2>
            <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">
              Advisory may be a fit if any of these sound familiar.
            </p>
          </AnimateIn>

          <Stagger className="grid sm:grid-cols-2 gap-3 mb-5" stagger={0.07}>
            {FIT.slice(0, 2).map((item, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.18 }}
                  className="group flex items-start gap-4 rounded-xl p-4 bg-white border border-[#e5e7eb] transition-all duration-200 hover:border-[#3f6bff]/30 hover:shadow-[0_6px_18px_rgba(63,107,255,0.07)]"
                >
                  <span className="text-[13px] font-bold bg-clip-text text-transparent mt-0.5 flex-shrink-0 w-6"
                    style={{ backgroundImage: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[#526078] text-[15px] leading-[1.65]">{item}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger className="grid sm:grid-cols-3 gap-3 mb-5" stagger={0.07}>
            {FIT.slice(2, 5).map((item, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.18 }}
                  className="group flex items-start gap-4 rounded-xl p-4 bg-white border border-[#e5e7eb] transition-all duration-200 hover:border-[#3f6bff]/30 hover:shadow-[0_6px_18px_rgba(63,107,255,0.07)]"
                >
                  <span className="text-[13px] font-bold bg-clip-text text-transparent mt-0.5 flex-shrink-0 w-6"
                    style={{ backgroundImage: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}>
                    {String(i + 3).padStart(2, "0")}
                  </span>
                  <span className="text-[#526078] text-[15px] leading-[1.65]">{item}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger className="grid sm:grid-cols-2 gap-3 mb-8" stagger={0.07}>
            {FIT.slice(5, 7).map((item, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.18 }}
                  className="group flex items-start gap-4 rounded-xl p-4 bg-white border border-[#e5e7eb] transition-all duration-200 hover:border-[#3f6bff]/30 hover:shadow-[0_6px_18px_rgba(63,107,255,0.07)]"
                >
                  <span className="text-[13px] font-bold bg-clip-text text-transparent mt-0.5 flex-shrink-0 w-6"
                    style={{ backgroundImage: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}>
                    {String(i + 6).padStart(2, "0")}
                  </span>
                  <span className="text-[#526078] text-[15px] leading-[1.65]">{item}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>

          <AnimateIn delay={0.3}>
            <div className="rounded-2xl p-6 border border-dashed border-[#9ca3af]/40 bg-white/60 max-w-xl">
              <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#9ca3af] mb-2">Probably not a fit</p>
              <p className="text-[14px] text-[#526078] leading-[1.7]">
                If you mainly need high-volume content, campaign execution, paid media, SDR work, or a full GTM system built from scratch, Advisory is probably not the right fit.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- ADVISORY OPTIONS (pricing) -- */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn className="max-w-3xl mb-14 md:text-center md:mx-auto">
            <div className="md:flex md:flex-col md:items-center">
              <SectionLabel>Advisory options</SectionLabel>
              <AccentBar className="md:mx-auto" />
              <h2 className="text-3xl md:text-[42px] font-bold text-[#111827] mb-5 leading-[1.15] tracking-[-0.01em]">
                Choose the level of access that matches the need.
              </h2>
              <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">
                Advisory is structured around recurring access, asynchronous support, and enough continuity to make the advice useful.
              </p>
            </div>
          </AnimateIn>

          <Stagger className="grid md:grid-cols-3 gap-6 items-stretch" stagger={0.1}>
            {PRICING.map((p) => (
              <StaggerItem key={p.name} className="h-full">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-full flex flex-col rounded-2xl p-7 transition-shadow duration-200"
                  style={
                    p.featured
                      ? {
                          background: "#061126",
                          border: "1px solid rgba(63,107,255,0.4)",
                          boxShadow: "0 20px 50px rgba(63,107,255,0.18)",
                        }
                      : {
                          background: "white",
                          border: "1px solid #e5e7eb",
                        }
                  }
                >
                  <PointerGlow
                    color={p.featured ? "139,92,246" : "63,107,255"}
                    strength={p.featured ? 0.16 : 0.07}
                  />
                  {p.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.12em] uppercase text-white"
                      style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}>
                      Most access
                    </div>
                  )}

                  <h3 className={`text-[19px] font-bold mb-3 ${p.featured ? "text-white" : "text-[#111827]"}`}>{p.name}</h3>

                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-[36px] font-bold bg-clip-text text-transparent leading-none"
                      style={{ backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}>{p.price}</span>
                    <span className={`text-[15px] ${p.featured ? "text-white/45" : "text-[#9ca3af]"}`}>{p.unit}</span>
                  </div>

                  <p className={`text-[13px] mb-5 pb-5 ${p.featured ? "text-white/55 border-b border-white/10" : "text-[#526078] border-b border-[#e5e7eb]"}`}>
                    {p.structure}
                  </p>

                  <p className={`text-[14px] leading-[1.7] mb-5 ${p.featured ? "text-white/60" : "text-[#526078]"}`}>{p.copy}</p>

                  <div className="mb-6">
                    <p className={`text-[11px] font-semibold tracking-[0.1em] uppercase mb-1.5 ${p.featured ? "text-[#9db4ff]" : "text-[#3f6bff]"}`}>Best fit</p>
                    <p className={`text-[13px] leading-[1.6] ${p.featured ? "text-white/55" : "text-[#526078]"}`}>{p.fit}</p>
                  </div>

                  <div className="mt-auto">
                    <p className={`text-[12px] leading-[1.6] mb-4 ${p.featured ? "text-white/40" : "text-[#9ca3af]"}`}>{p.note}</p>
                    {p.featured ? (
                      <GradientButton onClick={openModal}>{p.cta}</GradientButton>
                    ) : (
                      <OutlineButton onClick={openModal}>{p.cta}</OutlineButton>
                    )}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* -- WHY LIMITED CAPACITY MATTERS -- */}
      <section className="relative py-24 md:py-32 bg-[#f5f7fb] overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 items-center">
            <div>
              <AnimateIn>
                <SectionLabel>Why limited capacity matters</SectionLabel>
                <AccentBar />
                <h2 className="text-3xl md:text-[42px] font-bold text-[#111827] mb-8 leading-[1.15] tracking-[-0.01em]">
                  Good advice takes attention.
                </h2>
              </AnimateIn>
              <Stagger className="space-y-5" stagger={0.1} delay={0.1}>
                {[
                  "I only take on a small number of advisory clients at a time. That is partly for my sanity, but mostly because this kind of advice is only useful when I am close enough to understand the company.",
                  "To give useful guidance, I need to learn the product, the buyer, the market, the current story, the team, the pressure points, and where the company is trying to go. Otherwise I am just reacting from the outside, and you do not need to pay premium advisory rates for generic reactions.",
                  "Limited capacity is good for both of us. Advisory clients are not buying a slot in an overloaded calendar. They are buying focused access to someone who is actually trying to understand the company well enough to help.",
                ].map((p, i) => (
                  <StaggerItem key={i}>
                    <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">{p}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <AnimateIn delay={0.2}>
              <div className="rounded-2xl p-8 bg-white border border-[#e5e7eb]">
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#3f6bff] mb-6">The 3-month minimum</p>
                <div className="space-y-6">
                  {[
                    { k: "Week 1", v: "First useful advice can happen quickly." },
                    { k: "Month 1+", v: "Patterns, tensions, and tradeoffs start to surface." },
                    { k: "Month 3", v: "The better advice arrives once the context is real." },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                          style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }} />
                        {i < 2 && <span className="w-px flex-1 mt-1" style={{ background: "linear-gradient(to bottom, rgba(63,107,255,0.3), rgba(139,92,246,0.1))" }} />}
                      </div>
                      <div className="pb-1">
                        <p className="text-[13px] font-bold text-[#111827] mb-1">{step.k}</p>
                        <p className="text-[14px] text-[#526078] leading-[1.6]">{step.v}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* -- FAQ -- */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <AnimateIn>
            <SectionLabel>Advisory work questions</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[40px] font-bold text-[#111827] mb-14 leading-[1.15]">
              Questions founders usually ask
            </h2>
          </AnimateIn>

          <Stagger stagger={0.07}>
            {ADVISORY_FAQS.map((faq, i) => (
              <StaggerItem key={i}>
                <div className="border-b border-[#e5e7eb] last:border-b-0">
                  <button
                    className="flex items-start justify-between w-full text-left gap-4 py-6 group"
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${openFaq === i ? "text-[#3f6bff]" : "text-[#111827] group-hover:text-[#3f6bff]"}`}>
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="flex-shrink-0 mt-0.5"
                    >
                      <svg className={`w-5 h-5 transition-colors duration-200 ${openFaq === i ? "text-[#3f6bff]" : "text-[#9ca3af]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
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

      {/* -- FINAL CTA -- */}
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
        <div className="absolute top-1/2 right-2/3 -translate-y-1/2 w-[400px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.10) 0%, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <AnimateIn>
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="text-3xl md:text-[48px] font-bold mb-6 leading-[1.1] tracking-[-0.02em]">
              Need a senior outside view on a{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}>
                technical GTM problem?
              </span>
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <p className="text-white/60 text-[17px] leading-[1.75] mb-12 max-w-xl mx-auto">
              Schedule a 30-minute advisory fit call and we can talk through whether Monthly Advisory, Weekly Advisory, Advisory Board support, Production Ready, or a different next step makes the most sense.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.25} className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <GradientButton onClick={openModal} fitCall>
              Discuss Advisory Fit
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

/* --- Dark outline button (for dark sections) ------------------- */

function OutlineButtonDark({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
      className="w-full sm:w-auto inline-block" style={{ borderRadius: 8 }}>
      <Link
        href={href}
        className="flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-lg text-[15px] font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.06] transition-all duration-200"
      >
        {children}
      </Link>
    </motion.div>
  );
}
