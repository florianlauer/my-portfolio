# my-portfolio – Epics post-MVP (futures améliorations)

**Date :** 2026-02-15  
**Contexte :** MVP livré (Epics 1–7). Ce document découpe les prochaines améliorations en epics et stories, sur le même modèle que le MVP.

**Références :** PRD (Growth Features, Technical Success), synthèse sprint, procédure SEO Next.js.

---

## Vue d’ensemble

| Epic    | Thème            | Objectif principal                                   |
| ------- | ---------------- | ---------------------------------------------------- |
| Epic 8  | SEO avancé       | Open Graph, Twitter, sitemap, robots, JSON-LD        |
| Epic 9  | CI / qualité     | GitHub Actions (lint + build) sur push/PR            |
| Epic 10 | A11y post-audit  | Corriger les points soulevés par l’audit             |
| Epic 11 | Contact (Growth) | Formulaire de contact basique + anti-spam            |
| Epic 12 | Motion & contenu | Affinage motion, sections supplémentaires            |
| Epic 13 | Stack vue stylée | Vue stack avec relations entre technos (graph/liens) |

---

## Epic 8: SEO avancé

Améliorer l’indexation et le partage social : meta Open Graph / Twitter, sitemap, robots, données structurées (JSON-LD). **FRs / NFR :** FR14 (meta), bonnes pratiques SEO portfolio.

### Story 8.1: Meta Open Graph et Twitter Card

En tant que **visiteur ou partageur** (réseaux sociaux, messagerie), je veux que le lien du portfolio affiche un titre, une description et une image cohérents, afin que le partage soit lisible et professionnel.

**Acceptance Criteria:**

- **Given** le site est déployé, **when** on partage l’URL (LinkedIn, Twitter, Slack, etc.), **then** une carte s’affiche avec titre, description et image (og:title, og:description, og:image, og:type, og:url ; twitter:card, twitter:title, twitter:description, twitter:image).
- Les meta sont définies dans le layout ou la page (App Router `metadata` / `openGraph` / `twitter`).
- L’image de partage (ex. hero ou visuel dédié) est servie en HTTPS et avec des dimensions raisonnables (ex. 1200×630).

### Story 8.2: Sitemap et robots.txt

En tant que **moteur de recherche**, je veux découvrir les URLs du site et savoir quelles parties indexer, afin d’améliorer l’indexation (SEO).

**Acceptance Criteria:**

- **Given** le projet Next.js App Router, **when** on accède à `/sitemap.xml`, **then** un sitemap est servi (ex. `app/sitemap.ts`) listant au minimum la page d’accueil.
- **When** on accède à `/robots.txt`, **then** un robots est servi (ex. `app/robots.ts`) avec au minimum `User-agent: *`, `Allow: /` et la référence vers le sitemap.

### Story 8.3: Données structurées JSON-LD (Person / WebSite)

En tant que **moteur de recherche**, je veux recevoir des données structurées sur la personne et le site, afin d’enrichir les résultats (ex. knowledge panel, rich results).

**Acceptance Criteria:**

- **Given** la page d’accueil, **when** un crawler lit le HTML, **then** un bloc `<script type="application/ld+json">` contient au moins un schéma de type `Person` ou `WebSite` (nom, description, URL, éventuellement image) conforme à schema.org.
- Le JSON-LD est injecté dans le layout ou la page (SSR/SSG), sans casser le build.

---

## Epic 9: CI / qualité

Automatiser la vérification du code à chaque push/PR : lint et build. **Référence :** Architecture (CI lint + typecheck + build).

### Story 9.1: GitHub Actions (lint + build)

En tant que **développeur** (Florian), je veux que chaque push et chaque PR déclenche un job qui exécute lint et build, afin de détecter les régressions avant merge ou déploiement.

**Acceptance Criteria:**

- **Given** un dépôt GitHub avec le projet, **when** on push ou on ouvre une PR, **then** un workflow GitHub Actions s’exécute.
- Le workflow lance au minimum : `npm ci` (ou `npm install`), `npm run lint`, `npm run build`.
- En cas d’échec (lint ou build), le statut du check est en échec et visible sur la PR.

---

## Epic 10: Accessibilité – corrections post-audit

Intégrer les correctifs identifiés par un audit a11y (Lighthouse Accessibility, axe DevTools ou équivalent). **Référence :** NFR-A1, NFR-A2, NFR-A3, README (audit a11y).

### Story 10.1: Appliquer les correctifs issus de l’audit a11y

En tant que **visiteur** (notamment utilisateur de technologies d’assistance), je veux que les problèmes d’accessibilité remontés par l’audit soient corrigés, afin de consolider le niveau « bon » (contraste, focus, structure, alternatives).

**Acceptance Criteria:**

- **Given** un rapport d’audit a11y (Lighthouse Accessibility et/ou axe) sur la page d’accueil, **when** des issues « critiques » ou « sérieuses » sont listées, **then** des correctifs sont implémentés (code ou contenu) pour les résoudre.
- **And** après correctifs, un nouvel audit est exécuté ; les issues traitées sont passées en vert ou documentées en exception justifiée.
- Les correctifs restent alignés avec la structure et le design existants (pas de régression visuelle ou UX non voulue).

