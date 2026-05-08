"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { socialLinks } from "@/content/socialLinks";

const LOCALE_LABELS: Record<Locale, { native: string; flag: string }> = {
  fr: { native: "Français", flag: "🇫🇷" },
  en: { native: "English", flag: "🇬🇧" },
  de: { native: "Deutsch", flag: "🇩🇪" },
};

export function SiteFooter(): React.JSX.Element {
  const t = useTranslations("footer");
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = useLocale() as Locale;

  return (
    <footer className="relative z-10 mt-12 border-t border-border/40 bg-background/40 py-10">
      <div className="mx-auto max-w-5xl px-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {t("ownerLabel")}
        </div>

        <nav aria-label={t("languageLabel")} className="flex items-center gap-3 text-sm">
          <span className="sr-only">{t("languageLabel")}:</span>
          {routing.locales.map((locale, i) => (
            <span key={locale} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden="true" className="text-muted-foreground">
                  ·
                </span>
              )}
              <Link
                // Typed-pathnames API: pathname is the canonical source path,
                // params carries any dynamic segments (none on this site).
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={{ pathname, params } as any}
                locale={locale}
                aria-current={locale === currentLocale ? "true" : undefined}
                className={
                  locale === currentLocale
                    ? "font-medium text-foreground"
                    : "text-muted-foreground pointer-hover:text-foreground"
                }
              >
                <span aria-hidden="true">{LOCALE_LABELS[locale].flag}</span>{" "}
                {LOCALE_LABELS[locale].native}
              </Link>
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-sm">
          {socialLinks.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground pointer-hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
