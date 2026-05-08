import dynamic from "next/dynamic";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell/PageShell";
import { stackGraph } from "@/content/stack-graph";
import { routing, type Locale } from "@/i18n/routing";
import { buildAlternates } from "@/i18n/metadata";

// Heavy client-side bundle (d3-force, d3-zoom, d3-transition, simple-icons) — split out
const StackGraph = dynamic(() =>
  import("@/components/stack-graph/StackGraph").then((m) => m.StackGraph),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: tMeta("stackPageTitle"),
    description: tMeta("stackPageDescription"),
    alternates: buildAlternates("/stack", locale),
    openGraph: {
      title: `${tMeta("stackPageTitle")} - Florian Lauer`,
      description: tMeta("stackPageDescription"),
    },
  };
}

export default async function StackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale: Locale = rawLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "stack" });

  return (
    <PageShell containerClassName="max-w-7xl">
      <div className="rounded-2xl border border-border bg-background/92 p-6 md:p-8 backdrop-blur-sm">
        <h1 className="mb-6 text-3xl font-semibold tracking-tight">{t("pageTitle")}</h1>
        <StackGraph data={stackGraph} />
      </div>
    </PageShell>
  );
}
