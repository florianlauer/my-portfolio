import dynamic from "next/dynamic";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell/PageShell";
import { galleryItems } from "@/content/gallery";
import { routing, type Locale } from "@/i18n/routing";
import { buildAlternates } from "@/i18n/metadata";

const GalleryClient = dynamic(() =>
  import("@/components/gallery/GalleryClient").then((m) => m.GalleryClient),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
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
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale: Locale = rawLocale;
  setRequestLocale(locale);

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
