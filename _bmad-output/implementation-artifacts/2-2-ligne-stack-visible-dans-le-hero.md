# Story 2.2: Ligne stack visible dans le Hero

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

En tant que **visiteur**,
je veux voir une ligne stack courte (technologies cles) dans le Hero ou immediatement en haut de page,
afin de trouver la stack en <= 10s (FR2, FR13).

## Acceptance Criteria

1. **AC1** - Given le Hero est affiche (Story 2.1) et le contenu fournit la liste stack (dans `site.ts`), When je charge la page ou fais un scroll minimal, Then une ligne stack (ex. `TypeScript · React · Node`) est visible dans le Hero ou juste en dessous, sans scroll long.
2. **AC2** - Le contenu stack est issu de `src/content` (pas de hardcode dans le composant).

## Tasks / Subtasks

- [x] **Task 1** (AC: #1, #2) - Afficher une ligne stack explicite dans le Hero
  - [x] 1.1 Utiliser les donnees `heroStack` injectees depuis `src/content/site.ts`.
  - [x] 1.2 Transformer la liste en ligne lisible (`A · B · C`) dans `HeroSection`.
  - [x] 1.3 Verifier la visibilite immediate dans la zone Hero.
- [x] **Task 2** (AC: #2) - Confirmer l'absence de hardcode
  - [x] 2.1 S'assurer que la ligne est derivee de `heroStack` via props.
  - [x] 2.2 Garder `src/content/site.ts` comme source unique des technologies.
- [x] **Task 3** (AC: #1, #2) - Valider l'implementation
  - [x] 3.1 Executer `npm run lint`.
  - [x] 3.2 Executer `npm run build`.

## Dev Notes

- **Contexte local (Nix/devenv/direnv)** : executer `npm`/`npx` directement dans le repo.
- **Architecture cible** : contenu file-based + composants presentionnels.
- **Objectif story** : rendre la stack visible instantanement dans le Hero.

### Project Structure Notes

- Changement cible: `src/components/home-sections/HeroSection.tsx`.
- Pas d'ajout de dependance ni de logique runtime.

### References

- [Source: _bmad-output/planning-artifacts/epics.md - Story 2.2]
- [Source: _bmad-output/planning-artifacts/architecture.md - contenu TS et rendering statique]
- [Source: project-context.md - Environnement local direnv/devenv]

## Developer Context (guardrails)

- Ne pas hardcoder la stack dans le composant.
- Rester compatible avec les stories suivantes (CTA 2.3).
- Imports absolus `@/...` uniquement.

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- `npm run lint`
- `npm run build`

### Completion Notes List

- Ligne stack rendue explicitement dans le Hero sous forme `label · label · label`.
- Valeurs derivees de `heroStack` (source `src/content/site.ts`) sans hardcode.
- Validation technique executee: lint + build.

### File List

- `src/components/home-sections/HeroSection.tsx`
- `_bmad-output/implementation-artifacts/2-2-ligne-stack-visible-dans-le-hero.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- 2026-02-14: Story 2.2 creee et implementee, statut passe a `review`.
- 2026-02-14: Code review effectuee, aucun finding bloquant, statut passe a `done`.

## Senior Developer Review (AI)

- Date: 2026-02-14
- Outcome: **Approve**
- Findings: aucun finding critique, majeur ou mineur sur le scope 2.2.
