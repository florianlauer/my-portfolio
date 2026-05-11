# Phase 7: CI Quality Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a GitHub Actions workflow that fails PRs to `main` (and direct pushes to `main`) when `npm run lint`, `npm run fmt:check`, or `npm run build` fail — total run < 3 min with `npm` cache.

**Architecture:** Single workflow file `.github/workflows/ci.yml` declaring three independent parallel jobs (`lint`, `fmt-check`, `build`). Each job runs on `ubuntu-latest`, shares the same setup recipe (checkout → `actions/setup-node@v4` with Node 22 + `cache: npm` keyed on `package-lock.json` → `npm ci`), then runs its single npm script. Triggers: `pull_request` against `main` and `push` on `main`. No matrix; no test runner (per `CLAUDE.md`: "No test runner is configured. Linting + formatting are the quality gates.").

**Tech Stack:** GitHub Actions, `actions/checkout@v4`, `actions/setup-node@v4`, Node 22 (matches `devenv.nix`), npm 10 (bundled), `oxlint` 10.9, `oxfmt` 10.9, `next build` (Next.js 16.1.6).

**Requirements covered:** CI-01 (lint), CI-02 (fmt:check), CI-03 (build). Tracked in `.planning/REQUIREMENTS.md` rows 68–70.

---

## File Structure

| File                                                   | Action                     | Responsibility                                                                                                               |
| ------------------------------------------------------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/ci.yml`                             | Create                     | Workflow with 3 parallel jobs (lint, fmt-check, build); triggers on `pull_request` (target `main`) + `push` (branch `main`). |
| `.planning/REQUIREMENTS.md`                            | Modify (rows 15–23, 68–70) | Tick CI-01..03 checkboxes + flip status column from `not-started` to `complete`.                                             |
| `.planning/STATE.md`                                   | Modify                     | Advance phase-7 status from `defining-requirements` to `in-progress` then `complete`.                                        |
| `.planning/phases/07-ci-quality-gate/07-01-SUMMARY.md` | Create                     | One-page summary referencing this plan + verification evidence (PR URL, run timing).                                         |

No source files under `src/` are touched — this phase is infrastructure only.

---

## Task 1: Author the CI workflow

**Files:**

- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Write the workflow file**

Create `.github/workflows/ci.yml` with the following content (verbatim):

```yaml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

concurrency:
  group: ci-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: ${{ github.event_name == 'pull_request' }}

permissions:
  contents: read

jobs:
  lint:
    name: Lint (oxlint)
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run oxlint
        run: npm run lint

  fmt-check:
    name: Format check (oxfmt)
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run oxfmt --check
        run: npm run fmt:check

  build:
    name: Build (next build)
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build Next.js app
        run: npm run build
        env:
          NEXT_TELEMETRY_DISABLED: 1
```

Key choices baked into the workflow:

- `concurrency` cancels older PR runs on push, but keeps `main` runs sequential (`cancel-in-progress` evaluates `false` for `push` events) — protects history of `main` checks.
- `permissions: contents: read` — minimum scope, no write back to repo.
- Three independent jobs run in parallel — total wall-clock ≈ slowest job (build), well under the 3 min budget.
- `cache: npm` on `setup-node@v4` automatically keys on `package-lock.json` hash and restores `~/.npm`, so `npm ci` is fast on warm runs.
- `NEXT_TELEMETRY_DISABLED: 1` removes the interactive telemetry prompt that can stall CI on first run.

- [ ] **Step 2: Validate YAML syntax locally**

Run from the worktree root:

```bash
python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/ci.yml')); print('YAML OK')"
```

Expected output:

```
YAML OK
```

If it errors with a `yaml.YAMLError`, fix the indentation/quoting and re-run.

- [ ] **Step 3: Verify each job command runs locally**

Each CI job invokes one npm script. Run all three locally to confirm a green baseline before pushing — a red local result means red CI, no need to spend a minute waiting.

```bash
npm run lint && echo "lint OK"
npm run fmt:check && echo "fmt:check OK"
npm run build && echo "build OK"
```

Expected: every command exits 0, prints its `OK` echo. If any fails, fix the underlying source/format issue (do **not** edit the workflow to mask it).

- [ ] **Step 4: Commit the workflow**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add lint/fmt/build workflow (CI-01, CI-02, CI-03)"
```

---

## Task 2: Push and observe a green run on the feature branch

The workflow only runs on `pull_request → main` or `push → main`. To exercise it before merging, open the PR — that triggers the `pull_request` event.

**Files:** none (read-only verification).

- [ ] **Step 1: Push the branch**

```bash
git push -u origin phase-7-ci-quality-gate
```

Expected: branch is created on `origin`; no workflow run yet (still on a feature branch, not `main`).

- [ ] **Step 2: Open the PR**

