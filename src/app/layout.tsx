import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Florian Lauer | Portfolio",
    template: "%s | Florian Lauer",
  },
  description:
    "Portfolio de Florian Lauer, Senior Fullstack Engineer: parcours, stack et contact.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
