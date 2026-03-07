"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import type { GalleryItem } from "@/types/gallery";

const INITIAL_COUNT = 20;
const LOAD_MORE_COUNT = 6;

const MASONRY_BREAKPOINTS = { 0: 1, 640: 2, 1024: 3 };
const MASONRY_GUTTER_BREAKPOINTS = { 0: "1rem", 640: "1rem", 1024: "1rem" };

type GalleryGridProps = {
  items: GalleryItem[];
  totalCount: number;
  hasMore: boolean;
  onLoadMore: () => void;
  onOpenLightbox: (index: number) => void;
};

export function GalleryGrid({
  items,
  totalCount,
  hasMore,
  onLoadMore,
  onOpenLightbox,
}: GalleryGridProps): React.JSX.Element {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadedCountRef = useRef(0);
  const expectedCountRef = useRef(items.length);

  useEffect(() => {
    if (items.length === 0) {
      queueMicrotask(() => setIsInitialLoad(false));
      return;
    }
    if (!isInitialLoad) return;
    loadedCountRef.current = 0;
    expectedCountRef.current = items.length;
  }, [items, isInitialLoad]);

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

  useEffect(() => {
    if (isInitialLoad || !hasMore || items.length === 0) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onLoadMore();
      },
      { rootMargin: "200px", threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isInitialLoad, onLoadMore, hasMore, items.length]);

  return (
    <>
      {isInitialLoad && (
        <div
          className="flex min-h-[200px] items-center justify-center py-16"
          role="status"
          aria-label="Chargement de la galerie"
        >
          <span className="text-base font-medium text-foreground">Chargement…</span>
        </div>
      )}

      <div
        className={
          isInitialLoad ? "absolute left-[-9999px] opacity-0 pointer-events-none" : ""
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
            {items.map((item, index) => {
              const startNewBatch = items.length - LOAD_MORE_COUNT;
              const isNewFromLoadMore =
                items.length > INITIAL_COUNT && index >= startNewBatch;
              const indexInBatch = index - startNewBatch;
              const rowIndex = Math.floor(indexInBatch / 3);
              const delayMs = isNewFromLoadMore ? rowIndex * 120 : 0;
              return (
                <figure
                  key={`${item.id}-${index}`}
                  className={isNewFromLoadMore ? "gallery-item-new opacity-0" : ""}
                  style={isNewFromLoadMore ? { animationDelay: `${delayMs}ms` } : undefined}
                  role="listitem"
                >
                  <button
                    type="button"
                    onClick={() => onOpenLightbox(index)}
                    className="relative block w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-muted transition-transform pointer-hover:scale-[1.02] focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
      {!isInitialLoad && !hasMore && items.length > 0 && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Fin de la galerie — {totalCount} photo{totalCount > 1 ? "s" : ""}.
        </p>
      )}
      {!isInitialLoad && items.length === 0 && (
        <p className="py-16 text-center text-base text-muted-foreground">
          Aucune photo pour le moment.
        </p>
      )}
    </>
  );
}
