# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site — Next.js 16 App Router, TypeScript, Tailwind CSS v4, shadcn/ui, **next-intl** (FR/EN/DE). Four routes (each with localized variants): `/` (home), `/a-propos` → `/about` / `/uber-mich`, `/galerie` → `/gallery`, `/stack`.

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

Uses **Nix + devenv** (auto-activated via `devenv hook zsh`). Do not assume global Node.js — Node 22 is provided by devenv. Run `npm`/`npx`/`node` directly in the terminal.

## Architecture

**Server/Client split:** Pages are Server Components that import typed content and pass it to Client Components. Only add `"use client"` when using hooks, browser APIs, or event handlers.

**Content strategy (post-i18n):**

- **Locale-bound copy** (titles, descriptions, labels, aria-labels) lives in `src/messages/{fr,en,de}.json` — consumed via `getTranslations` (server) or `useTranslations` (client).
- **Locale-agnostic structural data** (URLs, asset paths, IDs, graph edges, ordering) stays in `src/content/*.ts` as typed exports.
- Adding a translation key requires editing **all three** message files. The runtime warns in dev (`!!!ns.key!!!`) if a key is missing.

**Component organization:** Feature-based folders under `src/components/` (e.g. `home-nav/`, `home-sections/`, `language-switcher/`, `site-footer/`, `gallery/`, `stack-graph/`). `src/components/ui/` is the shadcn/ui output directory — add components with `npx shadcn@latest add <name>`.

**Types:** Shared types in `src/types/`. Each content domain has a matching type file. `global.d.ts` augments next-intl with the `IntlMessages` interface for typed `t()` keys (typo-safe at compile time).

## i18n

- **Routing:** `src/i18n/routing.ts` defines `locales`, `defaultLocale`, and the typed `pathnames` map. Source paths (`/`, `/a-propos`, `/galerie`, `/stack`) are exported via `SourcePath` and `SOURCE_PATHS` — do **not** duplicate this list elsewhere.
- **Middleware:** `src/proxy.ts` (Next.js 16 convention) — `next-intl/middleware` validates locale and redirects.
- **Server config:** `src/i18n/request.ts` loads the locale's messages JSON; `onError`/`getMessageFallback` surface missing keys in dev.
- **Page helpers:** `src/i18n/params.ts` exports `resolveLocaleOr404(params)` (default page export) and `resolveLocaleOrDefault(params)` (`generateMetadata`).
- **Navigation:** import `Link`, `useRouter`, `usePathname`, `getPathname`, `localeHref` from `@/i18n/navigation` — never the raw `next/link` / `next/navigation` for app routes.
- **Metadata:** `buildAlternates(sourcePath, locale)` returns canonical + hreflang alternates (incl. `x-default`). Sitemap consumes the same helper.
- **Locale display:** flag/code/native/og labels live in `src/i18n/localeMeta.ts` — single source for the language switcher and footer.
- **`<html lang>`:** set in `src/app/[locale]/layout.tsx` from the validated route segment (never from a cookie).
- **Adding a route:** add the entry in `routing.ts:pathnames`, create `src/app/[locale]/<route>/page.tsx`, add the priority in `src/app/sitemap.ts:PRIORITY_BY_PATH` (TS will require it).

## Key Conventions

- **Path alias:** `@/*` maps to `src/*` — always use it for imports.
- **Styling:** Tailwind v4 — uses `@import "tailwindcss"` in `globals.css`, theming via `@theme inline` with oklch CSS custom properties. No `tailwind.config.js`. Use `cn()` from `@/lib/utils` for conditional classes.
- **Animations:** Scroll reveal via `ScrollReveal` (IntersectionObserver). Parallax via `useScrollY` hook + CSS transforms. `motion` (Framer Motion) is installed for complex animations.
- **SEO:** `generateMetadata` per page, JSON-LD in `[locale]/layout.tsx`, `robots.ts` and `sitemap.ts` route handlers (multilingual with hreflang `x-default`).
- **Accessibility:** Skip-to-content links (translated), ARIA labels (translated), focus-visible rings, ≥44×44 touch targets on interactive elements. Run Lighthouse/axe audits after visual changes.

## BMAD Framework

The project includes a BMAD (Build Me A Dream) workflow for structured development. Planning artifacts are in `_bmad-output/planning-artifacts/`. Use `/bmad-*` slash commands to invoke BMAD agents (PM, Architect, Dev, etc.).
