# Feature Landscape

**Domain:** Interactive tech stack graph visualization for developer portfolio
**Researched:** 2026-03-07

## Table Stakes

Features users (recruiters, fellow devs) expect when they land on an interactive graph page. Missing any of these makes the page feel broken or pointless.

| Feature                         | Why Expected                                                                                                           | Complexity | Notes                                                                                                                       |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Nodes with tech name + icon** | Without visual identity, nodes are meaningless dots. Recruiters scan logos, not labels alone.                          | Low        | Already have icons in existing StackSection. Reuse `devicon` or `simple-icons`.                                             |
| **Color-coded categories**      | Immediate visual grouping (Frontend vs Backend vs Infra). Every skill graph does this.                                 | Low        | Existing `familyAccent` map in StackSection provides the palette. Extend to 6 families.                                     |
| **Edges showing relationships** | The entire value proposition. Without edges it is just a grid with extra steps.                                        | Medium     | Need to define relationship data in `stack.ts`. ~40-60 edges for 31 nodes.                                                  |
| **Hover tooltip with details**  | Users expect to learn more on hover -- name, category, experience level, short context.                                | Low        | Standard HTML tooltip or floating div. Must also trigger on keyboard focus.                                                 |
| **Zoom and pan**                | With 30+ nodes, the graph will not fit comfortably at a fixed scale. Zoom/pan is expected behavior for any node graph. | Medium     | D3-zoom or library-provided. Needs touch support for tablets.                                                               |
| **Category legend**             | Users need to decode the color mapping without guessing.                                                               | Low        | Simple colored dots + label list, can double as filter toggles.                                                             |
| **Initial readable layout**     | Graph must load into a comprehensible state, not a tangled mess requiring user effort.                                 | Medium     | Force-directed simulation needs tuning: group gravity, link distance, collision radius. Pre-computed positions as fallback. |
| **Smooth entrance animation**   | Nodes appearing/settling into place. Static instant-render feels lifeless for a portfolio.                             | Low        | Force simulation settling IS the animation. Just control duration (~1-2s).                                                  |
| **Accessible text alternative** | Screen readers cannot parse SVG node graphs. A structured list or table fallback is required.                          | Low        | Render a visually-hidden `<table>` or `<dl>` with the same data. ARIA `role="img"` on the SVG with `aria-label`.            |
| **Keyboard navigation**         | WCAG requires all interactive elements be keyboard-operable. Tab through nodes, Enter/Space to select.                 | Medium     | Need focus management on SVG/Canvas elements. Arrow keys for traversal within the graph.                                    |
| **Responsive container**        | Graph container must resize with viewport. Not necessarily mobile-optimized layout, but must not overflow or break.    | Low        | SVG viewBox or container query. Full mobile graph redesign is out of scope per PROJECT.md.                                  |

## Differentiators

Features that set this apart from typical "skills list with percentages" sections. Not expected, but create a memorable impression.

| Feature                                             | Value Proposition                                                                                                                                               | Complexity | Notes                                                                                                             |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------- |
| **Click-to-focus: highlight a node's neighborhood** | Clicking a tech dims everything except its direct connections. Shows "React connects to TypeScript, Next.js, Vite" at a glance. This is the killer interaction. | Medium     | Dim non-connected nodes to 20% opacity. Highlight connected edges. Toggle off on second click or click elsewhere. |
| **Category filter toggles**                         | Toggle families on/off to focus on Frontend-only or Backend-only subgraph. Legend items become interactive buttons.                                             | Medium     | Re-run force simulation on filtered subset. Animate nodes in/out.                                                 |
| **Experience level encoded in node size**           | Larger nodes = more experience. Adds a dimension beyond just "I know this" -- shows depth.                                                                      | Low        | Map proficiency (1-5) to radius. Subtle but effective.                                                            |
| **Edge labels or typed relationships**              | "uses", "built with", "deploys to" instead of generic lines. Adds semantic meaning.                                                                             | Medium     | Risk of visual clutter. Show only on hover/focus of an edge, not by default.                                      |
| **Minimap for orientation**                         | Small overview in corner showing full graph with viewport rectangle.                                                                                            | High       | Only valuable if graph is large enough to need it. At 31 nodes, probably overkill. Defer.                         |
| **Search/find node**                                | Type a tech name to locate and zoom to it.                                                                                                                      | Medium     | Useful if graph grows past ~50 nodes. At current size (~31), not critical.                                        |
| **Animated path tracing**                           | On focus, animate a pulse along connected edges to show data/workflow flow.                                                                                     | Medium     | Pure polish. Looks impressive in a portfolio context. SVG stroke-dasharray animation.                             |
| **"My typical stack" highlight**                    | Pre-defined button that highlights a common project stack (e.g., React + TypeScript + Next.js + Tailwind + Node + PostgreSQL). Shows real-world usage patterns. | Low        | Just a predefined filter/highlight. Very low effort, high storytelling value.                                     |
| **Smooth zoom-to-fit on load**                      | Start zoomed out showing everything, then optionally zoom into a cluster.                                                                                       | Low        | D3-zoom `transform` transition. Quick win for visual polish.                                                      |

