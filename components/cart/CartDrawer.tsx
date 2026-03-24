"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/app/context/CartContext";

export default function CartDrawer() {
  const { cartItems, cartTotal, cartCount, removeFromCart, updateQuantity, isCartOpen, closeCart } =
    useCart();

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  // Escape key closes drawer
  useEffect(() => {
    if (!isCartOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isCartOpen, closeCart]);

  // Focus close button when drawer opens
  useEffect(() => {
    if (isCartOpen) {
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    }
  }, [isCartOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={cn(
          "fixed inset-0 z-50 bg-black/60 transition-opacity duration-300",
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 bg-[#111111] flex-shrink-0">
          <h2 className="font-display text-xl tracking-widest text-white">
            MI CARRITO
            {cartCount > 0 && (
              <span className="ml-2 text-brand-orange">({cartCount})</span>
            )}
          </h2>
          <button
            ref={closeBtnRef}
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
              <ShoppingBag size={48} className="text-gray-300" aria-hidden="true" />
              <p className="font-display text-2xl tracking-widest text-[#111111]">
                TU CARRITO ESTÁ VACÍO
              </p>
              <p className="font-sans text-sm text-gray-400 leading-relaxed">
                Agrega productos para comenzar
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <li key={item.product.id} className="flex gap-3 p-4">
                  {/* Image */}
                  <div className="w-[72px] h-[72px] flex-shrink-0 rounded-lg overflow-hidden bg-white border border-gray-100 flex items-center justify-center">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={72}
                      height={72}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 gap-1.5 min-w-0">
                    <p className="font-display text-sm uppercase tracking-wide text-[#111111] line-clamp-2 leading-tight">
                      {item.product.name}
                    </p>
                    <p className="font-sans font-bold text-sm text-brand-orange">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Quantity + Remove */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-sans font-bold text-lg leading-none"
                        >
                          −
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center font-sans text-sm font-semibold text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-sans font-bold text-lg leading-none"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label={`Remove ${item.product.name}`}
                        className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 p-4 bg-white flex flex-col gap-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs tracking-widest uppercase text-gray-500">
                SUBTOTAL
              </span>
              <span className="font-display text-2xl text-[#111111]">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-sans text-sm text-gray-500">Envío</span>
              <span className="font-sans text-sm font-semibold text-green-600">GRATIS</span>
            </div>
            <Link
              href="/cart"
              onClick={closeCart}
              className="flex items-center justify-center h-12 w-full rounded-lg bg-brand-orange text-white font-display text-lg tracking-widest uppercase hover:bg-brand-orange/90 transition-colors"
            >
              VER CARRITO COMPLETO
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
