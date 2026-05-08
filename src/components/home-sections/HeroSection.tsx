import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { HeroImageParallax } from "@/components/hero/HeroImageParallax";
import { siteIdentity } from "@/content/site";
import type { HeroTech } from "@/types/site";
import type { SocialLink } from "@/types/socialLinks";

type HeroSectionProps = {
  heroStack: HeroTech[];
  primaryContactLink: SocialLink | undefined;
};

export const HeroSection = ({
  heroStack,
  primaryContactLink,
}: HeroSectionProps): React.JSX.Element => {
  const tSite = useTranslations("site");
  const tA11y = useTranslations("a11y");
  const tHero = useTranslations("hero");

  const stackLine: string = heroStack.map((tech) => tech.label).join(" · ");
  const ctaLabel: string = primaryContactLink?.label ?? tSite("primaryCta");
  const ctaHref: string = primaryContactLink?.href ?? siteIdentity.primaryCtaHref;

  return (
    <section
      aria-labelledby="hero-title"
      className="rounded-2xl border border-border bg-background/92 p-6 md:p-8 backdrop-blur-sm"
    >
      <div className="grid items-center gap-6 md:grid-cols-[140px_1fr]">
        <HeroImageParallax>
          <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-border md:h-36 md:w-36">
            <Image
              src={siteIdentity.heroImage.src}
              alt={tSite("heroImageAlt")}
              fill
              priority
              sizes="(min-width: 768px) 144px, 112px"
              className="object-cover"
            />
          </div>
        </HeroImageParallax>

        <div>
          <p className="text-sm font-medium text-muted-foreground">{siteIdentity.ownerName}</p>
          <h1 id="hero-title" className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            {tSite("heroTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            {tSite("heroSubtitle")}
          </p>
        </div>
      </div>

      <p
        className="mt-6 text-sm font-semibold text-foreground/70 tracking-wide"
        aria-label={tA11y("stackPrincipaleLabel")}
      >
        {stackLine}
      </p>

      <div className="mt-8">
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${ctaLabel} ${tA11y("openInNewTab")}`}
            >
              {ctaLabel}
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#stack" aria-label={tA11y("goToStackSection")}>
              {tHero("viewStackButton")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
