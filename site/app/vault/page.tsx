"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AnimateIn, Stagger, StaggerItem } from "@/components/AnimateIn";

const RESOURCES = [
  {
    title: "Messaging Worksheets",
    description: "Feature-to-value mapping and buyer role matrix. Turn what the product does into what different buyers care about.",
    items: ["Feature-to-value mapping template", "Buyer role matrix", "Pain-to-outcome connector"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Demo Planning Tools",
    description: "Structure for demos that guide buyers toward value, not just prove the product exists.",
    items: ["Demo flow builder", "Objection map", "Buyer-role demo guide"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Partner Enablement Guides",
    description: "Make partner messaging repeatable. Templates and structures for partners who need to sell your story without you in the room.",
    items: ["Partner story template", "Readiness checklist", "Partner conversation guide"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    title: "Readiness Checklists",
    description: "Structured checklists for GTM gap identification, launch readiness, and field team preparation.",
    items: ["GTM gap map", "Launch readiness checklist", "Field team prep guide"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Feature-to-Value Exercises",
    description: "The core Production Ready exercise for connecting what you built to what buyers act on.",
    items: ["Feature-to-value exercise", "Buyer pain mapping", "Business outcome connector"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Executive Narrative Templates",
    description: "Story structure for board presentations, executive briefings, and investor conversations.",
    items: ["Board narrative template", "Executive briefing structure", "Investor story framework"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/vault-logout", { method: "POST" });
    router.push("/vault/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-[13px] text-white/35 hover:text-white/70 transition-colors duration-200 flex items-center gap-1.5"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Sign out
    </button>
  );
}

export default function VaultPage() {
  return (
    <div className="min-h-screen" style={{ background: "#061126" }}>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.45] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, black 0%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, black 0%, transparent 75%)",
          }}
        />
        <div
          className="absolute -top-20 left-1/4 w-[600px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.12) 0%, transparent 65%)" }}
        />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            {/* Client badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full"
              style={{ background: "rgba(63,107,255,0.10)", border: "1px solid rgba(63,107,255,0.22)" }}
            >
              <svg className="w-3.5 h-3.5 text-[#9db4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" />
              </svg>
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff]">Client Access</span>
            </motion.div>
            <LogoutButton />
          </div>

          <AnimateIn>
            <h1 className="text-[36px] md:text-[56px] font-bold leading-[1.06] tracking-[-0.02em] text-white mb-5">
              Customer Resource Vault
            </h1>
            <p className="text-white/55 text-[16px] md:text-[18px] leading-[1.75] max-w-2xl">
              The working materials behind Production Ready and Advisory Work. Templates, frameworks, and tools built for real GTM problems — for your use as a client.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Resource grid */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.07}>
            {RESOURCES.map((r) => (
              <StaggerItem key={r.title}>
                <div
                  className="rounded-2xl p-7 h-full flex flex-col gap-5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(63,107,255,0.12)",
                      border: "1px solid rgba(63,107,255,0.25)",
                      color: "#9db4ff",
                    }}
                  >
                    {r.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-[17px] font-bold text-white mb-2 leading-snug">{r.title}</h3>
                    <p className="text-[14px] text-white/50 leading-[1.65] mb-5">{r.description}</p>

                    <ul className="space-y-2">
                      {r.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <div
                            className="mt-[5px] w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(63,107,255,0.15)", border: "1px solid rgba(63,107,255,0.30)" }}
                          >
                            <svg className="w-2 h-2 text-[#7c9fff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-[13px] text-white/55 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Request CTA */}
                  <a
                    href="mailto:bob@successfulbob.com"
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold transition-colors duration-200 mt-auto"
                    style={{ color: "#7c9fff" }}
                  >
                    Request this resource
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Footer note */}
          <AnimateIn delay={0.4} className="mt-14 pt-10 border-t text-center" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <p className="text-white/35 text-[14px] leading-[1.7]">
              Need something not listed here, or want the latest version of a resource?{" "}
              <a
                href="mailto:bob@successfulbob.com"
                className="text-white/60 hover:text-white underline underline-offset-2 transition-colors duration-200"
              >
                Email Bob directly
              </a>
              .
            </p>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
