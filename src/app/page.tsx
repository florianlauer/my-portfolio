import { GlobalBackground } from "@/components/global-background/GlobalBackground";
import { AssetPlaceholder } from "@/components/asset-placeholder/AssetPlaceholder";
import { ScrollReveal } from "@/components/scroll-reveal/ScrollReveal";
import { ArsenalSection } from "@/components/home-sections/ArsenalSection";
import { ContactSection } from "@/components/home-sections/ContactSection";
import { HeroSection } from "@/components/home-sections/HeroSection";
import { JourneySection } from "@/components/home-sections/JourneySection";
import { arsenalGroups, arsenalTags } from "@/content/arsenal";
import { journeyChapters } from "@/content/journey";
import { heroStack, showAssetPlaceholders, siteContent } from "@/content/site";
import { primaryContactLink, socialLinks } from "@/content/socialLinks";

export default function HomePage(): React.JSX.Element {
  return (
    <main
      id="contenu"
      className="relative min-h-screen text-foreground"
      tabIndex={-1}
    >
      <GlobalBackground />
      <a
        href="#contenu"
        className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-md transition-transform focus-visible:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Aller au contenu
      </a>
      <div className="relative z-10 mx-auto grid max-w-5xl gap-8 px-6 py-16 md:py-24">
        <nav
          aria-label="Navigation des sections"
          className="sticky top-4 z-10 flex items-center gap-2 rounded-full border border-border bg-background/95 p-2 backdrop-blur supports-backdrop-filter:bg-background/80"
        >
          <a
            className="rounded-full px-3 py-1 text-sm text-foreground outline-none transition-colors duration-200 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href="#parcours"
          >
            Parcours
          </a>
          <a
            className="rounded-full px-3 py-1 text-sm text-foreground outline-none transition-colors duration-200 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href="#arsenal"
          >
            Arsenal
          </a>
          <a
            className="rounded-full px-3 py-1 text-sm text-foreground outline-none transition-colors duration-200 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href="#contact"
          >
            Contact
          </a>
        </nav>

        <HeroSection
          heroStack={heroStack}
          siteContent={siteContent}
          primaryContactLink={primaryContactLink}
        />

        <ScrollReveal>
          <JourneySection journeyChapters={journeyChapters} />
        </ScrollReveal>
        <ScrollReveal>
          <ArsenalSection
            arsenalGroups={arsenalGroups}
            arsenalTags={arsenalTags}
          />
        </ScrollReveal>

        {showAssetPlaceholders ? (
          <AssetPlaceholder
            id="4"
            title="Image section Passions / À propos (future section)"
            description="Pour la story 12.2 : section dédiée passions ou page À propos. Tu pourras ajouter une ou plusieurs images ici."
            dimensions="1200×630 px ou 800×600 px"
            className="w-full"
          />
        ) : null}

        <ContactSection
          primaryContactLink={primaryContactLink}
          socialLinks={socialLinks}
          contactEmail={siteContent.contactEmail}
        />
      </div>
    </main>
  );
}
