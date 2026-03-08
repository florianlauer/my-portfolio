"use client";

import { useEffect, useRef, useState } from "react";
import type { StackGraph as StackGraphType } from "@/types/stack-graph";
import type { StackFamilyKey } from "@/types/stack";
import { useForceLayout } from "@/components/stack-graph/use-force-layout";
import { useMicroMovement } from "@/components/stack-graph/use-micro-movement";
import { GraphNode } from "@/components/stack-graph/GraphNode";
import { GraphEdge } from "@/components/stack-graph/GraphEdge";
import { GraphLegend } from "@/components/stack-graph/GraphLegend";
import type { SimNode } from "@/components/stack-graph/use-force-layout";

type StackGraphProps = {
  data: StackGraphType;
};

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export function StackGraph({ data }: StackGraphProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Observe container size
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setSize({ width: Math.round(width), height: Math.round(height) });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { positions, isStabilized } = useForceLayout(
    data.nodes,
    data.edges,
    size.width,
    size.height,
  );

  const prefersReducedMotion = usePrefersReducedMotion();
  const offsets = useMicroMovement(data.nodes.length, isStabilized, prefersReducedMotion);

  // Color lookup by family
  const colorMap = useRef<Map<StackFamilyKey, string>>(new Map());
  if (colorMap.current.size === 0) {
    for (const fc of data.familyColors) {
      colorMap.current.set(fc.family, fc.color);
    }
  }

  // Position lookup by node ID for edge rendering
  const posMap = new Map<string, SimNode>();
  for (const pos of positions) {
    posMap.set(pos.id, pos);
  }

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[60vh]">
      {size.width > 0 && size.height > 0 && (
        <svg
          viewBox={`0 0 ${size.width} ${size.height}`}
          className="w-full h-full"
          overflow="visible"
          aria-label="Graphe interactif de la stack technique de Florian"
        >
          <g>
            {data.edges.map((edge) => {
              const source = posMap.get(edge.source);
              const target = posMap.get(edge.target);
              if (!source || !target) return null;
              const si = positions.indexOf(source);
              const ti = positions.indexOf(target);
              return (
                <GraphEdge
                  key={`${edge.source}-${edge.target}`}
                  x1={source.x + (offsets[si]?.dx ?? 0)}
                  y1={source.y + (offsets[si]?.dy ?? 0)}
                  x2={target.x + (offsets[ti]?.dx ?? 0)}
                  y2={target.y + (offsets[ti]?.dy ?? 0)}
                />
              );
            })}
          </g>
          <g>
            {positions.map((pos, i) => (
              <GraphNode
                key={pos.id}
                node={pos}
                x={pos.x + (offsets[i]?.dx ?? 0)}
                y={pos.y + (offsets[i]?.dy ?? 0)}
                color={colorMap.current.get(pos.family) ?? "#888"}
              />
            ))}
          </g>
        </svg>
      )}
      <GraphLegend familyColors={data.familyColors} />
    </div>
  );
}
