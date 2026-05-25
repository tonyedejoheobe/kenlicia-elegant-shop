import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Menu, X, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { cartStore, useCart } from "@/lib/cart-store";
import { SearchOverlay } from "./SearchOverlay";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/hooks/use-auth";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { items } = useCart();
  const { user, isAdmin } = useAuth();
  const count = items.reduce((s, i) => s + i.qty, 0);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    <header className={`sticky top-0 z-40 w-full bg-background/95 backdrop-blur-xl transition-shadow duration-300 ${scrolled ? "shadow-[0_4px_20px_-10px_rgba(0,0,0,0.18)] border-b border-border" : "border-b border-transparent"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Kenliciaastetics" className="h-14 w-auto" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="rounded-full p-2.5 text-foreground/80 transition hover:bg-accent hover:text-primary"
          >
            <Search className="h-5 w-5" />
          </button>
          <ThemeToggle />
          {isAdmin && (
            <Link
              to="/admin"
              aria-label="Admin"
              className="rounded-full p-2.5 text-foreground/80 transition hover:bg-accent hover:text-primary"
            >
              <LayoutDashboard className="h-5 w-5" />
            </Link>
          )}
          <Link to={user ? "/admin" : "/auth"} aria-label="Account" className="hidden rounded-full p-2.5 text-foreground/80 transition hover:bg-accent hover:text-primary sm:inline-flex">
            <User className="h-5 w-5" />
          </Link>
          <button
            aria-label="Cart"
            onClick={() => cartStore.openDrawer()}
            className="relative rounded-full p-2.5 text-foreground/80 transition hover:bg-accent hover:text-primary"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="ml-1 rounded-full p-2.5 text-foreground/80 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-foreground/80 hover:text-primary"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
    </>
  );
}
