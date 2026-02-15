"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useMemo, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { shuffle } from "@/utils/shuffle";
import type { GalleryItem } from "@/types/gallery";

const INITIAL_COUNT = 20;
const LOAD_MORE_COUNT = 6;

const MASONRY_BREAKPOINTS = { 0: 1, 640: 2, 1024: 3 };
const MASONRY_GUTTER_BREAKPOINTS = { 0: "1rem", 640: "1rem", 1024: "1rem" };

type GalleryClientProps = {
  items: GalleryItem[];
};

export function GalleryClient({
  items,
}: GalleryClientProps): React.JSX.Element {
  // Premier rendu (SSR + hydratation) : même liste que le serveur (items, ordre stable).
  // Après montage client uniquement : mélange et affichage du pool mélangé.
  const [shuffledPool, setShuffledPool] = useState<GalleryItem[]>(() => items);
  const [hasMounted, setHasMounted] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(() =>
    Math.min(INITIAL_COUNT, items.length)
  );

  const listToShow = hasMounted ? shuffledPool : items;
  const displayedItems = useMemo(
    () => listToShow.slice(0, displayedCount),
    [listToShow, displayedCount]
  );

  useEffect(() => {
    queueMicrotask(() => {
      setShuffledPool(shuffle(items));
      setHasMounted(true);
    });
  }, [items]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const loadedCountRef = useRef(0);
  const expectedCountRef = useRef(displayedItems.length);

  useEffect(() => {
    if (displayedItems.length === 0) {
      queueMicrotask(() => setIsInitialLoad(false));
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
      Math.min(prev + LOAD_MORE_COUNT, listToShow.length)
    );
  }, [listToShow.length]);

  const hasMore = displayedCount < listToShow.length;

  useEffect(() => {
    if (isInitialLoad || !hasMore || listToShow.length === 0) return;
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
  }, [isInitialLoad, loadMore, hasMore, listToShow.length]);

  const openLightbox = (index: number): void => setLightboxIndex(index);
  const closeLightbox = (): void => setLightboxIndex(null);
  const goPrev = useCallback((): void => {
    setLightboxIndex((i) =>
      i === null ? null : i === 0 ? displayedItems.length - 1 : i - 1
    );
  }, [displayedItems.length]);
  const goNext = useCallback((): void => {
    setLightboxIndex((i) =>
      i === null ? null : i === displayedItems.length - 1 ? 0 : i + 1
    );
  }, [displayedItems.length]);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const containerWidthRef = useRef(1000);
  const rafIdRef = useRef<number | null>(null);
  const latestDragRef = useRef(0);
  const pendingDirectionRef = useRef<"prev" | "next" | null>(null);

  const [dragDelta, setDragDelta] = useState(0);
  const [isDragAnimating, setIsDragAnimating] = useState(false);

  const SWIPE_THRESHOLD_PX = 50;

  useEffect(() => {
    const updateWidth = (): void => {
      containerWidthRef.current = window.innerWidth;
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleLightboxTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) touchStartRef.current = { x: t.clientX, y: t.clientY };
    latestDragRef.current = 0;
    setIsDragAnimating(false);
  }, []);

  const handleLightboxTouchMove = useCallback((e: React.TouchEvent) => {
    const start = touchStartRef.current;
    if (!start) return;
    const t = e.touches[0];
    if (!t) return;
    const deltaX = t.clientX - start.x;
    const deltaY = t.clientY - start.y;
    if (Math.abs(deltaY) >= Math.abs(deltaX)) return;
    e.preventDefault();
    const max = containerWidthRef.current;
    const clamped = Math.max(-max, Math.min(max, deltaX));
    latestDragRef.current = clamped;
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        setDragDelta(latestDragRef.current);
      });
    }
  }, []);

  const handleLightboxTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = touchStartRef.current;
      touchStartRef.current = null;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (!start) return;
      const t = e.changedTouches[0];
      if (!t) return;
      const deltaX = t.clientX - start.x;
      const width = containerWidthRef.current;
      const threshold = Math.min(SWIPE_THRESHOLD_PX, width * 0.2);

      if (deltaX > threshold) {
        pendingDirectionRef.current = "prev";
        setIsDragAnimating(true);
        setDragDelta(width);
      } else if (deltaX < -threshold) {
        pendingDirectionRef.current = "next";
        setIsDragAnimating(true);
        setDragDelta(-width);
      } else {
        pendingDirectionRef.current = null;
        setIsDragAnimating(true);
        setDragDelta(0);
      }
    },
    []
  );

  const handleLightboxTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.propertyName !== "transform") return;
      const pending = pendingDirectionRef.current;
      pendingDirectionRef.current = null;
      setIsDragAnimating(false);
      setDragDelta(0);
      if (pending === "prev") goPrev();
      if (pending === "next") goNext();
    },
    [goPrev, goNext]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goPrev, goNext]);

  const currentItem =
    lightboxIndex !== null ? displayedItems[lightboxIndex] : null;

  // Placeholder identique serveur + premier rendu client pour éviter l’erreur d’hydratation.
  // ResponsiveMasonry/Masonry ne sont rendus qu’après montage (DOM différent selon viewport).
  if (!hasMounted) {
    return (
      <>
        <div
          className="flex min-h-[200px] items-center justify-center py-16"
          role="status"
          aria-label="Chargement de la galerie"
        >
          <span className="text-base font-medium text-foreground">
            Chargement…
          </span>
        </div>
        <div
          role="list"
          aria-label="Galerie de photos"
          className="min-h-[200px]"
          aria-hidden
        />
      </>
    );
  }

  return (
    <>
      {isInitialLoad && (
        <div
          className="flex min-h-[200px] items-center justify-center py-16"
          role="status"
          aria-label="Chargement de la galerie"
        >
          <span className="text-base font-medium text-foreground">
            Chargement…
          </span>
        </div>
      )}

      <div
        className={
          isInitialLoad
            ? "absolute left-[-9999px] opacity-0 pointer-events-none"
            : ""
        }
        role="list"
        aria-label="Galerie de photos"
        aria-hidden={isInitialLoad}
      >
        <ResponsiveMasonry
          columnsCountBreakPoints={MASONRY_BREAKPOINTS}
          gutterBreakPoints={MASONRY_GUTTER_BREAKPOINTS}
        >
          <Masonry>
            {displayedItems.map((item, index) => {
              const startNewBatch = displayedCount - LOAD_MORE_COUNT;
              const isNewFromLoadMore =
                displayedCount > INITIAL_COUNT && index >= startNewBatch;
              const indexInBatch = index - startNewBatch;
              const rowIndex = Math.floor(indexInBatch / 3);
              const delayMs = isNewFromLoadMore ? rowIndex * 120 : 0;
              return (
                <figure
                  key={`${item.id}-${index}`}
                  className={
                    isNewFromLoadMore ? "gallery-item-new opacity-0" : ""
                  }
                  style={
                    isNewFromLoadMore
                      ? { animationDelay: `${delayMs}ms` }
                      : undefined
                  }
                  role="listitem"
                >
                  <button
                    type="button"
                    onClick={() => openLightbox(index)}
                    className="relative block w-full overflow-hidden rounded-xl border border-border bg-muted transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={`Voir ${item.caption} en grand`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- masonry needs native img for layout */}
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading={index < INITIAL_COUNT ? "eager" : "lazy"}
                      decoding="async"
                      className="h-auto w-full object-cover"
                      style={{ display: "block" }}
                      onLoad={handleImageLoad}
                    />
                  </button>
                  <figcaption className="mt-2 text-sm text-muted-foreground">
                    {item.caption}
                  </figcaption>
                </figure>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      {!isInitialLoad && hasMore && (
        <div ref={sentinelRef} className="h-4 w-full" aria-hidden />
      )}
      {!isInitialLoad && !hasMore && listToShow.length > 0 && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Fin de la galerie — {listToShow.length} photo
          {listToShow.length > 1 ? "s" : ""}.
        </p>
      )}

      {currentItem && (() => {
        const n = displayedItems.length;
        const prevIndex =
          lightboxIndex! === 0 ? n - 1 : lightboxIndex! - 1;
        const nextIndex =
          lightboxIndex! === n - 1 ? 0 : lightboxIndex! + 1;
        const indices = [prevIndex, lightboxIndex!, nextIndex] as const;

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 touch-none"
            role="dialog"
            aria-modal="true"
            aria-label={`Image ${lightboxIndex! + 1} sur ${n} : ${currentItem.caption}`}
            onClick={(e) => e.target === e.currentTarget && closeLightbox()}
            onTouchStart={handleLightboxTouchStart}
            onTouchMove={handleLightboxTouchMove}
            onTouchEnd={handleLightboxTouchEnd}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 rounded-md bg-white/10 px-3 py-1 text-white hover:bg-white/20 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Fermer"
            >
              Fermer
            </button>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-md bg-white/10 px-3 py-2 text-white hover:bg-white/20 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Image précédente"
            >
              ←
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-md bg-white/10 px-3 py-2 text-white hover:bg-white/20 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Image suivante"
            >
              →
            </button>
            <div
              className="relative z-0 h-full w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              role="presentation"
            >
              <div
                className="flex h-full w-full"
                style={{
                  width: "300vw",
                  transform: `translateX(calc(-100vw + ${dragDelta}px))`,
                  transition: isDragAnimating
                    ? "transform 0.3s ease-out"
                    : "none",
                }}
                onTransitionEnd={handleLightboxTransitionEnd}
              >
                {indices.map((idx) => {
                  const item = displayedItems[idx];
                  return (
                    <div
                      key={`${item.id}-${idx}`}
                      className="flex h-full w-screen shrink-0 items-center justify-center p-4"
                    >
                      <div className="flex max-h-[85vh] w-full flex-col items-center justify-center">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={1200}
                          height={800}
                          className="max-h-[85vh] w-auto object-contain"
                          priority={idx === lightboxIndex}
                        />
                        <p className="mt-2 text-center text-sm text-white/90">
                          {item.caption} — {idx + 1} / {n}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
