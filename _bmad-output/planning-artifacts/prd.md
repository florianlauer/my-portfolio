---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete']
inputDocuments: ['_bmad-output/planning-artifacts/product-brief-my-portfolio-2026-02-01.md']
workflowType: 'prd'
briefCount: 1
researchCount: 0
brainstormingCount: 0
projectDocsCount: 0
documentCounts:
  briefCount: 1
  researchCount: 0
  brainstormingCount: 0
  projectDocsCount: 0
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
---

# Product Requirements Document - my-portfolio

**Author:** Florian
**Date:** 2026-02-01

---

## Success Criteria

### User Success

- **Stack trouvable en ≤ 10 secondes** (depuis l’arrivée sur le site).
- **CTA Contact (LinkedIn) trouvable en ≤ 10 secondes**.
- **Signal “j’en ai appris plus sur lui”** : le visiteur comprend rapidement :
  - le **parcours** (chapitres),
  - les **passions**,
  - la **créativité** (style, motion, contenu).

### Business Success

- **Objectif court terme :** le site sert de référence principale (“je retourne sur le site plutôt que sur un CV papier”).
- **Contacts qualifiés :** tu n’es pas en recherche active ; **< 10 contacts qualifiés** (sur une période comparable, ex. mois) est **OK**.

### Technical Success

- **SEO-friendly** (bonnes pratiques portfolio) : pages indexables, titres/metadata corrects, structure HTML propre.
- **Accessibilité** : navigation clavier, contrastes, structure sémantique (niveau “bon” attendu).
- **Contact sécurisé** :
  - **MVP :** **pas d’email direct**, contact via **LinkedIn** + liens vers autres réseaux.
  - **Plus tard :** formulaire de contact **basique** (avec protections anti-spam si nécessaire).

### Measurable Outcomes

- **Time-to-stack ≤ 10s**
- **Time-to-contact ≤ 10s**
- **Engagement** : temps passé + pages vues, surtout sur les sections personnelles (parcours, passions, etc.)
- **Taux de clic sur LinkedIn** (si mesuré sans tracking intrusif)

## Product Scope

### MVP — Minimum Viable Product

- Hero (photo + présentation)
- Parcours en 3 chapitres + Arsenal (stack/compétences)
- Contact/CTA via LinkedIn (+ autres réseaux)
- UX “propre” : lisible, sobre, accessible ; SEO correct

### Growth Features (Post-MVP)

- Formulaire de contact basique (avec anti-spam si besoin)
- Affinage motion/animations, liens compétences ↔ projets plus poussés
- Pages / sections supplémentaires pour renforcer passions et personnalité

### Vision (Future)

- Carte projets (planisphère style jeu)
- 404 mini GeoGuessr (tes photos, tes pays) + découverte “curieuse” (easter egg)

---

## User Journeys

### Journey 1 — Recruteur (Happy Path : "je valide vite la stack")

**Opening scene** — Camille, recruteuse, arrive depuis LinkedIn. Elle a 2 minutes. Elle veut d'abord répondre : "Stack ? Senior ? Fit ?".

