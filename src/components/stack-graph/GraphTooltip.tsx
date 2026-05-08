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

  const clampedX = Math.max(
    TOOLTIP_EDGE_PADDING_PX,
    Math.min(position.x, containerWidth - TOOLTIP_MAX_WIDTH_PX - TOOLTIP_EDGE_PADDING_PX),
  );

  const transform = flipped ? "translate(-50%, 12px)" : "translate(-50%, -100%)";

  return (
    <div
      ref={tooltipRef}
      role="tooltip"
      aria-hidden={!visible}
      className={cn(
        "absolute z-10 w-70 max-w-[280px] rounded-xl border border-border bg-popover/95 backdrop-blur-sm p-3 shadow-lg",
        "transition-all duration-150 ease-out pointer-events-none",
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95",
      )}
      style={{
        left: clampedX,
        top: position.y,
        transform,
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
