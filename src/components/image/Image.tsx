import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { IMAGE_WIDTHS } from "./widths";

// srcSet/loading/fetchPriority/decoding are derived here, so callers cannot pass them.
type ImageProps = Omit<
  ComponentProps<"img">,
  "src" | "alt" | "srcSet" | "loading" | "fetchPriority" | "decoding"
> & {
  src: string;
  alt: string;
  /** Cover the positioned parent, like next/image's `fill`. */
  fill?: boolean;
  /** Above-the-fold image: load eagerly with high fetch priority. */
  priority?: boolean;
};

function optimizedUrl(src: string, width: number): string {
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}

/**
 * `<img>` with a responsive srcset served by Vercel Image Optimization (resize + AVIF/WebP).
 * Outside Vercel (dev, local preview) the original file is served as-is.
 */
export function Image({ src, alt, fill, priority, sizes, className, ...props }: ImageProps) {
  const optimize = __VERCEL_IMAGES__ && src.startsWith("/");
  return (
    <img
      {...props}
      alt={alt}
      src={optimize ? optimizedUrl(src, IMAGE_WIDTHS.at(-1)!) : src}
      srcSet={
        optimize ? IMAGE_WIDTHS.map((w) => `${optimizedUrl(src, w)} ${w}w`).join(", ") : undefined
      }
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={cn(fill && "absolute inset-0 size-full", className)}
    />
  );
}
