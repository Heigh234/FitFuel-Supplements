"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Pre-Workout", "Protein", "Amino Acids", "Vitamins"];
const FLAVORS = ["Chocolate", "Lemon Lime", "Fruit Punch"];
const PRICE_MIN = 0;
const PRICE_MAX = 79.99;

const RATING_OPTIONS = [
  { value: 4, label: "4 estrellas y más" },
  { value: 3, label: "3 estrellas y más" },
  { value: 2, label: "2 estrellas y más" },
] as const;

export interface ShopFilters {
  categories: string[];
  flavors: string[];
  priceMin: number;
  priceMax: number;
  /** Minimum product rating to show. 0 means no filter applied. */
  minRating: number;
}

interface ShopSidebarProps {
  filters: ShopFilters;
  onChange: (filters: ShopFilters) => void;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 text-left group"
        aria-expanded={open}
      >
        <span className="font-display tracking-widest text-lg text-brand-text uppercase">
          {title}
        </span>
        {open ? (
          <ChevronUp size={16} className="text-muted-foreground" />
        ) : (
          <ChevronDown size={16} className="text-muted-foreground" />
        )}
      </button>
      {open && <div className="mt-1 flex flex-col gap-2">{children}</div>}
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={cn(
          "w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center transition-colors",
          checked
            ? "bg-brand-orange border-brand-orange"
            : "border-border bg-background group-hover:border-brand-orange"
        )}
      >
        {checked && (
          <svg
            viewBox="0 0 10 8"
            className="w-2.5 h-2 fill-brand-white"
            aria-hidden="true"
          >
            <path
              d="M1 4l2.5 2.5L9 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        )}
      </span>
      <span className="text-sm font-sans text-foreground group-hover:text-brand-orange transition-colors">
        {label}
      </span>
    </label>
  );
}

/** Renders filled/empty star icons for a given minimum rating value. */
function StarRow({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={cn(
            i < value
              ? "fill-brand-orange text-brand-orange"
              : "fill-border text-border"
          )}
        />
      ))}
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ShopSidebar({ filters, onChange }: ShopSidebarProps) {
  function toggleCategory(cat: string, checked: boolean) {
    const next = checked
      ? [...filters.categories, cat]
      : filters.categories.filter((c) => c !== cat);
    onChange({ ...filters, categories: next });
  }

  function toggleFlavor(flavor: string, checked: boolean) {
    const next = checked
      ? [...filters.flavors, flavor]
      : filters.flavors.filter((f) => f !== flavor);
    onChange({ ...filters, flavors: next });
  }

  function handleMinChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Math.min(Number(e.target.value), filters.priceMax - 1);
    onChange({ ...filters, priceMin: val });
  }

  function handleMaxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Math.max(Number(e.target.value), filters.priceMin + 1);
    onChange({ ...filters, priceMax: val });
  }

  /** Clicking an already-selected rating deselects it (acts as a toggle). */
  function handleRatingChange(value: number) {
    onChange({ ...filters, minRating: filters.minRating === value ? 0 : value });
  }

  return (
    <aside
      className="w-full flex flex-col gap-0 bg-card border border-border rounded-lg p-5"
      aria-label="Product filters"
    >
      {/* ── Categories ──────────────────────────────────────────── */}
      <FilterSection title="Categorías">
        {CATEGORIES.map((cat) => (
          <Checkbox
            key={cat}
            label={cat}
            checked={filters.categories.includes(cat)}
            onChange={(v) => toggleCategory(cat, v)}
          />
        ))}
      </FilterSection>

      {/* ── Star Rating ─────────────────────────────────────────── */}
      <FilterSection title="Valoración">
        <p className="font-sans text-xs text-muted-foreground -mt-1 mb-1">
          Mostrar productos con mínimo:
        </p>
        <div className="flex flex-col gap-2" role="radiogroup" aria-label="Valoración mínima">
          {RATING_OPTIONS.map(({ value, label }) => {
            const selected = filters.minRating === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleRatingChange(value)}
                className={cn(
                  "flex items-center gap-2.5 w-full text-left px-2.5 py-2 rounded-lg border transition-all",
                  selected
                    ? "border-brand-orange bg-brand-orange/5"
                    : "border-transparent hover:border-border hover:bg-secondary/50"
                )}
              >
                <StarRow value={value} />
                <span className="font-sans text-sm text-foreground">
                  {label}
                </span>
                {selected && (
                  <span
                    className="ml-auto w-3.5 h-3.5 rounded-full bg-brand-orange flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 10 8" className="w-2 h-1.5" aria-hidden="true">
                      <path
                        d="M1 4l2.5 2.5L9 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* ── Flavors ─────────────────────────────────────────────── */}
      <FilterSection title="Sabor">
        {FLAVORS.map((flavor) => (
          <Checkbox
            key={flavor}
            label={flavor}
            checked={filters.flavors.includes(flavor)}
            onChange={(v) => toggleFlavor(flavor, v)}
          />
        ))}
      </FilterSection>

      {/* ── Price range ─────────────────────────────────────────── */}
      <FilterSection title="Rango de Precio">
        <div className="flex flex-col gap-3 pt-1">
          <div className="relative h-6 flex items-center">
            {/* Track background */}
            <div className="absolute left-0 right-0 h-1 bg-border rounded-full" />
            {/* Active track */}
            <div
              className="absolute h-1 bg-brand-orange rounded-full"
              style={{
                left: `${(filters.priceMin / PRICE_MAX) * 100}%`,
                right: `${100 - (filters.priceMax / PRICE_MAX) * 100}%`,
              }}
            />
            {/* Min thumb */}
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={0.01}
              value={filters.priceMin}
              onChange={handleMinChange}
              aria-label="Precio mínimo"
              className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-orange [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer"
            />
            {/* Max thumb */}
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={0.01}
              value={filters.priceMax}
              onChange={handleMaxChange}
              aria-label="Precio máximo"
              className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-orange [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>
          <p className="text-xs font-sans text-muted-foreground">
            min:{" "}
            <span className="text-brand-orange font-semibold">
              ${filters.priceMin.toFixed(2)}
            </span>{" "}
            — max:{" "}
            <span className="text-brand-orange font-semibold">
              ${filters.priceMax.toFixed(2)}
            </span>
          </p>
        </div>
      </FilterSection>
    </aside>
  );
}
