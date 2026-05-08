import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell/PageShell";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { aboutSectionIds } from "@/types/passions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const tAbout = await getTranslations({ locale, namespace: "about" });
  return {
    title: tMeta("aboutPageTitle"),
    description: tAbout("pageSubtitle"),
  };
}

export default async function AProposPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale: Locale = rawLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <PageShell>
      <div className="rounded-2xl border border-border bg-background/92 p-6 md:p-8 backdrop-blur-sm">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">{t("pageTitle")}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{t("pageSubtitle")}</p>
        </header>

        <div className="space-y-8">
          {aboutSectionIds.map((id) => (
            <section key={id} aria-labelledby={`a-propos-${id}`}>
              <h2 id={`a-propos-${id}`} className="text-xl font-medium tracking-tight">
                {t(`sections.${id}.title`)}
              </h2>
              <p className="mt-3 text-muted-foreground">{t(`sections.${id}.content`)}</p>
              {id === "voyage" && (
                <p className="mt-3">
                  <Link
                    href="/galerie"
                    className="text-sm font-medium text-primary underline underline-offset-4 pointer-hover:text-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  >
                    {t("viewMorePhotosLink")}
                  </Link>
                </p>
              )}
            </section>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
