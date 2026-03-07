# Coding Conventions

**Analysis Date:** 2026-03-07

## Naming Patterns

**Files:**

- Components: `PascalCase.tsx` (e.g., `GalleryGrid.tsx`, `ScrollReveal.tsx`, `HomeNav.tsx`)
- Types: `camelCase.ts` (e.g., `gallery.ts`, `socialLinks.ts`, `site.ts`)
- Content: `camelCase.ts` matching the type file name (e.g., `gallery.ts`, `site.ts`, `passions.ts`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useScrollY.ts`, `useSwipe.ts`)
- Utilities: `camelCase.ts` (e.g., `shuffle.ts`, `siteUrl.ts`)
- UI components (shadcn): `kebab-case.tsx` (e.g., `button.tsx`) -- do not rename these

**Functions / Components:**

- React components: `PascalCase` (e.g., `GalleryClient`, `HeroSection`, `PageShell`)
- Hooks: `camelCase` with `use` prefix (e.g., `useScrollY`, `useSwipe`)
- Utility functions: `camelCase` (e.g., `shuffle`, `getBaseUrl`, `cn`)
- Event handlers in hooks: `camelCase` with `handle` prefix (e.g., `handleTouchStart`, `handleScroll`)
- Callbacks passed as props: `camelCase` with `on` prefix (e.g., `onClose`, `onPrev`, `onLoadMore`)

**Variables:**

- Constants (module-level): `UPPER_SNAKE_CASE` (e.g., `INITIAL_COUNT`, `SWIPE_THRESHOLD_PX`, `MASONRY_BREAKPOINTS`)
- Local variables and state: `camelCase` (e.g., `shuffledPool`, `lightboxIndex`, `currentIndex`)
- Refs: `camelCase` with `Ref` suffix (e.g., `dialogRef`, `sentinelRef`, `rafIdRef`)
- Boolean state: descriptive adjective/verb (e.g., `isVisible`, `hasMounted`, `isDragAnimating`, `isInitialLoad`)

**Types:**

- Type aliases: `PascalCase` (e.g., `GalleryItem`, `StackFamilyKey`, `SocialLink`)
- Props types: `PascalCase` with `Props` suffix (e.g., `HeroSectionProps`, `GalleryGridProps`, `LightboxProps`)
- Use `type` keyword, not `interface` -- consistently throughout the codebase
- Union types for constrained keys: `type StackFamilyKey = "frontend" | "mobile" | "backend" | ...`

## Code Style

**Formatting:**

- Tool: `oxfmt` (Rust-based, fast)
- Run: `npm run fmt` (write) or `npm run fmt:check` (CI)
- Double quotes for strings
- Semicolons at end of statements
- 2-space indentation
- Trailing commas in multiline structures

**Linting:**

- Tool: `oxlint` (Rust-based, fast)
- Run: `npm run lint`
- No ESLint -- oxlint replaces it entirely
- No custom config file detected -- uses oxlint defaults

**TypeScript:**

- Strict mode enabled (`"strict": true` in `tsconfig.json`)
- Explicit return types on exported functions: `React.JSX.Element` for components, specific types for hooks/utilities
- Use `type` imports: `import type { GalleryItem } from "@/types/gallery"`
- Use `readonly` for immutable array params: `(array: readonly T[]): T[]`
- `as const` assertions for static arrays (e.g., `SLIDESHOW_IMAGES`, `SECTION_IDS`)

## Import Organization

**Order:**

1. React / framework imports (`react`, `next/*`, `motion/react`)
2. Third-party libraries (`react-responsive-masonry`, `class-variance-authority`)
3. Internal absolute imports with `@/` alias, grouped by type:
   - Components (`@/components/...`)
   - Hooks (`@/hooks/...`)
   - Types (`@/types/...`)
   - Content (`@/content/...`)
   - Utils/lib (`@/utils/...`, `@/lib/...`)
4. Relative imports for siblings (`./GalleryGrid`, `./Lightbox`)

**Path Aliases:**

- `@/*` maps to `src/*` -- always use this for cross-directory imports
- Use relative imports (`./`) only for files in the same directory (e.g., `./GalleryGrid` from `GalleryClient.tsx`)
- Never use `../` relative imports

**Type-only imports:**

- Use `import type { ... }` for type-only imports (not `import { type ... }`)
- Exception: when mixing value and type imports, separate them into two import lines

## Component Patterns

**Server vs Client Components:**

- Pages (`page.tsx`) are Server Components by default -- no `"use client"` directive
- Add `"use client"` only when using hooks, browser APIs, or event handlers
- Server Components import typed content from `@/content/*` and pass it as props to Client Components
- Client-heavy components can be dynamically imported: `dynamic(() => import(...).then(m => m.Component))`

**Component declaration style:**

- Named `function` declaration for Server Components and hooks: `export function PageShell(...)`
- Arrow function `const` for Client Components that are section-level: `export const HeroSection = (...) => { ... }`
- Both patterns coexist -- use `function` for new code as the preferred default
- Always use named exports, never default exports (except `page.tsx` default exports required by Next.js)

**Props pattern:**

- Define a `type XxxProps = { ... }` above the component
- Destructure props in the function signature
- Use `React.JSX.Element` as explicit return type (not `JSX.Element` or `ReactElement`)
- For nullable return: `React.JSX.Element | null`

**Prop examples from codebase:**

```typescript
// src/components/gallery/GalleryClient.tsx
type GalleryClientProps = {
  items: GalleryItem[];
};

export function GalleryClient({ items }: GalleryClientProps): React.JSX.Element {
```

```typescript
// src/components/page-shell/PageShell.tsx
type PageShellProps = {
  children: React.ReactNode;
  containerClassName?: string;
};

export function PageShell({ children, containerClassName }: PageShellProps): React.JSX.Element {
```

## Hook Patterns

**Custom hook structure:**

```typescript
// src/hooks/useScrollY.ts
"use client";

import { useEffect, useState } from "react";

export function useScrollY(): number {
  const [scrollY, setScrollY] = useState(0);
  // ...effect with cleanup
  return scrollY;
}
```

**"use-latest" ref pattern for stable callbacks:**

```typescript
// Used in src/components/gallery/Lightbox.tsx and src/hooks/useSwipe.ts
const callbacksRef = useRef({ onClose, onPrev, onNext });
useEffect(() => {
  callbacksRef.current = { onClose, onPrev, onNext };
});
```

**RAF-throttled scroll handlers:**

```typescript
// Pattern used in useScrollY, GlobalBackground, HomeNav
let rafId: number | null = null;
const handleScroll = (): void => {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    // ... update state
  });
};
window.addEventListener("scroll", handleScroll, { passive: true });
```

## Error Handling

**Patterns:**

- Image load errors: fallback UI via `onError` + boolean state (see `FlagImage.tsx`)
- No try/catch blocks in the codebase -- no API calls, no async data fetching
- Optional chaining used defensively: `entry?.isIntersecting`, `items[idx]`, `currentItem?.caption ?? ""`
- Nullish coalescing for defaults: `primaryContactLink?.label ?? siteContent.primaryCta.label`

## Styling Patterns

**Tailwind v4 (no config file):**

- Theming via `@theme inline` in `src/app/globals.css` with CSS custom properties in oklch color space
- Colors referenced as semantic tokens: `text-foreground`, `bg-background`, `border-border`, `text-muted-foreground`, `text-primary`
- Use `cn()` from `@/lib/utils` for conditional class merging (clsx + tailwind-merge)

**Custom variant -- pointer-hover:**

```css
/* src/app/globals.css */
@custom-variant pointer-hover {
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      @slot;
    }
  }
}
```

- Use `pointer-hover:` instead of `hover:` for hover effects -- avoids sticky hover on touch devices
- Example: `pointer-hover:scale-[1.02]`, `pointer-hover:bg-white/20`

**Section card pattern (repeated across all sections):**

```
className="rounded-2xl border border-border bg-background/92 p-6 md:p-8 backdrop-blur-sm"
```

**Interactive card pattern (repeated for list items):**

```
className="rounded-xl border border-border/70 border-t-2 p-4 transition-all duration-200 pointer-hover:-translate-y-1 pointer-hover:shadow-md pointer-hover:border-border md:pointer-hover:scale-[1.02]"
```

## Accessibility

**Patterns to follow:**

- Skip-to-content link at top of every page layout
- `aria-labelledby` on every `<section>` pointing to its `<h2 id="...">`
- `aria-label` on lists: `<ul aria-label="Réseaux sociaux">`
- `role="dialog"` + `aria-modal="true"` for modal overlays (Lightbox)
- Focus trap in modals with Tab/Shift+Tab cycling
- Focus restore on modal close: save `document.activeElement`, restore on cleanup
- `aria-hidden` on decorative elements (background overlays, fade indicators)
- External links: `target="_blank" rel="noopener noreferrer"` with aria-label mentioning "(ouvre dans un nouvel onglet)"
- `focus-visible:` ring styles on all interactive elements
- `tabIndex={-1}` on main content containers for skip-link targets

## Logging

**Framework:** None -- no logging library or console statements in the codebase. This is a static portfolio site.

## Comments

**When to Comment:**

- JSDoc on exported utility functions and hooks (e.g., `shuffle`, `useScrollY`, `getBaseUrl`)
- Inline comments in French for implementation notes and rationale (e.g., hydration strategy, scroll behavior)
- `/** */` for component-level descriptions when the purpose is not obvious from the name

**Style:**

- Comments are in French (matching the site language)
- Use `/** */` JSDoc for exported functions/types
- Use `//` for inline implementation notes
- TSDoc `@param`/`@returns` tags are not used -- keep JSDoc brief

## Module Design

**Exports:**

- One primary export per component file (named export)
- Content files export multiple named constants (e.g., `siteContent`, `heroStack` from `src/content/site.ts`)
- Type files export multiple named types
- No barrel/index files -- import directly from the file

**Content-as-code pattern:**

- All site copy in `src/content/*.ts` as typed exports
- Each content file imports its type: `import type { GalleryItem } from "@/types/gallery"`
- Content is imported in Server Component pages and passed as props to Client Components

---

_Convention analysis: 2026-03-07_
