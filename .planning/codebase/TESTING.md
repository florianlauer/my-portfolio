# Testing Patterns

**Analysis Date:** 2026-03-07

## Test Framework

**Runner:**

- No test runner is configured
- No test files exist in `src/`
- No `jest.config.*`, `vitest.config.*`, or any test configuration detected

**Quality Gates:**

- Linting: `oxlint` via `npm run lint`
- Formatting: `oxfmt` via `npm run fmt:check`
- Type checking: `tsc` (TypeScript strict mode)
- Build validation: `npm run build` (Next.js production build)

**Run Commands:**

```bash
npm run lint       # oxlint -- fast Rust-based linter
npm run fmt        # oxfmt -- format src/ in place
npm run fmt:check  # oxfmt -- check formatting (CI mode)
npm run build      # Production build -- catches type errors and build failures
```

## Test File Organization

**Location:**

- No test files exist in the project
- No `__tests__/` directories, no `*.test.*` or `*.spec.*` files

**If adding tests, follow these conventions:**

- Co-locate test files next to source: `src/components/gallery/GalleryGrid.test.tsx`
- Name pattern: `{ComponentName}.test.tsx` or `{utilName}.test.ts`
- Place test utilities/fixtures in `src/__test-utils__/` if shared across tests

## Recommended Test Setup

**Recommended runner:** Vitest (aligns with the fast-tooling philosophy of oxlint/oxfmt)

**Recommended setup files:**

- `vitest.config.ts` at project root
- `@testing-library/react` for component tests
- `@testing-library/jest-dom` for DOM assertions

**Recommended vitest.config.ts:**

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/__test-utils__/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

## What to Test (Priority Order)

**High Priority -- Utility functions (pure, no dependencies):**

- `src/utils/shuffle.ts` -- verify Fisher-Yates correctness, immutability, edge cases (empty array, single element)
- `src/utils/siteUrl.ts` -- verify env var fallback chain, trailing slash stripping

**Medium Priority -- Custom hooks:**

- `src/hooks/useScrollY.ts` -- verify scroll listener setup/cleanup, RAF throttling
- `src/hooks/useSwipe.ts` -- verify swipe threshold detection, direction callbacks, drag delta calculations

**Medium Priority -- Client component logic:**

- `src/components/gallery/GalleryClient.tsx` -- verify load-more logic, lightbox index management, shuffle on mount
- `src/components/gallery/Lightbox.tsx` -- verify keyboard navigation (Escape, ArrowLeft, ArrowRight), focus trap, body scroll lock

**Lower Priority -- Presentational components:**

- Section components (`HeroSection`, `StackSection`, etc.) are thin presentational layers -- test only if logic is added
- `ScrollReveal` -- IntersectionObserver behavior (may need mock)

## Mocking Guidance

**What to mock:**

- `window.scrollY`, `window.addEventListener("scroll", ...)` for scroll-dependent hooks
- `IntersectionObserver` for `ScrollReveal` and `GalleryGrid` infinite scroll
- `requestAnimationFrame` for RAF-throttled handlers
- `document.body.style.overflow` for Lightbox scroll lock tests
- `createPortal` from `react-dom` for Lightbox rendering tests

**What NOT to mock:**

- Content data from `src/content/*` -- use real data or create test fixtures matching the same types
- `cn()` utility -- it is pure and deterministic
- React state and effects -- let them run naturally with testing-library

**IntersectionObserver mock pattern:**

```typescript
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
  global.IntersectionObserver = vi.fn((callback) => ({
    observe: mockObserve,
    disconnect: mockDisconnect,
    unobserve: vi.fn(),
    root: null,
    rootMargin: "",
    thresholds: [],
    takeRecords: () => [],
  })) as unknown as typeof IntersectionObserver;
});
```

## Coverage

**Requirements:** None enforced -- no coverage tool configured

**If adding coverage:**

```bash
npx vitest --coverage    # with @vitest/coverage-v8
```

**Suggested initial targets:**

- `src/utils/` -- 100% (pure functions, easy to test)
- `src/hooks/` -- 80%+ (custom hooks with browser API interactions)
- `src/components/` -- focus on components with logic, skip pure presentational

## Test Types

**Unit Tests:**

- Target: utility functions in `src/utils/`, custom hooks in `src/hooks/`
- Approach: direct function calls, renderHook from testing-library

**Integration Tests:**

- Target: component trees that combine multiple children (e.g., GalleryClient orchestrating GalleryGrid + Lightbox)
- Approach: render with testing-library, simulate user interactions

**E2E Tests:**

- Not configured
- Recommended: Playwright if needed later (aligns with Next.js ecosystem)
- Primary candidates: gallery navigation flow, lightbox open/close/navigate, scroll-based nav shrinking

## Content Data Testing

**Pattern for test fixtures:**

```typescript
import type { GalleryItem } from "@/types/gallery";

const testItems: GalleryItem[] = [
  { id: "test-1", src: "/gallery/test-1.jpg", alt: "Test 1", caption: "Test Location 1" },
  { id: "test-2", src: "/gallery/test-2.jpg", alt: "Test 2", caption: "Test Location 2" },
];
```

All content types are defined in `src/types/` -- use them to create type-safe test fixtures.

---

_Testing analysis: 2026-03-07_
