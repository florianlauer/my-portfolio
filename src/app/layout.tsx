import { Fraunces, DM_Sans } from "next/font/google";
import { cookies } from "next/headers";
import { routing } from "@/i18n/routing";
import "./globals.css";

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

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({
  children,
}: RootLayoutProps): Promise<React.JSX.Element> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const lang = (routing.locales as readonly string[]).includes(localeCookie ?? "")
    ? (localeCookie as string)
    : routing.defaultLocale;

  return (
    <html lang={lang} className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        {children}
        <noscript>
          <style>{`.scroll-reveal-hidden { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </body>
    </html>
  );
}
