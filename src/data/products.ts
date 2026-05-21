import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import scrunchie from "@/assets/product-scrunchie.jpg";
import clawclip from "@/assets/product-clawclip.jpg";
import lipgloss from "@/assets/product-lipgloss.jpg";
import facemask from "@/assets/product-facemask.jpg";
import lipstick from "@/assets/product-lipstick.jpg";
import perfume from "@/assets/product-perfume.jpg";
import nails from "@/assets/product-nails.jpg";
import lashes from "@/assets/product-lashes.jpg";

export type Category =
  | "Crochet & Accessories"
  | "Facial Care"
  | "Scents"
  | "Beauty";

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: Category;
};

export const categories: Category[] = [
  "Crochet & Accessories",
  "Facial Care",
  "Scents",
  "Beauty",
];

export const products: Product[] = [
  // Crochet & Accessories
  { id: "cr1", title: "Handwoven Crochet Tote", price: 89, image: p1, category: "Crochet & Accessories" },
  { id: "cr2", title: "Blush Crochet Blouse", price: 120, image: p3, category: "Crochet & Accessories" },
  { id: "cr3", title: "Crochet Scrunchie Set", price: 18, image: scrunchie, category: "Crochet & Accessories" },
  { id: "cr4", title: "Tortoise Claw Clip", price: 14, image: clawclip, category: "Crochet & Accessories" },
  { id: "cr5", title: "Pearl Beaded Necklace", price: 64, image: p2, category: "Crochet & Accessories" },
  { id: "cr6", title: "Gilded Pearl Bracelet", price: 48, image: p4, category: "Crochet & Accessories" },

  // Facial Care — Kenlicias' Facial care
  { id: "fc1", title: "Hydrating Rose Face Mask", price: 22, image: facemask, category: "Facial Care" },
  { id: "fc2", title: "Signature Lip Gloss Combo", price: 24, image: lipgloss, category: "Facial Care" },
  { id: "fc3", title: "Velvet Lipstick Trio", price: 32, image: lipstick, category: "Facial Care" },
  { id: "fc4", title: "Sugar Lip Scrub", price: 16, image: facemask, category: "Facial Care" },
  { id: "fc5", title: "Soothing Eye Mask", price: 18, image: facemask, category: "Facial Care" },
  { id: "fc6", title: "Nourishing Lip Mask", price: 15, image: lipgloss, category: "Facial Care" },

  // Scents — Kenlicias' scents
  { id: "sc1", title: "Amber Oil Perfume", price: 38, image: perfume, category: "Scents" },
  { id: "sc2", title: "Rose Musk Oil — x Idaras", price: 42, image: perfume, category: "Scents" },
  { id: "sc3", title: "Vanilla Bloom Oil", price: 36, image: perfume, category: "Scents" },

  // Beauty — Kenlicias' Beauty
  { id: "bt1", title: "Kenlicias Press-on Nails", price: 28, image: nails, category: "Beauty" },
  { id: "bt2", title: "Kenlicias Mink Lashes", price: 22, image: lashes, category: "Beauty" },
  { id: "bt3", title: "Kenlicias Brow Kit", price: 26, image: lashes, category: "Beauty" },
  { id: "bt4", title: "Kenlicias Braids — Booking", price: 90, image: nails, category: "Beauty" },
];
