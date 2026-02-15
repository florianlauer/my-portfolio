# Story 8.1: Meta Open Graph et Twitter Card

Status: done

## Story

En tant que **visiteur ou partageur** (réseaux sociaux, messagerie),
je veux que le lien du portfolio affiche un titre, une description et une image cohérents,
afin que le partage soit lisible et professionnel.

## Acceptance Criteria

1. **AC1** - Given le site est déployé, when on partage l'URL (LinkedIn, Twitter, Slack, etc.), then une carte s'affiche avec titre, description et image (og:title, og:description, og:image, og:type, og:url ; twitter:card, twitter:title, twitter:description, twitter:image).
2. **AC2** - Les meta sont définies dans le layout (App Router `metadata` / `openGraph` / `twitter`).
3. **AC3** - L'image de partage (hero) est servie en HTTPS et avec des dimensions raisonnables (1200×630).

## Implémentation

- `src/app/layout.tsx` : metadata étendue avec `metadataBase`, `openGraph` (type, locale, url, siteName, title, description, images avec alt), `twitter` (card summary_large_image, title, description, images).
- `src/utils/siteUrl.ts` : `getBaseUrl()` pour résoudre l'URL du site (NEXT_PUBLIC_SITE_URL, VERCEL_URL, fallback localhost).
- Image : `/hero-1.jpeg` (résolue via metadataBase), dimensions 1200×630, alt depuis `siteContent.heroImage.alt`.

## Fichiers

- `src/app/layout.tsx`
- `src/utils/siteUrl.ts`
- `DEPLOYMENT.md` (mention NEXT_PUBLIC_SITE_URL)

## Change Log

- 2026-02-15: Implémenté et validé (lint, build).
