import type { ExperienceLevel } from "@/types/stack-graph";

// Visual circle radius per experience level — single source of truth
export const NODE_RADIUS_BY_LEVEL: Record<ExperienceLevel, number> = {
  Expert: 34,
  Avancé: 26,
  Intermédiaire: 20,
  Notions: 14,
};

// Spacing added on top of radius for d3-force collision boundaries
const COLLIDE_PADDING = 6;

export const COLLIDE_RADIUS_BY_LEVEL: Record<ExperienceLevel, number> = {
  Expert: NODE_RADIUS_BY_LEVEL.Expert + COLLIDE_PADDING,
  Avancé: NODE_RADIUS_BY_LEVEL.Avancé + COLLIDE_PADDING,
  Intermédiaire: NODE_RADIUS_BY_LEVEL.Intermédiaire + COLLIDE_PADDING,
  Notions: NODE_RADIUS_BY_LEVEL.Notions + COLLIDE_PADDING,
};

// d3-force tuning constants — shared between init and filter rebuilds
export const FORCE_CONFIG = {
  charge: -250,
  linkDistance: 100,
  linkStrength: 0.3,
  collideStrength: 1,
  collideIterations: 3,
  positionStrength: 0.03,
  alphaDecay: 0.02,
  velocityDecay: 0.3,
  clampPadding: 40,
} as const;

// Tooltip layout — TOOLTIP_MAX_WIDTH_PX must stay in sync with className max-w-[280px]
export const TOOLTIP_MAX_WIDTH_PX = 280;
export const TOOLTIP_EDGE_PADDING_PX = 8;
export const TOOLTIP_NODE_OFFSET_PX = 12;

// Touch target — minimum hit area radius for WCAG 2.5.5 (44×44 minimum, so r >= 22)
export const MIN_TOUCH_RADIUS = 22;

// Click vs drag detection threshold (px)
export const CLICK_THRESHOLD = 8;
