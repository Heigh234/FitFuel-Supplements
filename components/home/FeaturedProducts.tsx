import ProductCard from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/lib/constants";

export default function FeaturedProducts() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <section
      aria-label="Featured products"
      className="w-full py-16 px-6 md:px-12 bg-secondary"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-12 gap-2">
          <p className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-brand-orange">
            HAND-PICKED FOR YOU
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-brand-text tracking-wide text-center text-balance">
            FEATURED PRODUCTS
          </h2>
          <div className="w-12 h-0.5 bg-brand-orange mt-2" />
        </div>

        {/* Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 sm:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featured.map((product) => (
            <div key={product.id} className="w-[85%] sm:w-[45%] shrink-0 snap-center md:w-auto md:shrink md:snap-align-none">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
