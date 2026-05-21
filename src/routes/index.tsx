import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/products";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import catCrochet from "@/assets/cat-accessories.jpg";
import catBeadwork from "@/assets/product-2.jpg";
import catCustom from "@/assets/cat-beauty.jpg";
import founder from "@/assets/founder.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kenliciaastetics — Handcrafted Elegance For Your World" },
      { name: "description", content: "Premium handmade crochet and bespoke beadwork by Okekeni Alice Ede. Elegance in Everyworld." },
      { property: "og:title", content: "Kenliciaastetics — Elegance in Everyworld" },
      { property: "og:description", content: "Premium handmade crochet and bespoke beadwork — handcrafted with love." },
    ],
  }),
  component: Home,
});

const categoryCards = [
  { title: "Exquisite Crochet", image: catCrochet, desc: "Bags, blouses & accessories woven by hand." },
  { title: "Bespoke Beadwork", image: catBeadwork, desc: "One-of-a-kind necklaces, bracelets & sets." },
  { title: "Custom Orders", image: catCustom, desc: "Your vision, brought to life thread by thread." },
];

function Home() {
  useScrollReveal();
  const heroImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = heroImgRef.current;
      if (!el) return;
      const y = window.scrollY;
      // subtle parallax
      el.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(1.08)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Layout>
      {/* HERO — edge-to-edge with parallax */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        <img
          ref={heroImgRef}
          src={hero}
          alt="Handcrafted crochet and beadwork by Kenliciaastetics"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-center px-4 sm:px-6 lg:px-8">
          <span className="reveal inline-block rounded-full border border-white/40 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-white">
            Elegance in Everyworld
          </span>
          <h1 className="reveal mt-6 max-w-3xl font-serif text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Handcrafted <em className="not-italic text-[color:oklch(0.78_0.18_358)]">Elegance</em> For Your World.
          </h1>
          <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Bespoke crochet creations and intricate beadwork, lovingly handmade by Okekeni Alice Ede.
          </p>
          <div className="reveal mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-soft)] transition hover:scale-[1.03] hover:opacity-95"
            >
              Explore the Collection
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link to="/about" className="text-sm font-medium text-white underline-offset-4 hover:underline">
              Meet the Artisan
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brown)]">Our Craft</p>
            <h2 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">Featured Categories</h2>
            <p className="mt-4 text-muted-foreground">Three signature ways to wear Kenliciaastetics.</p>
          </div>
          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {categoryCards.map((c, i) => (
              <div
                key={c.title}
                className="reveal group text-center"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-full border-2 border-[var(--brown)]/40 p-2 transition duration-500 group-hover:border-[var(--brown)] group-hover:shadow-[var(--shadow-card)]">
                  <img src={c.image} alt={c.title} loading="lazy" className="h-full w-full rounded-full object-cover transition duration-[900ms] group-hover:scale-110" />
                </div>
                <h3 className="mt-7 font-serif text-2xl text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                <Link to="/shop" className="mt-5 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:tracking-[0.28em]">
                  Explore →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="border-t border-border bg-[var(--blush)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brown)]">New Arrivals</p>
              <h2 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">Handcrafted Favorites</h2>
            </div>
            <Link to="/shop" className="text-sm font-medium text-primary hover:underline">View all →</Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((p, i) => (
              <div key={p.id} className="reveal" style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT THE ARTISAN */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="reveal relative">
            <div className="overflow-hidden rounded-[2rem] border border-[var(--brown)]/20 shadow-[var(--shadow-card)]">
              <img src={founder} alt="Okekeni Alice Ede, founder of Kenliciaastetics" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -right-4 -top-4 hidden h-24 w-24 rounded-full border-2 border-[var(--brown)] bg-background md:flex md:flex-col md:items-center md:justify-center">
              <span className="font-serif text-2xl text-primary">Est.</span>
              <span className="text-xs text-[var(--brown)]">2026</span>
            </div>
          </div>
          <div className="reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brown)]">Meet the Artisan</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
              Okekeni Alice Ede
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              The visionary behind Kenliciaastetics. Every piece is meticulously handmade with patience and intention —
              bringing <em className="not-italic text-primary">"Elegance in Everyworld"</em> directly to you.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              From the slow rhythm of a crochet hook to the careful threading of each bead, our atelier
              is a quiet celebration of craft, devotion, and timeless beauty.
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
