import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { products, categories, type Category } from "@/data/products";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ArrowRight, Sparkles, HandHeart, Gem, Truck } from "lucide-react";
import hero from "@/assets/hero.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import catFacial from "@/assets/cat-facial.jpg";
import catScents from "@/assets/cat-scents.jpg";
import catBeauty from "@/assets/cat-beauty.jpg";
import founder from "@/assets/founder.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kenliciaastetics — Elegance in Everyworld" },
      {
        name: "description",
        content:
          "Premium handmade crochet, facial care, oil perfumes & beauty essentials by Okekeni Alice Ede.",
      },
      { property: "og:title", content: "Kenliciaastetics — Elegance in Everyworld" },
      {
        property: "og:description",
        content: "Crochet, facial care, scents and beauty — handcrafted with love.",
      },
    ],
  }),
  component: Home,
});

const categoryCards: { title: Category; image: string; desc: string; tag: string }[] = [
  {
    title: "Crochet & Accessories",
    image: catAccessories,
    desc: "Scrunchies, claw clips, totes & beadwork — woven by hand.",
    tag: "Handwoven",
  },
  {
    title: "Facial Care",
    image: catFacial,
    desc: "Face masks, lip gloss, scrubs & balms for soft, radiant skin.",
    tag: "Glow",
  },
  {
    title: "Scents",
    image: catScents,
    desc: "Signature oil perfumes — Amber, Rose Musk & Vanilla Bloom.",
    tag: "Aromatic",
  },
  {
    title: "Beauty",
    image: catBeauty,
    desc: "Press-on nails, mink lashes, brow kits & braid bookings.",
    tag: "Flawless",
  },
];

const perks = [
  { icon: HandHeart, title: "Handmade with Love", desc: "Each piece crafted personally by Alice." },
  { icon: Gem, title: "Premium Quality", desc: "Only the finest materials — never mass-made." },
  { icon: Sparkles, title: "Bespoke & Custom", desc: "Tailored orders to match your vibe." },
  { icon: Truck, title: "Careful Delivery", desc: "Beautifully packaged, shipped with care." },
];

const tickerWords = [
  "Crochet",
  "Facial Care",
  "Oil Perfumes",
  "Mink Lashes",
  "Press-on Nails",
  "Lip Combos",
  "Beadwork",
  "Custom Braids",
];

