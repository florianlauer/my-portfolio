import { routing, type Locale } from "./routing";
import { getPathname } from "./navigation";
import { getBaseUrl } from "@/utils/siteUrl";

const baseUrl = getBaseUrl();

export type SourcePath = "/" | "/a-propos" | "/galerie" | "/stack";

/**
 * Build canonical + alternates.languages for a given source path and current locale.
 * Pass the **source** path (the file-system path inside `[locale]/`, e.g. `/a-propos`),
 * not the localized URL — getPathname will resolve it.
 */
export function buildAlternates(
  sourcePath: SourcePath,
  currentLocale: Locale,
): { canonical: string; languages: Record<string, string> } {
  const canonical = `${baseUrl}${getPathname({ locale: currentLocale, href: sourcePath })}`;

  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      `${baseUrl}${getPathname({ locale, href: sourcePath })}`,
    ]),
  );

  return { canonical, languages };
}