**Rising action** — En haut de page, elle voit immédiatement une **ligne stack** (ex. "TypeScript · React · Node") + un **CTA Contact** visible. Elle scrolle un peu : elle tombe sur le **Parcours en chapitres** (Départ / Expansion / Aujourd'hui) puis sur l'**Arsenal** (Frontend/Backend/DevOps) et des **tags** (skills) qui confirment ses intuitions.

**Climax (moment valeur)** — En **≤ 10 secondes**, elle a trouvé : stack + comment te contacter + un signal clair de seniorité (Arsenal, chapitres). Elle clique sur **LinkedIn**.

**Resolution** — Elle repart en se disant : "J'ai appris plus que sur le CV papier" (parcours + personnalité + propreté du site). Ton site devient sa référence avant l'entretien.

### Journey 2 — Recruteur (Edge Case : "je ne trouve pas / je doute / je suis pressé")

**Opening scene** — Camille arrive sur mobile, réseau moyen. Elle scrolle vite. Elle craint une "démo design" sans info utile.

**Rising action** — Elle cherche la stack mais ne la voit pas immédiatement (ou les animations lui donnent l'impression de lenteur). Elle hésite à partir.

**Climax (récupération)** — Elle repère un **ancrage "Arsenal"** (ou une barre sticky légère) + un bouton **"Stack"** qui l'amène directement au bloc compétences. Elle trouve la stack et le CTA contact sans friction.

**Resolution** — Même si elle n'explore pas tout, elle obtient l'essentiel (stack + contact). Elle quitte avec un sentiment "clair et pro", pas "gadget".

### Journey 3 — Client potentiel (Freelance : "est-ce que je peux lui confier un projet ?")

**Opening scene** — Alex, potentiel client, veut évaluer rapidement : fiabilité, style, contact.

**Rising action** — Il voit la stack (ligne + Arsenal), et scrolle pour comprendre le parcours. Il cherche un **point de contact** clair (LinkedIn / réseaux).

**Climax (moment valeur)** — Le CTA "On gravit la suite ensemble ?" est visible. Il clique, contacte via canal maîtrisé.

**Resolution** — Il a une image "senior, propre, goût design", et assez de confiance pour initier un échange.

### Journey 4 — Florian (Création / maintenance : "je mets à jour sans douleur")

**Opening scene** — Tu veux mettre à jour ton Arsenal, ajouter un projet, ajuster une photo, sans "casser" la cohérence.

**Rising action** — Tu modifies ton contenu (chapitres, Arsenal, tags), tu vérifies rapidement que : stack visible en haut, CTA contact visible, pages accessibles/SEO-friendly.

**Climax (moment valeur)** — Tu publies une mise à jour propre, sans régression (lisibilité, perf, accessibilité). Tu gardes une cohérence visuelle (palette, motion sobre).

**Resolution** — Le site reste vivant, et reflète ton parcours au fil du temps.

### Journey Requirements Summary

- **Stack visible immédiatement** (ligne courte) + **CTA LinkedIn visible** (≤ 10s).
- **Arsenal structuré** (Frontend/Backend/DevOps) + **tags skills** (évolutifs, futurs liens skills↔projets).
- **Navigation / ancrages** (ex. "Arsenal", "Parcours", "Contact") pour éviter la friction (edge case).
- **Mobile + perf** : éviter que l'animation empêche l'accès à l'info.
- **SEO + accessibilité** : structure sémantique, clavier, contrastes.
- **Maintenance** : moyen simple d'ajouter/éditer contenu (Parcours/Arsenal) sans dégrader l'expérience.

---

## Web App Specific Requirements

### Project-Type Overview

Portfolio **web_app** : site multi-pages (MPA), ciblant les dernières versions des navigateurs, avec SEO basique et accessibilité "bon niveau". Pas de temps réel.

### Technical Architecture Considerations

- **Architecture :** **MPA** (Multi-Page Application) — plusieurs pages/routes (ex. accueil, parcours, projets, contact) plutôt qu'une seule SPA en scroll infini.
- **Navigateurs :** Dernières versions des navigateurs modernes (Chrome, Firefox, Safari, Edge). Pas de support IE.
- **SEO :** Indexation Google visée. **SEO basique optimal** : balises meta (description, og:*, etc.), titres de page (title) par route, structure HTML sémantique. Sitemap et balisage adaptés si pertinent pour le déploiement.
- **Temps réel :** Non requis pour le MVP (pas de live, pas de WebSockets).
- **Accessibilité :** Bonnes pratiques simples : navigation au clavier, contrastes, structure sémantique (landmarks, titres), textes alternatifs pour les images. Niveau "bon" sans viser un audit complet pour le MVP.

### Required Sections (web_app)

- **browser_matrix :** Chrome, Firefox, Safari, Edge — dernières versions (evergreen). Pas IE.
- **responsive_design :** Site responsive (mobile, tablette, desktop) pour parcours, hero, Arsenal, contact.
- **performance_targets :** Temps de chargement raisonnable ; images optimisées (hero, photos voyage) ; animations au scroll légères pour ne pas bloquer l'accès à l'info (stack + contact en ≤ 10s).
- **seo_strategy :** Meta tags, title par page, structure sémantique ; indexation Google ; "ce qui est le plus optimum" pour un portfolio (meta, titre, contenu principal bien structuré).
- **accessibility_level :** Bonnes pratiques simples (clavier, contrastes, sémantique) — niveau "bon", pas audit complet.

### Implementation Considerations

- Choix technique compatible MPA (ex. Vite + React avec router multi-pages, ou autre stack MPA).
- Gestion des meta/title par route pour le SEO.
- Composants réutilisables pour Hero, Parcours, Arsenal, Contact ; contenu (parcours, stack) modifiable sans refonte (maintenance simple).

---

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

- **Approche :** MVP "expérience" — livrer une expérience claire (stack + contact + parcours) qui tient la promesse "j'en ai appris plus".
- **Minimum utile :** Un recruteur trouve la stack et le contact en ≤ 10s et perçoit parcours/personnalité.
- **Ressources :** À préciser (solo dev ou soutien design/contenu). MVP faisable en solo avec stack type Vite/React/Tailwind.

### Must-Have (MVP)

- Hero (photo + présentation + ligne stack visible).
- Parcours 3 chapitres + Arsenal (stack structurée + tags).
- CTA Contact (LinkedIn + autres réseaux).
- Navigation/ancrages (Arsenal, Parcours, Contact).
- MPA, responsive, SEO basique (meta, title), accessibilité bon niveau.

### Nice-to-Have (post-MVP)

- Formulaire de contact (avec anti-spam).
- Motion/animations affinées, liens compétences↔projets.
- Carte projets (planisphère style jeu).
- 404 mini GeoGuessr (easter egg).

### Phased Roadmap

- **Phase 1 (MVP) :** Hero, Parcours, Arsenal, Contact, SEO/accessibilité.
- **Phase 2 (Growth) :** Formulaire contact, enrichissement motion/contenu.
- **Phase 3 (Vision) :** Carte projets, 404 GeoGuessr.

### Risks & Mitigation

- **Technique :** Faible (stack classique). Mitigation : MPA simple, pas de temps réel.
- **Ressources :** Dépend du temps dispo. Mitigation : MVP strict (pas de carte ni 404 en v1).
- **Marché :** Faible (portfolio personnel). Mitigation : livrer le MVP et itérer selon retours.

---

## Functional Requirements

### Capability Areas

1. **Hero & Présentation** — Première vue, stack visible, identité.
2. **Parcours (chapitres)** — Parcours en 3 lieux, compétences par étape.
3. **Arsenal & Stack** — Stack structurée, tags, ancrage/navigation.
4. **Contact & CTA** — CTA LinkedIn et autres réseaux, pas d'email direct en MVP.
5. **Navigation & Ancrages** — Accès rapide Arsenal, Parcours, Contact (≤ 10s).
6. **SEO & Indexation** — Meta, title par page, structure sémantique.
7. **Accessibilité** — Clavier, contrastes, sémantique (niveau bon).
8. **Maintenance contenu** — Mise à jour Parcours/Arsenal sans casser l'expérience.

### Functional Requirements List

**Hero & Présentation**
- FR1 — Le visiteur peut voir une zone Hero (photo + nom + phrase d'accroche).
- FR2 — Le visiteur peut voir une ligne stack courte (ex. technologies clés) dans la zone Hero ou immédiatement visible en haut de page.
- FR3 — Le visiteur peut voir un CTA Contact (lien LinkedIn) visible en ≤ 10s depuis l'arrivée.

**Parcours**
- FR4 — Le visiteur peut parcourir une section Parcours en 3 chapitres (Départ, Expansion, Aujourd'hui).
- FR5 — Le visiteur peut voir, par chapitre, des éléments visuels/icônes caractérisant les lieux (France, Angleterre, 3e lieu).
- FR6 — Le visiteur peut voir les compétences associées à chaque chapitre (compétences par étape).

**Arsenal & Stack**
- FR7 — Le visiteur peut voir un bloc Arsenal (stack structurée, ex. Frontend/Backend/DevOps).
- FR8 — Le visiteur peut voir des tags skills (liste de compétences) dans l'Arsenal ou à proximité.
- FR9 — Le visiteur peut atteindre le bloc Arsenal/Stack via un ancrage ou un lien de navigation (récupération edge case).

**Contact & CTA**
- FR10 — Le visiteur peut cliquer sur un CTA qui mène vers LinkedIn (ou canal maîtrisé).
- FR11 — Le visiteur peut voir des liens vers d'autres réseaux (optionnels) depuis la zone Contact.

**Navigation & Ancrages**
- FR12 — Le visiteur peut naviguer vers les sections Parcours, Arsenal, Contact (ancrages ou menu).
- FR13 — Le visiteur peut trouver la stack et le contact en ≤ 10s (critère de succès reflété en FR).

**SEO & Indexation**
- FR14 — Chaque page/route expose un titre (title) et des balises meta adaptés à l'indexation (ex. Google).
- FR15 — Le contenu principal est structuré de façon sémantique (titres, landmarks) pour le SEO.

**Accessibilité**
- FR16 — Le visiteur peut naviguer au clavier (focus, ordre logique).
- FR17 — Le visiteur bénéficie de contrastes et d'une structure sémantique conformes aux bonnes pratiques (niveau bon).

**Maintenance**
- FR18 — Florian peut mettre à jour le contenu du Parcours (texte, lieux, compétences par chapitre) sans dégrader l'expérience (stack + contact restent visibles et accessibles).
- FR19 — Florian peut mettre à jour l'Arsenal (liste stack, tags) sans dégrader l'expérience.

**MPA & Structure**
- FR20 — Le visiteur peut accéder à plusieurs pages/routes (MPA) : accueil, parcours, contact, etc., selon la structure retenue.

---

## Non-Functional Requirements

Les exigences non fonctionnelles ci-dessous précisent les contraintes de qualité, performance et sécurité pour le MVP.

### Performance

- **NFR-P1** — Le contenu nécessaire pour afficher la stack et le CTA contact (Hero ou équivalent) est rendu suffisamment tôt pour que l'utilisateur puisse les voir en **≤ 10 secondes** (conditions réseau normales), sur desktop et mobile.
- **NFR-P2** — Les images du Hero (et autres images above-the-fold) sont optimisées (taille, format) pour ne pas bloquer le premier affichage utile.
- **NFR-P3** — Les animations au scroll restent légères (pas de blocage du thread principal prolongé) pour ne pas empêcher l'accès à la stack et au contact.

### Accessibilité

- **NFR-A1** — Le site est utilisable au clavier (navigation, focus visible, ordre logique).
- **NFR-A2** — Les contrastes texte/fond respectent les bonnes pratiques (niveau « bon », aligné avec les FR d'accessibilité).
- **NFR-A3** — Les images porteuses d'information ont un équivalent textuel (alt ou alternative).

### Security

- **NFR-S1** — Aucune donnée sensible n'est collectée en MVP (pas de formulaire, pas de stockage de données personnelles). Contact via lien externe (LinkedIn) uniquement.
- **NFR-S2** — Le site est servi en HTTPS en production.

### Reliability

- **NFR-R1** — Le site est disponible de façon continue pour la consultation (hébergement standard, pas d'exigence SLA contractuelle pour le MVP).

*Scalabilité et intégration ne sont pas formalisées pour le MVP.*
