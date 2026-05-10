import type { StackFamilyKey } from "@/types/stack";

// Locale-neutral keys — labels live in src/messages/*.json (stack.levels.*).
export const experienceLevels = ["basics", "intermediate", "advanced", "expert"] as const;
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
  presetTypicalStack: readonly string[];
};
