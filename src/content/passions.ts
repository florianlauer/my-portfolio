import type { AProposContent, PassionsSectionContent } from "@/types/passions";

/** Section Passions sur la home (teaser, ton pro). Modifiable ici. */
export const passionsSectionContent: PassionsSectionContent = {
  title: "Passions",
  subtitle:
    "En dehors du code : voyage en Amérique latine, domotique maison, et trois sports pour vider la tête.",
  blocks: [
    {
      id: "sport",
      title: "Sport & plein air",
      items: ["🚴 Cyclisme", "🏃 Running", "🎾 Padel", "🥾 Randonnée"],
      closing: "Effort solitaire ou collectif, selon l'humeur.",
    },
    {
      id: "side-projects",
      title: "Side projects",
      items: ["🏠 Domotique (Home Assistant)", "🖨️ Impression 3D", "⌨️ Outils dev"],
      closing:
        "Lumières, capteurs CO2, support brosse à dent imprimé. Le quotidien automatisé ou rangé.",
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
      closing: "Amériques, Asie, iPhone toujours en poche.",
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
        "Florian, dev senior fullstack avec une formation à touche hardware. Dev produit avant tout : pairing avec PM et designers, à l'écoute des besoins clients, et pose de KPI pour comprendre d'où viennent vraiment les problèmes avant de coder.",
    },
    {
      id: "sport",
      title: "Sport & plein air",
      content:
        "Vélo de route, running, padel, randos en montagne. Alternance entre l'effort solitaire qui vide la tête et les sports collectifs avec des amis, selon l'humeur du moment.",
    },
    {
      id: "side-projects",
      title: "Domotique & impression 3D",
      content:
        "À la maison, Home Assistant pilote les lumières, les capteurs de température et de CO2. À côté, l'imprimante 3D sort surtout des petits outils du quotidien : support brosse à dent, mini armoire à piles, et tous les \"ça serait pratique si...\" qu'on finit par modéliser. Terrain d'expérimentation libre — souvent là où j'apprends le plus vite.",
    },
    {
      id: "voyage",
      title: "Voyage",
      content:
        "Une obsession Amériques (Brésil, Colombie, Guatemala, Belize) née par hasard, et quelques détours par l'Asie (Malaisie, Inde). Deux moments restent. Tuk-tuk vers le Taj Mahal sous 40°C — croisé en route une procession de Kanwariyas, pèlerins de Shiva qui rapportent l'eau du Gange sur des kilomètres, sound system à fond et bâtons d'eau en équilibre sur l'épaule. Inde au format brut. Et la Comuna 13 de Medellín, visitée avec un guide local qui a vu le quartier passer du pire au touristique. Photos prises à l'iPhone, recyclées sur ce site — hero, fonds, et deux ou trois endroits cachés.",
    },
  ],
};
