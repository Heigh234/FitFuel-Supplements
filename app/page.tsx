import { Suspense } from "react";
import type { Metadata } from "next";
import VideoHero from "@/components/home/VideoHero";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import ValuePropositionBar from "@/components/home/ValuePropositionBar";

export const metadata: Metadata = {
  title: "FitFuel — Premium Fitness Supplements",
  description:
    "Fuel your performance with FitFuel's premium supplements. Pre-workouts, proteins, amino acids, and vitamins engineered for serious athletes.",
};

/** Minimal height-reserving skeleton prevents CLS while VideoHero hydrates. */
function VideoHeroSkeleton() {
  return <div className="min-h-screen bg-brand-dark" aria-hidden="true" />;
}

/** Matches the section height of the testimonials carousel. */
function TestimonialsSkeleton() {
  return (
    <div className="w-full py-16 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col items-center gap-2">
          <div className="h-4 w-48 bg-secondary rounded animate-pulse" />
          <div className="h-12 w-80 bg-secondary rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 bg-secondary rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<VideoHeroSkeleton />}>
        <VideoHero />
      </Suspense>
      <CategoriesGrid />
      <FeaturedProducts />
      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsCarousel />
      </Suspense>
      <ValuePropositionBar />
    </>
  );
}
