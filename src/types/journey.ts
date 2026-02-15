export type JourneyChapter = {
  id: "depart" | "expansion" | "aujourdhui";
  title: string;
  location: string;
  description: string;
  visualKey: string;
  skills: string[];
};
