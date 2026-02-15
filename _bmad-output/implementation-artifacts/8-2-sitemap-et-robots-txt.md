# Story 8.2: Sitemap et robots.txt

Status: done

## Story

En tant que **moteur de recherche**,
je veux découvrir les URLs du site et savoir quelles parties indexer,
afin d'améliorer l'indexation (SEO).

## Acceptance Criteria

1. **AC1** - Given le projet Next.js App Router, when on accède à `/sitemap.xml`, then un sitemap est servi listant au minimum la page d'accueil.
2. **AC2** - When on accède à `/robots.txt`, then un robots est servi avec au minimum `User-agent: *`, `Allow: /` et la référence vers le sitemap.

## Implémentation

- `src/app/sitemap.ts` : export default function sitemap() retourne un `MetadataRoute.Sitemap` avec une entrée (baseUrl, lastModified, changeFrequency monthly, priority 1). Utilise `getBaseUrl()`.
- `src/app/robots.ts` : export default function robots() retourne `MetadataRoute.Robots` avec rules { userAgent: "*", allow: "/" } et sitemap: `${baseUrl}/sitemap.xml`.

## Fichiers

- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/utils/siteUrl.ts`

## Change Log

- 2026-02-15: Implémenté et validé (lint, build). Routes /sitemap.xml et /robots.txt générées.
