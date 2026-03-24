import type { ShopFilters } from "@/components/shop/ShopSidebar";
import ShopClient from "@/components/shop/ShopClient";

interface PageProps {
  searchParams: Promise<{
    category?: string;
    q?: string;
  }>;
}

export default async function ShopPage({ searchParams }: PageProps) {
  const { category, q } = await searchParams;

  const initialFilters: ShopFilters = {
    categories: category ? [category] : [],
    flavors: [],
    priceMin: 0,
    priceMax: 79.99,
    minRating: 0,
  };

  return <ShopClient initialFilters={initialFilters} initialQuery={q} />;
}
