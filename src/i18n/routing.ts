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
    "/galerie": {
      fr: "/galerie",
      en: "/gallery",
      de: "/galerie",
    },
    "/stack": {
      fr: "/stack",
      en: "/stack",
      de: "/stack",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