**Note :** Le détail des tâches (liste de correctifs) sera rempli après réalisation de l’audit (manuel ou via outil).

---

## Epic 11: Contact – formulaire (Growth) — annulé

Contact via email uniquement (pas de formulaire). Le lien LinkedIn et les réseaux en section Contact suffisent ; un lien mailto: ou email peut être ajouté dans le contenu si besoin.

### Story 11.1: Formulaire de contact basique avec anti-spam

En tant que **visiteur**, je veux pouvoir envoyer un message court depuis le site (sans obligatoirement passer par LinkedIn), afin d’avoir une alternative de contact directe.

**Acceptance Criteria:**

- **Given** la section Contact (ou une page dédiée), **when** le visiteur remplit un formulaire (ex. nom, email, message), **then** le message est envoyé sans stocker de données sensibles côté app (ex. envoi vers une API/serverless ou service type Formspree/Netlify Forms).
- Un mécanisme anti-spam est en place (ex. honeypot, CAPTCHA léger, ou service tiers) pour limiter les abus.
- **And** après envoi, un retour clair est affiché (succès ou erreur) ; pas d’email exposé en dur dans le front.

**Note :** Peut être découpé en 11.1a (formulaire + envoi) et 11.1b (anti-spam) si besoin.

---

## Epic 12: Motion et contenu (Growth)

Affiner les animations et ajouter des sections pour renforcer personnalité et passions. **Référence :** PRD Growth (« Affinage motion/animations », « Pages/sections supplémentaires »). La touche perso (assets + palette) est planifiée en 12.0 pour ne pas oublier de demander les visuels et couleurs avant les sections/motion.

### Story 12.0: Assets et palette (touche perso)

En tant que **Florian**, je veux fournir mes assets (photos voyages, visuels) et définir la palette de couleurs à appliquer, afin que le site reflète ma touche perso (fonds, accents) avant d’enchaîner sur motion et nouvelles sections.

**Acceptance Criteria:**

- **Given** le site actuel (noir et blanc), **when** on démarre la phase « touche perso » d’Epic 12, **then** le dev demande au producteur : (1) assets (ex. photos voyages pour backgrounds, hero/OG à jour, visuels pour sections passions) ; (2) palette ou direction couleur (accents, fonds).
- Les assets reçus sont intégrés (dossiers, références dans le contenu) et la palette est appliquée dans le thème (ex. `globals.css`, variables Shadcn) avant ou en parallèle des stories 12.1 et 12.2.
- **Note :** Cette story est surtout un **rappel et un point de synchronisation** : pas d’implémentation lourde sans les assets et la direction palette.

### Story 12.1: Affinage motion et animations

En tant que **visiteur**, je veux des transitions et animations sobres qui renforcent la lecture (parcours, arsenal), sans retarder l’accès à la stack et au contact (≤ 10s).

**Acceptance Criteria:**

- **Given** les sections Parcours et Arsenal, **when** je scroll ou navigue, **then** des animations légères (apparition, parallax sobre) guident l’attention sans bloquer le thread principal.
- Les critères NFR-P3 et time-to-stack / time-to-contact restent respectés (vérification manuelle ou Lighthouse Performance).
- Le motion reste optionnel ou dégradable (pas de dépendance critique au JavaScript pour le contenu essentiel).

### Story 12.2: Pages ou sections supplémentaires (passions, personnalité)

En tant que **visiteur**, je veux découvrir davantage de contenu sur les passions et la personnalité (ex. section dédiée ou page « À propos »), afin de renforcer le signal « j’en ai appris plus sur lui ».

**Acceptance Criteria:**

- **Given** le MVP (une page avec Hero, Parcours, Arsenal, Contact), **when** on valide le besoin, **then** une ou plusieurs sections ou pages sont ajoutées (ex. bloc « Passions » sur la home, ou route `/a-propos`) avec contenu structuré (titres, landmarks, accessibilité).
- La navigation (menu, ancrages) est mise à jour pour inclure les nouveaux blocs ou pages.
- Le contenu reste modifiable via `src/content/*` ou équivalent, sans refonte technique majeure.

**Spec validée (2026-02-14)** — Voir `_bmad-output/implementation-artifacts/12-2-passions-a-propos-spec.md` : option C (section Passions sur la home + page `/a-propos`), thèmes voyage / side projects / passions, nav #passions + lien À propos, ton pro sur home et perso sur la page.

### Story 12.3: Page 404 type GeoGuessr

En tant que **visiteur** (ou curieux), je veux une page 404 personnalisée et ludique (mini GeoGuessr avec tes photos de voyage), afin que l'erreur 404 soit mémorable et renforce la personnalité du site.

**Acceptance Criteria:**

