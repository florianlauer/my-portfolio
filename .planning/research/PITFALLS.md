# Domain Pitfalls

**Domain:** Interactive graph visualization (force-directed tech stack graph in React/Next.js)
**Researched:** 2026-03-07
**Confidence:** HIGH (well-documented problem space, multiple corroborating sources)

## Critical Pitfalls

Mistakes that cause rewrites or major issues.

### Pitfall 1: D3 Force Simulation Fighting React's Render Cycle

**What goes wrong:** D3's `forceSimulation` mutates node objects in-place on every tick (adding `x`, `y`, `vx`, `vy` properties). If node positions are stored in React state, each tick triggers a full re-render -- 60+ re-renders per second during layout settling. The graph stutters, freezes, or the browser tab crashes.

**Why it happens:** D3 and React have fundamentally opposed paradigms. D3 is imperative and mutation-based; React is declarative and immutability-based. Developers who store simulation data in `useState` create an infinite fight between the two systems.

**Consequences:** Graph is unusable (single-digit FPS during settling), CPU pinned at 100%, React DevTools shows thousands of unnecessary renders.

**Warning signs:**

- `useState` or `useReducer` holding node position data
- `setState` called inside a `simulation.on("tick", ...)` callback
- Visible jank when graph first loads or when filters change

**Prevention:**

- Keep the D3 simulation entirely outside React state. Use `useRef` for the simulation instance.
- For SVG: use `useRef` on the SVG container and let D3 mutate DOM attributes directly via `d3.select(ref.current)`.
- For Canvas: use `useRef` on the canvas element and redraw in the tick handler via `requestAnimationFrame`.
- Only use React state for user-facing controls (filters, selected node) -- never for physics positions.

**Detection:** Profile with React DevTools Profiler. If the graph component re-renders more than once per user interaction, the boundary is wrong.

**Phase:** Must be addressed in Phase 1 (core graph rendering). This is an architectural decision that is nearly impossible to retrofit.

---

### Pitfall 2: Choosing SVG When Canvas Is Required (or Vice Versa)

**What goes wrong:** SVG creates a DOM node per element. With 30-50 nodes + edges + labels, that is 100-200+ DOM elements minimum. This is fine. But if the design evolves to include animated particles on edges, glow effects, or the node count grows, SVG performance degrades rapidly. Conversely, choosing Canvas loses native DOM events, accessibility, and CSS styling.

**Why it happens:** Developers default to SVG because it integrates naturally with React (JSX maps to SVG elements). They discover performance limits too late, requiring a full rendering rewrite.

**Consequences:** Either a performance cliff (SVG at scale) or loss of accessibility and interactivity features (Canvas without proper abstractions).

**Warning signs:**

- SVG graph starts lagging during pan/zoom at current node count
- Canvas-based graph has no keyboard navigation or screen reader support
- Frequent DOM thrashing visible in Performance tab

**Prevention:**

- For 30-50 nodes: **SVG is the right choice.** The DOM overhead is negligible at this scale, and you get native event handling, CSS transitions, ARIA attributes, and keyboard focus for free.
- Only consider Canvas if node count exceeds 200+ or if you need WebGL-grade visual effects.
- If using a library like `react-force-graph`, know that it defaults to Canvas (via HTML5 Canvas) -- which means you lose DOM-level accessibility unless you build a parallel accessible layer.
- Decision: use **D3 force simulation for physics + SVG rendering via React components** for this project's scale. This gives maximum control over accessibility and styling.

**Phase:** Must be locked in Phase 1 (architecture decision). Switching rendering backends later is a full rewrite.

---

### Pitfall 3: SSR/Hydration Crashes in Next.js

**What goes wrong:** Graph libraries access `window`, `document`, `canvas`, or `requestAnimationFrame` during import or initialization. Next.js renders components on the server first, where these APIs do not exist. The build fails with `ReferenceError: window is not defined` or the page hydration mismatches.

**Why it happens:** Even with `"use client"`, Next.js still pre-renders the component on the server to generate initial HTML. The `"use client"` directive does NOT prevent server-side execution -- it only marks the hydration boundary.

**Consequences:** Build failures, hydration mismatch warnings, blank graph on first load, or full-page crash in production.

**Warning signs:**

- `ReferenceError: window is not defined` during `npm run build`
- Hydration mismatch warnings in browser console
- Graph flickers or disappears on page load

**Prevention:**

