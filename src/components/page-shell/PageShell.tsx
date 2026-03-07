import { cn } from "@/lib/utils";
import { GlobalBackground } from "@/components/global-background/GlobalBackground";
import { HomeNav } from "@/components/home-nav/HomeNav";

type PageShellProps = {
  children: React.ReactNode;
  /** Classes supplémentaires pour le conteneur (permet de surcharger max-w-5xl). */
  containerClassName?: string;
};

/**
 * Coquille partagée pour les pages secondaires (à propos, galerie).
 * Server Component : GlobalBackground et HomeNav sont des Client Components enfants.
 */
export function PageShell({ children, containerClassName }: PageShellProps): React.JSX.Element {
  return (
    <main
      id="contenu"
      className="relative min-h-screen overflow-x-hidden text-foreground"
      tabIndex={-1}
    >
      <GlobalBackground />
      <a
        href="#contenu"
        className="fixed left-4 top-4 z-100 -translate-y-20 rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-md transition-transform focus-visible:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Aller au contenu
      </a>
      <div
        className={cn(
          "relative z-10 mx-auto grid w-full max-w-5xl gap-8 px-6 pt-28 pb-16 md:pt-32 md:pb-24 min-w-0 box-border",
          containerClassName,
        )}
      >
        <HomeNav />
        {children}
      </div>
    </main>
  );
}
