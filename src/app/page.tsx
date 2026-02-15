import Link from "next/link";
import { GlobalBackground } from "@/components/global-background/GlobalBackground";
import { ScrollReveal } from "@/components/scroll-reveal/ScrollReveal";
import { StackSection } from "@/components/home-sections/StackSection";
import { ContactSection } from "@/components/home-sections/ContactSection";
import { HeroSection } from "@/components/home-sections/HeroSection";
import { JourneySection } from "@/components/home-sections/JourneySection";
import { PassionsSection } from "@/components/home-sections/PassionsSection";
import { stackGroups, stackTags } from "@/content/stack";
import { journeyChapters } from "@/content/journey";
import { passionsSectionContent } from "@/content/passions";
import { heroStack, siteContent } from "@/content/site";
import { primaryContactLink, socialLinks } from "@/content/socialLinks";

export default function HomePage(): React.JSX.Element {
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
      <div className="relative z-10 mx-auto grid w-full max-w-5xl gap-8 px-6 pt-28 pb-16 md:pt-32 md:pb-24 min-w-0 box-border">
        <div className="fixed left-0 right-0 top-8 z-30 px-4">
          <div className="relative mx-auto max-w-5xl">
            <nav
              aria-label="Navigation des sections"
              className="flex flex-nowrap items-center gap-2 overflow-x-auto overflow-y-hidden rounded-full border border-border bg-background/95 p-2 backdrop-blur supports-backdrop-filter:bg-background/80 [scrollbar-width:thin] [-webkit-overflow-scrolling:touch]"
            >
              <a
            className="shrink-0 rounded-full px-3 py-1 text-sm text-foreground whitespace-nowrap outline-none transition-colors duration-200 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href="#parcours"
          >
            Parcours
          </a>
          <a
            className="shrink-0 rounded-full px-3 py-1 text-sm text-foreground whitespace-nowrap outline-none transition-colors duration-200 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href="#stack"
          >
            Stack
          </a>
          <a
            className="shrink-0 rounded-full px-3 py-1 text-sm text-foreground whitespace-nowrap outline-none transition-colors duration-200 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href="#passions"
          >
            Passions
          </a>
          <Link
            href="/a-propos"
            className="shrink-0 rounded-full px-3 py-1 text-sm text-foreground whitespace-nowrap outline-none transition-colors duration-200 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            À propos
          </Link>
          <Link
            href="/galerie"
            className="shrink-0 rounded-full px-3 py-1 text-sm text-foreground whitespace-nowrap outline-none transition-colors duration-200 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Galerie
          </Link>
          <a
            className="shrink-0 rounded-full px-3 py-1 text-sm text-foreground whitespace-nowrap outline-none transition-colors duration-200 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href="#contact"
          >
            Contact
          </a>
            </nav>
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-background/98 to-transparent rounded-r-full"
              aria-hidden
            />
          </div>
        </div>

        <HeroSection
          heroStack={heroStack}
          siteContent={siteContent}
          primaryContactLink={primaryContactLink}
        />

        <ScrollReveal>
          <JourneySection journeyChapters={journeyChapters} />
        </ScrollReveal>
        <ScrollReveal>
          <StackSection
            stackGroups={stackGroups}
            stackTags={stackTags}
          />
        </ScrollReveal>

        <ScrollReveal>
          <PassionsSection content={passionsSectionContent} />
        </ScrollReveal>

        <ContactSection
          primaryContactLink={primaryContactLink}
          socialLinks={socialLinks}
          contactEmail={siteContent.contactEmail}
        />
      </div>
    </main>
  );
}
