---
phase: 04-accessibility
plan: 02
subsystem: ui
tags: [accessibility, a11y, keyboard-navigation, screen-reader, svg, wcag, aria]

# Dependency graph
requires:
  - phase: 04-01
    provides: prefers-reduced-motion support and reduced-motion state in StackGraph
provides:
  - Keyboard navigation for all graph nodes (Tab, Enter, Space)
  - Visible dashed white focus ring on keyboard-focused nodes
  - Focus-triggered tooltip (same content as mouse hover)
  - StackGraphSRList component with sr-only structured technology list
  - aria-hidden on SVG so screen readers skip the complex graph
affects: [future accessibility audits, lighthouse/axe testing]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "SVG keyboard nav: tabIndex=0 + role=button on <g>, onFocus/onBlur wiring"
    - "Separate keyboardFocusedId state for focus ring vs hoveredId for tooltip"
    - "onFocusChange prop differentiates pointer hover from keyboard focus in parent"
    - "StackGraphSRList: sr-only section with filtered nodes, updates on filter change"

key-files:
  created:
    - src/components/stack-graph/StackGraphSRList.tsx
  modified:
    - src/components/stack-graph/GraphNode.tsx
    - src/components/stack-graph/StackGraph.tsx

key-decisions:
  - "eslint-disable for prefer-tag-over-role on SVG <g> — HTML button cannot be used inside SVG"
  - "onFocusChange prop added to GraphNode to separate keyboard focus ring state from tooltip hover state"
  - "SR list renders filtered nodes (activeNodeIds) so it stays in sync with filter pills"
  - "StackGraphSRList placed after the relative-positioned container div — in DOM but visually hidden via sr-only"

patterns-established:
  - "SVG keyboard nav: <g tabIndex=0 role=button> with eslint-disable for SVG context"
  - "Focus ring: separate isFocused prop renders dashed circle after main circle"
  - "SR alternative: aria-hidden on complex SVG + sr-only structured list outside the SVG"

requirements-completed: [A11Y-01, A11Y-02, A11Y-04]

# Metrics
duration: 10min
completed: 2026-03-13
---

# Phase 04 Plan 02: Keyboard Navigation and Screen Reader Accessibility Summary

**WCAG keyboard nav (Tab/Enter/Space) with visible focus rings and sr-only structured technology list for the SVG stack graph**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-03-13T18:16:54Z
- **Completed:** 2026-03-13T18:26:00Z
- **Tasks:** 2
- **Files modified:** 3 (2 modified, 1 created)

## Accomplishments

- All graph nodes are Tab-navigable via `tabIndex={0}` and `role="button"` on the SVG `<g>` element
- Keyboard focus shows a visible dashed white ring (isFocused prop + conditional circle render)
- Focusing a node via keyboard triggers the same tooltip as mouse hover (onFocus calls onHoverChange)
- Enter/Space keydown fires onNodeClick for click-to-focus highlighting
- Created StackGraphSRList: sr-only section listing all active nodes with name, level, description, and connected technologies
- SVG has `aria-hidden="true"` — screen readers skip the complex graph and read the structured list
- SR list reflects current filter state (filtered nodes only passed as props)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add keyboard accessibility to GraphNode and wire focus state in StackGraph** - `3888d7d` (feat)
2. **Task 2: Create screen reader list and add aria-hidden to SVG** - `e6524bf` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `src/components/stack-graph/GraphNode.tsx` - Added tabIndex, role, aria-label, onFocus/onBlur/onKeyDown handlers, isFocused focus ring, onFocusChange prop
- `src/components/stack-graph/StackGraph.tsx` - Added keyboardFocusedId state, wired onFocusChange/isFocused to GraphNode, imported and rendered StackGraphSRList, aria-hidden on SVG
- `src/components/stack-graph/StackGraphSRList.tsx` - New sr-only component: section > ul > li with name, level, description, connected tech labels

## Decisions Made

- Added `// eslint-disable-next-line jsx-a11y/prefer-tag-over-role` on the `<g role="button">` because HTML `<button>` cannot be used inside SVG; the rule doesn't account for SVG context
- Kept separate `keyboardFocusedId` state (for focus ring) vs `hoveredId` (for tooltip) to allow independent tracking
- Added `onFocusChange` prop to GraphNode to decouple keyboard focus ring from pointer hover state in the parent
- SR list placed after the container `<div>` (not inside SVG) so it is in the DOM flow with sr-only visibility

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] ESLint lint error: prefer-tag-over-role on SVG `<g role="button">`**

- **Found during:** Task 1 (after running `npm run lint`)
- **Issue:** oxlint `jsx-a11y/prefer-tag-over-role` rule flagged `role="button"` on SVG `<g>` element, recommending `<button>` instead — impossible in SVG context
- **Fix:** Added inline `eslint-disable-next-line` comment explaining SVG context
- **Files modified:** src/components/stack-graph/GraphNode.tsx
- **Verification:** `npm run lint` — 0 warnings and 0 errors
- **Committed in:** `3888d7d` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking lint issue)
**Impact on plan:** Fix was required for lint gate to pass. No scope creep — role="button" on SVG <g> is semantically correct for this use case.

## Issues Encountered

- oxlint doesn't recognize SVG context for `prefer-tag-over-role` rule; inline eslint-disable is the standard workaround.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All WCAG keyboard accessibility (A11Y-01/02) and screen reader (A11Y-04) requirements are complete
- Phase 04 accessibility work is now fully complete (04-01 prefers-reduced-motion + 04-02 keyboard nav + SR list)
- Ready for final Lighthouse/axe audit or launch

---

_Phase: 04-accessibility_
_Completed: 2026-03-13_
