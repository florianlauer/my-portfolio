import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { PageShell } from "@/components/page-shell/PageShell";
import { Link } from "@/i18n/navigation";
import { pageHead } from "@/i18n/metadata";
import { aboutSectionIds } from "@/types/passions";

export const Route = createFileRoute("/$locale/a-propos")({
  head: ({ match }) => {
    const { locale, messages } = match.context;
    const t = createTranslator({ locale, messages });
    return pageHead({
      locale,
      sourcePath: "/a-propos",
      title: t("metadata.aboutPageTitle"),
      description: t("about.pageSubtitle"),
    });
  },
  component: AProposPage,
});

function AProposPage(): React.JSX.Element {
  const t = useTranslations("about");

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
