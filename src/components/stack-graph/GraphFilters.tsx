"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type FilterPill = {
  key: string;
  label: string;
  color: string;
};

type GraphFiltersProps = {
  filters: FilterPill[];
  activeFilters: Set<string>;
  onToggle: (key: string) => void;
  presetActive: boolean;
  onPresetToggle: () => void;
  presetLabel: string;
};

export function GraphFilters({
  filters,
  activeFilters,
  onToggle,
  presetActive,
  onPresetToggle,
  presetLabel,
}: GraphFiltersProps): React.JSX.Element {
  const t = useTranslations("stack");
  return (
    <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label={t("filtersAriaLabel")}>
      {filters.map((filter) => {
        const isActive = activeFilters.has(filter.key);
        return (
          <button
            key={filter.key}
            type="button"
            onClick={() => onToggle(filter.key)}
            aria-pressed={isActive}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-all duration-150",
              isActive
                ? "bg-foreground/10 text-foreground border-foreground/20"
                : "bg-transparent text-foreground/40 border-border",
            )}
          >
            <span
              className="inline-block w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: isActive ? filter.color : "currentColor" }}
            />
            {filter.label}
          </button>
        );
      })}
      <button
        type="button"
        onClick={onPresetToggle}
        aria-pressed={presetActive}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-all duration-150 focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:outline-none",
          presetActive
            ? "bg-foreground text-background border-foreground"
            : "bg-transparent text-foreground/60 border-foreground/30 hover:text-foreground hover:border-foreground/60",
        )}
      >
        <span aria-hidden="true">★</span>
        {presetLabel}
      </button>
    </div>
  );
}
