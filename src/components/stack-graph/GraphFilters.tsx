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
};

export function GraphFilters({
  filters,
  activeFilters,
  onToggle,
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
    </div>
  );
}
