import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { PageShell } from "@/components/page-shell/PageShell";
import { stackGraph } from "@/content/stack-graph";
import { pageHead } from "@/i18n/metadata";
import { StackGraph } from "@/components/stack-graph/StackGraph";

// Route-level code splitting keeps the heavy d3/simple-icons bundle out of other pages.
export const Route = createFileRoute("/$locale/stack")({
  head: ({ match }) => {
    const { locale, messages } = match.context;
    const t = createTranslator({ locale, messages, namespace: "metadata" });
    return pageHead({
      locale,
      sourcePath: "/stack",
      title: t("stackPageTitle"),
      description: t("stackPageDescription"),
    });
  },
  component: StackPage,
});

function StackPage(): React.JSX.Element {
  const t = useTranslations("stack");

  return (
    <PageShell containerClassName="max-w-7xl">
      <div className="rounded-2xl border border-border bg-background/92 p-6 md:p-8 backdrop-blur-sm">
        <h1 className="mb-6 text-3xl font-semibold tracking-tight">{t("pageTitle")}</h1>
        <StackGraph data={stackGraph} />
      </div>
    </PageShell>
  );
}
