import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { passionBlockIds } from "@/types/passions";

export const PassionsSection = (): React.JSX.Element => {
  const t = useTranslations("passions");

  return (
    <section
      id="passions"
      aria-labelledby="passions-title"
      className="scroll-mt-24 rounded-2xl border border-border bg-background/92 p-6 md:p-8 backdrop-blur-sm"
    >
      <h2
        id="passions-title"
        className="border-l-2 border-primary pl-3 text-2xl font-semibold tracking-tight"
      >
        {t("title")}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{t("subtitle")}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {passionBlockIds.map((id) => {
          const items = t.raw(`blocks.${id}.items`) as string[];
          return (
            <article
              key={id}
              className="rounded-xl border border-border/70 border-t-2 border-t-primary p-4 transition-all duration-200 pointer-hover:-translate-y-1 pointer-hover:shadow-md pointer-hover:border-border md:pointer-hover:scale-[1.02]"
            >
              <h3 className="text-lg font-medium">{t(`blocks.${id}.title`)}</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted-foreground/70 italic">
                {t(`blocks.${id}.closing`)}
              </p>
            </article>
          );
        })}
      </div>

      <p className="mt-6">
        <Link
          href="/a-propos"
          className="text-sm font-medium text-primary underline underline-offset-4 pointer-hover:text-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
        >
          {t("linkLabel")}
        </Link>
      </p>
    </section>
  );
};
