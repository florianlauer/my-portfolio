import type { ExperienceLevel } from "@/types/stack-graph";

// Visual circle radius per experience level — single source of truth
export const NODE_RADIUS_BY_LEVEL: Record<ExperienceLevel, number> = {
  expert: 34,
  advanced: 26,
  intermediate: 20,
  basics: 14,
};

// Spacing added on top of radius for d3-force collision boundaries
const COLLIDE_PADDING = 6;

export const COLLIDE_RADIUS_BY_LEVEL: Record<ExperienceLevel, number> = {
  expert: NODE_RADIUS_BY_LEVEL.expert + COLLIDE_PADDING,
  advanced: NODE_RADIUS_BY_LEVEL.advanced + COLLIDE_PADDING,
  intermediate: NODE_RADIUS_BY_LEVEL.intermediate + COLLIDE_PADDING,
  basics: NODE_RADIUS_BY_LEVEL.basics + COLLIDE_PADDING,
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

// Viewport width below which the graph switches to compact mode
// (smaller node radii, legend below the canvas instead of overlapping).
// 768px aligns with Tailwind's `md:` breakpoint and the existing
// `aspect-[3/4] md:aspect-[4/3]` switch on the container.
export const STACK_GRAPH_COMPACT_BREAKPOINT_PX = 768;

// Radius multiplier applied to NODE_RADIUS_BY_LEVEL and COLLIDE_RADIUS_BY_LEVEL
// when the container width is below the compact breakpoint.
// 0.7 packs ~30% more nodes per surface unit — measured to give d3-force
// enough room for 39 nodes in a 320×426 viewBox without clumping.
export const COMPACT_RADIUS_SCALE = 0.7;
