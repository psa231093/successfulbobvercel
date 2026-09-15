"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const READINESS_CHECKS = [
  { label: "Market story", sub: "Anyone can explain the value" },
  { label: "Demo flow", sub: "Guides buyers to a reason to care" },
  { label: "Sales narrative", sub: "Not a feature tour" },
  { label: "Partner message", sub: "Repeatable without the founder" },
  { label: "Executive narrative", sub: "Why this matters now" },
];

export default function ReadinessPanel() {
  const [ready, setReady] = useState<boolean[]>(
    READINESS_CHECKS.map(() => false),
  );

  useEffect(() => {
    const timers = READINESS_CHECKS.map((_, i) =>
      setTimeout(
        () => {
          setReady((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        },
        700 + i * 420,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const readyCount = ready.filter(Boolean).length;
  const pct = Math.round((readyCount / READINESS_CHECKS.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, x: 24 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[440px]"
    >
      <div
        className="absolute -inset-6 rounded-[2rem] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 30%, rgba(63,107,255,0.18) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative rounded-3xl p-6 md:p-7 backdrop-blur-md"
        style={{
          background: "rgba(11,23,52,0.82)",
          border: "1px solid rgba(63,107,255,0.22)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.04), 0 30px 70px rgba(0,0,0,0.45)",
        }}
      >
        {/* Header: window dots + label */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.14)" }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.14)" }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.14)" }}
            />
          </div>
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/45">
            GTM readiness
          </p>
        </div>

        {/* Progress meter */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] text-white/45">
            Deploying your story
          </span>
          <motion.span
            key={pct}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            className="text-[13px] font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)",
            }}
          >
            {pct}%
          </motion.span>
        </div>
        <div
          className="h-2 rounded-full mb-6 overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Checks */}
        <div className="space-y-2.5">
          {READINESS_CHECKS.map((c, i) => {
            const isReady = ready[i];
            return (
              <div
                key={c.label}
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors duration-300"
                style={{
                  background: isReady
                    ? "rgba(34,197,94,0.08)"
                    : "rgba(255,255,255,0.02)",
                  border: isReady
                    ? "1px solid rgba(34,197,94,0.25)"
                    : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isReady ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 18,
                      }}
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(34,197,94,0.9)" }}
                    >
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="spin"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1.1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 rounded-full flex-shrink-0"
                      style={{
                        border: "2px solid rgba(255,255,255,0.15)",
                        borderTopColor: "rgba(63,107,255,0.7)",
                      }}
                    />
                  )}
                </AnimatePresence>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold text-white leading-tight">
                    {c.label}
                  </p>
                  <p className="text-[11.5px] text-white/40 leading-tight mt-0.5 truncate">
                    {c.sub}
                  </p>
                </div>
                <span
                  className={`text-[11px] font-semibold flex-shrink-0 transition-colors duration-300 ${isReady ? "text-[#5fd38a]" : "text-white/30"}`}
                >
                  {isReady ? "Ready" : "Building"}
                </span>
              </div>
            );
          })}
        </div>

        <div
          className="mt-5 pt-4 flex items-center gap-2.5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}
          />
          <p className="text-[12px] text-white/40">
            Make your GTM as ready to scale as your product.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
