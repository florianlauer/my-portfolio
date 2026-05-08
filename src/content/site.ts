import type { HeroTech, SiteContent } from "@/types/site";

export const siteContent: SiteContent = {
  ownerName: "Florian Lauer",
  heroTitle: "Senior Fullstack Engineer · orienté produit",
  heroSubtitle:
    "Dev fullstack senior, ~9 ans d'XP, formation en embarqué. Je code aux côtés des PM et designers, et j'aime regarder les chiffres avant de toucher au code.",
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
