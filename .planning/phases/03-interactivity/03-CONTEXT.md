# Phase 3: Interactivity - Context

**Gathered:** 2026-03-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Add hover tooltips, zoom/pan, click-to-focus highlighting, and category filters to the existing force-directed graph. The graph already renders 36 nodes with d3-force layout, drag interaction, and micro-movement. This phase adds exploration capabilities — the visitor can inspect individual technologies, navigate the graph spatially, highlight connection clusters, and filter by domain.

</domain>

<decisions>
## Implementation Decisions

### Tooltip riche (INTER-01)

- HTML overlay (div positionnée en absolute au-dessus du SVG), pas de SVG tooltip
- Ancré au nœud survolé (au-dessus, repositionné si pas de place)
- Animation scale+fade à l'apparition (~150ms, scale 0.95→1 + opacity 0→1)
- Contenu : nom + niveau d'expérience en header, description texte, puis liste des technos liées en tags colorés (chaque tag affiche la couleur de la famille de la techno liée)
- Remplace le tooltip SVG actuel (simple rect+text label) dans GraphNode

### Zoom & pan (INTER-02)

- Molette = zoom centré sur la position du curseur (comportement d3-zoom standard)
- Range de zoom : 0.5x (vue d'ensemble) à 3x (détail cluster)
- Drag sur le fond du SVG = pan (déplacer la vue)
- Drag sur un nœud = drag du nœud (comportement existant préservé)
- Double-clic sur le fond = reset zoom/pan à la vue initiale
- Pas de boutons +/−, pas de minimap — interface épurée
- Transition smooth entre niveaux de zoom

### Click-to-focus (INTER-03)

- Clic sur un nœud = focus : le nœud et ses voisins directs restent à 100% d'opacité, tous les autres nœuds et edges passent à ~15-20% d'opacité
- Transition douce ~200ms pour le changement d'opacité
- Clic sur le fond du graph = désactive le focus, tous les nœuds reviennent à 100%
- Clic sur un autre nœud = change le focus vers ce nœud
- Pas d'auto-zoom/recentrage — la vue ne bouge pas, seule l'opacité change
- Distinction click vs drag : un pointerdown+pointerup sans mouvement significatif = click, avec mouvement = drag

### Filtres par catégorie (INTER-04)

- 3 groupes macro (décidé Phase 1) : Frontend (frontend+mobile), Backend (backend+data), DevOps (infra+integrations)
- Toggle pills colorées positionnées au-dessus du graph (sous le titre "Ma Stack"), avec dot de couleur par domaine
- Actif = pill pleine/opaque, inactif = outline/dimmé
- Mode multi-toggle : tous actifs par défaut, on peut désactiver n'importe quelle combinaison, au moins 1 doit rester actif
- Nœuds filtrés : fade-out animé (~200ms) puis disparition du DOM
- Edges cross-category : disparaissent si un des deux nœuds est filtré
- Réorganisation d3-force après filtrage (les nœuds restants comblent l'espace)

### Claude's Discretion

- Paramètres exacts de d3-zoom (smoothness, ease function)
- Seuil de distance pour distinguer click vs drag
- Largeur max du tooltip et gestion du débordement viewport
- Gestion de l'interaction entre click-to-focus et filtres actifs simultanément
- Implémentation technique du reroutage d3-force après filtrage (retirer/ajouter des nœuds à la simulation)

</decisions>

<code_context>

## Existing Code Insights

### Reusable Assets

- `StackGraph.tsx`: Composant principal avec SVG viewBox, ResizeObserver, colorMap, posMap — point d'intégration pour zoom/pan/focus state
- `GraphNode.tsx`: Gère déjà hover state (`hovered` useState), pointer events pour drag, tooltip SVG basique — à étendre pour click-to-focus et remplacer tooltip
- `use-force-layout.ts`: Hook d3-force avec simulation, drag handlers (dragStart/dragMove/dragEnd) — à étendre pour zoom transform et filtrage de nœuds
- `GraphLegend.tsx`: Overlay HTML bas-gauche avec les 7 familles — les filtres macro sont un nouveau composant séparé
- `icon-map.ts`: Map 29 IDs → SVG path data — utilisable dans le tooltip pour afficher les icônes des technos liées
- `src/types/stack-graph.ts`: Types GraphNode (avec `description`, `level`, `family`), GraphEdge, FamilyColor — données déjà prêtes pour le tooltip riche

### Established Patterns

- Client Components avec `"use client"` pour toute interactivité
- d3-force comme moteur de layout (pas de bibliothèque de graph haut-niveau)
- Pointer events (pas mouse events) pour le drag — compatible touch
- Tailwind v4 pour le styling HTML, SVG attributes pour le styling SVG
- Feature-based component folders sous `src/components/stack-graph/`

### Integration Points

- `StackGraph.tsx` : ajouter zoom/pan transform wrapper (`<g>` avec d3-zoom), focus state, filter state
- `GraphNode.tsx` : ajouter onClick pour focus, remplacer SVG tooltip par callback vers tooltip HTML parent
- `use-force-layout.ts` : exposer méthodes pour filtrer nœuds (retirer/ajouter à la simulation)
- Nouveau composant `GraphTooltip.tsx` : HTML overlay avec contenu riche
- Nouveau composant `GraphFilters.tsx` : pills de filtre au-dessus du graph
- `src/app/stack/page.tsx` : potentiellement ajuster le layout pour les filtres au-dessus

</code_context>

<specifics>
## Specific Ideas

- L'animation scale+fade du tooltip doit être cohérente avec l'ambiance "organisme vivant" du graph (Phase 2 : micro-mouvement, glow, bounce)
- Les tags colorés dans le tooltip créent un écho visuel avec les couleurs du graph — le visiteur fait intuitivement le lien
- Le drag fond = pan est le pattern Figma/Miro : naturel pour quiconque a utilisé un outil de design
- La réorganisation d3-force après filtrage doit donner un effet "les nœuds restants se regroupent" plutôt qu'un saut brusque

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 03-interactivity_
_Context gathered: 2026-03-13_
