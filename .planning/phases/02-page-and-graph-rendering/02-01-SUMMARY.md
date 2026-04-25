---
phase: 02-page-and-graph-rendering
plan: 01
subsystem: ui
tags: [next.js, react, svg, simple-icons, d3-force, stack-graph]

requires:
  - phase: 01-data-foundation
    provides: StackGraph types, stackGraph content data (39 nodes, 53 edges, 7 families)
provides:
  - /stack page route with PageShell, SEO metadata, and mount point
  - HomeNav "Ma Stack" link with active state
  - GraphNode SVG pill component (4 size tiers, icon + label + glow)
  - GraphEdge SVG Bezier curve component
  - GraphLegend HTML overlay component
  - icon-map mapping 29 node IDs to simple-icons SVG paths
affects: [02-page-and-graph-rendering]

tech-stack:
  added: [d3-force, simple-icons, "@types/d3-force"]
  patterns: [SVG pill nodes with feDropShadow glow, cubic Bezier edges, HTML overlay legend]

key-files:
  created:
    - src/app/stack/page.tsx
    - src/components/stack-graph/icon-map.ts
    - src/components/stack-graph/GraphNode.tsx
    - src/components/stack-graph/GraphEdge.tsx
    - src/components/stack-graph/GraphLegend.tsx
  modified:
    - src/components/home-nav/HomeNav.tsx
    - package.json

key-decisions:
  - "Used siFastapi (not siPython) for python-fastapi node icon"
  - "29 of 39 nodes have icons; 10 nodes fallback to text-only narrower pills"
  - "SVG feDropShadow filter for glow effect instead of CSS filter (more reliable in SVG)"

patterns-established:
  - "GraphNode size tiers: Expert 160x40, Avance 140x36, Intermediaire 120x32, Notions 100x28"
  - "Stack graph components accept x/y coordinates as props (ready for force layout)"

requirements-completed: [PAGE-01, PAGE-02, PAGE-03, RENDER-01, RENDER-02, RENDER-04]

duration: 3min
completed: 2026-03-08
---

# Phase 02 Plan 01: Page & Graph Rendering Summary

**/stack page route with PageShell wrapper, HomeNav link, SEO metadata, and 4 static rendering components (GraphNode pills, GraphEdge Bezier curves, GraphLegend overlay, icon-map)**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-08T20:29:23Z
- **Completed:** 2026-03-08T20:32:12Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- /stack route renders inside PageShell with nav, background, skip-to-content, and SEO metadata
- HomeNav includes "Ma Stack" link between Galerie and Contact with active state highlighting
- GraphNode renders SVG pill with family oklch color, feDropShadow glow, optional simple-icons icon, and label at 4 size tiers
- GraphEdge renders cubic Bezier curve path between coordinate pairs
- GraphLegend renders absolute-positioned HTML card overlay with 7 family color dots and labels
- icon-map maps 29 node IDs to simple-icons SVG path data with tree-shaking imports

## Task Commits

Each task was committed atomically:

1. **Task 1: Install deps, create /stack page, add HomeNav link** - `9f0612f` (feat)
2. **Task 2: Create icon-map, GraphNode, GraphEdge, GraphLegend** - `42a28da` (feat)

## Files Created/Modified

- `src/app/stack/page.tsx` - Server Component with metadata export and PageShell wrapper
- `src/components/home-nav/HomeNav.tsx` - Added "Ma Stack" Link between Galerie and Contact
- `src/components/stack-graph/icon-map.ts` - Maps 29 node IDs to simple-icons SVG path data
- `src/components/stack-graph/GraphNode.tsx` - SVG pill with color, glow, optional icon, label
- `src/components/stack-graph/GraphEdge.tsx` - SVG cubic Bezier curve edge
- `src/components/stack-graph/GraphLegend.tsx` - HTML overlay card with family color legend
- `package.json` - Added d3-force, simple-icons, @types/d3-force

## Decisions Made

- Used siFastapi icon for python-fastapi node (more specific than siPython)
- 29 of 39 nodes have simple-icons matches; remaining 10 (capacitor-plugin, chargebee, aws, tdd, ddd, hexagonal, cqrs, clean-architecture, microservices) use text-only narrower pills
- SVG feDropShadow filter for glow effect instead of CSS filter (more reliable across browsers in SVG context)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed unused siPython import**

- **Found during:** Task 2 (icon-map creation)
- **Issue:** Plan suggested importing siPython, but python-fastapi maps to siFastapi. Linter flagged unused import.
- **Fix:** Removed siPython from imports
- **Files modified:** src/components/stack-graph/icon-map.ts
- **Verification:** `npm run lint` passes clean
- **Committed in:** 42a28da (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Trivial import cleanup. No scope creep.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All rendering components export and accept x/y coordinate props, ready for Plan 02 force layout wiring
- d3-force installed and available for layout computation
- /stack page has `#stack-graph-root` mount point div for the graph container

---

_Phase: 02-page-and-graph-rendering_
_Completed: 2026-03-08_
