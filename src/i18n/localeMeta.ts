import type { Locale } from "./routing";

export type LocaleMeta = {
  /** Display flag (used aria-hidden — for visual only). */
  flag: string;
  /** ISO-style short code displayed in compact UI (FR/EN/DE). */
  code: string;
  /** Native language name (Français / English / Deutsch). */
  native: string;
  /** OpenGraph locale string. */
  og: string;
};

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  fr: { flag: "🇫🇷", code: "FR", native: "Français", og: "fr_FR" },
  en: { flag: "🇬🇧", code: "EN", native: "English", og: "en_US" },
  de: { flag: "🇩🇪", code: "DE", native: "Deutsch", og: "de_DE" },
};
