# Phase 3: Interactivity - Research

**Researched:** 2026-03-13
**Domain:** d3-zoom, d3-force dynamic filtering, React SVG interaction patterns
**Confidence:** HIGH

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

**Tooltip riche (INTER-01)**

- HTML overlay (div positionnée en absolute au-dessus du SVG), pas de SVG tooltip
- Ancré au nœud survolé (au-dessus, repositionné si pas de place)
- Animation scale+fade à l'apparition (~150ms, scale 0.95→1 + opacity 0→1)
- Contenu : nom + niveau d'expérience en header, description texte, puis liste des technos liées en tags colorés (chaque tag affiche la couleur de la famille de la techno liée)
- Remplace le tooltip SVG actuel (simple rect+text label) dans GraphNode

**Zoom & pan (INTER-02)**

- Molette = zoom centré sur la position du curseur (comportement d3-zoom standard)
- Range de zoom : 0.5x (vue d'ensemble) à 3x (détail cluster)
- Drag sur le fond du SVG = pan (déplacer la vue)
- Drag sur un nœud = drag du nœud (comportement existant préservé)
- Double-clic sur le fond = reset zoom/pan à la vue initiale
- Pas de boutons +/−, pas de minimap — interface épurée
- Transition smooth entre niveaux de zoom

**Click-to-focus (INTER-03)**

- Clic sur un nœud = focus : le nœud et ses voisins directs restent à 100% d'opacité, tous les autres nœuds et edges passent à ~15-20% d'opacité
- Transition douce ~200ms pour le changement d'opacité
- Clic sur le fond du graph = désactive le focus, tous les nœuds reviennent à 100%
- Clic sur un autre nœud = change le focus vers ce nœud
- Pas d'auto-zoom/recentrage — la vue ne bouge pas, seule l'opacité change
- Distinction click vs drag : un pointerdown+pointerup sans mouvement significatif = click, avec mouvement = drag

**Filtres par catégorie (INTER-04)**

- 3 groupes macro (décidé Phase 1) : Frontend (frontend+mobile), Backend (backend+data), DevOps (infra+integrations)
- Toggle pills colorées positionnées au-dessus du graph (sous le titre "Ma Stack"), avec dot de couleur par domaine
- Actif = pill pleine/opaque, inactif = outline/dimmé
- Mode multi-toggle : tous actifs par défaut, on peut désactiver n'importe quelle combinaison, au moins 1 doit rester actif
- Nœuds filtrés : fade-out animé (~200ms) puis disparition du DOM
- Edges cross-category : disparaissent si un des deux nœuds est filtré
- Réorganisation d3-force après filtrage (les nœuds restants comblent l'espace)

### Claude's Discretion

- Paramètres exacts de d3-zoom (smoothness, ease function)
- Seuil de distance pour distinguer click vs drag
- Largeur max du tooltip et gestion du débordement viewport
- Gestion de l'interaction entre click-to-focus et filtres actifs simultanément
- Implémentation technique du reroutage d3-force après filtrage (retirer/ajouter des nœuds à la simulation)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>

## Phase Requirements

| ID       | Description                                                                                  | Research Support                                                                                 |
| -------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| INTER-01 | Hover sur un noeud affiche un tooltip avec details (niveau, description, technos liees)      | HTML overlay pattern, tooltip positioning logic, animation via CSS transitions                   |
| INTER-02 | Zoom et pan pour naviguer dans le graph (molette + drag)                                     | d3-zoom v7 API, scaleExtent, zoomIdentity reset, SVG `<g>` transform wrapper                     |
| INTER-03 | Click-to-focus : cliquer un noeud met en surbrillance ses connexions et attenue le reste     | Adjacency set computation, SVG opacity via React state, click vs drag threshold pattern          |
| INTER-04 | Filtres par categorie (Frontend, Backend, DevOps) pour montrer/masquer des groupes de noeuds | d3-force dynamic node update pattern, simulation.nodes() + force("link").links() + alpha restart |

</phase_requirements>

---

## Summary

Phase 3 adds four interactivity layers to an already-working d3-force graph: a rich HTML tooltip (INTER-01), zoom/pan navigation via d3-zoom (INTER-02), click-to-focus highlighting via React opacity state (INTER-03), and category filter pills that dynamically update the simulation (INTER-04).

The core technical challenge is **event routing**: d3-zoom and node drag must not interfere. The solution is to apply d3-zoom only to the SVG background (a transparent `<rect>`) while keeping node pointer events managed by React handlers. Node `onPointerDown` calls `e.stopPropagation()` to prevent zoom from consuming node interactions.

d3-zoom is NOT yet installed. It must be added (`npm install d3-zoom @types/d3-zoom`). All other required capabilities (d3-force, React state, Tailwind CSS transitions) are already in the project. The filter mechanism uses d3-force's documented update pattern: call `simulation.nodes(filtered)`, `simulation.force("link").links(filteredEdges)`, then `simulation.alpha(0.5).restart()` to reflow without a jarring full restart.

**Primary recommendation:** Apply d3-zoom to SVG via a `useRef` + `useEffect` imperative call on a background `<rect>`, store the `ZoomTransform` in React state to drive the `<g transform>` attribute, and handle all four features as independent React state slices lifted into `StackGraph.tsx`.

## Standard Stack

### Core

| Library  | Version            | Purpose                          | Why Standard                                        |
| -------- | ------------------ | -------------------------------- | --------------------------------------------------- |
| d3-zoom  | ^3.0.0             | Zoom/pan behavior, ZoomTransform | Official D3 module, matches d3-force version family |
| d3-force | ^3.0.0 (installed) | Force simulation                 | Already in project                                  |

### Supporting

| Library            | Version | Purpose                                 | When to Use                                                  |
| ------------------ | ------- | --------------------------------------- | ------------------------------------------------------------ |
| @types/d3-zoom     | ^3.0.x  | TypeScript types for d3-zoom            | Required alongside d3-zoom                                   |
| motion (installed) | ^12.x   | Optional: could drive tooltip animation | Already installed; CSS transitions sufficient for scale+fade |

### Alternatives Considered

| Instead of                    | Could Use                      | Tradeoff                                                                                                                        |
| ----------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| d3-zoom                       | Custom wheel + pointer handler | d3-zoom handles scroll normalization, pinch-to-zoom, inertia edge cases — don't hand-roll                                       |
| CSS `transition: opacity`     | Framer Motion animate          | Motion is heavier; CSS transition is sufficient for 200ms opacity fade                                                          |
| React state for ZoomTransform | d3 internal state only         | React state approach causes re-render on every zoom tick — use ref+direct DOM for transform, React state only for reset trigger |

**Installation:**

```bash
npm install d3-zoom @types/d3-zoom
```

## Architecture Patterns

### Recommended State Topology

```
StackGraph.tsx  (lifted state owner)
├── zoomRef: useRef<ZoomBehavior>           — d3-zoom instance
├── svgRef: useRef<SVGSVGElement>            — attach zoom behavior
├── transformRef: useRef<ZoomTransform>      — current transform (NO re-render)
├── [focusedId, setFocusedId]: useState      — INTER-03
├── [activeFilters, setActiveFilters]: useState  — INTER-04
├── [tooltipState, setTooltipState]: useState    — INTER-01
│
├── GraphFilters.tsx     — INTER-04 pill UI
├── SVG
│   ├── <rect> background — zoom target + pan target + click-to-unfocus
│   ├── <g transform="...">  — driven by zoom transform
│   │   ├── GraphEdge (opacity driven by focusedId)
│   │   └── GraphNode (opacity driven by focusedId; onClick → setFocusedId)
│   └── defs
└── GraphTooltip.tsx    — INTER-01 HTML overlay
```

### Pattern 1: d3-zoom attached imperatively to SVG background rect

**What:** d3-zoom is a D3 behavior that mutates DOM event listeners. In React, attach it once via `useEffect` on a `<rect>` covering the full SVG. On zoom events, update a `transformRef` and directly mutate the `<g>` transform attribute (bypasses React re-render overhead for every wheel tick).

**When to use:** Always for zoom/pan in React+SVG. React re-renders on every wheel event are too expensive.

**Example:**

```typescript
// Source: https://d3js.org/d3-zoom
import { zoom, zoomIdentity, ZoomTransform } from "d3-zoom";
import { select } from "d3-selection";

// Inside StackGraph.tsx
const zoomBehavior = zoom<SVGRectElement, unknown>()
  .scaleExtent([0.5, 3])
  .on("zoom", (event: { transform: ZoomTransform }) => {
    transformRef.current = event.transform;
    // Direct DOM mutation — no React re-render
    if (innerGRef.current) {
      innerGRef.current.setAttribute("transform", event.transform.toString());
    }
  });

// Attach in useEffect
useEffect(() => {
  if (!bgRectRef.current) return;
  select(bgRectRef.current).call(zoomBehavior);
  // Double-click on background = reset
  select(bgRectRef.current).on("dblclick.zoom", () => {
    select(bgRectRef.current!)
      .transition()
      .duration(300)
      .call(zoomBehavior.transform, zoomIdentity);
  });
}, [zoomBehavior]);
```

### Pattern 2: Click vs drag distinction on nodes

**What:** Track pointer movement delta between `pointerdown` and `pointerup`. If delta < threshold (8px in screen coordinates), treat as click. If larger, treat as drag.

**Why this threshold:** d3-zoom's own drag-suppression uses a similar approach. 8px matches common browser drag threshold conventions.

**Example:**

```typescript
// In GraphNode.tsx — augment existing drag handlers
const pointerDownPos = useRef<{ x: number; y: number } | null>(null);
const CLICK_THRESHOLD = 8; // px screen coordinates

const handlePointerDown = (e: React.PointerEvent<SVGGElement>) => {
  pointerDownPos.current = { x: e.clientX, y: e.clientY };
  e.stopPropagation(); // CRITICAL: prevents d3-zoom from consuming node pointerdown
  // ... existing drag logic
};

const handlePointerUp = (e: React.PointerEvent<SVGGElement>) => {
  draggingRef.current = false;
  onDragEnd?.(node.id);
  if (pointerDownPos.current) {
    const dx = e.clientX - pointerDownPos.current.x;
    const dy = e.clientY - pointerDownPos.current.y;
    if (Math.sqrt(dx * dx + dy * dy) < CLICK_THRESHOLD) {
      onNodeClick?.(node.id); // fires click-to-focus
    }
  }
  pointerDownPos.current = null;
};
```

### Pattern 3: Opacity-based click-to-focus via adjacency set

**What:** Build a `Set<string>` of the focused node's neighbors from `data.edges`. Pass `focusedId` and the adjacency set down to `GraphNode` and `GraphEdge`. Each element computes its own opacity inline.

**Example:**

```typescript
// In StackGraph.tsx — compute adjacency when focusedId changes
const neighborSet = useMemo(() => {
  if (!focusedId) return null;
  const neighbors = new Set<string>([focusedId]);
  for (const edge of data.edges) {
    if (edge.source === focusedId) neighbors.add(edge.target);
    if (edge.target === focusedId) neighbors.add(edge.source);
  }
  return neighbors;
}, [focusedId, data.edges]);

// In GraphNode.tsx — inline opacity
const opacity = neighborSet
  ? neighborSet.has(node.id) ? 1 : 0.15
  : 1;

// SVG element style
<g style={{ opacity, transition: "opacity 200ms ease" }} ...>
```

**SVG `transition` on `style` property:** CSS `transition` works on SVG elements via the `style` attribute (not SVG presentation attributes). Use `style={{ opacity, transition: "opacity 200ms ease" }}` — this is confirmed to work in all modern browsers.

### Pattern 4: d3-force dynamic node filtering

**What:** When filters change, compute `filteredNodes` and `filteredEdges`, then update the running simulation in-place. Preserve existing node positions (recycle by id map) to avoid jarring restarts.

**Example:**

```typescript
// In use-force-layout.ts — expose a filter method
const filterNodes = useCallback((activeNodeIds: Set<string>) => {
  const sim = simRef.current;
  if (!sim) return;

  // Preserve positions of nodes staying in simulation
  const posMap = new Map(nodesRef.current.map((n) => [n.id, n]));

  const filtered = allNodesRef.current
    .filter((n) => activeNodeIds.has(n.id))
    .map((n) => posMap.get(n.id) ?? n); // reuse existing SimNode if available

  const filteredEdges = allEdgesRef.current.filter(
    (e) => activeNodeIds.has(e.source as string) && activeNodeIds.has(e.target as string),
  );

  nodesRef.current = filtered;

  sim.nodes(filtered);
  (sim.force("link") as ForceLink<SimNode, SimEdge>).links(
    filteredEdges.map((e) => ({ source: e.source, target: e.target })),
  );
  sim.alpha(0.5).restart(); // partial alpha — feels like "nodes settling" not full restart
}, []);
```

**Key insight:** `alpha(0.5)` instead of `alpha(1)` gives a "gentle regrouping" feel rather than a jarring full restart.

### Pattern 5: HTML tooltip positioning

**What:** Tooltip is a `position: absolute` div inside the `relative` container div. On hover, compute position from node's SVG coordinates transformed to screen coordinates, then translated back to container-relative coordinates.

**Example:**

```typescript
// Convert SVG node position to container-relative screen position
function svgToContainerPos(
  svg: SVGSVGElement,
  container: HTMLElement,
  svgX: number,
  svgY: number,
  nodeRadius: number,
): { x: number; y: number } {
  const pt = svg.createSVGPoint();
  pt.x = svgX;
  pt.y = svgY - nodeRadius - 12; // 12px above node top edge
  const screenPt = pt.matrixTransform(svg.getScreenCTM()!);
  const rect = container.getBoundingClientRect();
  return {
    x: screenPt.x - rect.left,
    y: screenPt.y - rect.top,
  };
}
```

**Viewport overflow handling:** After positioning, clamp `x` to `[8, containerWidth - tooltipWidth - 8]` using `Math.max/min`. Check if `y - tooltipHeight < 0` and flip below node if so.

### Anti-Patterns to Avoid

- **Applying zoom to the SVG root:** Zoom captures all pointer events on the SVG including node interactions. Apply zoom to a background `<rect>` with `pointer-events="all"` instead.
- **React state for zoom transform ticks:** Storing `ZoomTransform` in `useState` causes a full React re-render on every wheel tick (60fps). Use `transformRef` + direct `setAttribute` for the transform, reserve `useState` only for discrete state changes (reset).
- **Re-initializing simulation on filter change:** Calling the `useEffect` that creates the simulation with new node arrays causes full reset (positions lost). Instead, call `simulation.nodes()` and restart on the existing simulation instance.
- **SVG presentation attribute for transition:** `<circle opacity={0.15}>` does not support CSS transitions. Use `<circle style={{ opacity: 0.15, transition: "opacity 200ms" }}>` instead.
- **e.stopPropagation() on pointerMove only:** Must also call it on `pointerDown` on nodes to prevent d3-zoom from claiming the drag.

## Don't Hand-Roll

| Problem                        | Don't Build                    | Use Instead                            | Why                                                                                                             |
| ------------------------------ | ------------------------------ | -------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Wheel zoom normalization       | Custom wheel delta math        | d3-zoom                                | Different browsers report wheel delta in different units (pixels, lines, pages); d3-zoom normalizes all of them |
| Pinch-to-zoom (touch)          | Custom touch distance tracking | d3-zoom                                | d3-zoom handles multi-touch pinch, velocity, and inertia                                                        |
| ZoomTransform math             | Custom translate/scale matrix  | `zoomIdentity`, `transform.toString()` | d3-zoom's transform objects handle compose, invert, rescale correctly                                           |
| Scroll-to-zoom vs pan conflict | Custom heuristics              | d3-zoom scaleExtent + translateExtent  | d3-zoom handles browser scroll hijacking edge cases                                                             |

**Key insight:** Zoom is deceptively hard — wheel delta normalization alone has dozens of browser-specific edge cases. d3-zoom is 2KB and solves all of them.

## Common Pitfalls

### Pitfall 1: d3-zoom conflicts with node pointer events (CRITICAL)

**What goes wrong:** d3-zoom is applied to the SVG root. When user starts dragging a node, d3-zoom intercepts the `pointerdown` event first and initiates panning, breaking node drag.
**Why it happens:** d3-zoom uses `addEventListener` on the element it's attached to, capturing all pointer events that bubble to that element.
**How to avoid:** Apply zoom to a `<rect>` positioned as the first child of the inner `<g>` (under nodes/edges), with `fill="transparent" pointer-events="all"`. Node `onPointerDown` must call `e.stopPropagation()` to prevent bubbling to the zoom target.
**Warning signs:** Node drag starts a pan instead; clicking nodes does nothing.

### Pitfall 2: Chrome 144+ pointer boundary event change breaks d3-drag

**What goes wrong:** As of Chrome 144 (January 2026), "Interoperable pointer and mouse boundary events" changes how boundary events dispatch when DOM elements are removed/recreated. d3-drag uses mouse events internally; the combination can misbehave.
**Why it happens:** The existing code already uses React pointer events (not d3-drag) for node dragging — this is the correct mitigation. Do NOT switch to d3-drag for node interaction.
**How to avoid:** Keep existing React `onPointerDown/Move/Up` handlers on nodes. Only d3-zoom is added (which uses its own event model on the background rect).
**Warning signs:** Node drag triggers zoom; drag works in Firefox but not Chrome.

### Pitfall 3: Zoom transform not applied to coordinate conversion

**What goes wrong:** Tooltip or click-to-focus coordinates are calculated from raw SVG coordinates, but after zoom/pan the visible positions are shifted. Tooltip appears at wrong location.
**Why it happens:** `svg.getScreenCTM()` correctly accounts for the current CSS transform of the SVG element, but the zoom `<g>` transform is a SVG attribute transform, not a CSS transform.
**How to avoid:** When computing tooltip position, use `getScreenCTM()` on the inner `<g>` element (the zoom wrapper), not the SVG root. Or: use `transformRef.current.apply([nodeX, nodeY])` to get zoom-adjusted coordinates before converting to screen space.

### Pitfall 4: Simulation re-creation on filter change

**What goes wrong:** `activeFilters` is a dependency of the `useEffect` that creates the simulation. When filters change, the simulation is destroyed and re-created from scratch, losing all positions.
**Why it happens:** Natural React pattern of including all deps in useEffect.
**How to avoid:** The simulation init `useEffect` must NOT depend on filter state. Keep `allNodesRef` and `allEdgesRef` as refs. Expose a `filterNodes()` method that updates the running simulation in-place.

### Pitfall 5: Focus state not cleared when filter removes focused node

**What goes wrong:** User focuses node X, then filters out node X's category. Node X disappears from DOM, but `focusedId === 'x'` remains in state. Remaining nodes are permanently dimmed (neighborSet for X computed against unfiltered data).
**Why it happens:** filter and focus states are independent.
**How to avoid:** In `GraphFilters` or `StackGraph`, when `activeFilters` changes, check if `focusedId` is still in the active node set; if not, call `setFocusedId(null)`.

### Pitfall 6: Tooltip anchor with zoom active

**What goes wrong:** Tooltip position is correct at zoom=1 but drifts when zoom level changes because the SVG coordinate space is scaled/translated.
**Why it happens:** The tooltip position is computed once on hover and not recalculated as zoom changes.
**How to avoid:** Recalculate tooltip position in the zoom `"zoom"` event handler if a tooltip is currently visible, or store the SVG-space node coordinates and recompute screen position from `svg.getScreenCTM()` on every position read.

## Code Examples

### d3-zoom setup with React ref (full pattern)

```typescript
// Source: https://d3js.org/d3-zoom
import { zoom, zoomIdentity } from "d3-zoom";
import { select } from "d3-selection";
import type { ZoomBehavior, ZoomTransform } from "d3-zoom";

// refs
const svgRef = useRef<SVGSVGElement>(null);
const bgRectRef = useRef<SVGRectElement>(null);
const innerGRef = useRef<SVGGElement>(null);
const zoomRef = useRef<ZoomBehavior<SVGRectElement, unknown>>();

useEffect(() => {
  const behavior = zoom<SVGRectElement, unknown>()
    .scaleExtent([0.5, 3])
    .on("zoom", (event: { transform: ZoomTransform }) => {
      if (innerGRef.current) {
        innerGRef.current.setAttribute("transform", event.transform.toString());
      }
    });

  zoomRef.current = behavior;
  if (bgRectRef.current) {
    select(bgRectRef.current).call(behavior);
  }

  return () => {
    if (bgRectRef.current) {
      select(bgRectRef.current).on(".zoom", null);
    }
  };
}, []); // empty deps — zoom behavior is stable

// Reset handler (e.g., on dblclick on background)
const handleBgDblClick = () => {
  if (bgRectRef.current && zoomRef.current) {
    select(bgRectRef.current)
      .transition()
      .duration(300)
      .call(zoomRef.current.transform, zoomIdentity);
  }
};
```

### SVG structure for zoom + pan

```tsx
<svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
  {/* Zoom target: transparent rect behind everything */}
  <rect
    ref={bgRectRef}
    width={width}
    height={height}
    fill="transparent"
    style={{ cursor: "grab" }}
    onDoubleClick={handleBgDblClick}
    onClick={handleBgClick} {/* unfocus on click */}
  />
  {/* All graph content — transform driven by zoom */}
  <g ref={innerGRef}>
    {/* edges first, then nodes on top */}
  </g>
</svg>
```

### Adjacency computation for focus

```typescript
// Source: derived from CONTEXT.md + standard graph pattern
const neighborSet = useMemo<Set<string> | null>(() => {
  if (!focusedId) return null;
  const s = new Set<string>([focusedId]);
  for (const e of data.edges) {
    if (e.source === focusedId) s.add(e.target);
    if (e.target === focusedId) s.add(e.source);
  }
  return s;
}, [focusedId, data.edges]);
```

### Filter group mapping

```typescript
// 3 macro groups → 7 families
const FILTER_GROUPS: Record<"frontend" | "backend" | "devops", StackFamilyKey[]> = {
  frontend: ["frontend", "mobile"],
  backend: ["backend", "data"],
  devops: ["infra", "integrations"],
  // Note: "methods" family is not in any macro group
};

// Compute active node IDs from active filters
function getActiveNodeIds(
  nodes: GraphNode[],
  activeGroups: Set<"frontend" | "backend" | "devops">,
): Set<string> {
  const activeFamilies = new Set<StackFamilyKey>();
  for (const g of activeGroups) {
    for (const f of FILTER_GROUPS[g]) activeFamilies.add(f);
  }
  // "methods" nodes always visible (not in any filter group)
  return new Set(
    nodes.filter((n) => n.family === "methods" || activeFamilies.has(n.family)).map((n) => n.id),
  );
}
```

### Tooltip animation (CSS-only)

```css
/* In globals.css or Tailwind inline */
.graph-tooltip {
  transition:
    opacity 150ms ease,
    transform 150ms ease;
}
.graph-tooltip[data-visible="false"] {
  opacity: 0;
  transform: scale(0.95);
  pointer-events: none;
}
.graph-tooltip[data-visible="true"] {
  opacity: 1;
  transform: scale(1);
}
```

Or with Tailwind + cn():

```typescript
<div className={cn(
  "absolute pointer-events-none transition-all duration-150 ease-out",
  visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
)} style={{ left: pos.x, top: pos.y }}>
```

## State of the Art

| Old Approach                           | Current Approach                                 | When Changed | Impact                                                       |
| -------------------------------------- | ------------------------------------------------ | ------------ | ------------------------------------------------------------ |
| SVG `<title>` for tooltips             | HTML overlay div                                 | 2018+        | Full styling, rich content, no SVG text wrapping limitations |
| Mouse events for drag                  | Pointer events                                   | 2020+        | Touch support, single code path                              |
| d3-drag for node drag                  | React pointer handlers (already done in Phase 2) | 2022+        | Avoids Chrome 144 d3-drag boundary event regression          |
| `zoom.on("zoom", () => setState(...))` | Direct `setAttribute` + transformRef             | 2023+        | Prevents 60fps React re-renders during wheel scroll          |

**Deprecated/outdated:**

- d3-selection for DOM manipulation in React: the project correctly manages DOM via React; d3-zoom is used only for behavior/event math, not DOM updates.
- `d3.event` (removed in d3 v6+): zoom events are now passed as the first argument to the handler.

## Open Questions

1. **"methods" family and filter groups**
   - What we know: There are 7 families; the 3 macro filter groups cover 6 of them (frontend+mobile, backend+data, infra+integrations). "methods" is not mapped to any filter group.
   - What's unclear: Should "methods" nodes always be visible, or should they be hidden when all groups are inactive (impossible given at-least-1 rule)?
   - Recommendation: Treat "methods" nodes as always visible regardless of filter state. This is natural (architectural methods are cross-domain) and avoids a 4th pill cluttering the UI.

2. **Tooltip position when near viewport edge**
   - What we know: Need to clamp and potentially flip tooltip below the node if insufficient space above.
   - What's unclear: How to handle nodes near the left/right edges when tooltip is wider than remaining space.
   - Recommendation: Max-width `240px` for tooltip; clamp x to `[8, containerWidth - 248]`. For vertical flip: if `top < tooltipHeight + 8`, render below node instead.

3. **Focus + filter interaction**
   - What we know: Both states are independent; a focused node can be filtered out.
   - What's unclear: Whether to automatically clear focus or keep it across filter changes.
   - Recommendation: Clear `focusedId` whenever the focused node's family is filtered out. This is the least surprising behavior.

## Validation Architecture

### Test Framework

| Property           | Value                                       |
| ------------------ | ------------------------------------------- |
| Framework          | None configured — no test runner in project |
| Config file        | N/A                                         |
| Quick run command  | `npm run lint && npm run build`             |
| Full suite command | `npm run lint && npm run build`             |

No automated test runner is configured in this project (confirmed by `package.json`: no jest, vitest, or testing-library). Quality gates are oxlint + TypeScript build.

### Phase Requirements → Test Map

| Req ID   | Behavior                                                                   | Test Type   | Automated Command                   | File Exists? |
| -------- | -------------------------------------------------------------------------- | ----------- | ----------------------------------- | ------------ |
| INTER-01 | Tooltip renders with node name, level, description, neighbor tags          | manual-only | `npm run build` (type-checks props) | N/A          |
| INTER-02 | Zoom 0.5x–3x, pan, double-click reset                                      | manual-only | `npm run build`                     | N/A          |
| INTER-03 | Click focuses node, neighbors opaque, rest dimmed, background click clears | manual-only | `npm run build`                     | N/A          |
| INTER-04 | Filter pills toggle node groups, simulation reflows                        | manual-only | `npm run build`                     | N/A          |

All four requirements are visual/interactive — they require browser-based manual verification. Build + lint serve as the automated gate for type correctness and code quality.

### Sampling Rate

- **Per task commit:** `npm run lint`
- **Per wave merge:** `npm run lint && npm run build`
- **Phase gate:** Build green + manual browser verification of all 4 requirements before `/gsd:verify-work`

### Wave 0 Gaps

None — no test infrastructure needed. Existing build + lint pipeline is sufficient for this project's quality gates.

## Sources

### Primary (HIGH confidence)

- https://d3js.org/d3-zoom — d3-zoom v7 official API: scaleExtent, ZoomTransform, zoom events, zoomIdentity, double-click behavior
- https://observablehq.com/@d3/modifying-a-force-directed-graph — d3-force dynamic node update pattern: simulation.nodes(), force("link").links(), alpha restart
- Existing codebase (`use-force-layout.ts`, `GraphNode.tsx`, `StackGraph.tsx`) — confirmed structure and integration points

### Secondary (MEDIUM confidence)

- https://swizec.com/blog/the-two-ways-to-build-a-zoomable-dataviz-component-with-d3zoom-and-react/ — React + d3-zoom integration patterns, direct DOM vs state approaches
- https://github.com/d3/d3-drag/issues/95 — Chrome 144 pointer boundary event regression; confirmed existing React pointer handler approach is correct mitigation

### Tertiary (LOW confidence)

- https://www.d3indepth.com/zoom-and-pan/ — General zoom/pan patterns (cross-referenced with official docs)

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — d3-zoom official docs verified, all other libs already in project
- Architecture: HIGH — patterns derived from existing codebase + official d3-zoom API
- Pitfalls: HIGH — Chrome 144 issue is documented in d3 GitHub, other pitfalls verified against official docs
- Filter mechanism: MEDIUM — dynamic simulation update pattern from official Observable notebook, specific alpha value (0.5 for "gentle reflow") is a recommendation within Claude's Discretion scope

**Research date:** 2026-03-13
**Valid until:** 2026-06-13 (d3-zoom is stable; main risk is React 19 pointer event changes)
