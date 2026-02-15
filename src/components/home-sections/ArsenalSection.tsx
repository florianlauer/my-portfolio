import type { ArsenalGroup } from "@/types/arsenal";

type ArsenalSectionProps = {
  arsenalGroups: ArsenalGroup[];
  arsenalTags: string[];
};

export const ArsenalSection = ({
  arsenalGroups,
  arsenalTags,
}: ArsenalSectionProps): React.JSX.Element => {
  return (
    <section
      id="arsenal"
      aria-labelledby="arsenal-title"
      className="rounded-2xl border border-border p-6 md:p-8"
    >
      <h2 id="arsenal-title" className="text-2xl font-semibold tracking-tight">
        Arsenal
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {arsenalGroups.map((group) => (
          <article
            key={group.family}
            className="rounded-xl border border-border/70 p-4"
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
        {arsenalTags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
          >
            {tag}
          </li>
        ))}
      </ul>
    </section>
  );
};
