import { GlobalBackground } from "@/components/global-background/GlobalBackground";
import { HomeNav } from "@/components/home-nav/HomeNav";
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
        <HomeNav />

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
