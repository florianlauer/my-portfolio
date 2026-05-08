import {
  journeyChapterIds,
  type JourneyChapterId,
  type JourneyChapterStructure,
} from "@/types/journey";

export { journeyChapterIds };

export const journeyChapterStructure: Record<JourneyChapterId, JourneyChapterStructure> = {
  depart: {
    visualKey: "lorraine-flag",
    skills: ["Angular", "Java / Spring", "MySQL", "CI/CD", "SCRUM"],
  },
  expansion: {
    visualKey: "uk-pin",
    skills: ["HTML/SCSS", "JavaScript", "PHP / Symfony", "Docker", "Kanban"],
  },
  aujourdhui: {
    visualKey: "flanders-flag",
    skills: ["TypeScript", "React", "NestJS", "GraphQL", "Terraform", "Docker"],
  },
};
