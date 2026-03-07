# Architecture

**Analysis Date:** 2026-03-07

## Pattern Overview

**Overall:** Next.js 16 App Router with "Content as Code" pattern

**Key Characteristics:**

- Server Components by default; `"use client"` only for hooks, browser APIs, event handlers
- All site copy lives in typed TypeScript exports (`src/content/*.ts`) -- no CMS, no database, no API
- Feature-based component folders under `src/components/`; each folder contains one primary component
- Three routes total: `/` (home), `/a-propos`, `/galerie` -- all statically renderable
- No backend, no API routes, no database -- purely a static/SSG portfolio site

## Layers

**Routes (Pages):**

- Purpose: Entry points per URL; Server Components that compose layout and pass content as props
- Location: `src/app/`
- Contains: `page.tsx` files, `layout.tsx`, SEO route handlers (`robots.ts`, `sitemap.ts`), `globals.css`
- Depends on: Content layer, Component layer
- Used by: Next.js router

**Content Layer:**

- Purpose: All site copy, structured as typed TypeScript constants -- the single source of truth for text
- Location: `src/content/`
- Contains: `site.ts`, `stack.ts`, `journey.ts`, `passions.ts`, `socialLinks.ts`, `gallery.ts`
- Depends on: Types layer
- Used by: Pages (imported at module level in Server Components)

**Types Layer:**

- Purpose: Shared TypeScript type definitions that enforce content shape
- Location: `src/types/`
- Contains: `site.ts`, `stack.ts`, `journey.ts`, `passions.ts`, `socialLinks.ts`, `gallery.ts`, `react-responsive-masonry.d.ts`
- Depends on: Nothing
- Used by: Content layer, Component layer

**Component Layer:**

- Purpose: UI rendering -- both Server Components and Client Components
- Location: `src/components/`
- Contains: Feature-based folders, each with one or more `.tsx` files
- Depends on: Types layer, Hooks layer, Lib layer
- Used by: Pages

**Hooks Layer:**

- Purpose: Reusable client-side React hooks
- Location: `src/hooks/`
- Contains: `useScrollY.ts`, `useSwipe.ts`
- Depends on: React
- Used by: Client Components

**Lib / Utils Layer:**

- Purpose: Small pure utilities
- Location: `src/lib/` and `src/utils/`
- Contains: `utils.ts` (cn helper), `shuffle.ts` (Fisher-Yates), `siteUrl.ts` (base URL resolution)
- Depends on: `clsx`, `tailwind-merge`
- Used by: All layers

## Data Flow

**Home Page Rendering:**

1. `src/app/page.tsx` (Server Component) imports typed content from `src/content/*.ts`
2. Content objects are passed as props to section components (`HeroSection`, `JourneySection`, `StackSection`, `PassionsSection`, `ContactSection`)
3. Section components are Server Components that render HTML; some wrap children in Client Components for interactivity (`ScrollReveal`, `HeroImageParallax`)
4. `HomeNav` and `GlobalBackground` are Client Components mounted at the page level for scroll-driven interactivity

**Gallery Page Rendering:**

1. `src/app/galerie/page.tsx` (Server Component) imports `galleryItems` from `src/content/gallery.ts`
2. `GalleryClient` is dynamically imported (`next/dynamic`) to avoid SSR hydration mismatch (masonry layout depends on viewport)
3. Client-side: items are shuffled via Fisher-Yates, displayed incrementally (20 initial, +6 on "load more"), with lightbox overlay

**Secondary Pages (a-propos):**

1. `src/app/a-propos/page.tsx` imports content, wraps in `PageShell` (shared layout for secondary pages)
2. `PageShell` provides `GlobalBackground` + `HomeNav` + skip-to-content link + centered container

**State Management:**

- No global state management library -- all state is local React `useState`/`useRef`
- Scroll position tracked via `useScrollY` hook or inline `useEffect` with `requestAnimationFrame`
- Gallery state (shuffle, pagination, lightbox index) managed in `GalleryClient` component

## Key Abstractions

**PageShell:**

- Purpose: Shared layout wrapper for secondary pages (not home)
- File: `src/components/page-shell/PageShell.tsx`
- Pattern: Server Component that composes `GlobalBackground`, `HomeNav`, skip-to-content link, and a centered content container
- Use for: Any new secondary page

