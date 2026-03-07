---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-02-01'
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
  - '_bmad-output/planning-artifacts/product-brief-my-portfolio-2026-02-01.md'
workflowType: 'architecture'
project_name: 'my-portfolio'
user_name: 'Florian'
date: '2026-02-14'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

---

## Project Context Analysis

### Requirements Overview

**Functional Requirements (FR) — Implications architecturales :**

- **Hero & Présentation (FR1–FR3)** : rendu rapide du Hero + ligne stack + CTA contact visible (≤10s) → priorité au rendu initial, images optimisées, pas de blocage par animation.
- **Parcours (FR4–FR6)** : contenu structuré en 3 chapitres, avec visuels/icônes + compétences par étape → modèle de contenu clair (chapitres, lieux, compétences).
- **Arsenal & Stack (FR7–FR9)** : stack par familles (Frontend/Backend/DevOps) + tags skills + ancrage direct → composants réutilisables, structure de données stable (listes/groupes).
- **Contact & CTA (FR10–FR11)** : CTA LinkedIn + liens réseaux → liens externes sécurisés (`rel="noopener noreferrer"`), pas de formulaire en MVP.
- **Navigation & Ancrages (FR12–FR13)** : ancrages + éventuellement barre sticky → gestion scroll/anchors + (post-MVP) scroll-spy.
- **SEO & Indexation (FR14–FR15)** : title/meta par page, structure sémantique → stratégie SEO par route (MPA) + balises OG.
- **Accessibilité (FR16–FR17)** : clavier, focus visible, contrastes, sémantique → WCAG AA recommandé.
- **Maintenance contenu (FR18–FR19)** : mise à jour Parcours/Arsenal sans casser l’UX → contenu externalisable (fichiers data / CMS léger / markdown) plutôt que hardcode dispersé.
- **MPA (FR20)** : plusieurs routes/pages → choix du framework/routing/SSR/SSG en cohérence SEO.

**Non-Functional Requirements (NFR) — Ce qui drive l’architecture :**

- **Performance** : stack + CTA visibles en ≤10s ; images Hero optimisées ; motion légère.
- **Accessibilité** : navigation clavier, focus, contrastes, alt.
- **Security** : pas de collecte de données en MVP ; HTTPS.
- **Reliability** : hébergement standard, disponibilité “portfolio”.

**Scale & Complexity :**

- Primary domain : **web app / site vitrine (MPA)**, contenu majoritairement statique.
- Complexity level : **low** (greenfield, pas de temps réel, pas d’intégrations, pas de données sensibles).
- Estimated architectural components : ~6–9
  - rendu pages/routes + SEO/meta
  - composants UI (Hero/Parcours/Arsenal/Contact/Nav)
  - modèle de contenu (chapitres, skills, liens)
  - pipeline assets/images
  - déploiement + HTTPS
  - analytics optionnel (sans tracking intrusif)

### Technical Constraints & Dependencies

- **MPA** (décision produit) : plusieurs pages/routes.
- **Contact MVP** : lien externe (LinkedIn), **pas de formulaire**.
- **Motion** : sobre, ne doit pas bloquer l’accès à l’info critique.
- **Compat navigateurs** : evergreen (Chrome/Firefox/Safari/Edge).
- **SEO** : title/meta par route, structure sémantique.
- **A11y** : niveau “bon” → viser WCAG 2.1 AA sur l’essentiel.

### Cross-Cutting Concerns Identified

- **SEO & Meta management** (par route) — titles, descriptions, OG.
- **Performance & images** — above-the-fold, budgets, motion non bloquant.
- **Accessibilité** — clavier/focus, contrastes, sémantique, alt.
- **Navigation** — ancrages, sticky (option), scroll behavior, état actif (post-MVP).
- **Content modeling** — Parcours/Arsenal maintenables et réutilisables.

---

## Starter Template Evaluation

### Primary Technology Domain

Web app (portfolio) avec SEO + SSR/SSG, déployée sur Vercel.

### Reference Versions (verified)

Versions de référence vérifiées via sources officielles (MCP Exa) :

