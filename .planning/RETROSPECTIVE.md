# Project Retrospective

_A living document updated after each milestone. Lessons feed forward into future planning._

## Milestone: v1.0.0 — Stack Graph

**Shipped:** 2026-04-25
**Phases:** 4 | **Plans:** 7 | **Sessions:** ~10 (sur 7 jours d'exécution)

### What Was Built

- Page `/stack` complète avec graph force-directed interactif (39 nœuds, 53 edges, 7 familles oklch).
- Layout d3-force avec drag élastique, zoom/pan d3-zoom (0.5x–3x), click-to-focus avec adjacency dim, tooltips HTML overlay viewport-clamped.
- 3 filtres pills (Frontend / Backend / DevOps) qui mappent plusieurs `StackFamilyKey` et reflow la simulation en place.
- Accessibilité WCAG 2.1 : `usePrefersReducedMotion` + sync layout, navigation clavier (Tab/Enter/Space), focus ring custom, `StackGraphSRList` (sr-only) synchronisée avec les filtres.
- Type system extensible : `GraphNode`, `GraphEdge`, `FamilyColor`, `ExperienceLevel`, validation dev-only des références edges.

### What Worked

- **Phase progressive (data → render → interact → a11y)** : chaque phase a livré un artefact vérifiable indépendamment. Pas de big-bang.
- **Plans atomiques** : 7 plans → 14 commits feat atomiques. Faciles à reviewer et reverter.
- **d3-force + React SVG** : choix payant — d3 calcule, React rend, accessibilité native via tabindex sur `<g>`. Pas besoin de Canvas.
- **Refs over state pour le perf-critical** : `transformRef` + `setAttribute` direct sur le zoom évite 60 fps de re-renders. Pattern à garder.
- **Checkpoint utilisateur en milieu de Phase 02** : ont permis de pivoter de pills → cercles + d3-drag, sans casser la trajectoire globale.
- **Validation dev-only des données** : assertions runtime gated par `NODE_ENV` ont attrapé des références edges orphelines lors de l'ajout de la famille methods.

### What Was Inefficient

- **`use-micro-movement.ts` orphelin** créé en Phase 02 P02, abandonné dans le même plan, supprimé seulement plusieurs commits plus tard (009f42e). Aurait dû être supprimé au moment du pivot pendant le checkpoint.
- **`prefers-reduced-motion` dans le must-have de Phase 02** alors que c'est de toute évidence le job de Phase 04 (A11Y-03). A généré un faux gap dans `02-VERIFICATION.md`.
- **Plans `03-01-PLAN.md` et `03-02-PLAN.md` jamais commités** — restent untracked jusqu'à la clôture milestone. Le commit du PLAN doit être au début du plan, pas après.
- **2 bugs de coords après Phase 02** (zoom useEffect deps `[]`, drag CTM sur node-local au lieu de zoom-group) corrigés en Phase 03 P02 — auraient pu être attrapés plus tôt par un test rapide à différents zoom levels.

### Patterns Established

- **Content as code typé** : `as const satisfies` pour validation compile-time des contenus typés (ex: `stack-graph.ts` avec ses 39 nœuds).
- **d3-force + React SVG split** : d3 fait les positions, React fait le DOM, jamais de DOM mutation par d3. Drag via `fx/fy` + reheat de simulation.
- **Background rect comme cible d'événements** : SVG root → `<rect transparent>` (zoom target) + `<g>` inner (zoom-transformed content) ; permet de séparer les pointer events zoom et drag.
- **Refs pour le perf-critical** : `transformRef` + `setAttribute` direct au lieu de `useState`. Pattern à généraliser pour toute mutation 60 fps.
- **SSR-safe media query hook** : `useState` initializer lit `matchMedia` avec guard `typeof window`, `useEffect` ajoute le listener live. Default `true` pour reduced-motion (safe vs flash).
- **`aria-hidden` SVG complexe + sr-only structured list** : pattern à réutiliser pour toute viz complexe (graph, charts, treemap).
- **eslint-disable inline justifié** : sur `<g role="button">` SVG car `<button>` impossible — commentaire explicatif obligatoire.

### Key Lessons

1. **Si un must-have ne s'applique pas à la phase, l'enlever du plan.** Le must-have `prefers-reduced-motion` n'avait rien à faire dans Phase 02 — il a généré un faux gap. Les must-haves doivent matcher le scope de la phase, pas la milestone entière.
2. **Code orphelin = à supprimer immédiatement, pas "au cas où".** Le hook `useMicroMovement` est resté du code mort pendant des jours. Quand un pivot pendant un checkpoint rend du code inutile, cleanup atomique avec le pivot.
3. **Commit du PLAN au début du plan, pas après.** Les 03-0X-PLAN.md untracked à la clôture sont symptomatiques. Pattern à ancrer : `docs(XX-YY): plan` _avant_ le premier `feat(XX-YY)`.
4. **Vérifier les coords aux extrêmes (zoom min/max) avant de marquer un plan complet.** Les 2 bugs CTM/zoom auraient été détectés par un test rapide "drag à 3x" + "drag à 0.5x".
5. **Le checkpoint utilisateur fonctionne.** Pivot pills → cercles + Framer-Motion-drag → d3-fx/fy a évité 2 phases de retravail. À garder sur tout plan visuel.
6. **Defaults SSR safe pour les preferences.** `reducedMotion = true` par défaut pour éviter le flash. Pattern : toujours pencher vers le mode "calme" en l'absence d'info.

### Cost Observations

- **Model mix** : ~50% opus / 50% sonnet (estimé) — opus principalement pour planning/discuss, sonnet pour exécution.
- **Sessions** : ~10 sessions distinctes sur 7 jours.
- **Notable** :
  - Phase 02 P02 (force layout) la plus coûteuse à cause de l'itération design pendant le checkpoint (4 changements user-directed). Mais a verrouillé la direction visuelle pour les Phases 3 et 4.
  - Phase 04 P01 (reduced motion) : 15 min, exécutée exactement comme planifiée — preuve que la recherche en amont paye.
  - Phase 04 P02 (keyboard nav + SR list) : 10 min, idem. Phase 4 entière en ~25 min d'exec, hors recherche.

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change                                                              |
| --------- | -------- | ------ | ----------------------------------------------------------------------- |
| v1.0.0    | ~10      | 4      | Bootstrap GSD : `/gsd-new-project` → discuss → plan → execute par phase |

### Cumulative Quality

| Milestone | Tests              | Coverage | Zero-Dep Additions         |
| --------- | ------------------ | -------- | -------------------------- |
| v1.0.0    | 0 (no test runner) | n/a      | 0 (toutes deps justifiées) |

> Pas de runner de tests configuré dans ce projet (oxlint + oxfmt + Lighthouse manuel sont les gates). À reconsidérer à v1.1+ si le code base grandit.

### Top Lessons (Verified Across Milestones)

À enrichir au fil des milestones futures.

1. _(à venir)_
2. _(à venir)_
