# Technology Stack

**Analysis Date:** 2026-03-07

## Languages

**Primary:**

- TypeScript ^5 - All application code (`src/**/*.ts`, `src/**/*.tsx`)

**Secondary:**

- CSS - Tailwind v4 + custom CSS in `src/app/globals.css`
- Nix - Development environment via `devenv.nix`

## Runtime

**Environment:**

- Node.js 22 (provided by devenv/Nix, see `devenv.nix`)
- Target: ES2017 (see `tsconfig.json` `"target": "ES2017"`)

**Package Manager:**

- npm
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**

- Next.js 16.1.6 - App Router with Server Components (`next` package)
- React 19.2.3 - UI rendering (`react`, `react-dom`)
- Tailwind CSS ^4 - Utility-first styling via PostCSS plugin (`@tailwindcss/postcss`)

**Linting/Formatting:**

- oxlint ^1.51.0 - Rust-based linter with React, Next.js, jsx-a11y, TypeScript plugins (config: `.oxlintrc.json`)
- oxfmt ^0.36.0 - Rust-based formatter for `src/` directory

**Build/Dev:**

- Turbopack - Dev server bundler (via `next dev`)
- PostCSS - CSS processing (`postcss.config.mjs`)
- shadcn CLI ^3.8.4 - Component scaffolding (`npx shadcn@latest add <name>`)

## Key Dependencies

**Critical (runtime):**

- `motion` ^12.34.0 - Animation library (Framer Motion successor) for complex animations
- `radix-ui` ^1.4.3 - Headless accessible UI primitives
- `lucide-react` ^0.564.0 - Icon library
- `react-responsive-masonry` ^2.7.1 - Masonry grid layout for gallery page

**Styling utilities:**

- `class-variance-authority` ^0.7.1 - Variant-based component styling (used by shadcn/ui)
- `clsx` ^2.1.1 - Conditional class joining
- `tailwind-merge` ^3.4.0 - Intelligent Tailwind class merging
- `tw-animate-css` ^1.4.0 - Animation utilities for Tailwind (imported in `src/app/globals.css`)

**Other:**

- `prop-types` ^15.8.1 - Runtime prop validation (likely a transitive dependency of `react-responsive-masonry`)

## Configuration

**TypeScript:**

- Config: `tsconfig.json`
- Strict mode enabled
- Path alias: `@/*` maps to `./src/*`
- Module resolution: `bundler`
- JSX: `react-jsx`

**Next.js:**

- Config: `next.config.ts`
- Remote image patterns: `upload.wikimedia.org` (for flag/external images)
- No custom webpack config

**PostCSS:**

- Config: `postcss.config.mjs`
- Single plugin: `@tailwindcss/postcss`

**Tailwind CSS v4:**

- No `tailwind.config.js` - configured entirely via CSS in `src/app/globals.css`
- Uses `@import "tailwindcss"` (v4 syntax)
- Theming via `@theme inline` with oklch CSS custom properties
- Custom variants: `dark` (class-based), `pointer-hover` (hover + fine pointer media query)
- shadcn/ui integration via `@import "shadcn/tailwind.css"`

**Linting (oxlint):**

- Config: `.oxlintrc.json`
- Plugins: `react`, `nextjs`, `jsx-a11y`, `typescript`
- Categories: correctness (error), suspicious (warn), perf (warn)
- Ignores: `.next/**`, `out/**`, `build/**`

**Fonts:**

- Fraunces (variable weight, serif) - headings (`--font-fraunces`)
- DM Sans (variable weight, sans-serif) - body text (`--font-dm-sans`)
- Loaded via `next/font/google` in `src/app/layout.tsx`

**Environment:**

- `.envrc` present (direnv integration for Nix devenv)
- No `.env` files detected - no runtime environment variables needed
- `NEXT_PUBLIC_BASE_URL` or `VERCEL_PROJECT_PRODUCTION_URL` used for site URL (see `src/utils/siteUrl.ts`)

## Build Commands

```bash
npm run dev        # Next.js dev server with Turbopack
npm run build      # Production build
npm run start      # Start production server
npm run lint       # oxlint
npm run fmt        # oxfmt --write src/
npm run fmt:check  # oxfmt --check src/ (CI)
```

## Platform Requirements

**Development:**

- Nix + devenv + direnv (provides Node.js 22, actionlint, yamllint, docker, colima)
- Alternatively: Node.js 22 + npm

**CI:**

- GitHub Actions (`ubuntu-latest`, Node 22)
- Pipeline: checkout -> install -> lint -> build

**Production:**

- No deployment config detected (no `vercel.json`, `Dockerfile`, or `netlify.toml`)
- Likely deployed to Vercel (Next.js default, references `VERCEL_PROJECT_PRODUCTION_URL`)

---

_Stack analysis: 2026-03-07_
