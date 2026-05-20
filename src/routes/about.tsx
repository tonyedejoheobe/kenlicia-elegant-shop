import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import founder from "@/assets/founder.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Kenliciaastetics" },
      { name: "description", content: "The story of Okekeni Alice Ede and Kenliciaastetics." },
      { property: "og:title", content: "About — Kenliciaastetics" },
      { property: "og:description", content: "Meet the artisan behind the brand." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-5 md:py-28 lg:px-8">
        <div className="md:col-span-2">
          <div className="overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)]">
            <img src={founder} alt="Okekeni Alice Ede" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">Our Story</p>
          <h1 className="mt-3 font-serif text-5xl leading-tight sm:text-6xl">
            A studio rooted in <em className="not-italic text-primary">love</em> and patience.
          </h1>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              Kenliciaastetics began as a quiet ritual — Okekeni Alice Ede sitting with thread, hook,
              and a constellation of beads, dreaming up pieces that carry weight and warmth.
            </p>
            <p>
              Today, every order leaves our atelier with the same intention: to bring elegance,
              softness, and meaning into your everyday world.
            </p>
            <p className="font-serif text-2xl italic text-primary">"Elegance in Everyworld."</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
