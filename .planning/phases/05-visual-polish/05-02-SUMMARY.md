# Phase 5 — Plan 05-02 Summary: Preset + Edge Focus Animation

## Commits

| Hash      | Message                                                                        |
| --------- | ------------------------------------------------------------------------------ |
| `14c4964` | feat(stack-graph): add presetTypicalStack curated set (POLISH-03)              |
| `ebf2d8c` | feat(stack-graph): preset state with focus-aware opacity priority (POLISH-03)  |
| `4c05304` | feat(stack-graph): preset pill 'ma stack typique' with i18n (POLISH-03)        |
| `b94e6dd` | feat(stack-graph): add highlighted edge state with pulse animation (POLISH-04) |
| `822f8e5` | feat(stack-graph): wire edge highlight on focus (POLISH-04)                    |

## Files Modified

- `src/types/stack-graph.ts` — added `presetTypicalStack: readonly string[]` to `StackGraph` type
- `src/content/stack-graph.ts` — added 14-node preset list + extended dev validator
- `src/components/stack-graph/StackGraph.tsx` — preset state, presetSet memo, opacity priority logic, GraphFilters wiring, edge highlight wiring
- `src/components/stack-graph/GraphFilters.tsx` — extended props + preset pill with ★ and inverted active style
- `src/components/stack-graph/GraphEdge.tsx` — highlighted/reducedMotion props, dynamic stroke, SVG `<animate>` pulse
- `src/messages/{fr,en,de}.json` — `stack.filterPills.preset` in all 3 locales

## Key Decisions

**Priority focus > preset:** `getNodeOpacity` and `getEdgeOpacity` check `neighborSet !== null` first. When a node is focused, the preset dimming is fully overridden — the user's explicit action wins. Returning to default state (click background) restores preset dimming.

**`var(--foreground)` for highlighted edges:** Using the theme foreground token (oklch defined in globals.css) rather than a family color ensures high contrast on both light and dark backgrounds without visually privileging one family over others.

**SVG `<animate>` over CSS keyframes:** Runs on the browser's compositor thread — no React re-renders, no `requestAnimationFrame` JS. Only mounted when `highlighted && !reducedMotion`, so WCAG 2.3.3 is satisfied by construction (no conditionally-paused animation; the element simply doesn't exist under reduced motion).

**Preset is purely visual:** It does not modify `activeFilters`. Filter pills (Frontend/Backend/DevOps) remain fully independent. The d3 simulation is never re-seeded by preset toggle — only CSS opacity changes.

**Highlight on focus only (not preset):** Wiring `isHighlighted` only when `neighborSet !== null` avoids the cascade of ~30 simultaneously pulsing edges that would occur if the 14 preset nodes all highlighted their connections at once.

## Manual Tests Required

### Task 4 — Preset toggle (POLISH-03)

- [ ] Click "Ma stack typique" pill → 14 preset nodes at opacity 1, others at 0.2, smooth ~200ms transition
- [ ] Edges between preset nodes stay visible; edges to non-preset nodes attenuate
- [ ] Filter pills still work independently while preset active
- [ ] Focus a node (click) while preset active → focus dimming wins (0.15), background click restores preset state
- [ ] Tab to preset pill → focus ring visible, `aria-pressed` toggles correctly, ★ is aria-hidden

### Task 7 — Edge focus animation (POLISH-04)

- [ ] Click nestjs (high edge count) → connected edges thicken (1.5→3px), darken, pulse 1.6s loop
- [ ] Click background → edges return to neutral with 200ms transition
- [ ] Reduced motion: highlight is static (thick + dark) but no `<animate>` element in DOM
- [ ] Performance: no Layout events in DevTools Performance panel during pulse

## Follow-ups

- **POLISH-04b (optional):** SR list focus → graph focus. Currently, tabbing through `StackGraphSRList` does not trigger `setFocusedId`, so the edge highlight is not keyboard-accessible outside of direct SVG node interaction. Low priority since SR users navigate via the list, not the visual graph.
