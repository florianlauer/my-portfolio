# Stack Graph — my-portfolio

## Current State

**Shipped:** v1.0.0 — Stack Graph (2026-04-25)

Page `/stack` interactive en production avec graph force-directed (39 technologies, 7 familles), zoom/pan, click-to-focus, tooltips riches, filtres par catégorie, et accessibilité WCAG complète (clavier, screen reader, reduced motion). Tous les 19 requirements v1 validés.

Détails : `.planning/MILESTONES.md` et `.planning/milestones/v1.0.0-*.md`.

## Current Milestone: v1.1 Polish & Mobile Stack Graph

**Goal:** Améliorer le Stack Graph existant avec animations/preset desktop + rendre l'expérience mobile fonctionnelle.

**Target features:**

- POLISH-01 — Animation d'entrée (nœuds progressifs)
- POLISH-02 — Taille nœud ∝ niveau d'expérience
- POLISH-03 — Preset "ma stack typique" (1 clic)
- POLISH-04 — Animations transition edges au focus
- MOBILE-01 — Graph responsive / version simplifiée
- MOBILE-02 — Gestures touch zoom/pan

Détails: `.planning/REQUIREMENTS.md` et `.planning/ROADMAP.md`.

---

<details>
<summary>📦 Archived — v1.0.0 (initial PROJECT.md)</summary>

## What This Is

Une page dédiée `/stack` pour le portfolio personnel de Florian, présentant sa stack technique sous forme de graph interactif avec relations entre technologies. Évolution de la section Arsenal existante vers une visualisation riche et navigable (zoom, filtres, hover) qui remplace la simple liste de tags par un graph montrant les liens entre langages, frameworks et outils.

## Core Value

Le visiteur (recruteur ou dev) comprend en un coup d'oeil les relations entre les compétences de Florian — impossible sur LinkedIn ou un CV classique.

## Requirements

### Validated

- ✓ Stack technique structurée par catégories Frontend/Backend/DevOps — existing
- ✓ Tags skills avec icônes dans la section Arsenal — existing
- ✓ Navigation entre pages (home, à-propos, galerie) — existing
- ✓ Contenu typé dans `src/content/stack.ts` + `src/types/stack.ts` — existing
- ✓ Design system Tailwind v4 + shadcn/ui + palette oklch — existing
- ✓ Page dédiée `/stack` avec graph interactif de technologies — v1.0.0
- ✓ Nœuds = technos avec nom, icône, catégorie (couleur), niveau d'expérience — v1.0.0
- ✓ Relations visuelles entre technos liées (React <-> TypeScript, Node <-> Express...) — v1.0.0
- ✓ Zoom / pan pour naviguer dans le graph — v1.0.0
- ✓ Filtres par domaine (Frontend, Backend, DevOps) — v1.0.0
- ✓ Hover sur un nœud = tooltip avec détails (expérience, description, connexions) — v1.0.0
- ✓ Code couleur par catégorie — v1.0.0 (7 familles oklch)
- ✓ Données enrichies dans `src/content/stack-graph.ts` sans casser l'existant — v1.0.0
- ✓ Lien dans la navigation principale vers /stack — v1.0.0
- ✓ Accessible (clavier, contrastes) et performant — v1.0.0 (WCAG 2.1, focus ring, reduced motion, sr-only list)

### Active

v1.1 — Polish & Mobile Stack Graph (en cours) :

- [ ] **POLISH-01** : User voit les nœuds apparaître progressivement à l'arrivée sur `/stack`
- [ ] **POLISH-02** : User perçoit le niveau d'expérience d'une techno via la taille du nœud
- [ ] **POLISH-03** : User active le preset "ma stack typique" en un clic et voit les nœuds clés mis en avant
- [ ] **POLISH-04** : User voit les edges connectés s'animer au focus d'un nœud
- [ ] **MOBILE-01** : User accède au graph sur mobile sans bug de layout (responsive ou simplifié)
- [ ] **MOBILE-02** : User zoome et pan le graph sur mobile via gestures touch

### Out of Scope

