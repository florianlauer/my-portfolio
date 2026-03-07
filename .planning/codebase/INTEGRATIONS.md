# External Integrations

**Analysis Date:** 2026-03-07

## APIs & External Services

**Google Fonts:**

- Fraunces and DM Sans loaded via `next/font/google` in `src/app/layout.tsx`
- Fonts are self-hosted at build time by Next.js (no runtime API calls)

**Wikimedia Commons:**

- Remote image source configured in `next.config.ts`
- Pattern: `https://upload.wikimedia.org`
- Used for flag images or external assets in content

## Data Storage

**Databases:**

- None - this is a static portfolio site

**Content Storage:**

- All content is code: typed TypeScript exports in `src/content/*.ts`
  - `src/content/site.ts` - Site metadata and hero content
  - `src/content/stack.ts` - Technology stack showcase data
  - `src/content/journey.ts` - Career journey/timeline data
  - `src/content/passions.ts` - Hobbies/passions section data
  - `src/content/socialLinks.ts` - Social media links
  - `src/content/gallery.ts` - Photo gallery data

**File Storage:**

- Static assets in `public/` directory (images, favicons)

**Caching:**

- Next.js built-in caching only (no external cache layer)

## Authentication & Identity

**Auth Provider:**

- None - public-facing portfolio with no user authentication

## Monitoring & Observability

**Error Tracking:**

- None detected

**Logs:**

- None detected (no logging library)

**Analytics:**

- None detected (no analytics script or integration)

## CI/CD & Deployment

**CI Pipeline:**

- GitHub Actions (`.github/workflows/ci.yml`)
- Triggers: push and pull_request on all branches
- Steps: checkout, setup Node 22, `npm ci`, `npm run lint`, `npm run build`

**Hosting:**

- Likely Vercel (inferred from `VERCEL_PROJECT_PRODUCTION_URL` usage in `src/utils/siteUrl.ts` and Next.js defaults)
- No explicit deployment configuration file

## SEO Integrations

**Structured Data:**

- JSON-LD (Person + WebSite schemas) in `src/app/layout.tsx`
- OpenGraph and Twitter Card metadata on all pages

**Search Engine:**

- `src/app/robots.ts` - Robots.txt generation (allows all)
- `src/app/sitemap.ts` - XML sitemap with 3 routes (`/`, `/a-propos`, `/galerie`)

## Environment Configuration

**Required env vars:**

- None strictly required for local development
- `NEXT_PUBLIC_BASE_URL` - Optional, overrides auto-detected base URL
- `VERCEL_PROJECT_PRODUCTION_URL` - Auto-set by Vercel in production

**Secrets location:**

- No secrets needed - no external APIs requiring authentication

## Webhooks & Callbacks

**Incoming:**

- None

**Outgoing:**

- None

## External Dependencies Summary

This is a self-contained static portfolio site with minimal external integrations:

1. Google Fonts (build-time only, self-hosted by Next.js)
2. Wikimedia Commons (remote images)
3. GitHub Actions (CI)
4. Vercel (likely deployment target)

No databases, no authentication, no third-party APIs, no analytics, no monitoring.

---

_Integration audit: 2026-03-07_
