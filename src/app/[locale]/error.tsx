"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocaleError({ error, reset }: ErrorProps): React.JSX.Element {
  const t = useTranslations("error");

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[error.tsx]", error);
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
