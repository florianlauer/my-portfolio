import type { JourneyChapter } from "@/types/journey";

export const journeyChapters: JourneyChapter[] = [
  {
    id: "depart",
    title: "Départ",
    location: "Nancy • France",
    description:
      "Deux ans dans la HealthTech : d'abord en stage sur les chatbots et Angular, puis en poste sur des apps de e-santé full-stack (Angular, Java/Spring, MySQL). Premiers pas en intégration continue et méthode SCRUM.",
    visualKey: "lorraine-flag",
    skills: ["Angular", "Java / Spring", "MySQL", "CI/CD", "SCRUM"],
  },
  {
    id: "expansion",
    title: "Expansion",
    location: "Birmingham • Royaume-Uni",
    description:
      "Refonte du site de PM Connect — stack HTML/SCSS/JS côté front, PHP/Symfony côté back, dans un contexte Docker + CI. Première expérience en équipe internationale et en livraison continue (Kanban).",
    visualKey: "uk-pin",
    skills: ["HTML/SCSS", "JavaScript", "PHP / Symfony", "Docker", "Kanban"],
  },
  {
    id: "aujourdhui",
    title: "Aujourd'hui",
    location: "Lille • France",
    description:
      "Six ans chez Sencrop (AgTech) — de la croissance produit aux outils commerciaux B2B, en passant par le design system et le lancement d'une gamme de stations 4G. Stack fullstack TypeScript hybride web + app native (Capacitor iOS/Android), du front React au back NestJS, avec une dimension infra Terraform.",
    visualKey: "flanders-flag",
    skills: ["TypeScript", "React", "NestJS", "GraphQL", "Terraform", "Docker"],
  },
];