- **Node.js LTS** : **24.13.1 (LTS)** — `nodejs.org` release post
- **Next.js (latest stable)** : **15.5.12** — `next-changelog.vercel.app`
- **Next.js (LTS channel)** : **16.1.6 (LTS)** — `endoflife.date/nextjs`
- **Tailwind CSS (latest stable)** : **4.1.18** — `npmjs.com/package/tailwindcss`
- **shadcn/ui CLI** : `npx shadcn@latest init` — base colors `neutral|gray|zinc|stone|slate`
- **Motion (ex-Framer Motion)** : **motion 12.34.0** — `npmjs.com/package/motion`

### Starter Options Considered

- **Option 1 (sélectionnée)** : Next.js (App Router) + Tailwind + TypeScript + ESLint + alias `@/*` (déploiement Vercel).
- Option 2 : Remix + Vercel (non retenue).
- Option 3 : Astro + React + Vercel (non retenue).

### Selected Starter: Next.js (Option 1)

**Rationale for Selection:**

- SSR/SSG/ISR natifs, SEO fort, très bon fit Vercel.
- Compatible Tailwind + Shadcn UI + motion.
- Permet de garantir rapidement “stack + contact ≤10s” (perf + rendu initial).

**Initialization Command:**

```bash
npx create-next-app@latest my-portfolio --tailwind --eslint --app --src-dir --import-alias @/*
```

**Post-init (design system + motion):**

```bash
npx shadcn@latest init
npm install motion
```

---

## Core Architectural Decisions

### Data Architecture

**Decision:** File-based, typed TypeScript content (MVP)

- **Database**: none (MVP)
- **Content source**: TypeScript modules under `src/content/` (e.g. `site.ts`, `journey.ts`, `arsenal.ts`, `socialLinks.ts`)
- **Types**: shared types under `src/types/` (or `src/content/types.ts`) for Parcours/Arsenal/links
- **Consumption (Next.js)**: direct imports from server components/pages for SSR/SSG with type-safety
- **Assets (photos/icônes)**: stored under `public/` and rendered via `next/image` (optimize above-the-fold)

**Rationale:**

- Aligns with MVP scope (portfolio, low complexity, content changes via commit + deploy)
- Strong type-safety + easy refactor as the structure evolves
- Minimal runtime overhead; good fit for perf + SEO goals

**Deferred (post-MVP):**

- Optional migration to MDX or CMS if editing without redeploy becomes a need

### Authentication & Security

**Decision:** No authentication (MVP)

- **Auth**: none (site public)
- **User data**: none collected/stored in MVP (no contact form)
- **Contact**: external link (LinkedIn) only

**Security baseline:**

- **HTTPS**: provided by Vercel
- **External links**: `rel="noopener noreferrer"` for `target="_blank"`
- **Headers**: baseline security headers can be added later (CSP, Permissions-Policy) if desired

**Rationale:**

- Aligns with PRD/NFR scope (no sensitive data, minimal surface area)
- Avoids unnecessary complexity for an MVP portfolio

### API & Communication Patterns

**Decision:** No API layer (MVP)

- **API**: none in MVP (no external integrations, no backend endpoints required)
- **Communication**: page render reads content from `src/content/*` directly
- **Routing**: handled by Next.js App Router (MPA-style pages/routes)

**Deferred (post-MVP):**

- Route Handlers (`app/api/*`) if future needs emerge (contact form, analytics proxy, dynamic content)

### Frontend Architecture

**Framework:** Next.js (App Router) + React + TypeScript

**Rendering Strategy (MVP):** SSG by default

- **Default**: static generation for content pages (fast, SEO-friendly)
- **SSR**: only if a future requirement becomes truly dynamic (not expected in MVP)
- **ISR**: optional later if you want refresh without full redeploy (not required with file-based content)

**Project Structure:**

- **Routes**: `src/app/**` (App Router)
- **Components**: `src/components/**`
- **Hooks**: `src/hooks/**`
- **Utils**: `src/utils/**`
- **Types**: `src/types/**`
- **Content**: `src/content/**` (file-based TS content)

**SEO & Metadata:**

- Use App Router metadata per route (`metadata` export) for title/description/OG tags.

**Styling & UI:**

- Tailwind CSS + shadcn/ui components, themed via CSS variables + Tailwind tokens.

