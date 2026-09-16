"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { PointerGlow } from "@/components/Primitives";
import { useCalendarModal } from "@/components/CalendarModal";
import styles from "./MarketingDesign.module.css";

// The original site uses restrained line icons, gradient edges and navy panels.
// Keep these visual treatments separate from Bob's source copy.
export function DesignIcon({
  kind = 0,
  className = "",
}: {
  kind?: number;
  className?: string;
}) {
  const paths = [
    <g key="map">
      <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3M9 3h6v4H9zM7 12l2 2 4-4M7 18h7M17 9h4m-2-2v4" />
    </g>,
    <g key="message">
      <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9l-5 3v-3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z M7 9h10M7 13h6" />
    </g>,
    <g key="system">
      <rect x="8" y="8" width="8" height="8" rx="2" />
      <path d="M12 3v5m0 8v5M3 12h5m8 0h5M5 5l3 3m8 8 3 3M5 19l3-3m8-8 3-3" />
    </g>,
    <g key="partners">
      <circle cx="7" cy="8" r="3" />
      <circle cx="17" cy="8" r="3" />
      <path d="M2 21v-3a5 5 0 0 1 10 0v3M12 18a5 5 0 0 1 10 0v3" />
    </g>,
    <g key="launch">
      <path d="m4 17 3-7 12-7-2 12-7 3-6-1Zm3-7 10 5M8 18l-3 3m-1-6-2 2m11 2-2 3" />
      <circle cx="15" cy="8" r="1" />
    </g>,
    <g key="direction">
      <circle cx="12" cy="12" r="9" />
      <path d="m15 8-2 5-5 3 2-5 5-3Z" />
    </g>,
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-6 h-6 ${className}`}
    >
      {paths[kind % paths.length]}
    </svg>
  );
}

export function DesignPanel({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${styles.panel} ${dark ? styles.darkPanel : "bg-white"} ${className}`}
    >
      {dark && (
        <div
          aria-hidden="true"
          className={`${styles.texture} rounded-[inherit]`}
        />
      )}
      <div aria-hidden="true" className={styles.topAccent} />
      <PointerGlow strength={dark ? 0.1 : 0.045} />
      <div className="relative">{children}</div>
    </div>
  );
}

export function SystemMotif() {
  return (
    <div aria-hidden="true" className={styles.orbit}>
      <div className={styles.orbitCenter}>
        <DesignIcon kind={2} className="!w-10 !h-10" />
      </div>
      {[
        [50, 0],
        [93, 25],
        [93, 75],
        [50, 100],
        [7, 75],
        [7, 25],
      ].map(([x, y], i) => (
        <span
          key={i}
          className={styles.orbitNode}
          style={{ left: `calc(${x}% - 7px)`, top: `calc(${y}% - 7px)` }}
        />
      ))}
    </div>
  );
}

export function OfferPrice({ text }: { text: string }) {
  const match = /^(Starting at )?(\$[\d,]+)(.*)$/.exec(text);
  if (!match) return <p className={styles.price}>{text}</p>;
  return (
    <p>
      <span className="block min-h-4 text-xs mb-2 opacity-70">
        {match[1] ?? ""}
      </span>
      <span className={styles.price}>{match[2]}</span>
      <span className="text-sm ml-1 opacity-70">{match[3]}</span>
    </p>
  );
}

