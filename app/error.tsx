"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Replace with your error-reporting service (e.g. Sentry.captureException)
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-[80vh] bg-brand-light flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full flex flex-col items-center text-center gap-6">

        {/* Accent bar */}
        <div className="w-16 h-1 bg-brand-orange rounded-full" aria-hidden="true" />

        {/* Heading */}
        <h2 className="font-display text-4xl md:text-5xl tracking-widest uppercase text-brand-text">
          ALGO SALIÓ MAL
        </h2>

        {/* Description */}
        <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-sm">
          Ha ocurrido un error inesperado. Puedes intentar recargar la página o
          volver a la tienda.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <button
            onClick={reset}
            className="bg-brand-orange text-brand-white font-sans font-bold tracking-widest uppercase px-8 py-4 rounded-lg hover:bg-brand-orange/90 active:scale-[0.98] transition-all text-sm"
          >
            INTENTAR DE NUEVO
          </button>
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
