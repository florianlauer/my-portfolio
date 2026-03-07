# Codebase Structure

**Analysis Date:** 2026-03-07

## Directory Layout

```
my-portfolio/
├── src/
│   ├── app/                    # Next.js App Router pages and global files
│   │   ├── a-propos/           # /a-propos route
│   │   │   └── page.tsx
│   │   ├── galerie/            # /galerie route
│   │   │   └── page.tsx
│   │   ├── globals.css         # Tailwind v4 imports, theme, custom CSS
│   │   ├── icon.tsx            # Generated favicon (ImageResponse)
│   │   ├── layout.tsx          # Root layout (fonts, metadata, JSON-LD)
│   │   ├── page.tsx            # Home page (/)
│   │   ├── robots.ts           # robots.txt route handler
│   │   └── sitemap.ts          # sitemap.xml route handler
│   ├── components/             # Feature-based component folders
│   │   ├── contact/            # (empty, .gitkeep)
│   │   ├── gallery/            # Gallery feature
│   │   │   ├── GalleryClient.tsx
│   │   │   ├── GalleryGrid.tsx
│   │   │   └── Lightbox.tsx
│   │   ├── global-background/  # Full-viewport slideshow background
│   │   │   └── GlobalBackground.tsx
│   │   ├── hero/               # Hero image parallax wrapper
│   │   │   └── HeroImageParallax.tsx
│   │   ├── home-nav/           # Fixed scroll-responsive navigation
│   │   │   └── HomeNav.tsx
│   │   ├── home-sections/      # Home page section components
│   │   │   ├── ContactSection.tsx
│   │   │   ├── FlagImage.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── JourneySection.tsx
│   │   │   ├── PassionsSection.tsx
│   │   │   └── StackSection.tsx
│   │   ├── page-shell/         # Shared layout for secondary pages
│   │   │   └── PageShell.tsx
│   │   ├── scroll-reveal/      # IntersectionObserver fade-in wrapper
│   │   │   └── ScrollReveal.tsx
│   │   └── ui/                 # shadcn/ui generated components
│   │       └── button.tsx
│   ├── content/                # All site copy as typed TS exports
│   │   ├── gallery.ts
│   │   ├── journey.ts
│   │   ├── passions.ts
│   │   ├── site.ts
│   │   ├── socialLinks.ts
│   │   └── stack.ts
│   ├── hooks/                  # Reusable React hooks
│   │   ├── useScrollY.ts
│   │   └── useSwipe.ts
│   ├── lib/                    # Core utilities (shadcn convention)
│   │   └── utils.ts            # cn() helper (clsx + tailwind-merge)
│   ├── types/                  # Shared TypeScript type definitions
│   │   ├── gallery.ts
│   │   ├── journey.ts
│   │   ├── passions.ts
│   │   ├── react-responsive-masonry.d.ts
│   │   ├── site.ts
│   │   ├── socialLinks.ts
│   │   └── stack.ts
│   └── utils/                  # Pure utility functions
│       ├── shuffle.ts
│       └── siteUrl.ts
├── public/                     # Static assets served at /
│   ├── gallery/                # Gallery photos (compressed)
│   ├── hero-1.jpeg             # Hero portrait
│   ├── asset-lencois-raw.jpeg  # Background slideshow images
│   ├── asset-rio.jpeg
│   └── asset-laponie.jpeg
├── docs/                       # Project documentation
├── _bmad/                      # BMAD framework (planning agents)
├── _bmad-output/               # BMAD output artifacts
├── .planning/                  # GSD planning artifacts
│   └── codebase/               # Codebase analysis documents
├── next.config.ts              # Next.js config (remote image patterns)
├── tsconfig.json               # TypeScript config (strict, path alias)
├── package.json                # Dependencies and scripts
├── postcss.config.mjs          # PostCSS config for Tailwind v4
├── devenv.nix                  # Nix dev environment (Node 22)
└── oxlintrc.json               # oxlint configuration (if present)
```

