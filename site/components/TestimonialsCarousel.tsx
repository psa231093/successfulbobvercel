"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { Testimonial } from "@/lib/testimonials";

export default function TestimonialsCarousel({
  items,
}: {
  items: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const elapsed = useRef(0);
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section, { amount: 0.2 });
  const reducedMotion = useReducedMotion();
  const [explicitPlay, setExplicitPlay] = useState(false);
  const running =
    items.length > 1 &&
    inView &&
    !paused &&
    !hovered &&
    !focused &&
    !hidden &&
    (!reducedMotion || explicitPlay);

  useEffect(() => {
    const update = () => setHidden(document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      elapsed.current += now - last;
      last = now;
      if (elapsed.current >= 7000) {
        elapsed.current = 0;
        setIndex((current) => (current + 1) % items.length);
      }
      setProgress(elapsed.current / 7000);
    }, 50);
    return () => window.clearInterval(timer);
  }, [running, items.length]);

  const start = useRef<{ x: number; y: number } | null>(null);
  const id = useId();
  if (!items.length) return null;
  const active = Math.min(index, items.length - 1);
  const select = (next: number) => {
    elapsed.current = 0;
    setProgress(0);
    setIndex(next);
  };
  const move = (delta: number) =>
    select((active + delta + items.length) % items.length);
  const buttonClass =
    "min-w-11 min-h-11 rounded-full border border-white/30 px-4 text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
  return (
    <section
      id="testimonials"
      ref={section}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      aria-label="Testimonials"
      aria-roledescription="carousel"
      className="bg-[#0B1734] text-white py-16 md:py-24"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-9">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a4b9ff]">
            Testimonials
          </h2>
          {items.length > 1 && (
            <div className="flex gap-3">
              <button
                type="button"
                className={buttonClass}
                aria-label="Previous testimonial"
                aria-controls={id}
                onClick={() => move(-1)}
              >
                ←
              </button>
              <button
                type="button"
                className={buttonClass}
                aria-label="Next testimonial"
                aria-controls={id}
                onClick={() => move(1)}
              >
                →
              </button>
            </div>
          )}
        </div>
        <div
          id={id}
          className="grid overflow-hidden"
          onTouchStart={(e) => {
            start.current = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY,
            };
          }}
          onTouchCancel={() => {
            start.current = null;
          }}
          onTouchEnd={(e) => {
            if (!start.current || !e.changedTouches.length) return;
            const dx = e.changedTouches[0].clientX - start.current.x;
            const dy = e.changedTouches[0].clientY - start.current.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy))
              move(dx < 0 ? 1 : -1);
            start.current = null;
          }}
        >
          {items.map((item, i) => (
            <motion.figure
              key={item._key}
              aria-hidden={i !== active}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
              initial={false}
              animate={{
                opacity: i === active ? 1 : 0,
                x: i === active ? 0 : 24,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.45,
                ease: "easeOut",
              }}
              className={`col-start-1 row-start-1 grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] gap-7 md:gap-10 items-center ${i !== active ? "pointer-events-none" : ""}`}
            >
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={320}
                  height={320}
                  sizes="(max-width: 767px) 144px, (max-width: 1023px) 240px, 280px"
                  className="rounded-2xl w-36 h-36 md:w-60 md:h-60 lg:w-[280px] lg:h-[280px] object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="w-36 h-36 md:w-60 md:h-60 lg:w-[280px] lg:h-[280px] rounded-2xl bg-white/10 flex items-center justify-center text-3xl"
                >
                  {item.name.charAt(0)}
                </div>
              )}
              <div>
                <blockquote className="text-lg md:text-[22px] leading-[1.65] tracking-[-0.01em]">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-7">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-white/65 text-sm mt-1">{item.role}</p>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
        {items.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-1 mt-8">
            {items.map((item, i) => (
              <button
                key={item._key}
                type="button"
                aria-label={`Show testimonial from ${item.name}`}
                aria-current={i === active ? "true" : undefined}
                aria-controls={id}
                className="w-11 h-11 flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-white"
                onClick={() => select(i)}
              >
                <span
                  className={`h-2 rounded-full ${i === active ? "w-6 bg-[#a4b9ff]" : "w-2 bg-white/35"}`}
                />
              </button>
            ))}
          </div>
        )}
        {items.length > 1 && (
          <div className="max-w-sm mx-auto mt-2">
            <div className="flex items-center justify-between gap-4 text-xs text-white/65 mb-2">
              <span>
                {active + 1} / {items.length}
              </span>
              <button
                type="button"
                className="min-h-11 px-3 rounded-lg text-white hover:bg-white/10"
                aria-label={
                  paused || (reducedMotion && !explicitPlay)
                    ? "Resume slideshow"
                    : "Pause slideshow"
                }
                onClick={() => {
                  if (paused || (reducedMotion && !explicitPlay)) {
                    setPaused(false);
                    setExplicitPlay(true);
                    setFocused(false);
                  } else setPaused(true);
                }}
              >
                {paused || (reducedMotion && !explicitPlay)
                  ? "Resume slideshow"
                  : "Pause slideshow"}
              </button>
            </div>
            <div
              aria-hidden="true"
              className="h-1 rounded-full bg-white/15 overflow-hidden"
            >
              <div
                className="h-full bg-gradient-to-r from-[#3f6bff] to-[#a78bfa] origin-left"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>
          </div>
        )}
        <p
          className="sr-only"
          aria-live={running ? "off" : "polite"}
          aria-atomic="true"
        >
          Testimonial {active + 1} of {items.length}: {items[active].name}.{" "}
          {items[active].quote}
        </p>
      </div>
    </section>
  );
}
