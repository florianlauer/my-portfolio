import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { HeroTech, SiteContent } from "@/types/site";
import type { SocialLink } from "@/types/socialLinks";

type HeroSectionProps = {
  siteContent: SiteContent;
  heroStack: HeroTech[];
  primaryContactLink: SocialLink | undefined;
};

export const HeroSection = ({
  siteContent,
  heroStack,
  primaryContactLink,
}: HeroSectionProps): React.JSX.Element => {
  const stackLine: string = heroStack.map((tech) => tech.label).join(" · ");
  const ctaLabel: string = primaryContactLink?.label ?? siteContent.primaryCta.label;
  const ctaHref: string = primaryContactLink?.href ?? siteContent.primaryCta.href;

  return (
    <section aria-labelledby="hero-title" className="rounded-2xl border border-border p-6 md:p-8">
      <div className="grid items-center gap-6 md:grid-cols-[140px_1fr]">
        <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-border md:h-36 md:w-36">
          <Image
            src={siteContent.heroImage.src}
            alt={siteContent.heroImage.alt}
            fill
            priority
            sizes="(min-width: 768px) 144px, 112px"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">{siteContent.ownerName}</p>
          <h1 id="hero-title" className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            {siteContent.heroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            {siteContent.heroSubtitle}
          </p>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-label="Stack principale">
        {stackLine}
      </p>

      <div className="mt-8">
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={ctaHref} target="_blank" rel="noopener noreferrer">
              {ctaLabel}
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#arsenal">Voir la stack</a>
          </Button>
        </div>
      </div>
    </section>
  );
};
