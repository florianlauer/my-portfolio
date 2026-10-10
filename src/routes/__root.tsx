import type { ReactNode } from "react";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { IntlProvider, createTranslator, useTranslations } from "use-intl";
import { routing, hasLocale } from "@/i18n/routing";
import { getCanonicalUrl } from "@/i18n/metadata";
import { LOCALE_META } from "@/i18n/localeMeta";
import { intlFallbacks, loadMessages } from "@/i18n/messages";
import { Link } from "@/i18n/navigation";
import { getBaseUrl } from "@/utils/siteUrl";
import { siteIdentity } from "@/content/site";
import { SiteFooter } from "@/components/site-footer";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  // Resolved from the URL (not the `$locale` param) so 404s and invalid locales still get
  // translated chrome, falling back to the default locale.
  beforeLoad: async ({ location }) => {
    const [, segment] = location.pathname.split("/");
    const locale = hasLocale(segment) ? segment : routing.defaultLocale;
    return { locale, messages: await loadMessages(locale) };
  },
  // Loader data is serialized into the page, so the client reuses the server's year.
  loader: () => ({ year: new Date().getFullYear() }),
  head: ({ match }) => {
    const { locale, messages } = match.context;
    const t = createTranslator({ locale, messages });
    const imageUrl = `${getBaseUrl()}${siteIdentity.heroImage.src}`;
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        // Defaults for pages without their own head (404); page routes override them.
        { title: t("metadata.siteTitle") },
        { name: "description", content: t("metadata.siteDescription") },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: t("metadata.siteTitle") },
        { property: "og:locale", content: LOCALE_META[locale].og },
        { property: "og:image", content: imageUrl },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: t("site.heroImageAlt") },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: imageUrl },
        { name: "twitter:image:alt", content: t("site.heroImageAlt") },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      ],
    };
  },
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }): React.JSX.Element {
  const { locale, messages } = Route.useRouteContext();
  const { year } = Route.useLoaderData();
  const t = createTranslator({ locale, messages, namespace: "metadata" });
  const canonical = getCanonicalUrl("/", locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteIdentity.ownerName,
    jobTitle: t("siteTitle"),
    description: t("siteDescription"),
    image: `${getBaseUrl()}${siteIdentity.heroImage.src}`,
    url: canonical,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("siteTitle"),
    description: t("siteDescription"),
    url: canonical,
    inLanguage: locale,
    publisher: { "@type": "Person", name: siteIdentity.ownerName },
  };

  const jsonLd = JSON.stringify([personJsonLd, websiteJsonLd])
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <html lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <IntlProvider locale={locale} messages={messages} {...intlFallbacks}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
          {children}
          <SiteFooter year={year} />
        </IntlProvider>
        <noscript>
          <style>{`.scroll-reveal-hidden { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound(): React.JSX.Element {
  const t = useTranslations("notFound");

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