### Infrastructure & Deployment

**Hosting:** Vercel

**Environments:**

- **Preview deployments**: enabled (per branch/PR) via Vercel
- **Production**: enabled
- **Environment variables**: none expected for MVP (add later only if a service requires it)

**Observability (MVP):** Minimal

- Rely on Vercel deployment logs + runtime logs
- No dedicated error tracking (e.g. Sentry) in MVP unless a real need appears

**CI / Quality Gate (MVP):** Minimal but strict

- Run **lint** + **typecheck** + **build** on every push/PR (e.g. GitHub Actions)

---

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**

- Starter: Next.js (App Router) + TypeScript + Tailwind + Vercel
- Data: file-based TS content under `src/content/*` (no DB)
- Security: no auth, no data collection, HTTPS
- API: no API layer in MVP
- Frontend: SSG by default, metadata per route

**Important Decisions (Shape Architecture):**

- UI system: shadcn/ui + Tailwind theming (CSS variables)
- Motion: Motion (`motion` package) for client-side animations where needed
- Navigation: anchor-based navigation (+ optional scroll spy later)
- CI: lint + typecheck + build gate

**Deferred Decisions (Post-MVP):**

- Contact form (and therefore API routes + anti-spam + storage)
- Analytics (privacy-friendly) and/or error tracking (Sentry)
- MDX/CMS migration for content editing without redeploy
- Arsenal interactive visualization (graph/zoom/click progressive disclosure)

### Decision Impact Analysis

**Implementation Sequence (high-level):**

1. Initialize repo via `create-next-app` (TS, Tailwind, App Router, src-dir, alias)
2. Add shadcn/ui (`npx shadcn@latest init`) + install Motion (`npm install motion`)
3. Create `src/content/*` + `src/types/*` and wire pages/routes (SSG)
4. Implement Hero (stack + CTA) + anchor navigation + Contact
5. Implement Parcours + Arsenal sections
6. Add motion/hover polish (client components), optimize images (`next/image`)
7. Add CI (lint/typecheck/build) and deploy on Vercel

**Cross-Component Dependencies:**

- Content model (`src/content/*`) drives Parcours/Arsenal/Contact rendering.
- Visual foundation (Tailwind tokens + shadcn) drives UI consistency.
- Motion should not block above-the-fold rendering (keep animations lightweight).

---

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:** 6 domaines où les agents IA pourraient faire des choix divergents (nommage code/structure, formats contenu, erreurs/chargement, tests, assets, métadonnées).

### Naming Patterns

**Database Naming Conventions:** N/A (pas de base de données en MVP).

**API Naming Conventions:** N/A en MVP. Si des Route Handlers sont ajoutés plus tard : REST-style, pluriel pour collections (`/api/…`), paramètres en `kebab-case` pour les query params.

**Code Naming Conventions:**

- **Composants / fichiers de composants :** PascalCase — ex. `UserCard.tsx`, `HeroSection.tsx`.
- **Dossiers :** lowercase avec tirets — ex. `components/form-wizard`, `content`.
- **Fichiers utilitaires / hooks :** camelCase — ex. `formValidator.ts`, `useScrollSpy.ts`.
- **Variables / fonctions :** camelCase ; booléens avec auxiliaires — ex. `isLoading`, `hasError`, `getUserData`.
- **Types :** PascalCase — ex. `JourneyChapter`, `ArsenalItem`.
- **Constantes :** UPPER_SNAKE pour vraies constantes, sinon camelCase ; préférer `as const` aux enums.
- **Exports :** named exports pour composants et utilitaires.

### Structure Patterns

**Project Organization:**

- **Tests :** unitaires à côté du code ou dans `__tests__` (ex. `utils/__tests__/formValidator.test.ts`) ; E2E dans un dossier dédié (ex. `e2e/` ou `tests/e2e/`).
- **Composants :** par type dans `src/components/` ; sous-dossiers par feature si besoin (ex. `components/hero/`, `components/arsenal/`).
- **Utilitaires partagés :** `src/utils/`.
- **Hooks :** `src/hooks/`.
- **Types partagés :** `src/types/`.
- **Contenu :** `src/content/*.ts` (ex. `site.ts`, `journey.ts`, `arsenal.ts`, `socialLinks.ts`).