```bash
gh pr create \
  --base main \
  --head phase-7-ci-quality-gate \
  --title "ci: add lint/fmt/build quality gate (CI-01..03)" \
  --body "$(cat <<'EOF'
## Summary
- Adds `.github/workflows/ci.yml` with three parallel jobs: lint (oxlint), fmt-check (oxfmt), build (next build).
- Triggers on PR → main and direct push → main.
- Node 22 + npm cache via `actions/setup-node@v4`.

## Test plan
- [ ] All three checks turn green on this PR.
- [ ] Total run time < 3 min (sum across jobs in parallel).
- [ ] Smoke test: red paths verified on a throwaway branch (see plan Task 3).

Closes the CI gate items of milestone v1.2 (CI-01, CI-02, CI-03).
EOF
)"
```

Expected: `gh` prints the PR URL. The PR should immediately schedule a workflow run.

- [ ] **Step 3: Watch the workflow run**

```bash
gh pr checks --watch
```

Expected: three checks named `Lint (oxlint)`, `Format check (oxfmt)`, `Build (next build)` all conclude `success`. Wall-clock < 3 min.

If any job fails, read the log:

```bash
gh run list --branch phase-7-ci-quality-gate --limit 1
gh run view <run-id> --log-failed
```

Fix the underlying problem on the branch, push, and re-watch.

- [ ] **Step 4: Capture the run timing for the SUMMARY**

```bash
gh run list --branch phase-7-ci-quality-gate --limit 1 --json databaseId,createdAt,updatedAt,conclusion,name
```

Save the JSON output for use in Task 4 (`07-01-SUMMARY.md`).

---

## Task 3: Smoke-test the red paths on a throwaway branch

Success criteria 2–4 from `ROADMAP.md` require evidence that each job actually **fails** when its quality gate is violated. We verify this once on a disposable branch, then discard it. This protects the green main branch from "looks green, never tested red" pitfalls.

**Files:** none persistent — all changes are reverted at end of task.

- [ ] **Step 1: Create the throwaway branch from `phase-7-ci-quality-gate`**

```bash
git checkout phase-7-ci-quality-gate
git checkout -b phase-7-ci-quality-gate-redpath-smoketest
```

- [ ] **Step 2: Introduce a guaranteed lint failure**

Pick a non-load-bearing source file and add an unused variable that `oxlint` will reject. Example — append the following at the top of `src/lib/utils.ts` (after existing imports, before `cn`):

```ts
const _ci_lint_smoke = "violates no-unused-vars";
```

Verify locally:

```bash
npm run lint
```

Expected: exits non-zero with a diagnostic mentioning `_ci_lint_smoke` (or whichever rule fires first). If oxlint exits 0, change the violation (e.g., add `debugger;` inside an exported function) until lint exits non-zero.

- [ ] **Step 3: Introduce a guaranteed format failure**

Append a line with mixed indentation / trailing whitespace to the same file, e.g. add:

```ts
const _ci_fmt_smoke = 1;
```

(Three spaces of indent + a trailing tab — oxfmt will rewrite this.) Verify:

```bash
npm run fmt:check
```

Expected: exits non-zero, prints "would format" or similar diff output.

- [ ] **Step 4: Introduce a guaranteed build failure**

In the same file, add a deliberate TypeScript error:

```ts
const _ci_build_smoke: number = "not a number";
```

Verify:

```bash
npm run build
```

Expected: exits non-zero with TS2322 (Type 'string' is not assignable to type 'number').

- [ ] **Step 5: Push the throwaway branch and open a draft PR**

```bash
git add src/lib/utils.ts
git commit -m "test(ci): smoke red paths — DO NOT MERGE"
git push -u origin phase-7-ci-quality-gate-redpath-smoketest
gh pr create \
  --draft \
  --base main \
  --head phase-7-ci-quality-gate-redpath-smoketest \
  --title "[SMOKE — DO NOT MERGE] CI red-path verification" \
  --body "Throwaway PR to confirm lint/fmt/build all fail when the source violates each gate. Will be closed after verification."
```

Expected: PR opens; workflow scheduled.

- [ ] **Step 6: Confirm all three checks fail**

```bash
gh pr checks --watch
```

Expected: all three checks conclude `failure`. If any check passes, the smoke condition for that gate isn't strong enough — strengthen the violation and re-push.

- [ ] **Step 7: Close the draft PR and delete the throwaway branch**

```bash
gh pr close phase-7-ci-quality-gate-redpath-smoketest --delete-branch
git checkout phase-7-ci-quality-gate
git branch -D phase-7-ci-quality-gate-redpath-smoketest
```

Expected: draft PR closed, both local and remote throwaway branches removed. The original `phase-7-ci-quality-gate` PR is unaffected.

---

## Task 4: Update planning artifacts and write the phase summary

**Files:**

- Create: `.planning/phases/07-ci-quality-gate/07-01-SUMMARY.md`
- Modify: `.planning/REQUIREMENTS.md` (rows 15–23 and traceability table rows 68–70)
- Modify: `.planning/STATE.md` (current phase status)
- Modify: `.planning/ROADMAP.md` (Phase 7 plan checkbox + Progress table row)

