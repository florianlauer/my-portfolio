# Architecture Patterns

**Domain:** Interactive graph visualization page for a Next.js portfolio
**Researched:** 2026-03-07

## Recommended Architecture

**Approach:** Custom SVG force-directed graph using `d3-force` for layout computation + React 19 for rendering, wrapped in a Client Component dynamically imported from a Server Component page.

This mirrors the existing gallery page pattern: Server Component page imports typed content, passes it as props to a dynamically loaded Client Component that handles all interactivity.

### Why d3-force + Custom SVG (Not React Flow, Not Sigma.js)

| Option                     | Bundle Size    | Rendering              | Verdict                                                                                                                                                                                            |
| -------------------------- | -------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **d3-force (standalone)**  | ~15 KB min+gz  | SVG (React-controlled) | **Recommended** -- lightweight, full control over styling, SVG is accessible and styleable with Tailwind/CSS, perfect for 30-50 nodes                                                              |
| @xyflow/react (React Flow) | ~150 KB min+gz | SVG + HTML overlays    | Overkill -- designed for workflow editors with drag-to-connect, node resizing, complex edge routing. Brings zustand dependency. Too heavy for a read-only portfolio graph                          |
| Sigma.js + Graphology      | ~100 KB min+gz | WebGL (Canvas)         | Wrong tool -- WebGL shines at 1000+ nodes, but kills CSS styling and accessibility for 30-50 nodes. Cannot style nodes with Tailwind. Keyboard nav requires manual implementation on top of Canvas |
| Full d3                    | ~250 KB        | SVG/Canvas             | Never import full d3. Only import `d3-force` submodule                                                                                                                                             |

**Key insight:** At 30-50 nodes, SVG is the right rendering target. Each node is a DOM element, which means:

- Native CSS transitions and hover states (works with Tailwind)
- Native keyboard focus (`tabIndex`, `aria-label`)
- Native event handlers (React `onClick`, `onMouseEnter`)
- Screen reader accessibility via `<title>` and `<desc>` elements in SVG
- No Canvas/WebGL abstraction layer needed

### Component Boundaries

```
src/app/stack/page.tsx              (Server Component -- page entry)
  |
  |-- imports content from src/content/stack-graph.ts
  |-- imports PageShell
  |-- dynamic imports StackGraphClient
  |
  v
src/components/stack-graph/
  |
  |-- StackGraphClient.tsx          (Client Component -- orchestrator)
  |     |-- manages simulation state, zoom/pan, active filters
  |     |-- renders <svg> with React
  |     |
  |     |-- GraphCanvas.tsx         (Client Component -- SVG renderer)
  |     |     |-- renders edges as <line> or <path>
  |     |     |-- renders nodes as <g> groups (circle + text + icon)
  |     |     |-- handles zoom/pan via SVG viewBox or transform
  |     |
  |     |-- GraphFilters.tsx        (Client Component -- filter controls)
  |     |     |-- buttons per category (Frontend, Backend, etc.)
  |     |     |-- toggles active filter state up to parent
  |     |
  |     |-- NodeTooltip.tsx         (Client Component -- hover detail)
  |           |-- positioned absolutely near hovered node
  |           |-- shows name, category, experience level, description
  |
src/content/stack-graph.ts          (Data -- nodes + edges)
src/types/stack-graph.ts            (Types -- node/edge/category shapes)
src/hooks/useForceSimulation.ts     (Hook -- d3-force simulation logic)
src/hooks/useGraphZoom.ts           (Hook -- zoom/pan state)
```

### Component Details

