"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { AnimateIn, Stagger, StaggerItem } from "@/components/AnimateIn";
import {
  GradientButton,
  GhostButton,
  OutlineButton,
  SectionLabel,
  AccentBar,
} from "@/components/Primitives";
import { useCalendarModal } from "@/components/CalendarModal";

/* -- Types -------------------------------------------------------- */

export type InsightPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  publishedAt: string | null;
};

export type InsightCategory = {
  title: string;
  slug: string;
  blurb: string | null;
  topics: string[] | null;
};

export type FeaturedPost = InsightPost & {
  readTime?: string | null;
};

/* -- Fallback data (shown when Sanity has no content yet) --------- */

const FALLBACK_FEATURED: FeaturedPost = {
  slug: "features-to-business-value",
  category: "Product Messaging",
  title: "How do you turn technical features into business value?",
  excerpt:
    "A practical exercise for taking the features your team is proud of and mapping them to the pains, outcomes, objections, and buyer roles that actually create action.",
  publishedAt: null,
  readTime: "8 min read",
};

const FALLBACK_CATEGORIES: InsightCategory[] = [
  {
    title: "Startup Go to Market",
    slug: "startup-go-to-market",
    blurb: "For founders and GTM leaders building a go to market strategy for startups without turning it into theory no one uses.",
    topics: ["What is a GTM strategy for startups?", "How should B2B SaaS GTM change as you grow?", "When to bring in outside GTM help?"],
  },
  {
    title: "Founder Led Sales",
    slug: "founder-led-sales",
    blurb: "For companies where the founder can sell the story, but the team cannot repeat it yet.",
    topics: ["When does founder led sales stop scaling?", "How do you move beyond founder led sales?", "What should come after founder led sales?"],
  },
  {
    title: "Technical Product Marketing",
    slug: "technical-product-marketing",
    blurb: "For technical products that need clearer market language without losing the technical truth.",
    topics: ["What is technical product marketing?", "How do you explain a technical product simply?", "Explaining technical value to executives"],
  },
  {
    title: "Product Messaging",
    slug: "product-messaging",
    blurb: "For turning product capabilities into buyer-relevant value.",
    topics: ["What is a product messaging framework?", "How do you turn features into business value?", "Why does feature-led messaging fail?"],
  },
  {
    title: "Partner Enablement",
    slug: "partner-enablement",
    blurb: "For companies that want partners to understand, trust, and repeat the story.",
    topics: ["What is partner enablement strategy?", "Making partner messaging repeatable", "Why partners struggle to sell technical products"],
  },
  {
    title: "Demos & Field Conversations",
    slug: "demos-field-conversations",
    blurb: "For teams that need demos and customer conversations to create belief, not just prove the product exists.",
    topics: ["How to stop a demo becoming a feature tour", "What makes a demo useful to executives?", "How should a demo change by buyer role?"],
  },
  {
    title: "Executive Narrative",
    slug: "executive-narrative",
    blurb: "For turning technical depth into a story executives, boards, investors, and strategic buyers can follow.",
    topics: ["Explaining technical value to executives", "What makes a story board-ready?", "Connecting features to cost, risk, and agility"],
  },
];

const FALLBACK_POSTS: InsightPost[] = [
  { slug: "founder-led-sales-stops-scaling", category: "Founder Led Sales", title: "When does founder led sales stop scaling?", excerpt: "The warning signs that the founder has become the bottleneck, and what to build before hiring more salespeople.", publishedAt: "2026-05-01" },
  { slug: "demo-feature-tour", category: "Demos & Field Conversations", title: "How to stop a demo from becoming a feature tour", excerpt: "A structure for showing less, meaning more, and guiding buyers toward a business reason to care.", publishedAt: "2026-05-01" },
  { slug: "technical-value-executives", category: "Executive Narrative", title: "How do you explain technical value to executives?", excerpt: "Translating architecture and capability into cost, risk, security, agility, and efficiency the board can follow.", publishedAt: "2026-04-01" },
  { slug: "product-messaging-framework", category: "Product Messaging", title: "What is a product messaging framework?", excerpt: "How to connect what the product does to what buyers actually act on, in a way the whole team can repeat.", publishedAt: "2026-04-01" },
  { slug: "partner-messaging-repeatable", category: "Partner Enablement", title: "How do you make partner messaging repeatable?", excerpt: "Why partner interest rarely turns into partner repeatability, and the enablement structure that fixes it.", publishedAt: "2026-03-01" },
  { slug: "gtm-strategy-startups", category: "Startup Go to Market", title: "What is a go to market strategy for startups?", excerpt: "A practical definition, minus the theory no one uses, for technical founders bringing a product to market.", publishedAt: "2026-03-01" },
];

