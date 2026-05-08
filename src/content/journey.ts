import type { JourneyChapter } from "@/types/journey";

export const journeyChapters: JourneyChapter[] = [
  {
    id: "depart",
    title: "Départ",
    location: "Nancy • France",
    description:
      "Deux ans en HealthTech. Stage sur des chatbots, puis dev fullstack sur des apps e-santé (Angular, Java/Spring, MySQL). C'est là que j'ai appris les premiers réflexes CI/CD et SCRUM. Au bout de deux ans, envie de voir comment on bosse ailleurs.",
    visualKey: "lorraine-flag",
    skills: ["Angular", "Java / Spring", "MySQL", "CI/CD", "SCRUM"],
  },
  {
    id: "expansion",
    title: "Expansion",
    location: "Birmingham • Royaume-Uni",
    description:
      "Direction Birmingham pour refondre le site de PM Connect (HTML/SCSS/JS, PHP/Symfony, Docker, Kanban). Ma première startup, ma première équipe internationale, et l'anglais au quotidien a été un cap personnel autant que pro.",
    visualKey: "uk-pin",
    skills: ["HTML/SCSS", "JavaScript", "PHP / Symfony", "Docker", "Kanban"],
  },
  {
    id: "aujourdhui",
    title: "Aujourd'hui",
    location: "Lille • France",
    description:
      "Six ans chez Sencrop, en AgTech. J'ai monté l'équipe Growth, puis l'équipe Sales Impact pour faire monter le revenu et faire baisser le churn. Côté produit, j'ai porté l'app de tests et de suivi production de nos stations 4G : depuis le banc capteurs à l'usine jusqu'à l'intégration dans l'app météo agricole. Je contribue aussi au design system, repris par trois équipes. Côté tech : TypeScript partout (React, NestJS, GraphQL), du web et du natif via Capacitor, infra Terraform.",
    visualKey: "flanders-flag",
    skills: ["TypeScript", "React", "NestJS", "GraphQL", "Terraform", "Docker"],
  },
];
