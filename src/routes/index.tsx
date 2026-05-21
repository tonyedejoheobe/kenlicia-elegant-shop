import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/products";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import catFacial from "@/assets/cat-facial.jpg";
import catScents from "@/assets/cat-scents.jpg";
import catBeauty from "@/assets/cat-beauty.jpg";
import founder from "@/assets/founder.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kenliciaastetics — Crochet, Facial Care, Scents & Beauty" },
      { name: "description", content: "Handmade crochet, facial care, oil perfumes and beauty essentials by Okekeni Alice Ede." },
      { property: "og:title", content: "Kenliciaastetics — Elegance in Everyworld" },
      { property: "og:description", content: "Crochet, facial care, scents and beauty — handcrafted with love." },
    ],
  }),
  component: Home,
});

const categoryCards = [
  { title: "Crochet & Accessories", image: catAccessories, desc: "Scrunchies, claw clips, beaded pieces." },
  { title: "Facial Care", image: catFacial, desc: "Lip gloss, masks, scrubs & more." },
  { title: "Scents", image: catScents, desc: "Oil perfumes, in cooperation with Idaras." },
  { title: "Beauty", image: catBeauty, desc: "Nails, lashes, brows & braids." },
];

function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8 lg:py-32">
          <div className="relative z-10">
            <span className="inline-block rounded-full border border-[var(--gold)]/40 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--gold)]">
              Handmade in love
            </span>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
              Handcrafted <em className="not-italic text-primary">Elegance</em> For Your World.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              Discover bespoke crochet and stunning beadwork, lovingly crafted by Okekeni Alice Ede.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-90"
              >
                Shop the Collection
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link to="/about" className="text-sm font-medium underline-offset-4 hover:text-primary hover:underline">
                Meet the Artisan
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-[var(--blush)]/60 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)]">
              <img src={hero} alt="Handmade crochet and beadwork" width={1600} height={1100} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-[var(--gold)]/30 bg-background px-5 py-4 shadow-[var(--shadow-card)] md:block">
              <p className="font-serif text-3xl text-primary">100%</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Handmade with love</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-[var(--blush)]/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">Our Craft</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Featured Categories</h2>
          </div>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {categoryCards.map((c) => (
              <div key={c.title} className="group text-center">
                <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-full border-4 border-[var(--gold)]/40 p-2 transition group-hover:border-[var(--gold)]">
                  <img src={c.image} alt={c.title} loading="lazy" className="h-full w-full rounded-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <h3 className="mt-6 font-serif text-2xl">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                <Link to="/shop" className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest text-primary hover:underline">
                  Explore →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">New Arrivals</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Handcrafted Favorites</h2>
          </div>
          <Link to="/shop" className="text-sm font-medium text-primary hover:underline">View all →</Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-[var(--blush)]/30 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)]">
              <img src={founder} alt="Okekeni Alice Ede, founder" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -right-4 -top-4 hidden h-24 w-24 rounded-full border-2 border-[var(--gold)] bg-background md:flex md:flex-col md:items-center md:justify-center">
              <span className="font-serif text-2xl text-primary">Est.</span>
              <span className="text-xs text-[var(--gold)]">2026</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">Meet the Artisan</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl leading-tight">
              Okekeni Alice Ede
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Meet the visionary behind Kenliciaastetics. Every piece is meticulously handmade
              with love, bringing <em className="not-italic text-primary">"Elegance in Everyworld"</em> directly to you.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              From the slow rhythm of a crochet hook to the careful threading of each bead, our atelier
              is a celebration of patience, intention, and timeless beauty.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground px-7 py-3.5 text-xs font-semibold uppercase tracking-widest transition hover:bg-foreground hover:text-background">
              Our Story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
