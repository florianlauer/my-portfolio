import Link from "next/link";
import { GlobalBackground } from "@/components/global-background/GlobalBackground";
import { GalleryClient } from "@/components/gallery/GalleryClient";
import { galleryItems } from "@/content/gallery";

export const metadata = {
  title: "Galerie",
  description:
    "Photos de voyage : Laponie, Lençóis, Rio et autres escapades. Florian Lauer.",
};

export default function GaleriePage(): React.JSX.Element {
  return (
    <main
      id="contenu"
      className="relative min-h-screen overflow-x-hidden text-foreground"
      tabIndex={-1}
    >
      <GlobalBackground />
      <a
        href="#contenu"
        className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-md transition-transform focus-visible:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Aller au contenu
      </a>
      <div className="relative z-10 mx-auto w-full max-w-5xl min-w-0 box-border px-6 py-16 md:py-24">
        <nav className="mb-8" aria-label="Fil d'Ariane">
          <Link
            href="/"
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            ← Retour à l&apos;accueil
          </Link>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">Galerie</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Photos de voyage — ordre aléatoire à chaque visite.
          </p>
        </header>

        <GalleryClient items={galleryItems} />
      </div>
    </main>
  );
}
