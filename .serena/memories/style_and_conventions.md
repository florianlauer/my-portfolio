# Code Style & Conventions

## TypeScript
- Strict TypeScript throughout
- Shared types in `src/types/` with dedicated type files per domain
- Path alias: `@/*` maps to `src/*` — always use it for imports
- Use `type` imports where possible (`import type { X } from ...`)

## React / Next.js
- Pages are Server Components by default
- Only add `"use client"` when using hooks, browser APIs, or event handlers
- Explicit return types on components (`: React.JSX.Element`)
- Props typed inline or as named types (e.g. `RootLayoutProps`)

## Styling
- Tailwind CSS v4 — no tailwind.config.js
- Theming via `@theme inline` in globals.css with oklch CSS custom properties
- Use `cn()` from `@/lib/utils` for conditional class merging
- Headings use `font-display` (Fraunces), body uses `font-sans` (DM Sans)
- Focus visible: `focus-visible:outline-2 focus-visible:outline-offset-2` or `focus-visible:ring-2 focus-visible:ring-ring`

## Naming
- Components: PascalCase files and exports (e.g. `HeroSection.tsx`)
- Hooks: camelCase with `use` prefix (e.g. `useScrollY.ts`)
- Content files: camelCase (e.g. `socialLinks.ts`)
- CSS classes: kebab-case for custom classes (e.g. `.scroll-reveal-hidden`)
- Constants: UPPER_SNAKE_CASE (e.g. `SCROLL_END_PX`, `INITIAL_COUNT`)

## File Organization
```
src/
├── app/              # Next.js App Router pages + layout
├── components/       # Feature-based folders
│   ├── ui/           # shadcn/ui components (auto-generated)
│   ├── hero/
│   ├── home-sections/
│   ├── home-nav/
│   ├── gallery/
│   ├── global-background/
│   ├── page-shell/
│   └── scroll-reveal/
├── content/          # Typed content exports (site copy)
├── types/            # Shared TypeScript types
├── hooks/            # Custom React hooks
├── lib/              # Utility functions (cn, etc.)
└── utils/            # Helper utilities
```

## General Principles
- YAGNI — avoid over-engineering
- Respect existing patterns
- French language for UI content, English for code
- Accessibility: skip-to-content links, ARIA labels, focus-visible rings, semantic HTML
- SEO: metadata exports on pages, JSON-LD in root layout, robots.ts, sitemap.ts
