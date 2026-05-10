# Milestones

Historical record of shipped versions for the my-portfolio Stack Graph project.

---

## v1.0.0 — Stack Graph (Initial Release)

**Shipped:** 2026-04-25
**Phases:** 1–4 (4 phases, 7 plans, 14 tasks)
**Timeline:** 2026-03-07 → 2026-03-13 (7 days execution)
**Git range:** `cd6ea20` (phase 01 plan) → `e585beb` (focus outline fix)
**LOC:** ~1 672 lignes TypeScript / TSX dans `src/components/stack-graph/`, `src/hooks/usePrefersReducedMotion.ts`, `src/types/stack-graph.ts`, `src/content/stack-graph.ts`, `src/app/stack/`
**Files changed:** 17 (1 701 insertions, 1 deletion vs baseline)

### Delivered

Page `/stack` complète avec graph interactif force-directed, 39 technologies dans 7 familles, relations sémantiques, tooltips détaillés, zoom/pan, click-to-focus, filtres par catégorie, et accessibilité WCAG (clavier + screen reader + reduced motion).

### Key Accomplishments

1. **Data foundation type-safe** — système de types complet (`GraphNode`, `GraphEdge`, `FamilyColor`, `ExperienceLevel`), 39 nœuds + 53 edges + 7 couleurs oklch dans `stack-graph.ts`, validation dev-only des références edges.
2. **Page `/stack` brandée** — route Next.js 16 dans PageShell, lien HomeNav avec état actif, metadata SEO complète (title, description, Open Graph), 29/39 nœuds avec icônes simple-icons.
3. **Force layout d3 + React SVG** — d3-force avec 6 forces, drag d3-natif via `fx/fy` + reheat élastique, cercles avec icônes centrées, légende HTML overlay.
4. **Interactivité riche** — d3-zoom (0.5x–3x) sur rect transparent, ZoomTransform en ref pour 0 re-render, click-to-focus avec adjacency dim 200 ms, tooltip HTML overlay viewport-clamped, 3 filtres pills mappant plusieurs familles avec reflow d3-force en place.
5. **Accessibilité WCAG complète** — `usePrefersReducedMotion` SSR-safe + sync layout (pas d'animation), navigation clavier (Tab/Enter/Space), focus ring dashed, focus-triggered tooltip, `aria-hidden` sur SVG + `StackGraphSRList` (sr-only) synchronisée avec les filtres.

### Stats

- **Phases:** 4 (Data Foundation → Page & Graph Rendering → Interactivity → Accessibility)
- **Plans:** 7 (1 + 2 + 2 + 2)
- **Tasks:** 14 atomic commits (feat) + ~14 docs/state commits
- **Dependencies added:** `d3-force`, `d3-drag`, `d3-selection`, `d3-zoom@3`, `d3-transition@3`, `simple-icons`, `@types/d3-*`
- **Requirements:** 19/19 v1 validated (DATA-01..04, RENDER-01..04, PAGE-01..03, INTER-01..04, A11Y-01..04)

### Known Deferred Items at Close

2 verification artifacts (see STATE.md → "Deferred Items"):

- Phase 02 verification gaps (`gaps_found`) — reduced-motion gap closed by Phase 04 (A11Y-03 ✅), orphaned `use-micro-movement` hook already removed (commit `009f42e`).
- Phase 04 verification (`human_needed`) — 9/9 must-haves verified statically; 6 runtime tests (focus ring visuel, OS Reduce Motion, VoiceOver) à valider en navigateur réel.

### Detailed Archive

- Roadmap details: `.planning/milestones/v1.0.0-ROADMAP.md`
- Requirements snapshot: `.planning/milestones/v1.0.0-REQUIREMENTS.md`

### Tag

`v1.0.0` (à créer après confirmation utilisateur)

---

## v1.1 — Polish & Mobile Stack Graph

**Shipped:** 2026-05-10
**Phases:** 5–6 (2 phases, 4 plans)
**Git range:** `f77d643` (milestone start) → `8a7c314` (POLISH-01 staggered entry, PR #4 merged)

### Delivered

Raffinement du Stack Graph desktop (animations d'entrée + taille ∝ niveau, preset "ma stack typique", animations edges au focus) et expérience mobile fonctionnelle (responsive layout + gestures touch pinch-zoom/pan).

### Key Accomplishments

1. **POLISH-01 — Staggered entry animation** : nœuds apparaissent progressivement au mount avec fade + scale, respect `prefers-reduced-motion`.
2. **POLISH-02 — Node sizing par level** : rayon des nœuds proportionnel à `level` (existant dans `stack-graph.ts`), lisibilité visuelle de l'expérience.
3. **POLISH-03 — Preset "ma stack typique"** : bouton activable, surligne sous-ensemble de nœuds clés, dim des autres, sans casser les filtres.
4. **POLISH-04 — Edges focus animation** : edges connectés s'animent / s'épaississent au focus clavier ou click.
5. **MOBILE-01 — Responsive layout** : graph utilisable sur viewport ≤ 768px, légende lisible, controls atteignables, collision physics découplée du visual scale.
6. **MOBILE-02 — Touch gestures** : pinch-to-zoom multi-touch via filter d3-zoom, drag-to-pan natif, `touch-action` CSS pour capture gestures, GraphTooltip clamp horizontal sur narrow viewports.

### Stats

- **Phases:** 2 (Visual Polish → Mobile)
- **Plans:** 4 (05-01, 05-02, 06-01, 06-02)
- **Requirements:** 6/6 v1.1 validated (POLISH-01..04, MOBILE-01..02)

### Tag

`v1.1` (à créer si souhaité)
