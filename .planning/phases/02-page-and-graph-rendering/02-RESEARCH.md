# Phase 2: Page and Graph Rendering - Research

**Researched:** 2026-03-08
**Domain:** SVG force-directed graph rendering with d3-force + React + Framer Motion
**Confidence:** HIGH

## Summary

Phase 2 renders the `/stack` route with a full-screen force-directed graph. The architecture splits cleanly: d3-force computes node positions (x, y coordinates), React owns the SVG DOM, and Framer Motion handles the micro-movement animation + drag-and-release spring physics. Icons come from the `simple-icons` npm package (raw SVG path data, not the React wrapper) because nodes live inside a single `<svg>` element where React components rendering their own `<svg>` would break.

The data layer (36 nodes, ~50 edges, 7 families) is already complete from Phase 1. The rendering layer is a Client Component (`"use client"`) that runs d3-force in a `useEffect`, updates React state on each tick during the initial layout animation, then hands off to Framer Motion for continuous micro-movement and drag interactions.

**Primary recommendation:** Use d3-force strictly for layout computation, React for SVG rendering, and Framer Motion (already installed as `motion`) for drag + micro-movement. Do NOT let d3 touch the DOM.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

- Pastilles horizontales (pill/capsule) avec icone a gauche et nom a droite
- Fond plein couleur oklch de la famille, texte clair (blanc ou tres clair)
- Taille variable selon le niveau d'experience : Expert = plus grand, Notions = plus petit (4 paliers)
- Icones via Simple Icons (package npm `simple-icons`) -- SVG monochromes teintes en blanc pour le contraste
- Glow doux autour de chaque pastille (box-shadow/filter SVG) dans la couleur famille, ~20% opacite
- Courbes Bezier douces entre les noeuds (pas de lignes droites)
- Couleur gris neutre, opacite reduite (~30-40%) -- les noeuds restent la star
- Statiques au repos (pas d'animation sur les edges en Phase 2)
- Animation visible du layout d3-force au chargement (~1-2s pour que les noeuds se positionnent)
- Micro-mouvement perpetuel apres stabilisation (noeuds flottent legerement, comme en apesanteur)
- Noeuds draggables : l'utilisateur peut deplacer un noeud, et au relachement il revient en place avec un effet de bounce/spring, puis reprend le micro-mouvement
- Respect de `prefers-reduced-motion` des Phase 2 : si active, layout statique sans flottement ni animation
- Graph plein ecran (100% viewport moins le nav) -- pas contraint dans max-w-5xl
- PageShell utilise mais avec containerClassName elargi pour le graph
- Titre discret "Ma Stack" au-dessus du graph
- Legende des 7 familles en overlay, positionnee en bas a gauche du graph (style carte)
- Lien "Ma Stack" dans le HomeNav vers /stack
- Metadata SEO (title, description, Open Graph) pour /stack

### Claude's Discretion

- Rayon exact du glow et intensite
- Parametres d3-force (charge, distance, strength) pour l'espacement optimal
- Amplitude et frequence du micro-mouvement
- Parametres du spring/bounce au relachement du drag
- Tailles exactes des 4 paliers de pastilles (Expert/Avance/Intermediaire/Notions)
- Gestion des noeuds sans icone Simple Icons disponible (fallback)
- Adaptation du PageShell pour le mode plein ecran

### Deferred Ideas (OUT OF SCOPE)

None -- discussion stayed within phase scope

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID        | Description                                                                | Research Support                                                                                                        |
| --------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| PAGE-01   | Route `/stack` utilisant PageShell (nav, background, skip-to-content)      | PageShell accepts `containerClassName` to override max-w-5xl; new route at `src/app/stack/page.tsx` as Server Component |
| PAGE-02   | Lien vers /stack dans la navigation principale (HomeNav)                   | HomeNav has hardcoded links; add a `<Link>` to `/stack` with "Ma Stack" label, use `isActive` pattern for `/stack` path |
| PAGE-03   | Metadata SEO (title, description, Open Graph) pour /stack                  | Follow existing pattern: export `metadata` object from page.tsx (see a-propos/page.tsx)                                 |
| RENDER-01 | Noeuds SVG affichant nom, icone et couleur de categorie                    | SVG `<g>` with `<rect>` (rounded pill), `<path>` (simple-icons SVG path), `<text>` (label); colored by family oklch     |
| RENDER-02 | Edges SVG entre technos liees (lignes/courbes reliant les noeuds)          | SVG `<path>` with cubic Bezier curves (`C` command), gray color, low opacity                                            |
| RENDER-03 | Layout force-directed via d3-force (positionnement automatique des noeuds) | d3-force v3.0.0 simulation with forceCenter, forceManyBody, forceLink, forceCollide; tick updates React state           |
| RENDER-04 | Legende des categories avec code couleur                                   | HTML overlay (not SVG) positioned absolute bottom-left; maps familyColors array to colored dots + labels                |

</phase_requirements>

## Standard Stack

### Core

| Library                | Version | Purpose                              | Why Standard                                                                               |
| ---------------------- | ------- | ------------------------------------ | ------------------------------------------------------------------------------------------ |
| d3-force               | 3.0.0   | Force-directed layout computation    | Industry standard for force layouts; standalone module (~15KB), no DOM manipulation needed |
| simple-icons           | 16.11.0 | Brand/tech SVG icon path data        | 3400+ tech brand icons; provides raw `path` strings for embedding in SVG; tree-shakeable   |
| motion (Framer Motion) | 12.34.0 | Drag, spring physics, micro-movement | Already installed; `motion.g` for SVG groups; native drag + spring transitions             |

### Supporting

| Library         | Version | Purpose                       | When to Use                                                      |
| --------------- | ------- | ----------------------------- | ---------------------------------------------------------------- |
| @types/d3-force | 3.0.10  | TypeScript types for d3-force | Always -- provides `Simulation`, `ForceLink`, node type generics |

### Alternatives Considered

| Instead of                | Could Use                      | Tradeoff                                                                              |
| ------------------------- | ------------------------------ | ------------------------------------------------------------------------------------- |
| simple-icons (raw)        | @icons-pack/react-simple-icons | React wrapper renders its own `<svg>` -- cannot nest inside our graph `<svg>` element |
| motion for drag           | d3-drag                        | d3-drag manipulates DOM directly, conflicts with React; motion already installed      |
| motion for micro-movement | CSS keyframes                  | Less control over spring physics and coordination with drag state                     |

**Installation:**

```bash
npm install d3-force simple-icons
npm install -D @types/d3-force
```

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/stack/
│   └── page.tsx                    # Server Component: metadata + imports StackGraph
├── components/stack-graph/
│   ├── StackGraph.tsx              # "use client" — main orchestrator (simulation + SVG)
│   ├── GraphNode.tsx               # Single node pill (motion.g for drag)
│   ├── GraphEdge.tsx               # Single Bezier edge
│   ├── GraphLegend.tsx             # Category legend overlay (HTML, not SVG)
│   ├── use-force-layout.ts         # Custom hook: d3-force simulation
│   ├── use-micro-movement.ts       # Custom hook: perpetual float animation
│   └── icon-map.ts                 # Node ID -> simple-icons slug mapping
├── content/stack-graph.ts          # (exists) Graph data
└── types/stack-graph.ts            # (exists) Graph types
```

### Pattern 1: D3 computes, React renders

**What:** Run d3-force simulation in a custom hook. On each tick, copy node positions into React state. React renders SVG elements at those positions. D3 never touches the DOM.
**When to use:** Always when combining d3-force with React.
**Example:**

```typescript
// Source: d3js.org/d3-force + community best practice
import { forceSimulation, forceCenter, forceManyBody, forceLink, forceCollide } from "d3-force";

type SimNode = GraphNode & { x: number; y: number; vx: number; vy: number };

function useForceLayout(nodes: GraphNode[], edges: GraphEdge[], width: number, height: number) {
  const [positions, setPositions] = useState<SimNode[]>([]);
  const simRef = useRef<d3.Simulation<SimNode, GraphEdge>>();

  useEffect(() => {
    const simNodes: SimNode[] = nodes.map((n) => ({ ...n, x: 0, y: 0, vx: 0, vy: 0 }));
    const sim = forceSimulation(simNodes)
      .force("center", forceCenter(width / 2, height / 2))
      .force("charge", forceManyBody().strength(-300))
      .force(
        "link",
        forceLink(edges)
          .id((d: SimNode) => d.id)
          .distance(100),
      )
      .force("collide", forceCollide().radius(40))
      .on("tick", () => {
        setPositions([...simNodes]); // spread to trigger React re-render
      });

    simRef.current = sim;
    return () => {
      sim.stop();
    };
  }, [nodes, edges, width, height]);

  return { positions, simulation: simRef };
}
```

### Pattern 2: Framer Motion for drag with spring return

**What:** Wrap each node `<g>` in `motion.g` with `drag` enabled. On drag end, animate back to the d3-computed position using spring physics.
**When to use:** For the bouncy drag-and-release behavior.
**Example:**

```typescript
// Source: motion.dev/docs/react-motion-component
<motion.g
  drag
  dragMomentum={false}
  dragElastic={0}
  style={{ x: nodeX, y: nodeY }}
  onDragStart={() => {
    // Pin node: set fx/fy on the simulation node
  }}
  onDrag={(_, info) => {
    // Update fx/fy to follow pointer
  }}
  onDragEnd={() => {
    // Release fx/fy, let simulation recalculate
    // Spring back handled by motion transition
  }}
  transition={{ type: "spring", stiffness: 300, damping: 15 }}
>
  {/* pill rect + icon path + label text */}
</motion.g>
```

### Pattern 3: Icon mapping with fallback

**What:** Map node IDs to simple-icons slugs. Some nodes won't have matching icons (e.g., "Plugins Capacitor", "Architecture Hexagonale"). Provide a text-only fallback.
**When to use:** Always -- not all 36 nodes will have Simple Icons matches.
**Example:**

```typescript
// icon-map.ts
import { siReact, siNextdotjs, siTypescript, siTailwindcss /* ... */ } from "simple-icons";

// Map graph node IDs to simple-icons objects
export const iconMap: Record<string, { path: string; viewBox: string } | undefined> = {
  react: { path: siReact.path, viewBox: "0 0 24 24" },
  nextjs: { path: siNextdotjs.path, viewBox: "0 0 24 24" },
  typescript: { path: siTypescript.path, viewBox: "0 0 24 24" },
  // ... etc
  // Nodes without icons get undefined -> render pill without icon (text only, slightly wider)
};
```

### Pattern 4: Micro-movement with reduced-motion respect

**What:** After d3-force stabilizes, apply a subtle perpetual floating animation to each node using Framer Motion's `animate` with infinite repeat.
**When to use:** Post-simulation stabilization.
**Example:**

```typescript
// Micro-movement: each node gets a slightly different phase offset
const prefersReducedMotion = useReducedMotion(); // from motion

<motion.g
  animate={prefersReducedMotion ? undefined : {
    x: [baseX - 2, baseX + 2, baseX - 1, baseX + 1, baseX],
    y: [baseY + 1, baseY - 1.5, baseY + 2, baseY - 1, baseY],
  }}
  transition={{
    duration: 6 + Math.random() * 4, // 6-10s per cycle, varied per node
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
```

### Anti-Patterns to Avoid

- **Letting d3 manipulate the DOM:** Never use `d3.select()` or `.append()` in React. D3 computes, React renders.
- **Re-creating simulation on every render:** Store simulation in a `useRef`, not `useState`. Only create once.
- **Using `setState` for every tick without batching:** React 18+ auto-batches, but still avoid unnecessary spreads. Use `requestAnimationFrame` if needed.
- **Importing full `d3` package:** Only import `d3-force`. The full `d3` package is 871KB.
- **Using `@icons-pack/react-simple-icons` inside SVG:** These render their own `<svg>` wrapper -- cannot nest inside the graph SVG. Use raw `simple-icons` package instead.

## Don't Hand-Roll

| Problem                  | Don't Build                           | Use Instead                            | Why                                                                                  |
| ------------------------ | ------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------ |
| Force-directed layout    | Custom physics engine                 | d3-force                               | Velocity Verlet integration, collision detection, link forces -- decades of research |
| Drag with spring return  | Manual pointer tracking + spring math | Framer Motion drag + spring transition | Handles pointer events, touch, momentum, spring physics out of the box               |
| Tech brand icons         | Custom SVG icon collection            | simple-icons                           | 3400+ curated, consistent 24x24 viewBox SVG paths                                    |
| Reduced motion detection | Manual `matchMedia` listener          | `useReducedMotion()` from motion       | Handles SSR, hydration, listener cleanup                                             |
| Bezier edge paths        | Manual control point math             | Utility function with fixed offset     | Simple formula: midpoint + perpendicular offset for smooth curves                    |

**Key insight:** The complexity budget should go into the user experience (smooth animations, organic feel), not into reimplementing physics or icon rendering.

## Common Pitfalls

### Pitfall 1: SVG coordinate space vs screen coordinates

**What goes wrong:** Drag positions are in screen pixels but SVG uses its own coordinate system. Nodes jump or drift during drag.
**Why it happens:** SVG viewBox scaling means 1px on screen != 1 unit in SVG.
**How to avoid:** Use `motion.g` with `style={{ x, y }}` which works in SVG user space. Or use `transform: translate(x, y)` on `<g>` elements. Ensure the SVG viewBox matches the container dimensions (no scaling).
**Warning signs:** Nodes teleport on first drag, or drag feels "offset" from the cursor.

### Pitfall 2: Simulation never stops / battery drain

**What goes wrong:** d3-force simulation runs indefinitely, consuming CPU.
**Why it happens:** Setting `alphaTarget > 0` keeps the simulation "warm". Or forgetting to call `sim.stop()` on unmount.
**How to avoid:** Let the simulation cool naturally (default alphaTarget = 0, alphaDecay ~0.023). After ~300 ticks it stops. Clean up in useEffect return. For micro-movement, use Framer Motion (CSS-based, GPU-accelerated) not d3 simulation.
**Warning signs:** High CPU usage on the page, fan spinning, `tick` events firing long after initial load.

### Pitfall 3: simple-icons tree shaking failure

**What goes wrong:** Bundling all 3400+ icons instead of the ~30 needed. Bundle size explodes.
**Why it happens:** Importing from `simple-icons` barrel export without named imports, or bundler not configured for tree shaking.
**How to avoid:** Use specific named imports: `import { siReact } from "simple-icons"`. Next.js with Turbopack handles tree shaking well. Verify with `npm run build` output.
**Warning signs:** Build output shows unexpectedly large chunks.

### Pitfall 4: d3-force mutates node objects

**What goes wrong:** d3-force adds `x`, `y`, `vx`, `vy`, `index` properties directly to the node objects passed to `forceSimulation()`.
**Why it happens:** By design -- d3-force mutates in place for performance.
**How to avoid:** Clone nodes before passing to simulation: `nodes.map(n => ({...n}))`. Never pass the original content data directly.
**Warning signs:** TypeScript errors about missing properties, or original data objects getting polluted with position data.

### Pitfall 5: HomeNav does not highlight /stack link

**What goes wrong:** The "Ma Stack" link in HomeNav doesn't get the active style when on /stack.
**Why it happens:** HomeNav's `isActive` only checks anchor sections and specific paths. A new path needs explicit handling.
**How to avoid:** Use `<Link href="/stack">` and add `pathname === "/stack"` to the `isActive` function.
**Warning signs:** Link appears but never highlights on the /stack page.

### Pitfall 6: Graph overflows on small viewports

**What goes wrong:** With 36 nodes and full-screen layout, nodes pile up or overflow on tablets/small laptops.
**Why it happens:** Force simulation parameters tuned for large screens don't scale.
**How to avoid:** Use `useEffect` with `ResizeObserver` to get container dimensions. Pass width/height to forceCenter. Adjust charge strength based on available space. Consider clamping node positions to viewport bounds.
**Warning signs:** Nodes rendering outside the visible area, horizontal scroll appearing.

## Code Examples

### SVG Node Pill Structure

```typescript
// Pill node: rounded rect + icon + label, inside a <g> positioned by d3-force
<g transform={`translate(${node.x}, ${node.y})`}>
  {/* Glow filter */}
  <rect
    x={-pillWidth / 2}
    y={-pillHeight / 2}
    width={pillWidth}
    height={pillHeight}
    rx={pillHeight / 2}
    fill={familyColor}
    filter={`drop-shadow(0 0 8px ${familyColor})`}
    opacity={0.95}
  />
  {/* Icon (simple-icons path, scaled to fit) */}
  {iconData && (
    <g transform={`translate(${-pillWidth / 2 + padding}, ${-iconSize / 2}) scale(${iconSize / 24})`}>
      <path d={iconData.path} fill="white" />
    </g>
  )}
  {/* Label */}
  <text
    x={iconData ? padding : 0}
    y={0}
    dominantBaseline="central"
    textAnchor={iconData ? "start" : "middle"}
    fill="white"
    fontSize={fontSize}
    fontFamily="var(--font-dm-sans)"
  >
    {node.label}
  </text>
</g>
```

### Bezier Edge Between Two Nodes

```typescript
// Cubic Bezier with vertical bias for organic curves
function edgePath(x1: number, y1: number, x2: number, y2: number): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  // Control points offset perpendicular to the line
  const cx1 = x1 + dx * 0.25;
  const cy1 = y1 + dy * 0.1;
  const cx2 = x1 + dx * 0.75;
  const cy2 = y2 - dy * 0.1;
  return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
}

<path d={edgePath(source.x, source.y, target.x, target.y)} stroke="#888" strokeOpacity={0.35} fill="none" strokeWidth={1.5} />
```

### Page Route with SEO Metadata

```typescript
// src/app/stack/page.tsx — Server Component
import { PageShell } from "@/components/page-shell/PageShell";
import { StackGraph } from "@/components/stack-graph/StackGraph";
import { stackGraph } from "@/content/stack-graph";

export const metadata = {
  title: "Ma Stack",
  description: "Visualisation interactive des competences techniques de Florian Lauer et de leurs relations.",
};

export default function StackPage() {
  return (
    <PageShell containerClassName="max-w-none px-0">
      <h1 className="px-6 text-2xl font-semibold tracking-tight text-foreground/80">Ma Stack</h1>
      <StackGraph data={stackGraph} />
    </PageShell>
  );
}
```

### D3-Force Recommended Parameters

```typescript
// Tuned for ~36 nodes in a full-viewport container
const simulation = forceSimulation(simNodes)
  .force("center", forceCenter(width / 2, height / 2))
  .force("charge", forceManyBody().strength(-250)) // repulsion between all nodes
  .force(
    "link",
    forceLink(simEdges)
      .id((d) => d.id)
      .distance(120)
      .strength(0.4),
  )
  .force(
    "collide",
    forceCollide().radius((d) => pillWidth(d) / 2 + 10),
  ) // prevent overlap
  .alpha(1) // start hot
  .alphaDecay(0.02) // slightly slower decay for visible animation (~1.5s to settle)
  .velocityDecay(0.3); // lower friction for more organic movement during layout
```

## State of the Art

| Old Approach                  | Current Approach                     | When Changed | Impact                                                        |
| ----------------------------- | ------------------------------------ | ------------ | ------------------------------------------------------------- |
| d3.select().append() in React | d3 for math only, React for DOM      | ~2020+       | Clean separation, no DOM conflicts                            |
| framer-motion package         | motion package (same lib, renamed)   | 2024         | Import from "motion" not "framer-motion"                      |
| Canvas for large graphs       | SVG for <100 nodes, Canvas for 1000+ | Always       | SVG preferred for accessibility + interactivity at this scale |
| Manual drag handlers          | motion.g drag prop                   | 2023+        | Built-in pointer tracking, touch support, spring physics      |

**Deprecated/outdated:**

- `d3.forceSimulation()` via full `d3` import: Use `d3-force` standalone module
- `framer-motion` package name: Now `motion` (already correct in this project)

## Open Questions

1. **Simple Icons coverage for all 36 nodes**
   - What we know: Major techs (React, Node, Docker, etc.) are covered. Methods family (TDD, DDD, etc.) likely have no Simple Icons equivalent.
   - What's unclear: Exact mapping for all 36 node IDs to simple-icons slugs.
   - Recommendation: Build the icon-map.ts during implementation. Nodes without icons get text-only pills (slightly different layout, no icon space). Estimate ~25-28 of 36 nodes will have icons.

2. **Pill sizing for 4 experience levels**
   - What we know: User wants 4 sizes (Expert > Avance > Intermediaire > Notions).
   - What's unclear: Exact pixel dimensions that look good.
   - Recommendation: Start with Expert=160x40, Avance=140x36, Intermediaire=120x32, Notions=100x28. Adjust during implementation based on label lengths and visual balance.

3. **Interaction between d3-force drag and Framer Motion drag**
   - What we know: d3-force has its own drag concept (fx/fy pinning). Framer Motion has its own drag system.
   - What's unclear: Whether to use d3 fx/fy during drag or purely Framer Motion.
   - Recommendation: Use Framer Motion for the visual drag (pointer tracking + spring return). On drag start, pause micro-movement for that node. On drag end, animate spring back to the d3-computed position. Do NOT use d3's fx/fy -- let the simulation stay stopped after initial layout.

## Validation Architecture

### Test Framework

| Property           | Value                                                |
| ------------------ | ---------------------------------------------------- |
| Framework          | None configured (per CLAUDE.md)                      |
| Config file        | none                                                 |
| Quick run command  | `npm run lint && npm run build`                      |
| Full suite command | `npm run lint && npm run fmt:check && npm run build` |

### Phase Requirements -> Test Map

| Req ID    | Behavior                            | Test Type | Automated Command                            | File Exists? |
| --------- | ----------------------------------- | --------- | -------------------------------------------- | ------------ |
| PAGE-01   | /stack route renders with PageShell | smoke     | `npm run build` (build fails if page errors) | N/A          |
| PAGE-02   | HomeNav includes /stack link        | manual    | Visual check in browser                      | N/A          |
| PAGE-03   | SEO metadata on /stack              | manual    | View source / Lighthouse SEO audit           | N/A          |
| RENDER-01 | Nodes show name, icon, color        | manual    | Visual check in browser                      | N/A          |
| RENDER-02 | Edges connect nodes with curves     | manual    | Visual check in browser                      | N/A          |
| RENDER-03 | d3-force layout positions nodes     | smoke     | `npm run build` + visual check               | N/A          |
| RENDER-04 | Legend shows categories with colors | manual    | Visual check in browser                      | N/A          |

### Sampling Rate

- **Per task commit:** `npm run lint && npm run build`
- **Per wave merge:** `npm run lint && npm run fmt:check && npm run build`
- **Phase gate:** Full suite green + visual verification of all 7 requirements

### Wave 0 Gaps

None -- no test runner configured per project conventions. Linting + build are the quality gates.

## Sources

### Primary (HIGH confidence)

- [d3-force official docs](https://d3js.org/d3-force) - simulation API, forces, parameters
- [d3-force npm](https://www.npmjs.com/package/d3-force) - v3.0.0 standalone module
- [simple-icons npm](https://www.npmjs.com/package/simple-icons) - v16.11.0, SVG path data API
- [Motion for React docs](https://motion.dev/docs/react-motion-component) - motion.g, drag, spring transitions
- Project codebase: PageShell, HomeNav, stack-graph.ts, types -- all verified by reading source

### Secondary (MEDIUM confidence)

- [Creating a Force Graph using React and D3](https://dev.to/gilfink/creating-a-force-graph-using-react-and-d3-76c) - React + d3-force integration pattern
- [Visualizing Connections: React + d3 Force Graphs + TypeScript](https://medium.com/@qdangdo/visualizing-connections-a-guide-to-react-d3-force-graphs-typescript-74b7af728c90) - TypeScript typing patterns
- [@icons-pack/react-simple-icons](https://www.npmjs.com/package/@icons-pack/react-simple-icons) - Confirmed this is NOT suitable for SVG nesting
- [simple-icons tree shaking issue](https://github.com/simple-icons/simple-icons/issues/8112) - Tree shaking considerations

### Tertiary (LOW confidence)

- None -- all findings verified against official sources or project code

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - d3-force, simple-icons, and motion are all verified, versioned, and well-documented
- Architecture: HIGH - "d3 computes, React renders" is the established community pattern with many examples
- Pitfalls: HIGH - All pitfalls derived from official docs or verified community experience

**Research date:** 2026-03-08
**Valid until:** 2026-04-08 (stable libraries, 30-day window)
