import type { StackGroup } from "@/types/stack";

type StackSectionProps = {
  stackGroups: StackGroup[];
  stackTags: string[];
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
      <h2 id="stack-title" className="text-2xl font-semibold tracking-tight">
        Stack
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {stackGroups.map((group) => (
          <article
            key={group.family}
            className="rounded-xl border border-border/70 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-border md:hover:scale-[1.02]"
          >
            <h3 className="text-lg font-medium">{group.title}</h3>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              {group.items.map((item) => (
                <li key={item.id}>{item.label}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <ul
        className="mt-6 flex flex-wrap gap-2"
        aria-label="Tags de compétences"
      >
        {stackTags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-transform duration-150 hover:scale-105"
          >
            {tag}
          </li>
        ))}
      </ul>
    </section>
  );
};
