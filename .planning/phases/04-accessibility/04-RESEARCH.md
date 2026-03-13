# Phase 4: Accessibility - Research

**Researched:** 2026-03-13
**Domain:** Web Accessibility — SVG keyboard navigation, reduced-motion, screen-reader alternatives
**Confidence:** HIGH

---

## Summary

Phase 4 adds four accessibility layers to the existing SVG force-directed graph built in phases 1–3. The graph already uses SVG (not Canvas), which gives us native tabindex and focus events. The SVG `<g>` elements that wrap each node need `tabIndex={0}` and `onKeyDown` handlers; focus must trigger the same tooltip as hover. For reduced-motion, d3-force's `simulation.tick(n)` can compute a final static layout synchronously on the first frame — no animation ticks, no `requestAnimationFrame` loop. The screen-reader alternative is a visually-hidden `<ul>` rendered in DOM alongside the SVG, listing every node with its level, family, description, and connected technologies.

All four requirements can be addressed with zero new npm dependencies: `matchMedia` for reduced-motion detection, native SVG tabindex for keyboard focus, and plain HTML for the hidden list.

**Primary recommendation:** Build a `usePrefersReducedMotion` hook in `src/hooks/`, extend `GraphNode` with `tabIndex` + `onFocus`/`onKeyDown`, reuse `hoveredId` state for keyboard-triggered tooltips, and render a `<ul aria-hidden={false}>` inside a `sr-only` wrapper inside `StackGraph`.

---

<phase_requirements>

## Phase Requirements

| ID      | Description                                                                                        | Research Support                                                                                                                      |
| ------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| A11Y-01 | Navigation clavier entre les noeuds (Tab) avec focus visible                                       | SVG tabindex="0" on `<g>` nodes; CSS focus-visible ring via stroke; roving tabindex optional but Tab-through is simpler for ~30 nodes |
| A11Y-02 | Tooltips declenchés au focus (pas seulement au hover)                                              | Add `onFocus`/`onBlur` to `GraphNode` mirroring existing `onPointerEnter`/`onPointerLeave`; reuse `hoveredId` state in `StackGraph`   |
| A11Y-03 | Respect de prefers-reduced-motion (desactiver animations force-directed, afficher layout statique) | `usePrefersReducedMotion` hook + `simulation.stop().tick(300)` pattern in `use-force-layout.ts` for synchronous final layout          |
| A11Y-04 | Alternative textuelle cachee pour lecteurs d'ecran (liste structuree des technos et relations)     | Visually-hidden `<ul>` with `aria-label` rendered in `StackGraph` below the SVG; SVG gets `aria-hidden="true"` for SR                 |

</phase_requirements>

---

## Standard Stack

### Core (already installed — no new deps needed)

| Library         | Version           | Purpose                                                        | Why Standard                              |
| --------------- | ----------------- | -------------------------------------------------------------- | ----------------------------------------- |
| React           | 19 (current)      | tabIndex prop, onFocus/onBlur/onKeyDown events on SVG elements | Native React event handling               |
| d3-force        | already installed | `simulation.stop().tick(300)` for static layout                | Synchronous tick pattern, official d3 API |
| Tailwind CSS v4 | already installed | `sr-only` utility for visually-hidden content                  | Standard a11y pattern                     |

### No New Dependencies Required

The entire phase is implementable with what is already in the project. `window.matchMedia` is the browser-native API for `prefers-reduced-motion`. No `react-roving-tabindex` or other a11y lib needed for a flat Tab-order list of ~30 nodes.

**Installation:** none required.

---

## Architecture Patterns

### Recommended File Changes

```
src/
├── hooks/
│   └── usePrefersReducedMotion.ts    # NEW — extracted from inline logic
├── components/stack-graph/
│   ├── GraphNode.tsx                  # ADD tabIndex, onFocus, onBlur, onKeyDown
│   ├── StackGraph.tsx                 # ADD aria-hidden to SVG, add <ul> sr-only list
│   └── use-force-layout.ts            # ADD reduced-motion branch (sync tick)
│   └── StackGraphSRList.tsx           # NEW — visually-hidden screen reader list
```

### Pattern 1: usePrefersReducedMotion Hook

**What:** Custom React hook that wraps `window.matchMedia('(prefers-reduced-motion: reduce)')` with SSR safety and live updates.
**When to use:** Passed as prop or consumed directly in `use-force-layout.ts` and any animated components.

