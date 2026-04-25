---
phase: 04-accessibility
verified: 2026-03-13T19:00:00Z
status: human_needed
score: 9/9 must-haves verified
re_verification: false
gaps: []
human_verification:
  - test: "Tab through all graph nodes on /stack"
    expected: "Each node receives focus in DOM order, a dashed white ring appears around the focused node, and the tooltip appears with the same content as mouse hover"
    why_human: "Focus order, visual ring, and tooltip rendering require a real browser — cannot verify DOM focus traversal or CSS rendering programmatically"
  - test: "Press Enter or Space on a focused graph node"
    expected: "Click-to-focus highlighting activates: the focused node and its direct connections stay at full opacity, all others dim to 0.15"
    why_human: "Keyboard activation of click state requires browser interaction"
  - test: "Enable OS 'Reduce Motion' (System Preferences > Accessibility > Display > Reduce Motion), then load /stack"
    expected: "Graph appears fully laid out on first paint with no animated movement. Force simulation does not run tick-by-tick. No nodes fly into position."
    why_human: "prefers-reduced-motion media query response requires real OS setting and browser rendering verification"
  - test: "With Reduce Motion enabled, toggle a filter pill"
    expected: "Nodes reposition instantly to new positions without any transition animation"
    why_human: "Synchronous recomputation vs animated transition is a runtime behavior that cannot be verified statically"
  - test: "Enable VoiceOver (macOS) and navigate to /stack"
    expected: "VoiceOver skips the SVG graph (aria-hidden=true) and reads the structured list under 'Liste des technologies', announcing each technology with its name, level, description, and related technologies"
    why_human: "Screen reader announcement is a runtime/AT behavior — cannot be verified from source code alone"
  - test: "Toggle a filter pill (e.g. hide Frontend) with VoiceOver active"
    expected: "The structured list updates to reflect only active nodes; filtered-out nodes are no longer announced"
    why_human: "Requires browser + screen reader interaction to verify live DOM update and AT re-read"
---

# Phase 04: Accessibility Verification Report

**Phase Goal:** Accessibility — reduced-motion support, keyboard navigation, screen reader compatibility for the stack graph
**Verified:** 2026-03-13T19:00:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| #   | Truth                                                                                                                           | Status   | Evidence                                                                                                                                 |
| --- | ------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | With prefers-reduced-motion: reduce enabled, graph appears fully laid out on first paint with no animation                      | ? HUMAN  | Sync branch (`sim.stop()` + `while alpha > alphaMin`) is implemented and wired, but OS-level behavior requires browser verification      |
| 2   | With motion preference off, force simulation does not run tick-by-tick                                                          | ? HUMAN  | `simRef` stays null in reduced-motion branch — no tick handler assigned — confirmed in code, but runtime must be observed                |
| 3   | Filter changes in reduced-motion mode recompute layout synchronously without animation                                          | ? HUMAN  | `filterNodes` reduced-motion branch creates temp sim and converges synchronously — code verified, animation absence needs human check    |
| 4   | Drag is silently disabled in reduced-motion mode (pointer events work but node does not move)                                   | VERIFIED | `simRef` stays null; `dragStart`/`dragEnd` guard `if (!sim) return` — verified at lines 239, 259 of `use-force-layout.ts`                |
| 5   | User can Tab between graph nodes and each focused node shows a visible dashed white ring                                        | ? HUMAN  | `tabIndex={0}` on every `<g>`, `isFocused` prop renders dashed circle — code complete, visual rendering and focus order need browser     |
| 6   | Focusing a node via keyboard shows the same tooltip as hovering with a mouse                                                    | ? HUMAN  | `onFocus` calls both `onHoverChange?.(node.id)` and `onFocusChange?.(node.id)` — wired; tooltip display needs browser verification       |
| 7   | Pressing Enter or Space on a focused node triggers click-to-focus highlighting                                                  | ? HUMAN  | `handleKeyDown` calls `onNodeClick?.(node.id)` on Enter/Space — code confirmed; highlight behavior needs browser verification            |
| 8   | A visually hidden structured list of all technologies with levels, descriptions, and connections is available to screen readers | VERIFIED | `StackGraphSRList` renders `<section aria-label="..." className="sr-only">` with full node data and connected labels — confirmed in code |
| 9   | Screen readers skip the SVG graph and read the structured list instead                                                          | VERIFIED | `<svg aria-hidden="true">` at line 300 of `StackGraph.tsx` — confirmed; SR announcement behavior needs human check                       |

