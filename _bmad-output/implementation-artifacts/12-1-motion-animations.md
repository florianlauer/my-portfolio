# Story 12.1: Affinage motion et animations

Status: done

## Story

En tant que **visiteur**,
je veux des transitions et animations sobres qui renforcent la lecture (parcours, arsenal),
sans retarder l'accès à la stack et au contact (≤ 10s).

## Acceptance Criteria

1. **AC1** - Given les sections Parcours et Arsenal, when je scroll ou navigue, then des animations légères (apparition) guident l'attention sans bloquer le thread principal.
2. **AC2** - Les critères NFR-P3 et time-to-stack / time-to-contact restent respectés.
3. **AC3** - Le motion reste optionnel ou dégradable (pas de dépendance critique au JS pour le contenu essentiel).

## Implémentation

- **ScrollReveal** (`src/components/scroll-reveal/ScrollReveal.tsx`) : composant client avec Intersection Observer ; quand la section entre dans le viewport (rootMargin -40px), ajout d'une classe pour opacity 1 + translateY(0). État initial : opacity 0, translateY(0.75rem). Transition CSS 500ms ease-out.
- **globals.css** : classes `.scroll-reveal-hidden` et `.scroll-reveal-visible` pour l'animation.
- **page.tsx** : Parcours et Arsenal wrappés dans `<ScrollReveal>`. Hero et Contact non animés (contenu prioritaire visible immédiatement).

Contenu toujours présent dans le DOM ; sans JS les sections s'affichent sans animation (dégradable).

## Fichiers

- `src/components/scroll-reveal/ScrollReveal.tsx`
- `src/app/globals.css`
- `src/app/page.tsx`

## Change Log

- 2026-02-15: Implémenté et validé (lint, build).
