"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { select } from "d3-selection";
import { zoom, zoomIdentity } from "d3-zoom";
import type { ZoomBehavior, ZoomTransform } from "d3-zoom";
import "d3-transition";
import type { StackGraph as StackGraphType } from "@/types/stack-graph";
import type { StackFamilyKey } from "@/types/stack";
import { useForceLayout } from "@/components/stack-graph/use-force-layout";
import { GraphNode } from "@/components/stack-graph/GraphNode";
import { GraphEdge } from "@/components/stack-graph/GraphEdge";
import { GraphLegend } from "@/components/stack-graph/GraphLegend";
import type { SimNode } from "@/components/stack-graph/use-force-layout";

type StackGraphProps = {
  data: StackGraphType;
};

export function StackGraph({ data }: StackGraphProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Zoom/pan refs — no useState to avoid 60fps re-renders
  const svgRef = useRef<SVGSVGElement>(null);
  const bgRectRef = useRef<SVGRectElement>(null);
  const innerGRef = useRef<SVGGElement>(null);
  const zoomRef = useRef<ZoomBehavior<SVGRectElement, unknown> | null>(null);
  // Exposed for Plan 02 tooltip positioning
  const transformRef = useRef<ZoomTransform>(zoomIdentity);

  // Focus/highlight state
  const [focusedId, setFocusedId] = useState<string | null>(null);

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

  const { positions, dragStart, dragMove, dragEnd } = useForceLayout(
    data.nodes,
    data.edges,
    size.width,
    size.height,
  );

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

  // Set up zoom behavior — only once (empty deps), stable behavior
  useEffect(() => {
    const bgRect = bgRectRef.current;
    const innerG = innerGRef.current;
    if (!bgRect || !innerG) return;

    const zoomBehavior = zoom<SVGRectElement, unknown>()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        // Direct DOM mutation — no setState, no React re-render
        innerG.setAttribute("transform", event.transform.toString());
        transformRef.current = event.transform;
      });

    zoomRef.current = zoomBehavior;
    select(bgRect).call(zoomBehavior);
    // Disable d3-zoom's built-in double-click zoom (we handle it ourselves)
    select(bgRect).on("dblclick.zoom", null);

    return () => {
      select(bgRect).on(".zoom", null);
    };
  }, []);

  const handleBgDoubleClick = () => {
    const bgRect = bgRectRef.current;
    const zoomBehavior = zoomRef.current;
    if (!bgRect || !zoomBehavior) return;
    select(bgRect).transition().duration(300).call(zoomBehavior.transform, zoomIdentity);
  };

  // Adjacency computation for focus highlighting
  const neighborSet = useMemo<Set<string> | null>(() => {
    if (focusedId === null) return null;
    const neighbors = new Set<string>();
    neighbors.add(focusedId);
    for (const edge of data.edges) {
      if (edge.source === focusedId) neighbors.add(edge.target);
      if (edge.target === focusedId) neighbors.add(edge.source);
    }
    return neighbors;
  }, [focusedId, data.edges]);

  const getNodeOpacity = (nodeId: string): number => {
    if (neighborSet === null) return 1;
    return neighborSet.has(nodeId) ? 1 : 0.15;
  };

  const getEdgeOpacity = (source: string, target: string): number => {
    if (neighborSet === null) return 1;
    return neighborSet.has(source) && neighborSet.has(target) ? 1 : 0.15;
  };

  return (
    <div ref={containerRef} className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
      {size.width > 0 && size.height > 0 && (
        <svg
          ref={svgRef}
          viewBox={`0 0 ${size.width} ${size.height}`}
          className="w-full h-full"
          overflow="hidden"
          aria-label="Graphe interactif de la stack technique de Florian"
        >
          {/* Background rect: zoom/pan target, click to clear focus */}
          <rect
            ref={bgRectRef}
            x={0}
            y={0}
            width={size.width}
            height={size.height}
            fill="transparent"
            pointerEvents="all"
            style={{ cursor: "grab" }}
            onClick={() => setFocusedId(null)}
            onDoubleClick={handleBgDoubleClick}
          />
          {/* Inner g: receives zoom transform via direct DOM setAttribute */}
          <g ref={innerGRef}>
            <g>
              {data.edges.map((edge) => {
                const source = posMap.get(edge.source);
                const target = posMap.get(edge.target);
                if (!source || !target) return null;
                return (
                  <GraphEdge
                    key={`${edge.source}-${edge.target}`}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    opacity={getEdgeOpacity(edge.source, edge.target)}
                  />
                );
              })}
            </g>
            <g>
              {positions.map((pos) => (
                <GraphNode
                  key={pos.id}
                  node={pos}
                  x={pos.x}
                  y={pos.y}
                  color={colorMap.current.get(pos.family) ?? "#888"}
                  onDragStart={dragStart}
                  onDragMove={dragMove}
                  onDragEnd={dragEnd}
                  onNodeClick={setFocusedId}
                  opacity={getNodeOpacity(pos.id)}
                />
              ))}
            </g>
          </g>
        </svg>
      )}
      <GraphLegend familyColors={data.familyColors} />
    </div>
  );
}
