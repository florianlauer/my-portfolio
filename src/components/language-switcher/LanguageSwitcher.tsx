"use client";

import { useEffect, useRef, useTransition } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, localeHref } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { LOCALE_META } from "@/i18n/localeMeta";
import { cn } from "@/lib/utils";

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
  const buttonRefs = useRef<Record<Locale, HTMLButtonElement | null>>({
    fr: null,
    en: null,
    de: null,
  });
  const pendingTargetRef = useRef<Locale | null>(null);

  // Restore focus to the newly active button after the route change resolves.
  useEffect(() => {
    if (isPending) return;
    const target = pendingTargetRef.current;
    if (target && target === currentLocale) {
      buttonRefs.current[target]?.focus();
      pendingTargetRef.current = null;
    }
  }, [currentLocale, isPending]);

  function switchTo(nextLocale: Locale): void {
    if (nextLocale === currentLocale) return;
    pendingTargetRef.current = nextLocale;
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    startTransition(() => {
      const href = localeHref(pathname, params as Record<string, string | string[]>);
      router.replace({ ...href, ...(hash ? { hash } : {}) }, { locale: nextLocale });
    });
  }

  return (
    <div
      role="group"
      aria-label={t("ariaLabel")}
      aria-busy={isPending}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border bg-background/60 p-0.5 backdrop-blur-sm",
        className,
      )}
    >
      {routing.locales.map((locale) => {
        const active = locale === currentLocale;
        const meta = LOCALE_META[locale];
        return (
          <button
            key={locale}
            ref={(el) => {
              buttonRefs.current[locale] = el;
            }}
            type="button"
            // Only disable inactive buttons during transition so the just-pressed
            // button keeps focus until the route change completes.
            disabled={isPending && !active}
            aria-label={t(locale)}
            aria-current={active ? "true" : undefined}
            onClick={() => switchTo(locale)}
            className={cn(
              "inline-flex min-h-[44px] items-center gap-1 rounded-full px-3 py-2 text-xs font-medium transition sm:min-h-0 sm:px-2.5 sm:py-1",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground pointer-hover:text-foreground",
              isPending && !active && "opacity-50 cursor-not-allowed",
            )}
          >
            <span aria-hidden="true">{meta.flag}</span>
            <span>{meta.code}</span>
          </button>
        );
      })}
    </div>
  );
}
