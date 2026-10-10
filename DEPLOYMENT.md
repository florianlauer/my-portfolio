# Déploiement – my-portfolio

Ce projet TanStack Start se déploie sur **Vercel** (recommandé) ou sur toute plateforme supportée par [Nitro](https://nitro.build/deploy). Nitro détecte Vercel pendant le build et écrit la sortie au format Build Output API (`.vercel/output`), config d'optimisation d'images comprise.

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
2. **Paramètres de build**
   - **Framework Preset :** TanStack Start (ou Other)
   - **Build Command :** `pnpm build`
   - **Output Directory :** laissé vide (Nitro écrit `.vercel/output`)
   - **Install Command :** `pnpm install`

3. **Variables d’environnement**
   - **Recommandé en production :** `SITE_URL` = l'URL publique du site (ex. `https://ton-domaine.vercel.app`) pour les URLs canoniques, hreflang, meta OG, sitemap et robots. Elle est lue au build. Sans elle, le build utilise `VERCEL_PROJECT_PRODUCTION_URL`. L'ancienne variable `NEXT_PUBLIC_SITE_URL` n'est plus lue.
   - `ENABLE_EXPERIMENTAL_COREPACK=1` pour que Vercel installe la version de pnpm fixée dans `package.json#packageManager`.
   - En cas d’évolution (ex. API, analytics), les ajouter dans **Settings → Environment Variables**.

4. **Déployer**
   - Cliquer sur **Deploy**
   - Chaque push sur la branche connectée (ex. `main`) déclenchera un nouveau déploiement.

### Option 2 : Via Vercel CLI

```bash
# Installer le CLI une fois
pnpm add -g vercel

# Depuis la racine du projet
vercel
```

Suivre les questions (lien au projet existant ou nouveau, etc.). Les builds suivants peuvent être lancés avec `vercel --prod` pour la production.

---

## Vérifications après déploiement

- La page d’accueil s’affiche (Hero, Parcours, Arsenal, Contact).
- Les images externes (drapeaux Wikimedia) s’affichent.
- Les images locales passent par `/_vercel/image` (onglet Réseau : réponses AVIF/WebP redimensionnées).
- Les liens LinkedIn et réseaux sociaux ouvrent bien en nouvel onglet.
- Navigation au clavier et skip link « Aller au contenu » fonctionnent.

---

## Domaine personnalisé (optionnel)

Dans le dashboard Vercel : **Project → Settings → Domains** → ajouter un domaine et suivre les instructions DNS.

---

## Références

- [Hosting (docs TanStack Start)](https://tanstack.com/start/latest/docs/framework/react/guide/hosting)
- [Nitro – Vercel](https://nitro.build/deploy/providers/vercel)
