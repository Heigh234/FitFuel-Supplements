"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { PRODUCTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  /** Opens the results panel upward instead of downward. Use inside bottom-anchored drawers. */
  popupDirection?: "down" | "up";
  /** Makes the input fill available width. Use for mobile drawer. */
  fullWidth?: boolean;
  /** Extra classes applied to the outermost wrapper div. */
  className?: string;
}

export default function SearchBar({
  popupDirection = "down",
  fullWidth = false,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Close dropdown and clear query on route change
  useEffect(() => {
    setIsOpen(false);
    setQuery("");
  }, [pathname]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter products in real-time — minimum 2 characters to avoid noisy results
  const results = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return [];
    const q = trimmed.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [query]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(val.trim().length >= 1);
  }

  function handleFocus() {
    if (query.trim().length >= 1) setIsOpen(true);
  }

  function handleClear() {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  }

  function handleResultClick() {
    setIsOpen(false);
    setQuery("");
  }

  const showEmptyState = isOpen && query.trim().length >= 2 && results.length === 0;
  const showDropdown = isOpen && (results.length > 0 || showEmptyState);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* ── Input row ───────────────────────────────────────────── */}
      <div
        className={cn(
          "flex items-center bg-white/10 rounded-full gap-2 transition-all",
          fullWidth ? "px-3 py-2 w-full" : "px-3 py-1.5",
          isOpen
            ? "ring-2 ring-brand-orange"
            : "focus-within:ring-2 focus-within:ring-brand-orange"
        )}
      >
        <Search
          size={14}
          className="text-nav-fg/60 flex-shrink-0"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          placeholder="Buscar productos..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          autoComplete="off"
          role="combobox"
          aria-label="Buscar productos"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="search-results-listbox"
          aria-autocomplete="list"
          className={cn(
            "bg-transparent text-nav-fg text-xs focus:outline-none placeholder:text-nav-fg/50 font-sans",
            fullWidth ? "flex-1 w-auto" : "w-28"
          )}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
            className="text-nav-fg/60 hover:text-nav-fg transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-full"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* ── Results dropdown ────────────────────────────────────── */}
      {showDropdown && (
        <div
          id="search-results-listbox"
          role="listbox"
          aria-label="Resultados de búsqueda"
          className={cn(
            "absolute left-0 w-80 bg-background border border-border rounded-xl shadow-2xl overflow-hidden z-[60]",
            popupDirection === "up" ? "bottom-full mb-2" : "top-full mt-2"
          )}
        >
          {results.length > 0 ? (
            <>
              <ul>
                {results.map((product) => (
                  <li key={product.id} role="option" aria-selected="false">
                    <Link
                      href={`/shop/${product.slug}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors group focus-visible:outline-none focus-visible:bg-secondary"
                    >
                      {/* Thumbnail */}
                      <div className="w-11 h-11 flex-shrink-0 rounded-lg border border-border bg-white overflow-hidden flex items-center justify-center">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={44}
                          height={44}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Name + category */}
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="font-sans text-sm font-semibold text-brand-text truncate group-hover:text-brand-orange transition-colors">
                          {product.name}
                        </span>
                        <span className="font-sans text-xs text-muted-foreground">
                          {product.category}
                        </span>
                      </div>

                      {/* Price */}
                      <span className="font-sans text-sm font-bold text-brand-orange flex-shrink-0 ml-auto">
                        ${product.price.toFixed(2)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* "View all" footer */}
              <div className="px-4 py-2.5 border-t border-border bg-secondary/40">
                <Link
                  href={`/shop?q=${encodeURIComponent(query.trim())}`}
                  onClick={handleResultClick}
                  className="font-sans text-xs font-semibold text-brand-orange hover:underline focus-visible:outline-none focus-visible:underline"
                >
                  Ver todos los resultados para &ldquo;{query.trim()}&rdquo; →
                </Link>
              </div>
            </>
          ) : (
            /* Empty state */
            <div className="px-4 py-5 text-center">
              <p className="font-sans text-sm text-muted-foreground">
                Sin resultados para{" "}
                <span className="font-semibold text-brand-text">
                  &ldquo;{query}&rdquo;
                </span>
              </p>
              <Link
                href="/shop"
                onClick={handleResultClick}
                className="mt-2 inline-block font-sans text-xs font-semibold text-brand-orange hover:underline"
              >
                Ver todos los productos →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
