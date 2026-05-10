# Roadmap: Stack Graph

## Milestones

- ✅ **v1.0.0 Stack Graph** — Phases 1–4 (shipped 2026-04-25) — see [milestones/v1.0.0-ROADMAP.md](milestones/v1.0.0-ROADMAP.md)
- ✅ **v1.1 Polish & Mobile** — Phases 5–6 (shipped 2026-05-10)
- 🚧 **v1.2 CI & Motion Home** — Phases 7–8 (started 2026-05-10)

## Phases

<details>
<summary>✅ v1.0.0 Stack Graph (Phases 1–4) — SHIPPED 2026-04-25</summary>

- [x] Phase 1: Data Foundation (1/1 plans) — completed 2026-03-08
- [x] Phase 2: Page and Graph Rendering (2/2 plans) — completed 2026-03-08
- [x] Phase 3: Interactivity (2/2 plans) — completed 2026-03-13
- [x] Phase 4: Accessibility (2/2 plans) — completed 2026-03-13

Full details : [milestones/v1.0.0-ROADMAP.md](milestones/v1.0.0-ROADMAP.md)

</details>

<details>
<summary>✅ v1.1 Polish & Mobile (Phases 5–6) — SHIPPED 2026-05-10</summary>

- [x] Phase 5: Visual Polish (2/2 plans) — POLISH-01..04
- [x] Phase 6: Mobile (2/2 plans) — MOBILE-01..02

Full details : `.planning/MILESTONES.md` (entry v1.1)

</details>

### 🚧 v1.2 CI & Motion Home (Phases 7–8)

#### Phase 7: CI Quality Gate

**Goal:** Établir une CI GitHub Actions qui bloque les PR si lint, format check, ou build échouent.

**Requirements:** CI-01, CI-02, CI-03
**UI hint:** no (infrastructure DevEx)

**Plans:**

- [ ] 07-01: GitHub Actions workflow `ci.yml` — lint + fmt:check + build (CI-01, CI-02, CI-03)

**Success criteria:**

1. Workflow déclenché sur PR vers `main` et push direct sur `main`
2. Job lint : `npm run lint` rouge sur erreur, vert sinon (status check visible sur PR)
3. Job format check : `npm run fmt:check` rouge sur diff, vert sinon
4. Job build : `npm run build` rouge sur erreur TS/bundle, vert sinon
5. Run total < 3 min (cache npm + Next.js build cache si pertinent)

#### Phase 8: Motion Home Polish

**Goal:** Raffiner le motion de la home (indicator HomeNav animé, progress bar scroll, reveal renforcé sur toutes sections, parallax fin) en respectant `prefers-reduced-motion`.

**Requirements:** MOTION-01, MOTION-02, MOTION-03, MOTION-04
**UI hint:** yes (animations + nouveau composant progress bar)

**Plans:**

- [ ] 08-01: HomeNav indicator slide + ScrollProgressBar (MOTION-01, MOTION-02)
- [ ] 08-02: Reveal extension + parallax (MOTION-03, MOTION-04)

**Success criteria:**

1. Indicator HomeNav glisse smoothly entre items au scroll spy (sans saut visible)
2. Progress bar top page se remplit proportionnellement au scrollY (visible et non intrusive)
3. Hero + Contact wrap par `ScrollReveal` (toutes sections home animées en entrée)
4. Effet parallax visible sur Hero ou éléments de fond (offset léger via `useScrollY`)
5. `prefers-reduced-motion: reduce` désactive les animations MOTION-01 (transition), MOTION-03 (reveal), MOTION-04 (parallax) ; MOTION-02 reste statique mais visible
6. Pas de régression scroll-spy existant (HomeNav active state continue de fonctionner)
7. Build + lint + fmt:check verts (validés par CI Phase 7)

## Progress

| Phase                       | Milestone | Plans Complete | Status      | Completed  |
| --------------------------- | --------- | -------------- | ----------- | ---------- |
| 1. Data Foundation          | v1.0.0    | 1/1            | Complete    | 2026-03-08 |
| 2. Page and Graph Rendering | v1.0.0    | 2/2            | Complete    | 2026-03-08 |
| 3. Interactivity            | v1.0.0    | 2/2            | Complete    | 2026-03-13 |
| 4. Accessibility            | v1.0.0    | 2/2            | Complete    | 2026-03-13 |
| 5. Visual Polish            | v1.1      | 2/2            | Complete    | 2026-05-10 |
| 6. Mobile                   | v1.1      | 2/2            | Complete    | 2026-05-10 |
| 7. CI Quality Gate          | v1.2      | 0/1            | Not started | —          |
| 8. Motion Home Polish       | v1.2      | 0/2            | Not started | —          |
