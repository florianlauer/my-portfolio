import type { Messages } from "use-intl";
import type { StackFamilyKey } from "@/types/stack";

/** Graph node ids: each has a label and a description in src/messages/*.json. */
export type StackNodeId = keyof Messages["stack"]["nodeDescriptions"];

// Locale-neutral keys — labels live in src/messages/*.json (stack.levels.*).
export const experienceLevels = ["basics", "intermediate", "advanced", "expert"] as const;
export type ExperienceLevel = (typeof experienceLevels)[number];

export type FamilyColor = {
  family: StackFamilyKey;
  color: string;
};

export type GraphNode = {
  id: StackNodeId;
  family: StackFamilyKey;
  level: ExperienceLevel;
};

export type GraphEdge = {
  source: StackNodeId;
  target: StackNodeId;
};

export type StackGraph = {
  nodes: readonly GraphNode[];
  edges: readonly GraphEdge[];
  familyColors: readonly FamilyColor[];
  presetTypicalStack: readonly string[];
};
