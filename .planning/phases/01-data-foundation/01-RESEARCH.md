# Phase 1: Data Foundation - Research

**Researched:** 2026-03-07
**Domain:** TypeScript data modeling, content-as-code pattern
**Confidence:** HIGH

## Summary

Phase 1 is a pure data-authoring phase with no external dependencies, no runtime code, and no UI. The work consists of defining TypeScript types for graph nodes and edges, then populating a content file with 31 technology nodes and ~30-40 edges. The existing `src/content/stack.ts` and `src/types/stack.ts` must remain untouched.

The project already follows a well-established "content as code" pattern: typed exports in `src/content/*.ts` with matching type files in `src/types/*.ts`. Phase 1 simply extends this pattern with two new files: `src/types/stack-graph.ts` and `src/content/stack-graph.ts`.

**Primary recommendation:** Mirror the existing content-as-code pattern exactly. Use `as const satisfies` for type-safe content with literal inference. Define oklch colors as strings matching the site's existing color system.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

- 6 families preserved: frontend, mobile, backend, data, infra, integrations (each with distinct color)
- All 31 existing technologies kept as-is, no additions or removals
- 4 experience levels in French: Expert, Avance, Intermediaire, Notions
- Level visible only in tooltip (not on node badge)
- Simple connections (no edge types, no labels on links)
- Non-directed edges (simple lines, no arrows)
- Strong links only (~30-40 edges) -- direct and obvious relations
- Cross-family edges allowed
- Descriptions in French with English tech terms, mixed tone (factual + personal touch)
- Claude proposes initial level assignments and descriptions, user validates

### Claude's Discretion

- Color choices per family (oklch custom or Tailwind values, depending on SVG rendering and theme coherence)
- Exact description length per technology
- Initial experience level attribution (subject to validation)
- Specific relation choices between technologies (subject to validation)

### Deferred Ideas (OUT OF SCOPE)

None -- discussion stayed within phase scope

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID      | Description                                                                                                   | Research Support                                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| DATA-01 | Types TypeScript pour noeuds (id, nom, icone, categorie, niveau, description) et edges (source, target, type) | Type definitions in `src/types/stack-graph.ts` -- see Architecture Patterns section   |
| DATA-02 | Contenu graph dans `src/content/stack-graph.ts` avec relations entre technos                                  | Content file with `as const satisfies` pattern -- see Code Examples section           |
| DATA-03 | Niveaux d'experience par techno (expert, advanced, intermediate)                                              | 4 levels (Expert, Avance, Intermediaire, Notions) as union type -- see Standard Stack |
| DATA-04 | Categories couleur par domaine avec code oklch                                                                | 6 family colors in oklch format -- see Architecture Patterns color section            |

</phase_requirements>

## Standard Stack

### Core

No external libraries needed. This phase uses only TypeScript's type system and the project's existing patterns.

| Tool                 | Version           | Purpose                                  | Why Standard                      |
| -------------------- | ----------------- | ---------------------------------------- | --------------------------------- |
| TypeScript           | (project version) | Type definitions                         | Already in project                |
| `as const satisfies` | TS 4.9+           | Type-safe content with literal inference | Project pattern for typed content |

### Supporting

None needed. No runtime dependencies for this phase.

### Alternatives Considered

| Instead of                 | Could Use               | Tradeoff                                                                                                                                         |
| -------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Inline oklch strings       | CSS custom properties   | Custom properties would couple data to CSS; inline oklch strings keep content self-contained and match the site's existing `globals.css` pattern |
| Separate nodes/edges files | Single `stack-graph.ts` | Single file is simpler for ~31 nodes + ~35 edges; split only if file exceeds ~300 lines                                                          |

## Architecture Patterns

### Recommended File Structure

```
src/
├── types/
│   ├── stack.ts           # EXISTING — do NOT modify
│   └── stack-graph.ts     # NEW — graph-specific types
├── content/
│   ├── stack.ts           # EXISTING — do NOT modify
│   └── stack-graph.ts     # NEW — graph data (nodes + edges)
```

### Pattern 1: Type Definitions (`src/types/stack-graph.ts`)

**What:** Define node, edge, and supporting types for the graph data model.
**When to use:** Always -- this is the single source of truth for graph data shape.

