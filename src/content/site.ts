import type { HeroTech, SiteIdentity } from "@/types/site";

export const siteIdentity: SiteIdentity = {
  ownerName: "Florian Lauer",
  primaryCtaHref: "https://www.linkedin.com/in/florian-lauer/",
  heroImage: {
    src: "/hero-1.jpeg",
  },
  contactEmail: "contact@flauercase.dev",
};

export const heroStack: HeroTech[] = [
  { id: "typescript", label: "TypeScript" },
  { id: "react", label: "React" },
  { id: "nestjs", label: "NestJS" },
  { id: "nodejs", label: "Node.js" },
];
