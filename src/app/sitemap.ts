import type { MetadataRoute } from "next";
import { routing, SOURCE_PATHS, type SourcePath } from "@/i18n/routing";
import { buildAlternates } from "@/i18n/metadata";

const PRIORITY_BY_PATH: Record<SourcePath, number> = {
  "/": 1,
  "/a-propos": 0.8,
  "/galerie": 0.7,
  "/stack": 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return SOURCE_PATHS.flatMap((sourcePath) =>
    routing.locales.map((locale) => {
      const { canonical, languages } = buildAlternates(sourcePath, locale);
      return {
        url: canonical,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: PRIORITY_BY_PATH[sourcePath],
        alternates: { languages },
      };
    }),
  );
}