```typescript
import type { StackFamilyKey } from "@/types/stack";

/** Experience levels in French, ordered from highest to lowest */
export type ExperienceLevel = "Expert" | "Avancé" | "Intermédiaire" | "Notions";

/** Each family maps to a distinct oklch color for SVG rendering */
export type FamilyColor = {
  family: StackFamilyKey;
  label: string;
  color: string; // oklch value, e.g. "oklch(0.75 0.18 55)"
};

/** A technology node in the graph */
export type GraphNode = {
  id: string;
  label: string;
  family: StackFamilyKey;
  level: ExperienceLevel;
  description: string;
};

/** An undirected edge between two nodes */
export type GraphEdge = {
  source: string; // node id
  target: string; // node id
};

/** The complete graph dataset */
export type StackGraph = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  familyColors: FamilyColor[];
};
```

**Key decisions reflected in types:**

- `GraphEdge` has no `type` field (user decided: simple connections, no edge types)
- `ExperienceLevel` uses French labels with accents (user decided: 4 levels in French)
- `FamilyColor` is separate from node to avoid duplication across 31 nodes
- Reuses `StackFamilyKey` from existing types (maintains consistency, no duplication)

### Pattern 2: Content File (`src/content/stack-graph.ts`)

**What:** Export the complete graph dataset with `as const satisfies` for type safety.
**When to use:** Always -- single export consumed by Phase 2 rendering components.

```typescript
import type { StackGraph } from "@/types/stack-graph";

export const stackGraph = {
  familyColors: [
    { family: "frontend", label: "Frontend", color: "oklch(0.75 0.18 85)" },
    // ... 5 more families
  ],
  nodes: [
    {
      id: "react",
      label: "React",
      family: "frontend",
      level: "Expert",
      description: "Ma bibliothèque UI principale — ...",
    },
    // ... 30 more nodes
  ],
  edges: [
    { source: "react", target: "typescript" },
    { source: "react", target: "nextjs" },
    // ... ~33 more edges
  ],
} as const satisfies StackGraph;
```

### Pattern 3: Color System (oklch for SVG)

**What:** 6 distinct oklch colors that work on both light and dark backgrounds.
**Context:** The site uses oklch throughout (`globals.css`). The existing StackSection uses Tailwind color names (amber, orange, sky, cyan, teal, violet). For SVG rendering in Phase 2, we need raw oklch values.

**Recommended color mapping** (inspired by existing Tailwind accents):

| Family       | Existing Tailwind | Recommended oklch      | Hue angle         |
| ------------ | ----------------- | ---------------------- | ----------------- |
| frontend     | amber-500         | `oklch(0.75 0.18 85)`  | ~85 (warm yellow) |
| mobile       | orange-500        | `oklch(0.70 0.19 55)`  | ~55 (orange)      |
| backend      | sky-500           | `oklch(0.68 0.16 230)` | ~230 (blue)       |
| data         | cyan-500          | `oklch(0.72 0.14 195)` | ~195 (cyan)       |
| infra        | teal-500          | `oklch(0.70 0.14 170)` | ~170 (teal)       |
| integrations | violet-500        | `oklch(0.65 0.20 300)` | ~300 (violet)     |

**Rationale:** Hue angles spread across the oklch wheel for maximum distinguishability. Lightness kept in 0.65-0.75 range for good contrast on both light (bg ~0.93) and dark (bg ~0.22) themes.

### Anti-Patterns to Avoid

- **Coupling graph data to stack.ts:** Do NOT import from `stack.ts` in `stack-graph.ts`. Duplicate the node IDs and labels. This keeps the graph self-contained and avoids breaking the existing Arsenal section if graph data evolves.
- **Over-engineering edge types:** The user explicitly decided "simple connections, no types." Do not add `type`, `weight`, `label`, or `direction` fields to edges.
- **Using numeric enums for levels:** Use string literal union types ("Expert" | "Avance" | ...) not numeric values. The levels are display labels, not data for computation.

## Don't Hand-Roll