```typescript
// Source: https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/
// src/hooks/usePrefersReducedMotion.ts
"use client";
import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: no-preference)";

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return true; // SSR: safe default
    return !window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(!e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  return prefersReducedMotion;
}
```

**Confidence:** HIGH — based on official MediaQueryList API + Josh Comeau's widely-cited snippet.

### Pattern 2: Static Layout via d3 Synchronous Tick

**What:** When `prefersReducedMotion` is true, run the force simulation to completion synchronously in one shot, then call `.stop()`. Positions are set once; no `tick` event fires, no React state updates from the simulation loop.
**When to use:** In `use-force-layout.ts` when the hook consumer passes `reducedMotion: boolean`.

```typescript
// Source: https://d3js.org/d3-force/simulation
// In use-force-layout.ts — reduced motion branch inside the init useEffect
if (reducedMotion) {
  // Compute final layout synchronously — ~300 ticks reaches alphaMin
  sim.stop();
  // Tick until convergence
  while (sim.alpha() > sim.alphaMin()) {
    sim.tick();
  }
  // Set positions once from final state
  setPositions([...nodesRef.current]);
  // Do NOT call simRef.current = sim (no live drag possible in reduced-motion)
} else {
  sim.on("tick", () => {
    // ... existing tick handler
    setPositions([...nodesRef.current]);
  });
  simRef.current = sim;
}
```

**Note:** In reduced-motion mode, drag should also be disabled (no simulation to reheat). The node `<g>` elements can still be draggable visually, but `dragStart`/`dragMove`/`dragEnd` become no-ops when `simRef.current` is null.

**Confidence:** HIGH — `simulation.tick(n)` / `while alpha > alphaMin` pattern is documented in official d3 API.

### Pattern 3: Keyboard Focus on GraphNode

**What:** Add `tabIndex={0}`, `onFocus`, `onBlur`, `onKeyDown` to the `<g>` element in `GraphNode.tsx`. `onFocus`/`onBlur` reuse the same `onHoverChange` callback already wired for tooltip. `onKeyDown` handles Enter/Space to toggle click-to-focus (highlight mode).
**When to use:** Always — this is the primary A11Y-01 + A11Y-02 fix.

```typescript
// GraphNode.tsx additions — focus mirrors hover
<g
  tabIndex={0}
  role="button"
  aria-label={`${node.label} — ${node.level}`}
  onFocus={() => onHoverChange?.(node.id)}
  onBlur={() => onHoverChange?.(null)}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onNodeClick?.(node.id);
    }
  }}
  // ... existing props
>
```

**Focus ring:** CSS `outline` is unreliable in SVG across browsers. Use a `<circle>` overlay with stroke that appears/disappears based on `:focus-visible` pseudo-class on the `<g>`. Tailwind's `focus-visible:` variant does not work on SVG `<g>` elements directly — use a CSS selector in `globals.css` or an inline conditional `stroke` prop driven by React state.

**Recommended approach:** Track `focusedForKeyboard` state in `StackGraph` (separate from `focusedId` which is click-to-highlight), add a `isFocused` prop to `GraphNode`, and render a focus ring `<circle>` when true.

```typescript
// Inside GraphNode render, after the main circle:
{isFocused && (
  <circle
    r={r + 4}
    fill="none"
    stroke="white"
    strokeWidth={2}
    strokeDasharray="4 2"
    opacity={0.9}
  />
)}
```

**Confidence:** HIGH for tabIndex/onFocus pattern. MEDIUM for SVG focus ring approach (CSS outline unreliable on SVG, confirmed by ally.js docs).

### Pattern 4: Visually-Hidden Screen Reader List

**What:** A `<section>` with `className="sr-only"` containing a `<ul>` that lists every visible node, its level, description, and connected technologies. The SVG gets `aria-hidden="true"` so screen readers skip the interactive graph and use this list instead.
**When to use:** Always rendered (not toggled), but visually hidden with Tailwind's `sr-only`.

```tsx
// StackGraphSRList.tsx
type Props = { nodes: GraphNode[]; edges: GraphEdge[] };

export function StackGraphSRList({ nodes, edges }: Props) {
  return (
    <section aria-label="Liste des technologies" className="sr-only">
      <ul>
        {nodes.map((node) => {
          const connected = edges
            .filter((e) => e.source === node.id || e.target === node.id)
            .map((e) => (e.source === node.id ? e.target : e.source));
          const connectedLabels = connected
            .map((id) => nodes.find((n) => n.id === id)?.label)
            .filter(Boolean)
            .join(", ");
          return (
            <li key={node.id}>
              <strong>{node.label}</strong> — {node.level}. {node.description}
              {connected.length > 0 && ` Lié à : ${connectedLabels}.`}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
```

