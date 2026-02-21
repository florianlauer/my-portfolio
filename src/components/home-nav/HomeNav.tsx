"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
  const navRef = useRef<HTMLElement>(null);
  const linkRefsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [bounceType, setBounceType] = useState<"min" | "max" | null>(null);

  useEffect(() => {
    let scrollEndPx =
      window.innerWidth < MOBILE_BREAKPOINT_PX
        ? SCROLL_END_PX_MOBILE
        : SCROLL_END_PX;
    let prevProgress = 0;
    let rafId: number | null = null;
    let bounceTimeout: ReturnType<typeof setTimeout> | null = null;

    const applyStyles = (progress: number): void => {
      const nav = navRef.current;
      if (!nav) return;

      // Début (scroll 0) : plus imposant. Fin (scroll >= SCROLL_END_PX) : taille actuelle.
      const navPaddingPx = 16 - progress * 8; // 16px -> 8px
      const navGapPx = 12 - progress * 4; // 12px -> 8px
      const linkPaddingX = 16 - progress * 4; // 16px -> 12px
      const linkPaddingY = 8 - progress * 4; // 8px -> 4px
      const linkFontSizePx = 16 - progress * 2; // 16px -> 14px

      nav.style.cssText = `padding: ${navPaddingPx}px; gap: ${navGapPx}px;`;

      const linkCss = `padding: ${linkPaddingY}px ${linkPaddingX}px; font-size: ${linkFontSizePx}px;`;
      for (const link of linkRefsRef.current) {
        if (!link) continue;
        link.style.cssText = linkCss;
      }
    };

    const handleScroll = (): void => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const progress = Math.min(1, window.scrollY / scrollEndPx);

        applyStyles(progress);

        if (progress >= AT_MIN_THRESHOLD && prevProgress < AT_MIN_THRESHOLD) {
          if (bounceTimeout) clearTimeout(bounceTimeout);
          queueMicrotask(() => setBounceType("min"));
          bounceTimeout = setTimeout(() => setBounceType(null), BOUNCE_DURATION_MS);
        } else if (progress <= AT_MAX_THRESHOLD && prevProgress > AT_MAX_THRESHOLD) {
          if (bounceTimeout) clearTimeout(bounceTimeout);
          queueMicrotask(() => setBounceType("max"));
          bounceTimeout = setTimeout(() => setBounceType(null), BOUNCE_DURATION_MS);
        }

        prevProgress = progress;
      });
    };

    const handleResize = (): void => {
      scrollEndPx =
        window.innerWidth < MOBILE_BREAKPOINT_PX
          ? SCROLL_END_PX_MOBILE
          : SCROLL_END_PX;
    };

    // Apply initial styles
    applyStyles(Math.min(1, window.scrollY / scrollEndPx));

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (bounceTimeout) clearTimeout(bounceTimeout);
    };
  }, []);

  const setLinkRef = (i: number) => (el: HTMLAnchorElement | null) => {
    linkRefsRef.current[i] = el;
  };

  return (
    <div className="fixed left-0 right-0 top-8 z-30 px-4">
      <div className="relative mx-auto max-w-5xl">
        <nav
          ref={navRef}
          aria-label="Navigation des sections"
          className={`flex flex-nowrap items-center overflow-x-auto overflow-y-hidden rounded-full border border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 [scrollbar-width:thin] [-webkit-overflow-scrolling:touch] ${bounceType === "min" ? "home-nav-bounce-min" : ""} ${bounceType === "max" ? "home-nav-bounce-max" : ""}`}
        >
          <a href="#parcours" ref={setLinkRef(0)} className={linkBaseClass}>
            Parcours
          </a>
          <a href="#stack" ref={setLinkRef(1)} className={linkBaseClass}>
            Stack
          </a>
          <a href="#passions" ref={setLinkRef(2)} className={linkBaseClass}>
            Passions
          </a>
          <Link href="/a-propos" ref={setLinkRef(3)} className={linkBaseClass}>
            À propos
          </Link>
          <Link href="/galerie" ref={setLinkRef(4)} className={linkBaseClass}>
            Galerie
          </Link>
          <a href="#contact" ref={setLinkRef(5)} className={linkBaseClass}>
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
