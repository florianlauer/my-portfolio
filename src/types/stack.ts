import type { Messages } from "use-intl";

/** Ids with a translated label in src/messages/*.json (stack.itemLabels.*). */
export type StackItemId = keyof Messages["stack"]["itemLabels"];

export type StackFamilyKey =
  | "frontend"
  | "mobile"
  | "backend"
  | "data"
  | "infra"
  | "integrations"
  | "methods";

export const stackFamilyOrder: readonly StackFamilyKey[] = [
  "frontend",
  "mobile",
  "backend",
  "data",
  "infra",
  "integrations",
  "methods",
] as const;

export type StackGroupStructure = {
  family: StackFamilyKey;
  itemIds: StackItemId[];
};
