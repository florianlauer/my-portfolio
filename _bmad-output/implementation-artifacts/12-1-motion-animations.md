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

- **ScrollReveal** : Intersection Observer ; apparition plus marquée : translateY(1.5rem) + scale(0.98) → 0 + scale(1), durée 700ms ease-out.
- **Parallax hero** : `HeroImageParallax` (motion/react useScroll + useTransform) applique un décalage vertical sobre à l’image hero au scroll (0–400px scroll → -48px translateY), style Apple.
- **Hover** (specs UX) : nav (transition-colors 200ms) ; cartes Parcours et Arsenal (hover:-translate-y-1, hover:shadow-md, hover:scale-[1.02] sur desktop) ; tags Arsenal (hover:scale-105).
- **globals.css** : `.scroll-reveal-hidden` / `.scroll-reveal-visible` avec scale.
- **page.tsx** : Parcours et Arsenal dans `<ScrollReveal>` ; nav avec transition-colors.

Contenu toujours visible sans JS (dégradable) ; motion ne bloque pas l’accès à la stack/contact.

## Fichiers

- `src/components/scroll-reveal/ScrollReveal.tsx`
- `src/components/hero/HeroImageParallax.tsx`
- `src/components/home-sections/HeroSection.tsx`
- `src/components/home-sections/JourneySection.tsx`
- `src/components/home-sections/ArsenalSection.tsx`
- `src/app/globals.css`
- `src/app/page.tsx`

## Change Log

- 2026-02-15: Implémenté et validé (lint, build).
