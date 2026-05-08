import type { StackGroupStructure } from "@/types/stack";

export { stackFamilyOrder, type StackFamilyKey } from "@/types/stack";

export const stackGroupStructure: StackGroupStructure[] = [
  {
    family: "frontend",
    itemIds: [
      "react",
      "typescript",
      "nextjs",
      "vite",
      "angular",
      "scss",
      "styled-components",
      "gatsbyjs",
    ],
  },
  {
    family: "mobile",
    itemIds: ["capacitor", "capacitor-plugin", "bitrise"],
  },
  {
    family: "backend",
    itemIds: ["nestjs", "nodejs", "graphql", "express", "python-fastapi", "kafka"],
  },
  {
    family: "data",
    itemIds: ["postgresql", "mysql", "drizzle", "prisma"],
  },
  {
    family: "infra",
    itemIds: ["terraform", "docker", "github-actions", "aws", "datadog", "nix"],
  },
  {
    family: "integrations",
    itemIds: ["hubspot", "chargebee", "mixpanel", "intercom", "contentful"],
  },
  {
    family: "methods",
    itemIds: ["ddd", "hexagonal", "adapter", "tdd", "cqrs", "clean-architecture", "microservices"],
  },
];
