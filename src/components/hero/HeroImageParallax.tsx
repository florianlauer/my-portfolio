"use client";

import { useScroll, useTransform, motion } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type HeroImageParallaxProps = {
  children: ReactNode;
};

/**
 * Subtle parallax on the hero image: slight upward translate as the user scrolls.
 *
 * Respects `prefers-reduced-motion: reduce` -- when reduced motion is requested,
 * the children render without the motion wrapper (no transform, no scroll listener).
 */
export function HeroImageParallax({ children }: HeroImageParallaxProps): React.JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -48]);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div style={{ y }} className="will-change-transform">
      {children}
    </motion.div>
  );
}
