---
phase: 2
slug: page-and-graph-rendering
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-08
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property               | Value                                                |
| ---------------------- | ---------------------------------------------------- |
| **Framework**          | None configured (per CLAUDE.md)                      |
| **Config file**        | none                                                 |
| **Quick run command**  | `npm run lint && npm run build`                      |
| **Full suite command** | `npm run lint && npm run fmt:check && npm run build` |
| **Estimated runtime**  | ~30 seconds                                          |

---

## Sampling Rate

- **After every task commit:** Run `npm run lint && npm run build`
- **After every plan wave:** Run `npm run lint && npm run fmt:check && npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID  | Plan | Wave | Requirement | Test Type | Automated Command              | File Exists | Status     |
| -------- | ---- | ---- | ----------- | --------- | ------------------------------ | ----------- | ---------- |
| 02-01-01 | 01   | 1    | PAGE-01     | smoke     | `npm run build`                | N/A         | ⬜ pending |
| 02-01-02 | 01   | 1    | PAGE-02     | manual    | Visual check in browser        | N/A         | ⬜ pending |
| 02-01-03 | 01   | 1    | PAGE-03     | manual    | View source / Lighthouse SEO   | N/A         | ⬜ pending |
| 02-02-01 | 02   | 1    | RENDER-01   | manual    | Visual check in browser        | N/A         | ⬜ pending |
| 02-02-02 | 02   | 1    | RENDER-02   | manual    | Visual check in browser        | N/A         | ⬜ pending |
| 02-02-03 | 02   | 1    | RENDER-03   | smoke     | `npm run build` + visual check | N/A         | ⬜ pending |
| 02-02-04 | 02   | 1    | RENDER-04   | manual    | Visual check in browser        | N/A         | ⬜ pending |

_Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky_

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test runner configured per project conventions. Linting + build are the quality gates.

---

## Manual-Only Verifications

| Behavior                            | Requirement | Why Manual             | Test Instructions                                                       |
| ----------------------------------- | ----------- | ---------------------- | ----------------------------------------------------------------------- |
| HomeNav includes /stack link        | PAGE-02     | Visual UI element      | Navigate to /, verify /stack link in nav                                |
| SEO metadata on /stack              | PAGE-03     | HTML source inspection | View page source, check title/description/OG tags                       |
| Nodes show name, icon, color        | RENDER-01   | Visual SVG rendering   | Open /stack, verify each node has name + icon + category color          |
| Edges connect nodes with curves     | RENDER-02   | Visual SVG rendering   | Open /stack, verify lines/curves between related nodes                  |
| Legend shows categories with colors | RENDER-04   | Visual UI element      | Open /stack, verify legend displays all categories with matching colors |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
