import Image from "next/image";
import type { JourneyChapter } from "@/types/journey";

type JourneySectionProps = {
  journeyChapters: JourneyChapter[];
};

type JourneyVisual = {
  label: string;
  icon?: string;
  imageSrc?: string;
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

export const JourneySection = ({
  journeyChapters,
}: JourneySectionProps): React.JSX.Element => {
  return (
    <section
      id="parcours"
      aria-labelledby="journey-title"
      className="rounded-2xl border border-border bg-background/92 p-6 md:p-8 backdrop-blur-sm"
    >
      <h2 id="journey-title" className="text-2xl font-semibold tracking-tight">
        Parcours
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {journeyChapters.map((chapter) => {
          const chapterVisual: JourneyVisual | undefined =
            visualByKey[chapter.visualKey];

          return (
            <article
              key={chapter.id}
              className="rounded-xl border border-border/70 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-border md:hover:scale-[1.02]"
            >
              {chapterVisual?.imageSrc ? (
                <Image
                  src={chapterVisual.imageSrc}
                  alt={`Drapeau ${chapterVisual.label}`}
                  width={30}
                  height={18}
                  className="h-5 w-7 rounded-sm border border-border/60 object-cover"
                />
              ) : (
                <p
                  className="text-2xl"
                  aria-label={`Visuel lieu: ${
                    chapterVisual?.label ?? chapter.location
                  }`}
                >
                  {chapterVisual?.icon ?? "📍"}
                </p>
              )}
              <h3 className="mt-2 text-lg font-medium">{chapter.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {chapter.location}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {chapter.description}
              </p>
              <ul
                className="mt-4 flex flex-wrap gap-2"
                aria-label={`Compétences - ${chapter.title}`}
              >
                {chapter.skills.map((skill) => (
                  <li
                    key={`${chapter.id}-${skill}`}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
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
