import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { stackGroupStructure } from "@/content/stack";
import type { StackFamilyKey } from "@/types/stack";

const familyAccent: Record<StackFamilyKey, { border: string; text: string }> = {
  frontend: { border: "border-t-amber-500", text: "text-amber-600" },
  mobile: { border: "border-t-orange-500", text: "text-orange-600" },
  backend: { border: "border-t-sky-500", text: "text-sky-600" },
  data: { border: "border-t-cyan-500", text: "text-cyan-600" },
  infra: { border: "border-t-teal-500", text: "text-teal-600" },
  integrations: { border: "border-t-violet-500", text: "text-violet-600" },
  methods: { border: "border-t-emerald-500", text: "text-emerald-600" },
};

export const StackSection = (): React.JSX.Element => {
  const t = useTranslations("stack");

  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="scroll-mt-24 rounded-2xl border border-border bg-background/92 p-6 md:p-8 backdrop-blur-sm"
    >
      <h2
        id="stack-title"
        className="border-l-2 border-primary pl-3 text-2xl font-semibold tracking-tight"
      >
        {t("sectionTitle")}
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {stackGroupStructure.map((group) => {
          const accent = familyAccent[group.family];
          return (
            <article
              key={group.family}
              className={cn(
                "rounded-xl border border-border/70 border-t-2 p-4 transition-all duration-200 pointer-hover:-translate-y-1 pointer-hover:shadow-md pointer-hover:border-border md:pointer-hover:scale-[1.02]",
                accent.border,
              )}
            >
              <p className={cn("text-xs font-medium uppercase tracking-wider", accent.text)}>
                {t(`familyAccents.${group.family}`)}
              </p>
              <h3 className="mt-1 text-lg font-medium">{t(`families.${group.family}`)}</h3>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {group.itemIds.map((itemId) => (
                  <li key={itemId}>{t(`itemLabels.${itemId}`)}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <p className="mt-6 border-l-2 border-muted-foreground/30 pl-3 text-sm italic text-muted-foreground">
        {t("opinion")}
      </p>
    </section>
  );
};