**SVG aria change:** The SVG currently has `aria-label="Graphe interactif..."`. With the hidden list present, change to `aria-hidden="true"` so screen readers use the structured list instead of trying to navigate the SVG.

**Confidence:** HIGH — sr-only + aria-hidden is the standard pattern for complex interactive SVG alternatives (MDN, CSS-Tricks accessible SVGs article).

### Anti-Patterns to Avoid

- **Positive tabindex values:** Never use `tabIndex={1}`, `tabIndex={2}` etc. — disrupts page flow. Use `tabIndex={0}` only.
- **CSS outline on SVG `<g>`:** `outline` is not reliably painted by browsers for SVG elements. Use stroke-based focus indicators instead.
- **aria-hidden on the sr-only list:** The point of the hidden list is that screen readers CAN see it. `sr-only` hides it visually only. Never add `aria-hidden="true"` to it.
- **Blocking main thread with simulation:** For large graphs, run sync ticks in a `useEffect` with `requestIdleCallback` fallback. At 30–40 nodes the `while(alpha > alphaMin)` loop is imperceptible (<5ms).
- **Running simulation animation when reducedMotion=true:** Even a single "invisible" tick loop can trigger motion sensitivity. Check the flag before starting `sim.restart()`.

---

## Don't Hand-Roll

| Problem                      | Don't Build                        | Use Instead                                   | Why                                                                  |
| ---------------------------- | ---------------------------------- | --------------------------------------------- | -------------------------------------------------------------------- |
| Reduced-motion detection     | Custom state + prop threading      | `usePrefersReducedMotion` hook + `matchMedia` | Already a well-understood 10-line hook; covers SSR edge case         |
| Static d3 layout             | Custom force positioning algorithm | `simulation.stop(); while(...) sim.tick()`    | d3 simulation already knows the forces; convergence is deterministic |
| Screen reader list component | Complex ARIA live region           | Plain `<ul>` with `sr-only`                   | Static content, no live region needed — simpler and more robust      |

---

## Common Pitfalls

### Pitfall 1: CSS outline does not render on SVG `<g>` elements in all browsers

**What goes wrong:** Adding `className="focus-visible:outline-2 outline-white"` to a `<g>` element works in Chrome but is invisible in Firefox and Safari.
**Why it happens:** SVG elements paint using SVG rendering model, not CSS box model. `outline` is a CSS box property.
**How to avoid:** Use a conditionally-rendered `<circle>` with `stroke` as the focus indicator. Track focus state in React.
**Warning signs:** Focus ring appears in Chrome devtools but invisible in Firefox testing.

### Pitfall 2: onFocus fires on child elements (event bubbling)

**What goes wrong:** The `<g>` contains a `<circle>` and `<svg>` icon. When the user focuses the `<g>` via Tab, `onFocus` fires. But if any child element gains focus independently, it also bubbles. Double-trigger of `onHoverChange`.
**Why it happens:** React's `onFocus` bubbles (maps to native `focus` + `focusin`). `onBlur` is the same.
**How to avoid:** Use `onFocus` on the `<g>` — it fires once on tab-in. The child elements (circle, icon svg, text) should NOT have `tabIndex` themselves. Only the outer `<g>` is the focus target.
**Warning signs:** Tooltip flickers on focus.

### Pitfall 3: Tab order follows DOM order, not visual/spatial order

**What goes wrong:** Nodes are rendered in `positions.map(...)` order which is d3 simulation order, not left-to-right or any meaningful spatial order. Tab navigation jumps around the graph unpredictably.
**Why it happens:** DOM order determines tab order, but positions are randomized by force layout.
**How to avoid:** This is acceptable for v1 (requirement says "Tab between nodes with focus", not "spatial Tab order"). Document this as a known limitation. For future improvement, sort the render order by x position.
**Warning signs:** Keyboard users report confusing navigation (flag as v2 improvement).

### Pitfall 4: Reduced motion branch triggers simulation restart on filter change

**What goes wrong:** When filters change in `StackGraph`, `filterNodes` is called. In reduced-motion mode, `filterNodes` calls `sim.alpha(0.5).restart()` — re-triggering animation.
**Why it happens:** `filterNodes` in `use-force-layout.ts` always restarts the simulation.
**How to avoid:** In reduced-motion mode, `filterNodes` should run `sim.stop()` + sync ticks after updating sim nodes, instead of `sim.alpha(0.5).restart()`.

