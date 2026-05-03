import type { StackGroup } from "@/types/stack";

export const stackGroups: StackGroup[] = [
  {
    family: "frontend",
    title: "Frontend",
    items: [
      { id: "react", label: "React" },
      { id: "typescript", label: "TypeScript" },
      { id: "nextjs", label: "Next.js" },
      { id: "tailwindcss", label: "Tailwind CSS" },
      { id: "vite", label: "Vite" },
      { id: "angular", label: "Angular" },
      { id: "scss", label: "SCSS" },
      { id: "styled-components", label: "Styled Components" },
      { id: "gatsbyjs", label: "Gatsby" },
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
      { id: "nestjs", label: "NestJS" },
      { id: "nodejs", label: "Node.js" },
      { id: "graphql", label: "GraphQL (Apollo)" },
      { id: "express", label: "Express" },
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
  {
    family: "methods",
    title: "Méthodes & Architecture",
    items: [
      { id: "ddd", label: "DDD (BFF Sencrop)" },
      { id: "hexagonal", label: "Architecture Hexagonale (BFF Sencrop)" },
      { id: "adapter", label: "Pattern Adapter & split par domaine" },
      { id: "tdd", label: "TDD" },
      { id: "cqrs", label: "CQRS" },
      { id: "clean-architecture", label: "Clean Architecture" },
      { id: "microservices", label: "Microservices" },
    ],
  },
];

export const stackOpinion =
  "Capacitor m'a servi 6 ans en prod côté Sencrop. Pour un nouveau projet mobile, je partirais sur React Native ou Expo.";
