# Story 2.1: Zone Hero (photo, nom, phrase d'accroche)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

En tant que **visiteur**,
je veux voir une zone Hero avec photo, nom et phrase d'accroche,
afin de comprendre immediatement de qui il s'agit (FR1).

## Acceptance Criteria

1. **AC1** - Given la page d'accueil et le contenu `site.ts` fournissent titre, sous-titre et chemin image, When je charge la page, Then une section Hero affiche la photo (via `next/image`), le nom et la phrase d'accroche.
2. **AC2** - L'image Hero est optimisee (NFR-P2) et dispose d'un attribut `alt` pertinent (NFR-A3).

## Tasks / Subtasks

- [x] **Task 1** (AC: #1) - Etendre les donnees de contenu Hero
  - [x] 1.1 Ajouter la structure `heroImage` dans les types de `src/types/site.ts`.
  - [x] 1.2 Renseigner `heroImage` dans `src/content/site.ts` avec chemin et alt.
- [x] **Task 2** (AC: #1, #2) - Implementer l'affichage Hero avec `next/image`
  - [x] 2.1 Mettre a jour `HeroSection` pour afficher l'image Hero optimisee.
  - [x] 2.2 Conserver nom, titre et phrase d'accroche dans la zone Hero.
  - [x] 2.3 Verifier que `alt` est issu du contenu et pertinent.
- [x] **Task 3** (AC: #1, #2) - Valider l'implementation
  - [x] 3.1 Executer `npm run lint`.
  - [x] 3.2 Executer `npm run build`.

## Dev Notes

- **Contexte local (Nix/devenv/direnv)** : executer `npm`/`npx` directement dans le repo (shell direnv actif).
- **Architecture cible** : App Router + contenu file-based + composants presentionnels.
- **Objectif story** : rendre le Hero immediatement comprehensible (identite + accroche + visuel).

### Project Structure Notes

- Ajout d'un asset local dans `public/` pour supporter `next/image`.
- Aucune logique fetch/API ; rendu statique base sur `src/content`.

### References

- [Source: _bmad-output/planning-artifacts/epics.md - Story 2.1]
- [Source: _bmad-output/planning-artifacts/architecture.md - image optimization, App Router]
- [Source: project-context.md - Environnement local direnv/devenv]

## Developer Context (guardrails)

- Garder les donnees Hero modifiables dans `src/content/site.ts`.
- Eviter le hardcode de textes/alt dans le composant.
- Conserver des imports absolus `@/...`.

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- `npm run lint`
- `npm run build`

### Completion Notes List

- Type `HeroImage` ajoute dans `src/types/site.ts` et integre au `SiteContent`.
- Contenu Hero enrichi avec `heroImage` (`src`, `alt`) dans `src/content/site.ts`.
- `HeroSection` utilise maintenant `next/image` (image optimisee, `priority`, `sizes`) avec `alt` fourni par le contenu.
- Asset local ajoute: `public/hero-avatar.svg`.
- Validation technique executee: lint + build.

### File List

- `src/types/site.ts`
- `src/content/site.ts`
- `src/components/home-sections/HeroSection.tsx`
- `public/hero-avatar.svg`
- `_bmad-output/implementation-artifacts/2-1-zone-hero-photo-nom-phrase-d-accroche.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- 2026-02-14: Story 2.1 creee et implementee, statut passe a `review`.
- 2026-02-14: Code review effectuee, aucun finding bloquant, statut passe a `done`.

## Senior Developer Review (AI)

- Date: 2026-02-14
- Outcome: **Approve**
- Findings: aucun finding critique, majeur ou mineur sur le scope 2.1.
