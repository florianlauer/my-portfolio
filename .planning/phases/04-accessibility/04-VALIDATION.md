---
phase: 4
slug: accessibility
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-13
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property               | Value                                                       |
| ---------------------- | ----------------------------------------------------------- |
| **Framework**          | None configured (no jest, vitest, or playwright in project) |
| **Config file**        | None — project uses lint + build as quality gates           |
| **Quick run command**  | `npm run lint`                                              |
| **Full suite command** | `npm run build && npm run lint`                             |
| **Estimated runtime**  | ~15 seconds                                                 |

---

## Sampling Rate

- **After every task commit:** Run `npm run lint`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green + manual keyboard/SR walkthrough
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID  | Plan | Wave | Requirement | Test Type   | Automated Command                              | File Exists | Status     |
| -------- | ---- | ---- | ----------- | ----------- | ---------------------------------------------- | ----------- | ---------- |
| 04-01-01 | 01   | 1    | A11Y-01     | manual-only | `npm run lint` (TS/lint check)                 | N/A         | ⬜ pending |
| 04-01-02 | 01   | 1    | A11Y-02     | manual-only | `npm run lint` (TS/lint check)                 | N/A         | ⬜ pending |
| 04-01-03 | 01   | 1    | A11Y-03     | manual-only | `npm run build` (build check)                  | N/A         | ⬜ pending |
| 04-01-04 | 01   | 1    | A11Y-04     | smoke       | `npm run build` (TS check on StackGraphSRList) | ❌ W0       | ⬜ pending |

_Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky_

---

## Wave 0 Requirements

- No test infrastructure gaps — project has no test runner by design
- Manual verification checklist replaces automated tests for a11y behaviors
- Build + lint gate is the automated quality check

_Existing infrastructure covers all phase requirements via build/lint gates._

---

## Manual-Only Verifications

| Behavior                                    | Requirement | Why Manual                               | Test Instructions                                                                                               |
| ------------------------------------------- | ----------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Tab focuses each node with visible ring     | A11Y-01     | Requires keyboard interaction in browser | 1. Open /galerie 2. Press Tab repeatedly 3. Verify each node gets visible focus ring                            |
| Focus triggers tooltip same as hover        | A11Y-02     | Requires keyboard + visual check         | 1. Tab to a node 2. Verify tooltip appears with same content as hover                                           |
| Reduced-motion = static layout              | A11Y-03     | Requires OS accessibility setting        | 1. Enable prefers-reduced-motion in OS/devtools 2. Reload page 3. Verify nodes appear statically (no animation) |
| sr-only list contains all nodes + relations | A11Y-04     | Requires screen reader or DOM inspection | 1. Inspect DOM for sr-only section 2. Verify all nodes listed with labels, levels, connections                  |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
