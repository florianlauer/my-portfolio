"use client";

import { useTranslations } from "next-intl";
import type { FamilyColor } from "@/types/stack-graph";

type GraphLegendProps = {
  familyColors: readonly FamilyColor[];
};

export function GraphLegend({ familyColors }: GraphLegendProps): React.JSX.Element {
  const t = useTranslations("stack");
  return (
    <div className="absolute bottom-4 left-4 rounded-xl border border-border bg-background/90 backdrop-blur-sm p-4">
      <ul className="flex flex-col gap-2">
        {familyColors.map((fc) => (
          <li key={fc.family} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: fc.color }}
              aria-hidden="true"
            />
            <span className="text-xs text-foreground/80">{t(`families.${fc.family}`)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
