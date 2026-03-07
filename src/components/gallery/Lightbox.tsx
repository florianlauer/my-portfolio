"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSwipe } from "@/hooks/useSwipe";
import type { GalleryItem } from "@/types/gallery";

type LightboxProps = {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps): React.JSX.Element | null {
  const n = items.length;
  const currentItem = items[currentIndex];

  const {
    dragDelta,
    isDragAnimating,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleTransitionEnd,
  } = useSwipe({ onPrev, onNext });

  // use-latest : keyboard listener enregistré une seule fois
  const callbacksRef = useRef({ onClose, onPrev, onNext });
  useEffect(() => {
    callbacksRef.current = { onClose, onPrev, onNext };
  });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") callbacksRef.current.onClose();
      if (e.key === "ArrowLeft") callbacksRef.current.onPrev();
      if (e.key === "ArrowRight") callbacksRef.current.onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const prevIndex = currentIndex === 0 ? n - 1 : currentIndex - 1;
  const nextIndex = currentIndex === n - 1 ? 0 : currentIndex + 1;
  const indices = [prevIndex, currentIndex, nextIndex] as const;

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 touch-none cursor-pointer"
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${currentIndex + 1} sur ${n} : ${currentItem?.caption ?? ""}`}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 cursor-pointer rounded-md bg-white/10 px-3 py-1 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Fermer"
      >
        Fermer
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-md bg-white/10 px-3 py-2 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Image précédente"
      >
        ←
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-md bg-white/10 px-3 py-2 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Image suivante"
      >
        →
      </button>

      <div
        className="relative z-0 h-full w-full overflow-hidden"
        role="presentation"
      >
        <div
          className="flex h-full"
          style={{
            width: "300vw",
            transform: `translateX(calc(-100vw + ${dragDelta}px))`,
            transition: isDragAnimating ? "transform 0.3s ease-out" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {indices.map((idx) => {
            const item = items[idx];
            if (!item) return null;
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
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="max-h-[85vh] w-auto object-contain"
                    priority={idx === currentIndex}
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
    </div>,
    document.body
  );
}
