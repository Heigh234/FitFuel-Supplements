"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductAccordionProps {
  product: Product;
}

export default function ProductAccordion({ product }: ProductAccordionProps) {
  return (
    <Accordion type="single" collapsible defaultValue="description" className="w-full border-t border-border">
      <AccordionItem value="description">
        <AccordionTrigger className="font-display text-lg tracking-widest text-foreground hover:text-brand-orange hover:no-underline transition-colors py-5 uppercase">
          DESCRIPTION
        </AccordionTrigger>
        <AccordionContent>
          <p className="font-sans text-muted-foreground leading-relaxed text-sm">
            {product.description} Our cutting-edge manufacturing process ensures
            every batch meets the highest purity standards. Tested by third-party
            labs, free from banned substances, and crafted with only the cleanest
            ingredients to support your performance goals without compromise.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="supplement-facts">
        <AccordionTrigger className="font-display text-lg tracking-widest text-foreground hover:text-brand-orange hover:no-underline transition-colors py-5 uppercase">
          SUPPLEMENT FACTS
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex justify-center">
            <Image
              src={`https://placehold.co/400x500/f5f5f5/111111?text=Supplement+Facts`}
              alt="Supplement facts panel"
              width={320}
              height={400}
              className="rounded-lg border border-border"
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="how-to-use">
        <AccordionTrigger className="font-display text-lg tracking-widest text-foreground hover:text-brand-orange hover:no-underline transition-colors py-5 uppercase">
          HOW TO USE
        </AccordionTrigger>
        <AccordionContent>
          <ol className="font-sans text-muted-foreground leading-relaxed text-sm list-decimal list-inside space-y-2">
            <li>Mix one scoop with 250–350ml of cold water.</li>
            <li>Shake or stir vigorously for 15–20 seconds until fully dissolved.</li>
            <li>Consume 20–30 minutes before training for optimal results.</li>
            <li>Do not exceed the recommended daily serving. Keep out of reach of children.</li>
          </ol>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="faq">
        <AccordionTrigger className="font-display text-lg tracking-widest text-foreground hover:text-brand-orange hover:no-underline transition-colors py-5 uppercase">
          FAQ
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-5">
            {[
              {
                q: "Can I stack this with other FitFuel products?",
                a: "Yes — all FitFuel products are designed to work synergistically. We recommend pairing pre-workouts with our BCAA or protein line for maximum performance and recovery.",
              },
              {
                q: "Is this product tested for banned substances?",
                a: "All FitFuel products are manufactured in a cGMP-certified facility and undergo rigorous third-party testing to ensure they are free from WADA-prohibited substances.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <p className="font-sans font-semibold text-sm text-foreground mb-1">{q}</p>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
