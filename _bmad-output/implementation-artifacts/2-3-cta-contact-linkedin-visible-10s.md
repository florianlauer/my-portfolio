# Story 2.3: CTA Contact LinkedIn visible <=10s

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

En tant que **visiteur**,
je veux voir un CTA Contact (lien LinkedIn) visible en <=10 secondes depuis l'arrivee,
afin de pouvoir contacter sans chercher (FR3, FR13).

## Acceptance Criteria

1. **AC1** - Given le Hero et la stack sont visibles (Stories 2.1, 2.2), When je charge la page, Then un lien CTA vers LinkedIn est visible dans le Hero ou en haut de page (above-the-fold), avec `rel="noopener noreferrer"` si `target="_blank"`.
2. **AC2** - Le lien est charge depuis `src/content/socialLinks.ts` (ou equivalent) ; NFR-P1 respecte (stack + CTA visibles <=10s).

## Tasks / Subtasks

- [x] **Task 1** (AC: #1, #2) - Connecter le CTA Hero a la source de verite Contact
  - [x] 1.1 Injecter `primaryContactLink` depuis `src/content/socialLinks.ts` vers le Hero.
  - [x] 1.2 Utiliser ce lien pour le CTA visible en haut de page.
  - [x] 1.3 Conserver un fallback robuste si `primaryContactLink` est absent.
- [x] **Task 2** (AC: #1) - Verifier la visibilite immediate du CTA
  - [x] 2.1 Maintenir le CTA dans la zone Hero above-the-fold.
  - [x] 2.2 Ne pas ajouter de logique qui retarde son affichage.
- [x] **Task 3** (AC: #1, #2) - Valider l'implementation
  - [x] 3.1 Executer `npm run lint`.
  - [x] 3.2 Executer `npm run build`.

## Dev Notes

- **Contexte local (Nix/devenv/direnv)** : executer `npm`/`npx` directement dans le repo.
- **Architecture cible** : contenu file-based avec injection via props.
- **Objectif story** : garantir un chemin de contact visible immediatement et maintenable.

### Project Structure Notes

- Changement cible sur orchestration page + Hero section.
- Aucun fetch runtime ni dependance externe.

### References

- [Source: _bmad-output/planning-artifacts/epics.md - Story 2.3]
- [Source: _bmad-output/planning-artifacts/architecture.md - contenu statique, performance]
- [Source: project-context.md - Environnement local direnv/devenv]

## Developer Context (guardrails)

- Source de verite CTA: `src/content/socialLinks.ts`.
- Fallback utilisateur si lien primaire absent.
- Imports absolus `@/...` uniquement.

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- `npm run lint`
- `npm run build`

### Completion Notes List

- `HeroSection` accepte `primaryContactLink` et derive le CTA depuis cette source.
- `src/app/page.tsx` injecte `primaryContactLink` vers le Hero.
- Fallback conserve sur `siteContent.primaryCta` si `primaryContactLink` absent.
- Validation technique executee: lint + build.

### File List

- `src/components/home-sections/HeroSection.tsx`
- `src/app/page.tsx`
- `_bmad-output/implementation-artifacts/2-3-cta-contact-linkedin-visible-10s.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- 2026-02-14: Story 2.3 creee et implementee, statut passe a `review`.
- 2026-02-14: Code review effectuee, aucun finding bloquant, statut passe a `done`.

## Senior Developer Review (AI)

- Date: 2026-02-14
- Outcome: **Approve**
- Findings: aucun finding critique, majeur ou mineur sur le scope 2.3.
