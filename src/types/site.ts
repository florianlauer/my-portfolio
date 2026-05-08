export type HeroImage = {
  src: string;
};

export type SiteIdentity = {
  ownerName: string;
  /** href du CTA principal (LinkedIn, mail, etc.) */
  primaryCtaHref: string;
  heroImage: HeroImage;
  /** Email de contact (lien mailto:) ; optionnel. */
  contactEmail?: string;
};

export type HeroTech = {
  id: string;
  /** Brand label, non traduisible. */
  label: string;
};
