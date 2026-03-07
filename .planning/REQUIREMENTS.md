# Requirements: Stack Graph

**Defined:** 2026-03-07
**Core Value:** Le visiteur comprend en un coup d'oeil les relations entre les compétences de Florian

## v1 Requirements

### Data Model

- [ ] **DATA-01**: Types TypeScript pour noeuds (id, nom, icone, categorie, niveau, description) et edges (source, target, type)
- [ ] **DATA-02**: Contenu graph dans `src/content/stack-graph.ts` avec relations entre technos (React <-> TypeScript, Node <-> Express...)
- [ ] **DATA-03**: Niveaux d'experience par techno (ex: expert, advanced, intermediate)
- [ ] **DATA-04**: Categories couleur par domaine (Frontend, Backend, DevOps) avec code oklch

### Graph Rendering

- [ ] **RENDER-01**: Noeuds SVG affichant nom, icone et couleur de categorie
- [ ] **RENDER-02**: Edges SVG entre technos liees (lignes/courbes reliant les noeuds)
- [ ] **RENDER-03**: Layout force-directed via d3-force (positionnement automatique des noeuds)
- [ ] **RENDER-04**: Legende des categories avec code couleur

### Interactivity

- [ ] **INTER-01**: Hover sur un noeud affiche un tooltip avec details (niveau, description, technos liees)
- [ ] **INTER-02**: Zoom et pan pour naviguer dans le graph (molette + drag)
- [ ] **INTER-03**: Click-to-focus : cliquer un noeud met en surbrillance ses connexions et attenue le reste
- [ ] **INTER-04**: Filtres par categorie (Frontend, Backend, DevOps) pour montrer/masquer des groupes de noeuds

### Page Integration

- [ ] **PAGE-01**: Route `/stack` utilisant PageShell (nav, background, skip-to-content)
- [ ] **PAGE-02**: Lien vers /stack dans la navigation principale (HomeNav)
- [ ] **PAGE-03**: Metadata SEO (title, description, Open Graph) pour /stack

### Accessibility

- [ ] **A11Y-01**: Navigation clavier entre les noeuds (Tab) avec focus visible
- [ ] **A11Y-02**: Tooltips declenches au focus (pas seulement au hover)
- [ ] **A11Y-03**: Respect de prefers-reduced-motion (desactiver animations force-directed, afficher layout statique)
- [ ] **A11Y-04**: Alternative textuelle cachee pour lecteurs d'ecran (liste structuree des technos et relations)

## v2 Requirements

### Visual Polish

- **POLISH-01**: Animation d'entree (noeuds apparaissent progressivement)
- **POLISH-02**: Taille de noeud proportionnelle au niveau d'experience
- **POLISH-03**: Preset highlights ("ma stack typique" en un clic)
- **POLISH-04**: Animations de transition sur les edges lors du focus

### Mobile

- **MOBILE-01**: Version responsive ou simplifiee du graph sur mobile
- **MOBILE-02**: Touch gestures pour zoom/pan sur mobile

## Out of Scope

| Feature                                        | Reason                                                                      |
| ---------------------------------------------- | --------------------------------------------------------------------------- |
| Modification de la section Arsenal sur la home | On garde l'existant, la page /stack est complementaire                      |
| Graph 3D / WebGL                               | Complexite excessive, problemes d'accessibilite, overkill pour 30-50 noeuds |
| Skill percentage bars                          | Manque de credibilite, subjectif, mal percu par les recruteurs              |
| Drag-to-rearrange nodes                        | Site en lecture seule, pas un editeur                                       |
| Recherche / search bar                         | Inutile a 30-50 noeuds, les filtres suffisent                               |
| Minimap                                        | Inutile a cette echelle                                                     |

## Traceability

| Requirement | Phase   | Status  |
| ----------- | ------- | ------- |
| DATA-01     | Phase 1 | Pending |
| DATA-02     | Phase 1 | Pending |
| DATA-03     | Phase 1 | Pending |
| DATA-04     | Phase 1 | Pending |
| RENDER-01   | Phase 2 | Pending |
| RENDER-02   | Phase 2 | Pending |
| RENDER-03   | Phase 2 | Pending |
| RENDER-04   | Phase 2 | Pending |
| PAGE-01     | Phase 2 | Pending |
| PAGE-02     | Phase 2 | Pending |
| PAGE-03     | Phase 2 | Pending |
| INTER-01    | Phase 3 | Pending |
| INTER-02    | Phase 3 | Pending |
| INTER-03    | Phase 3 | Pending |
| INTER-04    | Phase 3 | Pending |
| A11Y-01     | Phase 4 | Pending |
| A11Y-02     | Phase 4 | Pending |
| A11Y-03     | Phase 4 | Pending |
| A11Y-04     | Phase 4 | Pending |

**Coverage:**

- v1 requirements: 19 total
- Mapped to phases: 19
- Unmapped: 0

---

_Requirements defined: 2026-03-07_
_Last updated: 2026-03-07 after roadmap creation_
