# Roadmap: Stack Graph

## Milestones

- ✅ **v1.0.0 Stack Graph** — Phases 1–4 (shipped 2026-04-25) — see [milestones/v1.0.0-ROADMAP.md](milestones/v1.0.0-ROADMAP.md)
- 🚧 **v1.1 Polish & Mobile** — Phases 5–6 (started 2026-05-09)

## Phases

<details>
<summary>✅ v1.0.0 Stack Graph (Phases 1–4) — SHIPPED 2026-04-25</summary>

- [x] Phase 1: Data Foundation (1/1 plans) — completed 2026-03-08
- [x] Phase 2: Page and Graph Rendering (2/2 plans) — completed 2026-03-08
- [x] Phase 3: Interactivity (2/2 plans) — completed 2026-03-13
- [x] Phase 4: Accessibility (2/2 plans) — completed 2026-03-13

Full details : [milestones/v1.0.0-ROADMAP.md](milestones/v1.0.0-ROADMAP.md)

</details>

### 🚧 v1.1 Polish & Mobile (Phases 5–6)

#### Phase 5: Visual Polish

**Goal:** Donner du caractère au graph existant via animations d'entrée, taille proportionnelle au niveau, preset "ma stack typique" et animations d'edges au focus.

**Requirements:** POLISH-01, POLISH-02, POLISH-03, POLISH-04
**UI hint:** yes (animations + nouvelle interaction preset)

**Plans:**

- [ ] 05-01: Entry animation + node sizing (POLISH-01, POLISH-02)
- [ ] 05-02: Preset "ma stack typique" + edge focus animations (POLISH-03, POLISH-04)

**Success criteria:**

1. Premier rendu : nœuds apparaissent progressivement (respect `prefers-reduced-motion`)
2. Taille des nœuds reflète le niveau d'expérience (lisible visuellement)
3. Bouton preset met en avant un sous-ensemble prédéfini sans casser les filtres existants
4. Focus clavier ou click sur un nœud anime ses edges connectés
5. Pas de régression a11y vs v1.0.0 (clavier, SR list, reduced motion)

#### Phase 6: Mobile

**Goal:** Rendre le Stack Graph utilisable sur mobile (responsive + gestures touch).

**Requirements:** MOBILE-01, MOBILE-02
**UI hint:** yes (responsive layout + interactions tactiles)

**Plans:**

- [ ] 06-01: Responsive layout / version simplifiée (MOBILE-01)
- [ ] 06-02: Touch gestures pour zoom/pan (MOBILE-02)

**Success criteria:**

1. Sur viewport ≤ 768px : graph affiché sans débordement, légende et filtres atteignables
2. Pinch-to-zoom fonctionne
3. Drag-to-pan fonctionne sans conflit avec le scroll page
4. Pas de régression desktop (zoom souris, drag, focus)

## Progress

| Phase                       | Milestone | Plans Complete | Status      | Completed  |
| --------------------------- | --------- | -------------- | ----------- | ---------- |
| 1. Data Foundation          | v1.0.0    | 1/1            | Complete    | 2026-03-08 |
| 2. Page and Graph Rendering | v1.0.0    | 2/2            | Complete    | 2026-03-08 |
| 3. Interactivity            | v1.0.0    | 2/2            | Complete    | 2026-03-13 |
| 4. Accessibility            | v1.0.0    | 2/2            | Complete    | 2026-03-13 |
| 5. Visual Polish            | v1.1      | 0/2            | Not started | —          |
| 6. Mobile                   | v1.1      | 0/2            | Not started | —          |
