# my-portfolio

Portfolio personnel (Next.js, TypeScript, Tailwind, Shadcn UI) : Hero, Parcours, Arsenal, Contact.

## Développement

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande        | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Serveur de dev (Turbopack) |
| `npm run build` | Build production           |
| `npm run start` | Serveur production         |
| `npm run lint`  | ESLint                     |

## Déploiement

Voir **[DEPLOYMENT.md](./DEPLOYMENT.md)** pour déployer sur Vercel (recommandé).

## Audit accessibilité

Après avoir lancé le site (`npm run dev` ou URL de production) :

- **Lighthouse** : Chrome DevTools → onglet **Lighthouse** → catégorie **Accessibility** → **Analyze page load**.
- **axe DevTools** : installer l’extension [axe DevTools](https://www.deque.com/axe/devtools/) puis lancer un scan sur la page.

Ces audits permettent de vérifier contrastes, structure, focus et alternatives textuelles (WCAG).
