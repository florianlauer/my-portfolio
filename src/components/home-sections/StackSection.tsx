import { cn } from "@/lib/utils";
import type { StackFamilyKey, StackGroup } from "@/types/stack";

type StackSectionProps = {
  stackGroups: StackGroup[];
  stackTags: string[];
};

const familyAccent: Record<StackFamilyKey, { border: string; label: string; text: string }> = {
  frontend:     { border: "border-t-amber-500",  label: "UI / Interfaces", text: "text-amber-600"  },
  mobile:       { border: "border-t-orange-500", label: "App native",      text: "text-orange-600" },
  backend:      { border: "border-t-sky-500",    label: "API / Services",  text: "text-sky-600"    },
  data:         { border: "border-t-cyan-500",   label: "Base de données", text: "text-cyan-600"   },
  infra:        { border: "border-t-teal-500",   label: "CI / Infra",      text: "text-teal-600"   },
  integrations: { border: "border-t-violet-500", label: "Intégrations",    text: "text-violet-600" },
};

export const StackSection = ({
  stackGroups,
  stackTags,
}: StackSectionProps): React.JSX.Element => {
  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="scroll-mt-24 rounded-2xl border border-border bg-background/92 p-6 md:p-8 backdrop-blur-sm"
    >
      <h2 id="stack-title" className="border-l-2 border-primary pl-3 text-2xl font-semibold tracking-tight">
        Stack
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {stackGroups.map((group) => {
          const accent = familyAccent[group.family];
          return (
          <article
            key={group.family}
            className={cn(
              "rounded-xl border border-border/70 border-t-2 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-border md:hover:scale-[1.02]",
              accent.border
            )}
          >
            <p className={cn("text-xs font-medium uppercase tracking-wider", accent.text)}>
              {accent.label}
            </p>
            <h3 className="mt-1 text-lg font-medium">{group.title}</h3>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              {group.items.map((item) => (
                <li key={item.id}>{item.label}</li>
              ))}
            </ul>
          </article>
          );
        })}
      </div>

      <ul
        className="mt-6 flex flex-wrap gap-2"
        aria-label="Tags de compétences"
      >
        {stackTags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-transform duration-150 hover:scale-105"
          >
            {tag}
          </li>
        ))}
      </ul>
    </section>
  );
};
