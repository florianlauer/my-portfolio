"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, localeHref } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { LOCALE_META } from "@/i18n/localeMeta";
import { socialLinks } from "@/content/socialLinks";

type SiteFooterProps = {
  /** Computed server-side to avoid hydration mismatch around new year. */
  year: number;
};

export function SiteFooter({ year }: SiteFooterProps): React.JSX.Element {
  const t = useTranslations("footer");
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = useLocale() as Locale;

  const href = localeHref(pathname, params as Record<string, string | string[]>);

  return (
    <footer className="relative z-10 mt-12 border-t border-border/40 bg-background/40 py-10">
      <div className="mx-auto max-w-5xl px-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted-foreground">
          © {year} {t("ownerLabel")}
        </div>

        <nav
          aria-label={t("languageLabel")}
          className="flex flex-wrap items-center justify-center gap-2 text-sm"
        >
          {routing.locales.map((locale, i) => {
            const meta = LOCALE_META[locale];
            const active = locale === currentLocale;
            return (
              <span key={locale} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-muted-foreground">
                    ·
                  </span>
                )}
                <Link
                  href={href}
                  locale={locale}
                  aria-current={active ? "page" : undefined}
                  className={
                    "inline-flex min-h-[44px] items-center px-2 py-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring " +
                    (active
                      ? "font-medium text-foreground"
                      : "text-muted-foreground pointer-hover:text-foreground")
                  }
                >
                  <span aria-hidden="true">{meta.flag}</span>
                  <span className="ml-1">{meta.native}</span>
                </Link>
              </span>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 text-sm">
          {socialLinks.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-[44px] items-center px-2 py-2 rounded-sm text-muted-foreground pointer-hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
