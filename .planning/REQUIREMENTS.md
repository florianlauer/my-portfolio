# Requirements — Milestone v1.1 (Polish & Mobile Stack Graph)

**Date:** 2026-05-09
**Project:** my-portfolio Stack Graph
**Goal:** Améliorer le Stack Graph existant avec animations / preset desktop, et rendre l'expérience mobile fonctionnelle.

Référence baseline : `milestones/v1.0.0-REQUIREMENTS.md` (POLISH-0X et MOBILE-0X étaient listés en v2 deferred).

---

## v1.1 Requirements

### Visual Polish (Desktop)

- [ ] **POLISH-01** : User voit les nœuds du graph apparaître progressivement à l'arrivée sur `/stack` (animation d'entrée)
  - Conditions: réduit ou désactivé si `prefers-reduced-motion: reduce`
  - Sortie observable: animation visible au premier render, pas de flash
- [ ] **POLISH-02** : User perçoit le niveau d'expérience d'une techno via la taille du nœud
  - Conditions: la donnée `level` (existante dans `stack-graph.ts`) pilote le rayon
  - Sortie observable: les nœuds expert sont visiblement plus gros que les nœuds basiques
- [ ] **POLISH-03** : User active le preset "ma stack typique" en un clic et voit les nœuds clés mis en avant
  - Conditions: bouton/pill dédié dans la légende ou les filtres
  - Sortie observable: jeu de nœuds prédéfini surligné, autres nœuds atténués
- [ ] **POLISH-04** : User voit les edges connectés s'animer au focus d'un nœud (clavier ou click)
  - Conditions: animation respecte `prefers-reduced-motion`
  - Sortie observable: les arêtes connectées au nœud focus s'illuminent / s'épaississent

### Mobile

- [ ] **MOBILE-01** : User accède au graph sur mobile sans bug de layout
  - Conditions: viewport ≤ 768px, le graph s'adapte (responsive ou version simplifiée)
  - Sortie observable: pas de débordement horizontal, légende lisible, contrôles atteignables
- [ ] **MOBILE-02** : User zoome et pan le graph sur mobile via gestures touch
  - Conditions: pinch-to-zoom + drag-to-pan natifs (d3-zoom touch events)
  - Sortie observable: gestures fluides, pas de conflit avec scroll page

---

## Future Requirements (Deferred)

Items reportés au-delà de v1.1 :

- **404 GeoGuessr** (Epic 12.3) — page 404 avec mini-jeu photos voyage
- **Carte projets planisphère** — vue projets style jeu, lien compétences↔projets (PRD à faire)
- **CI / qualité** (Epic 9) — GitHub Actions lint + build
- **Scroll-spy / menu actif** — amélioration motion home

---

## Out of Scope (Confirmed)

- **Refonte du graph** : pas de changement d'engine (d3-force reste), pas de Canvas/WebGL
- **Onboarding tutoriel** : la légende suffit
- **Sauvegarde de l'état utilisateur** : pas de cookies/localStorage pour zoom/filtres
- **Drag-to-rearrange permanent** : site lecture seule
- **Recherche / search bar** : filtres suffisants
- **Skill percentage bars** : manque de crédibilité (out of scope confirmé v1.0.0)

---

## Traceability

| REQ-ID    | Phase   | Plan       | Status      | Notes                         |
| --------- | ------- | ---------- | ----------- | ----------------------------- |
| POLISH-01 | Phase 5 | 05-01-PLAN | not-started | Entry animation + node sizing |
| POLISH-02 | Phase 5 | 05-01-PLAN | not-started | Entry animation + node sizing |
| POLISH-03 | Phase 5 | 05-02-PLAN | not-started | Preset + edge focus           |
| POLISH-04 | Phase 5 | 05-02-PLAN | not-started | Preset + edge focus           |
| MOBILE-01 | Phase 6 | 06-01-PLAN | not-started | Responsive layout             |
| MOBILE-02 | Phase 6 | 06-02-PLAN | not-started | Touch gestures                |

**Coverage:** 6/6 (100%) — tous les requirements v1.1 sont mappés à un plan.
