/**
 * Base URL du site (production ou dev).
 * Définir NEXT_PUBLIC_SITE_URL en production pour les meta OG, sitemap, robots.
 * VERCEL_PROJECT_PRODUCTION_URL est préféré à VERCEL_URL (qui change par déploiement preview).
 */
export function getBaseUrl(): string {
  if (typeof process.env.NEXT_PUBLIC_SITE_URL === "string" && process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (
    typeof process.env.VERCEL_PROJECT_PRODUCTION_URL === "string" &&
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (typeof process.env.VERCEL_URL === "string" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // On a real production deploy (Vercel), no resolved URL = sitemaps and hreflang
  // would be silently wrong. Hard-fail so the bad build never ships.
  if (process.env.NODE_ENV === "production" && process.env.VERCEL_ENV === "production") {
    throw new Error(
      "[siteUrl] No site URL configured for the production deploy. " +
        "Set NEXT_PUBLIC_SITE_URL (or VERCEL_PROJECT_PRODUCTION_URL).",
    );
  }
  if (process.env.NODE_ENV === "production") {
    // Local `next build` or non-prod deploy with nothing set — warn loudly but
    // don't kill the build (useful for SSG prerender on dev machines).
    console.warn(
      "[siteUrl] Falling back to http://localhost:3000 — set NEXT_PUBLIC_SITE_URL for accurate URLs.",
    );
  }
  return "http://localhost:3000";
}
