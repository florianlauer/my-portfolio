import type messages from "./src/messages/fr.json";
import type { Locale } from "./src/i18n/routing";

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
  }
}

declare global {
  /** Injected by vite.config.ts at build time. */
  const __SITE_URL__: string;
  const __VERCEL_IMAGES__: boolean;
}

export {};
