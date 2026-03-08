"use client";

import { useEffect, useRef, useState } from "react";

type Offset = { dx: number; dy: number };

const ZERO_OFFSETS = (count: number): Offset[] =>
  Array.from({ length: count }, () => ({ dx: 0, dy: 0 }));

const THROTTLE_MS = 1000 / 30; // ~30fps

export function useMicroMovement(
  nodeCount: number,
  isStabilized: boolean,
  prefersReducedMotion: boolean,
): Offset[] {
  const [offsets, setOffsets] = useState<Offset[]>(() => ZERO_OFFSETS(nodeCount));
  const phasesRef = useRef<number[] | null>(null);
  const rafRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    if (prefersReducedMotion || !isStabilized || nodeCount === 0) {
      setOffsets(ZERO_OFFSETS(nodeCount));
      return;
    }

    // Generate random phase offsets once
    if (!phasesRef.current || phasesRef.current.length !== nodeCount) {
      phasesRef.current = Array.from({ length: nodeCount }, () => Math.random() * Math.PI * 2);
    }

    const phases = phasesRef.current;

    function animate(time: number) {
      if (time - lastUpdateRef.current >= THROTTLE_MS) {
        lastUpdateRef.current = time;
        const next: Offset[] = new Array(nodeCount);
        for (let i = 0; i < nodeCount; i++) {
          next[i] = {
            dx: Math.sin(time * 0.001 + phases[i]) * 2,
            dy: Math.cos(time * 0.0007 + phases[i]) * 1.5,
          };
        }
        setOffsets(next);
      }
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [nodeCount, isStabilized, prefersReducedMotion]);

  return offsets;
}