## Directory Purposes

**`src/app/`:**

- Purpose: Next.js App Router -- one folder per route, plus global layout and CSS
- Contains: `page.tsx` files, `layout.tsx`, route handlers, `globals.css`
- Key files: `src/app/layout.tsx` (root layout), `src/app/page.tsx` (home), `src/app/globals.css` (all theme/animation CSS)

**`src/components/`:**

- Purpose: All React components, organized by feature
- Contains: One folder per feature, each with one or more `.tsx` files
- Key files: `src/components/page-shell/PageShell.tsx` (reused by secondary pages), `src/components/ui/button.tsx` (shadcn/ui)

**`src/content/`:**

- Purpose: All site text/copy as typed TypeScript constants -- the "CMS" of the project
- Contains: One `.ts` file per content domain
- Key files: `src/content/site.ts` (owner name, hero text, CTA), `src/content/gallery.ts` (78 photo entries)

**`src/types/`:**

- Purpose: Shared type definitions; each content domain has a matching type file
- Contains: TypeScript `type`/`export type` declarations
- Key files: Mirror `src/content/` -- e.g., `src/types/stack.ts` defines `StackGroup`, `StackItem`, `StackFamilyKey`

**`src/hooks/`:**

- Purpose: Reusable client-side React hooks
- Contains: `useScrollY.ts` (scroll position with rAF), `useSwipe.ts` (touch swipe for lightbox)

**`src/lib/`:**

- Purpose: Core utility functions (shadcn convention -- `cn()` lives here)
- Contains: `utils.ts` only

**`src/utils/`:**

- Purpose: Pure utility functions not tied to React
- Contains: `shuffle.ts` (Fisher-Yates array shuffle), `siteUrl.ts` (base URL from env vars)

**`public/`:**

- Purpose: Static assets served at root URL
- Contains: Hero images, background slideshow images, `gallery/` folder with compressed photos

**`public/gallery/`:**

- Purpose: Compressed gallery photos
- Contains: ~78 `.jpg`/`.jpeg` files named `IMG_XXXX.compressed.{jpg,jpeg}`

## Key File Locations

**Entry Points:**

- `src/app/layout.tsx`: Root layout -- fonts, metadata, JSON-LD, noscript fallback
- `src/app/page.tsx`: Home page -- composes all sections
- `src/app/a-propos/page.tsx`: About page
- `src/app/galerie/page.tsx`: Gallery page

**Configuration:**

- `next.config.ts`: Next.js config (allows `upload.wikimedia.org` for remote images)
- `tsconfig.json`: TypeScript strict mode, `@/*` path alias to `src/*`
- `package.json`: Scripts (`dev`, `build`, `lint`, `fmt`, `fmt:check`)
- `src/app/globals.css`: Tailwind v4 theme (oklch color palette), custom variants, animations

**Core Logic:**

- `src/components/gallery/GalleryClient.tsx`: Gallery state machine (shuffle, pagination, lightbox)
- `src/components/home-nav/HomeNav.tsx`: Scroll-responsive nav with CSS custom properties
- `src/components/global-background/GlobalBackground.tsx`: Background slideshow + parallax

**Content (edit to change site text):**

- `src/content/site.ts`: Owner name, hero title/subtitle, CTA, email
- `src/content/journey.ts`: Career timeline chapters
- `src/content/stack.ts`: Tech stack groups and tags
- `src/content/passions.ts`: Passions section + a-propos page content
- `src/content/socialLinks.ts`: Social links (LinkedIn, GitHub, X, Instagram)
- `src/content/gallery.ts`: Gallery photo entries (id, src, alt, caption)

**Shared Utilities:**

- `src/lib/utils.ts`: `cn()` function (clsx + tailwind-merge)
- `src/utils/siteUrl.ts`: `getBaseUrl()` for SEO/meta URLs
- `src/utils/shuffle.ts`: `shuffle()` for gallery randomization

## Naming Conventions

**Files:**

