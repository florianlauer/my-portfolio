import type { JourneyChapter } from "@/types/journey";

export const journeyChapters: JourneyChapter[] = [
  {
    id: "depart",
    title: "Depart",
    location: "Nancy",
    description:
      "Premieres experiences produit et dev, avec un focus sur la lisibilite et la fiabilite.",
    visualKey: "lorraine-flag",
    skills: ["Product discovery", "TypeScript", "UX writing"],
  },
  {
    id: "expansion",
    title: "Expansion",
    location: "Angleterre",
    description:
      "Acceleration sur les architectures front et la collaboration avec des equipes pluridisciplinaires.",
    visualKey: "uk-pin",
    skills: ["React", "Next.js", "Testing", "Design system"],
  },
  {
    id: "aujourdhui",
    title: "Aujourd'hui",
    location: "Lille",
    description:
      "Construction de produits web durables: performance, accessibilite et delivery continue.",
    visualKey: "flanders-flag",
    skills: ["Architecture", "CI/CD", "DX", "Mentoring"],
  },
];
