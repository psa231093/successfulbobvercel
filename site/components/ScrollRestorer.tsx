"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollRestorer() {
  const pathname = usePathname();
  useEffect(() => {
    // Let Next.js position section links; a top reset would override the anchor.
    if (window.location.hash) return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
