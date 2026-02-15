import type { HeroTech, SiteContent } from "@/types/site";

export const siteContent: SiteContent = {
  ownerName: "Florian Lauer",
  heroTitle: "Senior Fullstack Engineer",
  heroSubtitle: "Je conçois des experiences web robustes, utiles et lisibles.",
  heroImage: {
    src: "/hero-1.jpeg",
    alt: "Portrait illustre de Florian Lauer",
  },
  primaryCta: {
    label: "Me contacter",
    href: "https://www.linkedin.com/in/florian-lauer/",
  },
};

export const heroStack: HeroTech[] = [
  { id: "typescript", label: "TypeScript" },
  { id: "react", label: "React" },
  { id: "nextjs", label: "Next.js" },
  { id: "nodejs", label: "Node.js" },
];
