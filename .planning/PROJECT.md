# Stack Graph — my-portfolio

## What This Is

Une page dédiée `/stack` pour le portfolio personnel de Florian, présentant sa stack technique sous forme de graph interactif avec relations entre technologies. Évolution de la section Arsenal existante vers une visualisation riche et navigable (zoom, filtres, hover) qui remplace la simple liste de tags par un graph montrant les liens entre langages, frameworks et outils.

## Core Value

Le visiteur (recruteur ou dev) comprend en un coup d'oeil les relations entre les compétences de Florian — impossible sur LinkedIn ou un CV classique.

## Requirements

### Validated

- Stack technique structurée par catégories Frontend/Backend/DevOps — existing
- Tags skills avec icônes dans la section Arsenal — existing
- Navigation entre pages (home, à-propos, galerie) — existing
- Contenu typé dans `src/content/stack.ts` + `src/types/stack.ts` — existing
- Design system Tailwind v4 + shadcn/ui + palette oklch — existing

### Active

- [ ] Page dédiée `/stack` avec graph interactif de technologies
- [ ] Nœuds = technos avec nom, icône, catégorie (couleur), niveau d'expérience
- [ ] Relations visuelles entre technos liées (React <-> TypeScript, Node <-> Express...)
- [ ] Zoom / pan pour naviguer dans le graph
- [ ] Filtres par domaine (Frontend, Backend, DevOps)
- [ ] Hover sur un nœud = tooltip avec détails (expérience, description courte)
- [ ] Code couleur par catégorie (Frontend, Backend, DevOps)
- [ ] Données enrichies dans `src/content/stack.ts` (relations, niveaux) sans casser l'existant
- [ ] Lien dans la navigation principale vers /stack
- [ ] Accessible (clavier, contrastes) et performant (pas de blocage du thread principal)

### Out of Scope

- Formulaire de contact — epic 11, annulé
- 404 GeoGuessr — epic 12.3, pas dans cette phase
- Carte projets / planisphère — backlog futur
- Modification de la section Arsenal sur la home — on garde l'existant tel quel
- Mobile responsive du graph — à décider après validation desktop

## Context

- **Projet brownfield** : portfolio Next.js 16 avec 3 routes existantes (`/`, `/a-propos`, `/galerie`)
- **BMAD Epic 13** : Story 13.1 "Vue stack avec relations entre technos"
- **Approche progressive** : d'abord vue enrichie (couleurs, groupements, liens), puis interactif (zoom/pan/filtres)
- **Données source** : `src/content/stack.ts` contient déjà les technos groupées par famille (Frontend, Backend, DevOps) avec noms et icônes
- **Direction visuelle** : à déterminer pendant la phase recherche — proposer plusieurs styles (constellation, carte mentale, bulles organiques)

## Constraints

- **Tech stack** : Next.js 16, React 19, TypeScript, Tailwind v4 — imposé par le projet existant
- **Pas de backend** : tout en client-side, pas d'API pour les données
- **Performance** : ne pas dégrader le time-to-stack (NFR-P3) ; le graph doit rester fluide même avec ~30-50 nœuds
- **Accessibilité** : navigation clavier, contrastes, alternatives textuelles pour le graph
- **Contenu as code** : les données restent dans `src/content/*.ts`, pas de CMS

## Key Decisions

| Decision                                             | Rationale                                                          | Outcome    |
| ---------------------------------------------------- | ------------------------------------------------------------------ | ---------- |
| Page dédiée `/stack` plutôt que remplacement Arsenal | Garde le teaser Arsenal sur la home, graph complet sur page dédiée | -- Pending |
| Stack actuelle comme base de données                 | Pas besoin de revoir la liste, juste enrichir (relations, niveaux) | -- Pending |
| Direction visuelle à déterminer en recherche         | Proposer constellation / carte mentale / bulles et laisser choisir | -- Pending |
| Mobile à décider après desktop                       | Éviter de sur-spécifier sans voir le résultat                      | -- Pending |

---

_Last updated: 2026-03-07 after initialization_
