import type { SocialLink } from "@/types/socialLinks";

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/florian-lauer/",
    isPrimary: true,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/florianlauer",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/florianlauer",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/florianlauer",
  },
];

/** Lien de contact principal (isPrimary) ou premier lien ; undefined si tableau vide. */
export const primaryContactLink: SocialLink | undefined =
  socialLinks.find((link) => link.isPrimary) ?? socialLinks[0];
