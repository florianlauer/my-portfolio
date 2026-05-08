"use client";

import { useTransition } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LOCALE_FLAGS: Record<Locale, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
  de: "🇩🇪",
};

const LOCALE_CODES: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  de: "DE",
};

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps): React.JSX.Element {
  const t = useTranslations("languageSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  function switchTo(nextLocale: Locale): void {
    if (nextLocale === currentLocale) return;
    startTransition(() => {
      router.replace(
        // Typed-pathnames API: pathname is the canonical source path,
        // params carries any dynamic segments (none on this site).
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { pathname, params } as any,
        { locale: nextLocale },
      );
    });
  }

  return (
    <div
      role="group"
      aria-label={t("ariaLabel")}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border bg-background/60 p-0.5 backdrop-blur-sm",
        className,
      )}
    >
      {routing.locales.map((locale) => {
        const active = locale === currentLocale;
        return (
          <button
            key={locale}
            type="button"
            disabled={isPending}
            aria-label={t(locale)}
            aria-current={active ? "true" : undefined}
            onClick={() => switchTo(locale)}
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground pointer-hover:text-foreground",
              isPending && "opacity-50 cursor-not-allowed",
            )}
          >
            <span aria-hidden="true">{LOCALE_FLAGS[locale]}</span>
            <span>{LOCALE_CODES[locale]}</span>
          </button>
        );
      })}
    </div>
  );
}
