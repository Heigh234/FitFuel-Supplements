"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  handle: string;
  rating: number;
  comment: string;
  product: string;
  initials: string;
  color: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Carlos M.",
    handle: "@carlosfit_mx",
    rating: 5,
    comment:
      "El Titan Pre-Workout es otro nivel. Llevo 3 meses usándolo y jamás he sentido tanta energía en el gym. Sin crash, sin nerviosismo. Pura potencia.",
    product: "TITAN PRE-WORKOUT",
    initials: "CM",
    color: "bg-orange-500",
  },
  {
    id: 2,
    name: "Andrea R.",
    handle: "@andrea.lifts",
    rating: 5,
    comment:
      "La Whey Gold tiene el mejor sabor que he probado. Se mezcla perfecta, sin grumos, y los resultados en recuperación muscular son notables desde la primera semana.",
    product: "WHEY GOLD PROTEIN",
    initials: "AR",
    color: "bg-blue-500",
  },
  {
    id: 3,
    name: "Diego S.",
    handle: "@diegogains",
    rating: 5,
    comment:
      "La Creatine Mono de FitFuel es pura, sin rellenos raros. Mi fuerza en sentadilla subió 20kg en 6 semanas. Imposible no recomendar esto.",
    product: "CREATINE MONO",
    initials: "DS",
    color: "bg-green-500",
  },
  {
    id: 4,
    name: "Valeria T.",
    handle: "@valefit.ok",
    rating: 5,
    comment:
      "Los BCAA Ultra son mis favoritos post-entreno. Reducen el dolor muscular al día siguiente muchísimo. El sabor Lemon Lime está increíble.",
    product: "ULTRA BCAA 2:1:1",
    initials: "VT",
    color: "bg-purple-500",
  },
  {
    id: 5,
    name: "Javier L.",
    handle: "@javierlifestyle",
    rating: 5,
    comment:
      "Probé mil marcas de omega 3 y ninguna como FitFuel. Sin sabor a pescado, las cápsulas son fáciles de tragar y se nota el efecto antiinflamatorio.",
    product: "OMEGA 3 ULTRA",
    initials: "JL",
    color: "bg-teal-500",
  },
  {
    id: 6,
    name: "Sofía N.",
    handle: "@sofianutre",
    rating: 5,
    comment:
      "El Multi Complex es lo mejor que le ha pasado a mi rutina. Más energía, mejor sueño, uñas más fuertes. 23 nutrientes en una sola cápsula, brutal.",
    product: "MULTI COMPLEX",
    initials: "SN",
    color: "bg-pink-500",
  },
  {
    id: 7,
    name: "Rodrigo P.",
    handle: "@rodri.bulk",
    rating: 5,
    comment:
      "Con el Iron Mass Gainer finalmente empecé a ganar peso de verdad. 1000 calorías limpias, sin azúcares basura. Mi peso subió 4kg en un mes de uso.",
    product: "IRON MASS GAINER",
    initials: "RP",
    color: "bg-red-500",
  },
];

export default function TestimonialsCarousel() {
  const autoplayRef = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [autoplayRef.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      aria-label="Testimonios de clientes"
      className="w-full py-16 px-6 md:px-12 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center mb-12 gap-2">
          <p className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-brand-orange">
            LO QUE DICEN NUESTROS ATLETAS
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-brand-text tracking-wide text-center text-balance">
            RESEÑAS REALES
          </h2>
          <div className="w-12 h-0.5 bg-brand-orange mt-2" />
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-10px)] lg:flex-[0_0_calc(33.333%-14px)] min-w-0"
              >
                <article className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4 h-full">

                  {/* Stars */}
                  <div className="flex items-center gap-0.5" aria-label={`${t.rating} de 5 estrellas`} role="img">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className={cn(
                          i < t.rating
                            ? "fill-brand-orange text-brand-orange"
                            : "fill-border text-border"
                        )}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">
                    &ldquo;{t.comment}&rdquo;
                  </p>

                  {/* Product badge */}
                  <span className="self-start font-sans text-[10px] font-bold tracking-widest uppercase text-brand-orange bg-brand-orange/10 border border-brand-orange/20 rounded-full px-3 py-1">
                    {t.product}
                  </span>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-1 border-t border-border">
                    <div
                      className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white font-sans font-bold text-xs",
                        t.color
                      )}
                      aria-hidden="true"
                    >
                      {t.initials}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-sans font-semibold text-sm text-brand-text leading-tight">
                        {t.name}
                      </span>
                      <span className="font-sans text-xs text-muted-foreground">
                        {t.handle}
                      </span>
                    </div>
                  </div>

                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Dot navigation */}
        <div className="flex items-center justify-center gap-1 mt-8">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Ir a reseña ${i + 1}`}
              className="w-11 h-11 flex items-center justify-center group"
            >
              <div
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  selectedIndex === i
                    ? "w-6 bg-brand-orange"
                    : "w-2 bg-border group-hover:bg-brand-orange/50"
                )}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
