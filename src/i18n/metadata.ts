import { routing, type Locale, type SourcePath } from "./routing";
import { getPathname } from "./navigation";
import { getBaseUrl } from "@/utils/siteUrl";

export type { SourcePath };

/** Build a fully-qualified URL for a given source path + locale. */
export function getCanonicalUrl(sourcePath: SourcePath, locale: Locale): string {
  return `${getBaseUrl()}${getPathname({ locale, href: sourcePath })}`;
}

/**
 * Build canonical + alternates.languages for a given source path and current locale.
 * Pass the **source** path (the file-system path inside `[locale]/`, e.g. `/a-propos`),
 * not the localized URL — getPathname will resolve it.
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
