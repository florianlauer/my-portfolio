import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "./routing";

type LocaleParams = Promise<{ locale: string }>;

/** Validate locale param, call setRequestLocale, or notFound() if invalid. Use in page/layout default exports. */
export async function resolveLocaleOr404(params: LocaleParams): Promise<Locale> {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale: Locale = rawLocale;
  setRequestLocale(locale);
  return locale;
}

/** Validate locale param, fall back to defaultLocale. Use in generateMetadata where notFound() can't run. */
export async function resolveLocaleOrDefault(params: LocaleParams): Promise<Locale> {
  const { locale: rawLocale } = await params;
  return hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
}
