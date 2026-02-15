"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useScrollY } from "@/hooks/useScrollY";

/** Scroll en px au-delà duquel le menu a sa taille "actuelle" (desktop). */
const SCROLL_END_PX = 280;
/** Idem en mobile : transition plus rapide (moins de scroll). */
const SCROLL_END_PX_MOBILE = 140;
const MOBILE_BREAKPOINT_PX = 640;

/** Seuils pour déclencher le bounce (progress). */
const AT_MIN_THRESHOLD = 0.98;
const AT_MAX_THRESHOLD = 0.02;
const BOUNCE_DURATION_MS = 750;

const linkBaseClass =
  "shrink-0 rounded-full text-foreground whitespace-nowrap outline-none transition-colors duration-200 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function HomeNav(): React.JSX.Element {
  const scrollY = useScrollY();
  const [scrollEndPx, setScrollEndPx] = useState(SCROLL_END_PX);

  useEffect(() => {
    const update = (): void => {
      setScrollEndPx(
        window.innerWidth < MOBILE_BREAKPOINT_PX
          ? SCROLL_END_PX_MOBILE
          : SCROLL_END_PX
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const progress = Math.min(1, scrollY / scrollEndPx);
  const prevProgressRef = useRef(progress);
  const [bounceType, setBounceType] = useState<"min" | "max" | null>(null);

  useEffect(() => {
    const prev = prevProgressRef.current;
    prevProgressRef.current = progress;

    if (progress >= AT_MIN_THRESHOLD && prev < AT_MIN_THRESHOLD) {
      queueMicrotask(() => setBounceType("min"));
      const t = setTimeout(() => setBounceType(null), BOUNCE_DURATION_MS);
      return () => clearTimeout(t);
    }
    if (progress <= AT_MAX_THRESHOLD && prev > AT_MAX_THRESHOLD) {
      queueMicrotask(() => setBounceType("max"));
      const t = setTimeout(() => setBounceType(null), BOUNCE_DURATION_MS);
      return () => clearTimeout(t);
    }
  }, [progress]);

  // Début (scroll 0) : plus imposant. Fin (scroll >= SCROLL_END_PX) : taille actuelle.
  const navPaddingPx = 16 - progress * 8; // 16px -> 8px
  const navGapPx = 12 - progress * 4; // 12px -> 8px
  const linkPaddingX = 16 - progress * 4; // 16px -> 12px
  const linkPaddingY = 8 - progress * 4; // 8px -> 4px
  const linkFontSizePx = 16 - progress * 2; // 16px -> 14px

  return (
    <div className="fixed left-0 right-0 top-8 z-30 px-4">
      <div className="relative mx-auto max-w-5xl">
        <nav
          aria-label="Navigation des sections"
          className={`flex flex-nowrap items-center overflow-x-auto overflow-y-hidden rounded-full border border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 [scrollbar-width:thin] [-webkit-overflow-scrolling:touch] ${bounceType === "min" ? "home-nav-bounce-min" : ""} ${bounceType === "max" ? "home-nav-bounce-max" : ""}`}
          style={{
            padding: `${navPaddingPx}px`,
            gap: `${navGapPx}px`,
            transition: "padding 0.15s ease-out, gap 0.15s ease-out",
          }}
        >
          <a
            href="#parcours"
            className={linkBaseClass}
            style={{
              padding: `${linkPaddingY}px ${linkPaddingX}px`,
              fontSize: `${linkFontSizePx}px`,
              transition: "padding 0.15s ease-out, font-size 0.15s ease-out",
            }}
          >
            Parcours
          </a>
          <a
            href="#stack"
            className={linkBaseClass}
            style={{
              padding: `${linkPaddingY}px ${linkPaddingX}px`,
              fontSize: `${linkFontSizePx}px`,
              transition: "padding 0.15s ease-out, font-size 0.15s ease-out",
            }}
          >
            Stack
          </a>
          <a
            href="#passions"
            className={linkBaseClass}
            style={{
              padding: `${linkPaddingY}px ${linkPaddingX}px`,
              fontSize: `${linkFontSizePx}px`,
              transition: "padding 0.15s ease-out, font-size 0.15s ease-out",
            }}
          >
            Passions
          </a>
          <Link
            href="/a-propos"
            className={linkBaseClass}
            style={{
              padding: `${linkPaddingY}px ${linkPaddingX}px`,
              fontSize: `${linkFontSizePx}px`,
              transition: "padding 0.15s ease-out, font-size 0.15s ease-out",
            }}
          >
            À propos
          </Link>
          <Link
            href="/galerie"
            className={linkBaseClass}
            style={{
              padding: `${linkPaddingY}px ${linkPaddingX}px`,
              fontSize: `${linkFontSizePx}px`,
              transition: "padding 0.15s ease-out, font-size 0.15s ease-out",
            }}
          >
            Galerie
          </Link>
          <a
            href="#contact"
            className={linkBaseClass}
            style={{
              padding: `${linkPaddingY}px ${linkPaddingX}px`,
              fontSize: `${linkFontSizePx}px`,
              transition: "padding 0.15s ease-out, font-size 0.15s ease-out",
            }}
          >
            Contact
          </a>
        </nav>
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-background/98 to-transparent rounded-r-full"
          aria-hidden
        />
      </div>
    </div>
  );
}