**File Structure:**

- Config racine : `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`.
- Variables d’environnement : `.env*` à la racine (jamais commit de secrets).
- Assets statiques : `public/` ; images référencées via `next/image` avec chemins depuis `public/`.
- Documentation : README à la racine ; commentaires dans le code pour logique non évidente.

### Format Patterns

**API Response Formats:** N/A en MVP. Si Route Handlers plus tard : réponses JSON en camelCase ; erreurs avec structure cohérente (ex. `{ message: string, code?: string }`).

**Data Exchange Formats (contenu & types):**

- **Contenu (`src/content/*`) :** objets TypeScript typés ; propriétés en **camelCase**.
- **Dates :** chaînes ISO 8601 si besoin (ex. `"2026-02-01"`).
- **Listes :** tableaux typés ; pas d’objet pour un seul élément quand une liste est attendue.
- **Null/optional :** utiliser `undefined` ou champs optionnels plutôt que `null` quand c’est le style du projet.

### Communication Patterns

**Event System Patterns:** Pas de bus d’événements global en MVP. Événements React locaux (onClick, onChange) ; nommage en camelCase (ex. `onSectionChange`).

**State Management Patterns:**

- Mise à jour d’état **immuable** (pas de mutation directe).
- État local (useState/useReducer) par composant ; pas de store global sauf besoin clair.
- Nommage des setters / actions : préfixe `set` ou verbe explicite (ex. `setIsOpen`, `handleSubmit`).

### Process Patterns

**Error Handling Patterns:**

- Error boundaries React pour contenir les erreurs de rendu (au moins au niveau page ou layout).
- Messages utilisateur clairs et non techniques ; logs détaillés côté dev (console ou futur Sentry).
- Éviter try/catch sauf pour traduire ou gérer l’erreur à ce niveau d’abstraction ; laisser remonter sinon.
- Gestion des échecs réseau : feedback utilisateur (message + possibilité de réessayer si pertinent).

**Loading State Patterns:**

- Nommage : `isLoading`, `isPending` (requêtes), `hasError` pour état d’erreur.
- États de chargement locaux par composant/section ; pas de loader global sauf besoin explicite.
- Skeleton / placeholder pour contenu above-the-fold si chargement perceptible ; pas de blocage de l’accès à l’info critique par une animation.

### Enforcement Guidelines

**Tous les agents IA DOIVENT :**

- Respecter la structure de dossiers `src/{app,components,hooks,utils,types,content}` et les conventions de nommage ci-dessus.
- Utiliser les imports absolus `@/…` pour tous les modules internes.
- Typer explicitement les retours de fonctions et les props des composants (TypeScript strict).
- Utiliser des composants fonctionnels et des hooks ; pas de classes pour l’UI.
- Vérifier accessibilité (clavier, focus, contrastes) et SEO (metadata par route) pour les nouvelles pages/composants.

**Vérification des patterns :**

- Lint (ESLint) + typecheck (tsc) + build dans la CI sur chaque push/PR.
- Revue de code pour cohérence nommage/structure ; violations documentées dans les PRs ou dans un fichier de conventions si besoin.
- Mise à jour de ce document d’architecture si de nouveaux patterns sont adoptés.

### Pattern Examples

**Bonnes pratiques :**

- Composant : `export function HeroSection({ title, subtitle }: HeroSectionProps) { … }` dans `src/components/hero/HeroSection.tsx`.
- Contenu : `export const journeyChapters: JourneyChapter[] = [ … ]` dans `src/content/journey.ts` avec types dans `src/types/journey.ts`.
- Hook : `export function useScrollSpy(ids: string[]): string { … }` dans `src/hooks/useScrollSpy.ts`.
- Lien externe : `<a href="…" target="_blank" rel="noopener noreferrer">`.

**À éviter :**

- Fichiers composants en kebab-case (`hero-section.tsx`) ou dossiers en PascalCase.
- Enums TypeScript ; préférer `const STATUS = { … } as const` et types dérivés.
- try/catch large sans gestion ni log ; mutation directe du state.
- Données de contenu en snake_case dans les fichiers TS.
- Animations lourdes ou bloquantes au-dessus de la ligne de flottaison.

