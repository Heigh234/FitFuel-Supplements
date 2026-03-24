"use client";

import { useState, useMemo, useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { PRODUCTS } from "@/lib/constants";
import ProductCard from "@/components/ui/ProductCard";
import ShopSidebar, { type ShopFilters } from "@/components/shop/ShopSidebar";
import ShopTopBar, { type SortOption } from "@/components/shop/ShopTopBar";
import ShopPagination from "@/components/shop/ShopPagination";

const PRODUCTS_PER_PAGE = 10;

// Flavor-to-product heuristic: map keyword to category/name patterns
const FLAVOR_MAP: Record<string, string[]> = {
  Chocolate:    ["Whey Gold Protein", "Iron Mass Gainer"],
  "Lemon Lime": ["Ultra BCAA", "Iso Clear Protein"],
  "Fruit Punch": ["Titan Pre-Workout", "Beast Mode Pre"],
};

interface ShopClientProps {
  initialFilters: ShopFilters;
  /** Text query from the search bar "View all results" link (/shop?q=...) */
  initialQuery?: string;
}

export default function ShopClient({
  initialFilters,
  initialQuery,
}: ShopClientProps) {
  const [filters, setFilters] = useState<ShopFilters>(initialFilters);
  const [sort, setSort] = useState<SortOption>("popular");
  const [page, setPage] = useState(1);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Lock body scroll when mobile filter drawer is open
  useEffect(() => {
    if (filterDrawerOpen) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [filterDrawerOpen]);

  const filtered = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      // Text search from ?q= param
      if (initialQuery) {
        const q = initialQuery.toLowerCase();
        const matchesText =
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!matchesText) return false;
      }

      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(p.category)
      ) {
        return false;
      }

      // Price filter
      if (p.price < filters.priceMin || p.price > filters.priceMax) {
        return false;
      }

      // Flavor filter (heuristic based on product names)
      if (filters.flavors.length > 0) {
        const matchesFlavor = filters.flavors.some((flavor) =>
          FLAVOR_MAP[flavor]?.some((name) =>
            p.name.toLowerCase().includes(name.toLowerCase().split(" ")[0])
          )
        );
        if (!matchesFlavor) return false;
      }

      // Minimum rating filter
      if (filters.minRating > 0 && p.rating < filters.minRating) {
        return false;
      }

      return true;
    });

    // Sort
    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = [...result].sort((a, b) => b.id - a.id);
        break;
      case "popular":
      default:
        result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [filters, sort, initialQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));

  const paginated = useMemo(() => {
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    return filtered.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filtered, page]);

  function handleFilterChange(next: ShopFilters) {
    setFilters(next);
    setPage(1);
  }

  function handleSortChange(next: SortOption) {
    setSort(next);
    setPage(1);
  }

  function handleClearFilters() {
    setFilters({
      categories: [],
      flavors: [],
      priceMin: 0,
      priceMax: 79.99,
      minRating: 0,
    });
    setPage(1);
  }

  const activeFilterCount =
    filters.categories.length +
    filters.flavors.length +
    (filters.priceMin > 0 || filters.priceMax < 79.99 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Shop hero banner */}
      <div className="relative overflow-hidden h-[300px] md:h-[400px] w-full">
        <video
          src="https://res.cloudinary.com/dsejihoyr/video/upload/v1773648441/video-collection-page-optimizado_sbsw0o.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="font-display text-brand-white text-6xl md:text-7xl tracking-widest uppercase">
            SHOP ALL
          </h1>
          <p className="font-sans text-gray-300 text-lg mt-2">
            Encuentra tu suplemento ideal
          </p>
        </div>
      </div>

      {/* Mobile filter drawer backdrop */}
      {filterDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-dark/70 lg:hidden"
          aria-hidden="true"
          onClick={() => setFilterDrawerOpen(false)}
        />
      )}

      {/* Mobile filter drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-background shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          filterDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Product filters"
        aria-hidden={!filterDrawerOpen}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-border flex-shrink-0">
          <h2 className="font-display text-xl tracking-widest uppercase text-foreground">
            Filtros
          </h2>
          <button
            onClick={() => setFilterDrawerOpen(false)}
            aria-label="Cerrar filtros"
            className="p-1.5 rounded-full hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <ShopSidebar
            filters={filters}
            onChange={(f) => handleFilterChange(f)}
          />
        </div>

        <div className="p-5 border-t border-border">
          <button
            onClick={() => setFilterDrawerOpen(false)}
            className="w-full bg-brand-orange text-brand-white font-sans font-bold tracking-widest uppercase py-3 rounded-lg text-sm hover:bg-brand-orange/90 transition-colors"
          >
            Ver {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8">
        <div className="flex gap-8 items-start">

          {/* Desktop sidebar — sticky */}
          <div className="hidden lg:block w-[280px] flex-shrink-0 sticky top-24">
            <ShopSidebar filters={filters} onChange={handleFilterChange} />
          </div>

          {/* Product grid + controls */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">

            {/* Mobile filter trigger */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setFilterDrawerOpen(true)}
                aria-label="Abrir filtros"
                className="flex items-center gap-2 border border-border rounded-lg px-4 py-2.5 font-sans text-sm font-semibold text-foreground hover:border-brand-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <SlidersHorizontal size={16} />
                Filtros
                {activeFilterCount > 0 && (
                  <span className="bg-brand-orange text-brand-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            <ShopTopBar
              sort={sort}
              onSortChange={handleSortChange}
              total={filtered.length}
            />

            {paginated.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <p className="font-display text-4xl tracking-widest text-muted-foreground uppercase">
                  Sin resultados
                </p>
                <p className="text-sm font-sans text-muted-foreground">
                  Prueba ajustando los filtros para encontrar lo que buscas.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="text-sm font-sans font-semibold text-brand-orange hover:underline focus-visible:outline-none focus-visible:underline"
                >
                  Limpiar todos los filtros
                </button>
              </div>
            )}

            <ShopPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
