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
  itemIds: string[];
};