const INSIGHTS_FAQS = [
  {
    q: "What topics does Successfulbob write about?",
    a: "Successfulbob writes about technical GTM, founder led sales, product messaging, partner enablement, demos, executive narrative, and go to market strategy for startups. The common thread is translation: helping technical companies explain what they built in a way buyers, sales teams, partners, and executives can understand and repeat.",
  },
  {
    q: "What will I get if I subscribe?",
    a: "You will get practical thinking on technical GTM, founder led sales, product messaging, partner enablement, demos, and executive narrative. The goal is to make complex products easier to understand, sell, demo, and scale. It is written for technical founders, GTM leaders, and partner teams that want useful ideas they can actually apply, not generic startup advice.",
  },
  {
    q: "Who should subscribe?",
    a: "The newsletter is for technical founders, GTM leaders, product marketers, sales leaders, partner teams, and executives who are trying to make complex products easier to understand, sell, demo, and scale. It is especially useful if the product is strong but the story still depends too much on the founder or a few internal experts.",
  },
  {
    q: "Where should I start?",
    a: "Start with the featured article: \"How do you turn technical features into business value?\" It gives a practical way to connect the features your team talks about to the pains, outcomes, roles, and value your buyers actually care about.",
  },
];

/* -- Helpers ------------------------------------------------------ */

function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/* -- Newsletter signup -------------------------------------------- */

