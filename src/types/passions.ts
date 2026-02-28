/** Bloc de la section Passions sur la home (ton pro). */
export type PassionsBlock = {
  id: string;
  title: string;
  items: string[];
  closing: string;
};

/** Contenu de la section Passions sur la home (teaser, ton pro). */
export type PassionsSectionContent = {
  title: string;
  /** Sous-titre ou accroche courte. */
  subtitle: string;
  blocks: PassionsBlock[];
  /** Libellé du lien optionnel vers la page À propos. */
  linkToAProposLabel?: string;
};

/** Section ou paragraphe de la page À propos (ton perso). */
export type AProposSection = {
  id: string;
  title: string;
  content: string;
};

/** Contenu de la page À propos (détail, ton perso). */
export type AProposContent = {
  title: string;
  /** Ex. "En dehors du code". */
  subtitle: string;
  sections: AProposSection[];
};
