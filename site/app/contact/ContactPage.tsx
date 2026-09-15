"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateIn, Stagger, StaggerItem } from "@/components/AnimateIn";
import {
  GradientButton,
  GhostButton,
  OutlineButton,
  SectionLabel,
  AccentBar,
} from "@/components/Primitives";
import { useCalendarModal } from "@/components/CalendarModal";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdavzbrl";

/* --- Section data ---------------------------------------------- */

const PATHS = [
  {
    title: "Production Ready",
    body: "Choose this if the company may need the full Production Ready framework: a structured way to make your GTM as production-ready as your product. Usually right if the founder is still pulled into too many sales calls, the demo is accurate but not persuasive, or the market needs too much translation.",
    cta: "Discuss Production Ready",
    href: "/production-ready",
    external: false,
  },
  {
    title: "GTM Support",
    body: "Choose this if you need ongoing senior guidance, a sharper outside view, or help thinking through technical GTM, messaging, demos, partner strategy, executive narrative, or field readiness. Best when you need judgment and decision support, not a full buildout.",
    cta: "Discuss Advisory Fit",
    href: "/advisory-work",
    external: false,
  },
  {
    title: "Not sure yet",
    body: "Choose this if you know something is not connecting, but you're not sure whether it's messaging, demo flow, partner enablement, sales repeatability, or executive framing. A 30-minute conversation can usually tell us whether there's a real problem to solve and what the right next step is.",
    cta: "Schedule a Fit Call",
    href: null,
    external: false,
    openModal: true,
  },
  {
    title: "Speaking, podcasts & other",
    body: "I'm open to the right podcasts, interviews, webinars, panels, and event conversations where my background in technical GTM, Field CTO work, partner enablement, and product-to-value translation would be useful. For these, email is the best first step.",
    cta: "Email Bob Directly",
    href: "mailto:bob@successfulbob.com",
    external: true,
  },
];

const INCLUDE_DETAILS = [
  "Company name and website",
  "Product category",
  "Company stage",
  "Target buyer",
  "Current GTM challenge",
  "Production Ready, GTM Support, or not sure yet",
  "Any upcoming milestone driving timing (launch, event, partner push, funding, board meeting, enterprise sales motion)",
];

const FIT_FOR = [
  "Technical go to market strategy",
  "Product messaging and positioning review",
  "Demo review and coaching",
  "Founder led sales transition",
  "Partner and channel strategy",
  "Executive narrative",
  "Product launch messaging",
  "Event and webinar preparation",
  "Field readiness",
  "Advisory board conversations",
  "Production Ready Assessment, Foundation, or Transformation",
];

const CONTACT_FAQS = [
  {
    q: "What is the best way to contact Bob Hart?",
    a: "The best way to contact Bob Hart is to schedule a 30-minute fit call or email bob@successfulbob.com. If you already know you want to discuss Production Ready or GTM Support, a fit call is usually the easiest next step. If you want to send context first, email is a good option.",
  },
  {
    q: "How quickly will Bob respond?",
    a: "I usually respond within 1-2 business days. If your message includes the company website, product category, current GTM challenge, and what kind of help you are considering, I can usually give a more useful response.",
  },
  {
    q: "Should I schedule a call if I am not sure what I need?",
    a: "Yes. You do not need to diagnose the problem perfectly before reaching out. If your product is strong but the market story, demo, partner message, or executive value is not landing consistently, a short fit call can help clarify whether Production Ready, GTM Support, or a different next step makes sense.",
  },
  {
    q: "Can I invite Bob to a podcast, webinar, interview, or event?",
    a: "Yes. I am open to the right podcasts, webinars, interviews, panels, and events where my background in technical GTM, Field CTO work, partner enablement, product messaging, or executive narrative would be useful. Email is usually the best first step for those requests.",
  },
  {
    q: "Does Successfulbob offer general marketing execution?",
    a: "No. Successfulbob is not built for high-volume content production, paid media, SDR outsourcing, social media management, or general marketing execution. The work is focused on technical GTM strategy, product-to-value translation, messaging, demos, partner enablement, executive narrative, advisory work, and Production Ready.",
  },
];

const REASONS = [
  "Production Ready",
  "GTM Support",
  "Speaking / podcast / interview",
  "Partnership or referral",
  "Not sure yet",
  "Other",
];

/* --- Contact form (wired to Formspree) ------------------------- */

