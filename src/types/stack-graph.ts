import type { StackFamilyKey } from "@/types/stack";

export type ExperienceLevel = "Expert" | "Avancé" | "Intermédiaire" | "Notions";

export type FamilyColor = {
  family: StackFamilyKey;
  label: string;
  color: string;
};

export type GraphNode = {
  id: string;
  label: string;
  family: StackFamilyKey;
  level: ExperienceLevel;
  description: string;
};

export type GraphEdge = {
  source: string;
  target: string;
};

export type StackGraph = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  familyColors: FamilyColor[];
};
