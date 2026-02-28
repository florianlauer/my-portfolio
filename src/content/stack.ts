import type { StackGroup } from "@/types/stack";

export const stackGroups: StackGroup[] = [
  {
    family: "frontend",
    title: "Frontend",
    items: [
      { id: "react", label: "React" },
      { id: "nextjs", label: "Next.js" },
      { id: "typescript", label: "TypeScript" },
      { id: "tailwindcss", label: "Tailwind CSS" },
      { id: "vite", label: "Vite" },
      { id: "angular", label: "Angular" },
      { id: "scss", label: "SCSS" },
    ],
  },
  {
    family: "mobile",
    title: "Mobile",
    items: [
      { id: "capacitor", label: "Capacitor (iOS/Android)" },
      { id: "capacitor-plugin", label: "Plugins Capacitor" },
      { id: "bitrise", label: "Bitrise CI" },
    ],
  },
  {
    family: "backend",
    title: "Backend & API",
    items: [
      { id: "nodejs", label: "Node.js" },
      { id: "nestjs", label: "NestJS" },
      { id: "express", label: "Express" },
      { id: "graphql", label: "GraphQL (Apollo)" },
      { id: "python-fastapi", label: "Python / FastAPI" },
      { id: "kafka", label: "Kafka" },
    ],
  },
  {
    family: "data",
    title: "Data",
    items: [
      { id: "postgresql", label: "PostgreSQL" },
      { id: "mysql", label: "MySQL" },
      { id: "drizzle", label: "Drizzle ORM" },
      { id: "prisma", label: "Prisma" },
    ],
  },
  {
    family: "infra",
    title: "Infra / DevOps",
    items: [
      { id: "terraform", label: "Terraform (HCL)" },
      { id: "docker", label: "Docker" },
      { id: "github-actions", label: "GitHub Actions" },
      { id: "aws", label: "AWS (Lambda, S3)" },
      { id: "datadog", label: "Datadog" },
      { id: "nix", label: "Nix" },
    ],
  },
  {
    family: "integrations",
    title: "Intégrations SaaS",
    items: [
      { id: "hubspot", label: "HubSpot" },
      { id: "chargebee", label: "Chargebee" },
      { id: "mixpanel", label: "Mixpanel" },
      { id: "intercom", label: "Intercom" },
      { id: "contentful", label: "Contentful" },
    ],
  },
];

export const stackTags: string[] = [
  "TypeScript",
  "Vitest / Jest",
  "CI/CD",
  "Performance",
  "DX",
];
