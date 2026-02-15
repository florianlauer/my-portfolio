"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useScrollY } from "@/hooks/useScrollY";

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
  const scrollY = useScrollY();
  const [layout, setLayout] = useState({ maxOffsetPx: 0, maxScroll: 1 });

  useEffect(() => {
    const update = (): void => {
      const innerHeight = window.innerHeight;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - innerHeight
      );
      setLayout({
        maxOffsetPx: innerHeight * MAX_OFFSET_VH,
        maxScroll,
      });
    };
    update();
    window.addEventListener("resize", update);
    // Recalculer quand la hauteur du document change (ex. galerie qui charge le contenu après montage)
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(document.body);
    return () => {
      window.removeEventListener("resize", update);
      resizeObserver.disconnect();
    };
  }, []);

  const progress = layout.maxScroll > 0 ? Math.min(1, scrollY / layout.maxScroll) : 0;
  const offsetY = progress * layout.maxOffsetPx;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(0, ${offsetY}px, 0)`,
        }}
      >
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
