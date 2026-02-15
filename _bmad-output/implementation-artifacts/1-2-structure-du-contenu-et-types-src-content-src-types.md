# Story 1.2: Structure du contenu et types (src/content, src/types)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

En tant que **Florian**,
je veux que le contenu editable vive dans `src/content/*.ts` et les types dans `src/types/*.ts`,
afin de pouvoir mettre a jour Parcours et Arsenal sans toucher aux composants (FR18, FR19).

## Acceptance Criteria

1. **AC1** — Given le projet est initialise (Story 1.1), When j'ajoute les fichiers `src/content/site.ts`, `src/content/journey.ts`, `src/content/arsenal.ts`, `src/content/socialLinks.ts` et les types correspondants dans `src/types/`, Then chaque fichier content exporte des donnees typees (ex. `journeyChapters`, `arsenalItems`) et les types sont reutilisables par les composants.
2. **AC2** — Aucun import circulaire ; les types sont dans `src/types/` (ex. `journey.ts`, `arsenal.ts`, `site.ts`).

## Tasks / Subtasks

- [x] **Task 1** (AC: #1) — Definir les types metier reutilisables dans `src/types`
  - [x] 1.1 Creer `src/types/site.ts` avec les types du hero/site (titre, sous-titre, stack, CTA principal).
  - [x] 1.2 Creer `src/types/journey.ts` avec les types des chapitres (id, titre, lieu, description, skills, visuel).
  - [x] 1.3 Creer `src/types/arsenal.ts` avec les types des familles et items de stack.
  - [x] 1.4 Creer `src/types/socialLinks.ts` avec les types des liens de contact/reseaux.
- [x] **Task 2** (AC: #1) — Creer les modules `src/content/*.ts` type-safe
  - [x] 2.1 Creer `src/content/site.ts` et exporter des donnees typees (`siteContent`, `heroStack`).
  - [x] 2.2 Creer `src/content/journey.ts` et exporter des donnees typees (`journeyChapters`).
  - [x] 2.3 Creer `src/content/arsenal.ts` et exporter des donnees typees (`arsenalGroups`, `arsenalTags`).
  - [x] 2.4 Creer `src/content/socialLinks.ts` et exporter des donnees typees (`socialLinks`, `primaryContactLink`).
- [x] **Task 3** (AC: #1, #2) — Verifier la reutilisation des types et l'absence de cycles
  - [x] 3.1 Verifier que chaque fichier de `src/content` importe uniquement depuis `@/types/...` et exporte des valeurs strictement typees.
  - [x] 3.2 Verifier qu'aucun type n'importe `src/content` (sens unique types -> content uniquement).
  - [x] 3.3 Executer `npm run lint` et `npm run build` pour valider structure/typecheck.

## Dev Notes

- **Contexte local (Nix/devenv/direnv)** : executer `npm`/`npx` directement dans le repo (shell direnv actif).
- **Architecture cible** : contenu file-based dans `src/content/*.ts`, types partages dans `src/types/*`, imports absolus `@/...`.
- **Objectif story** : preparer la base de contenu modifiable pour les stories UI suivantes (Hero, Parcours, Arsenal, Contact).
- **Conventions** : named exports, TypeScript strict, pas d'enum (preferer `as const` si necessaire), pas d'import circulaire.

### Project Structure Notes

- Cette story ajoute `src/content/` (absent apres story 1.1) et remplit `src/types/` avec des definitions reutilisables.
- Aucun composant fonctionnel lourd attendu ici ; focus sur modelisation et structure.

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.2]
- [Source: _bmad-output/planning-artifacts/architecture.md — Data Architecture, Frontend Architecture]
- [Source: project-context.md — Environnement local direnv/devenv]

## Developer Context (guardrails)

- Garder les donnees mock initiales simples mais coherentes avec les FR (journey en 3 chapitres, arsenal par familles, contact externe).
- Ne pas introduire de fetch runtime, API, DB ou logique serveur.
- Les fichiers `src/content/*.ts` doivent etre directement importables depuis des composants serveur (SSG).
- Ajouter des types explicites de retour pour fonctions utilitaires eventuelles.

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- `npm run lint`
- `npm run build` (sandbox limite -> relance hors sandbox OK)

### Completion Notes List

- Types partages crees dans `src/types`: `site.ts`, `journey.ts`, `arsenal.ts`, `socialLinks.ts`.
- Modules de contenu crees dans `src/content`: `site.ts`, `journey.ts`, `arsenal.ts`, `socialLinks.ts`.
- Exports typés disponibles pour les stories UI suivantes (`siteContent`, `heroStack`, `journeyChapters`, `arsenalGroups`, `arsenalTags`, `socialLinks`, `primaryContactLink`).
- Mise a jour post-implémentation : X et Instagram ajoutés dans `socialLinks.ts`.
- Verification architecture: imports absolus `@/...`, pas de dependance `types -> content`, pas de cycle.
- Validation executee: lint + build OK.

### File List

- `src/types/site.ts`
- `src/types/journey.ts`
- `src/types/arsenal.ts`
- `src/types/socialLinks.ts`
- `src/content/site.ts`
- `src/content/journey.ts`
- `src/content/arsenal.ts`
- `src/content/socialLinks.ts`
- `_bmad-output/implementation-artifacts/1-2-structure-du-contenu-et-types-src-content-src-types.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Senior Developer Review (AI)

- Date: 2026-02-14
- Outcome: **Approve**
- Findings adresses :
  - `primaryContactLink` type corrige en `SocialLink | undefined` (tableau vide) + commentaire.
  - Completion Notes mise a jour (X, Instagram dans socialLinks).

## Change Log

- 2026-02-14: Story 1.2 implementee (types + content), statut passe a `review`.
- 2026-02-14: Code review effectuee, correctifs appliques, statut passe a `done`.
