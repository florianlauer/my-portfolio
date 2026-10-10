import { routing, getPathname, type Locale, type SourcePath } from "./routing";
import { getBaseUrl } from "@/utils/siteUrl";
import { siteIdentity } from "@/content/site";

export type { SourcePath };

/** Build a fully-qualified URL for a given source path + locale. */
export function getCanonicalUrl(sourcePath: SourcePath, locale: Locale): string {
  return `${getBaseUrl()}${getPathname({ locale, href: sourcePath })}`;
}

/**
 * Build canonical + alternates.languages for a given source path and current locale.
 * Pass the **source** path (e.g. `/a-propos`), not the localized URL.
 *
 * Includes `x-default` (Google's recommended fallback for unmatched locales).
 */
export function buildAlternates(
  sourcePath: SourcePath,
  currentLocale: Locale,
): { canonical: string; languages: Record<string, string> } {
  const canonical = getCanonicalUrl(sourcePath, currentLocale);

  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((locale) => [locale, getCanonicalUrl(sourcePath, locale)]),
  );
  languages["x-default"] = getCanonicalUrl(sourcePath, routing.defaultLocale);

  return { canonical, languages };
}

/**
 * Per-page `<head>` entries: title, description, canonical, hreflang alternates and the
 * page-specific OpenGraph/Twitter tags. Site-wide tags live in the root route.
 * Sub-pages pass `titleTemplate` so the title reads "Page | Owner".
 */
export function pageHead({
  locale,
  sourcePath,
  title,
  description,
  titleTemplate = true,
}: {
  locale: Locale;
  sourcePath: SourcePath;
  title: string;
  description: string;
  titleTemplate?: boolean;
}) {
  const { canonical, languages } = buildAlternates(sourcePath, locale);
  const fullTitle = titleTemplate ? `${title} | ${siteIdentity.ownerName}` : title;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: canonical },
      ...Object.entries(languages).map(([hrefLang, href]) => ({
        rel: "alternate",
        hrefLang,
        href,
      })),
    ],
  };
}
