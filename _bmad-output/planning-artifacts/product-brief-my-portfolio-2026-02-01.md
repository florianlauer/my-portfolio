---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments: ['_bmad-output/brainstorming/brainstorming-session-2026-02-01.md']
date: 2026-02-01
author: Florian
---

# Product Brief: my-portfolio

<!-- Content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

**my-portfolio** est un site vitrine personnel qui sert de **CV numérique** pour un développeur full-stack (9+ ans d'expérience). Il vise à montrer le parcours, les compétences et la personnalité (créativité, dynamisme, voyage, curiosité) de façon plus riche et visuelle que LinkedIn ou un CV texte. Les cibles prioritaires sont les **recruteurs**, puis les **clients potentiels** (freelance) et les **autres devs** ; le site sert aussi à se faire plaisir et à donner une image fidèle de soi. Le succès se mesure au fait que les visiteurs comprennent en peu de temps la stack, les qualités et la personnalité, et que ceux qui ont déjà échangé avec toi puissent te contacter ou te recruter en passant par ce site. La solution repose sur une **exploration dynamique** (parcours en étapes, compétences groupées ou liées aux projets), un design soigné et une expérience agréable à parcourir.

---

## Core Vision

### Problem Statement

Les recruteurs s'appuient surtout sur LinkedIn et un CV très textuel, avec peu d'images. Ils ne perçoivent pas facilement les **passions**, le **parcours détaillé** ni la **personnalité** du candidat. Pour un développeur senior qui veut transmettre une image pro, créative et dynamique (voyage, curiosité, geek), le CV classique et le profil LinkedIn restent limités et peu différenciants.

### Problem Impact

Sans support plus riche, le parcours géographique (France, Angleterre, etc.), les compétences par étape, le lien entre compétences et projets, et la personnalité (voyage, jeux, design) restent sous-représentés. Les recruteurs et clients potentiels ont une vision partielle du profil, ce qui peut rater des opportunités ou des bons fit.

### Why Existing Solutions Fall Short

LinkedIn et le CV PDF sont principalement **textuels et statiques** : peu de visuels, peu de narration, pas d'exploration guidée. Ils ne permettent pas de « parcourir » un parcours en étapes, de lier clairement compétences et projets, ni de donner une ambiance (voyage, geek, créativité). Un portfolio personnel bien conçu comble ces manques en offrant une **expérience dynamique**, visuelle et narrative.

### Proposed Solution

Un **portfolio web** structuré comme un parcours à explorer : **Hero** (photo + présentation), **Parcours** en 3 chapitres (Départ France, Expansion Angleterre, Aujourd'hui + Arsenal de compétences), **Projets** sur une carte (planisphère réel, style jeu), **Contact + CTA** (« On gravit la suite ensemble ? »). L'exploration est **dynamique** : passage d'une étape à l'autre, d'une compétence à l'autre ; compétences **groupées** (ex. par chapitre ou par bloc Arsenal) et **liées aux projets** (carte, fiches projets). Le site est beau, poli, sobre, avec motion au scroll, palette douce et chaude, ton geek discret, et une 404 ludique (mini GeoGuessr avec tes photos de voyage) pour renforcer la personnalité et la mémorabilité.

### Key Differentiators

- **Exploration dynamique** : parcours en étapes, compétences groupées et liées aux projets, plutôt qu'une longue page texte.
- **Narrative visuelle** : photos de voyage (hero, arrière-plans), parcours géographique (3 lieux), carte projets (planisphère style jeu) — le parcours et la personnalité se voient tout de suite.
- **Identité assumée** : ton geek sobre, voyage, curiosité ; 404 mini GeoGuessr (tes pays, tes photos) — difficile à reproduire par un CV ou un template générique.
- **Clarté pour les recruteurs** : stack et compétences visibles rapidement (Arsenal, compétences par chapitre, lien compétences–projets) tout en gardant une expérience agréable à parcourir.

---

## Target Users

### Primary Users

**Florian (toi-même)** — Bénéficiaire principal : plaisir d'avoir un site beau et poli, image fidèle (pro, créative, dynamique, voyage, curiosité), parcours et compétences clairs. Le site sert à te représenter et à te faire plaisir.

**Recruteurs** — Ils vivent le problème : LinkedIn/CV trop textuels, peu de visuels, parcours et personnalité peu lisibles. Ils tirent de la valeur en trouvant rapidement la stack, les compétences, le parcours (3 lieux, Arsenal) et un **moyen de contact** clair. Pas besoin de segmenter finement (agence vs interne) tant que le contact est évident.

### Secondary Users

**Clients potentiels (freelance)** et **autres devs** — Mêmes besoins essentiels : comprendre parcours et compétences, voir la personnalité, et avoir un **moyen de contact** (CTA, email, LinkedIn). Pas obligatoire de les distinguer en détail ; l'important est que tous trouvent l'info et le contact.

### User Journey

- **Découverte :** Ils arrivent via LinkedIn, CV, bouche-à-oreille ou recherche (nom, portfolio).
- **Première visite :** Hero (photo + présentation) → Parcours (3 chapitres + Arsenal) → Projets (carte) → Contact + CTA (« On gravit la suite ensemble ? »). Exploration dynamique, scroll progressif.
- **Moment de succès :** Ils ont compris la stack, le parcours et la personnalité, et voient clairement comment te contacter.
- **Long terme :** Ils te contactent ou te recrutent via le site, ou reviennent pour revérifier avant un entretien.

---

## Success Metrics

**Succès utilisateur**

- **Objectif principal :** Les visiteurs trouvent **rapidement** la stack et **comment te contacter**.
- **Petit succès :** Ils voient à quel point tu aimes les voyages et tes parcours dans les pays visités (hero, Parcours, photos). Option : les **orienter vers la 404** (lien discret, easter egg) pour qu'ils découvrent le mini GeoGuessr en mode curieux.
- **Moment « ça valait le coup » :** Ils se disent « j'en ai appris plus sur lui » et **préfèrent revenir sur ce site** plutôt que sur un CV papier pour te (re)découvrir.

**Métriques à suivre**

- **Temps passé sur le site** — indicateur d'engagement et d'intérêt.
- **Nombre de pages vues** — en particulier sur les **pages les plus personnelles** (Parcours, 404, hero/voyage) pour voir si la personnalité et le voyage sont consultés.

**Contact et sécurité**

- **Pas de contact par email direct** sur le site : privilégier un **lien LinkedIn** (ou autre canal maîtrisé) pour limiter les contacts fake et le spam.
- **Sécurité :** Si un formulaire de contact est ajouté plus tard, prévoir une **validation** (ex. captcha, champ anti-bot) pour éviter les contacts fake ou abusifs.

### Business Objectives

- **Court terme (3–6 mois) :** Le site est en ligne, lisible, avec parcours et contact clairs ; les visiteurs (recruteurs, clients) privilégient le site au CV papier pour en savoir plus sur toi.
- **Moyen terme (12 mois) :** Augmentation du temps passé et des pages vues sur les sections personnelles ; contacts qualifiés via le canal choisi (ex. LinkedIn) en passant par le site.

### Key Performance Indicators

- **Temps moyen sur le site** (par session) — cible : tendance à la hausse.
- **Pages vues** — en particulier Parcours, hero/voyage, 404 (pages personnelles).
- **Taux de clic sur le CTA contact** (ex. lien LinkedIn) — si mesurable sans tracking intrusif.
- **Qualité des contacts** — pas de métrique automatique ; à évaluer côté recrutement/freelance (ex. « ils viennent du site »).

---

## MVP Scope

### Core Features

**Fonctionnalités indispensables pour le MVP :**

- **Hero** — Photo voyage + nom + phrase d'accroche (présentation en un bloc).
- **Parcours** — 3 chapitres (Départ France, Expansion Angleterre, Aujourd'hui) + **Arsenal** (stack, compétences, années d'expérience) ; icônes ou éléments visuels pour les lieux.
- **Contact + CTA** — Lien LinkedIn (ou autre canal maîtrisé) ; bloc « On gravit la suite ensemble ? » sans formulaire email.
- **Objectif utilisateur :** Trouver **rapidement** la stack et le contact, voir le **parcours** et la **personnalité** (voyage, geek sobre) — le site résout déjà le problème central.

**Motion et visuel (MVP) :** Animations au scroll sobre (style Apple), palette douces et chaudes, menus légers — pour garder une expérience agréable et cohérente avec la vision.

### Out of Scope for MVP

- **Page 404 mini GeoGuessr** — Reportée après le MVP ; ajout possible en v2 (easter egg, ~20 pays, tes photos).
- **Carte projets (planisphère style jeu)** — Reportée après le MVP ; les projets peuvent être présentés en liste ou grille simple en v1 ; carte interactive en v2.

### MVP Success Criteria

- Les visiteurs trouvent la **stack** et le **contact** en peu de temps.
- Ils voient le **parcours** (3 lieux + compétences par étape) et la **personnalité** (voyage, ton).
- Le site est **en ligne**, lisible et sobre ; les recruteurs peuvent privilégier le site au CV papier pour en savoir plus sur toi.

### Future Vision

- **Post-MVP :** 404 mini GeoGuessr (tes photos, tes pays) ; carte projets (planisphère réel style jeu) ; éventuellement lien discret vers la 404 pour les curieux.
- **Évolution :** Enrichir les projets (liens compétences–projets), affiner motion et palette, ajouter une section « ce que je cherche » si besoin.