type Status = "idle" | "submitting" | "success" | "error";

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    website: "",
    reason: "",
    message: "",
    _gotcha: "", // honeypot
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form._gotcha) return; // bot
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          website: form.website,
          reason: form.reason,
          message: form.message,
          _subject: `New contact from ${form.name || "website"}${form.reason ? ` (${form.reason})` : ""}`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", company: "", email: "", website: "", reason: "", message: "", _gotcha: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full px-4 py-3 rounded-lg text-[15px] bg-[#f5f7fb] border border-[#e5e7eb] text-[#111827] placeholder:text-[#9ca3af] outline-none transition-all duration-200 focus:border-[#3f6bff] focus:ring-2 focus:ring-[#3f6bff]/15 focus:bg-white";
  const labelCls = "block text-[13px] font-semibold text-[#111827] mb-1.5";

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-10 bg-white border border-[#e5e7eb] text-center"
      >
        <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, rgba(63,107,255,0.12), rgba(139,92,246,0.12))" }}>
          <svg className="w-7 h-7 text-[#3f6bff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-[22px] font-bold text-[#111827] mb-2">Message sent.</h3>
        <p className="text-[#526078] text-[15px] leading-[1.7] max-w-md mx-auto">
          Thanks for reaching out. I usually respond within 1-2 business days. If it's time-sensitive, you can also reach me at{" "}
          <a href="mailto:bob@successfulbob.com" className="text-[#3f6bff] font-medium underline underline-offset-2">bob@successfulbob.com</a>.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl p-7 md:p-9 bg-white border border-[#e5e7eb]">
      {/* honeypot */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        value={form._gotcha}
        onChange={(e) => set("_gotcha", e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelCls}>Name</label>
          <input id="name" type="text" required value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>Company</label>
          <input id="company" type="text" value={form.company} onChange={(e) => set("company", e.target.value)} className={inputCls} placeholder="Company name" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Email</label>
          <input id="email" type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} placeholder="you@company.com" />
        </div>
        <div>
          <label htmlFor="website" className={labelCls}>Website</label>
          <input id="website" type="text" value={form.website} onChange={(e) => set("website", e.target.value)} className={inputCls} placeholder="company.com" />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="reason" className={labelCls}>What are you reaching out about?</label>
        <select
          id="reason"
          required
          value={form.reason}
          onChange={(e) => set("reason", e.target.value)}
          className={`${inputCls} appearance-none cursor-pointer`}
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 14px center",
            paddingRight: "44px",
          }}
        >
          <option value="" disabled>Select one…</option>
          {REASONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelCls}>Message</label>
        <textarea id="message" required rows={5} value={form.message} onChange={(e) => set("message", e.target.value)} className={`${inputCls} resize-y`} placeholder="Just enough context so I can understand what you're trying to solve. If the main issue is hard to describe, just say what feels stuck." />
      </div>

      {status === "error" && (
        <p className="mt-4 text-[14px] text-red-500">
          Something went wrong sending your message. Please try again, or email me directly at{" "}
          <a href="mailto:bob@successfulbob.com" className="underline underline-offset-2 font-medium">bob@successfulbob.com</a>.
        </p>
      )}

      <div className="mt-6">
        <motion.button
          type="submit"
          disabled={status === "submitting"}
          whileHover={status === "submitting" ? {} : { scale: 1.01, y: -1 }}
          whileTap={status === "submitting" ? {} : { scale: 0.98 }}
          className="relative w-full sm:w-auto px-8 py-3.5 rounded-lg text-[15px] font-semibold text-white overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ background: "linear-gradient(135deg, #3f6bff 0%, #8b5cf6 100%)" }}
        >
          {status === "submitting" ? "Sending…" : "Send Message"}
        </motion.button>
      </div>
    </form>
  );
}

