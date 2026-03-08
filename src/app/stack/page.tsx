import { PageShell } from "@/components/page-shell/PageShell";
import { StackGraph } from "@/components/stack-graph/StackGraph";
import { stackGraph } from "@/content/stack-graph";

export const metadata = {
  title: "Ma Stack",
  description:
    "Visualisation interactive des competences techniques de Florian Lauer et de leurs relations.",
  openGraph: {
    title: "Ma Stack - Florian Lauer",
    description:
      "Visualisation interactive des competences techniques de Florian Lauer et de leurs relations.",
  },
};

export default function StackPage(): React.JSX.Element {
  return (
    <PageShell containerClassName="max-w-7xl">
      <div className="rounded-2xl border border-border bg-background/92 p-6 md:p-8 backdrop-blur-sm">
        <h1 className="mb-6 text-3xl font-semibold tracking-tight">Ma Stack</h1>
        <StackGraph data={stackGraph} />
      </div>
    </PageShell>
  );
}
