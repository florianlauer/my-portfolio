"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseSwipeOptions = {
  onPrev: () => void;
  onNext: () => void;
};

type UseSwipeReturn = {
  dragDelta: number;
  isDragAnimating: boolean;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
  handleTransitionEnd: (e: React.TransitionEvent) => void;
};

const SWIPE_THRESHOLD_PX = 50;

export function useSwipe({ onPrev, onNext }: UseSwipeOptions): UseSwipeReturn {
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragAnimating, setIsDragAnimating] = useState(false);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const containerWidthRef = useRef(1000);
  const rafIdRef = useRef<number | null>(null);
  const latestDragRef = useRef(0);
  const pendingDirectionRef = useRef<"prev" | "next" | null>(null);

  // use-latest pattern : callbacks stables sans dépendances
  const callbacksRef = useRef({ onPrev, onNext });
  useEffect(() => {
    callbacksRef.current = { onPrev, onNext };
  });

  useEffect(() => {
    const updateWidth = (): void => {
      containerWidthRef.current = window.innerWidth;
    };
    updateWidth();
    window.addEventListener("resize", updateWidth, { passive: true });
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) touchStartRef.current = { x: t.clientX, y: t.clientY };
    latestDragRef.current = 0;
    setIsDragAnimating(false);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
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

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
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
  }, []);

  const handleTransitionEnd = useCallback((e: React.TransitionEvent) => {
    if (e.propertyName !== "transform") return;
    const pending = pendingDirectionRef.current;
    pendingDirectionRef.current = null;
    setIsDragAnimating(false);
    setDragDelta(0);
    if (pending === "prev") callbacksRef.current.onPrev();
    if (pending === "next") callbacksRef.current.onNext();
  }, []);

  return {
    dragDelta,
    isDragAnimating,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleTransitionEnd,
  };
}
