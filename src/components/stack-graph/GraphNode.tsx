"use client";

import { useState, useCallback } from "react";
import { motion, useMotionValue } from "motion/react";
import type { GraphNode as GraphNodeType } from "@/types/stack-graph";
import type { ExperienceLevel } from "@/types/stack-graph";
import { iconMap } from "@/components/stack-graph/icon-map";

type GraphNodeProps = {
  node: GraphNodeType;
  x: number;
  y: number;
  color: string;
};

const SIZE_BY_LEVEL: Record<ExperienceLevel, { width: number; height: number; fontSize: number }> =
  {
    Expert: { width: 160, height: 40, fontSize: 14 },
    Avancé: { width: 140, height: 36, fontSize: 13 },
    Intermédiaire: { width: 120, height: 32, fontSize: 12 },
    Notions: { width: 100, height: 28, fontSize: 11 },
  };

const ICON_SIZE = 16;

const springTransition = { type: "spring" as const, stiffness: 300, damping: 15 };

export function GraphNode({ node, x, y, color }: GraphNodeProps): React.JSX.Element {
  const icon = iconMap[node.id];
  const { width: baseWidth, height, fontSize } = SIZE_BY_LEVEL[node.level];
  const filterId = `glow-${node.id}`;

  const [isDragging, setIsDragging] = useState(false);

  // Motion values for drag offset
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Narrower pill when no icon
  const pillWidth = icon ? baseWidth : baseWidth - 20;
  const rx = height / 2;

  // Icon positioning (left side of pill)
  const iconX = -pillWidth / 2 + rx / 2 + 2;
  const iconY = -ICON_SIZE / 2;

  // Text offset: shifted right when icon present, centered otherwise
  const textX = icon ? -pillWidth / 2 + ICON_SIZE + rx / 2 + 6 : 0;
  const textAnchor = icon ? ("start" as const) : ("middle" as const);

  const glowDeviation = isDragging ? 8 : 4;

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    // Spring back to origin
    dragX.set(0);
    dragY.set(0);
  }, [dragX, dragY]);

  return (
    <motion.g
      style={{ x: dragX, y: dragY, translateX: x, translateY: y }}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={{ x: 0, y: 0 }}
      transition={springTransition}
      whileDrag={{ scale: 1.05 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <defs>
        <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation={glowDeviation}
            floodColor={color}
            floodOpacity="0.2"
          />
        </filter>
      </defs>

      <rect
        x={-pillWidth / 2}
        y={-height / 2}
        width={pillWidth}
        height={height}
        rx={rx}
        ry={rx}
        fill={color}
        fillOpacity={0.95}
        filter={`url(#${filterId})`}
      />

      {icon && (
        <svg x={iconX} y={iconY} width={ICON_SIZE} height={ICON_SIZE} viewBox={icon.viewBox}>
          <path d={icon.path} fill="white" />
        </svg>
      )}

      <text
        x={textX}
        y={0}
        textAnchor={textAnchor}
        dominantBaseline="central"
        fill="white"
        fontSize={fontSize}
        fontFamily="var(--font-dm-sans)"
      >
        {node.label}
      </text>
    </motion.g>
  );
}
