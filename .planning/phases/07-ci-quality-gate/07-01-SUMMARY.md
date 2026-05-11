# Phase 7 — Plan 07-01 Summary

**Status:** complete
**Date:** 2026-05-11
**Requirements covered:** CI-01, CI-02, CI-03

## What shipped

- `.github/workflows/ci.yml` refactored from a single monolithic `lint-and-build` job (pre-existing on `main`) into **three parallel jobs**:
  - `Lint (oxlint)` → `npm run lint`
  - `Format check (oxfmt)` → `npm run fmt:check` _(new — CI-02 was previously missing)_
  - `Build (next build)` → `npm run build` (with `NEXT_TELEMETRY_DISABLED=1`)
- Trigger surface tightened from `branches: ["**"]` to `pull_request → main` + `push → main` (matches REQUIREMENTS phrasing).
- Added `concurrency` group that cancels stale PR runs while preserving sequential `main` history.
- Added least-privilege `permissions: contents: read`.
- All three jobs share the same setup recipe: `actions/checkout@v4` → `actions/setup-node@v4` (Node 22, `cache: npm`) → `npm ci`.

## Verification evidence

- **Green PR:** https://github.com/florianlauer/my-portfolio/pull/5
- **Green run:** workflow run `25630548489`, `event=pull_request`, `conclusion=success`
- **Wall-clock:** **39 s** (target < 3 min). Per-job timings:
  - `Format check (oxfmt)`: 13:55:47Z → 13:56:09Z (22 s)
  - `Lint (oxlint)`: 13:55:53Z → 13:56:18Z (25 s)
  - `Build (next build)`: 13:55:53Z → 13:56:23Z (30 s)
- **Red-path smoke (closed PR #6):** throwaway branch `phase-7-ci-quality-gate-redpath-smoketest` introduced `debugger;` (lint), no-EOL trailing line (fmt), and `const _smoke: number = "wrong type"` (build). All 3 jobs concluded `failure` (Lint 20s, Fmt 30s, Build 29s). PR closed, branch deleted locally + remotely.

## Out of scope (per REQUIREMENTS.md)

- No test runner integration (Vitest/Jest/Playwright deferred beyond v1.2 — confirmed in REQUIREMENTS "Out of Scope").
- No `.next/cache` action: npm cache alone hits the < 3 min target with plenty of headroom.

## Notes

- Vercel preview checks were already wired on the repo (Vercel app), independent of this workflow — they remain green on PR #5 and are unaffected.
- The pre-existing `lint-and-build` job was implicit covering CI-01 + CI-03 partially (all-branch fan-out, no fmt). This phase replaces it with the spec-aligned shape.
