"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { workshopsListed } from "@/lib/siteVisibility";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useCalendarModal } from "@/components/CalendarModal";

const links = [
  { href: "/production-ready", label: "Production Ready" },
  { href: "/advisory-work", label: "GTM Support" },
  ...(workshopsListed ? [{ href: "/workshops", label: "Workshops" }] : []),
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About Bob" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { openModal } = useCalendarModal();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#061126]/95 backdrop-blur-md border-b border-white/10 shadow-[0_1px_20px_rgba(0,0,0,0.3)]"
          : "bg-[#061126]/80 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
          <Logo className="h-9 w-auto" />
        </Link>

        {/* Desktop nav. Breaks at lg rather than md: six links plus the logo and
            the fit-call button do not fit between 768 and 1024, so the mobile
            menu covers that band. gap-6 buys back the width the sixth link
            costs. */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`relative text-sm transition-colors duration-200 group ${
                  active ? "text-white font-medium" : "text-white/60 hover:text-white"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-[#3f6bff] to-[#8b5cf6] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
          <button
            onClick={openModal}
            className="relative ml-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white overflow-hidden group"
            style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}
          >
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
            <svg
              className="fit-call-icon relative z-10 w-3.5 h-3.5 flex-shrink-0"
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
            <span className="relative z-10">Schedule a Fit Call</span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <motion.span
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block h-px bg-current transition-all origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px bg-current"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block h-px bg-current transition-all origin-center"
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-[#0b1734] border-t border-white/10"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((l) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-2.5 text-sm transition-colors py-1 ${
                      active ? "text-white font-semibold" : "text-white/70 hover:text-white"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {active && (
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}
                      />
                    )}
                    {l.label}
                  </Link>
                );
              })}
              <button
                className="mt-2 inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}
                onClick={() => { setOpen(false); openModal(); }}
              >
                Schedule a Fit Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reading progress — thin gradient line along the header's bottom edge */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left pointer-events-none"
        style={{
          scaleX: progress,
          background: "linear-gradient(90deg, #3f6bff, #8b5cf6)",
          opacity: scrolled ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
    </header>
  );
}
