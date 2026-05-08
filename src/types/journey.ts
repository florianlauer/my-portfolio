export const journeyChapterIds = ["depart", "expansion", "aujourdhui"] as const;
export type JourneyChapterId = (typeof journeyChapterIds)[number];

export type JourneyChapterStructure = {
  visualKey: string;
  skills: string[];
};
