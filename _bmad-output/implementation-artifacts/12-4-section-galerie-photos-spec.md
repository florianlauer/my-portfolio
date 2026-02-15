# Story 12.4: Section ou page galerie photos — Spec validée

**Date :** 2026-02-15  
**Statut :** Décisions prises, prêt pour implémentation.

---

## 1. Section vs page

**Options :**

- **A — Section sur la home** : un bloc « Galerie » sur la page d'accueil (entre Passions et Contact, ou après Contact). Teaser avec quelques photos + lien « Voir toute la galerie » vers une page dédiée si besoin.
- **B — Page dédiée uniquement** : route `/galerie` (ou `/photos`), pas de bloc galerie sur la home. Lien dans la nav ou le footer.
- **C — Les deux** : section courte sur la home (teaser 4–6 photos) + page `/galerie` avec la galerie complète.

**Décision :** Page dédiée uniquement (pas de section sur la home). Route `/galerie` accessible depuis le menu et depuis la page À propos (partie « Voyages ») pour voir plus de photos.

---

## 2. Emplacement sur la home (si section)

- **Option 1 :** Entre Passions et Contact (ordre : … Passions → **Galerie** → Contact).
- **Option 2 :** Après Contact (Galerie en bas de page).
- **Option 3 :** Pas de section sur la home (option B ci-dessus).

**Décision :** Pas de section sur la home (voir décision ci-dessus).

---

## 3. Structure de la galerie

### Layout

- **Grille** : colonnes fixes (ex. 2 ou 3 colonnes desktop, 1–2 mobile), images recadrées ou ratio homogène.
- **Masonry** : hauteurs variables, pas de coupure d’image, rendu type Pinterest.

**Décision :** Masonry.

### Nombre d’images

- **Teaser home (si section)** : 4 à 8 images (léger, scroll court).
- **Page galerie complète** : à définir selon le réservoir (ex. 12–24 pour commencer, extensible via `src/content`).

**Décision :** 20 images en v1, infinite scroll pour voir plus.

---

## 4. Contenu et métadonnées

### Source des images

- Même réservoir que les backgrounds et assets existants : `public/` (ex. `asset-laponie.jpeg`, `asset-lencois-raw.jpeg`, `hero-1.jpeg`, etc.).
- Pas de doublon : une seule source de vérité (fichiers dans `public/` ou référencés dans un fichier type `src/content/gallery.ts`).

### Légendes

- **Lieu / pays** : affichées sous ou au survol de chaque photo (ex. « Laponie, Finlande », « Lençóis, Brésil »).
- **Optionnel :** courte description (une ligne), date ou thème.

**Décision :** Champs par image : `src`, `alt`, `caption` (lieu + pays). Structure dans `src/content/gallery.ts`.

---

## 5. Tri et filtres (optionnel pour v1)

- **Tri possible :** pays, date, thème (voyage, nature, etc.).
- **V1 minimale :** ordre fixe défini dans le contenu (ex. ordre de déclaration dans `gallery.ts`).
- **V2 :** filtres ou onglets (par pays, par thème) si besoin.

**Décision :** Non en v1 (pas de filtres). Ordre d'affichage : les images peuvent être chargées de façon **aléatoire** à chaque visite de la page (random à chaque chargement).

---

## 6. Lightbox / vue agrandie

- **Sans lightbox :** clic sur une photo = rien ou lien vers image en grand (nouvel onglet).
- **Avec lightbox :** clic = overlay avec image agrandie, navigation précédent/suivant, fermeture (Échap ou clic dehors), accessibilité (focus trap, annonces screen reader).

**Décision :** Oui en v1 (overlay, précédent/suivant, Échap, accessibilité).

---

## 7. Navigation

- **Si section sur la home :** ancrage dans la nav → `#galerie` (ou `#photos`). Libellé : « Galerie » ou « Photos ».
- **Si page dédiée :** lien dans la nav vers `/galerie` (ou `/photos`).
- **Si les deux :** ancrage `#galerie` sur la home + lien « Galerie » vers `/galerie` pour la galerie complète.

**Décision :** Libellé « Galerie » dans le menu ; lien depuis la page À propos (partie Voyages) vers « Voir plus de photos » → `/galerie`.

---

## 8. Accessibilité et performance

- **Images :** `next/image`, `sizes` adaptés, `alt` descriptif (lieu + contexte).
- **Légendes :** associées sémantiquement (figcaption ou aria-describedby).
- **Lightbox (si retenu) :** focus trap, Échap pour fermer, annonce du type « Image X sur Y » pour lecteurs d’écran.
- **Performance :** lazy loading, pas de chargement massif au premier rendu (limiter le nombre visible initial ou paginer).

---

## 9. Fichiers et données

- **Contenu :** `src/content/gallery.ts` (ou `photos.ts`) exportant une liste d’entrées : `{ id, src, alt, caption?, country?, date? }`.
- **Types :** `src/types/gallery.ts` (ou dans un type existant) pour typer les entrées.
- **Composant(s) :** ex. `src/components/gallery/GallerySection.tsx` (section home) et/ou `src/app/galerie/page.tsx` (page dédiée), réutilisant une même liste depuis le contenu.

---

## 10. Récap des décisions (validé)

| Point | Options | Décision |
| --- | --- | --- |
| Section vs page | A / B / C | pas de section homepage, par contre page dédié (et accessible depuis menu et page a propos pour voir + de photos dans la partie voyages) |
| Emplacement home | Entre Passions et Contact / Après Contact / Pas de section | pas dans la home (voir decision precedente ) |
| Layout | Grille / Masonry | Masonry |
| Nombre d’images v1 | (ex. 12) | 20, possibilité de voir + en infinite scroll |
| Légendes | Lieu+pays uniquement / +date ou thème | lieu+pays |
| Tri / filtres v1 | Oui / Non | non |
| Ordre d'affichage | Fixe / Aléatoire | aléatoire à chaque visite de la page |
| Lightbox v1 | Oui / Non | oui |
| Libellé nav | Galerie / Photos / Voyages | Galerie |

Spec figée — prêt pour implémentation (story 12.4).
