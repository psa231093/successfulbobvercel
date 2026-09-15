"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { workshopsListed } from "@/lib/siteVisibility";
import { useCalendarModal } from "@/components/CalendarModal";

const explore = [
  { href: "/production-ready", label: "Production Ready" },
  { href: "/advisory-work", label: "GTM Support" },
  ...(workshopsListed ? [{ href: "/workshops", label: "Workshops" }] : []),
  { href: "/insights", label: "Insights" },
];

const company = [
  { href: "/about", label: "About Bob" },
  { href: "/contact", label: "Contact" },
  { href: "/vault", label: "Customer Vault" },
  { href: "/privacy", label: "Privacy" },
];

export default function Footer() {
  const { openModal } = useCalendarModal();
  return (
    <footer className="relative bg-[#061126] text-white/60 overflow-hidden">
      {/* Top hairline with gradient center */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(63,107,255,0.4) 35%, rgba(139,92,246,0.4) 65%, transparent 100%)",
        }}
      />

      {/* Soft corner glow */}
      <div
        className="absolute -bottom-32 -right-20 w-[420px] h-[320px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity mb-3">
              <Logo className="h-9 w-auto" />
            </Link>
            <p className="text-[13.5px] leading-[1.7] text-white/40 max-w-[260px]">
              Turning technical depth into a market story buyers, sales teams, partners, and executives can
              understand, trust, and repeat.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Services">
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-4">Work together</p>
            <ul className="space-y-2.5">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13.5px] text-white/55 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-4">Company</p>
            <ul className="space-y-2.5">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13.5px] text-white/55 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-4">
              Start the conversation
            </p>
            <button
              onClick={openModal}
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-lg text-[13.5px] font-semibold text-white relative overflow-hidden mb-4"
              style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
              <span className="relative">Schedule a 30-Minute Fit Call</span>
            </button>
            <p className="text-[13px] text-white/40">
              Prefer email?{" "}
              <a
                href="mailto:bob@successfulbob.com"
                className="text-white/60 hover:text-white transition-colors underline underline-offset-2 decoration-white/20 hover:decoration-white/60"
              >
                bob@successfulbob.com
              </a>
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Successfulbob LLC. All rights reserved.</p>
          <p className="text-white/25">GTM help for technical companies.</p>
        </div>
      </div>
    </footer>
  );
}
