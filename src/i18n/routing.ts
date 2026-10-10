export const routing = {
  locales: ["fr", "en", "de"],
  defaultLocale: "fr",
  pathnames: {
    "/": "/",
    "/a-propos": {
      fr: "/a-propos",
      en: "/about",
      de: "/uber-mich",
    },
    // /galerie and /stack stay identical for fr/de on purpose: "Galerie" and
    // "Stack" are the same word in both languages. English gets a localized
    // /gallery path. Add a per-locale override here if that ever changes.
    "/galerie": {
      fr: "/galerie",
      en: "/gallery",
      de: "/galerie",
    },
    "/stack": "/stack",
  },
} as const;

export type Locale = (typeof routing.locales)[number];
export type SourcePath = keyof typeof routing.pathnames;
export const SOURCE_PATHS = Object.keys(routing.pathnames) as SourcePath[];

export function hasLocale(value: unknown): value is Locale {
  return routing.locales.includes(value as Locale);
}

/** Public URL path for a source path, e.g. ("/a-propos", "en") → "/en/about". */
export function getPathname({ locale, href }: { locale: Locale; href: SourcePath }): string {
  const entry = routing.pathnames[href];
  const localized = typeof entry === "string" ? entry : entry[locale];
  return localized === "/" ? `/${locale}` : `/${locale}${localized}`;
}

/** Source path for a localized path within a locale, e.g. ("/about", "en") → "/a-propos". */
export function toSourcePath(localizedPath: string, locale: Locale): SourcePath | undefined {
  return SOURCE_PATHS.find((sourcePath) => {
    const entry = routing.pathnames[sourcePath];
    return (typeof entry === "string" ? entry : entry[locale]) === localizedPath;
  });
}

/** First supported locale in an Accept-Language header, or the default locale. */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  const ranked = (acceptLanguage ?? "")
    .split(",")
    .map((part) => {
      const [tag = "", q] = part.trim().split(";q=");
      return { language: tag.split("-")[0]?.toLowerCase(), q: q === undefined ? 1 : Number(q) };
    })
    // q=0 means "not acceptable"; empty, malformed (NaN) or out-of-range weights are dropped too.
    .filter(({ q }) => q > 0 && q <= 1)
    .sort((a, b) => b.q - a.q);
  return (
    (ranked.find(({ language }) => hasLocale(language))?.language as Locale | undefined) ??
    routing.defaultLocale
  );
}
