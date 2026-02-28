"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Images du diaporama, dans l'ordre d'affichage. */
const SLIDESHOW_IMAGES = [
  "/asset-lencois-raw.jpeg",
  "/asset-rio.jpeg",
  "/asset-laponie.jpeg",
] as const;

/** Durée d'affichage de chaque photo (ms). */
const INTERVAL_MS = 10_000;
/** Durée de la transition croisée (ms) — doit correspondre à la CSS. */
const TRANSITION_MS = 1_000;

/** Décalage max en part de la hauteur du viewport pour le parallaxe. */
const MAX_OFFSET_VH = 0.28;

export function GlobalBackground(): React.JSX.Element {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Diaporama : avance toutes les INTERVAL_MS ms.
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % SLIDESHOW_IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  // Parallaxe au scroll.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let maxOffsetPx = 0;
    let maxScroll = 1;
    let rafId: number | null = null;

    const updateLayout = (): void => {
      const innerHeight = window.innerHeight;
      maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - innerHeight
      );
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
        {SLIDESHOW_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0"
            style={{
              opacity: i === currentIndex ? 1 : 0,
              transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center scale-[1.6]"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      {/* Overlay léger pour la lisibilité du contenu */}
      <div className="absolute inset-0 bg-background/30" aria-hidden />
      <div
        className="absolute inset-0 bg-linear-to-b from-background/40 via-background/20 to-background/40"
        aria-hidden
      />
    </div>
  );
}
