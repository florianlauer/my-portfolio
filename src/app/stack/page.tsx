import dynamic from "next/dynamic";
import { PageShell } from "@/components/page-shell/PageShell";
import { stackGraph } from "@/content/stack-graph";

// Heavy client-side bundle (d3-force, d3-zoom, d3-transition, simple-icons) — split out
const StackGraph = dynamic(() =>
  import("@/components/stack-graph/StackGraph").then((m) => m.StackGraph),
);

export const metadata = {
  title: "Ma Stack",
  description:
    "Visualisation interactive des compétences techniques de Florian Lauer et de leurs relations.",
  openGraph: {
    title: "Ma Stack - Florian Lauer",
    description:
      "Visualisation interactive des compétences techniques de Florian Lauer et de leurs relations.",
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