- **Given** une route inexistante, **when** le visiteur y accède, **then** une page 404 personnalisée s'affiche (pas la 404 par défaut Next.js).
- La page propose une expérience type « devine le lieu » : une photo de voyage s'affiche, le visiteur peut deviner (choix multiple ou carte selon spec détaillée).
- Les photos viennent du même réservoir que les backgrounds (ex. Lençóis, Laponie, etc.) ; pas de contenu dupliqué.
- Un lien « Retour accueil » (ou équivalent) est visible et accessible.
- L'easter egg peut être atteignable de façon discrète depuis l'accueil (footer, lien caché, etc.) — à préciser en implémentation.

**Note :** À préciser en spec détaillée : question unique ou plusieurs rounds, choix multiple vs carte cliquable, emplacement du lien easter egg. Référence : product brief, PRD Growth, ux-design-specification (404 GeoGuessr post-MVP).

### Story 12.4: Section ou page galerie photos

En tant que **visiteur**, je veux découvrir une galerie de photos de voyage (section sur la home ou page dédiée), afin de renforcer la touche « voyage » et la personnalité du site.

**Acceptance Criteria:**

- **Given** le site actuel, **when** on valide le besoin, **then** une section galerie sur la home **ou** une route dédiée (ex. `/galerie`) est ajoutée.
- La galerie affiche une grille ou un masonry de photos de voyage, avec lieu / pays en légende si pertinent.
- Les images réutilisent la même source que les backgrounds et assets existants (pas de doublon non géré).
- La navigation (menu ou ancrages) est mise à jour pour inclure l'accès à la galerie.
- Accessibilité et performance (images optimisées, alt) sont respectées.

**Spec validée (2026-02-15)** — Voir `_bmad-output/implementation-artifacts/12-4-section-galerie-photos-spec.md` : page dédiée `/galerie` (pas de section home), Masonry, 20 images + infinite scroll, lightbox v1, légendes lieu+pays, lien depuis menu et depuis À propos (Voyages).

---

## Epic 13: Stack vue stylée (Arsenal visuel)

Vue stack avec relations visuelles entre technos (liens langage↔framework, code couleur, hiérarchie graphique). **Référence :** ux-design-specification (relations entre langages et frameworks), architecture (Arsenal interactive visualization graph/zoom/click).

### Story 13.1: Vue stack avec relations entre technos

En tant que **visiteur** (recruteur ou dev), je veux voir une vue « stylée » de la stack avec des relations visuelles entre technos et frameworks (ex. React ↔ TypeScript), afin de comprendre rapidement les liens entre compétences (impossible sur LinkedIn/CV).

**Acceptance Criteria:**

- **Given** la section Stack actuelle (familles Frontend/Backend/DevOps + tags), **when** on valide le besoin, **then** une évolution visuelle est proposée : relations visuelles entre langages et frameworks (code couleur, hiérarchie graphique, ou liens explicites entre items).
- **Option A (MVP de la story)** : Enrichir la vue actuelle avec code couleur, regroupement graphique ou lignes/liens entre technos liées (ex. React–TypeScript), sans changer la structure des données tant que possible.
- **Option B (post-MVP de la story)** : Vue interactive/graphique (graph de relations, carte mentale, constellation) avec toggle « vue statique / vue graphique » et progressive disclosure (clic/zoom = plus d'infos). Référence : ux-design-specification (Musicmap, progressive disclosure).
- Les données restent dans `src/content/stack.ts` (et types `src/types/stack.ts`) ; on peut ajouter des champs optionnels (ex. `relatedIds`, `category`) pour piloter les relations.
- La vue reste accessible (clavier, contraste) et ne dégrade pas le time-to-stack (NFR-P3).

**Note :** Spec UX détaille « relations visuelles entre langages et frameworks (code couleur, hiérarchie graphique) » en MVP Arsenal, et « vue interactive/graphique (graph de relations, carte mentale, constellation) avec toggle » en post-MVP. Cette story couvre les deux niveaux selon priorisation.

---

## Backlog / idées à prioriser

Les stories **12.3** (404 GeoGuessr), **12.4** (Galerie photos) et **13.1** (Stack vue stylée) sont ci-dessus. Les idées suivantes restent à prioriser ou à détailler en spec avant implémentation :

- **Carte projets (planisphère)** — PRD / product brief : carte projets style jeu, lien compétences↔projets. À découper en epic/story si priorisée.
- Autres améliorations motion (scroll-spy, menu actif) mentionnées en architecture post-MVP.

**Détails 404 / Galerie :** Voir Story 12.3 et 12.4 ci-dessus.

## Priorisation suggérée pour enchaîner

1. **Epic 8 (SEO avancé)** — 8.1 → 8.2 → 8.3 : impact direct sur partage et indexation.
2. **Epic 9 (CI)** — 9.1 : rapide, sécurise les prochains changements.
3. **Epic 10 (A11y post-audit)** — 10.1 : après avoir réalisé l’audit (Lighthouse/axe).
4. **Epic 12** — 12.0 → 12.1 → 12.2 (en cours) ; puis **12.4 (Galerie photos)** en priorité, **12.3 (404 GeoGuessr)** en dernière priorité.
5. **Epic 13 (Stack vue stylée)** — 13.1 : vue stack avec relations entre technos (code couleur, liens, option graph interactive).

---

**Document généré le :** 2026-02-15  
**Projet :** my-portfolio
