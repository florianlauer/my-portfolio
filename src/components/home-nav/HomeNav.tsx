"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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

const SECTION_IDS = ["parcours", "stack", "passions", "contact"] as const;

const ANCHOR_TO_SECTION: Record<string, string> = {
  "#parcours": "parcours",
  "#stack": "stack",
  "#passions": "passions",
  "#contact": "contact",
};

export function HomeNav(): React.JSX.Element {
  const navRef = useRef<HTMLElement>(null);
  const linkRefsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [bounceType, setBounceType] = useState<"min" | "max" | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();

  // Détection section active au scroll
  useEffect(() => {
    const visibilityMap = new Map<string, boolean>(
      SECTION_IDS.map((id) => [id, false])
    );

    const updateActive = (): void => {
      const active = SECTION_IDS.find((id) => visibilityMap.get(id));
      setActiveSection(active ?? null);
    };

    const observers = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          visibilityMap.set(id, !!entry?.isIntersecting);
          updateActive();
        },
        { rootMargin: "-30% 0px -65% 0px", threshold: 0 }
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((o) => o?.disconnect());
    };
  }, []);

  const isHome = pathname === "/";

  /** Sur les autres pages, les ancres de section pointent vers la home. */
  const sectionHref = (hash: string): string => (isHome ? hash : `/${hash}`);

  const isActive = (href: string): boolean => {
    const sectionId = ANCHOR_TO_SECTION[href];
    if (sectionId) return activeSection === sectionId;
    return pathname === href;
  };

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
          <a href={sectionHref("#parcours")} ref={setLinkRef(0)} className={cn(linkBaseClass, isActive("#parcours") && "bg-primary/10 text-primary")}>
            Parcours
          </a>
          <a href={sectionHref("#stack")} ref={setLinkRef(1)} className={cn(linkBaseClass, isActive("#stack") && "bg-primary/10 text-primary")}>
            Stack
          </a>
          <a href={sectionHref("#passions")} ref={setLinkRef(2)} className={cn(linkBaseClass, isActive("#passions") && "bg-primary/10 text-primary")}>
            Passions
          </a>
          <Link href="/a-propos" ref={setLinkRef(3)} className={cn(linkBaseClass, isActive("/a-propos") && "bg-primary/10 text-primary")}>
            À propos
          </Link>
          <Link href="/galerie" ref={setLinkRef(4)} className={cn(linkBaseClass, isActive("/galerie") && "bg-primary/10 text-primary")}>
            Galerie
          </Link>
          <a href={sectionHref("#contact")} ref={setLinkRef(5)} className={cn(linkBaseClass, isActive("#contact") && "bg-primary/10 text-primary")}>
            Contact
          </a>
        </nav>
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-linear-to-l from-background/98 to-transparent rounded-r-full"
          aria-hidden
        />
      </div>
    </div>
  );
}
