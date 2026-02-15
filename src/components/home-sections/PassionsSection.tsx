import Link from "next/link";
import type { PassionsSectionContent } from "@/types/passions";

type PassionsSectionProps = {
  content: PassionsSectionContent;
};

export const PassionsSection = ({
  content,
}: PassionsSectionProps): React.JSX.Element => {
  return (
    <section
      id="passions"
      aria-labelledby="passions-title"
      className="scroll-mt-24 rounded-2xl border border-border bg-background/92 p-6 md:p-8 backdrop-blur-sm"
    >
      <h2 id="passions-title" className="text-2xl font-semibold tracking-tight">
        {content.title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{content.subtitle}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {content.blocks.map((block) => (
          <article
            key={block.id}
            className="rounded-xl border border-border/70 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-border md:hover:scale-[1.02]"
          >
            <h3 className="text-lg font-medium">{block.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {block.description}
            </p>
          </article>
        ))}
      </div>

      {content.linkToAProposLabel ? (
        <p className="mt-6">
          <Link
            href="/a-propos"
            className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          >
            {content.linkToAProposLabel}
          </Link>
        </p>
      ) : null}
    </section>
  );
};
