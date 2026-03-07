# Story 12.2: Passions & À propos — Spec validée

**Date :** 2026-02-14  
**Statut :** Décisions prises, prêt pour implémentation.

---

## 1. Section vs page

**Option retenue : C — Les deux.**

- **Homepage :** un bloc court « Passions » entre Arsenal et Contact (teaser, ton pro).
- **Page dédiée :** route `/a-propos`, contenu plus détaillé et plus perso.

---

## 2. Contenu

### Thèmes à couvrir

- Voyage
- Side projects
- Passions (ex. domotique, sport, détails des sports, etc.)

### Ton

- **Homepage (section Passions) :** ton **pro** — accroche courte, cohérente avec le reste du site.
- **Page À propos :** ton **perso** — plus de détail, passions, contexte « en dehors du code ».

### Structure sur la homepage

- Section **Passions** avec **sous-blocs** (ou structure équivalente) alignée visuellement avec les autres sections (Parcours, Arsenal, Contact) : même style de carte / bordure / padding si pertinent.
- Sous-blocs possibles : ex. Voyage, Side projects, Sport / Domotique, etc. (à affiner selon le contenu rédigé).

### Visuels

- Asset 4 (image(s) Passions / À propos) : usage en **premier plan** dans la section home et/ou sur la page À propos (pas fond, sujet de la section). Formats : 1200×630 ou 800×600 px. Une ou plusieurs images selon le design.

---

## 3. Navigation

- **Homepage :** ancrage **Passions** dans la nav (comme Parcours, Arsenal, Contact) → `#passions`.
- **Page À propos :** lien dans la nav vers **À propos** (route `/a-propos`).
- **Optionnel :** bouton ou lien « En savoir plus » (ou équivalent) depuis la section Passions de la home vers la page `/a-propos`.

---

## 4. Nom / libellé

- **Section et nav homepage :** **« Passions »**.
- **Lien vers la page détaillée :** **« À propos »** (libellé du lien dans la nav et éventuellement dans la section Passions).
- **Page `/a-propos` :** titre de page peut inclure la mention **« En dehors du code »** (ex. titre principal ou sous-titre).

---

## Récap implémentation

| Élément      | Détail                                                                  |
| ------------ | ----------------------------------------------------------------------- |
| Section home | Bloc « Passions » entre Arsenal et Contact, sous-blocs, ton pro         |
| Page dédiée  | `/a-propos`, contenu détaillé, ton perso, mention « En dehors du code » |
| Nav home     | Parcours · Arsenal · **Passions** · **À propos** · Contact              |
| Ancrage      | `#passions` pour la section Passions                                    |
| Contenu      | `src/content/*` (ex. `passions.ts` ou `aPropos.ts`)                     |
| Optionnel    | Bouton « En savoir plus » section Passions → `/a-propos`                |

---

## Fichiers à créer / modifier (indication)

- `src/app/page.tsx` — ajout section Passions, ancrage #passions, lien nav Passions + À propos.
- `src/app/a-propos/page.tsx` — page À propos (ou équivalent App Router).
- `src/components/home-sections/PassionsSection.tsx` — section Passions (sous-blocs).
- `src/content/passions.ts` ou `aPropos.ts` — contenu éditable (texte, structure).
- Types si besoin dans `src/types/`.

Suppression du placeholder Asset 4 une fois la section Passions en place.
