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
    { id: "react", family: "frontend", level: "Expert" },
    { id: "nextjs", family: "frontend", level: "Avancé" },
    { id: "typescript", family: "frontend", level: "Expert" },
    { id: "vite", family: "frontend", level: "Avancé" },
    { id: "angular", family: "frontend", level: "Intermédiaire" },
    { id: "scss", family: "frontend", level: "Intermédiaire" },
    { id: "styled-components", family: "frontend", level: "Avancé" },
    { id: "gatsbyjs", family: "frontend", level: "Intermédiaire" },

    // ── Mobile ────────────────────────────────────────────────────
    { id: "capacitor", family: "mobile", level: "Expert" },
    { id: "capacitor-plugin", family: "mobile", level: "Intermédiaire" },
    { id: "bitrise", family: "mobile", level: "Expert" },

    // ── Backend & API ─────────────────────────────────────────────
    { id: "nodejs", family: "backend", level: "Expert" },
    { id: "nestjs", family: "backend", level: "Expert" },
    { id: "express", family: "backend", level: "Avancé" },
    { id: "graphql", family: "backend", level: "Avancé" },
    { id: "python-fastapi", family: "backend", level: "Intermédiaire" },
    { id: "kafka", family: "backend", level: "Notions" },

    // ── Data ──────────────────────────────────────────────────────
    { id: "postgresql", family: "data", level: "Avancé" },
    { id: "mysql", family: "data", level: "Avancé" },
    { id: "drizzle", family: "data", level: "Avancé" },
    { id: "prisma", family: "data", level: "Intermédiaire" },

    // ── Infra / DevOps ────────────────────────────────────────────
    { id: "terraform", family: "infra", level: "Intermédiaire" },
    { id: "docker", family: "infra", level: "Avancé" },
    { id: "github-actions", family: "infra", level: "Avancé" },
    { id: "aws", family: "infra", level: "Avancé" },
    { id: "datadog", family: "infra", level: "Avancé" },
    { id: "nix", family: "infra", level: "Notions" },

    // ── Integrations SaaS ─────────────────────────────────────────
    { id: "hubspot", family: "integrations", level: "Avancé" },
    { id: "chargebee", family: "integrations", level: "Avancé" },
    { id: "mixpanel", family: "integrations", level: "Expert" },
    { id: "intercom", family: "integrations", level: "Avancé" },
    { id: "contentful", family: "integrations", level: "Avancé" },

    // ── Méthodes & Architecture ──────────────────────────────────
    { id: "tdd", family: "methods", level: "Avancé" },
    { id: "ddd", family: "methods", level: "Avancé" },
    { id: "hexagonal", family: "methods", level: "Expert" },
    { id: "cqrs", family: "methods", level: "Intermédiaire" },
    { id: "clean-architecture", family: "methods", level: "Expert" },
    { id: "microservices", family: "methods", level: "Avancé" },
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
