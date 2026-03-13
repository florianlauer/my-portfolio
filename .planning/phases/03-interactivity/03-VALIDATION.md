---
phase: 3
slug: interactivity
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-13
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property               | Value                                       |
| ---------------------- | ------------------------------------------- |
| **Framework**          | None configured — no test runner in project |
| **Config file**        | N/A                                         |
| **Quick run command**  | `npm run lint`                              |
| **Full suite command** | `npm run lint && npm run build`             |
| **Estimated runtime**  | ~15 seconds                                 |

---

## Sampling Rate

- **After every task commit:** Run `npm run lint`
- **After every plan wave:** Run `npm run lint && npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID  | Plan | Wave | Requirement | Test Type      | Automated Command | File Exists | Status     |
| -------- | ---- | ---- | ----------- | -------------- | ----------------- | ----------- | ---------- |
| 03-01-XX | 01   | 1    | INTER-01    | manual + build | `npm run build`   | N/A         | ⬜ pending |
| 03-02-XX | 02   | 1    | INTER-02    | manual + build | `npm run build`   | N/A         | ⬜ pending |
| 03-03-XX | 03   | 1    | INTER-03    | manual + build | `npm run build`   | N/A         | ⬜ pending |
| 03-04-XX | 04   | 2    | INTER-04    | manual + build | `npm run build`   | N/A         | ⬜ pending |

_Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky_

---

## Wave 0 Requirements

_Existing infrastructure covers all phase requirements._

No test framework installation needed. Quality gates are oxlint + TypeScript build.

---

## Manual-Only Verifications

| Behavior                                                              | Requirement | Why Manual                                 | Test Instructions                                                |
| --------------------------------------------------------------------- | ----------- | ------------------------------------------ | ---------------------------------------------------------------- |
| Tooltip renders with node details (level, description, neighbor tags) | INTER-01    | Visual/interactive SVG overlay positioning | Hover nodes, verify content, check positioning near edges        |
| Zoom 0.5x–3x via scroll, pan via drag, double-click reset             | INTER-02    | Browser zoom/pan interaction               | Scroll to zoom, drag background to pan, double-click to reset    |
| Click-to-focus: node + neighbors opaque, rest dimmed, bg click clears | INTER-03    | Visual opacity interaction                 | Click node, verify dimming, click background to clear            |
| Filter pills toggle node groups, simulation reflows smoothly          | INTER-04    | Visual filter + d3-force reflow            | Toggle each filter, verify nodes appear/disappear with animation |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
