import type { AProposContent, PassionsSectionContent } from "@/types/passions";

/** Section Passions sur la home (teaser, ton pro). Modifiable ici. */
export const passionsSectionContent: PassionsSectionContent = {
  title: "Passions",
  subtitle:
    "En dehors du code, le voyage, les side projects et le sport occupent une bonne place.",
  blocks: [
    {
      id: "sport",
      title: "Sport & plein air",
      items: ["🚴 Cyclisme", "🏃 Running", "🎾 Padel", "🥾 Randonnée"],
      closing: "Des sports variés mais complémentaires.",
    },
    {
      id: "side-projects",
      title: "Side projects",
      items: [
        "🏠 Domotique (Home Assistant)",
        "🖨️ Impression 3D",
        "⌨️ Outils dev",
      ],
      closing: "Des expérimentations qui s'enchaînent.",
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
      closing: "Appareil photo toujours dans la poche.",
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
      id: "sport",
      title: "Sport & plein air",
      content:
        "Vélo de route, running, randos en montagne, padel — le mouvement occupe une bonne partie de mes semaines. J’aime alterner effort solitaire et sports avec des amis selon l’humeur.",
    },
    {
      id: "side-projects",
      title: "Domotique & impression 3D",
      content:
        "À la maison, j’automatise ce que je peux (Home Assistant, scripts perso) et je conçois ou répare des pièces en impression 3D. Un terrain d’expérimentation sans contraintes — là où j’apprends souvent le plus vite.",
    },
    {
      id: "voyage",
      title: "Voyage",
      content:
        "Quelques destinations marquantes : Lençóis Maranhenses, Rio, et plusieurs escapades en Europe. Les photos récupèrent souvent une vie sur ce site — dans les fonds, le hero, et peut-être des endroits cachés.",
    },
  ],
};
