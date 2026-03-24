"use client";

import { useState } from "react";
import { Star, ShoppingCart, Zap } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types";
import { useCart } from "@/app/context/CartContext";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(product, undefined, undefined, quantity);
    toast.success(`${product.name} añadido al carrito`, {
      description: `${quantity} × $${product.price.toFixed(2)}`,
      duration: 3000,
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Category */}
      <p className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-brand-orange">
        {product.category}
      </p>

      {/* Name */}
      <h1 className="font-display text-5xl md:text-6xl leading-none tracking-wide uppercase text-foreground text-balance">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={cn(
                i < Math.floor(product.rating)
                  ? "fill-brand-orange text-brand-orange"
                  : "fill-border text-border"
              )}
            />
          ))}
        </div>
        <span className="font-sans text-sm font-semibold text-foreground">
          {product.rating}
        </span>
        <span className="font-sans text-sm text-muted-foreground">
          ({product.reviewCount.toLocaleString()} reviews)
        </span>
      </div>

      {/* Price */}
      <p className="font-display text-5xl text-brand-orange tracking-wide">
        ${product.price.toFixed(2)}
      </p>

      {/* Description */}
      <p className="font-sans text-sm text-muted-foreground leading-relaxed">
        {product.description}
      </p>

      <hr className="border-border" />

      {/* Size — static display */}
      {product.sizes.length > 0 && (
        <p className="text-sm font-sans text-muted-foreground">
          {product.sizes[0]}
        </p>
      )}

      {/* Quantity */}
      <div className="flex flex-col gap-3">
        <p className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-foreground">
          QUANTITY
        </p>
        <div className="flex items-center gap-0">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="w-11 h-11 border border-border rounded-l-lg flex items-center justify-center font-sans font-bold text-lg text-foreground hover:border-brand-orange hover:text-brand-orange transition-colors"
          >
            −
          </button>
          <div className="w-14 h-11 border-t border-b border-border flex items-center justify-center font-sans font-semibold text-foreground text-base">
            {quantity}
          </div>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="w-11 h-11 border border-border rounded-r-lg flex items-center justify-center font-sans font-bold text-lg text-foreground hover:border-brand-orange hover:text-brand-orange transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          onClick={handleAddToCart}
          className="w-full bg-brand-orange text-brand-white font-sans font-bold tracking-widest uppercase py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-orange/90 transition-colors text-sm"
        >
          <ShoppingCart size={16} />
          ADD TO CART
        </button>
        <button className="w-full border-2 border-brand-orange text-brand-orange font-sans font-bold tracking-widest uppercase py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-orange hover:text-brand-white transition-colors text-sm">
          <Zap size={16} />
          BUY NOW
        </button>
      </div>
    </div>
  );
}
