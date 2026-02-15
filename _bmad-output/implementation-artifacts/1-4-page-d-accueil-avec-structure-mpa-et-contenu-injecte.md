# Story 1.4: Page d'accueil avec structure MPA et contenu injecte

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

En tant que **visiteur**,
je veux une page d'accueil qui charge le contenu depuis `src/content` et affiche une structure de sections (placeholders si besoin),
afin que le site soit une MPA fonctionnelle et que le contenu soit modifiable sans refonte (FR20).

## Acceptance Criteria

1. **AC1** - Given le layout et les content sont en place (Stories 1.2, 1.3), When je charge la route d'accueil, Then la page est generee en SSG (pas de fetch runtime), les donnees sont importees depuis `src/content/*` et passees en props aux composants de section.
2. **AC2** - La page reste lisible et sans erreur si des sections sont encore des placeholders.

## Tasks / Subtasks

- [x] **Task 1** (AC: #1) - Structurer la home autour de composants de section
  - [x] 1.1 Creer des composants de section dedies (`HeroSection`, `JourneySection`, `ArsenalSection`, `ContactSection`).
  - [x] 1.2 Importer les donnees depuis `src/content/*` dans `src/app/page.tsx`.
  - [x] 1.3 Passer ces donnees en props aux composants de section (sans fetch runtime).
- [x] **Task 2** (AC: #2) - Garantir un rendu resilient et lisible
  - [x] 2.1 Ajouter un fallback visuel dans la section contact si `primaryContactLink` est absent.
  - [x] 2.2 Conserver une structure semantique lisible (`main`, sections, titres hierarchiques).
- [x] **Task 3** (AC: #1, #2) - Valider l'implementation
  - [x] 3.1 Executer `npm run lint`.
  - [x] 3.2 Executer `npm run build`.

## Dev Notes

- **Contexte local (Nix/devenv/direnv)** : executer `npm`/`npx` directement dans le repo (shell direnv actif).
- **Architecture cible** : App Router en SSG, contenu file-based (`src/content/*`) consomme directement par la page.
- **Objectif story** : fournir une home fonctionnelle et modulaire avant les stories detaillees Hero/Parcours/Arsenal/Contact.

### Project Structure Notes

- Nouveaux composants de section ajoutes dans `src/components/home-sections/`.
- `src/app/page.tsx` agit comme orchestration et injection de contenu type.

### References

- [Source: _bmad-output/planning-artifacts/epics.md - Story 1.4]
- [Source: _bmad-output/planning-artifacts/architecture.md - App Router, contenu TS local]
- [Source: project-context.md - Environnement local direnv/devenv]

## Developer Context (guardrails)

- Aucun fetch runtime, aucune API/DB.
- Imports absolus `@/...` uniquement.
- Composants simples et evolutifs pour stories suivantes.

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- `npm run lint`
- `npm run build`

### Completion Notes List

- Home recomposee en sections dediees: hero, parcours, arsenal, contact.
- Donnees importees depuis `src/content/*` et injectees via props (SSG sans fetch runtime).
- Fallback utilisateur ajoute si `primaryContactLink` est absent.
- Validation technique executee: lint + build.

### File List

- `src/app/page.tsx`
- `src/components/home-sections/HeroSection.tsx`
- `src/components/home-sections/JourneySection.tsx`
- `src/components/home-sections/ArsenalSection.tsx`
- `src/components/home-sections/ContactSection.tsx`
- `_bmad-output/implementation-artifacts/1-4-page-d-accueil-avec-structure-mpa-et-contenu-injecte.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- 2026-02-14: Story 1.4 creee et implementee, statut passe a `review`.
- 2026-02-14: Code review effectuee, aucun finding bloquant, statut passe a `done`.

## Senior Developer Review (AI)

- Date: 2026-02-14
- Outcome: **Approve**
- Findings: aucun finding critique, majeur ou mineur sur le scope 1.4.
