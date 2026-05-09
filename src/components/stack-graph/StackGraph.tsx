"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { select } from "d3-selection";
import { zoom, zoomIdentity } from "d3-zoom";
import type { ZoomBehavior } from "d3-zoom";
import "d3-transition";
import type { StackGraph as StackGraphType } from "@/types/stack-graph";
import type { StackFamilyKey } from "@/types/stack";
import { useForceLayout } from "@/components/stack-graph/use-force-layout";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { GraphNode } from "@/components/stack-graph/GraphNode";
import { GraphEdge } from "@/components/stack-graph/GraphEdge";
import { GraphLegend } from "@/components/stack-graph/GraphLegend";
import { GraphTooltip } from "@/components/stack-graph/GraphTooltip";
import { GraphFilters } from "@/components/stack-graph/GraphFilters";
import { StackGraphSRList } from "@/components/stack-graph/StackGraphSRList";
import {
  CLICK_THRESHOLD,
  NODE_RADIUS_BY_LEVEL,
  TOOLTIP_NODE_OFFSET_PX,
} from "@/components/stack-graph/constants";
import type { SimNode } from "@/components/stack-graph/use-force-layout";

type StackGraphProps = {
  data: StackGraphType;
};

// Filter groups: each pill key maps to families it controls
const FILTER_GROUPS: Record<string, StackFamilyKey[]> = {
  frontend: ["frontend", "mobile"],
  backend: ["backend", "data"],
  devops: ["infra", "integrations"],
};

