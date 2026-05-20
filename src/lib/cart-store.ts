import { useSyncExternalStore } from "react";

export type CartItem = { id: string; title: string; price: number; image: string; qty: number };

let items: CartItem[] = [];
let drawerOpen = false;
let snapshot = { items, drawerOpen };
const serverSnapshot = { items: [] as CartItem[], drawerOpen: false };
const listeners = new Set<() => void>();
const emit = () => {
  snapshot = { items, drawerOpen };
  listeners.forEach((l) => l());
};

export const cartStore = {
  subscribe(l: () => void) { listeners.add(l); return () => listeners.delete(l); },
  getSnapshot() { return snapshot; },
  getServerSnapshot() { return serverSnapshot; },
  add(item: Omit<CartItem, "qty">) {
    const existing = items.find((i) => i.id === item.id);
    items = existing
      ? items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
      : [...items, { ...item, qty: 1 }];
    drawerOpen = true;
    emit();
  },
  remove(id: string) { items = items.filter((i) => i.id !== id); emit(); },
  setQty(id: string, qty: number) {
    items = qty <= 0 ? items.filter((i) => i.id !== id) : items.map((i) => (i.id === id ? { ...i, qty } : i));
    emit();
  },
  openDrawer() { drawerOpen = true; emit(); },
  closeDrawer() { drawerOpen = false; emit(); },
};

export function useCart() {
  return useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
}
