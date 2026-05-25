import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--brown)] text-[var(--brown-foreground)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <h3 className="font-serif text-2xl text-[var(--gold)]">Kenliciaastetics</h3>
          <p className="mt-3 text-sm italic opacity-80">Elegance in Everyworld</p>
          <p className="mt-4 text-sm leading-relaxed opacity-70">
            Crochet, facial care, oil perfumes & beauty — handcrafted with love by Okekeni Alice
            Ede.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-base text-[var(--gold)]">Store Policies</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>
              <a href="#" className="hover:text-[var(--gold)]">
                Shipping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--gold)]">
                Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--gold)]">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--gold)]">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base text-[var(--gold)]">Follow</h4>
          <div className="mt-4 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="rounded-full border border-white/20 p-2.5 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-full border border-white/20 p-2.5 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Pinterest"
              className="rounded-full border border-white/20 p-2.5 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0a12 12 0 0 0-4.4 23.16c-.1-.94-.2-2.4.04-3.43.22-.93 1.4-5.94 1.4-5.94s-.36-.72-.36-1.78c0-1.67.97-2.92 2.18-2.92 1.03 0 1.52.77 1.52 1.7 0 1.03-.66 2.58-1 4.01-.28 1.2.6 2.18 1.78 2.18 2.14 0 3.78-2.26 3.78-5.51 0-2.88-2.07-4.9-5.03-4.9-3.43 0-5.44 2.57-5.44 5.23 0 1.03.4 2.14.9 2.75.1.12.11.22.08.34l-.33 1.36c-.05.22-.17.27-.4.16-1.5-.7-2.43-2.88-2.43-4.64 0-3.78 2.75-7.25 7.92-7.25 4.16 0 7.39 2.96 7.39 6.92 0 4.13-2.6 7.46-6.22 7.46-1.22 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.34-1.49 3.13A12 12 0 1 0 12 0z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-base text-[var(--gold)]">Newsletter</h4>
          <p className="mt-4 text-sm opacity-80">Receive new arrivals & artisan stories.</p>
          <form className="mt-4 flex" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="w-full rounded-l-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm placeholder:text-white/40 focus:border-[var(--gold)] focus:outline-none"
            />
            <button className="rounded-r-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-center text-xs opacity-70 sm:px-6 lg:px-8">
          © 2026 Kenliciaastetics. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
