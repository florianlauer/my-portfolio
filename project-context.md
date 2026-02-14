# Contexte projet — my-portfolio

## Environnement de développement local

Le projet utilise **Nix** et **devenv** pour les outils et dépendances en local.

- **Fichiers** : `devenv.nix`, `devenv.yaml` à la racine.
- **Outils fournis par devenv** (cf. `devenv.nix`) : Node.js (nodejs_22), actionlint, yamllint, docker, colima.
- **Usage** : toutes les commandes `npm`, `npx`, `node` doivent être exécutées dans l’environnement devenv :
  - `devenv shell` puis exécuter les commandes dans le shell, ou
  - `devenv run <cmd>` pour une commande ponctuelle (ex. `devenv run npm run dev`, `devenv run npx shadcn@latest add button`).
- **Ne pas supposer** que Node/npm sont installés globalement ; le dev local repose sur le shell devenv.
- **Versions / libs** : `devenv.nix` peut être modifié à tout moment pour figer d’autres versions (Node, etc.) ou ajouter des outils. N’hésiter pas à proposer ou appliquer des changements dans `devenv.nix` si une story ou l’architecture impose une version précise d’une lib ou d’un outil.

Les stories et l’agent Dev doivent prendre en compte ce contexte pour toute commande ou vérification locale (install, dev, build, lint, etc.).
