import { useTranslations } from "next-intl";
import { journeyChapterIds, journeyChapterStructure } from "@/content/journey";
import { FlagImage } from "./FlagImage";

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

export const JourneySection = (): React.JSX.Element => {
  const t = useTranslations("journey");
  const tA11y = useTranslations("a11y");

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
        {t("sectionTitle")}
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {journeyChapterIds.map((id) => {
          const structure = journeyChapterStructure[id];
          const chapterVisual: JourneyVisual | undefined = visualByKey[structure.visualKey];
          const title = t(`chapters.${id}.title`);
          const location = t(`chapters.${id}.location`);
          const description = t(`chapters.${id}.description`);

          return (
            <article
              key={id}
              className={`rounded-xl border border-border/70 border-t-2 p-4 transition-all duration-200 pointer-hover:-translate-y-1 pointer-hover:shadow-md pointer-hover:border-border md:pointer-hover:scale-[1.02] ${chapterAccent[id]?.border ?? ""}`}
            >
              {chapterVisual?.imageSrc ? (
                <FlagImage src={chapterVisual.imageSrc} label={chapterVisual.label} />
              ) : (
                <p
                  className="text-2xl"
                  aria-label={`${tA11y("visualLocationPrefix")}: ${chapterVisual?.label ?? location}`}
                >
                  {chapterVisual?.icon ?? "📍"}
                </p>
              )}
              <h3 className="mt-2 text-lg font-medium">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{location}</p>
              <p className="mt-3 text-sm text-muted-foreground">{description}</p>
              <ul
                className="mt-4 flex flex-wrap gap-2"
                aria-label={`${tA11y("skillsForChapter")} - ${title}`}
              >
                {structure.skills.map((skill) => (
                  <li
                    key={`${id}-${skill}`}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${chapterAccent[id]?.badge ?? "bg-secondary text-secondary-foreground"}`}
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
