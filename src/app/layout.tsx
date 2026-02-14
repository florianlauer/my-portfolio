import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "my-portfolio",
  description: "Portfolio de Florian",
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
