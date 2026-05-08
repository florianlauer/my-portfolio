import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en", "de"] as const,
  defaultLocale: "fr",
  localePrefix: "always",
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
});

export type Locale = (typeof routing.locales)[number];
export type SourcePath = keyof typeof routing.pathnames;
export const SOURCE_PATHS = Object.keys(routing.pathnames) as SourcePath[];
