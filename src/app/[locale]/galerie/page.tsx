import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell/PageShell";
import { galleryItems } from "@/content/gallery";
import { buildAlternates } from "@/i18n/metadata";
import { resolveLocaleOr404, resolveLocaleOrDefault } from "@/i18n/params";

const GalleryClient = dynamic(() =>
  import("@/components/gallery/GalleryClient").then((m) => m.GalleryClient),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await resolveLocaleOrDefault(params);
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: tMeta("galleryPageTitle"),
    description: tMeta("galleryPageDescription"),
    alternates: buildAlternates("/galerie", locale),
  };
}

export default async function GaleriePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const locale = await resolveLocaleOr404(params);
  const t = await getTranslations({ locale, namespace: "gallery" });

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
