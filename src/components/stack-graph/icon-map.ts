import {
  siReact,
  siNextdotjs,
  siTypescript,
  siTailwindcss,
  siVite,
  siAngular,
  siSass,
  siStyledcomponents,
  siGatsby,
  siCapacitor,
  siBitrise,
  siNodedotjs,
  siNestjs,
  siExpress,
  siGraphql,
  siFastapi,
  siApachekafka,
  siPostgresql,
  siMysql,
  siDrizzle,
  siPrisma,
  siTerraform,
  siDocker,
  siGithubactions,
  siDatadog,
  siNixos,
  siHubspot,
  siMixpanel,
  siIntercom,
  siContentful,
} from "simple-icons";

type IconEntry = { path: string; viewBox: string };

/**
 * Maps node IDs to simple-icons SVG path data.
 * Nodes without a match return undefined (text-only pill fallback).
 */
export const iconMap: Record<string, IconEntry | undefined> = {
  // Frontend
  react: { path: siReact.path, viewBox: "0 0 24 24" },
  nextjs: { path: siNextdotjs.path, viewBox: "0 0 24 24" },
  typescript: { path: siTypescript.path, viewBox: "0 0 24 24" },
  tailwindcss: { path: siTailwindcss.path, viewBox: "0 0 24 24" },
  vite: { path: siVite.path, viewBox: "0 0 24 24" },
  angular: { path: siAngular.path, viewBox: "0 0 24 24" },
  scss: { path: siSass.path, viewBox: "0 0 24 24" },
  "styled-components": { path: siStyledcomponents.path, viewBox: "0 0 24 24" },
  gatsbyjs: { path: siGatsby.path, viewBox: "0 0 24 24" },

  // Mobile
  capacitor: { path: siCapacitor.path, viewBox: "0 0 24 24" },
  bitrise: { path: siBitrise.path, viewBox: "0 0 24 24" },

  // Backend & API
  nodejs: { path: siNodedotjs.path, viewBox: "0 0 24 24" },
  nestjs: { path: siNestjs.path, viewBox: "0 0 24 24" },
  express: { path: siExpress.path, viewBox: "0 0 24 24" },
  graphql: { path: siGraphql.path, viewBox: "0 0 24 24" },
  "python-fastapi": { path: siFastapi.path, viewBox: "0 0 24 24" },
  kafka: { path: siApachekafka.path, viewBox: "0 0 24 24" },

  // Data
  postgresql: { path: siPostgresql.path, viewBox: "0 0 24 24" },
  mysql: { path: siMysql.path, viewBox: "0 0 24 24" },
  drizzle: { path: siDrizzle.path, viewBox: "0 0 24 24" },
  prisma: { path: siPrisma.path, viewBox: "0 0 24 24" },

  // Infra / DevOps
  terraform: { path: siTerraform.path, viewBox: "0 0 24 24" },
  docker: { path: siDocker.path, viewBox: "0 0 24 24" },
  "github-actions": { path: siGithubactions.path, viewBox: "0 0 24 24" },
  datadog: { path: siDatadog.path, viewBox: "0 0 24 24" },
  nix: { path: siNixos.path, viewBox: "0 0 24 24" },

  // Integrations SaaS
  hubspot: { path: siHubspot.path, viewBox: "0 0 24 24" },
  mixpanel: { path: siMixpanel.path, viewBox: "0 0 24 24" },
  intercom: { path: siIntercom.path, viewBox: "0 0 24 24" },
  contentful: { path: siContentful.path, viewBox: "0 0 24 24" },

  // FastAPI also maps python-fastapi (already mapped above via siFastapi)
  // Nodes without icons: capacitor-plugin, chargebee, aws, tdd, ddd,
  // hexagonal, cqrs, clean-architecture, microservices
};
