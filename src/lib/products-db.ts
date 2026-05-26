import { supabase } from "@/integrations/supabase/client";

export type DbProduct = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
};

export async function fetchProducts(): Promise<DbProduct[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as DbProduct[];
  } catch (error) {
    console.warn("Supabase fetch failed, falling back to static products:", error);
    return [];
  }
}

export async function createProduct(input: Omit<DbProduct, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("products").insert(input).select().single();
  if (error) throw error;
  return data as DbProduct;
}

export async function updateProduct(
  id: string,
  input: Partial<Omit<DbProduct, "id" | "created_at" | "updated_at">>,
) {
  const { data, error } = await supabase
    .from("products")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as DbProduct;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("product-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}
