import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void): () => void {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Returns true if the user prefers reduced motion, and follows live changes.
 * SSR-safe: reduced on the server and during hydration, so server and client markup match.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => !window.matchMedia(QUERY).matches,
    () => true,
  );
}
