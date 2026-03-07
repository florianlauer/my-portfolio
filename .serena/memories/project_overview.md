# Project Overview — my-portfolio

## Purpose

Personal portfolio website for Florian Lauer, Senior Fullstack Engineer. French-language site with three routes:

- `/` — Home (hero, journey, stack, passions, contact sections)
- `/a-propos` — About page
- `/galerie` — Photo gallery (travel photography with masonry grid + lightbox)

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack dev server)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (no tailwind.config.js — uses `@theme inline` in globals.css with oklch CSS custom properties)
- **UI Library**: shadcn/ui (output in `src/components/ui/`)
- **Animations**: Framer Motion (`motion` package), custom scroll-reveal, parallax
- **Fonts**: Fraunces (display/headings) + DM Sans (body) via `next/font/google`
- **Gallery**: `react-responsive-masonry` for masonry layout
- **Icons**: `lucide-react`

## Environment

- **OS**: macOS (Darwin)
- **Node**: v22 via Nix devenv (auto-activated with direnv)
- **Package manager**: npm

## Key Architecture Decisions

- **Server/Client split**: Pages are Server Components; `"use client"` only for hooks/browser APIs/event handlers
- **Content as code**: All site copy in `src/content/*.ts` as typed exports (no CMS, no database)
- **Feature-based components**: `src/components/` organized by feature (hero/, gallery/, home-nav/, etc.)
- **Design tokens**: oklch color palette defined as CSS custom properties in `globals.css` (:root and .dark)
- **BMAD Framework**: Planning artifacts in `_bmad-output/planning-artifacts/`
