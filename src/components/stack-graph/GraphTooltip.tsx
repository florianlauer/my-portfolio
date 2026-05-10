"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { GraphNode } from "@/types/stack-graph";
import type { StackFamilyKey } from "@/types/stack";
import { TOOLTIP_EDGE_PADDING_PX, TOOLTIP_MAX_WIDTH_PX } from "@/components/stack-graph/constants";

type TooltipNeighbor = {
  id: string;
  family: StackFamilyKey;
};

type GraphTooltipProps = {
  node: GraphNode | null;
  neighbors: TooltipNeighbor[];
  position: { x: number; y: number };
  visible: boolean;
  familyColorMap: Map<StackFamilyKey, string>;
  containerWidth: number;
};

export function GraphTooltip({
  node,
  neighbors,
  position,
  visible,
  familyColorMap,
  containerWidth,
}: GraphTooltipProps): React.JSX.Element {
  const t = useTranslations("stack");
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!visible || !tooltipRef.current) return;
    const height = tooltipRef.current.offsetHeight;
    setFlipped(position.y - height < TOOLTIP_EDGE_PADDING_PX);
  }, [visible, position.y, node?.id]);

  // The tooltip is centered horizontally on `left` via `translate(-50%, ...)`,
  // so the actual left edge sits at `left - width/2`. Clamp the center so the
  // box stays within [EDGE_PADDING, containerWidth - EDGE_PADDING]. On narrow
  // containers (mobile) where the tooltip is wider than the available room,
  // fall back to centering.
  const tooltipWidth = Math.min(TOOLTIP_MAX_WIDTH_PX, containerWidth - TOOLTIP_EDGE_PADDING_PX * 2);
  const halfWidth = tooltipWidth / 2;
  const minX = TOOLTIP_EDGE_PADDING_PX + halfWidth;
  const maxX = containerWidth - TOOLTIP_EDGE_PADDING_PX - halfWidth;
  const clampedX = minX > maxX ? containerWidth / 2 : Math.max(minX, Math.min(position.x, maxX));

  const transform = flipped ? "translate(-50%, 12px)" : "translate(-50%, -100%)";

  return (
    <div
      ref={tooltipRef}
      role="tooltip"
      aria-hidden={!visible}
      className={cn(
        "absolute z-10 rounded-xl border border-border bg-popover/95 backdrop-blur-sm p-3 shadow-lg",
        "transition-all duration-150 ease-out pointer-events-none",
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95",
      )}
      style={{
        left: clampedX,
        top: position.y,
        transform,
        width: tooltipWidth,
      }}
    >
      {node && (
        <>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <strong className="text-sm font-semibold text-foreground leading-tight">
              {t(`itemLabels.${node.id}`)}
            </strong>
            <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-foreground/70 shrink-0">
              {t(`levels.${node.level}`)}
            </span>
          </div>

          <p className="text-xs text-foreground/70 leading-relaxed mb-2">
            {t(`nodeDescriptions.${node.id}`)}
          </p>

          {neighbors.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {neighbors.map((neighbor) => {
                const color = familyColorMap.get(neighbor.family) ?? "#888";
                return (
                  <span
                    key={neighbor.id}
                    className="flex items-center gap-1 text-xs text-foreground/60 bg-foreground/5 px-1.5 py-0.5 rounded"
                  >
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    {t(`itemLabels.${neighbor.id}`)}
                  </span>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
