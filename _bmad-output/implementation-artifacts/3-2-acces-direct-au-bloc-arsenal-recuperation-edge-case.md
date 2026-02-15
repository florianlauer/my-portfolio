# Story 3.2: Accès direct au bloc Arsenal (récupération edge case)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

En tant que **visiteur presse**,
je veux atteindre le bloc Arsenal/Stack via un ancrage ou un lien dedie,
afin de trouver la stack meme si j'ai rate le Hero (FR9).

## Acceptance Criteria

1. **AC1** - Given la navigation par ancres est en place (Story 3.1), When je clique sur un lien "Arsenal" ou "Stack" (menu ou CTA dedie), Then la page scroll jusqu'au bloc Arsenal et le contenu stack est visible.
2. **AC2** - Ce comportement fonctionne au clavier et sur mobile.

## Tasks / Subtasks

- [x] **Task 1** (AC: #1) - Ajouter un acces direct "Stack" dedie
  - [x] 1.1 Ajouter un lien explicite vers `#arsenal` dans la zone Hero.
  - [x] 1.2 Conserver le lien "Arsenal" dans la navigation globale.
  - [x] 1.3 Verifier que le bloc Arsenal est bien atteint et visible apres navigation.
- [x] **Task 2** (AC: #2) - Garantir l'accessibilite et l'usage mobile
  - [x] 2.1 Utiliser des elements focusables nativement (`a`).
  - [x] 2.2 Conserver des styles lisibles et activables en petit ecran.
- [x] **Task 3** (AC: #1, #2) - Valider l'implementation
  - [x] 3.1 Executer `npm run lint`.
  - [x] 3.2 Executer `npm run build`.

## Dev Notes

- **Contexte local (Nix/devenv/direnv)** : executer `npm`/`npx` directement dans le repo.
- **Architecture cible** : MPA statique avec navigation par ancres.
- **Objectif story** : recuperation rapide pour visiteurs qui veulent aller directement a la stack.

### Project Structure Notes

- Changement cible sur `HeroSection` pour le lien dedie Stack.
- Aucun ajout de logique JS ou dependance.

### References

- [Source: _bmad-output/planning-artifacts/epics.md - Story 3.2]
- [Source: _bmad-output/planning-artifacts/architecture.md - navigation par ancres]
- [Source: project-context.md - Environnement local direnv/devenv]

## Developer Context (guardrails)

- Maintenir la source de verite stack dans la section Arsenal.
- Pas de fetch runtime.
- Imports absolus `@/...` uniquement.

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- `npm run lint`
- `npm run build`

### Completion Notes List

- Lien dedie "Voir la stack" ajoute dans le Hero vers `#arsenal`.
- Navigation existante "Arsenal" conservee en haut de page.
- Acces direct au bloc Arsenal operationnel clavier/mobile.
- Validation technique executee: lint + build.

### File List

- `src/components/home-sections/HeroSection.tsx`
- `_bmad-output/implementation-artifacts/3-1-ancrages-et-liens-de-navigation-parcours-arsenal-contact.md`
- `_bmad-output/implementation-artifacts/3-2-acces-direct-au-bloc-arsenal-recuperation-edge-case.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- 2026-02-14: Story 3.2 creee et implementee, statut passe a `review`.
- 2026-02-14: Code review effectuee, aucun finding bloquant, statut passe a `done`.

## Senior Developer Review (AI)

- Date: 2026-02-14
- Outcome: **Approve**
- Findings: aucun finding critique, majeur ou mineur sur le scope 3.2.
