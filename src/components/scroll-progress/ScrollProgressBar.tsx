"use client";

import { useEffect, useRef } from "react";

/**
 * Fine progress bar fixed at the top of the viewport.
 * Width fill = scrollY / (scrollHeight - innerHeight).
 *
 * Mutates `transform: scaleX(ratio)` on a child element directly via rAF.
 * No React state -> 0 re-renders during scroll. The transform is GPU-composited.
 */
export function ScrollProgressBar(): React.JSX.Element {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    let rafId: number | null = null;

    const update = (): void => {
      rafId = null;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      fill.style.transform = `scaleX(${ratio})`;
    };

    const schedule = (): void => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-40 h-[2px] bg-transparent"
      aria-hidden
    >
      <div
        ref={fillRef}
        className="h-full w-full origin-left bg-primary will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
