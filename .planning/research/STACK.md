# Technology Stack

**Project:** Stack Graph (interactive tech skills visualization)
**Researched:** 2026-03-07

## Recommended Stack

### Graph Layout Engine

| Technology     | Version | Purpose                              | Why                                                                                                                                                                          | Confidence |
| -------------- | ------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `d3-force`     | ^3.0    | Force-directed layout computation    | Industry standard physics simulation. Lightweight (~15KB min+gz). Only computes positions -- does not touch the DOM. Perfect separation: d3 does math, React does rendering. | HIGH       |
| `d3-selection` | ^3.0    | Zoom/pan gesture handling (optional) | Only if `useGraphZoom` needs d3-zoom's gesture math. Can also implement zoom/pan with vanilla pointer events + wheel handler. Evaluate during implementation.                | MEDIUM     |

### Rendering: SVG via React (NOT Canvas, NOT WebGL)

**Decision:** Render graph nodes and edges as React-managed SVG elements (`<g>`, `<circle>`, `<line>`, `<text>`).

**Why SVG over Canvas for 30-50 nodes:**

| Factor                     | SVG                                                               | Canvas (react-force-graph-2d)                         | Winner |
| -------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------- | ------ |
| Accessibility              | Native: `tabindex`, `aria-label`, `role`, `<title>`, focus events | Opaque pixel buffer -- must build parallel hidden DOM | SVG    |
| CSS/Tailwind styling       | Works directly on SVG elements, transitions, hover states         | Cannot use CSS on canvas pixels                       | SVG    |
| Keyboard navigation        | Native focus management with `tabindex={0}` on each `<g>`         | Must map keyboard to virtual focus system             | SVG    |
| React integration          | JSX maps directly to SVG elements, standard event handlers        | Library manages its own render loop outside React     | SVG    |
| Performance at 30-50 nodes | Trivial -- ~100-200 DOM elements                                  | Also trivial, but overkill optimization               | Tie    |
| Bundle size                | d3-force only: ~15KB gzip                                         | react-force-graph-2d: ~30KB + d3-force-3d + kapsule   | SVG    |
| Tooltip positioning        | `getBoundingClientRect()` on any node element                     | Must call `graph2ScreenCoords()` API                  | SVG    |

**Canvas/WebGL only makes sense at 500+ nodes.** This project has 30-50. SVG wins on every axis that matters.

### Supporting Libraries (already in project)

| Library                        | Version  | Purpose                                            | When to Use                                                      |
| ------------------------------ | -------- | -------------------------------------------------- | ---------------------------------------------------------------- |
| `motion`                       | ^12.34   | Animate tooltip/panel transitions, node enter/exit | Filter transitions, initial fade-in after layout computes        |
| `lucide-react`                 | ^0.564   | Icons for graph UI controls                        | Zoom buttons, filter toggles, fullscreen                         |
| `radix-ui`                     | ^1.4     | Accessible tooltips, filter dropdowns              | Node tooltip via shadcn Tooltip/Popover, category filter toggles |
| `cn()` (clsx + tailwind-merge) | existing | Conditional Tailwind classes                       | Graph control styling, active filter states                      |
| `shadcn/ui`                    | existing | Pre-built accessible components                    | Tooltip, Toggle, Button for graph controls                       |

### New Dependencies to Add

| Library    | Version | Purpose                             | Why                                                                    |
| ---------- | ------- | ----------------------------------- | ---------------------------------------------------------------------- |
| `d3-force` | ^3.0    | Force simulation layout computation | Only dependency needed. ~15KB gzip. Compute-only, no DOM manipulation. |

**Total new dependencies: 1 package.** No transitive bloat. d3-force is a self-contained module.

## Alternatives Considered

| Category      | Recommended             | Alternative                        | Why Not                                                                                                                                                                                                 |
| ------------- | ----------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Layout engine | `d3-force` (standalone) | **react-force-graph-2d** (v1.48)   | Renders to Canvas, losing native accessibility, CSS styling, and Tailwind integration. At 30-50 nodes, Canvas is overkill optimization. Adds ~30KB + transitive deps for features we get free with SVG. |
| Layout engine | `d3-force` (standalone) | **Reagraph** (v4.30)               | Pulls in `three.js` (~155KB gzip), `@react-three/fiber`, `@react-three/drei`. WebGL/3D for a 2D graph of 30 nodes is absurd. Massive bundle for zero benefit.                                           |
| Layout engine | `d3-force` (standalone) | **React Flow** (@xyflow/react v12) | Designed for workflow editors with drag-to-connect, node resizing, complex edge routing. Brings zustand. Too heavy for a read-only portfolio graph. Force layout is a plugin, not native.               |
| Layout engine | `d3-force` (standalone) | **@react-sigma/core** (v4)         | Requires graphology as graph data structure. WebGL rendering (Canvas). Optimized for thousands of nodes. At 30-50 nodes, the abstraction layers add complexity with no performance payoff.              |
| Layout engine | `d3-force` (standalone) | **vis-network / vis.js**           | Legacy, not React-native, requires wrapper. Large bundle. Unmaintained.                                                                                                                                 |
| Rendering     | SVG (React)             | **Canvas** (HTML5)                 | Loses DOM accessibility, CSS styling, native events. Requires building parallel accessible DOM layer. Only justified at 500+ nodes.                                                                     |
| Full D3       | `d3-force` only         | **Full d3 package**                | ~250KB min+gz. We only need the force module (~15KB). Never import `d3` -- import `d3-force`.                                                                                                           |

