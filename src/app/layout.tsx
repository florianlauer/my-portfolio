import type { Metadata } from "next";
import { siteContent } from "@/content/site";
import { getBaseUrl } from "@/utils/siteUrl";
import "./globals.css";

const baseUrl = getBaseUrl();
const title = "Florian Lauer | Portfolio";
const description =
  "Portfolio de Florian Lauer, Senior Fullstack Engineer: parcours, stack et contact.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: "%s | Florian Lauer",
  },
  description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: baseUrl,
    siteName: title,
    title,
    description,
    images: [
      {
        url: "/hero-1.jpeg",
        width: 1200,
        height: 630,
        alt: siteContent.heroImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: "/hero-1.jpeg", alt: siteContent.heroImage.alt }],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteContent.ownerName,
  jobTitle: siteContent.heroTitle,
  description: siteContent.heroSubtitle,
  image: `${baseUrl}/hero-1.jpeg`,
  url: baseUrl,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: title,
  description,
  url: baseUrl,
  publisher: { "@type": "Person", name: siteContent.ownerName },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="fr">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd]),
          }}
        />
        {children}
        <noscript>
          <style>{`.scroll-reveal-hidden { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </body>
    </html>
  );
}
