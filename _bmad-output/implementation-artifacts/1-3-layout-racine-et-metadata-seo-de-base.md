# Story 1.3: Layout racine et metadata SEO de base

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

En tant que **visiteur**,
je veux que la page ait un layout commun et des balises title/meta correctes,
afin que le site soit indexable et semantique (FR14, FR15).

## Acceptance Criteria

1. **AC1** - Given la structure content/types est en place (Story 1.2), When je consulte la page d'accueil, Then un `layout.tsx` racine dans `src/app` enveloppe le contenu et exporte un objet `metadata` (title, description).
2. **AC2** - Le HTML de la page contient des balises semantiques (ex. `<main>`, titres hierarchiques) et les meta sont presentes dans le `<head>`.

## Tasks / Subtasks

- [x] **Task 1** (AC: #1) - Configurer le layout racine et les metadata globales
  - [x] 1.1 Verifier que `src/app/layout.tsx` enveloppe bien le contenu avec `<html>` + `<body>`.
  - [x] 1.2 Definir un `metadata` global avec `title` et `description` SEO de base.
- [x] **Task 2** (AC: #2) - Garantir une structure semantique minimale de la page
  - [x] 2.1 Verifier l'usage de `<main>` et d'un titre principal `<h1>` sur la home.
  - [x] 2.2 Ajuster le contenu placeholder pour rester coherent avec les exigences FR14/FR15.
- [x] **Task 3** (AC: #1, #2) - Valider l'implementation
  - [x] 3.1 Executer `npm run lint`.
  - [x] 3.2 Executer `npm run build`.

## Dev Notes

- **Contexte local (Nix/devenv/direnv)** : executer `npm`/`npx` directement dans le repo (shell direnv actif).
- **Architecture cible** : App Router (`src/app`), metadata par route/layout, structure semantique claire.
- **Objectif story** : poser la base SEO/semantique avant l'injection de contenu plus riche (Story 1.4).

### Project Structure Notes

- Story focalisee sur `src/app/layout.tsx` et `src/app/page.tsx`.
- Pas d'ajout de logique runtime ni de fetch.

### References

- [Source: _bmad-output/planning-artifacts/epics.md - Story 1.3]
- [Source: _bmad-output/planning-artifacts/architecture.md - SEO metadata, App Router]
- [Source: project-context.md - Environnement local direnv/devenv]

## Developer Context (guardrails)

- Conserver une structure simple et evolutive pour les stories suivantes.
- Eviter toute logique metier dans le layout global.
- Garder des metadata explicites et maintenables.

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- `npm run lint`
- `npm run build`

### Completion Notes List

- `src/app/layout.tsx` expose un `metadata` SEO de base (title template + description).
- `src/app/page.tsx` conserve une structure semantique minimale (`<main>`, `<h1>`) avec contenu coherent.
- Validation technique executee: lint + build.

### File List

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `_bmad-output/implementation-artifacts/1-3-layout-racine-et-metadata-seo-de-base.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- 2026-02-14: Story 1.3 creee et implementee, statut passe a `review`.
- 2026-02-14: Code review effectuee, aucun finding bloquant, statut passe a `done`.

## Senior Developer Review (AI)

- Date: 2026-02-14
- Outcome: **Approve**
- Findings: aucun finding critique, majeur ou mineur sur le scope 1.3.
