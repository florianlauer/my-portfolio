"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /**
   * When true, render in the "visible" state immediately at mount,
   * skipping the IntersectionObserver. Use for elements that are guaranteed
   * to be in the viewport at first paint (e.g. Hero) to avoid a flash and
   * preserve LCP.
   */
  immediate?: boolean;
};

export function ScrollReveal({
  children,
  className,
  immediate = false,
}: ScrollRevealProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(immediate);

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setIsVisible(true);
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <div
      ref={ref}
      className={cn(
        "scroll-reveal transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
        isVisible
          ? "scroll-reveal-visible"
          : "scroll-reveal-hidden will-change-[opacity,transform] motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:scale-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
