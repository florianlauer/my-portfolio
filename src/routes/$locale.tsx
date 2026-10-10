import { useEffect } from "react";
import { createFileRoute, notFound, type ErrorComponentProps } from "@tanstack/react-router";
import { useTranslations } from "use-intl";
import { hasLocale } from "@/i18n/routing";

export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params }) => {
    if (!hasLocale(params.locale)) throw notFound();
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
