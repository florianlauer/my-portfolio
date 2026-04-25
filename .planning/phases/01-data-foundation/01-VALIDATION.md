---
phase: 1
slug: data-foundation
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-07
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property               | Value                                     |
| ---------------------- | ----------------------------------------- |
| **Framework**          | None (TypeScript compilation is the test) |
| **Config file**        | tsconfig.json (existing)                  |
| **Quick run command**  | `npm run build`                           |
| **Full suite command** | `npm run build && npm run lint`           |
| **Estimated runtime**  | ~5 seconds                                |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID  | Plan | Wave | Requirement | Test Type | Automated Command                         | File Exists     | Status  |
| -------- | ---- | ---- | ----------- | --------- | ----------------------------------------- | --------------- | ------- |
| 01-01-01 | 01   | 1    | DATA-01     | build     | `npm run build`                           | N/A (type file) | pending |
| 01-01-02 | 01   | 1    | DATA-02     | build     | `npm run build`                           | Wave 0          | pending |
| 01-01-03 | 01   | 1    | DATA-03     | build     | `npm run build` (enforced by `satisfies`) | N/A             | pending |
| 01-01-04 | 01   | 1    | DATA-04     | build     | `npm run build` (enforced by `satisfies`) | Wave 0          | pending |

_Status: pending · green · red · flaky_

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. TypeScript compilation via `npm run build` with `as const satisfies StackGraph` provides build-time validation for all data correctness. No test runner installation needed.

---

## Manual-Only Verifications

| Behavior                            | Requirement | Why Manual              | Test Instructions                                                                       |
| ----------------------------------- | ----------- | ----------------------- | --------------------------------------------------------------------------------------- |
| oklch colors visible on both themes | DATA-04     | Visual perception check | Open dev server, toggle light/dark mode, verify all 6 family colors are distinguishable |
| Existing Arsenal section unchanged  | DATA-02     | Visual regression       | Navigate to home page, verify StackSection renders identically to before                |

---

## Validation Sign-Off

- [x] All tasks have automated verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 5s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
