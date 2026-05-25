import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { products as staticProducts, categories, type Category, type Product } from "@/data/products";
import { fetchProducts } from "@/lib/products-db";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Kenliciaastetics" },
      { name: "description", content: "Browse handmade crochet, facial care, oil perfumes and beauty essentials by Kenliciaastetics." },
      { property: "og:title", content: "Shop — Kenliciaastetics" },
      { property: "og:description", content: "Crochet, facial care, scents, and beauty — all handcrafted with love." },
    ],
  }),
  component: Shop,
});

type Filter = "All" | Category | string;

function Shop() {
  const [filter, setFilter] = useState<Filter>("All");

  const { data: dbProducts } = useQuery({
    queryKey: ["shop-products"],
    queryFn: fetchProducts,
  });

  const fromDb: Product[] = (dbProducts ?? []).map((p) => ({
    id: p.id,
    title: p.title,
    price: Number(p.price),
    image: p.image_url ?? "",
    category: p.category as Category,
  }));

  // Prefer DB products; fall back to static catalog if DB is empty
  const all: Product[] = fromDb.length > 0 ? fromDb : staticProducts;

  const filtered = filter === "All" ? all : all.filter((p) => p.category === filter);
  const tabs: Filter[] = ["All", ...categories];

  return (
    <Layout>
      <section className="border-b border-border bg-[var(--blush)]/30 py-16 text-center md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">The Collection</p>
        <h1 className="mt-3 font-serif text-5xl sm:text-6xl">Shop Kenliciaastetics</h1>
        <p className="mx-auto mt-4 max-w-xl px-4 text-muted-foreground">
          Crochet, facial care, scents, and beauty — each piece handcrafted with love.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-widest transition ${
                filter === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground/70 hover:border-primary hover:text-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">No items in this category yet.</p>
        )}
      </section>
    </Layout>
  );
}
