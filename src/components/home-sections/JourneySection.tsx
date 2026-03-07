import type { JourneyChapter } from "@/types/journey";
import { FlagImage } from "./FlagImage";

type JourneySectionProps = {
  journeyChapters: JourneyChapter[];
};

type JourneyVisual = {
  label: string;
  icon?: string;
  imageSrc?: string;
};

const chapterAccent: Record<string, { badge: string; border: string }> = {
  depart: {
    badge: "bg-amber-100/50 text-amber-600/80 dark:bg-amber-900/20 dark:text-amber-400/70",
    border: "border-t-amber-500",
  },
  expansion: {
    badge: "bg-sky-100/50 text-sky-600/80 dark:bg-sky-900/20 dark:text-sky-400/70",
    border: "border-t-sky-500",
  },
  aujourdhui: { badge: "bg-primary/10 text-primary", border: "border-t-primary" },
};

const visualByKey: Record<string, JourneyVisual> = {
  "france-pin": { icon: "🇫🇷", label: "France" },
  "lorraine-flag": {
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Flag_of_Lorraine.svg/3840px-Flag_of_Lorraine.svg.png",
    label: "Lorraine",
  },
  "uk-pin": { icon: "🇬🇧", label: "Angleterre" },
  "eu-pin": { icon: "🌍", label: "Europe" },
  "flanders-flag": {
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Generieke_vlag_van_Vlaanderen.svg",
    label: "Flandres",
  },
};

export const JourneySection = ({ journeyChapters }: JourneySectionProps): React.JSX.Element => {
  return (
    <section
      id="parcours"
      aria-labelledby="journey-title"
      className="scroll-mt-24 rounded-2xl border border-border bg-background/92 p-6 md:p-8 backdrop-blur-sm"
    >
      <h2
        id="journey-title"
        className="border-l-2 border-primary pl-3 text-2xl font-semibold tracking-tight"
      >
        Parcours
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {journeyChapters.map((chapter) => {
          const chapterVisual: JourneyVisual | undefined = visualByKey[chapter.visualKey];

          return (
            <article
              key={chapter.id}
              className={`rounded-xl border border-border/70 border-t-2 p-4 transition-all duration-200 pointer-hover:-translate-y-1 pointer-hover:shadow-md pointer-hover:border-border md:pointer-hover:scale-[1.02] ${chapterAccent[chapter.id]?.border ?? ""}`}
            >
              {chapterVisual?.imageSrc ? (
                <FlagImage src={chapterVisual.imageSrc} label={chapterVisual.label} />
              ) : (
                <p
                  className="text-2xl"
                  aria-label={`Visuel lieu: ${chapterVisual?.label ?? chapter.location}`}
                >
                  {chapterVisual?.icon ?? "📍"}
                </p>
              )}
              <h3 className="mt-2 text-lg font-medium">{chapter.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{chapter.location}</p>
              <p className="mt-3 text-sm text-muted-foreground">{chapter.description}</p>
              <ul
                className="mt-4 flex flex-wrap gap-2"
                aria-label={`Compétences - ${chapter.title}`}
              >
                {chapter.skills.map((skill) => (
                  <li
                    key={`${chapter.id}-${skill}`}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${chapterAccent[chapter.id]?.badge ?? "bg-secondary text-secondary-foreground"}`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
};
