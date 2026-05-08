import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { getBaseUrl } from "@/utils/siteUrl";
import { siteIdentity } from "@/content/site";

const baseUrl = getBaseUrl();

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function localeToOg(locale: Locale): string {
  return ({ fr: "fr_FR", en: "en_US", de: "de_DE" } as const)[locale];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const tSite = await getTranslations({ locale, namespace: "site" });
  const title = tMeta("siteTitle");
  const description = tMeta("siteDescription");
  const heroAlt = tSite("heroImageAlt");

  return {
    metadataBase: new URL(baseUrl),
    title: { default: title, template: `%s | ${siteIdentity.ownerName}` },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
        de: "/de",
      },
    },
    openGraph: {
      type: "website",
      locale: localeToOg(locale),
      url: `${baseUrl}/${locale}`,
      siteName: title,
      title,
      description,
      images: [{ url: siteIdentity.heroImage.src, width: 1200, height: 630, alt: heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: siteIdentity.heroImage.src, alt: heroAlt }],
    },
  };
}

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps): Promise<React.JSX.Element> {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale: Locale = rawLocale;
  setRequestLocale(locale);

  const messages = await getMessages();
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteIdentity.ownerName,
    jobTitle: tMeta("siteTitle"),
    description: tMeta("siteDescription"),
    image: `${baseUrl}${siteIdentity.heroImage.src}`,
    url: `${baseUrl}/${locale}`,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: tMeta("siteTitle"),
    description: tMeta("siteDescription"),
    url: `${baseUrl}/${locale}`,
    inLanguage: locale,
    publisher: { "@type": "Person", name: siteIdentity.ownerName },
  };

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personJsonLd, websiteJsonLd]),
        }}
      />
      {children}
    </NextIntlClientProvider>
  );
}
