"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function VaultLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/vault-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/vault");
        router.refresh();
      } else {
        setError("Incorrect password. Contact Bob if you need access.");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <section className="relative bg-[#061126] text-white min-h-[100vh] flex items-center overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.45] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 72%)",
        }}
      />
      {/* Glow */}
      <div
        className="absolute -top-24 left-1/3 w-[600px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.12) 0%, transparent 65%)" }}
      />

      <div className="relative max-w-md mx-auto px-6 w-full py-24 text-center">
        {/* Lock icon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 rounded-2xl mx-auto mb-8 flex items-center justify-center"
          style={{ background: "rgba(63,107,255,0.10)", border: "1px solid rgba(63,107,255,0.25)" }}
        >
          <svg className="w-7 h-7 text-[#9db4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff] mb-4">
            Client Access
          </p>
          <h1 className="text-[30px] md:text-[40px] font-bold leading-[1.1] tracking-[-0.02em] mb-3">
            Customer Resource Vault
          </h1>
          <p className="text-white/50 text-[15px] leading-[1.7] mb-10 max-w-sm mx-auto">
            This area is for Successfulbob clients. Enter your client password to access templates, tools, and working materials.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Client password"
            required
            autoFocus
            className="w-full px-4 py-3.5 rounded-xl text-[15px] outline-none transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "white",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(63,107,255,0.55)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3.5 rounded-xl text-[15px] font-semibold text-white relative overflow-hidden disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #3f6bff 0%, #8b5cf6 100%)" }}
          >
            {loading ? "Checking…" : "Enter Vault"}
          </motion.button>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[13px] text-red-400 pt-1"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-[13px] text-white/30"
        >
          Not a client yet?{" "}
          <a href="/production-ready" className="text-white/50 hover:text-white underline underline-offset-2 transition-colors">
            Learn about Production Ready
          </a>
        </motion.p>
      </div>
    </section>
  );
}
