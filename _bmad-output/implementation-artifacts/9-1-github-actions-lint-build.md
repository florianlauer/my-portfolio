# Story 9.1: GitHub Actions (lint + build)

Status: done

## Story

En tant que **développeur** (Florian),
je veux que chaque push et chaque PR déclenche un job qui exécute lint et build,
afin de détecter les régressions avant merge ou déploiement.

## Acceptance Criteria

1. **AC1** - Given un dépôt GitHub avec le projet, when on push ou on ouvre une PR, then un workflow GitHub Actions s'exécute.
2. **AC2** - Le workflow lance au minimum : npm ci, npm run lint, npm run build.
3. **AC3** - En cas d'échec (lint ou build), le statut du check est en échec et visible sur la PR.

## Implémentation

- `.github/workflows/ci.yml` : workflow déclenché sur `push` et `pull_request` (toutes les branches). Job unique `lint-and-build` : checkout, setup Node 20 avec cache npm, `npm ci`, `npm run lint`, `npm run build`.

## Fichiers

- `.github/workflows/ci.yml`

## Change Log

- 2026-02-15: Implémenté. Après push/PR sur GitHub, le check CI apparaît sur la PR ; en cas d'échec lint ou build, le check est en échec.
