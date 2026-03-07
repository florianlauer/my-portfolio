# Phase 1: Data Foundation - Context

**Gathered:** 2026-03-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Create TypeScript types for graph nodes and edges, and populate `src/content/stack-graph.ts` with the complete dataset (31 technologies as nodes with levels/descriptions, ~30-40 edges as relations). Existing `src/content/stack.ts` and `src/types/stack.ts` remain untouched.

</domain>

<decisions>
## Implementation Decisions

### Categories du graph

- Garder les 6 familles existantes : frontend, mobile, backend, data, infra, integrations
- Chaque famille a sa propre couleur (6 couleurs distinctes)
- Les 31 technos actuelles sont conservees telles quelles, sans ajout ni retrait
- Les filtres (Phase 3) regrouperont en 3 groupes macro : Frontend (frontend+mobile), Backend (backend+data), DevOps (infra+integrations)

### Niveaux d'experience

- 4 niveaux en francais : Expert, Avance, Intermediaire, Notions
- Visible uniquement dans le tooltip (pas de badge/label sur le noeud)
- En v2 (POLISH-02), la taille du noeud refletera le niveau
- Claude propose l'attribution initiale des niveaux, l'utilisateur valide et ajuste

### Relations entre technos

- Connexions simples (pas de types d'edge, pas de label sur les liens)
- Non-orientees (traits simples, pas de fleches)
- Liens forts uniquement (~30-40 edges) — relations directes et evidentes
- Cross-family autorise (React [frontend] <-> Node [backend], Docker [infra] <-> NestJS [backend], etc.)

### Descriptions des technos

- Ton mixte : factuel + touche personnelle ("Framework React pour le web — mon outil principal au quotidien")
- Langue : francais avec termes tech en anglais
- Longueur : Claude adapte selon la techno (principales = plus de detail)
- Claude propose les descriptions, l'utilisateur valide et ajuste

### Claude's Discretion

- Choix des couleurs par famille (oklch custom ou valeurs Tailwind, selon le rendu SVG et la coherence avec le theme du site)
- Longueur exacte des descriptions par techno
- Attribution initiale des niveaux d'experience (soumise a validation)
- Choix des relations specifiques entre technos (soumis a validation)

</decisions>

<code_context>

## Existing Code Insights

### Reusable Assets

- `src/content/stack.ts`: Dataset de 31 technos groupees en 6 familles — source de verite pour les IDs et labels des noeuds
- `src/types/stack.ts`: Types `StackItem`, `StackGroup`, `StackFamilyKey` — a etendre ou referencer pour le graph
- `familyAccent` dans `StackSection.tsx`: Mapping couleurs Tailwind par famille (amber, orange, sky, cyan, teal, violet) — reference pour la coherence visuelle

### Established Patterns

- Contenu as code : toutes les donnees dans `src/content/*.ts` avec types dans `src/types/*.ts`
- Types partages : chaque domaine a un fichier type dedie (`src/types/stack.ts`)
- Path alias `@/*` pour tous les imports

### Integration Points

- Le nouveau `src/content/stack-graph.ts` sera importe par les composants graph en Phase 2
- Les types iront dans `src/types/stack-graph.ts` (nouveau fichier)
- `src/content/stack.ts` ne doit PAS etre modifie — le StackSection existant continue de fonctionner
- Les filtres Phase 3 auront besoin d'un mapping famille -> groupe macro dans les donnees

</code_context>

<specifics>
## Specific Ideas

- Les 6 familles doivent rester distinguables visuellement dans le graph (couleurs differentes)
- Les relations cross-family sont ce qui rend le graph interessant — montrer comment tout se connecte
- Le ton des descriptions doit refleter l'experience personnelle de Florian, pas juste une definition Wikipedia

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 01-data-foundation_
_Context gathered: 2026-03-07_
