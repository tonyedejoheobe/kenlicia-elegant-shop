import { X, Minus, Plus, Trash2 } from "lucide-react";
import { cartStore, useCart } from "@/lib/cart-store";
import { useEffect } from "react";

export function CartDrawer() {
  const { items, drawerOpen } = useCart();
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <div
        onClick={() => cartStore.closeDrawer()}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ease-out ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h3 className="font-serif text-xl">Your Cart</h3>
          <button
            onClick={() => cartStore.closeDrawer()}
            aria-label="Close"
            className="rounded-full p-2 hover:bg-accent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-serif text-lg text-muted-foreground">Your cart is empty</p>
              <p className="mt-2 text-sm text-muted-foreground">Discover our handcrafted pieces.</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((i) => (
                <li key={i.id} className="flex gap-4 py-4">
                  <img src={i.image} alt={i.title} className="h-24 w-24 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <p className="font-medium leading-snug">{i.title}</p>
                      <button
                        onClick={() => cartStore.remove(i.id)}
                        aria-label="Remove"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-[var(--gold)]">${i.price}</p>
                    <div className="mt-auto flex items-center gap-2">
                      <button
                        onClick={() => cartStore.setQty(i.id, i.qty - 1)}
                        className="rounded-full border border-border p-1 hover:border-primary hover:text-primary"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm">{i.qty}</span>
                      <button
                        onClick={() => cartStore.setQty(i.id, i.qty + 1)}
                        className="rounded-full border border-border p-1 hover:border-primary hover:text-primary"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-serif text-xl">${subtotal.toFixed(2)}</span>
            </div>
            <button className="mt-4 w-full rounded-full bg-primary py-3.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:opacity-90">
              Checkout
            </button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Shipping & taxes calculated at checkout.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
