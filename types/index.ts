export type ProductCategory = "Pre-Workout" | "Protein" | "Amino Acids" | "Vitamins";
export type ProductBadge = "BEST SELLER" | "NEW" | "MAS VENDIDO" | null;

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  rating: number;
  reviewCount: number;
  badge: ProductBadge;
  flavors: string[]; // hex color codes
  sizes: string[];
  description: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFlavor?: string;
  selectedSize?: string;
}
