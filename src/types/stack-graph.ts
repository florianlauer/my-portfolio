import type { StackFamilyKey } from "@/types/stack";

export const experienceLevels = ["Notions", "Intermédiaire", "Avancé", "Expert"] as const;
export type ExperienceLevel = (typeof experienceLevels)[number];

export type FamilyColor = {
  family: StackFamilyKey;
  color: string;
};

export type GraphNode = {
  id: string;
  family: StackFamilyKey;
  level: ExperienceLevel;
};

export type GraphEdge = {
  source: string;
  target: string;
};

export type StackGraph = {
  nodes: readonly GraphNode[];
  edges: readonly GraphEdge[];
  familyColors: readonly FamilyColor[];
};
