"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type SortOption = "popular" | "price-asc" | "price-desc" | "newest";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Más Populares" },
  { value: "price-asc", label: "Precio ↑" },
  { value: "price-desc", label: "Precio ↓" },
  { value: "newest", label: "Más Nuevos" },
];

interface ShopTopBarProps {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  total: number;
}

export default function ShopTopBar({ sort, onSortChange, total }: ShopTopBarProps) {
  return (
    <div className="flex flex-col gap-2 pb-5 border-b border-border">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1">
        <Link
          href="/"
          className="text-xs font-sans text-muted-foreground hover:text-brand-orange transition-colors"
        >
          Inicio
        </Link>
        <ChevronRight size={12} className="text-muted-foreground" />
        <span className="text-xs font-sans text-muted-foreground">
          Suplementos
        </span>
      </nav>

      {/* Title row */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-4xl md:text-5xl tracking-widest text-brand-text uppercase leading-none">
            Catálogo de Productos
          </h1>
          <p className="text-xs font-sans text-muted-foreground mt-1.5">
            {total} producto{total !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground whitespace-nowrap">
            Ordenar por
          </span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none bg-background border border-border rounded-md pl-3 pr-8 py-2 text-sm font-sans text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange cursor-pointer"
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronRight
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rotate-90 text-muted-foreground pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
