export type StackFamilyKey = "frontend" | "backend" | "devops";

export type StackItem = {
  id: string;
  label: string;
};

export type StackGroup = {
  family: StackFamilyKey;
  title: string;
  items: StackItem[];
};
