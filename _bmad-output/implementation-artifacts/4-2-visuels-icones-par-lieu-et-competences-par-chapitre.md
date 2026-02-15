# Story 4.2: Visuels/icones par lieu et competences par chapitre

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

En tant que **visiteur**,
je veux voir, par chapitre, des elements visuels ou icones caracterisant les lieux et les competences associees,
afin d'avoir une lecture riche du parcours (FR5, FR6).

## Acceptance Criteria

1. **AC1** - Given les chapitres sont affiches (Story 4.1) et le modele de contenu inclut visuels/icones et liste de competences par chapitre, When je consulte chaque chapitre, Then chaque chapitre affiche un visuel ou une icone pour le lieu et une liste de competences.
2. **AC2** - Les competences et visuels sont issus de `src/content/journey.ts` ; structure semantique (titres, listes) pour SEO et accessibilite.

## Tasks / Subtasks

- [x] **Task 1** (AC: #1) - Ajouter les visuels/icones par chapitre
  - [x] 1.1 Mapper `visualKey` vers un visuel/icone d'affichage dans `JourneySection`.
  - [x] 1.2 Rendre l'icone/visuel visible dans chaque carte chapitre.
- [x] **Task 2** (AC: #1, #2) - Ajouter la liste de competences
  - [x] 2.1 Rendre les `skills` de chaque chapitre en liste semantique (`ul`/`li`).
  - [x] 2.2 Conserver les donnees issues de `src/content/journey.ts` sans hardcode de contenu chapitre.
- [x] **Task 3** (AC: #2) - Accessibilite et structure
  - [x] 3.1 Ajouter des labels pertinents sur le visuel de lieu et la liste de competences.
  - [x] 3.2 Conserver la hierarchie de titres existante.
- [x] **Task 4** (AC: #1, #2) - Valider l'implementation
  - [x] 4.1 Executer `npm run lint`.
  - [x] 4.2 Executer `npm run build`.

## Dev Notes

- **Contexte local (Nix/devenv/direnv)** : executer `npm`/`npx` directement dans le repo.
- **Architecture cible** : composants presentionnels alimentes par contenu TS.
- **Objectif story** : enrichir la lisibilite de la section Parcours sans ajouter de complexite runtime.

### Project Structure Notes

- Changement principal dans `JourneySection`.
- Aucune dependance externe ajoutee.

### References

- [Source: _bmad-output/planning-artifacts/epics.md - Story 4.2]
- [Source: _bmad-output/planning-artifacts/architecture.md - SEO/accessibilite]
- [Source: project-context.md - Environnement local direnv/devenv]

## Developer Context (guardrails)

- Conserver `src/content/journey.ts` comme source de verite.
- Privilegier des visuels simples (icones) en attendant les assets finaux.
- Imports absolus `@/...` uniquement.

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- `npm run lint`
- `npm run build`

### Completion Notes List

- Visuels/icones par chapitre rendus depuis `visualKey` dans `JourneySection`.
- Competences par chapitre affichees en liste semantique.
- Donnees toujours alimentees depuis `src/content/journey.ts`.
- Validation technique executee: lint + build.

### File List

- `src/components/home-sections/JourneySection.tsx`
- `_bmad-output/implementation-artifacts/4-1-section-parcours-avec-3-chapitres.md`
- `_bmad-output/implementation-artifacts/4-2-visuels-icones-par-lieu-et-competences-par-chapitre.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- 2026-02-14: Story 4.2 creee et implementee, statut passe a `review`.
- 2026-02-14: Code review effectuee, aucun finding bloquant, statut passe a `done`.

## Senior Developer Review (AI)

- Date: 2026-02-14
- Outcome: **Approve**
- Findings: aucun finding critique, majeur ou mineur sur le scope 4.2.
