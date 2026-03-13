---
phase: 03-interactivity
plan: 01
subsystem: ui
tags: [d3-zoom, d3-transition, svg, graph, interaction, zoom, pan, focus, highlight]

# Dependency graph
requires:
  - phase: 02-graph-rendering
    provides: StackGraph SVG component with force layout and node drag interaction

provides:
  - d3-zoom/pan behavior on SVG background rect (0.5x-3x range, no re-renders)
  - Double-click reset to initial view with 300ms transition
  - Click-to-focus node highlighting with adjacency-based opacity dimming (15% for non-neighbors)
  - Click vs drag detection with 8px threshold (CLICK_THRESHOLD)
  - onHoverChange callback lifted from GraphNode for Plan 02 HTML tooltip
  - transformRef exposed on StackGraph for Plan 02 tooltip coordinate mapping

affects: [03-02-tooltips]

# Tech tracking
tech-stack:
  added: [d3-zoom@3, d3-transition@3, @types/d3-zoom, @types/d3-transition]
  patterns:
    - "Direct DOM setAttribute for d3 transforms (no useState, no 60fps re-renders)"
    - "Background rect as d3 event target separate from content g (avoid SVG root zoom)"
    - "Click vs drag detection via pointerDownPos ref + euclidean distance threshold"
    - "Hover state lifted to parent via callback (onHoverChange) for tooltip composition"

key-files:
  created: []
  modified:
    - src/components/stack-graph/StackGraph.tsx
    - src/components/stack-graph/GraphNode.tsx
    - src/components/stack-graph/GraphEdge.tsx

key-decisions:
  - "Attach zoom to bgRectRef (background rect) not SVG root — prevents conflicts with node drag"
  - "Store ZoomTransform in ref + direct setAttribute, not useState — avoids 60fps React re-renders"
  - "import 'd3-transition' side-effect to unlock .transition() on d3 Selection types"
  - "CLICK_THRESHOLD = 8px euclidean distance to distinguish click from drag"
  - "Remove SVG tooltip from GraphNode — replaced by onHoverChange callback for Plan 02 HTML tooltip"

patterns-established:
  - "D3 imperative DOM mutation pattern: direct setAttribute on ref instead of React state for perf-critical transforms"
  - "Background rect pattern: transparent SVG rect as event capture layer, separate from zoom-transformed content g"

requirements-completed: [INTER-02, INTER-03]

# Metrics
duration: 12min
completed: 2026-03-13
---

# Phase 03 Plan 01: Zoom/Pan and Click-to-Focus Summary

**d3-zoom with ref-based transform (no re-renders), click-to-focus adjacency highlighting with 200ms opacity transitions, and click-vs-drag detection in a restructured SVG background-rect/inner-g architecture**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-03-13T17:10:00Z
- **Completed:** 2026-03-13T17:22:00Z
- **Tasks:** 2
- **Files modified:** 5 (StackGraph, GraphNode, GraphEdge, package.json, package-lock.json)

## Accomplishments

- SVG restructured with transparent background rect (zoom target) + inner g (zoom-transformed content wrapper)
- d3-zoom attached to bgRectRef: mouse wheel zooms 0.5x-3x, drag on background pans, double-click resets with 300ms transition
- Node drag completely preserved — `e.stopPropagation()` in onPointerDown prevents d3-zoom from intercepting node pointers
- Click-to-focus: clicking a node dims all non-neighbors to 15% opacity with 200ms CSS transitions
- Click background: clears focus, all nodes return to 100%
- onHoverChange callback ready for Plan 02 tooltip system

## Task Commits

1. **Task 1: Install d3-zoom, add zoom/pan to StackGraph SVG** - `101b63c` (feat)
2. **Task 2: Click-to-focus highlighting on nodes and edges** - `541f1e9` (feat)

## Files Created/Modified

- `src/components/stack-graph/StackGraph.tsx` - Restructured SVG with bgRectRef/innerGRef, d3-zoom behavior, focusedId state, neighborSet useMemo, opacity helpers
- `src/components/stack-graph/GraphNode.tsx` - Added CLICK_THRESHOLD, pointerDownPos ref, onNodeClick/onHoverChange callbacks, opacity prop, removed SVG tooltip
- `src/components/stack-graph/GraphEdge.tsx` - Added opacity prop with 200ms CSS transition
- `package.json` / `package-lock.json` - Added d3-zoom, d3-transition and their @types

## Decisions Made

- Attached zoom to background rect, not SVG root — the SVG root approach breaks node drag event routing
- Used `import "d3-transition"` side-effect import (no named exports needed) to unlock `.transition()` TypeScript types on d3 Selection
- ZoomTransform stored in ref + direct `setAttribute("transform", ...)` — avoids React reconciler overhead on every zoom tick
- Disabled `dblclick.zoom` built-in d3 behavior after attaching zoom to prevent double-handling

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Missing d3-transition import for .transition() TypeScript type**

- **Found during:** Task 1 (build verification)
- **Issue:** `select(bgRect).transition()` caused TypeScript error "Property 'transition' does not exist on type 'Selection'" — d3-transition augments d3-selection types but must be imported
- **Fix:** `npm install d3-transition @types/d3-transition` + `import "d3-transition"` side-effect in StackGraph.tsx
- **Files modified:** package.json, package-lock.json, src/components/stack-graph/StackGraph.tsx
- **Verification:** Build passes with no TypeScript errors
- **Committed in:** 101b63c (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking — missing package)
**Impact on plan:** Fix was necessary to compile the double-click reset. No scope creep.

## Issues Encountered

- d3-transition must be separately imported as a side-effect to unlock `.transition()` on d3-selection in TypeScript (d3 v7 module splitting pattern)

## Next Phase Readiness

- Plan 02 (tooltips) can now use `onHoverChange` callback from GraphNode
- `transformRef` on StackGraph exposes current ZoomTransform for tooltip coordinate mapping
- All opacity/interaction foundations are in place

---

_Phase: 03-interactivity_
_Completed: 2026-03-13_
