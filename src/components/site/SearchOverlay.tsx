import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/data/products";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    } else {
      setQ("");
    }
  }, [open, onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return products
      .filter(
        (p) => p.title.toLowerCase().includes(term) || p.category.toLowerCase().includes(term),
      )
      .slice(0, 6);
  }, [q]);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        className={`fixed left-0 right-0 top-0 z-50 origin-top bg-background shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] transition-all duration-400 ${
          open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <Search className="h-5 w-5 text-[var(--brown)]" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search crochet, lip gloss, oil perfume…"
              className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={onClose}
              aria-label="Close search"
              className="rounded-full p-2 text-foreground/70 transition hover:bg-accent hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {q && (
            <div className="mt-4">
              {results.length === 0 ? (
                <p className="py-6 text-sm text-muted-foreground">
                  No matches for <em className="text-foreground">"{q}"</em>.
                </p>
              ) : (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        to="/shop"
                        onClick={onClose}
                        className="flex items-center gap-4 rounded-xl border border-transparent p-2 transition hover:border-border hover:bg-accent"
                      >
                        <img
                          src={p.image}
                          alt={p.title}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-foreground">{p.title}</p>
                          <p className="text-xs uppercase tracking-widest text-[var(--brown)]">
                            {p.category}
                          </p>
                        </div>
                        <span className="font-serif text-primary">${p.price}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
