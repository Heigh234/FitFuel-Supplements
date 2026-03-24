"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center gap-6 text-center">
        <ShoppingBag size={64} className="text-border" aria-hidden="true" />
        <h1 className="font-display text-5xl tracking-wide uppercase text-foreground">
          Tu carrito está vacío
        </h1>
        <p className="font-sans text-muted-foreground text-sm leading-relaxed max-w-xs">
          Parece que aún no has añadido ningún producto. ¡Explora nuestra tienda!
        </p>
        <Link
          href="/shop"
          className="mt-2 bg-brand-orange text-brand-white font-sans font-bold tracking-widest uppercase px-8 py-4 rounded-lg hover:bg-brand-orange/90 transition-colors text-sm"
        >
          IR A LA TIENDA
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-sans text-muted-foreground mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand-orange transition-colors">Inicio</Link>
        <span>/</span>
        <span className="text-foreground font-semibold">Carrito</span>
      </nav>

      <h1 className="font-display text-5xl md:text-6xl tracking-wide uppercase text-foreground mb-10">
        Mi Carrito
      </h1>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left: Items list */}
        <div className="flex-1 flex flex-col divide-y divide-border border border-border rounded-xl overflow-hidden">
          {/* Header row */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 bg-secondary text-xs font-sans font-bold tracking-widest uppercase text-muted-foreground">
            <span>Producto</span>
            <span className="text-center">Precio</span>
            <span className="text-center">Cantidad</span>
            <span className="text-center">Subtotal</span>
            <span className="sr-only">Eliminar</span>
          </div>

          {cartItems.map((item) => {
            const subtotal = item.product.price * item.quantity;
            return (
              <div
                key={item.product.id}
                className="grid grid-cols-[auto_1fr] md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-5 bg-card"
              >
                {/* Product info */}
                <div className="flex items-center gap-4 col-span-2 md:col-span-1">
                  <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white border border-border flex items-center justify-center">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <Link
                      href={`/shop/${item.product.slug}`}
                      className="font-display text-lg leading-tight uppercase tracking-wide text-foreground hover:text-brand-orange transition-colors line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs font-sans text-muted-foreground">
                      {item.product.sizes[0]}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="hidden md:flex justify-center font-sans text-sm font-semibold text-foreground">
                  ${item.product.price.toFixed(2)}
                </div>

                {/* Quantity stepper */}
                <div className="flex items-center justify-start md:justify-center gap-0">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                    className="w-9 h-9 border border-border rounded-l-lg flex items-center justify-center font-bold text-base text-foreground hover:border-brand-orange hover:text-brand-orange transition-colors"
                  >
                    −
                  </button>
                  <div className="w-10 h-9 border-t border-b border-border flex items-center justify-center font-sans font-semibold text-sm text-foreground">
                    {item.quantity}
                  </div>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                    className="w-9 h-9 border border-border rounded-r-lg flex items-center justify-center font-bold text-base text-foreground hover:border-brand-orange hover:text-brand-orange transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="hidden md:flex justify-center font-display text-xl tracking-wide text-brand-orange">
                  ${subtotal.toFixed(2)}
                </div>

                {/* Remove */}
                <div className="flex justify-end md:justify-center">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    aria-label={`Remove ${item.product.name} from cart`}
                    className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Order summary */}
        <aside className="w-full lg:w-80 flex-shrink-0 border border-border rounded-xl overflow-hidden bg-card">
          <div className="px-6 py-5 border-b border-border bg-secondary">
            <h2 className="font-display text-2xl tracking-widest uppercase text-foreground">
              Resumen del Pedido
            </h2>
          </div>

          <div className="px-6 py-6 flex flex-col gap-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between font-sans text-sm text-foreground">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">${cartTotal.toFixed(2)}</span>
            </div>

            {/* Shipping */}
            <div className="flex items-center justify-between font-sans text-sm text-foreground">
              <span className="text-muted-foreground">Envío</span>
              <span className="font-bold text-green-600">Gratis</span>
            </div>

            {/* Divider */}
            <hr className="border-border" />

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="font-sans font-bold text-base uppercase tracking-wide text-foreground">
                Total
              </span>
              <span className="font-display text-3xl text-brand-orange tracking-wide">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            {/* CTA */}
            <button
              onClick={() => toast.info("Función demo")}
              className="mt-2 w-full bg-brand-orange text-brand-white font-sans font-bold tracking-widest uppercase py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-orange/90 transition-colors text-sm"
            >
              PROCEDER AL PAGO
            </button>

            {/* Continue shopping */}
            <Link
              href="/shop"
              className="text-center text-xs font-sans text-muted-foreground hover:text-brand-orange transition-colors underline underline-offset-2"
            >
              Continuar comprando
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
