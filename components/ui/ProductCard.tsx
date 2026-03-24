"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import FitButton from "./FitButton";
import { useCart } from "@/app/context/CartContext";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const BADGE_STYLES: Record<NonNullable<Product["badge"]>, string> = {
  "BEST SELLER": "bg-brand-orange text-brand-white",
  NEW: "bg-brand-dark text-brand-white",
  "MAS VENDIDO": "bg-brand-orange text-brand-white",
};

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(product);
    toast.success(`${product.name} añadido al carrito`, {
      description: `$${product.price.toFixed(2)}`,
      duration: 3000,
    });
  }

  return (
    <article
      className={cn(
        "group bg-card rounded-lg overflow-hidden border border-border flex flex-col transition-shadow duration-300 hover:shadow-xl",
        className
      )}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-white aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className={cn(
              "absolute top-3 left-3 text-xs font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-full",
              BADGE_STYLES[product.badge]
            )}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category */}
        <p className="text-xs font-sans font-semibold tracking-widest uppercase text-brand-orange">
          {product.category}
        </p>

        {/* Name */}
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-display text-2xl leading-tight text-brand-text tracking-wide uppercase hover:text-brand-orange transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                className={cn(
                  i < Math.floor(product.rating)
                    ? "fill-brand-orange text-brand-orange"
                    : "fill-border text-border"
                )}
              />
            ))}
          </div>
          <span className="text-xs font-sans text-muted-foreground">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <p className="font-display text-3xl text-brand-text tracking-wide">
            ${product.price.toFixed(2)}
          </p>
          <FitButton
            size="sm"
            aria-label={`Add ${product.name} to cart`}
            onClick={handleAddToCart}
          >
            <ShoppingCart size={14} />
            ADD
          </FitButton>
        </div>
      </div>
    </article>
  );
}
