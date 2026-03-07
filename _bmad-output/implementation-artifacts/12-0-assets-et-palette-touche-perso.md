# Story 12.0: Assets et palette (touche perso)

Status: done

## Story

En tant que **Florian**,
je veux fournir mes assets (photos voyages, visuels) et définir la palette de couleurs à appliquer,
afin que le site reflète ma touche perso (fonds, accents) avant d'enchaîner sur motion et nouvelles sections.

## Acceptance Criteria

1. **AC1** - Given le site actuel (noir et blanc), when on démarre la phase « touche perso » d'Epic 12, then le dev demande au producteur : (1) assets (ex. photos voyages pour backgrounds, hero/OG à jour, visuels pour sections passions) ; (2) palette ou direction couleur (accents, fonds).
2. **AC2** - Les assets reçus sont intégrés et la palette appliquée dans le thème (globals.css) avant ou en parallèle des stories 12.1 et 12.2.
3. **AC3** - Point de synchronisation visible : placeholders sur le site pour indiquer où vont les images.

## Implémentation

- **Placeholders visibles** : composant `AssetPlaceholder` (bordure en pointillés ambre, texte clair) affiché aux emplacements prévus pour tes images et la palette.
- **Asset 1** — Image hero (sous le bloc hero) : portrait ou photo voyage. Fichier actuel `public/hero-1.jpeg`. Recommandé 400×400 ou 1200×630 (partage social).
- **Asset 2** — Bandeau photo voyage (entre Hero et Parcours) : bannière plein largeur. Format 1920×400 ou 1920×600.
- **Asset 3** — Photo voyage arrière-plan section Parcours. Format 1920×600.
- **Asset 4** — Image(s) pour future section Passions / À propos (12.2). Format 1200×630 ou 800×600.
- **Asset 5** — Palette couleurs : variables dans `src/app/globals.css` (--primary, --accent, etc.). Tu indiques tes couleurs, on les applique.
- **Flag** : `showAssetPlaceholders` dans `src/content/site.ts`. Mettre à `false` une fois tes assets et la palette en place pour masquer tous les placeholders.

## Attentes par asset (premier plan / arrière-plan, usage)

| Asset                                | Rôle                                       | Premier plan / Arrière-plan  | Détails                                                                                                                                                                                                                                                                              |
| ------------------------------------ | ------------------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **1 — Image hero**                   | Photo principale du hero                   | **Premier plan**             | Sujet principal : portrait ou photo voyage, affiché dans le bloc hero à côté du texte (cadre 140×140 px en mobile, 144×144 px en desktop). Visible immédiatement. Fichier : `public/hero-1.jpeg`. Formats recommandés : 400×400 px (ratio 1:1) ou 1200×630 px (partage social / OG). |
| **2 — Bandeau voyage**               | Transition visuelle entre Hero et Parcours | **Arrière-plan ou bannière** | Bandeau plein largeur entre les deux sections. Soit en arrière-plan avec overlay (texte/contenu par-dessus), soit en bannière visible sans recouvrement. Donne la touche voyage sans être le focus. Dimensions : 1920×400 px ou 1920×600 px. Optionnel.                              |
| **3 — Photo section Parcours**       | Ambiance de la section Parcours            | **Arrière-plan**             | Image en fond (ou bannière en tête) de la section Parcours. Le contenu (titre + cartes chapitres) reste au premier plan ; l’image peut être en arrière-plan avec overlay pour la lisibilité, ou en bandeau en haut de la section. Dimensions : 1920×600 px. Optionnel.               |
| **4 — Image(s) Passions / À propos** | Contenu de la future section (story 12.2)  | **Premier plan**             | Image(s) de contenu au premier plan dans la section Passions ou À propos (illustration, photo perso, visuel). Pas un fond : le visuel est le sujet de la section. Dimensions : 1200×630 px ou 800×600 px. Une ou plusieurs images selon le design de la section.                     |

**Résumé**

- **Premier plan** : Asset 1 (hero), Asset 4 (passions) — ce sont les sujets visuels principaux.
- **Arrière-plan / bannière** : Asset 2 (bandeau), Asset 3 (Parcours) — ils créent l’ambiance sans porter le message principal.

## Fichiers

- `src/components/asset-placeholder/AssetPlaceholder.tsx`
- `src/content/site.ts` (showAssetPlaceholders)
- `src/components/home-sections/HeroSection.tsx`
- `src/components/home-sections/JourneySection.tsx`
- `src/app/page.tsx`

## Versions assets (mémorisées)

### v1 (référence)

- **Asset 2 (Lençóis)** : bandeau **contenu** entre Hero et Parcours (dans la largeur max-w-5xl), `rounded-2xl`, hauteur h-48 / md:h-56. Fichier `public/asset-lencois.jpeg`.
- **Asset 3 (Rio)** : **arrière-plan de la section Parcours** uniquement ; image en fond de `JourneySection` avec overlay `bg-background/85` pour lisibilité. Fichier `public/asset-rio.jpeg`.

### v2 (en cours)

- Assets en **background global** (fixe derrière toute la page), avec parallax / transition au scroll. Pas de bandeau ni de fond par section pour Lençóis/Rio.

## Change Log

- 2026-02-15: Placeholders ajoutés ; story 12.0 marquée done. Prochaine étape : fournir les assets et la direction palette, puis passer showAssetPlaceholders à false et intégrer les fichiers.
