import { getTranslations } from "next-intl/server";
import { GlobalBackground } from "@/components/global-background/GlobalBackground";
import { HomeNav } from "@/components/home-nav/HomeNav";
import { ScrollProgressBar } from "@/components/scroll-progress/ScrollProgressBar";
import { ScrollReveal } from "@/components/scroll-reveal/ScrollReveal";
import { StackSection } from "@/components/home-sections/StackSection";
import { ContactSection } from "@/components/home-sections/ContactSection";
import { HeroSection } from "@/components/home-sections/HeroSection";
import { JourneySection } from "@/components/home-sections/JourneySection";
import { PassionsSection } from "@/components/home-sections/PassionsSection";
import { heroStack, siteIdentity } from "@/content/site";
import { primaryContactLink, socialLinks } from "@/content/socialLinks";
import { resolveLocaleOr404 } from "@/i18n/params";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const locale = await resolveLocaleOr404(params);
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-x-hidden text-foreground"
      tabIndex={-1}
    >
      <ScrollProgressBar />
      <GlobalBackground />
      <a
        href="#content-start"
        className="fixed left-4 top-4 z-100 -translate-y-20 rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-md transition-transform focus-visible:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {tA11y("skipToContent")}
      </a>
      <div className="relative z-10 mx-auto grid w-full max-w-5xl gap-8 px-6 pt-28 pb-16 md:pt-32 md:pb-24 min-w-0 box-border">
        <HomeNav />
        <div id="content-start" tabIndex={-1} className="sr-only" aria-hidden />

        <ScrollReveal immediate>
          <HeroSection heroStack={heroStack} primaryContactLink={primaryContactLink} />
        </ScrollReveal>

        <ScrollReveal>
          <JourneySection />
        </ScrollReveal>
        <ScrollReveal>
          <StackSection />
        </ScrollReveal>

        <ScrollReveal>
          <PassionsSection />
        </ScrollReveal>

        <ScrollReveal>
          <ContactSection
            primaryContactLink={primaryContactLink}
            socialLinks={socialLinks}
            contactEmail={siteIdentity.contactEmail}
          />
        </ScrollReveal>
      </div>
    </main>
  );
}
