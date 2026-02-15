# Déploiement – my-portfolio

Ce projet Next.js est prêt pour un déploiement sur **Vercel** (recommandé) ou une autre plateforme compatible (Netlify, etc.).

---

## Prérequis

- Compte [Vercel](https://vercel.com) (gratuit)
- Dépôt Git (GitHub, GitLab ou Bitbucket) avec le code poussé

---

## Déployer sur Vercel

### Option 1 : Via le site Vercel (recommandé)

1. **Connecter le dépôt**
   - Aller sur [vercel.com](https://vercel.com) → **Add New** → **Project**
   - Importer le dépôt Git (ex. `my-portfolio` depuis GitHub)
   - Vercel détecte automatiquement Next.js

2. **Paramètres de build** (généralement par défaut)
   - **Framework Preset :** Next.js
   - **Build Command :** `next build` (ou vide, laissé par défaut)
   - **Output Directory :** laissé vide (défaut Next.js)
   - **Install Command :** `npm install` (défaut)

3. **Variables d’environnement**
   - **Recommandé en production :** `NEXT_PUBLIC_SITE_URL` = l'URL publique du site (ex. `https://ton-domaine.vercel.app`) pour les meta OG, Twitter, sitemap et robots. Sans cette variable, Vercel utilise `https://<projet>.vercel.app`.
   - En cas d’évolution (ex. API, analytics), les ajouter dans **Settings → Environment Variables**.

4. **Déployer**
   - Cliquer sur **Deploy**
   - Chaque push sur la branche connectée (ex. `main`) déclenchera un nouveau déploiement.

### Option 2 : Via Vercel CLI

```bash
# Installer le CLI une fois
npm i -g vercel

# Depuis la racine du projet
vercel
```

Suivre les questions (lien au projet existant ou nouveau, etc.). Les builds suivants peuvent être lancés avec `vercel --prod` pour la production.

---

## Vérifications après déploiement

- La page d’accueil s’affiche (Hero, Parcours, Arsenal, Contact).
- Les images externes (drapeaux Wikimedia) s’affichent (domaine autorisé dans `next.config.ts`).
- Les liens LinkedIn et réseaux sociaux ouvrent bien en nouvel onglet.
- Navigation au clavier et skip link « Aller au contenu » fonctionnent.

---

## Domaine personnalisé (optionnel)

Dans le dashboard Vercel : **Project → Settings → Domains** → ajouter un domaine et suivre les instructions DNS.

---

## Références

- [Deploying Next.js (docs Next.js)](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel – Deploy Next.js](https://vercel.com/docs/frameworks/nextjs)