function Home() {
  useScrollReveal();
  const heroImgRef = useRef<HTMLImageElement>(null);
  const [activeCat, setActiveCat] = useState<Category>("Crochet & Accessories");

  useEffect(() => {
    const onScroll = () => {
      const el = heroImgRef.current;
      if (!el) return;
      const y = window.scrollY;
      el.style.transform = `translate3d(0, ${y * 0.2}px, 0) scale(1.1)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeProducts = products.filter((p) => p.category === activeCat).slice(0, 4);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[600px] w-full overflow-hidden">
        <img
          ref={heroImgRef}
          src={hero}
          alt="Kenliciaastetics handcrafted collection"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

        {/* floating decorative orbs */}
        <div className="pointer-events-none absolute -left-10 top-1/3 h-40 w-40 rounded-full bg-primary/30 blur-3xl [animation:var(--animate-float)]" />
        <div className="pointer-events-none absolute right-10 top-1/4 h-56 w-56 rounded-full bg-[var(--brown)]/40 blur-3xl [animation:var(--animate-float)] [animation-delay:-3s]" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-center px-4 sm:px-6 lg:px-8">
          <span className="reveal inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-white backdrop-blur">
            <Sparkles className="h-3 w-3" /> Elegance in Everyworld
          </span>
          <h1 className="reveal mt-6 max-w-3xl font-serif text-5xl leading-[1.04] text-white sm:text-6xl lg:text-7xl">
            Where every detail{" "}
            <em className="not-italic">
              <span className="bg-gradient-to-r from-[oklch(0.85_0.16_358)] via-[oklch(0.75_0.2_358)] to-[oklch(0.65_0.18_30)] bg-clip-text text-transparent">
                whispers luxury
              </span>
            </em>
            <br />
            and feels like you.
          </h1>
          <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Crochet, facial care, signature oil perfumes & beauty essentials — lovingly handmade by
            Okekeni Alice Ede.
          </p>
          <div className="reveal mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-soft)] transition hover:scale-[1.04] hover:opacity-95"
            >
              Shop the Collection
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-white underline-offset-4 hover:underline"
            >
              Meet the Artisan →
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/50">
            <span className="mt-2 h-2 w-0.5 animate-bounce rounded-full bg-white/80" />
          </div>
        </div>
      </section>

      {/* MARQUEE TICKER */}
      <div className="overflow-hidden border-y border-border bg-[var(--brown)] py-4 text-[var(--brown-foreground)]">
        <div className="flex w-max gap-12 [animation:var(--animate-marquee)] whitespace-nowrap">
          {[...tickerWords, ...tickerWords].map((w, i) => (
            <span
              key={i}
              className="flex items-center gap-12 font-serif text-2xl italic tracking-wide"
            >
              {w}
              <Sparkles className="h-4 w-4 opacity-70" />
            </span>
          ))}
        </div>
      </div>

      {/* PERKS */}
      <section className="border-b border-border py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {perks.map((p, i) => (
            <div
              key={p.title}
              className="reveal flex items-start gap-4"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--blush)] text-primary">
                <p.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES — 4 signature lines */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brown)]">
              Our Universe
            </p>
            <h2 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">
              Four signature lines
            </h2>
            <p className="mt-4 text-muted-foreground">
              From handwoven crochet to soft glow facials, scents and beauty — everything we make
              under one roof.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categoryCards.map((c, i) => (
              <Link
                key={c.title}
                to="/shop"
                className="reveal group relative block aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-muted"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/85" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <span className="inline-block w-fit rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest backdrop-blur">
                    {c.tag}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl leading-tight">{c.title}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm text-white/85 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                    {c.desc}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em]">
                    Shop now <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE COLLECTION SWITCHER */}
      <section className="border-y border-border bg-[var(--blush)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brown)]">
                Curated for you
              </p>
              <h2 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">Shop by mood</h2>
            </div>
            <Link to="/shop" className="text-sm font-medium text-primary hover:underline">
              View all →
            </Link>
          </div>

          <div className="reveal mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                  activeCat === c
                    ? "border-primary bg-primary text-primary-foreground scale-105"
                    : "border-border bg-background text-foreground/70 hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div key={activeCat} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activeProducts.map((p, i) => (
              <div
                key={p.id}
                className="opacity-0 [animation:var(--animate-fade-up)]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNATURE SCENT BANNER */}
      <section className="relative overflow-hidden bg-[var(--brown)] py-24 text-[var(--brown-foreground)]">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/30 blur-3xl [animation:var(--animate-float)]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[var(--blush)]/20 blur-3xl [animation:var(--animate-float)] [animation-delay:-2s]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] opacity-80">
              Kenlicias' Scents
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              An oil perfume
              <br />
              <em className="not-italic text-[oklch(0.88_0.06_30)]">that lingers softly.</em>
            </h2>
            <p className="mt-6 max-w-lg text-base opacity-85">
              Amber Oil. Rose Musk × Idaras. Vanilla Bloom. Long-lasting, alcohol-free, hand-blended
              in small batches.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-foreground transition hover:scale-105"
            >
              Explore Scents <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="reveal relative h-80 md:h-[28rem]">
            <div className="absolute inset-0 rounded-[2rem] border border-white/20 [animation:var(--animate-spin-slow)]" />
            <div className="absolute inset-4 overflow-hidden rounded-[1.75rem]">
              <img src={catScents} alt="Kenlicias' Scents" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT THE ARTISAN */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="reveal relative">
            <div className="overflow-hidden rounded-[2rem] border border-[var(--brown)]/20 shadow-[var(--shadow-card)]">
              <img
                src={founder}
                alt="Okekeni Alice Ede"
                loading="lazy"
                className="h-full w-full object-cover transition duration-[1200ms] hover:scale-105"
              />
            </div>
            <div className="absolute -right-4 -top-4 hidden h-24 w-24 rounded-full border-2 border-[var(--brown)] bg-background md:flex md:flex-col md:items-center md:justify-center [animation:var(--animate-float)]">
              <span className="font-serif text-2xl text-primary">Est.</span>
              <span className="text-xs text-[var(--brown)]">2026</span>
            </div>
          </div>
          <div className="reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brown)]">
              Meet the Artisan
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
              Okekeni Alice Ede
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              The visionary behind Kenliciaastetics — a one-woman atelier where crochet, facial
              care, oil perfumes and beauty come together under one philosophy:{" "}
              <em className="not-italic text-primary">"Elegance in Everyworld."</em>
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              From hand-woven scrunchies to silky lip combos and signature scents, every piece
              leaves the studio with patience, intention, and a little bit of love.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
              <div>
                <p className="font-serif text-3xl text-primary">4+</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Product Lines
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl text-primary">100%</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Handmade</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-primary">∞</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Custom Orders
                </p>
              </div>
            </div>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground px-7 py-3.5 text-xs font-semibold uppercase tracking-widest transition hover:bg-foreground hover:text-background"
            >
              Our Story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-border bg-[var(--blush)]/40 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brown)]">
              Kind Words
            </p>
            <h2 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">
              Loved by her girls
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "My scrunchies are SO soft and the lip gloss is everything. Alice's energy is in every piece.",
                name: "Ada O.",
              },
              {
                quote:
                  "The Amber oil perfume is my new signature. People literally stop me to ask what I'm wearing.",
                name: "Chiamaka E.",
              },
              {
                quote:
                  "Got the press-on nails AND the brow kit — flawless. Kenliciaastetics never misses.",
                name: "Tomi A.",
              },
            ].map((t, i) => (
              <figure
                key={t.name}
                className="reveal rounded-2xl border border-border bg-background p-7 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Sparkles className="h-5 w-5 text-primary" />
                <blockquote className="mt-4 font-serif text-lg leading-relaxed text-foreground">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-5 text-xs font-semibold uppercase tracking-widest text-[var(--brown)]">
                  — {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
