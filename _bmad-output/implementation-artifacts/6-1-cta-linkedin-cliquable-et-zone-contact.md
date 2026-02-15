# Story 6.1: CTA linkedin cliquable et zone contact

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

En tant que **visiteur**,
je veux cliquer sur un CTA qui mene vers LinkedIn (ou canal maitrise),
afin de pouvoir contacter facilement (FR10).

## Acceptance Criteria

1. **AC1** - Given le CTA LinkedIn est visible (Story 2.3) ou une zone Contact existe, When je clique sur le CTA Contact / LinkedIn, Then une nouvelle fenetre/onglet s'ouvre vers l'URL LinkedIn configuree, avec `rel="noopener noreferrer"` si `target="_blank"`.
2. **AC2** - L'URL est definie dans `src/content/socialLinks.ts` ; pas de collecte de donnees (lien externe uniquement).

## Tasks / Subtasks

- [x] **Task 1** (AC: #1) - Rendre le CTA LinkedIn correctement cliquable
  - [x] 1.1 Ajouter `target="_blank"` et `rel="noopener noreferrer"` sur le CTA principal du Hero.
  - [x] 1.2 Ajouter `target="_blank"` et `rel="noopener noreferrer"` sur le canal principal de la section Contact.
- [x] **Task 2** (AC: #2) - Conserver la source de verite contenu
  - [x] 2.1 Verifier que le lien principal vient de `primaryContactLink` calcule depuis `src/content/socialLinks.ts`.
- [x] **Task 3** (AC: #1, #2) - Validation implementation
  - [x] 3.1 Executer `npm run lint`.
  - [x] 3.2 Executer `npm run build`.

## Dev Notes

- Le CTA du Hero continue d'utiliser `primaryContactLink` en priorite, avec fallback sur `siteContent.primaryCta`.
- Aucun formulaire ou collecte n'est ajoute dans cette story.

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- `npm run lint`
- `npm run build`

### Completion Notes List

- Le CTA principal du Hero ouvre le lien en nouvel onglet avec `rel` securise.
- Le lien "Canal principal" de la section Contact ouvre aussi en nouvel onglet avec `rel` securise.
- Le lien principal reste alimente depuis `src/content/socialLinks.ts`.

### File List

- `src/components/home-sections/HeroSection.tsx`
- `src/components/home-sections/ContactSection.tsx`
- `_bmad-output/implementation-artifacts/6-1-cta-linkedin-cliquable-et-zone-contact.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- 2026-02-14: Story 6.1 documentee, implementee et validee.

## Senior Developer Review (AI)

- Date: 2026-02-14
- Outcome: **Approve**
- Findings: aucun finding critique, majeur ou mineur sur le scope 6.1.