- Use `next/dynamic` with `{ ssr: false }` for the graph component wrapper. This is the only reliable way to fully skip server rendering.
- Do NOT rely on `typeof window !== 'undefined'` checks inside component bodies -- these create hydration mismatches because server HTML differs from client HTML.
- Structure: Server Component page (`/stack/page.tsx`) renders layout + metadata, then includes a dynamically imported Client Component (`<StackGraph />`) with `ssr: false`.
- If using D3 directly (no wrapper library), the import is safe -- D3 modules are isomorphic. The issue is only with rendering code that touches DOM/Canvas APIs.

**Phase:** Must be addressed in Phase 1 (project setup). Wrong patterns here cascade into every subsequent feature.

---

### Pitfall 4: Inaccessible Graph -- No Keyboard Nav, No Screen Reader Support

**What goes wrong:** The graph renders as a visual-only artifact. Screen readers announce nothing meaningful. Keyboard users cannot navigate between nodes. Focus indicators are absent. The graph violates WCAG 2.1 AA, which the project requires.

**Why it happens:** Graph visualizations are inherently visual. Most tutorials and libraries focus exclusively on mouse interaction. Accessibility is treated as an afterthought, but retrofitting it onto a Canvas-based or unstructured SVG graph is extremely difficult.

**Consequences:** Fails accessibility audit. Excludes keyboard-only users (including power users who prefer keyboard). Portfolio of a senior dev shipping inaccessible UI is a bad look.

**Warning signs:**

- Tab key does nothing on the graph
- VoiceOver/NVDA announces "image" or nothing for the graph area
- No `role`, `aria-label`, or `tabindex` attributes on graph elements
- Tooltips only appear on hover, never on focus

**Prevention:**

- Wrap the graph in a `<figure>` with `<figcaption>` describing the visualization purpose.
- Each SVG node should be a `<g>` with `role="img"`, `aria-label="[tech name] - [category]"`, `tabindex="0"`, and visible `focus-visible` ring.
- Tooltip content must appear on both `mouseenter` AND `focus` events.
- Provide a "list view" toggle or an accessible `<table>` as a text alternative showing all technologies and their relationships.
- Test with VoiceOver (macOS) and keyboard-only navigation before shipping.

**Phase:** Must be designed into Phase 1 (node component architecture), implemented alongside visual features. Cannot be bolted on after Canvas/SVG choice is made.

---

## Moderate Pitfalls

### Pitfall 5: Jarring Force-Settling Animation on Load

**What goes wrong:** When the page loads, nodes start bunched together (often at origin 0,0) and violently fly apart as forces resolve. The graph looks broken for 1-3 seconds before stabilizing. Users see chaos, not a polished visualization.

**Why it happens:** Force-directed layouts need iterations to converge. Running the simulation visibly from frame 0 exposes the messy convergence process to the user.

**Prevention:**

- **Pre-compute the layout.** Run `simulation.tick(300)` synchronously before the first render to settle positions. Then render the already-stable graph. This is computationally cheap for 30-50 nodes (< 50ms).
- Alternatively, use a gentle fade-in: compute layout off-screen, then animate opacity from 0 to 1 once positions are stable.
- If you want visible animation for wow-factor, start nodes at meaningful positions (e.g., grouped by category) rather than origin, so the settling is a gentle reorganization, not an explosion.

**Phase:** Phase 2 (polish/animation). Core layout works first, then refine the initial experience.

---

### Pitfall 6: The Hairball -- Unreadable Graph with Too Many Edges

**What goes wrong:** With 30-50 nodes and explicit relations (React<->TypeScript, Node<->Express, etc.), the graph quickly becomes a tangled mess of crossing lines. Users cannot trace individual connections.

**Why it happens:** Developers add every possible relationship between technologies. A fully-connected subgraph of 7 frontend technologies has 21 edges alone. Multiply by 6 categories and the graph is unreadable.

**Prevention:**

- **Curate relationships aggressively.** Only show the most meaningful connections (direct dependency, daily co-usage). Aim for 1-3 edges per node, not "everything connects to everything."
- Use edge opacity: full opacity only for edges connected to the hovered/focused node, dim all others to 10-20% opacity.
- Consider showing edges on-demand: no edges visible by default, edges appear only when a node is selected.
- Group nodes by category with visual clusters (background regions or convex hulls) -- proximity implies relationship without needing explicit edges.

**Phase:** Phase 1 (data modeling) for relationship curation, Phase 2 for interaction-based edge visibility.

---

