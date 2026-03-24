import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada — FitFuel",
  description: "La página que buscas no existe. Vuelve a la tienda FitFuel.",
};

export default function NotFound() {
  return (
    <section className="min-h-[80vh] bg-brand-light flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full flex flex-col items-center text-center gap-6">

        {/* 404 number */}
        <p className="font-display text-[10rem] md:text-[14rem] leading-none tracking-widest text-border select-none">
          404
        </p>

        {/* Orange accent bar */}
        <div className="w-16 h-1 bg-brand-orange rounded-full -mt-8" aria-hidden="true" />

        {/* Heading */}
        <h1 className="font-display text-4xl md:text-5xl tracking-widest uppercase text-brand-text text-balance">
          PÁGINA NO ENCONTRADA
        </h1>

        {/* Description */}
        <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-sm">
          Parece que esta página no existe o fue movida. No te preocupes,
          nuestro catálogo de suplementos sigue intacto.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Link
            href="/shop"
            className="bg-brand-orange text-brand-white font-sans font-bold tracking-widest uppercase px-8 py-4 rounded-lg hover:bg-brand-orange/90 active:scale-[0.98] transition-all text-sm"
          >
            IR A LA TIENDA
          </Link>
          <Link
            href="/"
            className="border-2 border-brand-orange text-brand-orange font-sans font-bold tracking-widest uppercase px-8 py-4 rounded-lg hover:bg-brand-orange hover:text-brand-white active:scale-[0.98] transition-all text-sm"
          >
            VOLVER AL INICIO
          </Link>
        </div>

      </div>
    </section>
  );
}