| Component            | Responsibility                                         | Communicates With                                   | State Owned                                                          |
| -------------------- | ------------------------------------------------------ | --------------------------------------------------- | -------------------------------------------------------------------- |
| `page.tsx`           | SEO metadata, content import, layout shell             | PageShell, StackGraphClient (via dynamic import)    | None                                                                 |
| `StackGraphClient`   | Top-level orchestrator for the graph feature           | GraphCanvas, GraphFilters, NodeTooltip              | `activeFilters`, `hoveredNode`, `simulation`                         |
| `GraphCanvas`        | SVG rendering of nodes and edges, zoom/pan gestures    | Parent via callbacks (`onNodeHover`, `onNodeClick`) | `viewBox` / `transform` for zoom                                     |
| `GraphFilters`       | Category filter toggles                                | Parent via `onFilterChange` callback                | None (controlled)                                                    |
| `NodeTooltip`        | Tooltip card near hovered node                         | Reads `hoveredNode` from parent props               | None (controlled)                                                    |
| `useForceSimulation` | Runs d3-force simulation, returns stabilized positions | Called by StackGraphClient                          | Simulation positions (via `useRef` + `useState` for final positions) |
| `useGraphZoom`       | Zoom/pan state via wheel events + pointer drag         | Called by GraphCanvas                               | `scale`, `translateX`, `translateY`                                  |

### Data Flow

```
[Build time]
  src/content/stack-graph.ts  -- typed TS constants (nodes[], edges[])
        |
[Server render]
  page.tsx imports content, passes as props to StackGraphClient
        |
[Client hydration]
  StackGraphClient receives { nodes, edges } as props
        |
        +--> useForceSimulation(nodes, edges)
        |       |-- creates d3.forceSimulation()
        |       |-- runs simulation ticks (async, off-render)
        |       |-- returns stabilized { x, y } per node
        |
        +--> filters applied: visible nodes/edges computed
        |
        +--> GraphCanvas renders SVG
        |       |-- <line> for each visible edge
        |       |-- <g> for each visible node (circle + label)
        |       |-- zoom/pan via transform on root <g>
        |
        +--> user hovers node --> NodeTooltip appears
        +--> user clicks filter --> nodes fade in/out
```

**Data direction:** Always top-down (props). No global state. No context providers needed for this feature size.

## Data Model

### Node Type

```typescript
export type StackFamily = "frontend" | "mobile" | "backend" | "data" | "infra" | "integrations";

export type StackNode = {
  id: string; // unique key, e.g. "react", "nodejs"
  label: string; // display name, e.g. "React", "Node.js"
  family: StackFamily; // category for coloring + filtering
  level?: 1 | 2 | 3; // 1=familiar, 2=proficient, 3=expert (affects node size)
  description?: string; // short tooltip text
};
```

### Edge Type

```typescript
export type StackEdge = {
  source: string; // node id
  target: string; // node id
  strength?: number; // 0-1, affects d3-force link distance (optional, default 0.5)
};
```

### Content File Structure

```typescript
// src/content/stack-graph.ts
import type { StackNode, StackEdge } from "@/types/stack-graph";

export const stackNodes: StackNode[] = [
  { id: "react", label: "React", family: "frontend", level: 3, description: "..." },
  { id: "nextjs", label: "Next.js", family: "frontend", level: 3, description: "..." },
  { id: "typescript", label: "TypeScript", family: "frontend", level: 3, description: "..." },
  // ...30-50 nodes total
];

export const stackEdges: StackEdge[] = [
  { source: "react", target: "nextjs" },
  { source: "react", target: "typescript" },
  { source: "nextjs", target: "typescript" },
  { source: "nextjs", target: "nodejs" },
  // ...
];
```

**Backward compatibility:** The existing `src/content/stack.ts` and `src/types/stack.ts` remain untouched. The new `stack-graph.ts` is a separate content file that can import and extend from the existing data if desired, but does not modify it. The Arsenal section on the home page continues to use `stackGroups` unchanged.

## Patterns to Follow

### Pattern 1: Dynamic Import for Client-Heavy Component

**What:** Server Component page dynamically imports the graph Client Component
**When:** Always for this page -- the graph is 100% client-side
**Why:** Matches the gallery page pattern; avoids SSR issues with d3-force; keeps the page shell (nav, background, metadata) server-rendered
**Example:**

```typescript
// src/app/stack/page.tsx
import dynamic from "next/dynamic";
import { PageShell } from "@/components/page-shell/PageShell";
import { stackNodes, stackEdges } from "@/content/stack-graph";

const StackGraphClient = dynamic(
  () => import("@/components/stack-graph/StackGraphClient").then((m) => m.StackGraphClient),
);

export const metadata = { title: "Stack", description: "..." };

export default function StackPage() {
  return (
    <PageShell>
      <StackGraphClient nodes={stackNodes} edges={stackEdges} />
    </PageShell>
  );
}
```

