# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site in French — Next.js 16 App Router, TypeScript, Tailwind CSS v4, shadcn/ui. Three routes: `/` (home), `/a-propos`, `/galerie`.

## Commands

```bash
npm run dev      # Dev server (Turbopack) — http://localhost:3000
npm run build    # Production build
npm run lint     # oxlint (fast Rust-based linter)
npm run fmt      # oxfmt — format src/ in place
npm run fmt:check # oxfmt — check formatting (CI)
```

No test runner is configured. Linting + formatting are the quality gates.

## Dev Environment

Uses **Nix + devenv** (auto-activated via `direnv`). Do not assume global Node.js — Node 22 is provided by devenv. Run `npm`/`npx`/`node` directly in the terminal.

## Architecture

**Server/Client split:** Pages are Server Components that import typed content and pass it to Client Components. Only add `"use client"` when using hooks, browser APIs, or event handlers.

**Content as code:** All site copy lives in `src/content/*.ts` as typed exports (no CMS, no database). To change text, edit these files.

**Component organization:** Feature-based folders under `src/components/` (e.g. `hero/`, `gallery/`, `home-nav/`, `home-sections/`). `src/components/ui/` is the shadcn/ui output directory — add components with `npx shadcn@latest add <name>`.

**Types:** Shared types in `src/types/`. Each content domain has a matching type file.

## Key Conventions

- **Path alias:** `@/*` maps to `src/*` — always use it for imports.
- **Styling:** Tailwind v4 — uses `@import "tailwindcss"` in `globals.css`, theming via `@theme inline` with oklch CSS custom properties. No `tailwind.config.js`. Use `cn()` from `@/lib/utils` for conditional classes.
- **Animations:** Scroll reveal via `ScrollReveal` component (IntersectionObserver). Parallax via `useScrollY` hook + CSS transforms. `motion` (Framer Motion) is installed for complex animations.
- **SEO:** Metadata exports on pages, JSON-LD in root layout, `robots.ts` and `sitemap.ts` route handlers.
- **Accessibility:** Skip-to-content links, ARIA labels, focus-visible rings. Run Lighthouse/axe audits after visual changes.

## BMAD Framework

The project includes a BMAD (Build Me A Dream) workflow for structured development. Planning artifacts are in `_bmad-output/planning-artifacts/`. Use `/bmad-*` slash commands to invoke BMAD agents (PM, Architect, Dev, etc.).
