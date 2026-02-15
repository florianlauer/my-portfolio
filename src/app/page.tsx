import { ArsenalSection } from "@/components/home-sections/ArsenalSection";
import { ContactSection } from "@/components/home-sections/ContactSection";
import { HeroSection } from "@/components/home-sections/HeroSection";
import { JourneySection } from "@/components/home-sections/JourneySection";
import { arsenalGroups, arsenalTags } from "@/content/arsenal";
import { journeyChapters } from "@/content/journey";
import { heroStack, siteContent } from "@/content/site";
import { primaryContactLink, socialLinks } from "@/content/socialLinks";

export default function HomePage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-16 md:py-24">
        <nav
          aria-label="Navigation des sections"
          className="sticky top-4 z-10 flex items-center gap-2 rounded-full border border-border bg-background/95 p-2 backdrop-blur supports-backdrop-filter:bg-background/80"
        >
          <a className="rounded-full px-3 py-1 text-sm text-foreground hover:bg-secondary" href="#parcours">
            Parcours
          </a>
          <a className="rounded-full px-3 py-1 text-sm text-foreground hover:bg-secondary" href="#arsenal">
            Arsenal
          </a>
          <a className="rounded-full px-3 py-1 text-sm text-foreground hover:bg-secondary" href="#contact">
            Contact
          </a>
        </nav>

        <HeroSection
          heroStack={heroStack}
          siteContent={siteContent}
          primaryContactLink={primaryContactLink}
        />
        <JourneySection journeyChapters={journeyChapters} />
        <ArsenalSection arsenalGroups={arsenalGroups} arsenalTags={arsenalTags} />
        <ContactSection primaryContactLink={primaryContactLink} socialLinks={socialLinks} />
      </div>
    </main>
  );
}
