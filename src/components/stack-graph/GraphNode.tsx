"use client";

import { useCallback, useRef, useState } from "react";
import type { GraphNode as GraphNodeType } from "@/types/stack-graph";
import type { ExperienceLevel } from "@/types/stack-graph";
import { iconMap } from "@/components/stack-graph/icon-map";

type GraphNodeProps = {
  node: GraphNodeType;
  x: number;
  y: number;
  color: string;
  onDragStart?: (id: string, x: number, y: number) => void;
  onDragMove?: (id: string, x: number, y: number) => void;
  onDragEnd?: (id: string) => void;
};

// Circle radius per experience level — big spread for visual hierarchy
const RADIUS_BY_LEVEL: Record<ExperienceLevel, number> = {
  Expert: 34,
  Avancé: 26,
  Intermédiaire: 20,
  Notions: 14,
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

function clientToSVG(svg: SVGSVGElement, clientX: number, clientY: number) {
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  return pt.matrixTransform(svg.getScreenCTM()?.inverse());
}

export function GraphNode({
  node,
  x,
  y,
  color,
  onDragStart,
  onDragMove,
  onDragEnd,
}: GraphNodeProps): React.JSX.Element {
  const icon = iconMap[node.id];
  const r = RADIUS_BY_LEVEL[node.level];
  const iconSize = Math.round(r * 0.9);
  const filterId = `glow-${node.id}`;
  const shortLabel = SHORT_LABEL[node.id] ?? node.label;

  const draggingRef = useRef(false);
  const [hovered, setHovered] = useState(false);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<SVGGElement>) => {
      e.stopPropagation();
      const svg = (e.currentTarget as SVGGElement).ownerSVGElement;
      if (!svg) return;

      const svgPt = clientToSVG(svg, e.clientX, e.clientY);
      draggingRef.current = true;
      (e.currentTarget as SVGGElement).setPointerCapture(e.pointerId);
      onDragStart?.(node.id, svgPt.x, svgPt.y);
    },
    [node.id, onDragStart],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGGElement>) => {
      if (!draggingRef.current) return;
      const svg = (e.currentTarget as SVGGElement).ownerSVGElement;
      if (!svg) return;

      const svgPt = clientToSVG(svg, e.clientX, e.clientY);
      onDragMove?.(node.id, svgPt.x, svgPt.y);
    },
    [node.id, onDragMove],
  );

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
    onDragEnd?.(node.id);
  }, [node.id, onDragEnd]);

  return (
    <g
      transform={`translate(${x}, ${y})`}
      className="cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={color} floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Circle */}
      <circle r={r} fill={color} fillOpacity={0.95} filter={`url(#${filterId})`} />

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

      {/* Tooltip label on hover */}
      {hovered && (
        <g>
          <rect
            x={-node.label.length * 3.5 - 8}
            y={-r - 28}
            width={node.label.length * 7 + 16}
            height={22}
            rx={6}
            fill="var(--color-popover, #1a1a1a)"
            fillOpacity={0.92}
          />
          <text
            x={0}
            y={-r - 17}
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--color-popover-foreground, white)"
            fontSize={11}
            fontFamily="var(--font-dm-sans)"
          >
            {node.label}
          </text>
        </g>
      )}
    </g>
  );
}
