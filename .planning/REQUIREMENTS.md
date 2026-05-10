# Requirements — Milestone v1.2 (CI & Motion Home)

**Date:** 2026-05-10
**Project:** my-portfolio Stack Graph
**Goal:** Établir un quality gate CI (lint / format / build) et raffiner le motion de la home (HomeNav indicator, progress bar, reveal renforcé, parallax).

Référence baseline : `milestones/v1.0.0-REQUIREMENTS.md` (CI et motion home étaient listés en deferred).

---

## v1.2 Requirements

### CI / Quality Gate

- [ ] **CI-01** : Le développeur voit une CI lint (oxlint) qui fail sur PR si le code contient des erreurs de lint
  - Conditions: GitHub Actions, déclenché sur PR vers `main` + push direct sur `main`
  - Sortie observable: status check rouge sur PR si `npm run lint` échoue, vert sinon
- [ ] **CI-02** : Le développeur voit une CI format check (oxfmt) qui fail sur PR si le code n'est pas formaté
  - Conditions: GitHub Actions, déclenché sur PR vers `main` + push direct sur `main`
  - Sortie observable: status check rouge sur PR si `npm run fmt:check` échoue, vert sinon
- [ ] **CI-03** : Le développeur voit une CI build (next build) qui fail sur PR si le projet ne build pas
  - Conditions: GitHub Actions, déclenché sur PR vers `main` + push direct sur `main`
  - Sortie observable: status check rouge sur PR si `npm run build` échoue, vert sinon (couvre erreurs TS et bundle)

### Motion Home

- [ ] **MOTION-01** : User voit l'indicator de section active glisser entre les items de HomeNav (au lieu d'apparaître / disparaître brutalement)
  - Conditions: respect `prefers-reduced-motion` (transition désactivée si reduce), animation s'applique aux 4 sections spy (parcours, stack, passions, contact)
  - Sortie observable: au scroll entre 2 sections, le pill orange transitionne visuellement d'un item à l'autre
- [ ] **MOTION-02** : User voit une progress bar en haut de page indiquant la progression du scroll
  - Conditions: line fine top viewport, fill proportionnel à `scrollY / scrollMax`, respect `prefers-reduced-motion` (toujours visible mais sans transition)
  - Sortie observable: au scroll, la barre se remplit de gauche à droite ; à 100% scroll, barre pleine ; à 0%, barre vide
- [ ] **MOTION-03** : User voit toutes les sections home apparaître avec animation reveal (Hero + Contact inclus, plus seulement Journey/Stack/Passions)
  - Conditions: réutilise composant `ScrollReveal` existant, respect `prefers-reduced-motion`
  - Sortie observable: au scroll, chaque section fade/slide-in à l'entrée viewport ; pas de section qui apparaît brutalement
- [ ] **MOTION-04** : User perçoit un effet parallax fin sur la home (Hero ou éléments de fond bougent à vitesse différente du scroll)
  - Conditions: réutilise hook `useScrollY` existant, offset léger (~10-30px max), respect `prefers-reduced-motion` (effet désactivé)
  - Sortie observable: pendant le scroll, élément(s) parallax bougent à vitesse différente du contenu standard

---

## Future Requirements (Deferred)

Items reportés au-delà de v1.2 :

- **404 GeoGuessr** (Epic 12.3) — page 404 avec mini-jeu photos voyage
- **Carte projets planisphère** — vue projets style jeu, lien compétences↔projets (PRD à faire)
- **Formulaire de contact** (Epic 11) — endpoint + UI

---

## Out of Scope (Confirmed)

- **Tests E2E / unit runner** : pas de Vitest/Jest/Playwright en v1.2 — la CI gate de v1.2 = lint + fmt + build
- **Refonte HomeNav** : aucun changement structurel, juste l'indicator anim (MOTION-01)
- **Sauvegarde de l'état utilisateur** : pas de cookies/localStorage (préférence reduced-motion lue depuis `prefers-reduced-motion` natif)
- **Refonte ScrollReveal** : extension d'usage, pas de réécriture
- **Parallax lourd** : pas de WebGL, pas de scroll hijacking, juste offsets transform CSS via `useScrollY`
- **Skill percentage bars** : manque de crédibilité (out of scope confirmé v1.0.0)
- **Refonte du graph** : pas de changement d'engine (d3-force reste), pas de Canvas/WebGL (out of scope confirmé v1.1)

---

## Traceability

| REQ-ID    | Phase   | Plan       | Status      | Notes                            |
| --------- | ------- | ---------- | ----------- | -------------------------------- |
| CI-01     | Phase 7 | 07-01-PLAN | not-started | GitHub Actions lint              |
| CI-02     | Phase 7 | 07-01-PLAN | not-started | GitHub Actions format check      |
| CI-03     | Phase 7 | 07-01-PLAN | not-started | GitHub Actions build             |
| MOTION-01 | Phase 8 | 08-01-PLAN | not-started | HomeNav indicator slide          |
| MOTION-02 | Phase 8 | 08-01-PLAN | not-started | Progress bar top page            |
| MOTION-03 | Phase 8 | 08-02-PLAN | not-started | ScrollReveal extension + stagger |
| MOTION-04 | Phase 8 | 08-02-PLAN | not-started | Parallax fin via useScrollY      |

**Coverage:** 7/7 (100%) — tous les requirements v1.2 sont mappés à un plan.
