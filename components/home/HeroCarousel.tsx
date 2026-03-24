"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FitButton from "@/components/ui/FitButton";

const SLIDES = [
  {
    id: 1,
    tagline: "UNLEASH YOUR POTENTIAL.",
    headline: "PREMIUM GYM\nSUPPLEMENTS.",
    cta: "SHOP BEST SELLERS",
    image: "https://placehold.co/1440x600/0a0a0a/222222?text=+",
  },
  {
    id: 2,
    tagline: "FUEL EVERY REP.",
    headline: "PUSH PAST\nYOUR LIMITS.",
    cta: "EXPLORE PRODUCTS",
    image: "https://placehold.co/1440x600/0d0d0d/1a1a1a?text=+",
  },
  {
    id: 3,
    tagline: "ENGINEERED FOR ATHLETES.",
    headline: "TRAIN HARDER.\nRECOVER FASTER.",
    cta: "VIEW SUPPLEMENTS",
    image: "https://placehold.co/1440x600/111111/1e1e1e?text=+",
  },
];

export default function HeroCarousel() {
  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplayRef.current,
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section aria-label="Hero carousel" className="relative w-full overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {SLIDES.map((slide) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] min-w-0 h-[520px] md:h-[600px]"
            >
              {/* Background image — decorative, no alt text needed */}
              <Image
                src={slide.image}
                alt=""
                fill
                aria-hidden="true"
                className="object-cover"
                sizes="100vw"
                // Eagerly load the first slide (LCP candidate);
                // the rest load eagerly too since the carousel auto-advances.
                loading="eager"
                fetchPriority={slide.id === 1 ? "high" : "low"}
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-brand-dark/80" aria-hidden="true" />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-6 md:px-12">
                <p className="font-display text-brand-orange text-base sm:text-xl md:text-2xl tracking-[0.2em] mb-2">
                  {slide.tagline}
                </p>
                <h1 className="font-display text-brand-white text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-none tracking-wide whitespace-pre-line mb-8 text-balance">
                  {slide.headline}
                </h1>
                <div>
                  <Link href="/shop">
                    <FitButton size="lg">{slide.cta}</FitButton>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300 cursor-pointer",
              selectedIndex === i
                ? "w-6 bg-brand-orange"
                : "w-2 bg-brand-white/40 hover:bg-brand-white/70"
            )}
          />
        ))}
      </div>
    </section>
  );
}
