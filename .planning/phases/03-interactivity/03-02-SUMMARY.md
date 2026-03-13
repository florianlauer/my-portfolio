---
phase: 03-interactivity
plan: 02
subsystem: ui
tags: [d3, svg, tooltip, filters, react, framer-motion, tailwind]

# Dependency graph
requires:
  - phase: 03-interactivity-01
    provides: zoom/pan, click-to-focus, SVG refs (svgRef, innerGRef, transformRef)
  - phase: 02-rendering
    provides: force layout simulation, GraphNode, StackGraph shell
provides:
  - Rich HTML tooltip on node hover with level badge, description, connected tech tags
  - Category filter pills (Frontend, Backend, DevOps) with d3-force reflow on toggle
  - filterNodes method in use-force-layout hook for dynamic simulation updates
  - Viewport-clamped tooltip positioning using innerG.getScreenCTM()
affects: [future-phases]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Tooltip positioning via SVGGElement.getScreenCTM() for correct coords at all zoom levels"
    - "d3-force filterNodes: update running simulation in-place without reinitializing"
    - "Filter groups: map UI filter keys to multiple StackFamilyKey values"
    - "At-least-1 enforcement: block toggle when only 1 filter active"

key-files:
  created:
    - src/components/stack-graph/GraphTooltip.tsx
    - src/components/stack-graph/GraphFilters.tsx
  modified:
    - src/components/stack-graph/StackGraph.tsx
    - src/components/stack-graph/GraphNode.tsx
    - src/components/stack-graph/use-force-layout.ts
    - src/app/stack/page.tsx

key-decisions:
  - "Tooltip position uses innerGRef.getScreenCTM() not svgRef — innerG includes zoom transform so positioning is accurate at all zoom levels"
  - "filterNodes updates running simulation in-place (sim.nodes + sim.force.links + alpha restart) — no simulation reinit needed"
  - "FILTER_GROUPS maps frontend->['frontend','mobile'], backend->['backend','data'], devops->['infra','integrations']; methods family always visible"
  - "Zoom useEffect depends on [size.width, size.height] not [] — ensures d3-zoom attaches after SVG is rendered in DOM"
  - "GraphNode drag uses innerGRef CTM not node's own CTM — fixes scale coefficient when zoomed"

patterns-established:
  - "SVG coordinate conversion: always use the zoom group's CTM (getScreenCTM) for correct screen coords at any zoom level"
  - "Simulation dynamic update: filterNodes pattern for in-place node/edge filtering without full reinit"

requirements-completed: [INTER-01, INTER-04]

# Metrics
duration: ~30min
completed: 2026-03-13
---

# Phase 03 Plan 02: Rich Tooltips and Category Filters Summary

**HTML overlay tooltips with viewport clamping + 3 category filter pills with d3-force reflow — completing INTER-01 and INTER-04 for the stack graph**

## Performance

- **Duration:** ~30 min
- **Started:** 2026-03-13T17:25:00Z
- **Completed:** 2026-03-13T17:55:40Z
- **Tasks:** 2 (1 auto + 1 checkpoint:human-verify)
- **Files modified:** 6

## Accomplishments

- GraphTooltip.tsx: absolute-positioned HTML overlay with level badge, description, and colored tech tags for connected neighbors; viewport clamping (x) and flip-below logic (y); scale+fade 150ms animation
- GraphFilters.tsx: 3 filter pills (Frontend, Backend, DevOps) with colored dots, active/inactive styles, at-least-1 enforcement
- use-force-layout.ts: filterNodes method updates running d3 simulation in-place — nodes/edges filtered, alpha 0.5 restart for smooth reflow
- StackGraph.tsx: wires tooltip state (hoveredId, tooltipState, position via getScreenCTM), filter state (activeFilters, activeNodeIds), clears focus when focused node is filtered out
- Human verification confirmed: all 4 INTER requirements work correctly (tooltip, zoom/pan, click-focus, filters), combined interactions (zoom+tooltip, focus+filter) also verified

## Task Commits

1. **Task 1: Rich HTML tooltip and category filter components** - `ca67ffe` (feat)
2. **Task 2 bug fixes: zoom useEffect deps + drag CTM** - `0dc9434` (fix)

**Plan metadata:** (docs commit after this)

## Files Created/Modified

- `src/components/stack-graph/GraphTooltip.tsx` - HTML tooltip overlay with positioning logic, viewport clamping, scale+fade animation
- `src/components/stack-graph/GraphFilters.tsx` - Category filter pills UI (Frontend/Backend/DevOps) with multi-toggle and at-least-1 enforcement
- `src/components/stack-graph/use-force-layout.ts` - Added filterNodes method for in-place simulation update
- `src/components/stack-graph/StackGraph.tsx` - Tooltip state + position wiring, filter state, focus-clear on filter, zoom useEffect deps fix
- `src/components/stack-graph/GraphNode.tsx` - zoomGroupRef prop + drag uses innerGRef CTM
- `src/app/stack/page.tsx` - Minor integration updates

## Decisions Made

- Tooltip position uses `innerGRef.getScreenCTM()` — the inner `<g>` carries the zoom transform in its SVG attribute, so its CTM includes zoom, giving accurate screen coordinates at any zoom level
- filterNodes updates the running simulation in-place: `sim.nodes(filtered)`, update link force, `sim.alpha(0.5).restart()` — no reinit needed
- FILTER_GROUPS maps: `frontend → ['frontend','mobile']`, `backend → ['backend','data']`, `devops → ['infra','integrations']`; methods family always included regardless of filters
- Zoom useEffect deps changed from `[]` to `[size.width, size.height]` to ensure d3-zoom attaches after the SVG is mounted in the DOM

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed zoom useEffect running before SVG was in DOM**

- **Found during:** Task 1 post-verification / orchestrator review
- **Issue:** Zoom useEffect had `[]` deps — ran before SVG size was known, d3-zoom could attach to null/empty element
- **Fix:** Changed deps to `[size.width, size.height]` so effect re-runs once SVG has dimensions
- **Files modified:** src/components/stack-graph/StackGraph.tsx
- **Verification:** User confirmed zoom works correctly after fix
- **Committed in:** `0dc9434`

**2. [Rule 1 - Bug] Fixed node drag using incorrect CTM when zoomed**

- **Found during:** Task 1 post-verification / orchestrator review
- **Issue:** clientToSVG used the node element's own CTM (which includes the node's translate), causing wrong coordinates when dragging at zoom levels != 1
- **Fix:** GraphNode now accepts `zoomGroupRef` prop; clientToSVG uses `innerGRef.getScreenCTM()?.inverse()` which correctly captures zoom scale without node-local translate
- **Files modified:** src/components/stack-graph/GraphNode.tsx, src/components/stack-graph/StackGraph.tsx
- **Verification:** User confirmed drag works correctly at all zoom levels
- **Committed in:** `0dc9434`

---

**Total deviations:** 2 auto-fixed (both Rule 1 - Bug)
**Impact on plan:** Both fixes essential for correct behavior. No scope creep.

## Issues Encountered

None beyond the two auto-fixed bugs above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 4 INTER requirements (INTER-01 through INTER-04) verified and working
- Phase 3 interactivity complete — stack graph has hover tooltips, zoom/pan, click-to-focus, and category filters
- Ready for Phase 4 (final polish, accessibility audit, performance) or deployment

---

_Phase: 03-interactivity_
_Completed: 2026-03-13_
