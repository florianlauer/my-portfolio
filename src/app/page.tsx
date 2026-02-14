import { Button } from "@/components/ui/button";

export default function HomePage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="text-4xl font-semibold tracking-tight">my-portfolio</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
          Base Next.js + Tailwind initialisee. Story 1.1 en cours.
        </p>
        <div className="mt-8">
          <Button>shadcn ready</Button>
        </div>
      </section>
    </main>
  );
}
