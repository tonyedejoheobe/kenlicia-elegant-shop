import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Layout } from "@/components/site/Layout";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  type DbProduct,
} from "@/lib/products-db";
import { categories, products as staticProducts } from "@/data/products";
import { Pencil, Trash2, Plus, LogOut, ImagePlus } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Kenliciaastetics" }] }),
  component: AdminPage,
});

type FormState = {
  title: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
  in_stock: boolean;
};

const emptyForm: FormState = {
  title: "",
  description: "",
  price: "",
  category: categories[0],
  image_url: "",
  in_stock: true,
};

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  const { data: products, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: fetchProducts,
    enabled: !!user && isAdmin,
  });

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
  }

  function startEdit(p: DbProduct) {
    setEditingId(p.id);
    setForm({
      title: p.title,
      description: p.description ?? "",
      price: String(p.price),
      category: p.category,
      image_url: p.image_url ?? "",
      in_stock: p.in_stock,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB");
      return;
    }

    setUploading(true);
    setError(null);
    try {
      const url = await uploadProductImage(file);
      setForm((f) => ({ ...f, image_url: url }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      setError("Price must be greater than 0");
      return;
    }
    if (!form.image_url) {
      setError("Please upload a product image");
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        price: Number(form.price),
        category: form.category,
        image_url: form.image_url || null,
        in_stock: form.in_stock,
      };
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }
      resetForm();
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      qc.invalidateQueries({ queryKey: ["shop-products"] });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Save failed";
      setError(message);
      console.error("Save error:", err);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    try {
      await deleteProduct(id);
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      qc.invalidateQueries({ queryKey: ["shop-products"] });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Delete failed";
      alert(message);
      console.error("Delete error:", err);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  async function importDefaults() {
    if (!confirm("Import the default product catalog into the database? Existing items with the same title will be skipped.")) return;
    setImporting(true);
    setError(null);
    try {
      const existing = (products ?? []).map((p) => p.title.toLowerCase());
      const toInsert = staticProducts.filter((p) => !existing.includes(p.title.toLowerCase()));
      for (const p of toInsert) {
        await createProduct({
          title: p.title,
          description: null,
          price: p.price,
          image_url: p.image, // bundled asset URL resolved by Vite
          category: p.category,
          in_stock: true,
        });
      }
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      qc.invalidateQueries({ queryKey: ["shop-products"] });
      alert(`Imported ${toInsert.length} product(s).`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Import failed";
      setError(message);
      console.error("Import error:", err);
    } finally {
      setImporting(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
          Loading…
        </div>
      </Layout>
    );
  }

  if (user && !isAdmin) {
    return (
      <Layout>
        <section className="mx-auto max-w-md px-4 py-24 text-center">
          <h1 className="font-serif text-3xl">Not authorized</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Your account ({user.email}) doesn't have admin access. Ask the owner to grant your
            account the admin role from the backend.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={signOut}
              className="rounded-full border border-border px-5 py-2 text-xs font-semibold uppercase tracking-widest hover:border-primary"
            >
              Sign out
            </button>
            <Link
              to="/"
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
            >
              ← Back to store
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
              Admin
            </p>
            <h1 className="mt-2 font-serif text-4xl">Manage Products</h1>
            <p className="mt-1 text-sm text-muted-foreground">Signed in as {user?.email}</p>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest hover:border-primary"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={submit}
          className="mt-10 grid gap-4 rounded-2xl border border-border bg-card p-6 md:grid-cols-2"
        >
          <h2 className="md:col-span-2 font-serif text-2xl">
            {editingId ? "Edit product" : "Add new product"}
          </h2>

          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
              Title
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
              Price (USD)
            </label>
            <input
              required
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              id="instock"
              type="checkbox"
              checked={form.in_stock}
              onChange={(e) => setForm({ ...form, in_stock: e.target.checked })}
              className="h-4 w-4"
            />
            <label htmlFor="instock" className="text-sm">
              In stock
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
              Product image
            </label>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              {form.image_url ? (
                <img src={form.image_url} alt="" className="h-24 w-24 rounded-lg object-cover" />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground">
                  <ImagePlus className="h-6 w-6" />
                </div>
              )}
              <label className="cursor-pointer rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest hover:border-primary">
                {uploading ? "Uploading…" : "Upload image"}
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
              </label>
              <input
                type="url"
                placeholder="or paste image URL"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className="min-w-[220px] flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          {error && <p className="md:col-span-2 text-sm text-destructive">{error}</p>}

          <div className="md:col-span-2 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={busy || uploading}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              {busy ? "Saving…" : editingId ? "Update product" : "Add product"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-border px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:border-primary"
              >
                Cancel edit
              </button>
            )}
          </div>
        </form>

        {/* List */}
        <div className="mt-12">
          <h2 className="font-serif text-2xl">All products</h2>
          {isLoading ? (
            <p className="mt-6 text-muted-foreground">Loading products…</p>
          ) : !products || products.length === 0 ? (
            <p className="mt-6 text-muted-foreground">No products yet. Add your first one above.</p>
          ) : (
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left text-xs uppercase tracking-widest text-foreground/70">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4 hidden sm:table-cell">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 hidden md:table-cell">Stock</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t border-border">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {p.image_url ? (
                            <img
                              src={p.image_url}
                              alt=""
                              className="h-12 w-12 rounded-md object-cover"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-md bg-muted" />
                          )}
                          <span className="font-medium">{p.title}</span>
                        </div>
                      </td>
                      <td className="p-4 hidden sm:table-cell text-muted-foreground">
                        {p.category}
                      </td>
                      <td className="p-4 text-[var(--gold)]">${Number(p.price).toFixed(2)}</td>
                      <td className="p-4 hidden md:table-cell">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${p.in_stock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {p.in_stock ? "In stock" : "Sold out"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => startEdit(p)}
                            className="rounded-full p-2 hover:bg-accent"
                            aria-label="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => remove(p.id)}
                            className="rounded-full p-2 text-destructive hover:bg-destructive/10"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
