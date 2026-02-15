import type { JourneyChapter } from "@/types/journey";

type JourneySectionProps = {
  journeyChapters: JourneyChapter[];
};

export const JourneySection = ({ journeyChapters }: JourneySectionProps): React.JSX.Element => {
  return (
    <section
      id="parcours"
      aria-labelledby="journey-title"
      className="rounded-2xl border border-border p-6 md:p-8"
    >
      <h2 id="journey-title" className="text-2xl font-semibold tracking-tight">
        Parcours
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {journeyChapters.map((chapter) => (
          <article key={chapter.id} className="rounded-xl border border-border/70 p-4">
            <h3 className="text-lg font-medium">{chapter.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{chapter.location}</p>
            <p className="mt-3 text-sm text-muted-foreground">{chapter.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
