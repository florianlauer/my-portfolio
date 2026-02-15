export type PrimaryCta = {
  label: string;
  href: string;
};

export type HeroImage = {
  src: string;
  alt: string;
};

export type SiteContent = {
  ownerName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: HeroImage;
  primaryCta: PrimaryCta;
  /** Email de contact (lien mailto:) ; optionnel. */
  contactEmail?: string;
};

export type HeroTech = {
  id: string;
  label: string;
};