### Pitfall 7: Tooltip/Popover Z-Index and Positioning Wars

**What goes wrong:** Tooltips on graph nodes clip at container boundaries, render behind other elements, or jump positions when the graph is panned/zoomed. On mobile, tooltips cover the node they describe.

**Why it happens:** Graph containers often have `overflow: hidden` for pan/zoom containment. Tooltips rendered inside the SVG/Canvas coordinate system move with pan/zoom. Absolute positioning relative to the viewport requires coordinate transformation math that developers underestimate.

**Prevention:**

- Render tooltips in a **portal** (outside the graph container DOM), positioned absolutely relative to the viewport.
- Use `getBoundingClientRect()` on the hovered node to compute tooltip position in screen coordinates, not graph coordinates.
- Apply boundary-aware positioning: flip tooltip above/below/left/right based on proximity to viewport edges.
- shadcn/ui's `Tooltip` or `Popover` components handle this correctly -- use them instead of a custom solution.

**Phase:** Phase 2 (interactivity layer). Build node rendering first, add tooltips as a second pass.

---

### Pitfall 8: Mobile Touch UX -- Hover States Do Not Exist

**What goes wrong:** Desktop interaction relies on hover for node highlighting and tooltips. On mobile, there is no hover. Tap targets are too small (nodes < 44px). Pinch-to-zoom conflicts with page scroll. Users cannot interact with the graph meaningfully on phones.

**Why it happens:** The project scopes mobile as "to decide after desktop" (per PROJECT.md). But if the desktop implementation bakes in hover-dependent interactions, retrofitting touch support requires rearchitecting the interaction model.

**Prevention:**

- Design the interaction model to be **click/tap-first, hover-enhanced.** A node click opens details; hover only adds a preview layer on top.
- Set minimum node tap targets to 44x44px (WCAG 2.5.8).
- For zoom/pan on mobile: use a dedicated gesture library or CSS `touch-action: none` on the graph container to prevent scroll conflicts. But also provide a "fit all" reset button so users can recover from accidental zoom.
- Consider a simplified mobile view: static category-grouped layout (no force physics) with tap-to-expand, rather than forcing the full interactive graph onto small screens.

**Phase:** Architecture decision in Phase 1 (click-first interaction model), mobile implementation in a later phase. But the Phase 1 decision prevents a rewrite.

---

## Minor Pitfalls

### Pitfall 9: Color-Only Category Encoding

**What goes wrong:** Categories are distinguished only by color. Colorblind users (8% of males) cannot tell Frontend from Backend nodes. The existing portfolio uses distinct colors per family (amber, sky, teal, etc.) which may not all be distinguishable in common colorblindness types.

**Prevention:**

- Add a secondary visual channel: distinct shapes per category (circle, hexagon, square, diamond), or icons, or border patterns.
- Test the palette with a colorblindness simulator (e.g., Sim Daltonism on macOS, or Chrome DevTools > Rendering > Emulate vision deficiencies).
- The existing `familyAccent` colors in `StackSection.tsx` should be verified for sufficient contrast between categories under deuteranopia and protanopia.

**Phase:** Phase 1 (visual design of nodes).

---

### Pitfall 10: Bundle Size Bloat from Full D3 Import

**What goes wrong:** Importing `import * as d3 from "d3"` pulls in the entire D3 library (~500KB minified). The graph only needs `d3-force`, `d3-selection`, and maybe `d3-zoom` (~30KB total). This bloats the client bundle unnecessarily on a portfolio site that should load fast.

**Prevention:**

- Import only the specific D3 modules needed: `import { forceSimulation, forceLink, forceManyBody, forceCenter } from "d3-force"`.
- Verify with `npm run build` and check the bundle analyzer output. The graph chunk (loaded on `/stack` only) should be < 50KB gzipped.
- Since the graph page is dynamically imported with `ssr: false`, it is already code-split. But the chunk itself should still be lean.

**Phase:** Phase 1 (initial setup and dependency installation).

---

### Pitfall 11: Filter State Desyncing Graph and UI

**What goes wrong:** Filter controls (e.g., "show only Frontend") update the button UI but the graph does not re-layout, or nodes disappear but edges to hidden nodes remain visible, or the graph force simulation does not rebalance after filtering.

**Prevention:**

- Filtering should remove nodes AND their edges from the simulation data, then restart the simulation with `simulation.alpha(0.3).restart()` to gently rebalance.
- Use a single source of truth for which nodes are visible (derived from filter state + full data). Never separately track "visible nodes" and "filter state."
- Animate the transition: fade out filtered nodes before removing them from the simulation, fade in returning nodes.