export function PricingPaths({
  items,
}: {
  items: { title: string; body: string; price: string }[];
}) {
  const { openModal } = useCalendarModal();
  return (
    <div className="grid md:grid-cols-3 gap-6 items-stretch">
      {items.map((item, i) => (
        <article
          key={item.title}
          className={`${styles.card} ${i === 1 ? styles.cardDark : "text-[#111827]"} flex flex-col p-7 lg:p-8`}
        >
          <PointerGlow strength={i === 1 ? 0.16 : 0.06} />
          {i === 1 && (
            <>
              <div
                className={`${styles.texture} rounded-[inherit]`}
                aria-hidden="true"
              />
              <div className={styles.topAccent} aria-hidden="true" />
            </>
          )}
          <div className="relative flex items-center justify-between mb-7">
            <span className={styles.icon}>
              <DesignIcon kind={i === 0 ? 0 : i === 1 ? 2 : 4} />
            </span>
          </div>
          <h3 className="relative text-xl font-bold leading-snug mb-5">
            <button
              type="button"
              onClick={openModal}
              className="text-left hover:underline underline-offset-4"
            >
              {item.title}
              <span
                aria-hidden="true"
                className="inline-block ml-2 text-[#8eabff]"
              >
                ↗
              </span>
            </button>
          </h3>
          <p
            className={`relative text-[15px] leading-[1.8] mb-8 ${i === 1 ? "text-white/70" : "text-[#526078]"}`}
          >
            {item.body}
          </p>
          <div
            className={`relative mt-auto pt-6 border-t ${i === 1 ? "border-white/15" : "border-[#e5e7eb]"}`}
          >
            <OfferPrice text={item.price} />
          </div>
        </article>
      ))}
    </div>
  );
}

export function SupportLevelsVisual({
  items,
}: {
  items: { title: string; price: string; id: string }[];
}) {
  return (
    <DesignPanel dark className="p-4 lg:p-5">
      <div className="space-y-3">
        {items.map((item, i) => (
          <a key={item.id} href={`#${item.id}`} className={styles.levelLink}>
            <span className={styles.icon}>
              <DesignIcon kind={[1, 3, 5][i]} />
            </span>
            <div>
              <h2 className="font-semibold text-base leading-snug">
                {item.title}
              </h2>
              <p className="text-[#bac8eb] text-sm mt-2">{item.price}</p>
            </div>
            <span aria-hidden="true" className="text-[#a4b9ff]">
              ↗
            </span>
          </a>
        ))}
      </div>
    </DesignPanel>
  );
}

export function HomeOfferPaths({
  items,
  flagship,
}: {
  items: { title: string; body: string; price: string; href: string }[];
  flagship: { title: string; body: string };
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-8 items-stretch">
      <div className="space-y-4">
        {items.map((item, i) => (
          <Link
            key={item.title}
            href={item.href}
            className={`${styles.card} group block p-6 md:p-7`}
          >
            <PointerGlow strength={0.055} />
            <div className="relative grid grid-cols-[40px_1fr] md:grid-cols-[48px_1fr] gap-4 md:gap-5">
              <span className={`${styles.icon} !w-10 !h-10 md:!w-12 md:!h-12`}>
                <DesignIcon kind={[1, 3, 5][i]} />
              </span>
              <div>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg md:text-xl font-bold text-[#111827] group-hover:text-[#3f6bff]">
                    {item.title}
                  </h3>
                  <span aria-hidden="true" className="text-[#3f6bff]">
                    ↗
                  </span>
                </div>
                <p className="mt-3 text-[#526078] text-[15px] leading-[1.75]">
                  {item.body}
                </p>
                <p className="mt-4 font-semibold text-sm text-[#3f6bff]">
                  {item.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/production-ready"
        className={`${styles.card} ${styles.cardDark} group flex flex-col justify-between p-8 md:p-10 gap-8`}
      >
        <div
          aria-hidden="true"
          className={`${styles.texture} rounded-[inherit]`}
        />
        <div aria-hidden="true" className={styles.topAccent} />
        <PointerGlow strength={0.15} />
        <div className="relative">
          <h3 className="text-[28px] md:text-[32px] font-bold leading-[1.2] tracking-tight">
            {flagship.title}
          </h3>
          <p className="text-white/70 text-base leading-[1.8] mt-5">
            {flagship.body}
          </p>
        </div>
        <div className="relative">
          <SystemMotif />
        </div>
        <div className="relative flex justify-end border-t border-white/15 pt-5">
          <span
            aria-hidden="true"
            className="rounded-full border border-[#9db4ff]/35 w-12 h-12 flex items-center justify-center text-[#b6c8ff] text-xl group-hover:bg-[#3f6bff]/15"
          >
            ↗
          </span>
        </div>
      </Link>
    </div>
  );
}
