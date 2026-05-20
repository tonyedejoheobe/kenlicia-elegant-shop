import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";

export type Product = { id: string; title: string; price: number; image: string; category: string };

export const products: Product[] = [
  { id: "p1", title: "Handwoven Crochet Tote", price: 89, image: p1, category: "Crochet" },
  { id: "p2", title: "Pearl Beaded Necklace", price: 64, image: p2, category: "Beadwork" },
  { id: "p3", title: "Blush Crochet Blouse", price: 120, image: p3, category: "Crochet" },
  { id: "p4", title: "Gilded Pearl Bracelet", price: 48, image: p4, category: "Beadwork" },
];
