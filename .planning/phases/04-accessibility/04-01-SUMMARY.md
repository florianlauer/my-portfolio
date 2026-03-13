---
phase: 04-accessibility
plan: 01
subsystem: ui
tags: [accessibility, wcag, prefers-reduced-motion, d3-force, react, typescript]

# Dependency graph
requires:
  - phase: 03-interactivity
    provides: useForceLayout hook with animated simulation and filterNodes, StackGraph.tsx with zoom/drag
provides:
  - usePrefersReducedMotion hook (SSR-safe, live media query)
  - useForceLayout reducedMotion branch (sync tick-to-convergence, no rAF loop)
  - StackGraph wired to user motion preference
affects:
  - 04-02 (keyboard navigation and ARIA — shares StackGraph.tsx)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "SSR-safe media query hook: useState initializer reads matchMedia synchronously, useEffect adds live listener"
    - "Reduced-motion sync simulation: sim.stop() + while(alpha > alphaMin) tick loop replaces rAF tick handler"
    - "reducedMotionRef pattern: ref shadows prop so useCallback closures (filterNodes) always read latest value"

key-files:
  created:
    - src/hooks/usePrefersReducedMotion.ts
  modified:
    - src/components/stack-graph/use-force-layout.ts
    - src/components/stack-graph/StackGraph.tsx

key-decisions:
  - "SSR default for reducedMotion is true (safe): avoids animation flash on hydration for users with preference"
  - "simRef stays null in reduced-motion mode — drag handlers guard (!sim) so they no-op naturally, no extra code"
  - "filterNodes in reduced-motion creates a temporary sim (not reusing allNodesRef sim) to avoid side effects on stored positions"
  - "Double-click zoom reset skips transition duration when reducedMotion active (no 300ms ease)"

patterns-established:
  - "Preference hook pattern: SSR guard in useState initializer + useEffect listener for live toggling"
  - "Sync simulation pattern: sim.stop() before tick loop ensures no rAF frames escape"

requirements-completed: [A11Y-03]

# Metrics
duration: 15min
completed: 2026-03-13
---

# Phase 04 Plan 01: Reduced Motion Support Summary

**WCAG 2.1 SC 2.3.3 compliance via sync d3-force layout and usePrefersReducedMotion hook — graph renders fully positioned on first paint with no animation when reduce-motion is enabled**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-13T18:00:00Z
- **Completed:** 2026-03-13T18:15:13Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Created SSR-safe `usePrefersReducedMotion` hook with live media query updates
- Added sync layout branch to `useForceLayout`: stops simulation, runs tick loop to convergence, no rAF frames
- When reducedMotion=true: `simRef` stays null, drag is silently disabled via existing `(!sim)` guards
- `filterNodes` handles reduced-motion mode with a temporary simulation run to convergence
- Double-click zoom reset skips the 300ms transition when reduced motion is active
- Full build and lint pass with zero errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Create usePrefersReducedMotion hook and add reduced-motion branch to force layout** - `43b7030` (feat)
2. **Task 2: Wire reduced-motion hook into StackGraph** - `0700fce` (feat)

## Files Created/Modified

- `src/hooks/usePrefersReducedMotion.ts` - New hook: SSR-safe boolean, queries `(prefers-reduced-motion: no-preference)`, live listener
- `src/components/stack-graph/use-force-layout.ts` - Added `reducedMotion` 5th param, sync branch, reducedMotionRef, updated filterNodes
- `src/components/stack-graph/StackGraph.tsx` - Imports hook, passes reducedMotion to useForceLayout, skip zoom transition

## Decisions Made

- SSR default for `reducedMotion` is `true` (safe default) — avoids any animation flash on hydration for users with a reduce-motion preference
- `simRef` intentionally stays `null` in reduced-motion mode — existing `if (!sim) return` guards in drag handlers make them no-op without extra code
- `filterNodes` in reduced-motion mode creates a fresh temporary simulation to avoid mutating stored `allNodesRef` positions
- Zoom reset double-click uses `.call(zoomBehavior.transform, zoomIdentity)` without `.transition().duration(300)` when reduced motion is active

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness

- Reduced-motion support complete for force graph (A11Y-03 satisfied)
- Ready for 04-02: keyboard navigation, ARIA roles/labels, focus management on SVG nodes

---

_Phase: 04-accessibility_
_Completed: 2026-03-13_