### Pitfall 5: SSR mismatch with matchMedia

**What goes wrong:** `window.matchMedia` is not available during Next.js server rendering. Reading it at module scope or in a synchronous `useState` initializer throws.
**Why it happens:** Next.js renders on the server where `window` is undefined.
**How to avoid:** Guard with `typeof window === "undefined"` check. Return `true` (reduced motion preferred) as the safe server-side default — nodes appear statically positioned, no animation flicker on hydration.

---

## Code Examples

### Full usePrefersReducedMotion hook

```typescript
// Source: https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/
// src/hooks/usePrefersReducedMotion.ts
"use client";
import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: no-preference)";

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return !window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(!e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  return prefersReducedMotion;
}
```

### d3 synchronous static layout

```typescript
// Source: https://d3js.org/d3-force/simulation (simulation.tick() docs)
// Pattern for no-animation layout
const sim = forceSimulation<SimNode>(simNodes)
  .force("center", forceCenter(width / 2, height / 2))
  .force("charge", forceManyBody<SimNode>().strength(-250))
  .force(
    "link",
    forceLink<SimNode, SimEdge>(simEdges)
      .id((d) => d.id)
      .distance(100),
  )
  .force(
    "collide",
    forceCollide<SimNode>().radius((d) => COLLIDE_RADIUS[d.level] ?? 28),
  )
  .stop(); // Stop the auto timer immediately

// Tick to convergence — typically ~100-300 iterations for this graph size
while (sim.alpha() > sim.alphaMin()) {
  sim.tick();
}

// Set final positions once — no ongoing tick events
setPositions([...nodesRef.current]);
// simRef.current stays null in reduced-motion mode (drag disabled)
```

### GraphNode keyboard accessibility additions

```tsx
// In GraphNode.tsx — additions to the <g> element
<g
  transform={`translate(${x}, ${y})`}
  tabIndex={0}
  role="button"
  aria-label={`${node.label}, niveau ${node.level}, famille ${node.family}`}
  className="cursor-grab active:cursor-grabbing"
  style={{ opacity: opacity ?? 1, transition: "opacity 200ms ease" }}
  onPointerDown={handlePointerDown}
  onPointerMove={handlePointerMove}
  onPointerUp={handlePointerUp}
  onPointerEnter={() => onHoverChange?.(node.id)}
  onPointerLeave={() => onHoverChange?.(null)}
  onFocus={() => onHoverChange?.(node.id)}
  onBlur={() => onHoverChange?.(null)}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onNodeClick?.(node.id);
    }
  }}
>
  {/* Focus ring — renders only when isFocused=true */}
  {isFocused && (
    <circle
      r={r + 5}
      fill="none"
      stroke="white"
      strokeWidth={2}
      strokeDasharray="4 2"
      opacity={0.85}
    />
  )}
  {/* ... rest of existing render */}
</g>
```

### GraphNode new prop + StackGraph focus tracking

```typescript
// GraphNode new prop
type GraphNodeProps = {
  // ... existing props
  isFocused?: boolean;
};

// StackGraph — new state
const [keyboardFocusedId, setKeyboardFocusedId] = useState<string | null>(null);

// Pass to GraphNode
<GraphNode
  isFocused={keyboardFocusedId === pos.id}
  // ...
/>

// GraphNode onFocus/onBlur callbacks in StackGraph
// onHoverChange already handles tooltip — reuse it
// setKeyboardFocusedId tracks the focus ring separately
```

---

## State of the Art

| Old Approach                                     | Current Approach                                        | When Changed          | Impact                                                  |
| ------------------------------------------------ | ------------------------------------------------------- | --------------------- | ------------------------------------------------------- |
| `aria-hidden` on entire SVG (graph = decorative) | `aria-hidden` on SVG + structured `<ul>` alternative    | WCAG 2.1 / 2019+      | Screen readers get full content without SVG complexity  |
| CSS `outline` for SVG focus                      | SVG `<circle>` stroke overlay                           | SVG 2 era             | Cross-browser reliable focus indicator                  |
| `mediaQueryList.addListener`                     | `mediaQueryList.addEventListener('change', ...)`        | Chrome 79, Firefox 55 | `addListener` deprecated; `addEventListener` is current |
| Force layout always animated                     | Static layout via `.stop().tick(n)` when motion reduced | WCAG 2.1 2.3.3 (AAA)  | Required for vestibular disorder accessibility          |

---

