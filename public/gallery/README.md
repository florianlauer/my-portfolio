# Assets galerie

Les images de la galerie sont stockées **côté serveur** dans ce dossier.

- **Stockage :** les fichiers sont dans le repo (ou sur le serveur de déploiement) et servis comme fichiers statiques par Next.js (dossier `public/`).
- **Côté client :** le navigateur charge les images via des URLs (ex. `/gallery/nom-fichier.jpg`). Aucune image n’est incluse dans le bundle JavaScript.
- **Ajout de photos :** déposer les fichiers ici, puis ajouter les entrées correspondantes dans `src/content/gallery.ts` (id, src: `/gallery/nom-fichier.jpg`, alt, caption).