### Pattern 2: d3-force as Computation-Only (Not Rendering)

**What:** Use d3-force exclusively for position calculation; React owns all DOM rendering
**When:** Always -- never let d3 touch the DOM
**Why:** Avoids the classic d3-vs-React DOM ownership conflict. d3-force modifies `node.x` and `node.y` in-place, which we read after simulation stabilizes, then pass to React as state.
**Example:**

```typescript
// src/hooks/useForceSimulation.ts
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } from "d3-force";

export function useForceSimulation(nodes, edges, width, height) {
  const [positions, setPositions] = useState<Map<string, { x: number; y: number }>>(new Map());

  useEffect(() => {
    const sim = forceSimulation(nodesCopy)
      .force(
        "link",
        forceLink(edgesCopy)
          .id((d) => d.id)
          .distance(80),
      )
      .force("charge", forceManyBody().strength(-200))
      .force("center", forceCenter(width / 2, height / 2))
      .force("collide", forceCollide(30));

    sim.on("end", () => {
      // Read final positions, set React state once
      const map = new Map();
      nodesCopy.forEach((n) => map.set(n.id, { x: n.x, y: n.y }));
      setPositions(map);
    });

    // Run simulation synchronously for ~30 nodes (fast enough)
    sim.tick(300);
    sim.stop();
    // ... set positions immediately

    return () => sim.stop();
  }, [nodes, edges, width, height]);

  return positions;
}
```

### Pattern 3: SVG Zoom/Pan via Transform

**What:** Zoom and pan by applying `transform` on a root `<g>` inside the `<svg>`, not by changing the `viewBox`
**When:** For the graph container
**Why:** Transform-based zoom is simpler to implement, works with pointer events, and avoids viewBox recalculation. Use `wheel` for zoom, pointer drag for pan.
**Example:**

```typescript
// Inside GraphCanvas
<svg width="100%" height={600} onWheel={handleZoom} onPointerDown={handlePanStart}>
  <g transform={`translate(${tx}, ${ty}) scale(${scale})`}>
    {edges.map(e => <line key={...} ... />)}
    {nodes.map(n => <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>...</g>)}
  </g>
</svg>
```

### Pattern 4: Accessible SVG Graph

**What:** Make each node focusable and labeled for screen readers
**When:** Always
**Why:** Requirement from PROJECT.md; SVG makes this straightforward
**Example:**