- Modification de la section Arsenal sur la home — décision tenue, complémentarité confirmée
- Graph 3D / WebGL — accessibilité incompatible, overkill à 30–50 nœuds
- Skill percentage bars — manque de crédibilité
- Drag-to-rearrange permanent — site en lecture seule
- Recherche / search bar — filtres suffisants
- Minimap — inutile à cette échelle
- Formulaire de contact — epic 11, hors scope
- 404 GeoGuessr — epic 12.3, hors scope

## Context

- **Projet brownfield** : portfolio Next.js 16, App Router, 4 routes en production (`/`, `/a-propos`, `/galerie`, `/stack`).
- **BMAD Epic 13** : Story 13.1 "Vue stack avec relations entre technos" livrée intégralement en v1.0.0.
- **Approche progressive validée** : data → rendering → interactivité → accessibilité. Chaque phase a livré un artefact vérifiable.
- **Données source** : `src/content/stack.ts` (Arsenal home) + `src/content/stack-graph.ts` (page /stack), self-contained, partage la même `StackFamilyKey`.
- **Direction visuelle** : cercles d3-force avec icônes simple-icons (29/39 nœuds), labels courts pour les autres. Légende HTML overlay, tooltip riche avec badge niveau + connexions colorées.

## Constraints

- **Tech stack** : Next.js 16, React 19, TypeScript, Tailwind v4, shadcn/ui (imposé par le projet existant) — respecté.
- **Pas de backend** : tout en client-side, contenu dans `src/content/*.ts` — respecté.
- **Performance** : ne pas dégrader le time-to-stack — d3-force ~15 KB, pas de Canvas/WebGL, transformations zoom via `setAttribute` direct (pas de re-render React 60 fps).
- **Accessibilité** : navigation clavier, contrastes, alternative textuelle — WCAG 2.1 SC 2.3.3 (reduced motion) + 2.1.1 (keyboard) + 4.1.2 (name/role/value) couverts.
- **Contenu as code** : `src/content/*.ts`, pas de CMS — respecté.

## Key Decisions

| Decision                                             | Rationale                                                                               | Outcome    |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- | ---------- |
| Page dédiée `/stack` plutôt que remplacement Arsenal | Garde le teaser Arsenal sur la home, graph complet sur page dédiée                      | ✓ Good     |
| Stack actuelle comme base de données                 | Pas besoin de revoir la liste, juste enrichir (relations, niveaux)                      | ✓ Good     |
| Direction visuelle : cercles + d3-force              | Plus propre que pills, scale mieux, comportement organique avec drag/reheat             | ✓ Good     |
| d3-force + React SVG (vs Canvas/WebGL)               | Accessibilité native (tabindex, focus events), bundle ~15 KB, suffisant à 39 nœuds      | ✓ Good     |
| Famille "methods" ajoutée tardivement                | Demande utilisateur après Phase 1 P1 — propagation type-safe à `StackFamilyKey` partout | ✓ Good     |
| Suppression du micro-movement perpétuel              | Le drag d3 + reheat fournissent assez de "vie" — laisser respirer                       | ✓ Good     |
| d3-zoom sur rect transparent (pas SVG root)          | Évite les conflits de pointer events avec le drag des nœuds                             | ✓ Good     |
| ZoomTransform en ref + `setAttribute` direct         | Évite 60 fps de re-renders React sur le zoom                                            | ✓ Good     |
| `filterNodes` met à jour la simulation en place      | Pas de réinit, animation fluide avec `alpha(0.5).restart()`                             | ✓ Good     |
| SSR default `reducedMotion = true`                   | Défaut safe contre flash d'animation à l'hydratation                                    | ✓ Good     |
| `aria-hidden` sur SVG + `StackGraphSRList`           | SVG complexe inaccessible aux SR — alternative textuelle structurée plus utile          | ✓ Good     |
| Mobile à décider après desktop                       | Repoussé en v1.1+ — desktop validé d'abord                                              | ⚠️ Revisit |

## Constraints Met

- ✓ Stack imposée respectée (Next.js 16, React 19, Tailwind v4)
- ✓ Pas de backend (tout client-side)
- ✓ Performance : pas de re-render 60fps zoom, simulation efficace, ~1 700 LOC
- ✓ Accessibilité WCAG 2.1 (3 SC couverts)
- ✓ Contenu as code

---

_Last updated: 2026-04-25 after v1.0.0 milestone close (initialization: 2026-03-07)_

</details>