## Open Questions

1. **Tab order predictability**
   - What we know: Nodes render in d3 `positions` array order (arbitrary / force-layout dependent)
   - What's unclear: Whether arbitrary Tab order is acceptable for v1 or if sorting by label/family is expected
   - Recommendation: Accept arbitrary order for v1 (requirement says "Tab between nodes", not "logical order"). Can sort `positions` by `node.label` alphabetically as a simple improvement if needed.

2. **Drag in reduced-motion mode**
   - What we know: Drag relies on `sim.alpha(0.3).restart()` in `dragStart`. With `simRef.current = null` in reduced-motion branch, drag silently no-ops.
   - What's unclear: Whether drag should be completely disabled or silently ignored in reduced-motion mode
   - Recommendation: Silent no-op (drag pointer events still work visually but node doesn't move). This avoids a jarring "disabled cursor" UI change.

3. **Tooltip accessibility**
   - What we know: `GraphTooltip` has `role="tooltip"` and `aria-hidden={!visible}`. With keyboard focus triggering the tooltip via `onFocus`, screen readers may announce the tooltip content.
   - What's unclear: Whether the tooltip content duplicates what's already in the sr-only list (it does). This is fine — the tooltip serves keyboard users; the sr-only list serves screen reader users.
   - Recommendation: No change needed. The duplication is intentional and correct.

---

## Validation Architecture

nyquist_validation is enabled in `.planning/config.json`.

### Test Framework

| Property           | Value                                                       |
| ------------------ | ----------------------------------------------------------- |
| Framework          | None configured (no jest, vitest, or playwright in project) |
| Config file        | None — see Wave 0                                           |
| Quick run command  | `npm run lint` (oxlint)                                     |
| Full suite command | `npm run build && npm run lint`                             |

### Phase Requirements → Test Map

| Req ID  | Behavior                                     | Test Type   | Automated Command                                         | File Exists? |
| ------- | -------------------------------------------- | ----------- | --------------------------------------------------------- | ------------ |
| A11Y-01 | Tab focuses each node with visible ring      | manual-only | n/a — browser keyboard testing                            | N/A          |
| A11Y-02 | Focus triggers tooltip same as hover         | manual-only | n/a — browser keyboard testing                            | N/A          |
| A11Y-03 | reduced-motion = static layout, no animation | manual-only | n/a — OS accessibility setting required                   | N/A          |
| A11Y-04 | sr-only list contains all nodes + relations  | smoke       | `npm run build` — checks no TS errors in StackGraphSRList | ❌ Wave 0    |

**Note:** No test runner is configured in this project (CLAUDE.md: "No test runner is configured"). All A11Y requirements are manually verified via browser keyboard navigation and a screen reader (VoiceOver on macOS / NVDA on Windows). The build + lint gate is the automated quality check.

### Sampling Rate

- **Per task commit:** `npm run lint`
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** Build green + manual keyboard/SR walkthrough before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] No test infrastructure gaps — project has no test runner by design. Manual verification checklist replaces automated tests for a11y.

---

## Sources

### Primary (HIGH confidence)

- https://d3js.org/d3-force/simulation — `simulation.tick()`, `simulation.stop()`, synchronous layout pattern
- https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/ — exact `usePrefersReducedMotion` hook implementation
- MDN Web Docs (tabindex global attribute) — tabIndex values, tab order
- WCAG 2.1 SC 2.3.3 Animation from Interactions — reduced-motion requirement basis

### Secondary (MEDIUM confidence)

- https://allyjs.io/tutorials/focusing-in-svg.html — SVG focus management, CSS outline limitations on SVG, tabindex in SVG 2
- https://css-tricks.com/accessible-svgs/ — SVG aria patterns, aria-hidden + structured alternative pattern
- https://www.tpgi.com/using-aria-enhance-svg-accessibility/ — ARIA roles and SVG

### Tertiary (LOW confidence)

- https://www.joshuawootonn.com/react-roving-tabindex — roving tabindex pattern (not used but considered)
- https://reactflow.dev/learn/advanced-use/accessibility — graph library a11y as reference (different arch)

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — no new libs, all native browser/React/d3 APIs
- Architecture: HIGH — patterns are well-established; exact hook code verified from official source
- Pitfalls: HIGH — SVG outline issue verified by ally.js docs; SSR matchMedia guard verified by JoshW hook

**Research date:** 2026-03-13
**Valid until:** 2027-03-13 (stable APIs — matchMedia, d3 sync tick, SVG tabindex)
