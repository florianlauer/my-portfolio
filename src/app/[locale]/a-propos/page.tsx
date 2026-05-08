import Link from "next/link";
import { PageShell } from "@/components/page-shell/PageShell";
import { aProposContent } from "@/content/passions";

export const metadata = {
  title: "À propos",
  description:
    "En dehors du code : voyage, side projects, sport. Florian Lauer, senior fullstack engineer.",
};

export default function AProposPage(): React.JSX.Element {
  return (
    <PageShell>
      <div className="rounded-2xl border border-border bg-background/92 p-6 md:p-8 backdrop-blur-sm">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">{aProposContent.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{aProposContent.subtitle}</p>
        </header>

        <div className="space-y-8">
          {aProposContent.sections.map((section) => (
            <section key={section.id} aria-labelledby={`a-propos-${section.id}`}>
              <h2 id={`a-propos-${section.id}`} className="text-xl font-medium tracking-tight">
                {section.title}
              </h2>
              <p className="mt-3 text-muted-foreground">{section.content}</p>
              {section.id === "voyage" && (
                <p className="mt-3">
                  <Link
                    href="/galerie"
                    className="text-sm font-medium text-primary underline underline-offset-4 pointer-hover:text-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  >
                    Voir plus de photos →
                  </Link>
                </p>
              )}
            </section>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
