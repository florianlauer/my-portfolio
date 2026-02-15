# Story 3.1: Ancrages et liens de navigation (Parcours, Arsenal, Contact)

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

En tant que **visiteur**,
je veux naviguer vers les sections Parcours, Arsenal et Contact via un menu ou des ancres,
afin de ne pas dependre du scroll aveugle (FR12).

## Acceptance Criteria

1. **AC1** - Given la page d'accueil affiche les sections Parcours, Arsenal, Contact, When je clique un lien de navigation (menu ou ancres), Then je suis amene a la section cible.
2. **AC2** - Les liens de navigation sont visibles et utilisables au clavier (focus visible, ordre logique).

## Tasks / Subtasks

- [x] **Task 1** (AC: #1) - Ajouter des ancres de section
  - [x] 1.1 Definir des ids stables sur les sections (`parcours`, `arsenal`, `contact`).
  - [x] 1.2 Verifier que les sections cibles existent et restent semantiques.
- [x] **Task 2** (AC: #1, #2) - Ajouter une navigation vers ces ancres
  - [x] 2.1 Ajouter un bloc `<nav>` visible en haut de la page.
  - [x] 2.2 Ajouter les liens `#parcours`, `#arsenal`, `#contact`.
  - [x] 2.3 Conserver des styles de focus/hover lisibles.
- [x] **Task 3** (AC: #1, #2) - Valider l'implementation
  - [x] 3.1 Executer `npm run lint`.
  - [x] 3.2 Executer `npm run build`.

## Dev Notes

- **Contexte local (Nix/devenv/direnv)** : executer `npm`/`npx` directement dans le repo.
- **Architecture cible** : navigation simple par ancres sur page statique.
- **Objectif story** : rendre l'acces aux sections critique immediat et robuste.

### Project Structure Notes

- Navigation implantee dans `src/app/page.tsx`.
- Ancres ajoutees dans les sections deja existantes.

### References

- [Source: _bmad-output/planning-artifacts/epics.md - Story 3.1]
- [Source: _bmad-output/planning-artifacts/architecture.md - Navigation/sections]
- [Source: project-context.md - Environnement local direnv/devenv]

## Developer Context (guardrails)

- Garder une navigation legere sans logique JS additionnelle.
- Maintenir le rendu statique et les imports absolus `@/...`.
- Conserver une structure semantique (`nav`, `main`, `section`).

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- `npm run lint`
- `npm run build`

### Completion Notes List

- IDs de section ajoutes sur Parcours, Arsenal et Contact.
- Navigation par ancres ajoutee en haut de la page (`#parcours`, `#arsenal`, `#contact`).
- Navigation visible et focusable au clavier.
- Validation technique executee: lint + build.

### File List

- `src/app/page.tsx`
- `src/components/home-sections/JourneySection.tsx`
- `src/components/home-sections/ArsenalSection.tsx`
- `src/components/home-sections/ContactSection.tsx`
- `_bmad-output/implementation-artifacts/2-3-cta-contact-linkedin-visible-10s.md`
- `_bmad-output/implementation-artifacts/3-1-ancrages-et-liens-de-navigation-parcours-arsenal-contact.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- 2026-02-14: Story 3.1 creee et implementee, statut passe a `review`.
