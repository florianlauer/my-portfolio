# Story 1.1: Initialisation du projet Next.js avec stack et design system

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

En tant que **Florian (propriétaire)**,
je veux que le projet soit initialisé avec Next.js, Tailwind, shadcn et motion,
afin d'avoir une base technique alignée avec l'architecture et prête pour le contenu.

## Acceptance Criteria

1. **AC1** — Given aucun projet Next.js existant dans le repo, When j'exécute les commandes d'init (create-next-app, shadcn init, npm install motion), Then le projet démarre avec `npm run dev`, Tailwind et l'alias `@/*` fonctionnent, et les composants shadcn sont disponibles.
2. **AC2** — La structure `src/app`, `src/components`, `src/hooks`, `src/utils`, `src/types` existe (dossiers vides ou avec fichiers de base).

## Tasks / Subtasks

- [x] **Task 1** (AC: #1) — Initialiser le projet Next.js avec la stack définie (setup direnv/devenv actif, commandes lancées directement)
  - [x] 1.1 Exécuter `npx create-next-app@latest my-portfolio --tailwind --eslint --app --src-dir --import-alias @/*` (ou adapter le nom si le repo existe déjà : utiliser le répertoire courant).
  - [x] 1.2 Vérifier que `npm run dev` démarre sans erreur et que la page d’accueil s’affiche.
  - [x] 1.3 Vérifier que Tailwind est actif (classes utilitaires appliquées) et que l’alias `@/*` résout correctement les imports depuis `src/`.
- [x] **Task 2** (AC: #1) — Ajouter shadcn/ui et Motion
  - [x] 2.1 Exécuter `npx shadcn@latest init` (répondre aux prompts : base colors neutral|gray|zinc|stone|slate selon architecture).
  - [x] 2.2 Exécuter `npm install motion`.
  - [x] 2.3 Vérifier qu’au moins un composant shadcn peut être ajouté (ex. `npx shadcn@latest add button`) et qu’il s’affiche sans erreur.
- [x] **Task 3** (AC: #2) — Garantir la structure de dossiers
  - [x] 3.1 Créer ou confirmer les dossiers : `src/app`, `src/components`, `src/hooks`, `src/utils`, `src/types` (vides ou avec fichiers de base si nécessaire).
  - [x] 3.2 Vérifier que la structure est cohérente avec le document d’architecture (Project Structure & Boundaries).

## Dev Notes

- **Environnement local (Nix / devenv + direnv)** : Le projet utilise **Nix** et **devenv** avec auto-activation `direnv`. Node.js (nodejs_22) et les autres outils sont fournis par `devenv.nix`. Les commandes `npm`, `npx`, `node` se lancent directement dans le terminal du repo.
  - `devenv shell` ou `devenv run` est un fallback si l’auto-activation n’est pas active.
  - Ne pas supposer que `node`/`npm` viennent d’une installation globale système.
- **Stack de référence (architecture)** : Next.js 15 (App Router), Tailwind 4, TypeScript, ESLint, alias `@/*`, déploiement Vercel. Pas de base de données ni d’API en MVP.
- **Commandes exactes (architecture)** — à lancer directement dans le repo (shell direnv actif) :
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
- **Testing** : Pour cette story, des tests manuels (`npm run dev`, vérification Tailwind/alias/shadcn) suffisent. Préparer le terrain pour des tests unitaires/E2E dans les stories suivantes (structure `__tests__/` ou `e2e/` selon architecture).
- **Environnement local** : Nix + devenv (+ direnv) ; Node.js fourni par `devenv.nix` (nodejs_22). Commandes npm/npx directes dans le repo.

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- `npx create-next-app@latest . --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes` (échec attendu: repo non vide)
- `npx create-next-app@latest tmp-next-bootstrap --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes` (bootstrap de référence)
- `npm install`
- `npm install motion`
- `npx shadcn@latest init -d`
- `npx shadcn@latest add button -y`
- `npm run dev` (OK, serveur prêt)
- `npm run lint` (OK)
- `npm run build` (OK)

### Completion Notes List

- Initialisation Next.js App Router + Tailwind + TypeScript + ESLint faite à la racine du repo avec alias `@/*`.
- Shadcn initialisé (`components.json`, `src/lib/utils.ts`) et composant `Button` ajouté (`src/components/ui/button.tsx`).
- Motion installé.
- Structure exigée AC2 validée: `src/app`, `src/components`, `src/hooks`, `src/utils`, `src/types`.
- Vérifications exécutées: `npm run dev`, `npm run lint`, `npm run build` (succès).
- Contexte local aligné avec `direnv+devenv` (commandes npm/npx directes dans le repo).
- Revue: dossier temporaire `tmp-next-bootstrap` supprimé, traçabilité story synchronisée.
- Revue: exception validée par l'utilisateur pour conserver Next.js 16.

### File List

- `.gitignore`
- `components.json`
- `eslint.config.mjs`
- `next-env.d.ts`
- `next.config.ts`
- `package-lock.json`
- `package.json`
- `postcss.config.mjs`
- `project-context.md`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/components/.gitkeep`
- `src/components/ui/button.tsx`
- `src/hooks/.gitkeep`
- `src/lib/utils.ts`
- `src/types/.gitkeep`
- `src/utils/.gitkeep`
- `tsconfig.json`
- `_bmad-output/implementation-artifacts/1-1-initialisation-du-projet-next-js-avec-stack-et-design-system.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Senior Developer Review (AI)

- Date: 2026-02-14
- Outcome: **Approve**
- Résolution:
  - ✅ Dossier temporaire retiré du workspace (`tmp-next-bootstrap` supprimé).
  - ✅ Discrépances story/git corrigées (File List mise à jour).
  - ✅ Exception validée explicitement par l'utilisateur: Next.js 16 conservé.

## Change Log

- 2026-02-14: Code review effectuée, correctifs appliqués (cleanup + traçabilité), story validée `done`.