---

## Project Structure & Boundaries

### Complete Project Directory Structure

```
my-portfolio/
├── README.md
├── package.json
├── package-lock.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── .env.example
├── .env.local
├── .gitignore
├── .eslintrc.json
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── hero/
│   │   │   └── HeroSection.tsx
│   │   ├── journey/
│   │   │   └── JourneySection.tsx
│   │   ├── arsenal/
│   │   │   └── ArsenalSection.tsx
│   │   ├── contact/
│   │   │   └── ContactSection.tsx
│   │   └── navigation/
│   │       └── NavAnchor.tsx
│   ├── hooks/
│   │   └── useScrollSpy.ts
│   ├── utils/
│   ├── types/
│   │   ├── journey.ts
│   │   ├── arsenal.ts
│   │   └── site.ts
│   └── content/
│       ├── site.ts
│       ├── journey.ts
│       ├── arsenal.ts
│       └── socialLinks.ts
├── public/
│   └── images/
├── __tests__/
│   ├── utils/
│   └── components/
└── e2e/
```

### Architectural Boundaries

**API Boundaries:** Aucune en MVP. Pas de Route Handlers ; pas de frontière API interne. Si évolution : `src/app/api/*` avec conventions REST et réponses JSON typées.

**Component Boundaries:**

- **Pages (App Router)** : `src/app/**` — layout + page(s) ; importent contenu depuis `src/content/*` et composants depuis `src/components/**`.
- **Sections** : Hero, Journey, Arsenal, Contact sont des composants de section ; ils reçoivent des props typées (données depuis `content`) et n’accèdent pas directement aux fichiers de contenu.
- **UI partagée** : `src/components/ui/` (shadcn) ; pas de state global ; état local ou props.

**Service Boundaries:** Aucun service backend. “Contenu” = modules TS dans `src/content/*` importés par les pages/composants serveur.

**Data Boundaries:**

- **Source de vérité** : `src/content/*.ts` (exports typés).
- **Types** : `src/types/*.ts` ; utilisés par `content` et par les composants.
- **Assets** : `public/` ; référencés via chemins publics ou `next/image` ; pas de DB ni cache applicatif en MVP.

### Requirements to Structure Mapping

**Hero & Présentation (FR1–FR3):**

- Composants : `src/components/hero/`
- Contenu : `src/content/site.ts` (titre, sous-titre, CTA)
- Page : `src/app/page.tsx` (ou layout)

**Parcours (FR4–FR6):**

- Composants : `src/components/journey/`
- Contenu : `src/content/journey.ts` ; types : `src/types/journey.ts`

**Arsenal & Stack (FR7–FR9):**

- Composants : `src/components/arsenal/`
- Contenu : `src/content/arsenal.ts` ; types : `src/types/arsenal.ts`

**Contact & CTA (FR10–FR11):**

- Composants : `src/components/contact/`
- Contenu : `src/content/socialLinks.ts`

**Navigation & Ancrages (FR12–FR13):**

- Composants : `src/components/navigation/`
- Hook (optionnel) : `src/hooks/useScrollSpy.ts`

**SEO & Meta (FR14–FR15):** Exports `metadata` dans `src/app/layout.tsx` et `src/app/page.tsx` (et autres routes si MPA étendu).

**Cross-cutting:** Tailwind + shadcn = `src/app/globals.css`, `src/components/ui/` ; motion = composants client dans les sections concernées.

### Integration Points

**Internal Communication:** Pages/layouts importent `content` et passent les données en props aux sections. Pas d’events globaux ; état local React par composant.

**External Integrations:** Liens externes (LinkedIn, réseaux) uniquement ; `rel="noopener noreferrer"` pour `target="_blank"`. Aucun SDK tiers en MVP sauf stack technique (Next, Tailwind, motion, shadcn).

**Data Flow:** `src/content/*` → import dans page/layout → props vers sections → rendu SSG. Aucun fetch runtime en MVP.

### File Organization Patterns