## Anti-Features

Features to explicitly NOT build. Each would waste time, add complexity, or actively hurt the experience.

| Anti-Feature                                                   | Why Avoid                                                                                                                                           | What to Do Instead                                                                                        |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Skill percentage bars (70% React, 40% Docker)**              | Meaningless numbers. 70% of what? Universally mocked in the dev community. Damages credibility.                                                     | Use relative node size (bigger = more experience) without showing numbers. Qualitative, not quantitative. |
| **Drag-to-rearrange nodes**                                    | Looks interactive but serves no purpose for a visitor. They are viewing YOUR skills, not building their own graph. Adds complexity for zero value.  | Let force simulation handle layout. Nodes stay put after settling.                                        |
| **3D graph (Three.js/WebGL)**                                  | Massively increases complexity, bundle size, and accessibility problems. 3D adds "wow" but reduces readability. Occlusion makes nodes hard to find. | Stick to 2D SVG. The relationship data IS the wow factor, not the rendering tech.                         |
| **Real-time data fetching (GitHub API, npm stats)**            | Adds API dependencies, rate limits, loading states, and staleness. Portfolio should load instantly.                                                 | Static data in `src/content/stack.ts`. Update manually when skills change.                                |
| **Gamification (XP points, skill trees, unlock paths)**        | This is a portfolio, not a game. Trivializes professional experience.                                                                               | Present skills as a professional network graph, not an RPG skill tree.                                    |
| **Editable graph (visitor can add nodes)**                     | No use case. Visitors consume, they do not create. Adds auth/persistence complexity.                                                                | Read-only visualization.                                                                                  |
| **Proficiency self-assessment scale visible to visitors**      | "Expert/Intermediate/Beginner" labels invite scrutiny and impostor-syndrome debates.                                                                | Encode experience as node size (subtle, relative) without explicit labels. Let the relationships speak.   |
| **Complex physics controls (gravity sliders, spring tension)** | Fun for the developer, irrelevant for visitors.                                                                                                     | Tune physics once during development. Ship fixed parameters.                                              |

## Feature Dependencies

```
Color-coded categories ─── required by ──→ Category filter toggles
                                          Category legend

Edges (relationships)  ─── required by ──→ Click-to-focus neighborhood
                                          Edge labels
                                          Animated path tracing
                                          "My typical stack" highlight

Hover tooltip          ─── enhanced by ──→ Edge labels (tooltip on edges)

Zoom and pan           ─── required by ──→ Minimap
                                          Search/find node (zoom-to-node)
                                          Zoom-to-fit on load

Nodes with icons       ─── required by ──→ Experience level (node size)

Initial layout         ─── required by ──→ Everything else (nothing works without a readable graph)

Accessible text alt    ─── independent ──→ Can ship in parallel with graph
Keyboard navigation    ─── requires    ──→ Nodes + focus management
```

## MVP Recommendation

**Phase 1 -- Core graph (table stakes):**

1. Nodes with tech name + icon + color by category
2. Edges showing relationships (data model in `stack.ts`)
3. Force-directed layout with tuned initial positions
4. Hover/focus tooltip with details
5. Category legend
6. Accessible text alternative (hidden table)
7. Responsive container
8. Smooth entrance animation (simulation settling)

**Phase 2 -- Interactivity (key differentiators):**

1. Zoom and pan
2. Click-to-focus neighborhood highlighting (THE killer feature)
3. Category filter toggles (legend becomes interactive)
4. Experience level as node size
5. Keyboard navigation (Tab + arrow keys)

**Phase 3 -- Polish (if time permits):**

1. "My typical stack" preset highlight
2. Zoom-to-fit on load
3. Animated path tracing on edges
4. Edge labels on hover

**Defer indefinitely:**

- Minimap (not enough nodes)
- Search/find (not enough nodes)
- 3D rendering
- Drag-to-rearrange

**Rationale:** Phase 1 delivers a working, accessible graph that already surpasses any LinkedIn skills section. Phase 2 adds the interactions that make it memorable and worth exploring. Phase 3 is pure polish that can ship incrementally.

## Sources

- [Cambridge Intelligence - Graph Visualization UX](https://cambridge-intelligence.com/graph-visualization-ux-how-to-avoid-wrecking-your-graph-visualization/)
- [Cambridge Intelligence - Accessible Graph Visualization](https://cambridge-intelligence.com/build-accessible-data-visualization-apps-with-keylines/)
- [React Graph Gallery - Force-directed Network](https://www.react-graph-gallery.com/network-chart)
- [D3 Force Module](https://d3js.org/d3-force)
- [Deque - Accessible Interactive Charts](https://www.deque.com/blog/how-to-make-interactive-charts-accessible/)
- [yFiles - Knowledge Graph Visualization Guide](https://www.yfiles.com/resources/how-to/guide-to-visualizing-knowledge-graphs)
- [Skill Graph](https://skill-graph.com/)
- [MuchSkills - Skills Visualization](https://www.muchskills.com/for-individuals)
- [Datavid - Knowledge Graph Visualization Guide](https://datavid.com/blog/knowledge-graph-visualization)