export function StackGraph({ data }: StackGraphProps): React.JSX.Element {
  const t = useTranslations("stack");
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Entry animation: false during initial mount, true after first paint.
  // Combined with `reducedMotion`, this drives the staggered fade-in in GraphNode.
  const [entered, setEntered] = useState(false);

  // Zoom/pan refs — no useState to avoid 60fps re-renders
  const svgRef = useRef<SVGSVGElement>(null);
  const bgRectRef = useRef<SVGRectElement>(null);
  const innerGRef = useRef<SVGGElement>(null);
  const zoomRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // Track bg pointer-down position to distinguish click-on-empty from end-of-pan
  const bgPointerDownPos = useRef<{ x: number; y: number } | null>(null);

  // Focus/highlight state (click-to-focus highlighting)
  const [focusedId, setFocusedId] = useState<string | null>(null);

  // Hover state for tooltip
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Tooltip position state (container-relative)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Filter state — all 3 active by default
  const [activeFilters, setActiveFilters] = useState<Set<string>>(
    () => new Set(["frontend", "backend", "devops"]),
  );

  // Preset "ma stack typique" — purely visual highlight, independent of filter pills.
  const [presetActive, setPresetActive] = useState(false);

  const reducedMotion = usePrefersReducedMotion();

  // Trigger entry animation on next paint. requestAnimationFrame ensures the
  // initial render with entered=false commits to the DOM before we flip,
  // so the CSS transition has both states to interpolate between.
  // Reduced motion: skip the delay, set entered immediately (transition is
  // also disabled in GraphNode under reducedMotion, see Task 2).
  useEffect(() => {
    if (reducedMotion) {
      setEntered(true);
      return;
    }
    let rafId: number | null = null;
    const timeoutId = window.setTimeout(() => {
      rafId = window.requestAnimationFrame(() => setEntered(true));
    }, 50);
    return () => {
      window.clearTimeout(timeoutId);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

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

  const mutableNodes = useMemo(() => [...data.nodes], [data.nodes]);
  const mutableEdges = useMemo(() => [...data.edges], [data.edges]);

  const { positions, dragStart, dragMove, dragEnd, filterNodes } = useForceLayout(
    mutableNodes,
    mutableEdges,
    size.width,
    size.height,
    reducedMotion,
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

  // Set up zoom behavior — attached to the SVG so wheel events from anywhere
  // inside (including over nodes) are captured and preventDefault'd. Pan
  // (mousedown/touchstart) is filtered to only start on the background rect,
  // so node drags aren't hijacked.
  useEffect(() => {
    const svgEl = svgRef.current;
    const bgRect = bgRectRef.current;
    const innerG = innerGRef.current;
    if (!svgEl || !bgRect || !innerG) return;

    const zoomBehavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .filter((event) => {
        // Wheel: always allow (zoom + preventDefault page scroll)
        if (event.type === "wheel") return true;
        // Pan: only when initiated on the background rect, not on a node
        return event.target === bgRect;
      })
      .on("zoom", (event) => {
        // Direct DOM mutation — no setState, no React re-render
        innerG.setAttribute("transform", event.transform.toString());
      });

    zoomRef.current = zoomBehavior;
    select(svgEl).call(zoomBehavior);
    // Disable d3-zoom's built-in double-click zoom (we handle it ourselves)
    select(svgEl).on("dblclick.zoom", null);

    return () => {
      select(svgEl).on(".zoom", null);
    };
  }, [size.width, size.height]);

  const handleBgDoubleClick = () => {
    const svgEl = svgRef.current;
    const zoomBehavior = zoomRef.current;
    if (!svgEl || !zoomBehavior) return;
    if (reducedMotion) {
      select(svgEl).call(zoomBehavior.transform, zoomIdentity);
    } else {
      select(svgEl).transition().duration(300).call(zoomBehavior.transform, zoomIdentity);
    }
  };

  // Bg click handler: only clear focus when the gesture was a real click,
  // not the tail of a d3-zoom pan (which fires mousedown→move→up→click).
  const handleBgPointerDown = (e: React.PointerEvent<SVGRectElement>) => {
    bgPointerDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleBgClick = (e: React.MouseEvent<SVGRectElement>) => {
    const down = bgPointerDownPos.current;
    bgPointerDownPos.current = null;
    if (!down) return;
    const dx = e.clientX - down.x;
    const dy = e.clientY - down.y;
    if (Math.hypot(dx, dy) < CLICK_THRESHOLD) {
      setFocusedId(null);
    }
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
    if (neighborSet !== null) {
      return neighborSet.has(nodeId) ? 1 : 0.15;
    }
    if (presetActive) {
      return presetSet.has(nodeId) ? 1 : 0.2;
    }
    return 1;
  };

  const getEdgeOpacity = (source: string, target: string): number => {
    if (neighborSet !== null) {
      return neighborSet.has(source) && neighborSet.has(target) ? 1 : 0.15;
    }
    if (presetActive) {
      return presetSet.has(source) && presetSet.has(target) ? 1 : 0.2;
    }
    return 1;
  };

  // Compute which nodes are active given the current filter state
  const activeNodeIds = useMemo<Set<string>>(() => {
    const activeFamilies = new Set<StackFamilyKey>();
    for (const filterKey of activeFilters) {
      const families = FILTER_GROUPS[filterKey];
      if (families) {
        for (const f of families) activeFamilies.add(f);
      }
    }
    const ids = new Set<string>();
    for (const node of data.nodes) {
      // Methods family always visible
      if (node.family === "methods" || activeFamilies.has(node.family)) {
        ids.add(node.id);
      }
    }
    return ids;
  }, [activeFilters, data.nodes]);

  const presetSet = useMemo<Set<string>>(() => {
    return new Set(data.presetTypicalStack);
  }, [data.presetTypicalStack]);

  // Apply filter to running simulation when activeFilters changes
  useEffect(() => {
    filterNodes(activeNodeIds);
  }, [activeNodeIds, filterNodes]);

  // Clear focus if focused node got filtered out
  useEffect(() => {
    if (focusedId !== null && !activeNodeIds.has(focusedId)) {
      setFocusedId(null);
    }
  }, [activeNodeIds, focusedId]);

  // Compute tooltip data for hovered node
  const tooltipData = useMemo(() => {
    if (!hoveredId) return { node: null, neighbors: [] };
    const node = data.nodes.find((n) => n.id === hoveredId) ?? null;
    if (!node) return { node: null, neighbors: [] };

    const neighborIds = new Set<string>();
    for (const edge of data.edges) {
      if (edge.source === hoveredId) neighborIds.add(edge.target);
      if (edge.target === hoveredId) neighborIds.add(edge.source);
    }
    const neighbors = data.nodes
      .filter((n) => neighborIds.has(n.id))
      .map((n) => ({ id: n.id, family: n.family }));

    return { node, neighbors };
  }, [hoveredId, data.nodes, data.edges]);

  // Compute tooltip screen position using getScreenCTM on inner g
  const computeTooltipPosition = (nodeId: string) => {
    const svgEl = svgRef.current;
    const innerG = innerGRef.current;
    const container = containerRef.current;
    if (!svgEl || !innerG || !container) return;

    const simNode = positions.find((p) => p.id === nodeId);
    if (!simNode) return;

    const nodeRadius = NODE_RADIUS_BY_LEVEL[simNode.level] ?? 20;

    const pt = svgEl.createSVGPoint();
    pt.x = simNode.x;
    pt.y = simNode.y - nodeRadius - TOOLTIP_NODE_OFFSET_PX;

    const ctm = innerG.getScreenCTM();
    if (!ctm) return;
    const screenPt = pt.matrixTransform(ctm);

    const containerRect = container.getBoundingClientRect();
    setTooltipPos({
      x: screenPt.x - containerRect.left,
      y: screenPt.y - containerRect.top,
    });
  };

  // Recompute position when hoveredId changes
  useEffect(() => {
    if (hoveredId) {
      computeTooltipPosition(hoveredId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- computeTooltipPosition reads only refs and the captured `positions`; both are listed in deps.
  }, [hoveredId, positions]);

  // Filter toggle handler — enforce at-least-1 active
  const handleFilterToggle = (key: string) => {
    setActiveFilters((prev) => {
      if (prev.has(key)) {
        // Prevent deactivating last filter
        if (prev.size <= 1) return prev;
        const next = new Set(prev);
        next.delete(key);
        return next;
      } else {
        const next = new Set(prev);
        next.add(key);
        return next;
      }
    });
  };

  // Derive filter pill data from familyColors
  const filterPills = [
    {
      key: "frontend",
      label: t("filterPills.frontend"),
      color: data.familyColors.find((fc) => fc.family === "frontend")?.color ?? "#888",
    },
    {
      key: "backend",
      label: t("filterPills.backend"),
      color: data.familyColors.find((fc) => fc.family === "backend")?.color ?? "#888",
    },
    {
      key: "devops",
      label: t("filterPills.devops"),
      color: data.familyColors.find((fc) => fc.family === "infra")?.color ?? "#888",
    },
  ];

  return (
    <div className="flex flex-col">
      <GraphFilters
        filters={filterPills}
        activeFilters={activeFilters}
        onToggle={handleFilterToggle}
        presetActive={presetActive}
        onPresetToggle={() => setPresetActive((prev) => !prev)}
        presetLabel={t("filterPills.preset")}
      />
      <div ref={containerRef} className="relative w-full aspect-[3/4] md:aspect-[4/3]">
        {size.width > 0 && size.height > 0 && (
          <svg
            ref={svgRef}
            viewBox={`0 0 ${size.width} ${size.height}`}
            className="w-full h-full"
            overflow="hidden"
            aria-hidden="true"
          >
            {/* Shared filters: one drop-shadow per family (≤8) instead of per node (39+) */}
            <defs>
              {data.familyColors.map((fc) => (
                <filter
                  key={fc.family}
                  id={`glow-${fc.family}`}
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="4"
                    floodColor={fc.color}
                    floodOpacity="0.25"
                  />
                </filter>
              ))}
            </defs>
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
              onPointerDown={handleBgPointerDown}
              onClick={handleBgClick}
              onDoubleClick={handleBgDoubleClick}
            />
            {/* Inner g: receives zoom transform via direct DOM setAttribute */}
            <g ref={innerGRef}>
              <g>
                {data.edges.map((edge) => {
                  const source = posMap.get(edge.source);
                  const target = posMap.get(edge.target);
                  if (!source || !target) return null;
                  const isHighlighted =
                    neighborSet !== null &&
                    neighborSet.has(edge.source) &&
                    neighborSet.has(edge.target);
                  return (
                    <GraphEdge
                      key={`${edge.source}-${edge.target}`}
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      opacity={getEdgeOpacity(edge.source, edge.target)}
                      highlighted={isHighlighted}
                      reducedMotion={reducedMotion}
                    />
                  );
                })}
              </g>
              <g>
                {positions.map((pos, index) => (
                  <GraphNode
                    key={pos.id}
                    node={pos}
                    x={pos.x}
                    y={pos.y}
                    color={colorMap.current.get(pos.family) ?? "#888"}
                    zoomGroupRef={innerGRef}
                    onDragStart={dragStart}
                    onDragMove={dragMove}
                    onDragEnd={dragEnd}
                    onNodeClick={setFocusedId}
                    onHoverChange={setHoveredId}
                    opacity={getNodeOpacity(pos.id)}
                    entered={entered}
                    enterDelay={Math.min(index * 25, 600)}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </g>
            </g>
          </svg>
        )}
        <GraphTooltip
          node={tooltipData.node}
          neighbors={tooltipData.neighbors}
          position={tooltipPos}
          visible={hoveredId !== null && tooltipData.node !== null}
          familyColorMap={colorMap.current}
          containerWidth={size.width}
        />
        <GraphLegend familyColors={data.familyColors} />
      </div>
      <StackGraphSRList
        nodes={data.nodes.filter((n) => activeNodeIds.has(n.id))}
        edges={data.edges}
      />
    </div>
  );
}
