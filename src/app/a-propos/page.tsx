import Link from "next/link";
import {
  BACKGROUND_TONE,
  GlobalBackground,
} from "@/components/global-background/GlobalBackground";
import { aProposContent } from "@/content/passions";

export const metadata = {
  title: "À propos",
  description:
    "En dehors du code : voyage, side projects, sport. Florian Lauer, senior fullstack engineer.",
};

export default function AProposPage(): React.JSX.Element {
  return (
    <main
      id="contenu"
      className="dark relative min-h-screen overflow-x-hidden text-foreground"
      tabIndex={-1}
    >
      <GlobalBackground
        imageSrc="/asset-laponie.jpeg"
        tone={BACKGROUND_TONE.DARK}
      />
      <a
        href="#contenu"
        className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-md transition-transform focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Aller au contenu
      </a>
      <div className="relative z-10 mx-auto w-full max-w-3xl min-w-0 box-border px-6 py-16 md:py-24">
        <nav className="mb-8" aria-label="Fil d&apos;Ariane">
          <Link
            href="/"
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            ← Retour à l&apos;accueil
          </Link>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            {aProposContent.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {aProposContent.subtitle}
          </p>
        </header>

        <div className="space-y-8">
          {aProposContent.sections.map((section) => (
            <section
              key={section.id}
              aria-labelledby={`a-propos-${section.id}`}
            >
              <h2
                id={`a-propos-${section.id}`}
                className="text-xl font-medium tracking-tight"
              >
                {section.title}
              </h2>
              <p className="mt-3 text-muted-foreground">{section.content}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