/* --- Page ------------------------------------------------------ */

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { openModal } = useCalendarModal();

  return (
    <>
      {/* -- HERO -- */}
      <section className="relative bg-[#061126] text-white pt-28 pb-20 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.55] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 85% 70% at 50% 25%, black 0%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(ellipse 85% 70% at 50% 25%, black 0%, transparent 72%)",
          }} />
        <div className="absolute -top-24 right-1/4 w-[600px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.12) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 left-0 w-[450px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.10) 0%, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-7"
            style={{ background: "rgba(63,107,255,0.10)", border: "1px solid rgba(63,107,255,0.22)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }} />
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff]">Contact</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[36px] md:text-[58px] font-bold leading-[1.06] tracking-[-0.02em] mb-7"
          >
            Let's figure out if{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #3f6bff 0%, #8b5cf6 100%)" }}>
              there is a fit.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="text-[16px] md:text-[18px] text-white/65 max-w-2xl mx-auto leading-[1.7] mb-9"
          >
            If your product is strong but the story is not yet easy for the market, field, partners, or executives to carry, I'm happy to talk. The easiest next step is a 30-minute fit call to figure out whether Production Ready, GTM Support, or a different next step makes sense.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <GradientButton onClick={openModal} fitCall>
              Schedule a 30-Minute Fit Call
            </GradientButton>
            <GhostButton href="mailto:bob@successfulbob.com" external>
              Email Bob Directly
            </GhostButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-[13px] text-white/35"
          >
            I usually respond within 1-2 business days. Prefer email?{" "}
            <a href="mailto:bob@successfulbob.com" className="text-white/55 hover:text-white transition-colors underline underline-offset-2">bob@successfulbob.com</a>
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #061126)" }} />
      </section>

      {/* -- TWO WAYS TO REACH ME + FORM -- */}
      <section className="relative py-24 md:py-32 bg-[#f5f7fb] overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn className="max-w-3xl mb-12">
            <SectionLabel>Get in touch</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[42px] font-bold text-[#111827] mb-5 leading-[1.15] tracking-[-0.01em]">
              Two easy ways to reach me.
            </h2>
            <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">
              Schedule a call to talk through next steps, or send a short note and I'll respond as soon as I can.
            </p>
          </AnimateIn>

          {/* Two option cards */}
          <Stagger className="grid sm:grid-cols-2 gap-5 mb-10" stagger={0.08}>
            <StaggerItem className="h-full">
              <div className="h-full rounded-2xl p-7 bg-white border border-[#e5e7eb] flex flex-col">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, rgba(63,107,255,0.12), rgba(139,92,246,0.12))" }}>
                  <svg className="w-5 h-5 text-[#3f6bff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="3" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-bold text-[#111827] mb-2">Schedule a 30-Minute Fit Call</h3>
                <p className="text-[#526078] text-[14px] leading-[1.65] mb-6">Best if you want to talk through whether Production Ready, GTM Support, or another next step makes sense.</p>
                <div className="mt-auto">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); openModal(); }}
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-[#3f6bff] text-[#3f6bff] font-semibold text-[14px] px-5 py-2.5 hover:bg-[#3f6bff] hover:text-white transition-colors cursor-pointer"
                  >
                    Pick a Time
                  </a>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="h-full">
              <div className="h-full rounded-2xl p-7 bg-white border border-[#e5e7eb] flex flex-col">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, rgba(63,107,255,0.12), rgba(139,92,246,0.12))" }}>
                  <svg className="w-5 h-5 text-[#3f6bff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="5" width="18" height="14" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-bold text-[#111827] mb-2">Email Bob Directly</h3>
                <p className="text-[#526078] text-[14px] leading-[1.65] mb-1">Best if you want to send context first, ask a specific question, or reach out about speaking and interviews.</p>
                <p className="text-[#3f6bff] text-[14px] font-semibold mb-6">bob@successfulbob.com</p>
                <div className="mt-auto"><OutlineButton href="mailto:bob@successfulbob.com" external>Email Bob Directly</OutlineButton></div>
              </div>
            </StaggerItem>
          </Stagger>

          {/* Form */}
          <AnimateIn delay={0.1} className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-[22px] md:text-[26px] font-bold text-[#111827] mb-2">Send a note</h3>
              <p className="text-[#526078] text-[15px]">Prefer a form? Send a short note and I'll respond as soon as I can.</p>
            </div>
            <ContactForm />
          </AnimateIn>
        </div>
      </section>

      {/* -- WHAT ARE YOU REACHING OUT ABOUT (paths) -- */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn className="max-w-3xl mb-14">
            <SectionLabel>Choose the path that fits best</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[42px] font-bold text-[#111827] mb-5 leading-[1.15] tracking-[-0.01em]">
              What are you reaching out about?
            </h2>
            <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">
              You don't need to know the perfect answer before reaching out. Part of the point of the first conversation is figuring out what kind of help actually makes sense.
            </p>
          </AnimateIn>

          <Stagger className="grid sm:grid-cols-2 gap-5" stagger={0.08}>
            {PATHS.map((p) => (
              <StaggerItem key={p.title} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="group h-full flex flex-col rounded-2xl p-7 bg-white border border-[#e5e7eb] transition-shadow duration-200 hover:shadow-[0_12px_30px_rgba(63,107,255,0.10)]"
                >
                  <h3 className="text-[19px] font-bold text-[#111827] mb-3 group-hover:text-[#3f6bff] transition-colors duration-200">{p.title}</h3>
                  <p className="text-[#526078] text-[14px] md:text-[15px] leading-[1.7] mb-6">{p.body}</p>
                  <div className="mt-auto">
                    {(p as any).openModal
                      ? <OutlineButton onClick={openModal}>{p.cta}</OutlineButton>
                      : <OutlineButton href={p.href!} external={p.external}>{p.cta}</OutlineButton>}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* -- WHAT TO INCLUDE -- */}
      <section className="relative py-24 md:py-32 bg-[#f5f7fb] overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 md:gap-16 items-center">
          <AnimateIn>
            <SectionLabel>What to include</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[40px] font-bold text-[#111827] mb-6 leading-[1.15] tracking-[-0.01em]">
              What helps me give you a useful answer?
            </h2>
            <div className="space-y-4 text-[#526078] text-base md:text-[17px] leading-[1.8]">
              <p>If you're reaching out about Production Ready or GTM Support, a few details help. You don't need a perfect brief, just enough context so I can understand what you're trying to solve.</p>
              <p>If the main issue is hard to describe, that's fine. Just say what feels stuck.</p>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <div className="rounded-2xl p-8 bg-white border border-[#e5e7eb]">
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#3f6bff] mb-6">Useful details</p>
              <Stagger className="space-y-3.5" stagger={0.06}>
                {INCLUDE_DETAILS.map((d) => (
                  <StaggerItem key={d}>
                    <div className="flex items-start gap-3.5">
                      <span className="mt-0.5 w-5 h-5 rounded-full border border-[#3f6bff]/40 bg-[#3f6bff]/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-[#3f6bff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-[#526078] text-[14px] md:text-[15px] leading-snug">{d}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- FIT / NOT FIT -- */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-12 md:gap-16">
            <AnimateIn>
              <SectionLabel>Where I can usually help</SectionLabel>
              <AccentBar />
              <h2 className="text-3xl md:text-[40px] font-bold text-[#111827] mb-6 leading-[1.15] tracking-[-0.01em]">
                A fit for technical companies with a strong product.
              </h2>
              <p className="text-[#526078] text-base md:text-[17px] leading-[1.8] mb-8">
                Successfulbob is usually a fit when you need help making the value easier for buyers, sales teams, partners, and executives to understand and repeat. That can include:
              </p>
              <Stagger className="grid sm:grid-cols-2 gap-x-6 gap-y-3" stagger={0.05}>
                {FIT_FOR.map((f) => (
                  <StaggerItem key={f}>
                    <div className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }} />
                      <span className="text-[#526078] text-[14.5px] leading-[1.6]">{f}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </AnimateIn>

            <AnimateIn delay={0.15}>
              <div className="h-full rounded-2xl p-7 border border-dashed border-[#9ca3af]/40 bg-[#f5f7fb]/60">
                <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#9ca3af] mb-3">Where I'm probably not the right help</p>
                <p className="text-[#526078] text-[14.5px] leading-[1.75] mb-4">
                  Probably not a fit if the main need is high-volume content production, paid media management, SDR outsourcing, general marketing execution, social media management, graphic design, video editing, or a full website build.
                </p>
                <p className="text-[#526078] text-[14.5px] leading-[1.75]">
                  Those are real needs. They're just not the work Successfulbob is built for. My best work is helping technical companies understand where the story is breaking and how to explain the value more clearly.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* -- FAQ -- */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <AnimateIn>
            <SectionLabel>Contact questions</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[40px] font-bold text-[#111827] mb-14 leading-[1.15]">
              Questions before reaching out
            </h2>
          </AnimateIn>

          <Stagger stagger={0.07}>
            {CONTACT_FAQS.map((faq, i) => (
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
              Ready to talk through{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}>
                what is stuck?
              </span>
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <p className="text-white/60 text-[17px] leading-[1.75] mb-12 max-w-xl mx-auto">
              If the product is strong but the story is not carrying far enough, that's worth a conversation. Schedule a 30-minute fit call or email me directly.
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
