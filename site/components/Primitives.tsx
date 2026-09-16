"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useCalendarModal } from "@/components/CalendarModal";

/* -- Calendar icon (animated via .fit-call-icon) -- */

export function CalendarIcon() {
  return (
    <svg className="fit-call-icon w-[17px] h-[17px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
      <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

/* -- Gradient CTA button (primary) -- */

export function GradientButton({
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
    "relative flex items-center justify-center w-full px-7 py-3.5 rounded-lg text-[15px] font-semibold text-white overflow-hidden group";
  const inner = (
    <>
      <span className="absolute inset-0 transition-opacity duration-300"
        style={{ background: "linear-gradient(135deg, #3f6bff 0%, #8b5cf6 100%)" }} />
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(135deg, #5580ff 0%, #a070ff 100%)" }} />
      <span className="relative z-10 flex items-center gap-2.5">
        {fitCall && <CalendarIcon />}
        {children}
      </span>
    </>
  );
  return (
    <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
      className="w-full sm:w-auto" style={{ borderRadius: 8 }}>
      {/* Branch on href first so a link can also carry an onClick (analytics on
          outbound CTAs). Ordering matters: onClick-first would swallow the href. */}
      {href ? (
        external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={cls}>{inner}</a>
        ) : href.startsWith("#") ? (
          <a href={href} onClick={onClick} className={cls}>{inner}</a>
        ) : (
          <Link href={href} onClick={onClick} className={cls}>{inner}</Link>
        )
      ) : (
        <button type="button" onClick={onClick} className={cls}>{inner}</button>
      )}
    </motion.div>
  );
}

export function FitCallButton({ children, fitCall }: { children: React.ReactNode; fitCall?: boolean }) {
  const { openModal } = useCalendarModal();
  return <GradientButton onClick={openModal} fitCall={fitCall}>{children}</GradientButton>;
}

/* -- Ghost button (for dark backgrounds) -- */

export function GhostButton({ href, children, external, onClick }: { href?: string; children: React.ReactNode; external?: boolean; onClick?: () => void }) {
  const cls =
    "flex items-center justify-center w-full px-7 py-3.5 rounded-lg text-[15px] font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.06] transition-all duration-200";
  return (
    <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
      className="w-full sm:w-auto" style={{ borderRadius: 8 }}>
      {href ? (
        external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={cls}>{children}</a>
        ) : href.startsWith("#") ? (
          <a href={href} onClick={onClick} className={cls}>{children}</a>
        ) : (
          <Link href={href} onClick={onClick} className={cls}>{children}</Link>
        )
      ) : (
        <button type="button" onClick={onClick} className={cls}>{children}</button>
      )}
    </motion.div>
  );
}

export function FitCallGhostButton({ children }: { children: React.ReactNode }) {
  const { openModal } = useCalendarModal();
  return <GhostButton onClick={openModal}>{children}</GhostButton>;
}

/* -- Outline button (blue, for light backgrounds) -- */

export function OutlineButton({ href, children, external, onClick }: { href?: string; children: React.ReactNode; external?: boolean; onClick?: () => void }) {
  const cls =
    "flex items-center justify-center w-full px-6 py-3 rounded-lg text-[14px] font-semibold text-[#3f6bff] border border-[#3f6bff]/30 hover:border-[#3f6bff]/60 hover:bg-[#3f6bff]/[0.05] transition-all duration-200";
  return (
    <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
      className="w-full" style={{ borderRadius: 8 }}>
      {href ? (
        external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={cls}>{children}</a>
        ) : (
          <Link href={href} onClick={onClick} className={cls}>{children}</Link>
        )
      ) : (
        <button type="button" onClick={onClick} className={cls}>{children}</button>
      )}
    </motion.div>
  );
}

export function FitCallOutlineButton({ children }: { children: React.ReactNode }) {
  const { openModal } = useCalendarModal();
  return <OutlineButton onClick={openModal}>{children}</OutlineButton>;
}

/* -- Ghost outline button that hugs content on desktop (dark bg) -- */

export function GhostButtonInline({ href, children, external, onClick }: { href: string; children: React.ReactNode; external?: boolean; onClick?: () => void }) {
  const cls =
    "flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-lg text-[15px] font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.06] transition-all duration-200";
  return (
    <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
      className="w-full sm:w-auto inline-block" style={{ borderRadius: 8 }}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={cls}>{children}</a>
      ) : (
        <Link href={href} onClick={onClick} className={cls}>{children}</Link>
      )}
    </motion.div>
  );
}

/* -- Eyebrow label -- */

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#3f6bff] mb-3">{children}</p>;
}

/* -- Gradient accent bar -- */

export function AccentBar({ className }: { className?: string }) {
  return <div className={`w-10 h-[3px] rounded-full bg-gradient-to-r from-[#3f6bff] to-[#8b5cf6] mb-5 ${className ?? ""}`} />;
}

/* -- Pointer glow: drop inside any `relative` rounded card to give it a
      mouse-tracking spotlight. Attaches listeners to the parent element. -- */

export function PointerGlow({
  color = "63,107,255",
  size = 280,
  strength = 0.1,
}: {
  color?: string;
  size?: number;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    const el = node?.parentElement;
    if (!node || !el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      node.style.setProperty("--mx", `${e.clientX - r.left}px`);
      node.style.setProperty("--my", `${e.clientY - r.top}px`);
      node.style.opacity = "1";
    };
    const onLeave = () => {
      node.style.opacity = "0";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), rgba(${color}, ${strength}), transparent 65%)`,
      }}
    />
  );
}
