"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/** Décalage max en part de la hauteur du viewport (évite la bande blanche en haut) */
const MAX_OFFSET_VH = 0.28;

const DEFAULT_IMAGE = "/asset-lencois-raw.jpeg";

export const BACKGROUND_TONE = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type BackgroundTone = (typeof BACKGROUND_TONE)[keyof typeof BACKGROUND_TONE];

type GlobalBackgroundProps = {
  imageSrc?: string;
  /** "dark" = image sombre, overlays assombris et page en mode dark (texte clair). "light" = défaut. */
  tone?: BackgroundTone;
};

export function GlobalBackground({
  imageSrc = DEFAULT_IMAGE,
  tone = BACKGROUND_TONE.LIGHT,
}: GlobalBackgroundProps): React.JSX.Element {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let maxOffsetPx = 0;
    let maxScroll = 1;
    let rafId: number | null = null;

    const updateLayout = (): void => {
      const innerHeight = window.innerHeight;
      maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      maxOffsetPx = innerHeight * MAX_OFFSET_VH;
    };

    const handleScroll = (): void => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const progress = Math.min(1, window.scrollY / maxScroll);
        el.style.transform = `translate3d(0, ${progress * maxOffsetPx}px, 0)`;
      });
    };

    updateLayout();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateLayout, { passive: true });
    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateLayout);
      resizeObserver.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div ref={wrapperRef} className="absolute inset-0">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center scale-[1.6]"
          priority
        />
      </div>
      {/* Overlay pour contraste et lisibilité du contenu */}
      {tone === BACKGROUND_TONE.DARK ? (
        <>
          <div className="absolute inset-0 bg-black/50" aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/60"
            aria-hidden
          />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-background/30" aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/40"
            aria-hidden
          />
        </>
      )}
    </div>
  );
}