| Problem            | Don't Build          | Use Instead                     | Why                                            |
| ------------------ | -------------------- | ------------------------------- | ---------------------------------------------- |
| Node ID validation | Runtime ID validator | TypeScript `as const satisfies` | Catches typos at build time, zero runtime cost |
| Color format       | Custom color class   | Plain oklch strings             | CSS/SVG consume raw strings; no parsing needed |
| Content i18n       | Translation system   | Inline French text              | Single-language site, no i18n needed           |

**Key insight:** This phase has zero runtime complexity. Everything is static typed data. The only "validation" needed is TypeScript compilation.

## Common Pitfalls

### Pitfall 1: Orphan Edge References

**What goes wrong:** An edge references a node ID that doesn't exist (typo in source/target).
**Why it happens:** Node IDs are strings; easy to mistype "python-fastapi" as "python_fastapi".
**How to avoid:** Extract node IDs as a union type from the nodes array using `typeof nodes[number]["id"]`, then type edges against it. Alternatively, a simple build-time check.
**Warning signs:** Graph renders with missing connections or errors in Phase 2.

### Pitfall 2: Forgetting Accented Characters in Levels

**What goes wrong:** Type mismatch between "Avance" and "Avancé" or "Intermediaire" and "Intermédiaire".
**Why it happens:** French accents in TypeScript string literals.
**How to avoid:** Use the canonical accented forms in the type definition. Copy-paste from the type, don't retype.

### Pitfall 3: Breaking Existing Stack Imports

**What goes wrong:** Modifying `src/content/stack.ts` or `src/types/stack.ts` breaks the home page Arsenal section.
**Why it happens:** Temptation to "improve" existing types to serve both systems.
**How to avoid:** Treat existing files as read-only. New graph types live in separate files. Only import FROM `src/types/stack.ts` (the `StackFamilyKey` type), never modify it.

### Pitfall 4: oklch Colors Not Visible on Both Themes

**What goes wrong:** Colors that look great on light mode are invisible on dark mode (or vice versa).
**Why it happens:** Light bg is oklch(0.93 ...), dark bg is oklch(0.22 ...). A color with lightness 0.90 disappears on light.
**How to avoid:** Keep family color lightness in the 0.60-0.75 range. This provides sufficient contrast ratio on both backgrounds. Phase 2 may add slight lightness adjustments for dark mode.

## Code Examples

### Complete Type File

```typescript
// src/types/stack-graph.ts
import type { StackFamilyKey } from "@/types/stack";

export type ExperienceLevel = "Expert" | "Avancé" | "Intermédiaire" | "Notions";

export type FamilyColor = {
  family: StackFamilyKey;
  label: string;
  color: string;
};

export type GraphNode = {
  id: string;
  label: string;
  family: StackFamilyKey;
  level: ExperienceLevel;
  description: string;
};

export type GraphEdge = {
  source: string;
  target: string;
};

export type StackGraph = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  familyColors: FamilyColor[];
};
```

### Content File Structure (abbreviated)

```typescript
// src/content/stack-graph.ts
import type { StackGraph } from "@/types/stack-graph";

export const stackGraph = {
  familyColors: [
    { family: "frontend", label: "Frontend", color: "oklch(0.75 0.18 85)" },
    { family: "mobile", label: "Mobile", color: "oklch(0.70 0.19 55)" },
    { family: "backend", label: "Backend & API", color: "oklch(0.68 0.16 230)" },
    { family: "data", label: "Data", color: "oklch(0.72 0.14 195)" },
    { family: "infra", label: "Infra / DevOps", color: "oklch(0.70 0.14 170)" },
    { family: "integrations", label: "Intégrations SaaS", color: "oklch(0.65 0.20 300)" },
  ],
  nodes: [
    // -- Frontend (7) --
    { id: "react", label: "React", family: "frontend", level: "Expert", description: "..." },
    // ... all 31 nodes
  ],
  edges: [
    // -- Within frontend --
    { source: "react", target: "nextjs" },
    { source: "react", target: "typescript" },
    // -- Cross-family --
    { source: "react", target: "nodejs" },
    // ... ~30-40 total edges
  ],
} as const satisfies StackGraph;
```

### Type-Safe Edge Validation (optional enhancement)

