---
gsd_state_version: 1.0
milestone: v1.0.0
milestone_name: Stack Graph
status: shipped
stopped_at: "v1.0.0 milestone shipped — ready for /gsd-new-milestone"
last_updated: "2026-04-25T17:30:00.000Z"
last_activity: 2026-04-25 -- v1.0.0 milestone closed and archived
progress:
  total_phases: 4
  completed_phases: 4
  total_plans: 7
  completed_plans: 7
  percent: 100
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-25 after v1.0.0)

**Core value:** Le visiteur comprend en un coup d'oeil les relations entre les compétences de Florian
**Current focus:** v1.0.0 shipped — planning next milestone (POLISH or MOBILE)

## Current Position

Milestone: v1.0.0 -- SHIPPED 2026-04-25
Status: All 4 phases complete (7/7 plans), 19/19 v1 requirements validated
Last activity: 2026-04-25 -- v1.0.0 milestone closed and archived

Progress: [██████████] 100%

Next step: `/gsd-new-milestone` to define v1.1+

## Performance Metrics

**Velocity:**

- Total plans completed: 0
- Average duration: -
- Total execution time: 0 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
| ----- | ----- | ----- | -------- |
| -     | -     | -     | -        |

**Recent Trend:**

- Last 5 plans: -
- Trend: -

_Updated after each plan completion_
| Phase 01 P01 | 25min | 2 tasks | 5 files |
| Phase 02 P01 | 3min | 2 tasks | 7 files |
| Phase 02 P02 | 45min | 2 tasks | 6 files |
| Phase 03-interactivity P01 | 12 | 2 tasks | 5 files |
| Phase 03-interactivity P02 | 30min | 2 tasks | 6 files |
| Phase 04-accessibility P01 | 15 | 2 tasks | 3 files |
| Phase 04-accessibility P02 | 10min | 2 tasks | 3 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Research: d3-force (~15KB) for layout computation + React SVG rendering. One new dependency. No Canvas/WebGL.
- Research: SVG chosen over Canvas for native accessibility (tabindex, aria-label, focus events)
- [Phase 01]: Added methods family (TDD, DDD, Hexagonal Architecture, CQRS, Clean Architecture, Microservices) per user request
- [Phase 01]: Simple edges (source/target only) — no type, label, or direction fields
- [Phase 01]: Graph data self-contained — duplicates IDs/labels rather than importing from stack.ts
- [Phase 02]: Used siFastapi for python-fastapi icon (more specific than siPython)
- [Phase 02]: 29/39 nodes have simple-icons; 10 fallback to text-only pills
- [Phase 02]: SVG feDropShadow for glow (more reliable than CSS filter in SVG)
- [Phase 02]: Circles with centered icons instead of pill shapes (cleaner, scales better)
- [Phase 02]: d3-native drag via fx/fy with simulation reheat (elastic links, connected nodes follow)
- [Phase 02]: Removed micro-movement and spring-back -- d3 simulation provides organic feel via drag
- [Phase 03-interactivity]: Attach d3-zoom to bgRectRef not SVG root — prevents node drag conflicts
- [Phase 03-interactivity]: ZoomTransform in ref + direct setAttribute (not useState) — no 60fps re-renders
- [Phase 03-interactivity]: Tooltip position uses innerGRef.getScreenCTM() for accurate coords at all zoom levels
- [Phase 03-interactivity]: filterNodes updates running d3 simulation in-place (no reinit) — sim.nodes + link force + alpha 0.5 restart
- [Phase 03-interactivity]: FILTER_GROUPS: frontend->['frontend','mobile'], backend->['backend','data'], devops->['infra','integrations']; methods always visible
- [Phase 04-accessibility]: SSR default reducedMotion=true (safe): avoids animation flash on hydration
- [Phase 04-accessibility]: simRef stays null in reduced-motion mode — drag handlers no-op via existing (!sim) guards
- [Phase 04-accessibility]: eslint-disable for prefer-tag-over-role on SVG <g> — HTML button cannot be used inside SVG
- [Phase 04-accessibility]: SR list renders filtered nodes (activeNodeIds) so it stays in sync with filter pills

### Pending Todos

None yet.

### Blockers/Concerns

None yet.

## Deferred Items

Items acknowledged and deferred at v1.0.0 milestone close on 2026-04-25:

| Category         | Item                         | Status       | Note                                                                                                                                           |
| ---------------- | ---------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| verification_gap | Phase 02: 02-VERIFICATION.md | gaps_found   | Reduced-motion gap formally closed by Phase 04 (A11Y-03 SATISFIED). Orphaned `use-micro-movement.ts` already removed in commit 009f42e.        |
| verification_gap | Phase 04: 04-VERIFICATION.md | human_needed | 9/9 must-haves verified statically; 6 runtime tests (browser focus ring, OS Reduce Motion, VoiceOver) require manual validation. No code gaps. |

## Session Continuity

Last session: 2026-03-13T18:20:16.682Z
Stopped at: Completed 04-02-PLAN.md: keyboard nav and screen reader accessibility for stack graph
Resume file: None
