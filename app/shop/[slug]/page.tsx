import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS } from "@/lib/constants";
import ImageGallery from "@/components/product/ImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductAccordion from "@/components/product/ProductAccordion";
import ProductReviews from "@/components/product/ProductReviews";
import ProductCard from "@/components/ui/ProductCard";
import ValuePropositionBar from "@/components/home/ValuePropositionBar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} — FitFuel`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      {/* Breadcrumb */}
      <div className="bg-brand-light border-b border-border px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center font-sans text-xs text-gray-600"
          >
            <Link href="/" className="hover:text-brand-orange transition-colors min-w-[44px] min-h-[44px] inline-flex items-center justify-center pr-2 py-2">
              Home
            </Link>
            <span aria-hidden="true" className="px-1 text-muted-foreground">/</span>
            <Link href="/shop" className="hover:text-brand-orange transition-colors min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-2 py-2">
              Shop
            </Link>
            <span aria-hidden="true" className="px-1 text-muted-foreground">/</span>
            <span className="text-foreground font-medium px-2 py-2 inline-flex items-center min-h-[44px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main PDP layout */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          {/* LEFT — Image Gallery */}
          <ImageGallery product={product} />

          {/* RIGHT — Product Info */}
          <ProductInfo product={product} />
        </div>

        {/* Accordion */}
        <div className="mt-16">
          <ProductAccordion product={product} />
        </div>

        {/* Reviews */}
        <ProductReviews slug={product.slug} />
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="bg-brand-light py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1 h-10 bg-brand-orange rounded-full" aria-hidden="true" />
              <h2 className="font-display text-4xl md:text-5xl tracking-widest uppercase text-foreground">
                PRODUCTOS RELACIONADOS
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FitFuel Difference bar */}
      <ValuePropositionBar />
    </>
  );
}
