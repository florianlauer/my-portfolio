# Story 7.1: Navigation clavier et focus visible

Status: done

## Story

En tant que **visiteur utilisant le clavier**,
je veux naviguer dans le site au clavier avec un focus visible et un ordre logique,
afin d'utiliser le site sans souris (FR16, NFR-A1).

## Acceptance Criteria

1. **AC1** - Given toutes les sections et liens sont en place (Epics 1–6), When je navigue au clavier (Tab, Shift+Tab, Enter), Then tous les liens et contrôles interactifs sont atteignables et l'ordre de focus est logique.
2. **AC2** - Le focus est visible (outline ou style dédié) ; pas de piège au clavier (NFR-A1).

## Tasks / Subtasks

- [x] **Task 1** (AC: #1) - Skip link et cible main
  - [x] 1.1 Ajouter un lien « Aller au contenu » en premier focusable, ciblant `#contenu`.
  - [x] 1.2 Donner à `<main>` l’id `contenu` et `tabIndex={-1}` pour recevoir le focus après skip.
- [x] **Task 2** (AC: #2) - Focus visible sur tous les liens
  - [x] 2.1 En base (globals.css) : `a:focus-visible` avec outline ring cohérent.
  - [x] 2.2 Liens de la nav : focus-visible ring explicite (outline-none + ring pour cohérence visuelle).
- [x] **Task 3** (AC: #1, #2) - Validation
  - [x] 3.1 Vérifier ordre de tab (skip → nav → hero CTA → … → contact).
  - [x] 3.2 Lint et build.

## Dev Notes

- NFR-A1 : clavier, focus visible, ordre logique (architecture, PRD).
- Boutons (shadcn Button) ont déjà focus-visible:ring ; les liens bruts bénéficient du style global.

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Completion Notes List

- Skip link « Aller au contenu » en fixed, visible au focus (translate-y).
- Main avec id="contenu" et tabIndex={-1}.
- globals.css : a:focus-visible avec outline 2px ring.
- Nav : outline-none + focus-visible:ring-2 ring-ring ring-offset-2.

### File List

- `src/app/page.tsx`
- `src/app/globals.css`
- `_bmad-output/implementation-artifacts/7-1-navigation-clavier-et-focus-visible.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- 2026-02-14: Story 7.1 documentée, implémentée et validée.

## Senior Developer Review (AI)

- Date: 2026-02-14
- Outcome: **Approve**
- Findings: aucun finding critique sur le scope 7.1.
