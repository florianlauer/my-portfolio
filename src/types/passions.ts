export const passionBlockIds = ["sport", "side-projects", "voyage"] as const;
export type PassionBlockId = (typeof passionBlockIds)[number];

export const aboutSectionIds = ["intro", "sport", "side-projects", "voyage"] as const;
export type AboutSectionId = (typeof aboutSectionIds)[number];
