import { PageShell } from "@/components/page-shell/PageShell";

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
    <PageShell containerClassName="max-w-none px-0">
      <h1 className="px-6 text-2xl font-semibold tracking-tight text-foreground/80">Ma Stack</h1>
      <div id="stack-graph-root" className="relative flex-1 w-full min-h-[60vh]" />
    </PageShell>
  );
}
