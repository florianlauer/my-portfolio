# Story 8.3: Données structurées JSON-LD (Person / WebSite)

Status: done

## Story

En tant que **moteur de recherche**,
je veux recevoir des données structurées sur la personne et le site,
afin d'enrichir les résultats (ex. knowledge panel, rich results).

## Acceptance Criteria

1. **AC1** - Given la page d'accueil, when un crawler lit le HTML, then un bloc `<script type="application/ld+json">` contient au moins un schéma de type `Person` ou `WebSite` (nom, description, URL, éventuellement image) conforme à schema.org.
2. **AC2** - Le JSON-LD est injecté dans le layout (SSR/SSG), sans casser le build.

## Implémentation

- `src/app/layout.tsx` : script en tête du body avec `type="application/ld+json"` et un tableau JSON contenant :
  - **Person** : @context schema.org, name (ownerName), jobTitle (heroTitle), description (heroSubtitle), image (baseUrl + hero), url (baseUrl).
  - **WebSite** : name (title), description, url, publisher (Person avec name).
- Données dérivées de `siteContent` et `getBaseUrl()`.

## Fichiers

- `src/app/layout.tsx`

## Change Log

- 2026-02-15: Implémenté et validé (lint, build).
