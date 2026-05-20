import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Mail, MapPin, Instagram } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Kenliciaastetics" },
      { name: "description", content: "Get in touch with Kenliciaastetics for custom orders and inquiries." },
      { property: "og:title", content: "Contact — Kenliciaastetics" },
      { property: "og:description", content: "Reach out for custom orders." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">Say Hello</p>
          <h1 className="mt-3 font-serif text-5xl sm:text-6xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Have a custom request or a question? We'd love to hear from you.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); }}>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest">Name</label>
              <input required className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest">Email</label>
              <input type="email" required className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest">Message</label>
              <textarea rows={5} required className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 focus:border-primary focus:outline-none" />
            </div>
            <button className="w-full rounded-full bg-primary py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition hover:opacity-90">
              Send Message
            </button>
          </form>

          <div className="space-y-6 rounded-3xl bg-[var(--blush)]/30 p-8">
            <h3 className="font-serif text-2xl">Reach Out</h3>
            <div className="flex gap-4">
              <Mail className="h-5 w-5 shrink-0 text-[var(--gold)]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Email</p>
                <p>hello@kenliciaastetics.com</p>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="h-5 w-5 shrink-0 text-[var(--gold)]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Atelier</p>
                <p>By appointment only</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Instagram className="h-5 w-5 shrink-0 text-[var(--gold)]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Instagram</p>
                <p>@kenliciaastetics</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
