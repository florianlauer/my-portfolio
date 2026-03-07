# Roadmap: Stack Graph

## Overview

Transform the existing tech skills data into an interactive force-directed graph on a dedicated `/stack` page. The roadmap progresses from data modeling through visual rendering, interactivity, and accessibility -- each phase producing a verifiable artifact that builds on the previous.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Data Foundation** - TypeScript types and graph content data with relations, levels, and category colors
- [ ] **Phase 2: Page and Graph Rendering** - /stack route with SVG nodes, edges, force layout, and legend
- [ ] **Phase 3: Interactivity** - Tooltips, zoom/pan, click-to-focus, and category filters
- [ ] **Phase 4: Accessibility** - Keyboard navigation, reduced motion, focus-triggered tooltips, screen reader support

## Phase Details

### Phase 1: Data Foundation

**Goal**: Graph data model exists and is populated with real content, ready for rendering
**Depends on**: Nothing (first phase)
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04
**Success Criteria** (what must be TRUE):

1. TypeScript types for nodes (id, name, icon, category, level, description) and edges (source, target, type) exist and compile without errors
2. `src/content/stack-graph.ts` exports a complete graph dataset with all current technologies as nodes and meaningful relations as edges
3. Each node has an experience level (expert, advanced, intermediate) and belongs to a category (Frontend, Backend, DevOps) with an oklch color value
4. Existing `src/content/stack.ts` imports remain unbroken -- the current Arsenal section still works
   **Plans**: TBD

Plans:

- [ ] 01-01: TBD

### Phase 2: Page and Graph Rendering

**Goal**: Visitor can navigate to /stack and see the full tech graph with positioned nodes, edges, and a color-coded legend
**Depends on**: Phase 1
**Requirements**: PAGE-01, PAGE-02, PAGE-03, RENDER-01, RENDER-02, RENDER-03, RENDER-04
**Success Criteria** (what must be TRUE):

1. `/stack` route renders inside PageShell with correct nav, background, and skip-to-content
2. Navigation includes a link to /stack visible from all pages
3. Each node displays its name, icon, and category color as an SVG element
4. Edges visually connect related technologies with lines/curves
5. Nodes are positioned via d3-force layout (not manual coordinates) and the legend shows all categories with their colors
   **Plans**: TBD

Plans:

- [ ] 02-01: TBD

### Phase 3: Interactivity

**Goal**: Visitor can explore the graph through hover, click, zoom, pan, and filtering by domain
**Depends on**: Phase 2
**Requirements**: INTER-01, INTER-02, INTER-03, INTER-04
**Success Criteria** (what must be TRUE):

1. Hovering a node shows a tooltip with the technology's level, description, and connected technologies
2. Mouse wheel zooms and click-drag pans the graph viewport
3. Clicking a node highlights its direct connections and dims unrelated nodes
4. Category filter controls (Frontend, Backend, DevOps) show/hide groups of nodes and their edges
   **Plans**: TBD

Plans:

- [ ] 03-01: TBD

### Phase 4: Accessibility

**Goal**: The graph is usable without a mouse and respects user motion preferences
**Depends on**: Phase 3
**Requirements**: A11Y-01, A11Y-02, A11Y-03, A11Y-04
**Success Criteria** (what must be TRUE):

1. User can Tab between graph nodes with a visible focus indicator
2. Focusing a node via keyboard triggers the same tooltip as hover
3. With `prefers-reduced-motion: reduce` enabled, force-directed animation is skipped and nodes appear in a static layout
4. A visually hidden structured list of all technologies and their relations is available to screen readers
   **Plans**: TBD

Plans:

- [ ] 04-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase                       | Plans Complete | Status      | Completed |
| --------------------------- | -------------- | ----------- | --------- |
| 1. Data Foundation          | 0/?            | Not started | -         |
| 2. Page and Graph Rendering | 0/?            | Not started | -         |
| 3. Interactivity            | 0/?            | Not started | -         |
| 4. Accessibility            | 0/?            | Not started | -         |