- [ ] **Step 1: Create the phase directory and summary**

```bash
mkdir -p .planning/phases/07-ci-quality-gate
```

Then create `.planning/phases/07-ci-quality-gate/07-01-SUMMARY.md` (use the run timing JSON captured in Task 2 Step 4 — substitute the placeholder values):

```markdown
# Phase 7 — Plan 07-01 Summary

**Status:** complete
**Date:** 2026-05-10
**Requirements covered:** CI-01, CI-02, CI-03

## What shipped

- `.github/workflows/ci.yml` — three parallel jobs (lint, fmt-check, build), Node 22, npm cache.
- Triggers: `pull_request` → `main`, `push` → `main`.
- Concurrency group cancels stale PR runs; main branch runs preserved.

## Verification evidence

- Green PR: <PR URL from Task 2 Step 2>
- Run wall-clock: <duration from Task 2 Step 4 JSON> (target < 3 min)
- Red-path smoke: each gate confirmed to fail on a throwaway PR (closed, branch deleted).

## Out of scope (per REQUIREMENTS.md)

- No test runner integration (Vitest/Jest/Playwright deferred beyond v1.2).
- No `.next/cache` action — npm cache alone hits the < 3 min target.
```

- [ ] **Step 2: Update `REQUIREMENTS.md`**

Modify `.planning/REQUIREMENTS.md`:

1. Rows 15, 18, 21 — flip `- [ ] **CI-0X**` to `- [x] **CI-0X**`.
2. Rows 68–70 — change the `Status` column from `not-started` to `complete` for CI-01, CI-02, CI-03.

Use the `Edit` tool with `replace_all: false`, three separate edits — the unique left-hand strings are the full requirement bullets and the full table rows.

- [ ] **Step 3: Update `STATE.md`**

Bump the current-phase status field from whatever indicates "phase 7 in progress" to "phase 7 complete; phase 8 not started" — concrete edit depends on the file's current shape; read it first, then perform a single targeted `Edit`.

- [ ] **Step 4: Update `ROADMAP.md`**

In `.planning/ROADMAP.md`:

1. Row 44 — flip `- [ ] 07-01: GitHub Actions workflow ...` to `- [x] 07-01: GitHub Actions workflow ...`.
2. Row 86 (Progress table) — change Phase 7's `Plans Complete` from `0/1` to `1/1`, `Status` from `Not started` to `Complete`, `Completed` from `—` to `2026-05-10`.

- [ ] **Step 5: Commit the planning updates**

```bash
git add .planning/REQUIREMENTS.md .planning/STATE.md .planning/ROADMAP.md .planning/phases/07-ci-quality-gate/07-01-SUMMARY.md
git commit -m "docs(planning): mark phase 7 (CI quality gate) complete"
```

- [ ] **Step 6: Push and confirm the workflow re-runs green**

```bash
git push
gh pr checks --watch
```

Expected: the PR's three checks remain green after the planning commit (it touches only `.planning/` and `docs/`, which lint/fmt/build all ignore — but verifying confirms no accidental scope creep).

---

## Task 5: Land the PR

**Files:** none (merge-only).

- [ ] **Step 1: Confirm PR is mergeable and all checks green**

```bash
gh pr view --json mergeable,statusCheckRollup
```

Expected: `mergeable: "MERGEABLE"`, every check entry has `conclusion: "SUCCESS"`.

- [ ] **Step 2: Squash-merge the PR**

```bash
gh pr merge --squash --delete-branch
```

Expected: PR merged, remote feature branch deleted.

- [ ] **Step 3: Verify the workflow runs on `main` after merge**

```bash
git checkout main
git pull --ff-only
gh run list --branch main --limit 1
```

Expected: a new `CI` run on `main` triggered by the merge commit; it should also conclude green.

- [ ] **Step 4: Clean up the local worktree**

```bash
cd /Users/florianlauer/Documents/perso/my-portfolio
git worktree remove .worktrees/phase-7-ci-quality-gate
git branch -D phase-7-ci-quality-gate
```

Expected: worktree directory removed, local branch deleted, `git worktree list` no longer shows it.

---

## Self-review notes (post-write)

- **Spec coverage:** CI-01 → Task 1 lint job + Task 3 Step 2 smoke; CI-02 → Task 1 fmt-check job + Task 3 Step 3 smoke; CI-03 → Task 1 build job + Task 3 Step 4 smoke. Success criteria 1–5 from ROADMAP rows 47–52 all addressed (trigger config in Task 1; per-gate failure in Task 3; timing target verified in Task 2 Step 4).
- **Placeholder scan:** no TBD/TODO; every code block is concrete; the only fields filled at execution time are the PR URL and the run-duration JSON values, which are runtime artifacts, not placeholders.
- **Type/name consistency:** job IDs `lint` / `fmt-check` / `build` and display names `Lint (oxlint)` / `Format check (oxfmt)` / `Build (next build)` are reused identically across Tasks 1, 2, 3, 4.
