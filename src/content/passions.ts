import type { AProposContent, PassionsSectionContent } from "@/types/passions";

/** Section Passions sur la home (teaser, ton pro). Modifiable ici. */
export const passionsSectionContent: PassionsSectionContent = {
  title: "Passions",
  subtitle:
    "En dehors du code, le voyage, les side projects et le sport occupent une bonne place.",
  blocks: [
    {
      id: "voyage",
      title: "Voyage",
      description:
        "Photos et récits de destinations (Lençóis, Rio, Europe…) — à découvrir sur la page À propos.",
    },
    {
      id: "side-projects",
      title: "Side projects",
      description:
        "Projets perso : domotique, outils dev, expérimentations. Détails sur la page À propos.",
    },
    {
      id: "sport",
      title: "Sport",
      description:
        "Course à pied, vélo, sports collectifs. Un peu plus sur moi en cliquant ci-dessous.",
    },
  ],
  linkToAProposLabel: "En savoir plus",
};

/** Page À propos (détail, ton perso). Modifiable ici. */
export const aProposContent: AProposContent = {
  title: "À propos",
  subtitle: "En dehors du code",
  sections: [
    {
      id: "intro",
      title: "Qui je suis",
      content:
        "Florian, senior fullstack engineer. J’aime concevoir des expériences web robustes et lisibles, et en dehors du bureau je m’investis dans le voyage, les side projects et le sport.",
    },
    {
      id: "voyage",
      title: "Voyage",
      content:
        "Lençóis Maranhenses, Rio, et d’autres escapades en Europe et ailleurs. Les photos de voyage nourrissent le hero et les backgrounds du site — et bientôt une 404 façon GeoGuessr.",
    },
    {
      id: "side-projects",
      title: "Side projects",
      content:
        "Domotique, petits outils dev, expérimentations. Des projets que je peux détailler en discussion.",
    },
    {
      id: "sport",
      title: "Sport",
      content:
        "Course à pied, vélo, sports collectifs. L’équilibre entre écran et mouvement compte pour moi.",
    },
  ],
};
