import { describe, expect, it } from "vite-plus/test";
import { getPathname, negotiateLocale, toSourcePath } from "./routing";

describe("getPathname", () => {
  it("prefixes the locale and localizes the slug", () => {
    expect(getPathname({ locale: "fr", href: "/" })).toBe("/fr");
    expect(getPathname({ locale: "en", href: "/a-propos" })).toBe("/en/about");
    expect(getPathname({ locale: "de", href: "/a-propos" })).toBe("/de/uber-mich");
    expect(getPathname({ locale: "en", href: "/galerie" })).toBe("/en/gallery");
    expect(getPathname({ locale: "de", href: "/stack" })).toBe("/de/stack");
  });
});

describe("toSourcePath", () => {
  it("maps localized slugs back to source paths", () => {
    expect(toSourcePath("/about", "en")).toBe("/a-propos");
    expect(toSourcePath("/uber-mich", "de")).toBe("/a-propos");
    expect(toSourcePath("/gallery", "en")).toBe("/galerie");
    expect(toSourcePath("/", "fr")).toBe("/");
  });

  it("ignores slugs that belong to another locale", () => {
    expect(toSourcePath("/about", "fr")).toBeUndefined();
  });
});

describe("negotiateLocale", () => {
  it("picks the highest-ranked supported language", () => {
    expect(negotiateLocale("de-DE,de;q=0.9,en;q=0.8")).toBe("de");
    expect(negotiateLocale("es-ES,en;q=0.5,fr;q=0.7")).toBe("fr");
  });

  it("falls back to the default locale", () => {
    expect(negotiateLocale(null)).toBe("fr");
    expect(negotiateLocale("es,it")).toBe("fr");
  });
});
