"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useMemo, useState } from "react";
import { shuffle } from "@/utils/shuffle";
import type { GalleryItem } from "@/types/gallery";

const INITIAL_COUNT = 20;
const LOAD_MORE_COUNT = 6;

type GalleryClientProps = {
  items: GalleryItem[];
};

export function GalleryClient({
  items,
}: GalleryClientProps): React.JSX.Element {
  // Ordre identique au premier rendu (SSR + hydratation) pour éviter l'erreur d'hydratation.
  // Le mélange se fait côté client uniquement après le montage (useEffect).
  const [shuffledPool, setShuffledPool] = useState<GalleryItem[]>(() => items);
  const [displayedCount, setDisplayedCount] = useState(() =>
    Math.min(INITIAL_COUNT, items.length)
  );
  const displayedItems = useMemo(
    () => shuffledPool.slice(0, displayedCount),
    [shuffledPool, displayedCount]
  );

  useEffect(() => {
    setShuffledPool(shuffle(items));
  }, [items]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const loadedCountRef = useRef(0);
  const expectedCountRef = useRef(displayedItems.length);

  useEffect(() => {
    if (displayedItems.length === 0) {
      setIsInitialLoad(false);
      return;
    }
    if (!isInitialLoad) return;
    loadedCountRef.current = 0;
    expectedCountRef.current = displayedItems.length;
  }, [displayedItems, isInitialLoad]);

  useEffect(() => {
    const fallback = setTimeout(() => setIsInitialLoad(false), 2500);
    return () => clearTimeout(fallback);
  }, []);

  const handleImageLoad = useCallback(() => {
    loadedCountRef.current += 1;
    if (loadedCountRef.current >= expectedCountRef.current) {
      setIsInitialLoad(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    setDisplayedCount((prev) =>
      Math.min(prev + LOAD_MORE_COUNT, shuffledPool.length)
    );
  }, [shuffledPool.length]);

  const hasMore = displayedCount < shuffledPool.length;

  useEffect(() => {
    if (isInitialLoad || !hasMore || shuffledPool.length === 0) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "200px", threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isInitialLoad, loadMore, hasMore, shuffledPool.length]);

  const openLightbox = (index: number): void => setLightboxIndex(index);
  const closeLightbox = (): void => setLightboxIndex(null);
  const goPrev = (): void => {
    setLightboxIndex((i) =>
      i === null ? null : i === 0 ? displayedItems.length - 1 : i - 1
    );
  };
  const goNext = (): void => {
    setLightboxIndex((i) =>
      i === null ? null : i === displayedItems.length - 1 ? 0 : i + 1
    );
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  const currentItem =
    lightboxIndex !== null ? displayedItems[lightboxIndex] : null;

  return (
    <>
      {isInitialLoad && (
        <div
          className="flex min-h-[200px] items-center justify-center py-16 text-muted-foreground"
          role="status"
          aria-label="Chargement de la galerie"
        >
          <span className="text-sm">Chargement…</span>
        </div>
      )}

      <div
        className={`columns-2 gap-4 md:columns-3 ${
          isInitialLoad
            ? "absolute left-[-9999px] opacity-0 pointer-events-none"
            : ""
        }`}
        role="list"
        aria-label="Galerie de photos"
        aria-hidden={isInitialLoad}
      >
        {displayedItems.map((item, index) => (
          <figure
            key={`${item.id}-${index}`}
            className="break-inside-avoid mb-4 [page-break-inside:avoid]"
            role="listitem"
          >
            <button
              type="button"
              onClick={() => openLightbox(index)}
              className="relative block w-full overflow-hidden rounded-xl border border-border bg-muted transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`Voir ${item.caption} en grand`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading={index < INITIAL_COUNT ? "eager" : "lazy"}
                decoding="async"
                className="h-auto w-full object-cover"
                onLoad={handleImageLoad}
              />
            </button>
            <figcaption className="mt-2 text-sm text-muted-foreground">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {!isInitialLoad && hasMore && (
        <div ref={sentinelRef} className="h-4 w-full" aria-hidden />
      )}
      {!isInitialLoad && !hasMore && shuffledPool.length > 0 && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Fin de la galerie — {shuffledPool.length} photo
          {shuffledPool.length > 1 ? "s" : ""}.
        </p>
      )}

      {currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${lightboxIndex! + 1} sur ${
            displayedItems.length
          } : ${currentItem.caption}`}
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-md bg-white/10 px-3 py-1 text-white hover:bg-white/20 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Fermer"
          >
            Fermer
          </button>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-md bg-white/10 px-3 py-2 text-white hover:bg-white/20 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Image précédente"
          >
            ←
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md bg-white/10 px-3 py-2 text-white hover:bg-white/20 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Image suivante"
          >
            →
          </button>
          <div
            className="relative max-h-[85vh] max-w-full"
            onClick={(e) => e.stopPropagation()}
            role="presentation"
          >
            <Image
              src={currentItem.src}
              alt={currentItem.alt}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto object-contain"
              priority
            />
            <p className="mt-2 text-center text-sm text-white/90">
              {currentItem.caption} — {lightboxIndex! + 1} /{" "}
              {displayedItems.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
