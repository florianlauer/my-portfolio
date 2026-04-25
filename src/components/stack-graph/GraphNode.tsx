"use client";

import { memo, useCallback, useRef } from "react";
import type { GraphNode as GraphNodeType } from "@/types/stack-graph";
import { iconMap } from "@/components/stack-graph/icon-map";
import {
  CLICK_THRESHOLD,
  MIN_TOUCH_RADIUS,
  NODE_RADIUS_BY_LEVEL,
} from "@/components/stack-graph/constants";

type GraphNodeProps = {
  node: GraphNodeType;
  x: number;
  y: number;
  color: string;
  opacity?: number;
  zoomGroupRef: React.RefObject<SVGGElement | null>;
  onDragStart?: (id: string, x: number, y: number) => void;
  onDragMove?: (id: string, x: number, y: number) => void;
  onDragEnd?: (id: string) => void;
  onNodeClick?: (id: string) => void;
  onHoverChange?: (id: string | null) => void;
};

// Short labels for nodes without icons
const SHORT_LABEL: Record<string, string> = {
  tdd: "TDD",
  ddd: "DDD",
  cqrs: "CQRS",
  aws: "AWS",
  hexagonal: "Hexa",
  "clean-architecture": "Clean",
  microservices: "Micro",
  "capacitor-plugin": "Plug.",
  chargebee: "CB",
};

function clientToSVG(zoomGroup: SVGGElement, clientX: number, clientY: number) {
  const svg = zoomGroup.ownerSVGElement!;
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  // Use the zoom group CTM — includes zoom transform but not individual node translate
  return pt.matrixTransform(zoomGroup.getScreenCTM()?.inverse());
}

function GraphNodeImpl({
  node,
  x,
  y,
  color,
  opacity,
  zoomGroupRef,
  onDragStart,
  onDragMove,
  onDragEnd,
  onNodeClick,
  onHoverChange,
}: GraphNodeProps): React.JSX.Element {
  const icon = iconMap[node.id];
  const r = NODE_RADIUS_BY_LEVEL[node.level];
  const iconSize = Math.round(r * 0.9);
  const shortLabel = SHORT_LABEL[node.id] ?? node.label;
  // Hit-area: at least MIN_TOUCH_RADIUS to satisfy WCAG 2.5.5 (44×44 minimum)
  const hitRadius = Math.max(r, MIN_TOUCH_RADIUS);

  const draggingRef = useRef(false);
  // Track pointer position at down for click vs drag detection
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<SVGGElement>) => {
      e.stopPropagation();
      const zg = zoomGroupRef.current;
      if (!zg) return;

      pointerDownPos.current = { x: e.clientX, y: e.clientY };
      const svgPt = clientToSVG(zg, e.clientX, e.clientY);
      draggingRef.current = true;
      (e.currentTarget as SVGGElement).setPointerCapture(e.pointerId);
      onDragStart?.(node.id, svgPt.x, svgPt.y);
    },
    [node.id, onDragStart, zoomGroupRef],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGGElement>) => {
      if (!draggingRef.current) return;
      const zg = zoomGroupRef.current;
      if (!zg) return;

      const svgPt = clientToSVG(zg, e.clientX, e.clientY);
      onDragMove?.(node.id, svgPt.x, svgPt.y);
    },
    [node.id, onDragMove, zoomGroupRef],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<SVGGElement>) => {
      draggingRef.current = false;
      onDragEnd?.(node.id);

      // Click vs drag detection: only fire onNodeClick if pointer moved < CLICK_THRESHOLD
      if (pointerDownPos.current) {
        const dx = e.clientX - pointerDownPos.current.x;
        const dy = e.clientY - pointerDownPos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < CLICK_THRESHOLD) {
          onNodeClick?.(node.id);
        }
      }
      pointerDownPos.current = null;
    },
    [node.id, onDragEnd, onNodeClick],
  );

  return (
    <g
      transform={`translate(${x}, ${y})`}
      className="cursor-grab active:cursor-grabbing"
      style={{ opacity: opacity ?? 1, transition: "opacity 200ms ease" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerEnter={() => onHoverChange?.(node.id)}
      onPointerLeave={() => onHoverChange?.(null)}
    >
      {/* Hit area: invisible circle that guarantees a 44×44 touch target */}
      <circle r={hitRadius} fill="transparent" pointerEvents="all" />

      {/* Visible circle — drop-shadow filter is hoisted into StackGraph <defs> as glow-${family} */}
      <circle r={r} fill={color} fillOpacity={0.95} filter={`url(#glow-${node.family})`} />

      {/* Icon or abbreviation */}
      {icon ? (
        <svg
          x={-iconSize / 2}
          y={-iconSize / 2}
          width={iconSize}
          height={iconSize}
          viewBox={icon.viewBox}
        >
          <path d={icon.path} fill="white" />
        </svg>
      ) : (
        <text
          x={0}
          y={0}
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontSize={Math.min(
            Math.round(r * 0.7),
            Math.round((r * 1.6) / Math.max(shortLabel.length * 0.55, 1)),
          )}
          fontWeight={600}
          fontFamily="var(--font-dm-sans)"
        >
          {shortLabel}
        </text>
      )}
    </g>
  );
}

export const GraphNode = memo(GraphNodeImpl, (prev, next) => {
  return (
    prev.x === next.x &&
    prev.y === next.y &&
    prev.color === next.color &&
    prev.opacity === next.opacity &&
    prev.node === next.node &&
    prev.onDragStart === next.onDragStart &&
    prev.onDragMove === next.onDragMove &&
    prev.onDragEnd === next.onDragEnd &&
    prev.onNodeClick === next.onNodeClick &&
    prev.onHoverChange === next.onHoverChange &&
    prev.zoomGroupRef === next.zoomGroupRef
  );
});
