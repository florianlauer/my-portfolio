export type StackFamilyKey =
  | "frontend"
  | "mobile"
  | "backend"
  | "data"
  | "infra"
  | "integrations"
  | "methods";

export type StackItem = {
  id: string;
  label: string;
};

export type StackGroup = {
  family: StackFamilyKey;
  title: string;
  items: StackItem[];
};
