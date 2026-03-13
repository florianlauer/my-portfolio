"use client";

import { useEffect, useState } from "react";

/**
 * Returns true if the user prefers reduced motion.
 * SSR-safe: defaults to true (safe/reduced) on the server.
 * Listens for live changes to the media query.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(!e.matches);
    };

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}
