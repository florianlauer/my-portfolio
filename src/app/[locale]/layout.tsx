import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { getBaseUrl } from "@/utils/siteUrl";
import { siteContent } from "@/content/site";

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
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("siteTitle");
  const description = t("siteDescription");
  return {
    metadataBase: new URL(baseUrl),
    title: { default: title, template: `%s | ${siteContent.ownerName}` },
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
      images: [{ url: "/hero-1.jpeg", width: 1200, height: 630, alt: siteContent.heroImage.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: "/hero-1.jpeg", alt: siteContent.heroImage.alt }],
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
  const t = await getTranslations({ locale, namespace: "metadata" });

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteContent.ownerName,
    jobTitle: t("siteTitle"),
    description: t("siteDescription"),
    image: `${baseUrl}/hero-1.jpeg`,
    url: `${baseUrl}/${locale}`,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("siteTitle"),
    description: t("siteDescription"),
    url: `${baseUrl}/${locale}`,
    inLanguage: locale,
    publisher: { "@type": "Person", name: siteContent.ownerName },
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
