import type { Messages } from "use-intl";

export type GalleryItemStructure = {
  /** Caption key in src/messages/*.json (gallery.captions.*). */
  id: keyof Messages["gallery"]["captions"];
  src: string;
};

/** Runtime shape after locale-specific captions/alts are injected. */
export type GalleryItem = GalleryItemStructure & {
  alt: string;
  caption: string;
};
