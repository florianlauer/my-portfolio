"use client";

import { useScroll, useTransform, motion } from "motion/react";
import type { ReactNode } from "react";

type HeroImageParallaxProps = {
  children: ReactNode;
};

/** Parallax sobre sur l’image hero : léger décalage au scroll (style Apple). */
export function HeroImageParallax({ children }: HeroImageParallaxProps): React.JSX.Element {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -48]);

  return (
    <motion.div style={{ y }} className="will-change-transform">
      {children}
    </motion.div>
  );
}
