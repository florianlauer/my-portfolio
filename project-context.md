# Contexte projet — my-portfolio

## Environnement de développement local

Le projet utilise **Nix** et **devenv** pour les outils et dépendances en local.

- **Fichiers** : `devenv.nix`, `devenv.yaml` à la racine.
- **Outils fournis par devenv** (cf. `devenv.nix`) : Node.js (nodejs_22), actionlint, yamllint, docker, colima.
- **Usage** : setup `direnv + devenv` actif. Les commandes `npm`, `npx`, `node` sont lancées **directement** dans le terminal du repo (environnement déjà chargé).
  - `devenv shell`/`devenv run` reste un fallback si le shell n’est pas auto-activé.
- **Ne pas supposer** une installation globale système ; l’environnement outillé provient de `devenv` via `direnv`.
- **Versions / libs** : `devenv.nix` peut être modifié à tout moment pour figer d’autres versions (Node, etc.) ou ajouter des outils. N’hésiter pas à proposer ou appliquer des changements dans `devenv.nix` si une story ou l’architecture impose une version précise d’une lib ou d’un outil.

Les stories et l’agent Dev doivent prendre en compte ce contexte pour toute commande ou vérification locale (install, dev, build, lint, etc.).