- Components: `PascalCase.tsx` -- e.g., `HeroSection.tsx`, `GalleryClient.tsx`
- Content: `camelCase.ts` -- e.g., `socialLinks.ts`, `gallery.ts`
- Types: `camelCase.ts` -- mirrors content file names
- Hooks: `camelCase.ts` with `use` prefix -- e.g., `useScrollY.ts`, `useSwipe.ts`
- Utils: `camelCase.ts` -- e.g., `shuffle.ts`, `siteUrl.ts`
- Pages: `page.tsx` (Next.js convention)

**Directories:**

- Components: `kebab-case/` -- e.g., `home-sections/`, `scroll-reveal/`, `global-background/`
- Routes: `kebab-case/` -- e.g., `a-propos/`, `galerie/`

**Exports:**

- Components: Named exports (not default) -- `export function HomeNav()`, `export const HeroSection`
- Content: Named exports -- `export const stackGroups`, `export const siteContent`
- Types: Named type exports -- `export type StackGroup`
- Hooks: Named exports -- `export function useScrollY()`
- Pages: Default exports (Next.js requirement) -- `export default function HomePage()`

## Where to Add New Code

**New Route/Page:**

- Create folder: `src/app/{route-name}/page.tsx`
- Wrap content in `<PageShell>` for consistent layout (nav, background, skip-to-content)
- Export `metadata` object for SEO
- Add URL to `src/app/sitemap.ts`
- If the page needs text content, create `src/content/{domain}.ts` + `src/types/{domain}.ts`

**New Home Section:**

- Create component: `src/components/home-sections/{SectionName}Section.tsx`
- Define types if needed: `src/types/{domain}.ts`
- Define content: `src/content/{domain}.ts`
- Import and place in `src/app/page.tsx`, wrapped in `<ScrollReveal>` for fade-in
- Add section `id` attribute and anchor in `HomeNav` (`src/components/home-nav/HomeNav.tsx` -- update `SECTION_IDS` and `ANCHOR_TO_SECTION`)

**New Reusable Component:**

- Create folder: `src/components/{feature-name}/`
- Create file: `src/components/{feature-name}/{ComponentName}.tsx`
- Use named export: `export function ComponentName()`
- Add `"use client"` directive only if the component uses hooks, browser APIs, or event handlers

**New shadcn/ui Component:**

- Run: `npx shadcn@latest add <name>`
- Output lands in: `src/components/ui/`
- Do not modify generated files directly if possible

**New Hook:**

- Create file: `src/hooks/use{Name}.ts`
- Add `"use client"` at top
- Use named export: `export function use{Name}()`

**New Utility:**

- React-agnostic pure functions: `src/utils/{name}.ts`
- React/UI utilities (like `cn`): `src/lib/{name}.ts`

**New Content Domain:**

1. Define types in `src/types/{domain}.ts`
2. Define content in `src/content/{domain}.ts`, importing from types
3. Import content in the relevant page or component

**New Gallery Photo:**

1. Place compressed image in `public/gallery/`
2. Add entry to `src/content/gallery.ts` with `id`, `src` (path starting with `/gallery/`), `alt`, `caption`

## Special Directories

**`_bmad/` and `_bmad-output/`:**

- Purpose: BMAD (Build Me A Dream) planning framework -- agents, workflows, templates
- Generated: Partially (output artifacts)
- Committed: Yes

**`.planning/codebase/`:**

- Purpose: GSD codebase analysis documents (this file)
- Generated: Yes (by Claude agents)
- Committed: Yes

**`src/components/ui/`:**

- Purpose: shadcn/ui generated components
- Generated: Yes (via `npx shadcn@latest add`)
- Committed: Yes
- Note: Avoid manual edits; add new components via CLI

**`public/gallery/`:**

- Purpose: Compressed gallery images
- Generated: No (manually added)
- Committed: Yes
- Note: Files are large binary assets; use compressed versions

---

_Structure analysis: 2026-03-07_
