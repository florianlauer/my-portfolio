export type ArsenalFamilyKey = "frontend" | "backend" | "devops";

export type ArsenalItem = {
  id: string;
  label: string;
};

export type ArsenalGroup = {
  family: ArsenalFamilyKey;
  title: string;
  items: ArsenalItem[];
};
