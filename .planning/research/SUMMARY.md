# Research Summary: Stack Graph

**Domain:** Interactive tech stack graph visualization for developer portfolio
**Researched:** 2026-03-07
**Overall confidence:** HIGH

## Executive Summary

The graph visualization ecosystem for React in 2025-2026 offers several mature options ranging from lightweight layout engines (d3-force) to full-featured graph libraries (React Flow, Reagraph, Sigma.js). For this project -- a 30-50 node interactive tech skills graph in a Next.js 16 portfolio -- the right answer is the simplest one: **d3-force for layout computation + React-managed SVG for rendering**.

The key insight driving this recommendation is the node count. At 30-50 nodes, SVG (not Canvas, not WebGL) is the correct rendering target. Each SVG element is a DOM node, which gives us native accessibility (tabindex, aria-label, focus events), native CSS/Tailwind styling, and standard React event handling. Canvas-based libraries like react-force-graph-2d or Reagraph would require building a parallel hidden DOM layer for accessibility -- solving a problem that SVG doesn't have.

The ecosystem research evaluated six alternatives (react-force-graph-2d, Reagraph, React Flow, Sigma.js/@react-sigma, vis-network, custom d3+Canvas). All were rejected: too heavy (Reagraph pulls Three.js at 155KB gzip), wrong purpose (React Flow is for flowchart editors), wrong scale (Sigma.js is for thousands of nodes), or unnecessary abstraction (react-force-graph-2d wraps d3-force with Canvas, losing SVG benefits at this scale).

The recommended approach adds exactly one new dependency: `d3-force` (~15KB gzip). Everything else reuses the existing stack: React 19 for SVG rendering, Tailwind v4 for styling, motion for animations, shadcn/ui for accessible controls, and the content-as-code pattern already established in the project.

## Key Findings

**Stack:** `d3-force` (~15KB) for layout computation + React SVG rendering. One new dependency. Native accessibility via SVG DOM elements.

**Architecture:** Server Component page with dynamic client import (matches gallery page pattern). d3-force runs synchronously as computation-only (no DOM touching). React owns all SVG rendering.

**Critical pitfall:** d3/React DOM ownership conflict -- must use d3-force for math only, never let d3 manipulate DOM elements. Also: Canvas accessibility blindspot -- avoided entirely by choosing SVG.

## Implications for Roadmap

Based on research, suggested phase structure:

1. **Data Foundation** - Define types + populate graph content data
   - Addresses: node/edge data model, relationship curation
   - Avoids: over-engineering relations (keep simple tuples), breaking existing stack.ts imports

2. **Core Graph Engine** - d3-force simulation hook + basic SVG rendering
   - Addresses: force layout, node rendering, edge rendering
   - Avoids: d3/React DOM conflict (computation-only pattern), SSR crash (dynamic import)

3. **Page Integration** - Stack page route, navigation link, metadata
   - Addresses: /stack route, SEO, PageShell integration
   - Avoids: SSR issues (next/dynamic with ssr: false)

4. **Interactivity** - Zoom/pan, hover tooltips, click-to-focus, filters
   - Addresses: core UX interactions, category filtering
   - Avoids: tooltip z-index wars (use shadcn Popover), filter state desync

5. **Accessibility + Polish** - Keyboard navigation, reduced motion, animations
   - Addresses: WCAG compliance, visual polish, entrance animation
   - Avoids: bolting on accessibility as afterthought (SVG makes this natural)

**Phase ordering rationale:**

- Data model must come first (everything depends on it)
- Core rendering must work before adding interactions
- Accessibility is woven through SVG approach (not a separate phase), but keyboard nav + reduced motion need dedicated work
- Filters and tooltips depend on working graph + interaction callbacks

**Research flags for phases:**

- Phase 2: Likely needs no further research -- d3-force API is well-documented and straightforward
- Phase 4: May need research on optimal zoom/pan implementation (d3-zoom vs vanilla pointer events)
- Phase 5: Standard patterns, follow existing project conventions (ScrollReveal, motion)

## Confidence Assessment

| Area                   | Confidence | Notes                                                                                              |
| ---------------------- | ---------- | -------------------------------------------------------------------------------------------------- |
| Stack (d3-force + SVG) | HIGH       | d3-force is the undisputed standard. SVG vs Canvas tradeoff is well-understood at this node count. |
| Features               | HIGH       | Table stakes for graph viz are well-established. Feature set matches project requirements.         |
| Architecture           | HIGH       | d3-force computation + React SVG rendering is a proven pattern with extensive documentation.       |
| Pitfalls               | HIGH       | d3/React conflict, SSR issues, Canvas a11y -- all well-documented with known solutions.            |
| Bundle size estimates  | MEDIUM     | d3-force ~15KB from official docs. Other sizes from bundlephobia/training data.                    |

## Gaps to Address

- **Zoom/pan implementation:** d3-zoom vs vanilla pointer events -- evaluate during Phase 4. Both work; d3-zoom is more feature-complete but adds a dependency.
- **Node icon rendering in SVG:** How to render tech icons (devicon/simple-icons) inside SVG nodes. May need `<foreignObject>` or inline SVG paths. Research during Phase 2 implementation.
- **Mobile graph UX:** Explicitly out of scope per PROJECT.md ("Mobile to decide after desktop"). Will need research when addressed.
- **Color palette for 6 categories:** Need to verify that 6 oklch colors are distinguishable under colorblindness simulations. Test during Phase 2 visual design.

## Sources

- [d3-force official documentation](https://d3js.org/d3-force)
- [react-force-graph GitHub](https://github.com/vasturiano/react-force-graph)
- [Reagraph](https://reagraph.dev/)
- [React Flow: React 19 + Tailwind v4 update](https://reactflow.dev/whats-new/2025-10-28)
- [React Flow accessibility](https://reactflow.dev/learn/advanced-use/accessibility)
- [Sigma.js](https://www.sigmajs.org/)
- [npm trends: graph libraries](https://npmtrends.com/dagre-d3-react-vs-react-flow-vs-react-force-graph-vs-react-graph-vis-vs-react-node-graph-vs-react-vis-force)
- [Cambridge Intelligence: React Graph Visualization](https://cambridge-intelligence.com/react-graph-visualization-library/)
- [Building Network Graph with React and D3](https://www.antstack.com/blog/building-a-simple-network-graph-with-react-and-d3-2/)

---

_Research summary: 2026-03-07_
