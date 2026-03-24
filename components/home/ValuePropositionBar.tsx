"use client"; // "use client" is required because embla-carousel-react relies on React hooks (useRef, useEffect) for DOM manipulation and state management.

import { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Truck, Shield, Headphones } from "lucide-react";

const PILLARS = [
  {
    icon: Truck,
    title: "FAST SHIPPING",
    subtitle: "Next-Day Delivery available",
  },
  {
    icon: Shield,
    title: "TOP QUALITY",
    subtitle: "Certified ingredients",
  },
  {
    icon: Headphones,
    title: "SUPPORT",
    subtitle: "24/7 Expert Help",
  },
];

export default function ValuePropositionBar() {
  const autoplayRef = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "center", active: false, breakpoints: { '(max-width: 767px)': { active: true } } },
    [autoplayRef.current]
  );

  return (
    <section
      aria-label="Why FitFuel"
      className="w-full bg-brand-dark py-14 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto overflow-hidden md:overflow-visible" ref={emblaRef}>
        <div className="flex md:grid md:grid-cols-3 gap-10 md:gap-6">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="flex-[0_0_100%] md:flex-auto min-w-0 relative flex flex-col items-center text-center gap-4"
              >
                {/* Icon circle */}
                <div className="w-14 h-14 rounded-full border border-brand-orange flex items-center justify-center flex-shrink-0">
                  <Icon size={24} className="text-brand-orange" aria-hidden="true" />
                </div>
                {/* Text */}
                <div className="flex flex-col gap-1">
                  <p className="font-display text-brand-white text-2xl tracking-[0.15em]">
                    {pillar.title}
                  </p>
                  <p className="font-sans text-sm text-brand-white/60 leading-relaxed">
                    {pillar.subtitle}
                  </p>
                </div>
                {/* Divider — hidden on last column */}
                {i < PILLARS.length - 1 && (
                  <div
                    className="hidden md:block absolute right-[-1.5rem] top-1/2 -translate-y-1/2 h-12 w-px bg-brand-white/10"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
