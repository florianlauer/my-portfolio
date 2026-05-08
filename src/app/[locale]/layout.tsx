import { Fraunces, DM_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { buildAlternates, getCanonicalUrl } from "@/i18n/metadata";
import { LOCALE_META } from "@/i18n/localeMeta";
import { resolveLocaleOr404, resolveLocaleOrDefault } from "@/i18n/params";
import { getBaseUrl } from "@/utils/siteUrl";
import { siteIdentity } from "@/content/site";
import { SiteFooter } from "@/components/site-footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-dm-sans",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams(): Array<{ locale: Locale }> {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await resolveLocaleOrDefault(params);
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const tSite = await getTranslations({ locale, namespace: "site" });
  const title = tMeta("siteTitle");
  const description = tMeta("siteDescription");
  const heroAlt = tSite("heroImageAlt");
  const baseUrl = getBaseUrl();
  const canonical = getCanonicalUrl("/", locale);

  return {
    metadataBase: new URL(baseUrl),
    title: { default: title, template: `%s | ${siteIdentity.ownerName}` },
    description,
    alternates: buildAlternates("/", locale),
    openGraph: {
      type: "website",
      locale: LOCALE_META[locale].og,
      url: canonical,
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

// Namespaces consumed by client components (LanguageSwitcher, HomeNav, SiteFooter,
// GalleryClient, Lightbox, stack-graph/*). Server-only namespaces are stripped from
// the client provider to cut hydration JSON.
const CLIENT_NAMESPACES = [
  "languageSwitcher",
  "nav",
  "footer",
  "gallery",
  "stack",
  "a11y",
  "error",
  "notFound",
] as const satisfies ReadonlyArray<keyof Messages>;

function pickNamespaces<K extends keyof Messages>(
  messages: Messages,
  keys: ReadonlyArray<K>,
): Pick<Messages, K> {
  const out = {} as Pick<Messages, K>;
  for (const key of keys) out[key] = messages[key];
  return out;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps): Promise<React.JSX.Element> {
  const locale = await resolveLocaleOr404(params);

  const messages = await getMessages();
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const canonical = getCanonicalUrl("/", locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteIdentity.ownerName,
    jobTitle: tMeta("siteTitle"),
    description: tMeta("siteDescription"),
    image: `${getBaseUrl()}${siteIdentity.heroImage.src}`,
    url: canonical,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: tMeta("siteTitle"),
    description: tMeta("siteDescription"),
    url: canonical,
    inLanguage: locale,
    publisher: { "@type": "Person", name: siteIdentity.ownerName },
  };

  const jsonLd = JSON.stringify([personJsonLd, websiteJsonLd])
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <html lang={locale} className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider
          messages={pickNamespaces(messages as Messages, CLIENT_NAMESPACES)}
          locale={locale}
        >
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
          {children}
          <SiteFooter year={new Date().getFullYear()} />
        </NextIntlClientProvider>
        <noscript>
          <style>{`.scroll-reveal-hidden { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </body>
    </html>
  );
}
