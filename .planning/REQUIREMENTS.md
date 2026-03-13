# Requirements: Stack Graph

**Defined:** 2026-03-07
**Core Value:** Le visiteur comprend en un coup d'oeil les relations entre les compétences de Florian

## v1 Requirements

### Data Model

- [x] **DATA-01**: Types TypeScript pour noeuds (id, nom, icone, categorie, niveau, description) et edges (source, target, type)
- [x] **DATA-02**: Contenu graph dans `src/content/stack-graph.ts` avec relations entre technos (React <-> TypeScript, Node <-> Express...)
- [x] **DATA-03**: Niveaux d'experience par techno (ex: expert, advanced, intermediate)
- [x] **DATA-04**: Categories couleur par domaine (Frontend, Backend, DevOps) avec code oklch

### Graph Rendering

- [x] **RENDER-01**: Noeuds SVG affichant nom, icone et couleur de categorie
- [x] **RENDER-02**: Edges SVG entre technos liees (lignes/courbes reliant les noeuds)
- [x] **RENDER-03**: Layout force-directed via d3-force (positionnement automatique des noeuds)
- [x] **RENDER-04**: Legende des categories avec code couleur

### Interactivity

- [x] **INTER-01**: Hover sur un noeud affiche un tooltip avec details (niveau, description, technos liees)
- [x] **INTER-02**: Zoom et pan pour naviguer dans le graph (molette + drag)
- [x] **INTER-03**: Click-to-focus : cliquer un noeud met en surbrillance ses connexions et attenue le reste
- [x] **INTER-04**: Filtres par categorie (Frontend, Backend, DevOps) pour montrer/masquer des groupes de noeuds

### Page Integration

- [x] **PAGE-01**: Route `/stack` utilisant PageShell (nav, background, skip-to-content)
- [x] **PAGE-02**: Lien vers /stack dans la navigation principale (HomeNav)
- [x] **PAGE-03**: Metadata SEO (title, description, Open Graph) pour /stack

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

| Requirement | Phase   | Status   |
| ----------- | ------- | -------- |
| DATA-01     | Phase 1 | Complete |
| DATA-02     | Phase 1 | Complete |
| DATA-03     | Phase 1 | Complete |
| DATA-04     | Phase 1 | Complete |
| RENDER-01   | Phase 2 | Complete |
| RENDER-02   | Phase 2 | Complete |
| RENDER-03   | Phase 2 | Complete |
| RENDER-04   | Phase 2 | Complete |
| PAGE-01     | Phase 2 | Complete |
| PAGE-02     | Phase 2 | Complete |
| PAGE-03     | Phase 2 | Complete |
| INTER-01    | Phase 3 | Complete |
| INTER-02    | Phase 3 | Complete |
| INTER-03    | Phase 3 | Complete |
| INTER-04    | Phase 3 | Complete |
| A11Y-01     | Phase 4 | Pending  |
| A11Y-02     | Phase 4 | Pending  |
| A11Y-03     | Phase 4 | Pending  |
| A11Y-04     | Phase 4 | Pending  |

**Coverage:**

- v1 requirements: 19 total
- Mapped to phases: 19
- Unmapped: 0

---

_Requirements defined: 2026-03-07_
_Last updated: 2026-03-07 after roadmap creation_
