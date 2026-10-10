/** Public base URL, resolved at build time in vite.config.ts (SITE_URL or Vercel system env). */
export function getBaseUrl(): string {
  return __SITE_URL__;
}