**Configuration:** Fichiers à la racine (`next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `.eslintrc.json`). Variables d’environnement : `.env.example` / `.env.local` à la racine.

**Source:** Tout le code applicatif sous `src/` ; App Router sous `src/app/` ; composants par feature sous `src/components/<feature>/` ; utilitaires et hooks partagés dans `src/utils/`, `src/hooks/`.

**Tests:** Unitaires à côté du code ou dans `__tests__/` (utils, components) ; E2E dans `e2e/`.

**Assets:** Images et fichiers statiques dans `public/` ; sous-dossier `public/images/` pour photos Hero et visuels.

### Development Workflow Integration

**Development:** `npm run dev` (Next.js dev server) ; structure `src/` avec alias `@/*` pour imports.

**Build:** `npm run build` produit le SSG ; sortie dans `.next/` ; CI exécute lint + typecheck + build.

**Deployment:** Vercel build depuis racine ; pas de dossier déploiement dédié ; preview + production selon branche.

---

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:** Les choix (Next.js 15, Tailwind 4, shadcn, motion, contenu TS sans DB/API) sont compatibles. Versions vérifiées. Aucune contradiction.

**Pattern Consistency:** Conventions de nommage, structure des dossiers et patterns (pas d’API, pas d’events globaux) sont alignés avec le stack et le scope MVP.

**Structure Alignment:** L’arborescence reflète les décisions (pas d’API, pas de DB, contenu dans `src/content/`, sections et boundaries définis).

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:** Chaque catégorie FR (Hero, Parcours, Arsenal, Contact, Navigation, SEO, A11y, contenu) est couverte par des décisions et un mapping vers des dossiers/fichiers explicites.

**Non-Functional Requirements Coverage:** Performance (SSG, images optimisées), sécurité (HTTPS, pas de collecte), fiabilité (Vercel, CI) sont pris en charge.

### Implementation Readiness Validation ✅

**Decision Completeness:** Décisions critiques documentées avec versions ; patterns avec exemples et anti-patterns.

**Structure Completeness:** Arborescence complète avec fichiers/dossiers nommés ; boundaries et points d’intégration décrits.

**Pattern Completeness:** Points de conflit potentiels (nommage, structure, formats, erreurs, chargement) couverts par les Implementation Patterns.

### Gap Analysis Results

- **Critical:** Aucun.
- **Important:** Aucun.
- **Nice-to-have:** Déjà couvert (types site dans `src/types/site.ts`).

### Architecture Completeness Checklist

**✅ Requirements Analysis**

- [x] Contexte projet analysé
- [x] Échelle et complexité évaluées
- [x] Contraintes techniques identifiées
- [x] Cross-cutting concerns mappés

**✅ Architectural Decisions**

- [x] Décisions critiques documentées avec versions
- [x] Stack technique spécifié
- [x] Patterns d’intégration définis
- [x] Performance prise en compte

**✅ Implementation Patterns**

- [x] Conventions de nommage établies
- [x] Patterns de structure définis
- [x] Patterns de communication spécifiés
- [x] Patterns de processus documentés

**✅ Project Structure**

- [x] Arborescence complète définie
- [x] Frontières composants établies
- [x] Points d’intégration mappés
- [x] Mapping exigences → structure complété

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** Élevé — validation cohérence, couverture des exigences et préparation à l’implémentation réalisées.

**Key Strengths:**

- Stack et versions clairement fixés
- Contenu typé sans DB/API, adapté au MVP
- Patterns et structure détaillés pour éviter les conflits entre agents
- Mapping FR → dossiers explicite

**Areas for Future Enhancement:**

- Route Handlers + formulaire de contact si évolution
- MDX/CMS si édition de contenu sans redéploiement
- Analytics / error tracking si besoin

### Implementation Handoff

**AI Agent Guidelines:**

- Suivre les décisions et patterns du présent document
- Respecter la structure projet et les boundaries
- Utiliser les imports `@/…` et les types explicites
- Consulter ce document pour toute question d’architecture

**First Implementation Priority:**

1. `npx create-next-app@latest my-portfolio --tailwind --eslint --app --src-dir --import-alias @/*`
2. `npx shadcn@latest init` puis `npm install motion`
3. Créer `src/content/*`, `src/types/*` et brancher la page unique (SSG) avec sections Hero, Parcours, Arsenal, Contact et navigation par ancres.
