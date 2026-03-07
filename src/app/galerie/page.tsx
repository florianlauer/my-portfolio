import dynamic from "next/dynamic";
import { PageShell } from "@/components/page-shell/PageShell";
import { galleryItems } from "@/content/gallery";

const GalleryClient = dynamic(() =>
  import("@/components/gallery/GalleryClient").then((m) => m.GalleryClient),
);

export const metadata = {
  title: "Galerie",
  description: "Photos de voyage : Laponie, Lençóis, Rio et autres escapades. Florian Lauer.",
};

export default function GaleriePage(): React.JSX.Element {
  return (
    <PageShell>
      <div className="rounded-2xl border border-border bg-background/92 p-6 md:p-8 backdrop-blur-sm">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">Galerie</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Photos de voyage — ordre aléatoire à chaque visite.
          </p>
        </header>

        <GalleryClient items={galleryItems} />
      </div>
    </PageShell>
  );
}
