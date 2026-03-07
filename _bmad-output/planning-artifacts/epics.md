---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
---

# my-portfolio - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for my-portfolio, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Le visiteur peut voir une zone Hero (photo + nom + phrase d'accroche).
FR2: Le visiteur peut voir une ligne stack courte (ex. technologies clés) dans la zone Hero ou immédiatement visible en haut de page.
FR3: Le visiteur peut voir un CTA Contact (lien LinkedIn) visible en ≤ 10s depuis l'arrivée.
FR4: Le visiteur peut parcourir une section Parcours en 3 chapitres (Départ, Expansion, Aujourd'hui).
FR5: Le visiteur peut voir, par chapitre, des éléments visuels/icônes caractérisant les lieux (France, Angleterre, 3e lieu).
FR6: Le visiteur peut voir les compétences associées à chaque chapitre (compétences par étape).
FR7: Le visiteur peut voir un bloc Arsenal (stack structurée, ex. Frontend/Backend/DevOps).
FR8: Le visiteur peut voir des tags skills (liste de compétences) dans l'Arsenal ou à proximité.
FR9: Le visiteur peut atteindre le bloc Arsenal/Stack via un ancrage ou un lien de navigation (récupération edge case).
FR10: Le visiteur peut cliquer sur un CTA qui mène vers LinkedIn (ou canal maîtrisé).
FR11: Le visiteur peut voir des liens vers d'autres réseaux (optionnels) depuis la zone Contact.
FR12: Le visiteur peut naviguer vers les sections Parcours, Arsenal, Contact (ancrages ou menu).
FR13: Le visiteur peut trouver la stack et le contact en ≤ 10s (critère de succès reflété en FR).
FR14: Chaque page/route expose un titre (title) et des balises meta adaptés à l'indexation (ex. Google).
FR15: Le contenu principal est structuré de façon sémantique (titres, landmarks) pour le SEO.
FR16: Le visiteur peut naviguer au clavier (focus, ordre logique).
FR17: Le visiteur bénéficie de contrastes et d'une structure sémantique conformes aux bonnes pratiques (niveau bon).
FR18: Florian peut mettre à jour le contenu du Parcours (texte, lieux, compétences par chapitre) sans dégrader l'expérience (stack + contact restent visibles et accessibles).
FR19: Florian peut mettre à jour l'Arsenal (liste stack, tags) sans dégrader l'expérience.
FR20: Le visiteur peut accéder à plusieurs pages/routes (MPA) : accueil, parcours, contact, etc., selon la structure retenue.

### NonFunctional Requirements

NFR-P1: Le contenu nécessaire pour afficher la stack et le CTA contact (Hero ou équivalent) est rendu suffisamment tôt pour que l'utilisateur puisse les voir en ≤ 10 secondes (conditions réseau normales), sur desktop et mobile.
NFR-P2: Les images du Hero (et autres images above-the-fold) sont optimisées (taille, format) pour ne pas bloquer le premier affichage utile.
NFR-P3: Les animations au scroll restent légères (pas de blocage du thread principal prolongé) pour ne pas empêcher l'accès à la stack et au contact.
NFR-A1: Le site est utilisable au clavier (navigation, focus visible, ordre logique).
NFR-A2: Les contrastes texte/fond respectent les bonnes pratiques (niveau « bon », aligné avec les FR d'accessibilité).
NFR-A3: Les images porteuses d'information ont un équivalent textuel (alt ou alternative).
NFR-S1: Aucune donnée sensible n'est collectée en MVP (pas de formulaire, pas de stockage de données personnelles). Contact via lien externe (LinkedIn) uniquement.
NFR-S2: Le site est servi en HTTPS en production.
NFR-R1: Le site est disponible de façon continue pour la consultation (hébergement standard, pas d'exigence SLA contractuelle pour le MVP).

### Additional Requirements

**Architecture — Starter template (impact Epic 1 Story 1):**

- Initialiser le projet avec `npx create-next-app@latest my-portfolio --tailwind --eslint --app --src-dir --import-alias @/*`
- Post-init : `npx shadcn@latest init` puis `npm install motion`
- Stack : Next.js 15 (App Router), Tailwind 4, TypeScript, Vercel

**Architecture — Données et structure:**

- Pas de base de données en MVP ; contenu dans `src/content/*.ts` (site.ts, journey.ts, arsenal.ts, socialLinks.ts)
- Types partagés dans `src/types/*`
- Consommation : imports directs depuis composants serveur (SSG)
- Assets : `public/` ; images via `next/image`

**Architecture — Sécurité et déploiement:**

- Pas d'authentification en MVP
- Liens externes : `rel="noopener noreferrer"` pour `target="_blank"`
- Hébergement Vercel ; environnements preview + production
- CI : lint + typecheck + build sur chaque push/PR (ex. GitHub Actions)

**Architecture — Frontend:**

- SSG par défaut ; metadata par route (App Router)
- Structure : `src/app`, `src/components`, `src/hooks`, `src/utils`, `src/types`, `src/content`
- Imports absolus `@/…`

**UX — Responsive et accessibilité:**

- Desktop-first ; mobile doit fonctionner correctement et proprement
- Responsive : unités relatives (rem, %, vw) ; media queries à 768px et 1024px ; images responsives (srcset/sizes)
- Pas de largeur fixe en px pour conteneurs principaux
- Accessibilité : focus visible, ARIA si besoin, structure sémantique (landmarks, titres) pour tous les composants

**UX — Motion et interactions:**

- Motion sobre au scroll : parallax sobre, apparition des sections (Parcours, Arsenal), motion qui guide l'œil sans bloquer l'accès à la stack
- Desktop : scroll parallax + hover states ; mobile : motion fonctionnel
- Jamais de motion qui ralentit ou bloque l'accès à la stack et au contact (priorité ≤ 10s)

**UX — Navigation et repères:**

- Ancrages clairs (Arsenal, Parcours, Contact) ; navigation sticky optionnelle pour "edge case recovery"
- Repères visuels par section ; pas de scroll infini aveugle
- Indicateurs de progression possibles (menu actif, repères de section)

**UX — Design system:**

- Shadcn UI + Tailwind ; palette douce et chaude ; typographie claire
- Composants custom : Hero, Parcours (chapitres), Arsenal (vue statique MVP), CTA Contact
- Arsenal : groupement par familles (Frontend/Backend/DevOps), relations visuelles entre langages et frameworks (code couleur, hiérarchie graphique)

### FR Coverage Map

FR1: Epic 2 — Hero, stack & CTA (zone Hero)
FR2: Epic 2 — Hero, stack & CTA (ligne stack)
FR3: Epic 2 — Hero, stack & CTA (CTA visible ≤10s)
FR4: Epic 4 — Parcours (3 chapitres)
FR5: Epic 4 — Parcours (visuels/icônes par lieu)
FR6: Epic 4 — Parcours (compétences par chapitre)
FR7: Epic 5 — Arsenal (bloc stack structuré)
FR8: Epic 5 — Arsenal (tags skills)
FR9: Epic 3 — Navigation & ancrages (accès Arsenal)
FR10: Epic 6 — Contact & réseaux (CTA LinkedIn)
FR11: Epic 6 — Contact & réseaux (liens autres réseaux)
FR12: Epic 3 — Navigation & ancrages (sections Parcours, Arsenal, Contact)
FR13: Epic 2 — Hero, stack & CTA (stack + contact trouvables ≤10s)
FR14: Epic 1 — Foundation (title/meta par route)
FR15: Epic 1 — Foundation (structure sémantique)
FR16: Epic 7 — Accessibilité & SEO (navigation clavier)
FR17: Epic 7 — Accessibilité & SEO (contrastes, sémantique)
FR18: Epic 1 — Foundation (mise à jour Parcours sans dégrader)
FR19: Epic 1 — Foundation (mise à jour Arsenal sans dégrader)
FR20: Epic 1 — Foundation (MPA, routes)

## Epic List

### Epic 1: Foundation & pipeline de contenu

Projet initialisé (create-next-app, shadcn, motion), structure `src/content` + `src/types`, layout et metadata ; contenu Parcours/Arsenal modifiable sans casser l’UX. Le visiteur peut accéder à une page/routes ; Florian peut mettre à jour le contenu.
**FRs couverts :** FR14, FR15, FR18, FR19, FR20.

### Epic 2: Hero, stack & CTA

Zone Hero (photo, nom, phrase d’accroche), ligne stack visible en haut, CTA LinkedIn visible en ≤10s. Le visiteur trouve la stack et le contact immédiatement.
**FRs couverts :** FR1, FR2, FR3, FR13.

### Epic 3: Navigation & ancrages

Menu ou ancrages vers Parcours, Arsenal, Contact ; accès direct au bloc Arsenal (récupération edge case). Le visiteur navigue entre sections sans scroll aveugle.
**FRs couverts :** FR9, FR12.

### Epic 4: Parcours

Section Parcours en 3 chapitres (Départ, Expansion, Aujourd’hui), visuels/icônes par lieu, compétences par chapitre. Le visiteur comprend le parcours et les compétences par étape.
**FRs couverts :** FR4, FR5, FR6.

### Epic 5: Arsenal

Bloc Arsenal (stack par familles Frontend/Backend/DevOps), tags skills. Le visiteur voit la stack structurée et les compétences.
**FRs couverts :** FR7, FR8.

### Epic 6: Contact & réseaux

CTA LinkedIn cliquable et liens vers autres réseaux depuis la zone Contact. Le visiteur peut contacter et accéder aux autres réseaux.
**FRs couverts :** FR10, FR11.

### Epic 7: Accessibilité & SEO

Navigation au clavier, focus visible, contrastes, structure sémantique (landmarks, titres). Le visiteur bénéficie d’un niveau d’accessibilité « bon ».
**FRs couverts :** FR16, FR17.

---

## Epic 1: Foundation & pipeline de contenu

Projet initialisé (create-next-app, shadcn, motion), structure `src/content` + `src/types`, layout et metadata ; contenu Parcours/Arsenal modifiable sans casser l'UX. **FRs couverts :** FR14, FR15, FR18, FR19, FR20.

### Story 1.1: Initialisation du projet Next.js avec stack et design system

En tant que **Florian (propriétaire)**,
je veux que le projet soit initialisé avec Next.js, Tailwind, shadcn et motion,
afin d'avoir une base technique alignée avec l'architecture et prête pour le contenu.

**Acceptance Criteria:**

**Given** aucun projet Next.js existant dans le repo
**When** j'exécute les commandes d'init (create-next-app, shadcn init, npm install motion)
**Then** le projet démarre avec `npm run dev`, Tailwind et l'alias `@/*` fonctionnent, et les composants shadcn sont disponibles
**And** la structure `src/app`, `src/components`, `src/hooks`, `src/utils`, `src/types` existe (dossiers vides ou avec fichiers de base)

### Story 1.2: Structure du contenu et types (src/content, src/types)

En tant que **Florian**,
je veux que le contenu éditable vive dans `src/content/*.ts` et les types dans `src/types/*.ts`,
afin de pouvoir mettre à jour Parcours et Arsenal sans toucher aux composants (FR18, FR19).

**Acceptance Criteria:**

**Given** le projet est initialisé (Story 1.1)
**When** j'ajoute les fichiers `src/content/site.ts`, `journey.ts`, `arsenal.ts`, `socialLinks.ts` et les types correspondants dans `src/types/`
**Then** chaque fichier content exporte des données typées (ex. `journeyChapters`, `arsenalItems`) et les types sont réutilisables par les composants
**And** aucun import circulaire ; les types sont dans `src/types/` (ex. `journey.ts`, `arsenal.ts`, `site.ts`)

### Story 1.3: Layout racine et metadata SEO de base

En tant que **visiteur**,
je veux que la page ait un layout commun et des balises title/meta correctes,
afin que le site soit indexable et sémantique (FR14, FR15).

**Acceptance Criteria:**

**Given** la structure content/types est en place (Story 1.2)
**When** je consulte la page d'accueil
**Then** un `layout.tsx` racine dans `src/app` enveloppe le contenu et exporte un objet `metadata` (title, description)
**And** le HTML de la page contient des balises sémantiques (ex. `<main>`, titres hiérarchiques) et les meta sont présentes dans le `<head>`

### Story 1.4: Page d'accueil avec structure MPA et contenu injecté

En tant que **visiteur**,
je veux une page d'accueil qui charge le contenu depuis `src/content` et affiche une structure de sections (placeholders si besoin),
afin que le site soit une MPA fonctionnelle et que le contenu soit modifiable sans refonte (FR20).

**Acceptance Criteria:**

**Given** le layout et les content sont en place (Stories 1.2, 1.3)
**When** je charge la route d'accueil
**Then** la page est générée en SSG (pas de fetch runtime), les données sont importées depuis `src/content/*` et passées en props aux composants de section
**And** la page reste lisible et sans erreur si des sections sont encore des placeholders

---

## Epic 2: Hero, stack & CTA

Zone Hero (photo, nom, phrase d'accroche), ligne stack visible en haut, CTA LinkedIn visible en ≤10s. **FRs couverts :** FR1, FR2, FR3, FR13.

### Story 2.1: Zone Hero (photo, nom, phrase d'accroche)

En tant que **visiteur**,
je veux voir une zone Hero avec photo, nom et phrase d'accroche,
afin de comprendre immédiatement de qui il s'agit (FR1).

**Acceptance Criteria:**

**Given** la page d'accueil et le contenu `site.ts` (ou équivalent) fournissent titre, sous-titre, chemin image
**When** je charge la page
**Then** une section Hero affiche la photo (via `next/image`), le nom et la phrase d'accroche
**And** l'image Hero est optimisée (NFR-P2) et a un attribut `alt` pertinent (NFR-A3)

### Story 2.2: Ligne stack visible dans le Hero

En tant que **visiteur**,
je veux voir une ligne stack courte (technologies clés) dans le Hero ou immédiatement en haut de page,
afin de trouver la stack en ≤10s (FR2, FR13).

**Acceptance Criteria:**

**Given** le Hero est affiché (Story 2.1) et le contenu fournit la liste stack (ex. dans `site.ts` ou `arsenal.ts`)
**When** je charge la page ou fais un scroll minimal
**Then** une ligne stack (ex. "TypeScript · React · Node") est visible dans le Hero ou juste en dessous, sans scroll long
**And** le contenu stack est issu de `src/content` (pas de hardcode dans le composant)

### Story 2.3: CTA Contact LinkedIn visible ≤10s

En tant que **visiteur**,
je veux voir un CTA Contact (lien LinkedIn) visible en ≤10 secondes depuis l'arrivée,
afin de pouvoir contacter sans chercher (FR3, FR13).

**Acceptance Criteria:**

**Given** le Hero et la stack sont visibles (Stories 2.1, 2.2)
**When** je charge la page
**Then** un lien CTA vers LinkedIn est visible dans le Hero ou en haut de page (above-the-fold), avec `rel="noopener noreferrer"` si `target="_blank"`
**And** le lien est chargé depuis `src/content/socialLinks.ts` (ou équivalent) ; NFR-P1 respecté (stack + CTA visibles ≤10s)

---

## Epic 3: Navigation & ancrages

Menu ou ancrages vers Parcours, Arsenal, Contact ; accès direct au bloc Arsenal. **FRs couverts :** FR9, FR12.

### Story 3.1: Ancrages et liens de navigation (Parcours, Arsenal, Contact)

En tant que **visiteur**,
je veux naviguer vers les sections Parcours, Arsenal et Contact via un menu ou des ancres,
afin de ne pas dépendre du scroll aveugle (FR12).

**Acceptance Criteria:**

**Given** la page contient des sections Parcours, Arsenal, Contact (ou placeholders avec id)
**When** je clique sur un lien de navigation (Parcours, Arsenal, Contact)
**Then** la page scroll vers la section correspondante (ancres `#parcours`, `#arsenal`, `#contact` ou équivalent)
**And** les liens sont accessibles au clavier et l’ordre de focus est logique (NFR-A1)

### Story 3.2: Accès direct au bloc Arsenal (récupération edge case)

En tant que **visiteur pressé**,
je veux atteindre le bloc Arsenal/Stack via un ancrage ou un lien dédié,
afin de trouver la stack même si j’ai raté le Hero (FR9).

**Acceptance Criteria:**

**Given** la navigation par ancres est en place (Story 3.1)
**When** je clique sur un lien "Arsenal" ou "Stack" (menu ou CTA dédié)
**Then** la page scroll jusqu’au bloc Arsenal et le contenu stack est visible
**And** ce comportement fonctionne au clavier et sur mobile

---

## Epic 4: Parcours

Section Parcours en 3 chapitres (Départ, Expansion, Aujourd’hui), visuels/icônes par lieu, compétences par chapitre. **FRs couverts :** FR4, FR5, FR6.

### Story 4.1: Section Parcours avec 3 chapitres

En tant que **visiteur**,
je veux parcourir une section Parcours en 3 chapitres (Départ, Expansion, Aujourd’hui),
afin de comprendre le parcours géographique (FR4).

**Acceptance Criteria:**

**Given** le contenu `src/content/journey.ts` (et types `src/types/journey.ts`) définit au moins 3 chapitres avec titre, lieu, description
**When** je scroll ou navigue vers la section Parcours
**Then** une section affiche 3 blocs/chapitres (Départ, Expansion, Aujourd’hui) avec titre et texte pour chaque chapitre
**And** les données viennent de `src/content/journey.ts` ; mise à jour du fichier change le contenu sans casser l’UX (FR18)

### Story 4.2: Visuels/icônes par lieu et compétences par chapitre

En tant que **visiteur**,
je veux voir, par chapitre, des éléments visuels ou icônes caractérisant les lieux et les compétences associées,
afin d’avoir une lecture riche du parcours (FR5, FR6).

**Acceptance Criteria:**

**Given** les chapitres sont affichés (Story 4.1) et le modèle de contenu inclut visuels/icônes et liste de compétences par chapitre
**When** je consulte chaque chapitre
**Then** chaque chapitre affiche un visuel ou une icône (image ou composant) pour le lieu (France, Angleterre, etc.) et une liste de compétences
**And** les compétences et visuels sont issus de `src/content/journey.ts` ; structure sémantique (titres, listes) pour SEO et accessibilité

---

## Epic 5: Arsenal

Bloc Arsenal (stack par familles Frontend/Backend/DevOps), tags skills. **FRs couverts :** FR7, FR8.

### Story 5.1: Bloc Arsenal structuré (Frontend / Backend / DevOps)

En tant que **visiteur**,
je veux voir un bloc Arsenal avec la stack structurée par familles (ex. Frontend, Backend, DevOps),
afin de comprendre rapidement les compétences techniques (FR7).

**Acceptance Criteria:**

**Given** le contenu `src/content/arsenal.ts` (et types `src/types/arsenal.ts`) définit des familles et des items (technos) par famille
**When** je scroll ou navigue vers la section Arsenal
**Then** une section affiche les familles (ex. Frontend, Backend, DevOps) avec les technologies listées sous chaque famille
**And** les données viennent de `src/content/arsenal.ts` ; mise à jour du fichier met à jour l’affichage sans casser l’UX (FR19)

### Story 5.2: Tags skills dans l'Arsenal

En tant que **visiteur**,
je veux voir des tags skills (liste de compétences) dans ou à proximité de l’Arsenal,
afin d’avoir une vue détaillée des compétences (FR8).

**Acceptance Criteria:**

**Given** le bloc Arsenal est affiché (Story 5.1) et le modèle contient des tags/skills (ex. par famille ou liste globale)
**When** je consulte la section Arsenal
**Then** des tags ou badges skills sont visibles (dans les familles ou en complément), lisibles et accessibles au clavier
**And** les tags sont issus de `src/content/arsenal.ts` ; hiérarchie visuelle claire (UX : groupement, code couleur si défini)

---

## Epic 6: Contact & réseaux

CTA LinkedIn cliquable et liens vers autres réseaux depuis la zone Contact. **FRs couverts :** FR10, FR11.

### Story 6.1: CTA LinkedIn cliquable et zone Contact

En tant que **visiteur**,
je veux cliquer sur un CTA qui mène vers LinkedIn (ou canal maîtrisé),
afin de pouvoir contacter facilement (FR10).

**Acceptance Criteria:**

**Given** le CTA LinkedIn est visible (Story 2.3) ou une zone Contact existe
**When** je clique sur le CTA Contact / LinkedIn
**Then** une nouvelle fenêtre/onglet s’ouvre vers l’URL LinkedIn configurée, avec `rel="noopener noreferrer"` si `target="_blank"`
**And** l’URL est définie dans `src/content/socialLinks.ts` (ou équivalent) ; NFR-S1 respecté (pas de collecte, lien externe uniquement)

### Story 6.2: Liens vers autres réseaux (rel noopener noreferrer)

En tant que **visiteur**,
je veux voir des liens vers d’autres réseaux depuis la zone Contact,
afin d’accéder à tous les canaux de contact (FR11).

**Acceptance Criteria:**

**Given** la zone Contact existe (Story 6.1) et `socialLinks.ts` contient d’autres liens (ex. GitHub, Twitter)
**When** je consulte la section Contact
**Then** les liens vers les autres réseaux sont affichés et cliquables ; chaque lien externe avec `target="_blank"` a `rel="noopener noreferrer"`
**And** les liens sont chargés depuis `src/content/socialLinks.ts` ; accessibles au clavier

---

## Epic 7: Accessibilité & SEO

Navigation clavier, focus visible, contrastes, structure sémantique. **FRs couverts :** FR16, FR17.

### Story 7.1: Navigation clavier et focus visible

En tant que **visiteur utilisant le clavier**,
je veux naviguer dans le site au clavier avec un focus visible et un ordre logique,
afin d’utiliser le site sans souris (FR16, NFR-A1).

**Acceptance Criteria:**

**Given** toutes les sections et liens sont en place (Epics 1–6)
**When** je navigue au clavier (Tab, Shift+Tab, Enter)
**Then** tous les liens et contrôles interactifs sont atteignables et l’ordre de focus est logique
**And** le focus est visible (outline ou style dédié) ; pas de piège au clavier (NFR-A1)

### Story 7.2: Contrastes et structure sémantique (landmarks, titres)

En tant que **visiteur**,
je veux bénéficier de contrastes texte/fond conformes aux bonnes pratiques et d’une structure sémantique (landmarks, titres),
afin d’avoir un niveau d’accessibilité « bon » et un SEO renforcé (FR17, NFR-A2).

**Acceptance Criteria:**

**Given** les pages et sections sont rendues (Epics 1–6)
**When** je consulte le site (ou un outil d’audit a11y)
**Then** les contrastes texte/fond respectent les bonnes pratiques (niveau « bon ») et les sections utilisent des landmarks sémantiques (ex. `<main>`, `<nav>`, `<section>`, titres h1–h6)
**And** les images porteuses d’information ont un `alt` pertinent (NFR-A3) ; la structure est cohérente sur toutes les pages
