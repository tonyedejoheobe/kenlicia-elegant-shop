import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Kenliciaastetics" },
      { name: "description", content: "Browse handcrafted crochet and beadwork by Kenliciaastetics." },
      { property: "og:title", content: "Shop — Kenliciaastetics" },
      { property: "og:description", content: "Browse the collection." },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <Layout>
      <section className="border-b border-border bg-[var(--blush)]/30 py-16 text-center md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">The Collection</p>
        <h1 className="mt-3 font-serif text-5xl sm:text-6xl">Shop Kenliciaastetics</h1>
        <p className="mx-auto mt-4 max-w-xl px-4 text-muted-foreground">
          Each piece is one of a kind — handcrafted with patience and love.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
          {products.map((p) => <ProductCard key={p.id + "b"} product={{ ...p, id: p.id + "b" }} />)}
        </div>
      </section>
    </Layout>
  );
}