**Phase:** Phase 2 (filter implementation). Requires the simulation architecture from Phase 1 to support dynamic data changes.

---

### Pitfall 12: Overcomplicated Data Model for Relations

**What goes wrong:** The developer creates an elaborate graph database structure with typed edges, weights, directionality, and metadata for what is essentially a flat list of ~40 technologies with simple "related to" connections.

**Prevention:**

- Keep it simple. Extend `src/content/stack.ts` with a `relations` array of tuples: `["react", "typescript"]`, `["nextjs", "react"]`. No weights, no types, no directionality.
- The visual representation adds the richness (proximity, color, hover details) -- the data model should be minimal.
- Resist the urge to model "proficiency level affects edge thickness" in Phase 1. Add it later if needed.

**Phase:** Phase 1 (data modeling).

---

## Phase-Specific Warnings

| Phase Topic                           | Likely Pitfall                                                  | Mitigation                                           |
| ------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------- |
| Data modeling (relations in stack.ts) | Over-engineering the relation model (Pitfall 12)                | Simple tuple pairs, no typed edges                   |
| Rendering architecture                | D3/React paradigm clash (Pitfall 1), SVG vs Canvas (Pitfall 2)  | useRef for simulation, SVG for this scale            |
| Next.js integration                   | SSR crash on build (Pitfall 3)                                  | `next/dynamic` with `ssr: false` from day one        |
| Node component design                 | Inaccessible nodes (Pitfall 4), color-only encoding (Pitfall 9) | ARIA + tabindex + shape/icon secondary channel       |
| Initial load experience               | Jarring force settling (Pitfall 5)                              | Pre-compute layout before first render               |
| Edge rendering                        | Hairball graph (Pitfall 6)                                      | Curate relations, dim non-focused edges              |
| Tooltip implementation                | Z-index/positioning issues (Pitfall 7)                          | Portal-based tooltips, use shadcn Popover            |
| Filter controls                       | State desync (Pitfall 11)                                       | Single source of truth, restart simulation on filter |
| Mobile adaptation                     | No hover on touch (Pitfall 8)                                   | Click-first interaction model from Phase 1           |
| Dependencies                          | Bundle bloat (Pitfall 10)                                       | Import only needed d3 sub-modules                    |

## Sources

- [Cambridge Intelligence -- Graph Visualization UX](https://cambridge-intelligence.com/graph-visualization-ux-how-to-avoid-wrecking-your-graph-visualization/) -- Hairball/starburst/overcrowding patterns
- [Cambridge Intelligence -- Force-Directed Layouts](https://cambridge-intelligence.com/automatic-graph-layouts/) -- Layout settling behavior
- [DEV -- Creating a Force Graph using React and D3](https://dev.to/gilfink/creating-a-force-graph-using-react-and-d3-76c) -- React/D3 integration patterns
- [DEV -- SVG vs Canvas vs WebGL for Diagram Viewers](https://dev.to/vitalf/svg-vs-canvas-vs-webgl-for-diagram-viewers-tradeoffs-bottlenecks-and-how-to-measure-34n7) -- Rendering technology tradeoffs
- [JointJS -- SVG versus Canvas](https://www.jointjs.com/blog/svg-versus-canvas) -- Performance characteristics at scale
- [Fossheim -- Accessible D3 Visualizations](https://fossheim.io/writing/posts/accessible-dataviz-d3-intro/) -- D3 accessibility patterns
- [a11y with Lindsey -- Accessibility in D3 Charts](https://www.a11ywithlindsey.com/blog/accessibility-d3-bar-charts/) -- ARIA patterns for data visualization
- [DEV -- Stop "Window Is Not Defined" in Next.js](https://dev.to/devin-rosario/stop-window-is-not-defined-in-nextjs-2025-394j) -- SSR/hydration patterns
- [Towards Data Science -- Minimizing Overlapping Labels](https://towardsdatascience.com/minimizing-overlapping-labels-in-interactive-visualizations-b0eabd62ef0/) -- Label collision strategies
- [Visual Cinnamon -- Mobile vs Desktop Data Viz](https://www.visualcinnamon.com/2019/04/mobile-vs-desktop-dataviz/) -- Mobile adaptation strategies
- [GitHub -- vasturiano/react-force-graph Issues](https://github.com/vasturiano/react-force-graph/issues/202) -- Performance at scale
