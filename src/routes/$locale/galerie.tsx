import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { PageShell } from "@/components/page-shell/PageShell";
import { galleryItems } from "@/content/gallery";
import { pageHead } from "@/i18n/metadata";
import { GalleryClient } from "@/components/gallery/GalleryClient";

export const Route = createFileRoute("/$locale/galerie")({
  head: ({ match }) => {
    const { locale, messages } = match.context;
    const t = createTranslator({ locale, messages, namespace: "metadata" });
    return pageHead({
      locale,
      sourcePath: "/galerie",
      title: t("galleryPageTitle"),
      description: t("galleryPageDescription"),
    });
  },
  component: GaleriePage,
});

function GaleriePage(): React.JSX.Element {
  const t = useTranslations("gallery");

  // Hydrate items with localized captions for the client component
  const localizedItems = galleryItems.map((item) => {
    const caption = t(`captions.${item.id}`);
    return { ...item, alt: caption, caption };
  });

  return (
    <PageShell>
      <div className="rounded-2xl border border-border bg-background/92 p-6 md:p-8 backdrop-blur-sm">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">{t("pageTitle")}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{t("pageSubtitle")}</p>
        </header>

        <GalleryClient items={localizedItems} />
      </div>
    </PageShell>
  );
}
