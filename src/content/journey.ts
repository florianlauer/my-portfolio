import type { JourneyChapter } from "@/types/journey";

export const journeyChapters: JourneyChapter[] = [
  {
    id: "depart",
    title: "Départ",
    location: "Nancy • France",
    description:
      "Deux ans en HealthTech : stage sur les chatbots et Angular, puis poste sur des apps e-santé fullstack (Angular, Java/Spring, MySQL). Premiers réflexes CI/CD et SCRUM, et déjà l'envie d'aller voir comment ça se passe ailleurs.",
    visualKey: "lorraine-flag",
    skills: ["Angular", "Java / Spring", "MySQL", "CI/CD", "SCRUM"],
  },
  {
    id: "expansion",
    title: "Expansion",
    location: "Birmingham • Royaume-Uni",
    description:
      "Saisi l'opportunité de partir au UK refondre le site de PM Connect (HTML/SCSS/JS, PHP/Symfony, Docker, Kanban). Premier vrai contact avec le monde startup, première équipe internationale, et l'anglais au quotidien — un cap personnel autant que pro.",
    visualKey: "uk-pin",
    skills: ["HTML/SCSS", "JavaScript", "PHP / Symfony", "Docker", "Kanban"],
  },
  {
    id: "aujourdhui",
    title: "Aujourd'hui",
    location: "Lille • France",
    description:
      "Six ans en AgTech. J'ai monté et leadé l'équipe Growth, puis l'équipe Sales Impact (objectif : revenu en hausse, churn en baisse). Côté produit, j'ai construit l'app de tests et de suivi production de notre gamme de stations 4G modulaires — du banc de test capteurs jusqu'à l'intégration dans l'app de météo agricole. Contributeur principal du design system, aujourd'hui utilisé par trois équipes. Stack TypeScript fullstack (React, NestJS, GraphQL), web + app native via Capacitor, infra Terraform.",
    visualKey: "flanders-flag",
    skills: ["TypeScript", "React", "NestJS", "GraphQL", "Terraform", "Docker"],
  },
];
