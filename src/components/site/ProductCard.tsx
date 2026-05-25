import { cartStore } from "@/lib/cart-store";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[var(--gold)] backdrop-blur">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg leading-snug">{product.title}</h3>
        <p className="mt-1 text-base text-[var(--gold)]">${product.price}</p>
        <button
          onClick={() =>
            cartStore.add({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
            })
          }
          className="mt-4 w-full rounded-full bg-primary py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground opacity-90 transition hover:opacity-100 group-hover:opacity-100 md:opacity-0"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