```typescript
// If we want compile-time edge validation:
type NodeId = (typeof stackGraph.nodes)[number]["id"];

// This would catch typos -- but requires nodes to be defined before edges
// Alternative: a simple build-time assertion function
function validateEdges(graph: StackGraph): void {
  const nodeIds = new Set(graph.nodes.map((n) => n.id));
  for (const edge of graph.edges) {
    if (!nodeIds.has(edge.source)) throw new Error(`Unknown source: ${edge.source}`);
    if (!nodeIds.has(edge.target)) throw new Error(`Unknown target: ${edge.target}`);
  }
}
```

## State of the Art

| Old Approach                | Current Approach                  | When Changed       | Impact                                             |
| --------------------------- | --------------------------------- | ------------------ | -------------------------------------------------- |
| `tailwind.config.js` colors | `@theme inline` with oklch in CSS | Tailwind v4 (2025) | Colors defined as oklch in globals.css, not config |
| `as const` alone            | `as const satisfies Type`         | TS 4.9 (2022)      | Best of both: literal inference + type checking    |

**Deprecated/outdated:**

- Tailwind v3 config-based theming is not used in this project (v4 CSS-based approach)

## Open Questions

1. **Edge validation at build time**
   - What we know: TypeScript can validate edge source/target against node IDs using `typeof` extraction
   - What's unclear: Whether this adds enough value for ~35 edges vs. a simple runtime assertion
   - Recommendation: Use `as const satisfies` for structure validation; add a dev-only assertion function for edge ID validation. Keep it simple.

2. **Dark mode color adjustments**
   - What we know: Single oklch value per family stored in data. Phase 2 SVG rendering may need different lightness for dark mode.
   - What's unclear: Whether to store both light/dark colors in data or handle in CSS/rendering
   - Recommendation: Store one color per family (optimized for both themes). Phase 2 can adjust lightness programmatically if needed. Don't over-engineer the data model.

## Validation Architecture

### Test Framework

| Property           | Value                                                           |
| ------------------ | --------------------------------------------------------------- |
| Framework          | None configured (per CLAUDE.md: "No test runner is configured") |
| Config file        | none                                                            |
| Quick run command  | `npm run build` (TypeScript compilation)                        |
| Full suite command | `npm run build && npm run lint`                                 |

### Phase Requirements -> Test Map

| Req ID  | Behavior                             | Test Type | Automated Command                         | File Exists?     |
| ------- | ------------------------------------ | --------- | ----------------------------------------- | ---------------- |
| DATA-01 | Types compile without errors         | build     | `npm run build`                           | N/A (type files) |
| DATA-02 | Content file exports valid graph     | build     | `npm run build`                           | Wave 0           |
| DATA-03 | Each node has valid experience level | build     | `npm run build` (enforced by `satisfies`) | N/A              |
| DATA-04 | Each family has oklch color          | build     | `npm run build` (enforced by `satisfies`) | Wave 0           |

### Sampling Rate

- **Per task commit:** `npm run build`
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** `npm run build && npm run lint` both green

### Wave 0 Gaps

None -- TypeScript compilation via `npm run build` is sufficient validation for a data-only phase. The `as const satisfies StackGraph` pattern ensures type correctness at build time. No test runner needed.

## Sources

### Primary (HIGH confidence)

- `src/content/stack.ts` -- existing content pattern, 31 technologies in 6 families (read directly)
- `src/types/stack.ts` -- existing type pattern with `StackFamilyKey`, `StackItem`, `StackGroup` (read directly)
- `src/app/globals.css` -- oklch color system, light/dark theme values (read directly)
- `src/components/home-sections/StackSection.tsx` -- `familyAccent` mapping with Tailwind colors (read directly)

### Secondary (MEDIUM confidence)

- oklch color recommendations: derived from existing Tailwind accent mapping + oklch color space knowledge

### Tertiary (LOW confidence)

- None

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH -- no external dependencies, pure TypeScript
- Architecture: HIGH -- mirrors existing project patterns exactly
- Pitfalls: HIGH -- identified from direct code analysis
- Colors: MEDIUM -- oklch values are recommendations subject to visual validation

**Research date:** 2026-03-07
**Valid until:** Indefinite (pure data modeling, no API/library versioning concerns)
