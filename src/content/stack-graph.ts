import type { StackGraph } from "@/types/stack-graph";

export const stackGraph = {
  familyColors: [
    { family: "frontend", color: "oklch(0.75 0.18 85)" },
    { family: "mobile", color: "oklch(0.70 0.19 55)" },
    { family: "backend", color: "oklch(0.68 0.16 230)" },
    { family: "data", color: "oklch(0.72 0.14 195)" },
    { family: "infra", color: "oklch(0.70 0.14 170)" },
    { family: "integrations", color: "oklch(0.65 0.20 300)" },
    { family: "methods", color: "oklch(0.72 0.15 145)" },
  ],

  nodes: [
    // ── Frontend ──────────────────────────────────────────────────
    { id: "react", family: "frontend", level: "expert" },
    { id: "nextjs", family: "frontend", level: "advanced" },
    { id: "typescript", family: "frontend", level: "expert" },
    { id: "vite", family: "frontend", level: "advanced" },
    { id: "angular", family: "frontend", level: "intermediate" },
    { id: "scss", family: "frontend", level: "intermediate" },
    { id: "styled-components", family: "frontend", level: "advanced" },
    { id: "gatsbyjs", family: "frontend", level: "intermediate" },

    // ── Mobile ────────────────────────────────────────────────────
    { id: "capacitor", family: "mobile", level: "expert" },
    { id: "capacitor-plugin", family: "mobile", level: "intermediate" },
    { id: "bitrise", family: "mobile", level: "expert" },

    // ── Backend & API ─────────────────────────────────────────────
    { id: "nodejs", family: "backend", level: "expert" },
    { id: "nestjs", family: "backend", level: "expert" },
    { id: "express", family: "backend", level: "advanced" },
    { id: "graphql", family: "backend", level: "advanced" },
    { id: "python-fastapi", family: "backend", level: "intermediate" },
    { id: "kafka", family: "backend", level: "basics" },

    // ── Data ──────────────────────────────────────────────────────
    { id: "postgresql", family: "data", level: "advanced" },
    { id: "mysql", family: "data", level: "advanced" },
    { id: "drizzle", family: "data", level: "advanced" },
    { id: "prisma", family: "data", level: "intermediate" },

    // ── Infra / DevOps ────────────────────────────────────────────
    { id: "terraform", family: "infra", level: "intermediate" },
    { id: "docker", family: "infra", level: "advanced" },
    { id: "github-actions", family: "infra", level: "advanced" },
    { id: "aws", family: "infra", level: "advanced" },
    { id: "datadog", family: "infra", level: "advanced" },
    { id: "nix", family: "infra", level: "basics" },

    // ── Integrations SaaS ─────────────────────────────────────────
    { id: "hubspot", family: "integrations", level: "advanced" },
    { id: "chargebee", family: "integrations", level: "advanced" },
    { id: "mixpanel", family: "integrations", level: "expert" },
    { id: "intercom", family: "integrations", level: "advanced" },
    { id: "contentful", family: "integrations", level: "advanced" },

    // ── Méthodes & Architecture ──────────────────────────────────
    { id: "tdd", family: "methods", level: "advanced" },
    { id: "ddd", family: "methods", level: "advanced" },
    { id: "hexagonal", family: "methods", level: "expert" },
    { id: "cqrs", family: "methods", level: "intermediate" },
    { id: "clean-architecture", family: "methods", level: "expert" },
    { id: "microservices", family: "methods", level: "advanced" },
  ],

  edges: [
    // ── Frontend core ─────────────────────────────────────────────
    { source: "react", target: "nextjs" },
    { source: "react", target: "typescript" },
    { source: "nextjs", target: "typescript" },
    { source: "vite", target: "react" },
    { source: "angular", target: "typescript" },
    { source: "angular", target: "scss" },
    { source: "styled-components", target: "react" },
    { source: "gatsbyjs", target: "react" },
    { source: "gatsbyjs", target: "graphql" },

    // ── Backend core ──────────────────────────────────────────────
    { source: "nodejs", target: "nestjs" },
    { source: "nodejs", target: "express" },
    { source: "nestjs", target: "graphql" },
    { source: "express", target: "graphql" },
    { source: "nodejs", target: "typescript" },
    { source: "python-fastapi", target: "graphql" },

    // ── Data ──────────────────────────────────────────────────────
    { source: "postgresql", target: "prisma" },
    { source: "postgresql", target: "drizzle" },
    { source: "mysql", target: "prisma" },
    { source: "nodejs", target: "kafka" },

    // ── Mobile ────────────────────────────────────────────────────
    { source: "capacitor", target: "react" },
    { source: "capacitor", target: "capacitor-plugin" },
    { source: "capacitor", target: "bitrise" },

    // ── Infra ─────────────────────────────────────────────────────
    { source: "docker", target: "nestjs" },
    { source: "docker", target: "aws" },
    { source: "terraform", target: "aws" },
    { source: "github-actions", target: "docker" },
    { source: "github-actions", target: "aws" },
    { source: "nix", target: "docker" },

    // ── Cross-family ──────────────────────────────────────────────
    { source: "react", target: "nodejs" },
    { source: "nextjs", target: "nodejs" },
    { source: "nestjs", target: "postgresql" },
    { source: "nestjs", target: "kafka" },
    { source: "express", target: "postgresql" },
    { source: "datadog", target: "nestjs" },
    { source: "datadog", target: "aws" },

    // ── Integrations ──────────────────────────────────────────────
    { source: "hubspot", target: "nestjs" },
    { source: "chargebee", target: "nestjs" },
    { source: "contentful", target: "nextjs" },
    { source: "mixpanel", target: "react" },
    { source: "intercom", target: "react" },

    // ── Méthodes & Architecture ──────────────────────────────────
    { source: "tdd", target: "nestjs" },
    { source: "ddd", target: "nestjs" },
    { source: "hexagonal", target: "nestjs" },
    { source: "hexagonal", target: "ddd" },
    { source: "cqrs", target: "ddd" },
    { source: "cqrs", target: "nestjs" },
    { source: "clean-architecture", target: "hexagonal" },
    { source: "clean-architecture", target: "nestjs" },
    { source: "microservices", target: "nestjs" },
    { source: "microservices", target: "docker" },
    { source: "microservices", target: "kafka" },
  ],
} as const satisfies StackGraph;

// Dev-only edge validation — catches orphan references at build time
if (process.env.NODE_ENV === "development") {
  const nodeIds = new Set(stackGraph.nodes.map((n) => n.id));
  for (const edge of stackGraph.edges) {
    if (!nodeIds.has(edge.source))
      throw new Error(`[stack-graph] Unknown edge source: ${edge.source}`);
    if (!nodeIds.has(edge.target))
      throw new Error(`[stack-graph] Unknown edge target: ${edge.target}`);
  }
}
