export type GalleryItemStructure = {
  id: string;
  src: string;
};

/** Runtime shape after locale-specific captions/alts are injected. */
export type GalleryItem = GalleryItemStructure & {
  alt: string;
  caption: string;
};
