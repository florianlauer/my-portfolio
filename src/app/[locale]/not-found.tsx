import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function LocaleNotFound(): Promise<React.JSX.Element> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("description")}</p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-[44px] items-center rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors pointer-hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {t("backHome")}
        </Link>
      </div>
    </main>
  );
}
