import { useEffect } from "react";
import {
  createFileRoute,
  notFound,
  redirect,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useTranslations } from "use-intl";
import { hasLocale, routing } from "@/i18n/routing";
import { ROUTE_BY_SOURCE_PATH, isSourcePath } from "@/i18n/navigation";

export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params }) => {
    if (hasLocale(params.locale)) return;
    // Pre-i18n URLs (/a-propos, /galerie, /stack) had no locale prefix and only French content.
    const legacyPath = `/${params.locale}`;
    if (isSourcePath(legacyPath)) {
      throw redirect({
        to: ROUTE_BY_SOURCE_PATH[legacyPath],
        params: { locale: routing.defaultLocale },
        statusCode: 308,
      });
    }
    throw notFound();
  },
  errorComponent: LocaleError,
});

function LocaleError({ error, reset }: ErrorComponentProps): React.JSX.Element {
  const t = useTranslations("error");

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("[errorComponent]", error);
    }
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("description")}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex min-h-[44px] items-center rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors pointer-hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {t("retry")}
        </button>
      </div>
    </main>
  );
}
