import type { StackGraph } from "@/types/stack-graph";

export const stackGraph = {
  familyColors: [
    { family: "frontend", label: "Frontend", color: "oklch(0.75 0.18 85)" },
    { family: "mobile", label: "Mobile", color: "oklch(0.70 0.19 55)" },
    {
      family: "backend",
      label: "Backend & API",
      color: "oklch(0.68 0.16 230)",
    },
    { family: "data", label: "Data", color: "oklch(0.72 0.14 195)" },
    { family: "infra", label: "Infra / DevOps", color: "oklch(0.70 0.14 170)" },
    {
      family: "integrations",
      label: "Integrations SaaS",
      color: "oklch(0.65 0.20 300)",
    },
    {
      family: "methods",
      label: "Méthodes & Architecture",
      color: "oklch(0.72 0.15 145)",
    },
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
      level: "Avancé",
      description:
        "Framework React que je connais bien — App Router, SSR, RSC. Utilisé sur plusieurs projets perso et pro.",
    },
    {
      id: "typescript",
      label: "TypeScript",
      family: "frontend",
      level: "Expert",
      description:
        "Sur tous mes projets depuis 2019. Une fois passé aux types stricts, retour en JS pur impossible.",
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
      level: "Intermédiaire",
      description: "Utilisé avant Tailwind — je sais m'en servir mais je n'y reviens plus.",
    },
    {
      id: "styled-components",
      label: "Styled Components",
      family: "frontend",
      level: "Avancé",
      description: "CSS-in-JS utilisé sur les projets professionnels au quotidien.",
    },
    {
      id: "gatsbyjs",
      label: "Gatsby",
      family: "frontend",
      level: "Intermédiaire",
      description:
        "Générateur de sites statiques React — utilisé pour des sites vitrines avant l'adoption de Next.js.",
    },

    // ── Mobile (3) ────────────────────────────────────────────────
    {
      id: "capacitor",
      label: "Capacitor (iOS/Android)",
      family: "mobile",
      level: "Expert",
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
      level: "Expert",
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
      level: "Expert",
      description:
        "Bien structuré pour les grosses APIs : modules, guards, interceptors. Quand on est plusieurs sur le code, ça aide.",
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
      level: "Notions",
      description:
        "Notions seulement. J'ai consommé et produit des messages en prod, mais sans avoir géré la stack moi-même.",
    },

    // ── Data (4) ──────────────────────────────────────────────────
    {
      id: "postgresql",
      label: "PostgreSQL",
      family: "data",
      level: "Avancé",
      description: "Ma base par défaut. Tient la charge, et la doc Postgres reste la référence.",
    },
    {
      id: "mysql",
      label: "MySQL",
      family: "data",
      level: "Avancé",
      description: "Utilisé sur des projets legacy, je préfère PostgreSQL.",
    },
    {
      id: "drizzle",
      label: "Drizzle ORM",
      family: "data",
      level: "Avancé",
      description: "Plus léger que Prisma, mieux typé. Je l'adopte sur les nouveaux projets perso.",
    },
    {
      id: "prisma",
      label: "Prisma",
      family: "data",
      level: "Intermédiaire",
      description: "ORM bien typé, utilisé sur NestJS avant Drizzle.",
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
      description:
        "Conteneurisation systématique. Dockerfiles multi-stage, compose, registries. Utilisé en perso comme en entreprise.",
    },
    {
      id: "github-actions",
      label: "GitHub Actions",
      family: "infra",
      level: "Avancé",
      description: "Pipelines CI/CD sur tous mes repos — tests, lint, deploy automatisés.",
    },
    {
      id: "aws",
      label: "AWS (Lambda, S3, RDS, ECS, ECR, Route 53, etc.)",
      family: "infra",
      level: "Avancé",
      description:
        "Lambda, S3, CloudFront, RDS, ECS, ECR, Route 53, etc. — les briques classiques pour du serverless et du hosting.",
    },
    {
      id: "datadog",
      label: "Datadog",
      family: "infra",
      level: "Avancé",
      description: "Monitoring et alerting en production — dashboards, APM, logs centralisés.",
    },
    {
      id: "nix",
      label: "Nix",
      family: "infra",
      level: "Notions",
      description:
        "Environnements de dev reproductibles avec devenv — j'essaie de l'utiliser partout.",
    },

    // ── Integrations SaaS (5) ─────────────────────────────────────
    {
      id: "hubspot",
      label: "HubSpot",
      family: "integrations",
      level: "Avancé",
      description: "Intégration CRM via API — sync contacts, deals, workflows automatisés.",
    },
    {
      id: "chargebee",
      label: "Chargebee",
      family: "integrations",
      level: "Avancé",
      description: "Gestion d'abonnements et facturation via API et webhooks.",
    },
    {
      id: "mixpanel",
      label: "Mixpanel",
      family: "integrations",
      level: "Expert",
      description: "Analytics produit — tracking d'événements, funnels, rétention.",
    },
    {
      id: "intercom",
      label: "Intercom",
      family: "integrations",
      level: "Avancé",
      description: "Intégration du widget et des APIs pour le support client in-app.",
    },
    {
      id: "contentful",
      label: "Contentful",
      family: "integrations",
      level: "Avancé",
      description: "CMS headless — modèles de contenu, API GraphQL, webhooks de publication.",
    },

    // ── Méthodes & Architecture (5) ──────────────────────────────
    {
      id: "tdd",
      label: "TDD",
      family: "methods",
      level: "Avancé",
      description:
        "Test-Driven Development appliqué au quotidien — red/green/refactor pour un code fiable.",
    },
    {
      id: "ddd",
      label: "DDD",
      family: "methods",
      level: "Avancé",
      description:
        "Domain-Driven Design — bounded contexts, agrégats, ubiquitous language pour modéliser le métier.",
    },
    {
      id: "hexagonal",
      label: "Architecture Hexagonale",
      family: "methods",
      level: "Expert",
      description: "Ports & Adapters — découplage du domaine métier des dépendances techniques.",
    },
    {
      id: "cqrs",
      label: "CQRS",
      family: "methods",
      level: "Intermédiaire",
      description: "Séparation lecture/écriture pour des systèmes scalables et maintenables.",
    },
    {
      id: "clean-architecture",
      label: "Clean Architecture",
      family: "methods",
      level: "Expert",
      description:
        "Structuration en couches avec inversion de dépendances — code métier isolé et testable.",
    },
    {
      id: "microservices",
      label: "Microservices",
      family: "methods",
      level: "Avancé",
      description:
        "Découpage en services autonomes communiquant par API et événements — déployés indépendamment.",
    },
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
