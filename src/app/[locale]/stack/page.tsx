import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell/PageShell";
import { stackGraph } from "@/content/stack-graph";
import { buildAlternates } from "@/i18n/metadata";
import { resolveLocaleOr404, resolveLocaleOrDefault } from "@/i18n/params";

// Heavy client-side bundle (d3-force, d3-zoom, d3-transition, simple-icons) — split out
const StackGraph = dynamic(() =>
  import("@/components/stack-graph/StackGraph").then((m) => m.StackGraph),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await resolveLocaleOrDefault(params);
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
  const locale = await resolveLocaleOr404(params);
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
