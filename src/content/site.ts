import type { HeroTech, SiteContent } from "@/types/site";

export const siteContent: SiteContent = {
  ownerName: "Florian Lauer",
  heroTitle: "Senior Fullstack Engineer · orienté produit",
  heroSubtitle:
    "Pragmatique, product-driven, formation hardware. Je code en pairing avec PM et designers, je mesure avant d'optimiser.",
  heroImage: {
    src: "/hero-1.jpeg",
    alt: "Portrait illustre de Florian Lauer",
  },
  primaryCta: {
    label: "Me contacter",
    href: "https://www.linkedin.com/in/florian-lauer/",
  },
  contactEmail: "contact@flauercase.dev",
};

export const heroStack: HeroTech[] = [
  { id: "typescript", label: "TypeScript" },
  { id: "react", label: "React" },
  { id: "nestjs", label: "NestJS" },
  { id: "nodejs", label: "Node.js" },
];
