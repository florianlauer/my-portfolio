# Story 4.1: Section Parcours avec 3 chapitres

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

En tant que **visiteur**,
je veux parcourir une section Parcours en 3 chapitres (Depart, Expansion, Aujourd'hui),
afin de comprendre le parcours geographique (FR4).

## Acceptance Criteria

1. **AC1** - Given le contenu `src/content/journey.ts` (et types `src/types/journey.ts`) definit au moins 3 chapitres avec titre, lieu, description, When je scroll ou navigue vers la section Parcours, Then une section affiche 3 blocs/chapitres (Depart, Expansion, Aujourd'hui) avec titre et texte pour chaque chapitre.
2. **AC2** - Les donnees viennent de `src/content/journey.ts` ; mise a jour du fichier change le contenu sans casser l'UX (FR18).

## Tasks / Subtasks

- [x] **Task 1** (AC: #1) - Verifier la structure Parcours en 3 chapitres
  - [x] 1.1 Confirmer que `journeyChapters` contient 3 chapitres minimum.
  - [x] 1.2 Verifier le rendu de chaque chapitre (titre, lieu, description) dans `JourneySection`.
  - [x] 1.3 Confirmer l'ancrage `#parcours` pour acces direct.
- [x] **Task 2** (AC: #2) - Verifier la source de verite contenu
  - [x] 2.1 S'assurer que `JourneySection` recoit les donnees via props depuis `src/content/journey.ts`.
  - [x] 2.2 Confirmer l'absence de hardcode des chapitres dans le composant.
- [x] **Task 3** (AC: #1, #2) - Valider l'implementation
  - [x] 3.1 Executer `npm run lint`.
  - [x] 3.2 Executer `npm run build`.

## Dev Notes

- **Contexte local (Nix/devenv/direnv)** : executer `npm`/`npx` directement dans le repo.
- **Architecture cible** : contenu file-based + composants presentionnels.
- **Objectif story** : stabiliser la section Parcours avant l'enrichissement visuel de la story 4.2.

### Project Structure Notes

- `src/content/journey.ts` porte la source de verite des chapitres.
- `src/components/home-sections/JourneySection.tsx` rend les blocs de parcours.

### References

- [Source: _bmad-output/planning-artifacts/epics.md - Story 4.1]
- [Source: _bmad-output/planning-artifacts/architecture.md - contenu TS, sections]
- [Source: project-context.md - Environnement local direnv/devenv]

## Developer Context (guardrails)

- Conserver les chapitres pilotables depuis `src/content/journey.ts`.
- Eviter toute logique runtime ou fetch externe.
- Imports absolus `@/...` uniquement.

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- `npm run lint`
- `npm run build`

### Completion Notes List

- Section Parcours affiche 3 chapitres depuis `journeyChapters`.
- Chaque bloc affiche titre, lieu et description.
- Donnees issues de `src/content/journey.ts` via props, sans hardcode des chapitres.
- Validation technique executee: lint + build.

### File List

- `src/content/journey.ts`
- `src/components/home-sections/JourneySection.tsx`
- `_bmad-output/implementation-artifacts/3-2-acces-direct-au-bloc-arsenal-recuperation-edge-case.md`
- `_bmad-output/implementation-artifacts/4-1-section-parcours-avec-3-chapitres.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- 2026-02-14: Story 4.1 creee et implementee, statut passe a `review`.
- 2026-02-14: Code review effectuee, aucun finding bloquant, statut passe a `done`.

## Senior Developer Review (AI)

- Date: 2026-02-14
- Outcome: **Approve**
- Findings: aucun finding critique, majeur ou mineur sur le scope 4.1.
