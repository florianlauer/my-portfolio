# Story 12.2: Pages ou sections supplémentaires (passions, personnalité)

Status: review

<!-- Spec: _bmad-output/implementation-artifacts/12-2-passions-a-propos-spec.md -->

## Story

En tant que **visiteur**, je veux découvrir davantage de contenu sur les passions et la personnalité (ex. section dédiée ou page « À propos »), afin de renforcer le signal « j'en ai appris plus sur lui ».

## Acceptance Criteria

1. **AC1** - Given le MVP (Hero, Parcours, Arsenal, Contact), when on valide le besoin, then une section « Passions » sur la home (entre Arsenal et Contact) ET une page `/a-propos` sont ajoutées, avec contenu structuré (titres, landmarks, accessibilité).
2. **AC2** - La navigation (menu, ancrages) est mise à jour : ancrage Passions (#passions), lien À propos (/a-propos).
3. **AC3** - Le contenu reste modifiable via `src/content/*` (ou équivalent), sans refonte technique majeure.

## Tasks / Subtasks

- [x] **Task 1** (AC: #1, #3) - Contenu et types
  - [x] 1.1 Créer `src/content/passions.ts` (ou `aPropos.ts`) : données pour la section home (teaser, ton pro) et pour la page À propos (détail, ton perso).
  - [x] 1.2 Ajouter les types nécessaires dans `src/types/` si besoin (ex. PassionsContent, AProposContent).
- [x] **Task 2** (AC: #1) - Composant section Passions (home)
  - [x] 2.1 Créer `src/components/home-sections/PassionsSection.tsx` : section avec sous-blocs (alignée visuellement avec Parcours, Arsenal, Contact), ton pro.
  - [x] 2.2 Lien optionnel « En savoir plus » vers `/a-propos` dans la section.
- [x] **Task 3** (AC: #1) - Page À propos
  - [x] 3.1 Créer `src/app/a-propos/page.tsx` : page avec contenu détaillé, ton perso, mention « En dehors du code » (titre ou sous-titre).
  - [x] 3.2 Contenu chargé depuis `src/content/*` (pas de fetch runtime).
- [x] **Task 4** (AC: #1, #2) - Intégration home et navigation
  - [x] 4.1 Dans `src/app/page.tsx` : insérer PassionsSection entre Arsenal et Contact ; supprimer le placeholder Asset 4 (Passions) quand `showAssetPlaceholders` est true.
  - [x] 4.2 Ajouter l’ancrage `#passions` sur la section Passions.
  - [x] 4.3 Mettre à jour la nav : ajouter « Passions » (href="#passions") et « À propos » (href="/a-propos") dans l’ordre (Parcours, Arsenal, Passions, À propos, Contact).
- [x] **Task 5** (AC: #1, #2, #3) - Validation
  - [x] 5.1 Exécuter `npm run lint`.
  - [x] 5.2 Exécuter `npm run build`.
  - [x] 5.3 Vérifier que tous les AC sont satisfaits (structure, nav, contenu modifiable).

## Dev Notes

- **Spec validée** : `_bmad-output/implementation-artifacts/12-2-passions-a-propos-spec.md` — option C (section home + page dédiée), thèmes voyage / side projects / passions (domotique, sport, etc.), ton pro sur home et perso sur page.
- **Architecture** : App Router, SSG, contenu file-based `src/content/*`. Même patterns que Parcours/Arsenal/Contact (composants dans `src/components/home-sections/`).
- **Visuels** : Asset 4 (image(s) Passions/À propos) peut être intégré plus tard ; la section peut démarrer sans image ou avec une placeholder. Supprimer l’affichage du placeholder Asset 4 une fois la section Passions en place.

### References

- [Spec: 12-2-passions-a-propos-spec.md]
- [Epic: epics-post-mvp.md — Story 12.2]

## Dev Agent Record

### Implementation Plan

- Contenu et types dans `src/content/passions.ts` et `src/types/passions.ts` (PassionsSectionContent, AProposContent).
- PassionsSection : sous-blocs en grille 3 colonnes, style aligné Arsenal/Journey, lien « En savoir plus » vers /a-propos.
- Page /a-propos : contenu depuis passions.ts, titre + sous-titre « En dehors du code », sections en liste.
- Home : PassionsSection entre Arsenal et Contact, nav mise à jour (Passions, À propos), placeholder Asset 4 supprimé.
- Lint : apostrophes échappées (a-propos), useScrollY : setState uniquement dans callback (handler) pour satisfaire react-hooks/set-state-in-effect.

### Completion Notes List

- AC1 : section Passions sur la home + page /a-propos avec contenu structuré (titres, landmarks).
- AC2 : nav avec Passions (#passions) et À propos (/a-propos).
- AC3 : contenu modifiable via `src/content/passions.ts`.
- Lint et build OK.

### File List

- `src/types/passions.ts`
- `src/content/passions.ts`
- `src/components/home-sections/PassionsSection.tsx`
- `src/app/a-propos/page.tsx`
- `src/app/page.tsx`
- `src/hooks/useScrollY.ts` (correction lint set-state-in-effect)
- `_bmad-output/implementation-artifacts/12-2-pages-sections-supplementaires.md`
- `_bmad-output/implementation-artifacts/12-2-passions-a-propos-spec.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `_bmad-output/planning-artifacts/epics-post-mvp.md`

## Senior Developer Review (AI)

- **Date :** 2026-02-14
- **Story :** 12-2-pages-sections-supplementaires
- **Fichiers revus :** File List (hors _bmad-output) + écarts git

### Verdict

**Approve with minor changes** — AC1, AC2, AC3 implémentés. Tâches marquées [x] correspondantes faites. Quelques points de qualité et de traçabilité à traiter.

### Git vs File List

- **Fichiers modifiés (git) non listés dans la story :** `_bmad-output/planning-artifacts/epics-post-mvp.md` (référence spec 12.2 ajoutée).
- **Fichiers listés et modifiés/créés :** cohérents avec git (src/*, story file, sprint-status).

### Action Items

- [x] [MEDIUM] **Nav home — lien « À propos »** : Remplacer `<a href="/a-propos">` par `<Link href="/a-propos">` dans `src/app/page.tsx` pour une navigation client-side (cohérence Next.js App Router). [src/app/page.tsx]
- [x] [MEDIUM] **File List** : Ajouter `_bmad-output/planning-artifacts/epics-post-mvp.md` au File List de la story (fichier modifié pour la spec 12.2). [story file]
- [x] [LOW] **Focus visible — PassionsSection** : Ajouter `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` sur le lien « En savoir plus » dans `PassionsSection.tsx` pour cohérence a11y avec la nav. [src/components/home-sections/PassionsSection.tsx]
- [x] [LOW] **Page /a-propos — skip link** : Envisager un lien « Aller au contenu » (ou équivalent) sur la page /a-propos pour cohérence avec la home (a11y). [src/app/a-propos/page.tsx]
- [x] [LOW] **Traçabilité** : Ajouter `_bmad-output/implementation-artifacts/12-2-passions-a-propos-spec.md` au File List si on considère ce fichier comme livrable de la story. [story file]

### Synthèse

- **AC1** : IMPLEMENTED — Section Passions (id, aria-labelledby, h2, sous-blocs) ; page /a-propos (main, header, h1, sections avec aria-labelledby).
- **AC2** : IMPLEMENTED — Nav avec Passions (#passions) et À propos (/a-propos).
- **AC3** : IMPLEMENTED — Contenu dans `src/content/passions.ts`.
- **Qualité** : 2 MEDIUM (nav Link + File List), 3 LOW (focus lien, skip link, spec dans File List).

---

## Change Log

- 2026-02-14: Story 12.2 créée à partir de la spec validée, prête pour dev.
- 2026-02-14: Implémentation 12.2 terminée (section Passions, page À propos, nav, contenu), lint + build OK, statut → review.
- 2026-02-14: Code review (AI) — Approve with minor changes ; 2 MEDIUM, 3 LOW action items.
- 2026-02-14: Corrections post-review : nav Link À propos, focus PassionsSection, skip link /a-propos, File List. Mobile : padding droit (overflow-x-hidden, min-w-0, box-border), nav scroll horizontal (overflow-x-auto, flex-nowrap, shrink-0).
