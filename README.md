# my-portfolio

Portfolio personnel (TanStack Start, TypeScript, Tailwind, Shadcn UI, outillage Vite+ et pnpm) : Hero, Parcours, Arsenal, Contact.

## Développement

```bash
pnpm install
pnpm dev
```

pnpm est fourni par corepack (version fixée dans `package.json#packageManager`), et devenv l'active.

Ouvre [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande     | Description                                         |
| ------------ | --------------------------------------------------- |
| `pnpm dev`   | Serveur de dev (`vp dev`)                           |
| `pnpm build` | Build production dans `.output/` (`vp build`)       |
| `pnpm start` | Sert le build de production                         |
| `pnpm check` | Format, lint et vérification des types (`vp check`) |
| `pnpm test`  | Tests unitaires Vitest (`vp test`)                  |
| `pnpm fmt`   | Formate le code (`vp fmt`)                          |

## Déploiement

Voir **[DEPLOYMENT.md](./DEPLOYMENT.md)** pour déployer sur Vercel (recommandé).

## Audit accessibilité

Après avoir lancé le site (`pnpm dev` ou URL de production) :

- **Lighthouse** : Chrome DevTools → onglet **Lighthouse** → catégorie **Accessibility** → **Analyze page load**.
- **axe DevTools** : installer l’extension [axe DevTools](https://www.deque.com/axe/devtools/) puis lancer un scan sur la page.

Ces audits permettent de vérifier contrastes, structure, focus et alternatives textuelles (WCAG).