function NewsletterForm({ dark }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.p
          key="done"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-[15px] font-semibold ${dark ? "text-white" : "text-[#111827]"}`}
        >
          Thanks. You&apos;re on the list.
        </motion.p>
      ) : (
        <motion.form
          key="form"
          onSubmit={(e) => {
            e.preventDefault();
            if (email.includes("@")) setDone(true);
          }}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={`flex-1 px-4 py-3 rounded-lg text-[15px] outline-none transition-all duration-200 ${
              dark
                ? "bg-white/[0.06] border border-white/15 text-white placeholder:text-white/35 focus:border-[#3f6bff] focus:bg-white/[0.09]"
                : "bg-white border border-[#e5e7eb] text-[#111827] placeholder:text-[#9ca3af] focus:border-[#3f6bff] focus:ring-2 focus:ring-[#3f6bff]/15"
            }`}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-6 py-3 rounded-lg text-[15px] font-semibold text-white overflow-hidden whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #3f6bff 0%, #8b5cf6 100%)" }}
          >
            Subscribe to Insights
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* -- Topics Section (auto-advances, click to take over) ----------- */

function TopicsSection({ categories }: { categories: InsightCategory[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-100px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % categories.length), 3800);
    return () => clearInterval(id);
  }, [inView, paused, categories.length]);

  const cat = categories[active];

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#061126" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 55% at 60% 50%, rgba(63,107,255,0.09) 0%, transparent 70%)" }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <AnimateIn className="max-w-2xl mb-12">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-3" style={{ color: "#7c9fff" }}>
            What I write about
          </p>
          <div className="w-10 h-[3px] rounded-full mb-5" style={{ background: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }} />
          <h2 className="text-3xl md:text-[42px] font-bold text-white mb-4 leading-[1.15] tracking-[-0.01em]">
            The main topics
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)" }} className="text-base md:text-[17px] leading-[1.8]">
            Find the type of problem you&apos;re trying to solve without digging through a giant pile of posts.
          </p>
        </AnimateIn>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          {/* Tab rail */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 md:w-64 flex-shrink-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.slug}
                  onClick={() => { setActive(i); setPaused(true); }}
                  className="relative flex-shrink-0 text-left px-4 py-3 rounded-xl transition-all duration-200 md:w-full"
                  style={{
                    background: on ? "rgba(63,107,255,0.14)" : "transparent",
                    border: on ? "1px solid rgba(63,107,255,0.35)" : "1px solid transparent",
                  }}
                >
                  {/* Progress bar on active */}
                  {on && !paused && (
                    <motion.div
                      key={`bar-${i}`}
                      className="absolute bottom-0 left-0 h-[2px] rounded-full"
                      style={{ background: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.8, ease: "linear" }}
                    />
                  )}
                  <span
                    className="text-[13px] md:text-[14px] font-semibold leading-snug transition-colors duration-200 whitespace-nowrap md:whitespace-normal"
                    style={{ color: on ? "#ffffff" : "rgba(255,255,255,0.40)" }}
                  >
                    {c.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active category panel */}
          <div className="relative min-h-[280px] flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-7 md:p-9"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {/* Category number */}
                <span
                  className="text-[11px] font-bold tabular-nums block mb-4"
                  style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  {String(active + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
                </span>

                <h3 className="text-[24px] md:text-[30px] font-bold text-white mb-4 leading-tight">
                  {cat.title}
                </h3>

                {cat.blurb && (
                  <p className="text-[15px] md:text-[16px] leading-[1.75] mb-7" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {cat.blurb}
                  </p>
                )}

                {cat.topics && cat.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {cat.topics.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-lg text-[12px] font-medium leading-snug"
                        style={{
                          background: "rgba(63,107,255,0.10)",
                          border: "1px solid rgba(63,107,255,0.25)",
                          color: "rgba(255,255,255,0.65)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  href={`/insights#${cat.slug}`}
                  className="inline-flex items-center gap-2 text-[13px] font-semibold transition-colors duration-200"
                  style={{ color: "#7c9fff" }}
                >
                  Browse {cat.title} articles
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -- Page --------------------------------------------------------- */

export default function InsightsPage({
  featured,
  posts,
  categories,
}: {
  featured: FeaturedPost | null;
  posts: InsightPost[];
  categories: InsightCategory[];
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { openModal } = useCalendarModal();

  const displayFeatured = featured ?? FALLBACK_FEATURED;
  const filteredPosts = posts.filter((p) => p.title !== "Our first post");
  const displayPosts = filteredPosts.length > 0 ? filteredPosts : FALLBACK_POSTS;
  const displayCategories = categories.length > 0 ? categories : FALLBACK_CATEGORIES;

  return (
    <>
      {/* -- HERO -- editorial: oversized type + category ticker -- */}
      <section className="relative bg-[#061126] text-white pt-28 pb-20 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.55] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, black 0%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, black 0%, transparent 75%)",
          }} />
        <div className="absolute -top-24 left-1/4 w-[600px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.12) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 right-0 w-[450px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.10) 0%, transparent 70%)" }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-7"
            style={{ background: "rgba(63,107,255,0.10)", border: "1px solid rgba(63,107,255,0.22)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }} />
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff]">Insights</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[34px] md:text-[58px] font-bold leading-[1.06] tracking-[-0.02em] mb-7"
          >
            Practical thinking for technical companies trying to make the{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #3f6bff 0%, #8b5cf6 100%)" }}>
              market understand.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="text-[16px] md:text-[18px] text-white/65 max-w-2xl mx-auto leading-[1.7] mb-9"
          >
            Where I write about the problems technical founders, GTM leaders, partner teams, and executives run into when the product is strong but the story is not yet easy to repeat. Not generic startup advice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
          >
            <GradientButton href="#subscribe">Subscribe to Insights</GradientButton>
            <GhostButton href="#featured">Start with Featured Posts</GhostButton>
          </motion.div>

          {/* Category ticker pills */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.5 } } }}
            className="flex flex-wrap justify-center gap-2.5"
          >
            {displayCategories.map((c) => (
              <motion.span
                key={c.title}
                variants={{ hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } }}
                className="px-3.5 py-1.5 rounded-full text-[12.5px] font-medium text-white/60"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}
              >
                {c.title}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #061126)" }} />
      </section>

      {/* -- FEATURED POST -- */}
      <section id="featured" className="relative py-24 md:py-32 bg-white overflow-hidden scroll-mt-20">
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn className="max-w-3xl mb-12">
            <SectionLabel>Start here</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[40px] font-bold text-[#111827] mb-5 leading-[1.15] tracking-[-0.01em]">
              Start here if your product is strong, but the story is not carrying far enough.
            </h2>
            <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">
              These articles are meant to be useful even if you never hire me. The goal is to give technical founders and GTM teams a better way to think about the story, the demo, the partner motion, and the buyer conversation.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <Link href={`/insights/${displayFeatured.slug}`} className="group block">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="relative grid md:grid-cols-[1.2fr_1fr] gap-0 rounded-3xl overflow-hidden border border-[#e5e7eb] transition-shadow duration-200 hover:shadow-[0_24px_60px_rgba(63,107,255,0.14)]"
              >
                {/* Text side */}
                <div className="p-8 md:p-12 order-2 md:order-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
                    style={{ background: "rgba(63,107,255,0.08)", border: "1px solid rgba(63,107,255,0.2)" }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }} />
                    <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#3f6bff]">Featured · {displayFeatured.category}</span>
                  </div>
                  <h3 className="text-[24px] md:text-[30px] font-bold text-[#111827] mb-4 leading-[1.2] group-hover:text-[#3f6bff] transition-colors duration-200">
                    {displayFeatured.title}
                  </h3>
                  <p className="text-[#526078] text-[15px] md:text-[16px] leading-[1.75] mb-6">{displayFeatured.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#3f6bff]">
                    Read the featured article
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>

                {/* Visual side */}
                <div className="relative min-h-[200px] md:min-h-full order-1 md:order-2 overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #0b1734 0%, #061126 100%)" }}>
                  <div className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
                      backgroundSize: "22px 22px",
                    }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.3) 0%, transparent 70%)" }} />
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="flex items-center gap-3 md:gap-4">
                      <span className="px-3 py-2 rounded-lg text-[12px] font-semibold text-white/70" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>Feature</span>
                      <svg className="w-6 h-6 text-[#8b5cf6] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                      <span className="px-3 py-2 rounded-lg text-[12px] font-semibold text-white" style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}>Business value</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* -- WHAT I WRITE ABOUT (categories) -- */}
      <TopicsSection categories={displayCategories} />

      {/* -- NEWSLETTER -- dark -- */}
      <section id="subscribe" className="relative py-24 md:py-28 bg-[#061126] text-white overflow-hidden scroll-mt-20">
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #061126 0%, #0d1a3a 50%, #061126 100%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.14) 0%, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <AnimateIn>
            <SectionLabel>Newsletter</SectionLabel>
            <h2 className="text-3xl md:text-[40px] font-bold mb-5 leading-[1.15] tracking-[-0.01em]">
              Get practical GTM thinking in your inbox.
            </h2>
            <p className="text-white/60 text-base md:text-[17px] leading-[1.75] mb-9 max-w-xl mx-auto">
              Practical writing for technical founders, GTM leaders, and partner teams trying to make complex products easier to understand, sell, demo, and scale. The goal is not to flood your inbox, it&apos;s to give you useful ideas you can actually apply.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.12} className="flex justify-center">
            <NewsletterForm dark />
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <p className="text-[13px] text-white/35 mt-5">
              Practical notes on technical GTM, founder led sales, product messaging, demos, partner enablement, and executive narrative.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* -- RECENT ARTICLES -- */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn className="max-w-3xl mb-14">
            <SectionLabel>Recent articles</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[42px] font-bold text-[#111827] leading-[1.15] tracking-[-0.01em]">
              The latest writing
            </h2>
          </AnimateIn>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.07}>
            {displayPosts.map((p) => (
              <StaggerItem key={p.slug} className="h-full">
                <Link href={`/insights/${p.slug}`} className="group block h-full">
                  <motion.article
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="h-full flex flex-col rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] transition-shadow duration-200 hover:shadow-[0_12px_30px_rgba(63,107,255,0.10)]"
                  >
                    <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }} />
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#3f6bff]">{p.category}</span>
                      </div>
                      <h3 className="text-[18px] font-bold text-[#111827] mb-2.5 leading-snug group-hover:text-[#3f6bff] transition-colors duration-200">{p.title}</h3>
                      <p className="text-[#526078] text-[14px] leading-[1.65] mb-5">{p.excerpt}</p>
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#f0f1f4]">
                        <span className="text-[13px] text-[#9ca3af]">{formatDate(p.publishedAt)}</span>
                        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#3f6bff]">
                          Read more
                          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* -- SOFT CTA TO PRODUCTION READY -- */}
      <section className="relative py-20 md:py-24 bg-[#f5f7fb] overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6">
          <AnimateIn>
            <div className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0b1734 0%, #061126 100%)", border: "1px solid rgba(63,107,255,0.2)" }}>
              <div className="absolute -right-16 -top-16 w-[300px] h-[300px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.18) 0%, transparent 70%)" }} />
              <div className="relative md:flex md:items-center md:justify-between gap-8">
                <div className="mb-6 md:mb-0 md:max-w-xl">
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff] mb-3">Production Ready</p>
                  <h2 className="text-2xl md:text-[32px] font-bold text-white mb-4 leading-[1.2] tracking-[-0.01em]">
                    Reading because your product story is not scaling?
                  </h2>
                  <p className="text-white/60 text-[15px] md:text-[16px] leading-[1.7]">
                    If these articles sound painfully familiar, there may be a bigger issue underneath. Production Ready is the Successfulbob framework for making your GTM as production-ready as your product.
                  </p>
                </div>
                <div className="flex flex-col gap-3 md:flex-shrink-0 md:w-56">
                  <GradientButton href="/production-ready">Explore Production Ready</GradientButton>
                  <GhostButton onClick={openModal}>Schedule a Fit Call</GhostButton>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- CUSTOMER RESOURCE VAULT -- */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <AnimateIn>
              <SectionLabel>Customer Resource Vault</SectionLabel>
              <AccentBar />
              <h2 className="text-3xl md:text-[40px] font-bold text-[#111827] mb-6 leading-[1.15] tracking-[-0.01em]">
                The tools behind the ideas.
              </h2>
              <div className="space-y-4 text-[#526078] text-base md:text-[17px] leading-[1.8] mb-8">
                <p>The Vault is for clients with access to Successfulbob and Production Ready materials, practical templates, exercises, checklists, messaging worksheets, demo planning tools, and partner enablement guides.</p>
                <p>The public articles teach useful ideas. The Vault is where customers get the proprietary tools and frameworks to apply them more directly.</p>
              </div>
              <OutlineButton href="/vault">Customer Resource Vault</OutlineButton>
            </AnimateIn>

            <AnimateIn delay={0.15}>
              <div className="rounded-2xl p-8 border border-[#e5e7eb] bg-[#f5f7fb]">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(63,107,255,0.12), rgba(139,92,246,0.12))" }}>
                    <svg className="w-5 h-5 text-[#3f6bff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <rect x="4" y="11" width="16" height="10" rx="2" />
                      <path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" />
                    </svg>
                  </span>
                  <span className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#9ca3af]">Client access</span>
                </div>
                <Stagger className="space-y-3" stagger={0.06}>
                  {["Messaging worksheets", "Demo planning tools", "Partner enablement guides", "Readiness checklists", "Feature-to-value exercises"].map((t) => (
                    <StaggerItem key={t}>
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full border border-[#3f6bff]/40 bg-[#3f6bff]/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-2.5 h-2.5 text-[#3f6bff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-[#526078] text-[14px]">{t}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* -- FAQ -- */}
      <section className="py-24 md:py-32 bg-[#f5f7fb]">
        <div className="max-w-3xl mx-auto px-6">
          <AnimateIn>
            <SectionLabel>Insights questions</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[40px] font-bold text-[#111827] mb-14 leading-[1.15]">
              Questions about Insights
            </h2>
          </AnimateIn>

          <Stagger stagger={0.07}>
            {INSIGHTS_FAQS.map((faq, i) => (
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

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <AnimateIn>
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="text-3xl md:text-[48px] font-bold mb-6 leading-[1.1] tracking-[-0.02em]">
              Need help applying this{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}>
                to your company?
              </span>
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <p className="text-white/60 text-[17px] leading-[1.75] mb-12 max-w-xl mx-auto">
              The free content is here to help. If you&apos;re reading because the problem is already showing up in sales calls, demos, partner conversations, or executive meetings, schedule a 30-minute fit call and we can figure out whether Production Ready, Advisory Work, or a different next step makes sense.
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
