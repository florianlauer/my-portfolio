import type { StackGraph } from "@/types/stack-graph";

export const stackGraph = {
  familyColors: [
    { family: "frontend", label: "Frontend", color: "oklch(0.75 0.18 85)" },
    { family: "mobile", label: "Mobile", color: "oklch(0.70 0.19 55)" },
    { family: "backend", label: "Backend & API", color: "oklch(0.68 0.16 230)" },
    { family: "data", label: "Data", color: "oklch(0.72 0.14 195)" },
    { family: "infra", label: "Infra / DevOps", color: "oklch(0.70 0.14 170)" },
    { family: "integrations", label: "Integrations SaaS", color: "oklch(0.65 0.20 300)" },
  ],

  nodes: [
    // ── Frontend (7) ──────────────────────────────────────────────
    {
      id: "react",
      label: "React",
      family: "frontend",
      level: "Expert",
      description:
        "Ma bibliothèque UI principale — j'ai construit des dizaines de projets React depuis 2018.",
    },
    {
      id: "nextjs",
      label: "Next.js",
      family: "frontend",
      level: "Expert",
      description:
        "Mon framework de prédilection pour le web. App Router, SSR, RSC — je l'utilise au quotidien.",
    },
    {
      id: "typescript",
      label: "TypeScript",
      family: "frontend",
      level: "Expert",
      description:
        "Indispensable sur tous mes projets. Types stricts, generics, inférence — je ne code plus sans.",
    },
    {
      id: "tailwindcss",
      label: "Tailwind CSS",
      family: "frontend",
      level: "Expert",
      description:
        "Mon approche CSS par défaut. Rapide, cohérent, parfait avec les composants React.",
    },
    {
      id: "vite",
      label: "Vite",
      family: "frontend",
      level: "Avancé",
      description: "Bundler ultra-rapide que j'utilise sur les projets hors Next.js.",
    },
    {
      id: "angular",
      label: "Angular",
      family: "frontend",
      level: "Intermédiaire",
      description:
        "Utilisé sur des projets d'entreprise pendant 2 ans. Je connais l'écosystème mais je préfère React.",
    },
    {
      id: "scss",
      label: "SCSS",
      family: "frontend",
      level: "Notions",
      description: "Utilisé avant Tailwind — je sais m'en servir mais je n'y reviens plus.",
    },

    // ── Mobile (3) ────────────────────────────────────────────────
    {
      id: "capacitor",
      label: "Capacitor (iOS/Android)",
      family: "mobile",
      level: "Intermédiaire",
      description: "J'ai livré des apps hybrides iOS/Android à partir de bases React existantes.",
    },
    {
      id: "capacitor-plugin",
      label: "Plugins Capacitor",
      family: "mobile",
      level: "Intermédiaire",
      description: "Développement de plugins natifs custom pour combler les besoins métier.",
    },
    {
      id: "bitrise",
      label: "Bitrise CI",
      family: "mobile",
      level: "Notions",
      description: "CI/CD mobile configuré pour les builds iOS et Android.",
    },

    // ── Backend & API (6) ─────────────────────────────────────────
    {
      id: "nodejs",
      label: "Node.js",
      family: "backend",
      level: "Expert",
      description:
        "Mon runtime backend principal. APIs REST, workers, scripts — Node est partout dans ma stack.",
    },
    {
      id: "nestjs",
      label: "NestJS",
      family: "backend",
      level: "Avancé",
      description:
        "Framework structuré pour les APIs complexes. Modules, guards, interceptors — très productif en équipe.",
    },
    {
      id: "express",
      label: "Express",
      family: "backend",
      level: "Avancé",
      description: "Le classique Node.js — utilisé sur de nombreux projets avant NestJS.",
    },
    {
      id: "graphql",
      label: "GraphQL (Apollo)",
      family: "backend",
      level: "Avancé",
      description: "APIs GraphQL avec Apollo Server et Client. Schemas, resolvers, subscriptions.",
    },
    {
      id: "python-fastapi",
      label: "Python / FastAPI",
      family: "backend",
      level: "Intermédiaire",
      description: "Utilisé pour des microservices data et des APIs légères en Python.",
    },
    {
      id: "kafka",
      label: "Kafka",
      family: "backend",
      level: "Intermédiaire",
      description: "Event streaming en production — consumers, producers, topics partitionnés.",
    },

    // ── Data (4) ──────────────────────────────────────────────────
    {
      id: "postgresql",
      label: "PostgreSQL",
      family: "data",
      level: "Avancé",
      description:
        "Ma base de données par défaut. Requêtes complexes, migrations, indexes — solide en prod.",
    },
    {
      id: "mysql",
      label: "MySQL",
      family: "data",
      level: "Notions",
      description: "Utilisé sur des projets legacy, je préfère PostgreSQL.",
    },
    {
      id: "drizzle",
      label: "Drizzle ORM",
      family: "data",
      level: "Intermédiaire",
      description: "ORM TypeScript léger que j'adopte sur les nouveaux projets.",
    },
    {
      id: "prisma",
      label: "Prisma",
      family: "data",
      level: "Intermédiaire",
      description: "ORM bien typé, utilisé sur plusieurs projets Next.js/NestJS.",
    },

    // ── Infra / DevOps (6) ────────────────────────────────────────
    {
      id: "terraform",
      label: "Terraform (HCL)",
      family: "infra",
      level: "Intermédiaire",
      description:
        "Infrastructure as Code pour provisionner des environnements AWS reproductibles.",
    },
    {
      id: "docker",
      label: "Docker",
      family: "infra",
      level: "Avancé",
      description: "Conteneurisation systématique. Dockerfiles multi-stage, compose, registries.",
    },
    {
      id: "github-actions",
      label: "GitHub Actions",
      family: "infra",
      level: "Intermédiaire",
      description: "Pipelines CI/CD sur tous mes repos — tests, lint, deploy automatisés.",
    },
    {
      id: "aws",
      label: "AWS (Lambda, S3)",
      family: "infra",
      level: "Intermédiaire",
      description:
        "Lambda, S3, CloudFront, RDS — les briques classiques pour du serverless et du hosting.",
    },
    {
      id: "datadog",
      label: "Datadog",
      family: "infra",
      level: "Notions",
      description: "Monitoring et alerting en production — dashboards, APM, logs centralisés.",
    },
    {
      id: "nix",
      label: "Nix",
      family: "infra",
      level: "Notions",
      description:
        "Environnements de dev reproductibles avec devenv — c'est ce qui fait tourner ce portfolio.",
    },

    // ── Integrations SaaS (5) ─────────────────────────────────────
    {
      id: "hubspot",
      label: "HubSpot",
      family: "integrations",
      level: "Notions",
      description: "Intégration CRM via API — sync contacts, deals, workflows automatisés.",
    },
    {
      id: "chargebee",
      label: "Chargebee",
      family: "integrations",
      level: "Notions",
      description: "Gestion d'abonnements et facturation via API et webhooks.",
    },
    {
      id: "mixpanel",
      label: "Mixpanel",
      family: "integrations",
      level: "Notions",
      description: "Analytics produit — tracking d'événements, funnels, rétention.",
    },
    {
      id: "intercom",
      label: "Intercom",
      family: "integrations",
      level: "Notions",
      description: "Intégration du widget et des APIs pour le support client in-app.",
    },
    {
      id: "contentful",
      label: "Contentful",
      family: "integrations",
      level: "Notions",
      description: "CMS headless — modèles de contenu, API GraphQL, webhooks de publication.",
    },
  ],

  edges: [
    // ── Frontend core ─────────────────────────────────────────────
    { source: "react", target: "nextjs" },
    { source: "react", target: "typescript" },
    { source: "react", target: "tailwindcss" },
    { source: "nextjs", target: "typescript" },
    { source: "vite", target: "react" },
    { source: "angular", target: "typescript" },
    { source: "angular", target: "scss" },

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