```typescript
<g
  role="img"
  aria-label={`${node.label} - ${node.family}`}
  tabIndex={0}
  onFocus={() => setHoveredNode(node)}
  onBlur={() => setHoveredNode(null)}
  onKeyDown={(e) => e.key === "Enter" && handleNodeSelect(node)}
>
  <title>{node.label}</title>
  <circle r={radius} fill={categoryColor} />
  <text>{node.label}</text>
</g>
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Letting d3 Manage the DOM

**What:** Using `d3.select().append()` to create/update SVG elements
**Why bad:** Conflicts with React's virtual DOM; causes stale renders, memory leaks, hydration mismatches
**Instead:** Use d3-force only for math (`forceSimulation`, `forceLink`, etc.). React renders all SVG elements.

### Anti-Pattern 2: Re-running Simulation on Every Render

**What:** Creating a new `forceSimulation` on each render or state change
**Why bad:** Simulation is expensive and causes layout jumping; nodes bounce around on filter changes
**Instead:** Run simulation once on mount. On filter changes, hide/show nodes with CSS opacity/display rather than re-simulating. If positions must change, animate from current positions to new ones.

### Anti-Pattern 3: Canvas for 30 Nodes

**What:** Using `<canvas>` or WebGL (Sigma.js, PixiJS) for a small graph
**Why bad:** Loses all CSS styling (no Tailwind on canvas), loses native accessibility (no focusable elements), loses native hover states. Requires reimplementing everything that SVG gives for free.
**Instead:** SVG. Canvas/WebGL only makes sense above ~500 nodes.

### Anti-Pattern 4: Full d3 Import

**What:** `import * as d3 from "d3"` or `import d3 from "d3"`
**Why bad:** Pulls ~250 KB of unused modules (scales, geo, time, etc.)
**Instead:** Import only the force submodule: `import { forceSimulation, forceLink, ... } from "d3-force"`

### Anti-Pattern 5: Global State for Graph

**What:** Using React Context, Zustand, or Redux for graph state
**Why bad:** The graph is a single-page feature with ~5 pieces of state. Context adds indirection and re-render overhead for no benefit.
**Instead:** Local `useState` in `StackGraphClient`, passed down as props. The component tree is only 3 levels deep.

## Scalability Considerations

| Concern           | At 30 nodes (current)                  | At 100 nodes (unlikely)           | At 500+ nodes (not a goal)         |
| ----------------- | -------------------------------------- | --------------------------------- | ---------------------------------- |
| **Rendering**     | SVG, no optimization needed            | SVG still fine, add `will-change` | Switch to Canvas/WebGL             |
| **Simulation**    | Synchronous `sim.tick(300)` -- instant | Still fast (<100ms)               | Async with `requestAnimationFrame` |
| **Interactions**  | Individual node event handlers         | Individual handlers still fine    | Event delegation on parent `<g>`   |
| **Filtering**     | CSS opacity transitions                | CSS still fine                    | Virtualize / cull off-screen nodes |
| **Accessibility** | Each node focusable                    | Still manageable                  | Need summary/overview mode         |

For this portfolio with ~30-50 technologies, performance is a non-issue with SVG. The primary concern is visual clarity (avoiding overlapping labels) and animation polish.

## Suggested Build Order

The components have clear dependencies that dictate build order:

```
Phase 1: Data Foundation
  1. src/types/stack-graph.ts         -- types first (no dependencies)
  2. src/content/stack-graph.ts       -- content data (depends on types)

Phase 2: Core Engine
  3. src/hooks/useForceSimulation.ts  -- layout engine (depends on types, d3-force)
  4. GraphCanvas.tsx                  -- SVG renderer (depends on simulation output)

Phase 3: Page Integration
  5. StackGraphClient.tsx             -- orchestrator (depends on GraphCanvas, hook)
  6. src/app/stack/page.tsx           -- page entry (depends on StackGraphClient, content)

Phase 4: Interactivity
  7. GraphFilters.tsx                 -- filter controls (depends on StackGraphClient state)
  8. NodeTooltip.tsx                  -- hover tooltip (depends on StackGraphClient state)
  9. useGraphZoom.ts                  -- zoom/pan (depends on GraphCanvas)

Phase 5: Polish
  10. Animations (motion for enter/exit transitions)
  11. Category colors aligned with existing familyAccent palette
  12. Navigation link in HomeNav
  13. SEO (metadata, sitemap update)
  14. Accessibility audit (keyboard nav, screen reader testing)
```

**Dependency chain:** Types -> Content -> Simulation Hook -> Canvas -> Client -> Page. Each phase produces a working (if incomplete) artifact.

## Sources

- [d3-force documentation](https://d3js.org/d3-force) -- HIGH confidence, official docs
- [React Graph Gallery: Network Diagram with React and D3](https://www.react-graph-gallery.com/network-chart) -- MEDIUM confidence, practical patterns
- [React Flow / xyflow](https://reactflow.dev/) -- HIGH confidence, evaluated and rejected for this use case
- [React Flow React 19 + Tailwind 4 update (Oct 2025)](https://reactflow.dev/whats-new/2025-10-28) -- HIGH confidence
- [Sigma.js](https://www.sigmajs.org/) -- HIGH confidence, evaluated and rejected for this use case
- [Bundlephobia: d3-force](https://bundlephobia.com/package/d3-force) -- HIGH confidence for size reference
- Existing codebase patterns: `src/app/galerie/page.tsx` (dynamic import), `src/components/home-sections/StackSection.tsx` (category colors)

---

_Architecture analysis: 2026-03-07_
