import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, MapPin, CreditCard, User as UserIcon } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Kenliciaastetics" },
      { name: "description", content: "Manage your shipping address and saved payment method." },
    ],
  }),
  component: AccountPage,
});

type Profile = {
  full_name: string | null;
  phone: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  card_brand: string | null;
  card_last4: string | null;
  card_exp: string | null;
};

const empty: Profile = {
  full_name: "", phone: "", address_line1: "", address_line2: "",
  city: "", state: "", postal_code: "", country: "",
  card_brand: "", card_last4: "", card_exp: "",
};

function AccountPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/auth" });
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) setProfile({ ...empty, ...data });
      setLoading(false);
    })();
  }, [user]);

  function update<K extends keyof Profile>(k: K, v: Profile[K]) {
    setProfile((p) => ({ ...p, [k]: v }));
  }

  function detectBrand(num: string): string {
    const n = num.replace(/\s/g, "");
    if (/^4/.test(n)) return "Visa";
    if (/^5[1-5]/.test(n)) return "Mastercard";
    if (/^3[47]/.test(n)) return "Amex";
    if (/^6/.test(n)) return "Discover";
    return "Card";
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMsg(null);

    const next = { ...profile };
    if (cardNumber.trim()) {
      const digits = cardNumber.replace(/\D/g, "");
      next.card_brand = detectBrand(cardNumber);
      next.card_last4 = digits.slice(-4);
    }

    const { error } = await supabase
      .from("profiles")
      .upsert({ user_id: user.id, ...next }, { onConflict: "user_id" });

    setSaving(false);
    if (error) {
      setMsg("Failed to save: " + error.message);
    } else {
      setMsg("Saved successfully");
      setCardNumber("");
      setProfile(next);
      setTimeout(() => setMsg(null), 3000);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="mx-auto max-w-4xl px-4 py-24 text-center text-muted-foreground">Loading…</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-4xl">My Account</h1>
            <p className="mt-1 text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground/80 hover:bg-accent"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>

        <form onSubmit={save} className="mt-10 space-y-10">
          {/* Personal */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 font-serif text-2xl text-card-foreground">
              <UserIcon className="h-5 w-5" /> Personal
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" value={profile.full_name ?? ""} onChange={(v) => update("full_name", v)} />
              <Field label="Phone" value={profile.phone ?? ""} onChange={(v) => update("phone", v)} />
            </div>
          </section>

          {/* Address */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 font-serif text-2xl text-card-foreground">
              <MapPin className="h-5 w-5" /> Shipping address
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field className="sm:col-span-2" label="Address line 1" value={profile.address_line1 ?? ""} onChange={(v) => update("address_line1", v)} />
              <Field className="sm:col-span-2" label="Address line 2" value={profile.address_line2 ?? ""} onChange={(v) => update("address_line2", v)} />
              <Field label="City" value={profile.city ?? ""} onChange={(v) => update("city", v)} />
              <Field label="State / Region" value={profile.state ?? ""} onChange={(v) => update("state", v)} />
              <Field label="Postal code" value={profile.postal_code ?? ""} onChange={(v) => update("postal_code", v)} />
              <Field label="Country" value={profile.country ?? ""} onChange={(v) => update("country", v)} />
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 font-serif text-2xl text-card-foreground">
              <CreditCard className="h-5 w-5" /> Payment method
            </h2>
            {profile.card_last4 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                Saved: <span className="font-medium text-foreground">{profile.card_brand} •••• {profile.card_last4}</span>
                {profile.card_exp ? <> · expires {profile.card_exp}</> : null}
              </p>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">No payment method saved yet.</p>
            )}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                className="sm:col-span-2"
                label="Card number (we only store brand and last 4)"
                value={cardNumber}
                onChange={setCardNumber}
                placeholder="•••• •••• •••• ••••"
                inputMode="numeric"
              />
              <Field label="Expiry (MM/YY)" value={profile.card_exp ?? ""} onChange={(v) => update("card_exp", v)} placeholder="08/28" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              For your security, full card numbers are never stored. Real charges should go through a payment processor.
            </p>
          </section>

          {msg && <p className="text-sm text-primary">{msg}</p>}

          <div className="flex items-center justify-between">
            <Link to="/shop" className="text-sm text-foreground/70 underline-offset-4 hover:underline">
              ← Continue shopping
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-primary px-8 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
}

function Field({
  label, value, onChange, className = "", placeholder, inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
  inputMode?: "numeric" | "text";
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-widest text-foreground/70">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
      />
    </label>
  );
}
