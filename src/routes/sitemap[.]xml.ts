import { createFileRoute } from "@tanstack/react-router";
import { routing, SOURCE_PATHS, type SourcePath } from "@/i18n/routing";
import { buildAlternates } from "@/i18n/metadata";

const PRIORITY_BY_PATH: Record<SourcePath, number> = {
  "/": 1,
  "/a-propos": 0.8,
  "/galerie": 0.7,
  "/stack": 0.7,
};

function sitemap(): string {
  const lastModified = new Date().toISOString();
  const urls = SOURCE_PATHS.flatMap((sourcePath) =>
    routing.locales.map((locale) => {
      const { canonical, languages } = buildAlternates(sourcePath, locale);
      const alternates = Object.entries(languages)
        .map(([lang, href]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`)
        .join("\n");
      return `<url>
<loc>${canonical}</loc>
${alternates}
<lastmod>${lastModified}</lastmod>
<changefreq>monthly</changefreq>
<priority>${PRIORITY_BY_PATH[sourcePath]}</priority>
</url>`;
    }),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => new Response(sitemap(), { headers: { "Content-Type": "application/xml" } }),
    },
  },
});
