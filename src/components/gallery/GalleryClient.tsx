"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { shuffle } from "@/utils/shuffle";
import type { GalleryItem } from "@/types/gallery";
import { GalleryGrid } from "./GalleryGrid";
import { Lightbox } from "./Lightbox";

const INITIAL_COUNT = 20;
const LOAD_MORE_COUNT = 6;

type GalleryClientProps = {
  items: GalleryItem[];
};

export function GalleryClient({ items }: GalleryClientProps): React.JSX.Element {
  // Premier rendu (SSR + hydratation) : même liste que le serveur (items, ordre stable).
  // Après montage client uniquement : mélange et affichage du pool mélangé.
  const [shuffledPool, setShuffledPool] = useState<GalleryItem[]>(() => items);
  const [hasMounted, setHasMounted] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(() => Math.min(INITIAL_COUNT, items.length));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const listToShow = hasMounted ? shuffledPool : items;
  const displayedItems = useMemo(
    () => listToShow.slice(0, displayedCount),
    [listToShow, displayedCount],
  );
  const hasMore = displayedCount < listToShow.length;

  useEffect(() => {
    queueMicrotask(() => {
      setShuffledPool(shuffle(items));
      setHasMounted(true);
    });
  }, [items]);

  const loadMore = useCallback(() => {
    setDisplayedCount((prev) => Math.min(prev + LOAD_MORE_COUNT, listToShow.length));
  }, [listToShow.length]);

  const openLightbox = useCallback((index: number): void => setLightboxIndex(index), []);
  const closeLightbox = useCallback((): void => setLightboxIndex(null), []);
  const goPrev = useCallback((): void => {
    setLightboxIndex((i) => (i === null ? null : i === 0 ? displayedItems.length - 1 : i - 1));
  }, [displayedItems.length]);
  const goNext = useCallback((): void => {
    setLightboxIndex((i) => (i === null ? null : i === displayedItems.length - 1 ? 0 : i + 1));
  }, [displayedItems.length]);

  // Placeholder identique serveur + premier rendu client pour éviter l'erreur d'hydratation.
  // ResponsiveMasonry/Masonry ne sont rendus qu'après montage (DOM différent selon viewport).
  if (!hasMounted) {
    return (
      <>
        <div
          className="flex min-h-[200px] items-center justify-center py-16"
          role="status"
          aria-label="Chargement de la galerie"
        >
          <span className="text-base font-medium text-foreground">Chargement…</span>
        </div>
        <div role="list" aria-label="Galerie de photos" className="min-h-[200px]" aria-hidden />
      </>
    );
  }

  return (
    <>
      <GalleryGrid
        items={displayedItems}
        totalCount={listToShow.length}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onOpenLightbox={openLightbox}
      />
      {lightboxIndex !== null && (
        <Lightbox
          items={displayedItems}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}
