import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Supplements — FitFuel",
  description:
    "Browse FitFuel's full catalog of premium supplements. Filter by category, flavor, and price to find your perfect pre-workout, protein, amino acids, or vitamins.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
