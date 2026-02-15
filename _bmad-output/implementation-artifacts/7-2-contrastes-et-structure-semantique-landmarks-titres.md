# Story 7.2: Contrastes et structure sémantique (landmarks, titres)

Status: done

## Story

En tant que **visiteur**,
je veux bénéficier de contrastes texte/fond conformes aux bonnes pratiques et d'une structure sémantique (landmarks, titres),
afin d'avoir un niveau d'accessibilité « bon » et un SEO renforcé (FR17, NFR-A2).

## Acceptance Criteria

1. **AC1** - Given les pages et sections sont rendues (Epics 1–6), When je consulte le site (ou un outil d'audit a11y), Then les contrastes texte/fond respectent les bonnes pratiques (niveau « bon ») et les sections utilisent des landmarks sémantiques (ex. `<main>`, `<nav>`, `<section>`, titres h1–h6).
2. **AC2** - Les images porteuses d'information ont un `alt` pertinent (NFR-A3) ; la structure est cohérente sur toutes les pages.

## Tasks / Subtasks

- [x] **Task 1** (AC: #1) - Contrastes
  - [x] 1.1 Vérifier/ajuster les couleurs texte/fond pour respecter un niveau « bon » (WCAG AA 4.5:1 pour le texte normal).
  - [x] 1.2 Assombrir `--muted-foreground` en light mode (oklch 0.556 → 0.45) pour garantir un contraste suffisant.
- [x] **Task 2** (AC: #1, #2) - Structure sémantique et alt
  - [x] 2.1 Confirmer landmarks : `<main>`, `<nav>`, `<section>` avec `aria-labelledby` et titres id pour chaque bloc.
  - [x] 2.2 Confirmer hiérarchie titres : h1 (hero), h2 (Parcours, Arsenal, Contact), h3 (chapitres, groupes).
  - [x] 2.3 Confirmer alt pertinents : hero (portrait), parcours (drapeau + lieu).
- [x] **Task 3** (AC: #1, #2) - Validation
  - [x] 3.1 Lint et build.

## Dev Notes

- NFR-A2 : contrastes et structure sémantique (PRD, architecture).
- NFR-A3 : alt sur images porteuses d'information.

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Completion Notes List

- globals.css : muted-foreground light mode passé à oklch(0.45 0 0) pour contraste AA.
- Landmarks et titres déjà en place (main, nav, section, h1–h3) ; images avec alt (site.ts, JourneySection).

### File List

- `src/app/globals.css`
- `_bmad-output/implementation-artifacts/7-2-contrastes-et-structure-semantique-landmarks-titres.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- 2026-02-14: Story 7.2 documentée, implémentée et validée.

## Senior Developer Review (AI)

- Date: 2026-02-14
- Outcome: **Approve**
- Findings: aucun finding critique sur le scope 7.2.