## Why d3-force + SVG

1. **Minimal dependency footprint**: One new package (~15KB gzip). Everything else reuses the existing stack (React, Tailwind, shadcn/ui, motion).
2. **Native accessibility**: SVG elements are DOM nodes. Each `<g>` node gets `tabindex`, `aria-label`, `role="img"`, focus/blur events. No accessibility retrofit needed.
3. **Tailwind CSS integration**: SVG elements accept class names. Hover states, transitions, focus-visible rings -- all work with existing Tailwind setup.
4. **React-idiomatic**: d3-force computes `{ x, y }` positions. React renders SVG from those positions. Clean separation: no DOM ownership conflicts.
5. **Testable**: SVG nodes are queryable DOM elements. Can test with React Testing Library if needed.
6. **Matches existing patterns**: The project already uses React for DOM rendering with motion for animations. This approach extends those patterns naturally.

## Architecture Alignment

The d3-force + SVG approach means:

```
d3-force (computation)  →  useForceSimulation hook  →  React state (positions)  →  SVG JSX
```

- d3-force runs simulation synchronously (`sim.tick(300)`) for 30 nodes: < 50ms.
- Positions stored via `useRef` during simulation, final result set to `useState` once.
- React renders SVG elements at computed positions.
- No d3 DOM manipulation. No React/d3 DOM conflict.

## Data Model Extension

Extend `src/content/stack.ts` with new exports (keep existing exports intact):

```typescript
// Types in src/types/stack-graph.ts
export type StackFamily = "frontend" | "mobile" | "backend" | "data" | "infra" | "integrations";

export type StackGraphNode = {
  id: string; // unique key: "react", "nodejs"
  label: string; // display name: "React", "Node.js"
  family: StackFamily; // category for color + filter
  level?: 1 | 2 | 3; // 1=familiar, 2=proficient, 3=expert (node size)
  description?: string; // tooltip text
};

export type StackGraphEdge = {
  source: string; // node id
  target: string; // node id
  strength?: number; // 0-1, optional d3-force link distance weight
};
```

```typescript
// Content in src/content/stack-graph.ts (NEW FILE -- does not modify stack.ts)
import type { StackGraphNode, StackGraphEdge } from "@/types/stack-graph";

export const stackNodes: StackGraphNode[] = [
  { id: "react", label: "React", family: "frontend", level: 3 },
  { id: "nextjs", label: "Next.js", family: "frontend", level: 3 },
  // ...
];

export const stackEdges: StackGraphEdge[] = [
  { source: "react", target: "nextjs" },
  { source: "react", target: "typescript" },
  // ...
];
```

**Backward compatibility:** Existing `src/content/stack.ts` remains untouched. Arsenal section on home page continues to work.

## Installation

```bash
# Single new dependency
npm install d3-force

# Types (if not included)
npm install -D @types/d3-force
```

## Performance Budget

| Metric                 | Target      | Rationale                                                         |
| ---------------------- | ----------- | ----------------------------------------------------------------- |
| d3-force bundle (gzip) | ~15KB       | Only force module, no full d3                                     |
| Graph page JS chunk    | < 50KB gzip | Code-split via next/dynamic, includes d3-force + graph components |
| Layout computation     | < 50ms      | `sim.tick(300)` synchronous for 30-50 nodes                       |
| Initial render         | < 100ms     | SVG elements render after layout completes                        |
| Interaction latency    | < 16ms      | Native DOM events on SVG, no virtualization layer                 |

## Sources

- [d3-force official documentation](https://d3js.org/d3-force) -- HIGH confidence, authoritative
- [react-force-graph GitHub](https://github.com/vasturiano/react-force-graph) -- HIGH confidence, evaluated and rejected
- [Reagraph](https://reagraph.dev/) -- HIGH confidence, evaluated and rejected
- [React Flow updated for React 19 + Tailwind v4](https://reactflow.dev/whats-new/2025-10-28) -- HIGH confidence, evaluated and rejected
- [React Flow accessibility docs](https://reactflow.dev/learn/advanced-use/accessibility) -- reference for a11y patterns
- [npm trends: graph visualization libraries](https://npmtrends.com/dagre-d3-react-vs-react-flow-vs-react-force-graph-vs-react-graph-vis-vs-react-node-graph-vs-react-vis-force) -- MEDIUM confidence
- [Cambridge Intelligence: React Graph Visualization](https://cambridge-intelligence.com/react-graph-visualization-library/) -- MEDIUM confidence, ecosystem overview
- [Building Network Graph with React and D3](https://www.antstack.com/blog/building-a-simple-network-graph-with-react-and-d3-2/) -- MEDIUM confidence, implementation patterns
- [DEV: Implementing D3 Force Graph in 2025](https://dev.to/nigelsilonero/how-to-implement-a-d3js-force-directed-graph-in-2025-5cl1) -- MEDIUM confidence

---

_Stack analysis: 2026-03-07_