**ScrollReveal:**

- Purpose: Fade-in-on-scroll animation wrapper
- File: `src/components/scroll-reveal/ScrollReveal.tsx`
- Pattern: Client Component using IntersectionObserver; wraps children; adds CSS classes for opacity/transform transition
- CSS classes defined in: `src/app/globals.css` (`.scroll-reveal-hidden`, `.scroll-reveal-visible`)

**Content + Type Pair:**

- Purpose: Each content domain has a matching type file
- Examples: `src/content/stack.ts` + `src/types/stack.ts`, `src/content/journey.ts` + `src/types/journey.ts`
- Pattern: Type file exports interfaces; content file imports types and exports `const` arrays/objects satisfying those types

**GlobalBackground:**

- Purpose: Full-viewport background slideshow with parallax
- File: `src/components/global-background/GlobalBackground.tsx`
- Pattern: Client Component; cycles through 3 travel photos on a 10s interval; applies parallax via scroll-driven `translate3d`

**HomeNav:**

- Purpose: Fixed navigation bar that shrinks on scroll with bounce animation
- File: `src/components/home-nav/HomeNav.tsx`
- Pattern: Client Component; uses CSS custom properties (`--nav-padding`, `--nav-gap`, etc.) mutated via JS to drive scroll-responsive sizing; IntersectionObserver for active section detection

## Entry Points

**Root Layout:**

- Location: `src/app/layout.tsx`
- Triggers: Every page render
- Responsibilities: Google Fonts (Fraunces + DM Sans), global metadata, JSON-LD structured data, noscript fallback for scroll-reveal, `<html lang="fr">`

**Home Page:**

- Location: `src/app/page.tsx`
- Triggers: `/` route
- Responsibilities: Composes all home sections with content props; inline skip-to-content link; `GlobalBackground` and `HomeNav`

**A Propos Page:**

- Location: `src/app/a-propos/page.tsx`
- Triggers: `/a-propos` route
- Responsibilities: Renders about content inside `PageShell`

**Gallery Page:**

- Location: `src/app/galerie/page.tsx`
- Triggers: `/galerie` route
- Responsibilities: Dynamic import of `GalleryClient`; passes `galleryItems` as props

**SEO Route Handlers:**

- `src/app/robots.ts`: Generates `robots.txt`
- `src/app/sitemap.ts`: Generates `sitemap.xml` with 3 URLs
- `src/app/icon.tsx`: Generates 32x32 favicon via `ImageResponse`

## Error Handling

**Strategy:** Minimal -- no error boundaries, no try/catch blocks, no API calls to fail

**Patterns:**

- `FlagImage` component (`src/components/home-sections/FlagImage.tsx`) uses `onError` callback to show fallback emoji when remote flag image fails to load
- `GalleryClient` handles hydration mismatch by showing a loading placeholder until `hasMounted` is true
- `getBaseUrl()` (`src/utils/siteUrl.ts`) falls back through `NEXT_PUBLIC_SITE_URL` -> `VERCEL_URL` -> `localhost:3000`

## Cross-Cutting Concerns

**Logging:** None -- no logging framework, no `console.log` in production code

**Validation:** TypeScript strict mode enforces content shape at build time; no runtime validation

**Authentication:** Not applicable -- public static portfolio site

**SEO:** Metadata exports on each page; JSON-LD in root layout; `robots.ts` and `sitemap.ts` route handlers; Open Graph and Twitter Card meta tags

**Accessibility:** Skip-to-content links on every page; `aria-label` and `aria-labelledby` on sections and interactive elements; `focus-visible` ring styles; noscript fallback for scroll animations; `role="status"` on loading states

**Performance:**

- `requestAnimationFrame` throttling on all scroll handlers (`GlobalBackground`, `HomeNav`, `useScrollY`, `useSwipe`)
- `will-change` CSS property on animating elements
- Dynamic import for `GalleryClient` to reduce initial bundle
- `next/image` with `priority` on hero/first background image; responsive `sizes` attributes
- Passive event listeners on scroll/resize

---

_Architecture analysis: 2026-03-07_
