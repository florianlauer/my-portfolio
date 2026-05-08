import type { AProposContent, PassionsSectionContent } from "@/types/passions";

/** Section Passions sur la home (teaser, ton pro). Modifiable ici. */
export const passionsSectionContent: PassionsSectionContent = {
  title: "Passions",
  subtitle:
    "A part le code : voyage en Amérique latine, domotique à la maison, et pas mal de sports différents.",
  blocks: [
    {
      id: "sport",
      title: "Sport & plein air",
      items: ["🚴 Cyclisme", "🏃 Running", "🎾 Padel", "🥾 Randonnée"],
      closing: "Solo ou à plusieurs, ça dépend des jours.",
    },
    {
      id: "side-projects",
      title: "Side projects",
      items: ["🏠 Domotique (Home Assistant)", "🖨️ Impression 3D", "⌨️ Outils dev"],
      closing: 'Mes "ce serait pratique si..." qui finissent imprimés.',
    },
    {
      id: "voyage",
      title: "Voyage",
      items: [
        "🌍 Europe · 15 pays",
        "🌎 Amériques · 4 pays",
        "🌏 Asie · 2 pays",
        "📷 Photographie",
      ],
      closing: "Tout shooté à l'iPhone.",
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
        "Florian, dev senior fullstack, avec une formation embarqué au départ. J'aime bosser en pairing avec les PM et les designers, comprendre ce que veulent vraiment les utilisateurs, et regarder les métriques avant d'attaquer du code.",
    },
    {
      id: "sport",
      title: "Sport & plein air",
      content:
        "Vélo de route, running, padel, randos en montagne. Quand j'ai besoin de m'aérer la tête, le vélo gagne. Sinon je fais du padel pour une session plus intense.",
    },
    {
      id: "side-projects",
      title: "Domotique & impression 3D",
      content:
        "À la maison, Home Assistant pilote les lumières, les capteurs de température et de CO2. À côté, l'imprimante 3D sort surtout des petits outils du quotidien : support brosse à dent, mini armoire à piles, et tous les \"ça serait pratique si...\" qu'on finit par modéliser. C'est souvent là que j'apprends le plus.",
    },
    {
      id: "voyage",
      title: "Voyage",
      content:
        "Une obsession Amériques (Brésil, Colombie, Guatemala, Belize) qui est née par hasard, mais quelques détours par l'Asie également (Malaisie, Inde). Deux moments m'ont marqués : Tuk-tuk vers le Taj Mahal sous 40°C — croisé en route une procession de Kanwariyas, pèlerins de Shiva qui rapportent l'eau du Gange sur des kilomètres, musique à fond et bâtons d'eau en équilibre sur l'épaule, et la Comuna 13 de Medellín, visitée avec un guide local qui a vu le quartier passer du pire au tourisme. Mes photos sont toutes prises à l'iPhone, et recyclées un peu partout sur ce site — hero, fonds, et deux ou trois endroits cachés.",
    },
  ],
};
