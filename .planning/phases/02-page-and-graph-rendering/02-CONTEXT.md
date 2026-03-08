# Phase 2: Page and Graph Rendering - Context

**Gathered:** 2026-03-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Route `/stack` avec PageShell, SVG nodes (pastilles icône+texte), edges courbes, layout d3-force animé, légende overlay, et lien navigation "Ma Stack". Le visiteur voit le graph complet positionné automatiquement avec micro-mouvement organique et nœuds draggables.

</domain>

<decisions>
## Implementation Decisions

### Design des nœuds

- Pastilles horizontales (pill/capsule) avec icône à gauche et nom à droite
- Fond plein couleur oklch de la famille, texte clair (blanc ou très clair)
- Taille variable selon le niveau d'expérience : Expert = plus grand, Notions = plus petit (4 paliers)
- Icônes via Simple Icons (package npm `simple-icons`) — SVG monochromes teintés en blanc pour le contraste
- Glow doux autour de chaque pastille (box-shadow/filter SVG) dans la couleur famille, ~20% opacité

### Style des edges

- Courbes Bézier douces entre les nœuds (pas de lignes droites)
- Couleur gris neutre, opacité réduite (~30-40%) — les nœuds restent la star
- Statiques au repos (pas d'animation sur les edges en Phase 2)

### Animation et mouvement

- Animation visible du layout d3-force au chargement (~1-2s pour que les nœuds se positionnent)
- Micro-mouvement perpétuel après stabilisation (nœuds flottent légèrement, comme en apesanteur)
- Nœuds draggables : l'utilisateur peut déplacer un nœud, et au relâchement il revient en place avec un effet de bounce/spring, puis reprend le micro-mouvement
- Respect de `prefers-reduced-motion` dès Phase 2 : si activé, layout statique sans flottement ni animation

### Composition de la page

- Graph plein écran (100% viewport moins le nav) — pas contraint dans max-w-5xl
- PageShell utilisé mais avec containerClassName élargi pour le graph
- Titre discret "Ma Stack" au-dessus du graph
- Légende des 7 familles en overlay, positionnée en bas à gauche du graph (style carte)
- Lien "Ma Stack" dans le HomeNav vers /stack
- Metadata SEO (title, description, Open Graph) pour /stack

### Ambiance visuelle

- Feeling "écosystème organique vivant" — nœuds qui respirent, layout aéré
- Fond sombre existant (GlobalBackground) conservé
- Pastilles lumineuses avec glow sur fond sombre — nœuds comme des organismes dans un écosystème
- Courbes naturelles pour les edges

### Claude's Discretion

- Rayon exact du glow et intensité
- Paramètres d3-force (charge, distance, strength) pour l'espacement optimal
- Amplitude et fréquence du micro-mouvement
- Paramètres du spring/bounce au relâchement du drag
- Tailles exactes des 4 paliers de pastilles (Expert/Avancé/Intermédiaire/Notions)
- Gestion des nœuds sans icône Simple Icons disponible (fallback)
- Adaptation du PageShell pour le mode plein écran

</decisions>

<code_context>

## Existing Code Insights

### Reusable Assets

- `src/content/stack-graph.ts`: 36 nœuds, ~50 edges, 7 familles avec couleurs oklch — données prêtes à consommer
- `src/types/stack-graph.ts`: Types `StackGraph`, `GraphNode`, `GraphEdge`, `FamilyColor` — typage complet
- `src/components/page-shell/PageShell.tsx`: Shell avec HomeNav + GlobalBackground + skip-to-content, accepte `containerClassName` pour surcharger max-w-5xl
- `src/components/home-nav/HomeNav.tsx`: Navigation principale — ajouter le lien "Ma Stack" ici
- `src/components/global-background/GlobalBackground.tsx`: Background sombre partagé — réutilisé tel quel
- `src/lib/utils.ts`: `cn()` pour classes conditionnelles

### Established Patterns

- Contenu as code : données dans `src/content/*.ts`, types dans `src/types/*.ts`
- Server/Client split : pages = Server Components, interactivité = Client Components avec `"use client"`
- Path alias `@/*` pour tous les imports
- Tailwind v4 avec oklch custom properties
- Feature-based component folders sous `src/components/`

### Integration Points

- Nouvelle route `src/app/stack/page.tsx` (Server Component)
- Nouveau dossier `src/components/stack-graph/` pour les composants du graph (Client Component pour d3-force)
- HomeNav : ajouter entrée "Ma Stack" → `/stack`
- `d3-force` comme nouvelle dépendance npm (~15KB)
- `simple-icons` comme nouvelle dépendance npm pour les icônes tech

</code_context>

<specifics>
## Specific Ideas

- L'effet au relâchement du drag doit être "bouncy" — le nœud dépasse légèrement sa position cible avant de se stabiliser (spring physics)
- Le micro-mouvement perpétuel donne un côté "vivant" au graph, comme un écosystème qui respire
- Les pastilles colorées sur fond sombre avec glow = impression d'organismes lumineux

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 02-page-and-graph-rendering_
_Context gathered: 2026-03-08_
