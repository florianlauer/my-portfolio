# Story 1.1: Initialisation du projet Next.js avec stack et design system

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

En tant que **Florian (propriétaire)**,
je veux que le projet soit initialisé avec Next.js, Tailwind, shadcn et motion,
afin d'avoir une base technique alignée avec l'architecture et prête pour le contenu.

## Acceptance Criteria

1. **AC1** — Given aucun projet Next.js existant dans le repo, When j'exécute les commandes d'init (create-next-app, shadcn init, npm install motion), Then le projet démarre avec `npm run dev`, Tailwind et l'alias `@/*` fonctionnent, et les composants shadcn sont disponibles.
2. **AC2** — La structure `src/app`, `src/components`, `src/hooks`, `src/utils`, `src/types` existe (dossiers vides ou avec fichiers de base).

## Tasks / Subtasks

- [ ] **Task 1** (AC: #1) — Initialiser le projet Next.js avec la stack définie (toutes les commandes dans le shell devenv : `devenv shell` ou `devenv run <cmd>`)
  - [ ] 1.1 Exécuter `npx create-next-app@latest my-portfolio --tailwind --eslint --app --src-dir --import-alias @/*` (ou adapter le nom si le repo existe déjà : utiliser le répertoire courant).
  - [ ] 1.2 Vérifier que `npm run dev` démarre sans erreur et que la page d’accueil s’affiche (ex. `devenv run npm run dev`).
  - [ ] 1.3 Vérifier que Tailwind est actif (classes utilitaires appliquées) et que l’alias `@/*` résout correctement les imports depuis `src/`.
- [ ] **Task 2** (AC: #1) — Ajouter shadcn/ui et Motion (dans le shell devenv)
  - [ ] 2.1 Exécuter `npx shadcn@latest init` (répondre aux prompts : base colors neutral|gray|zinc|stone|slate selon architecture).
  - [ ] 2.2 Exécuter `npm install motion`.
  - [ ] 2.3 Vérifier qu’au moins un composant shadcn peut être ajouté (ex. `npx shadcn@latest add button`) et qu’il s’affiche sans erreur.
- [ ] **Task 3** (AC: #2) — Garantir la structure de dossiers
  - [ ] 3.1 Créer ou confirmer les dossiers : `src/app`, `src/components`, `src/hooks`, `src/utils`, `src/types` (vides ou avec fichiers de base si nécessaire).
  - [ ] 3.2 Vérifier que la structure est cohérente avec le document d’architecture (Project Structure & Boundaries).

## Dev Notes

- **Environnement local (Nix / devenv)** : Le projet utilise **Nix** et **devenv** pour les outils et librairies en local. Node.js (nodejs_22) et les autres outils sont fournis par `devenv.nix`. Toutes les commandes `npm`, `npx`, `node` doivent être exécutées **dans le shell devenv** :
  - Soit entrer dans le shell : `devenv shell` puis exécuter les commandes.
  - Soit exécuter une commande ponctuelle : `devenv run npm run dev`, `devenv run npx shadcn@latest add button`, etc.
  - Ne pas supposer que `node`/`npm` sont installés globalement sur la machine ; toujours utiliser l’environnement devenv pour le dev local.
- **Stack de référence (architecture)** : Next.js 15 (App Router), Tailwind 4, TypeScript, ESLint, alias `@/*`, déploiement Vercel. Pas de base de données ni d’API en MVP.
- **Commandes exactes (architecture)** — à lancer dans le shell devenv :
  - Init : `npx create-next-app@latest my-portfolio --tailwind --eslint --app --src-dir --import-alias @/*`
  - Post-init : `npx shadcn@latest init` puis `npm install motion`
- **Conventions** : composants en PascalCase (`HeroSection.tsx`), dossiers en lowercase-with-dashes (`components/hero/`), utilitaires/hooks en camelCase ; named exports ; types en PascalCase ; pas d’enums, préférer `as const`.

### Project Structure Notes

- Alignement avec `_bmad-output/planning-artifacts/architecture.md` section « Complete Project Directory Structure » : tout le code sous `src/` avec `app/`, `components/`, `hooks/`, `utils/`, `types/` (et plus tard `content/`).
- Pas de conflit attendu : greenfield, premier story de l’epic Foundation.

### References

- [Source: _bmad-output/planning-artifacts/architecture.md — Starter Template Evaluation, Initialization Command, Post-init]
- [Source: _bmad-output/planning-artifacts/architecture.md — Frontend Architecture, Project Structure]
- [Source: _bmad-output/planning-artifacts/epics.md — Epic 1, Story 1.1]

## Developer Context (guardrails)

- **Technical requirements** : Next.js 15 App Router, Tailwind 4, TypeScript strict, ESLint. Imports absolus `@/…` pour tous les modules internes. Pas de DB, pas d’API en MVP.
- **Architecture compliance** : Respecter la structure `src/{app,components,hooks,utils,types}` et les conventions de nommage (Implementation Patterns). CI : lint + typecheck + build sur chaque push/PR (à configurer plus tard, pas bloquant pour cette story).
- **Library/framework** : Utiliser les versions documentées dans l’architecture (create-next-app@latest, shadcn@latest, motion). Ne pas introduire d’autres frameworks UI ou state global.
- **File structure** : Aucun fichier applicatif en dehors de `src/`. Config à la racine : `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `.eslintrc.json`.
- **Testing** : Pour cette story, des tests manuels (npm run dev via devenv, vérification Tailwind/alias/shadcn) suffisent. Préparer le terrain pour des tests unitaires/E2E dans les stories suivantes (structure `__tests__/` ou `e2e/` selon architecture).
- **Environnement local** : Nix + devenv ; Node.js fourni par `devenv.nix` (nodejs_22). Toujours exécuter npm/npx dans `devenv shell` ou via `devenv run <cmd>`.

## Dev Agent Record

### Agent Model Used

(À remplir par l’agent Dev après implémentation)

### Debug Log References

### Completion Notes List

### File List
