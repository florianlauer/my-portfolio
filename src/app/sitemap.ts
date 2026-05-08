import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/utils/siteUrl";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

const SOURCE_PATHS = ["/", "/a-propos", "/galerie", "/stack"] as const;

const PRIORITY_BY_PATH: Record<(typeof SOURCE_PATHS)[number], number> = {
  "/": 1,
  "/a-propos": 0.8,
  "/galerie": 0.7,
  "/stack": 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return SOURCE_PATHS.flatMap((sourcePath) =>
    routing.locales.map((locale) => {
      const url = `${baseUrl}${getPathname({ locale, href: sourcePath })}`;

      const languages = Object.fromEntries(
        routing.locales.map((alt) => [
          alt,
          `${baseUrl}${getPathname({ locale: alt, href: sourcePath })}`,
        ]),
      );

      return {
        url,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: PRIORITY_BY_PATH[sourcePath],
        alternates: { languages },
      };
    }),
  );
}
