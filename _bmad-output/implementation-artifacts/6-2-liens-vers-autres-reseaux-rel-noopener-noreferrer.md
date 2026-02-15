# Story 6.2: Liens vers autres reseaux (rel noopener noreferrer)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

En tant que **visiteur**,
je veux voir des liens vers d'autres reseaux depuis la zone Contact,
afin d'acceder a tous les canaux de contact (FR11).

## Acceptance Criteria

1. **AC1** - Given la zone Contact existe (Story 6.1) et `socialLinks.ts` contient d'autres liens (ex. GitHub, X), When je consulte la section Contact, Then les liens vers les autres reseaux sont affiches et cliquables ; chaque lien externe avec `target="_blank"` a `rel="noopener noreferrer"`.
2. **AC2** - Les liens sont charges depuis `src/content/socialLinks.ts` ; accessibles au clavier.

## Tasks / Subtasks

- [x] **Task 1** (AC: #1) - Securiser les liens externes
  - [x] 1.1 Ajouter `target="_blank"` et `rel="noopener noreferrer"` sur chaque lien reseau dans la liste Contact.
- [x] **Task 2** (AC: #2) - Conserver la source de verite
  - [x] 2.1 Les liens restent alimentes depuis `src/content/socialLinks.ts`.
- [x] **Task 3** (AC: #1, #2) - Validation implementation
  - [x] 3.1 Executer `npm run lint`.
  - [x] 3.2 Executer `npm run build`.

## Dev Notes

- Architecture : liens externes ouverts en nouvel onglet avec attributs de securite (NFR-S2, architecture).
- Aucun formulaire ni collecte ; liens uniquement.

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Completion Notes List

- Liste des reseaux sociaux en zone Contact : chaque `<a>` a `target="_blank"` et `rel="noopener noreferrer"`.
- Donnees toujours depuis `src/content/socialLinks.ts`.

### File List

- `src/components/home-sections/ContactSection.tsx`
- `_bmad-output/implementation-artifacts/6-2-liens-vers-autres-reseaux-rel-noopener-noreferrer.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- 2026-02-14: Story 6.2 documentee, implementee et validee.

## Senior Developer Review (AI)

- Date: 2026-02-14
- Outcome: **Approve**
- Findings: aucun finding critique, majeur ou mineur sur le scope 6.2.
