"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CalendarModalContext = createContext<{ openModal: () => void; closeModal: () => void }>({
  openModal: () => {},
  closeModal: () => {},
});

export function useCalendarModal() {
  return useContext(CalendarModalContext);
}

export function CalendarModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <CalendarModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            key="calendar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            style={{ background: "rgba(6,17,38,0.85)", backdropFilter: "blur(6px)" }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb]">
                <div>
                  <h2 className="text-[17px] font-bold text-[#111827]">Schedule a 30-Minute Fit Call</h2>
                  <p className="text-[13px] text-[#526078]">Pick a time. No back and forth.</p>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[#526078] hover:bg-[#f3f4f6] hover:text-[#111827] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Calendar iframe */}
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0rJQvLQcHqKx_hZvjK54xyc7TQU6QFgOwSwrik-B2v-gvT42I0Q7AVPzKDaCWQBt6zunZGP9gT?gv=true"
                style={{ border: 0 }}
                width="100%"
                height="580"
                frameBorder="0"
                title="Schedule a 30-minute fit call with Bob Hart"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CalendarModalContext.Provider>
  );
}