**Score:** 9/9 truths have code evidence (3 fully verified statically, 6 require human browser/AT testing)

### Required Artifacts

| Artifact                                          | Expected                                                                | Status   | Details                                                                                                                                                |
| ------------------------------------------------- | ----------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/hooks/usePrefersReducedMotion.ts`            | SSR-safe reduced motion hook with live updates                          | VERIFIED | Exists, 29 lines, exports `usePrefersReducedMotion(): boolean`, SSR guard in `useState` initializer, `useEffect` listener with cleanup                 |
| `src/components/stack-graph/use-force-layout.ts`  | Force layout with reducedMotion sync branch                             | VERIFIED | Exists, 270 lines, `reducedMotion = false` 5th param, sync branch at lines 112-124, `filterNodes` reduced-motion branch at lines 175-222               |
| `src/components/stack-graph/GraphNode.tsx`        | Keyboard-accessible node with tabIndex, focus/blur, keydown, focus ring | VERIFIED | Exists, 213 lines, `tabIndex={0}`, `role="button"`, `aria-label`, `onFocus`/`onBlur`/`onKeyDown`, `isFocused` focus ring at lines 172-181              |
| `src/components/stack-graph/StackGraphSRList.tsx` | Visually-hidden screen reader list                                      | VERIFIED | Exists, 35 lines, `sr-only` section, maps nodes with name/level/description/connected labels                                                           |
| `src/components/stack-graph/StackGraph.tsx`       | Orchestrator wiring all accessibility features                          | VERIFIED | Exists, 374 lines, imports and uses all artifacts, `keyboardFocusedId` state, `aria-hidden="true"` on SVG, `StackGraphSRList` rendered after container |

### Key Link Verification

| From                  | To                           | Via                                                                                                                  | Status | Details                                                                                                                                                |
| --------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `StackGraph.tsx`      | `usePrefersReducedMotion.ts` | `import` + `const reducedMotion = usePrefersReducedMotion()` passed to `useForceLayout`                              | WIRED  | Lines 11 and 60 of `StackGraph.tsx`                                                                                                                    |
| `use-force-layout.ts` | d3-force simulation          | `reducedMotion` triggers `sim.stop()` + `while(alpha > alphaMin) sim.tick()`                                         | WIRED  | Lines 112-124 (init) and 175-222 (filterNodes) of `use-force-layout.ts`                                                                                |
| `GraphNode.tsx`       | `StackGraph.tsx`             | `onFocus`/`onBlur` calls `onHoverChange` (tooltip) + `onFocusChange` (focus ring); `onKeyDown` calls `onNodeClick`   | WIRED  | Lines 152-160 of `GraphNode.tsx`; `onFocusChange={setKeyboardFocusedId}`, `isFocused={keyboardFocusedId === pos.id}` in `StackGraph.tsx` lines 348-349 |
| `StackGraph.tsx`      | `StackGraphSRList.tsx`       | `import` + renders `<StackGraphSRList nodes={data.nodes.filter(n => activeNodeIds.has(n.id))} edges={data.edges} />` | WIRED  | Lines 17 and 367-370 of `StackGraph.tsx`                                                                                                               |
| `StackGraph.tsx`      | SVG element                  | `aria-hidden="true"` on `<svg>`                                                                                      | WIRED  | Line 300 of `StackGraph.tsx`                                                                                                                           |

### Requirements Coverage

| Requirement | Source Plan   | Description                                                                         | Status    | Evidence                                                                                                                                             |
| ----------- | ------------- | ----------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| A11Y-01     | 04-02-PLAN.md | Navigation clavier entre les noeuds (Tab) avec focus visible                        | SATISFIED | `tabIndex={0}` on `<g>`, dashed white ring when `isFocused`, `keyboardFocusedId` state in `StackGraph.tsx`                                           |
| A11Y-02     | 04-02-PLAN.md | Tooltips declenches au focus (pas seulement au hover)                               | SATISFIED | `onFocus` calls `onHoverChange?.(node.id)` — same tooltip mechanism as pointer hover — wired in `GraphNode.tsx` lines 152-154                        |
| A11Y-03     | 04-01-PLAN.md | Respect de prefers-reduced-motion (desactiver animations, afficher layout statique) | SATISFIED | `usePrefersReducedMotion` hook + sync branch in `useForceLayout` + `StackGraph` passes `reducedMotion` to layout; double-click zoom skips transition |
| A11Y-04     | 04-02-PLAN.md | Alternative textuelle cachee pour lecteurs d'ecran (liste structuree)               | SATISFIED | `StackGraphSRList` with `sr-only` + `aria-hidden="true"` on SVG — full technology list with level, description, and connections                      |

All 4 Phase 4 requirements (A11Y-01 through A11Y-04) are claimed by plans 04-01 and 04-02, and all have implementation evidence. No orphaned requirements.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact                                |
| ---- | ---- | ------- | -------- | ------------------------------------- |
| —    | —    | —       | —        | No anti-patterns found in phase files |

Scan confirmed: no TODO/FIXME/PLACEHOLDER comments, no stub return patterns (the two `return null` instances are legitimate guard clauses), no empty handlers, no `console.log` implementations.

### Human Verification Required

#### 1. Keyboard focus ring appearance

**Test:** Open `/stack` in a browser, press Tab repeatedly to cycle through graph nodes.
**Expected:** Each node receives a visible dashed white ring around it when focused; ring disappears when focus leaves.
**Why human:** CSS rendering and DOM focus order cannot be verified statically.

#### 2. Focus-triggered tooltip

**Test:** Tab to any graph node (without touching the mouse).
**Expected:** The tooltip panel appears above the focused node, showing the same content (name, level, description, connected technologies) as when hovering with a mouse.
**Why human:** Tooltip visibility is a runtime React state update triggered by the focus event — needs browser.

#### 3. Enter/Space keyboard activation

**Test:** Tab to a node, press Enter or Space.
**Expected:** Click-to-focus highlighting activates — the node and its direct connections remain at full opacity; all other nodes dim to 0.15.
**Why human:** Keyboard event → click handler → opacity state update requires browser interaction.

#### 4. Reduced-motion: static layout on first paint

**Test:** Enable OS Reduce Motion setting, reload `/stack`, observe the graph.
**Expected:** Graph nodes appear already positioned with no animated movement on load; force simulation does not animate.
**Why human:** `prefers-reduced-motion` media query response requires real OS setting; initial paint is not observable from code.

#### 5. Reduced-motion: instant filter repositioning

**Test:** With OS Reduce Motion enabled, click a filter pill to toggle a category.
**Expected:** Nodes reposition immediately with no transition — positions change in a single frame.
**Why human:** Distinction between sync recompute and animated transition requires visual observation.

#### 6. VoiceOver: structured list announced, SVG skipped

**Test:** Enable VoiceOver on macOS, navigate to `/stack`, use VO to browse the page content.
**Expected:** VoiceOver announces "Liste des technologies" section and reads each technology entry (name, level, description, connections). The SVG force graph is completely silent (aria-hidden).
**Why human:** Screen reader announcement is runtime AT behavior.

#### 7. VoiceOver: structured list reflects active filters

**Test:** With VoiceOver active, toggle the Frontend filter pill off.
**Expected:** The screen reader list updates — Frontend technologies are no longer announced when browsing the list.
**Why human:** Requires AT + live DOM update verification.

### Gaps Summary

No gaps found. All artifacts are substantive (not stubs), all key links are wired, build passes with zero errors, lint passes with zero warnings.

The 6 human verification items above are standard runtime behaviors (visual rendering, OS accessibility settings, screen reader announcements) that cannot be confirmed from static analysis. They do not represent code gaps — the implementation evidence for each is present and complete.

---

_Verified: 2026-03-13T19:00:00Z_
_Verifier: Claude (gsd-verifier)_
