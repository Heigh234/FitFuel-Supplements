import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

import { REVIEWS_BY_SLUG } from "@/lib/data/reviews";

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            i < Math.floor(rating)
              ? "fill-brand-orange text-brand-orange"
              : "fill-border text-border"
          )}
        />
      ))}
    </div>
  );
}

interface ProductReviewsProps {
  slug: string;
}

export default function ProductReviews({ slug }: ProductReviewsProps) {
  const data = REVIEWS_BY_SLUG[slug];
  if (!data) return null;

  return (
    <section aria-labelledby="reviews-heading" className="mt-16">
      {/* Section heading */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-1 h-10 bg-brand-orange rounded-full" aria-hidden="true" />
        <h2
          id="reviews-heading"
          className="font-display text-4xl md:text-5xl tracking-widest uppercase text-foreground"
        >
          RESEÑAS DE CLIENTES
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT — Rating summary */}
        <div className="flex flex-col gap-6 bg-secondary rounded-xl p-6 h-fit">

          {/* Big rating number */}
          <div className="flex flex-col items-center gap-2 pb-6 border-b border-border">
            <span className="font-display text-8xl text-brand-orange leading-none tracking-wide">
              {data.averageRating}
            </span>
            <StarRating rating={data.averageRating} size={20} />
            <p className="font-sans text-sm text-muted-foreground">
              Basado en{" "}
              <span className="font-semibold text-foreground">
                {data.totalReviews.toLocaleString()}
              </span>{" "}
              reseñas
            </p>
          </div>

          {/* Star distribution bars */}
          <div className="flex flex-col gap-3">
            {([5, 4, 3, 2, 1] as const).map((star) => (
              <div key={star} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16 flex-shrink-0">
                  <span className="font-sans text-xs font-semibold text-muted-foreground">
                    {star}
                  </span>
                  <Star size={12} className="fill-brand-orange text-brand-orange" />
                </div>
                <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-orange rounded-full transition-[width] duration-500"
                    style={{ width: `${data.distribution[star]}%` }}
                    role="progressbar"
                    aria-valuenow={data.distribution[star]}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${star} estrellas: ${data.distribution[star]}%`}
                  />
                </div>
                <span className="font-sans text-xs text-muted-foreground w-8 text-right flex-shrink-0">
                  {data.distribution[star]}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Individual reviews */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {data.reviews.map((review) => (
            <article
              key={review.id}
              className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-sans font-bold text-xs",
                      review.color
                    )}
                    aria-hidden="true"
                  >
                    {review.initials}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-sans font-semibold text-sm text-brand-text">
                        {review.name}
                      </span>
                      {review.verified && (
                        <span className="font-sans text-[10px] font-bold tracking-wide uppercase text-green-600 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                          Compra verificada
                        </span>
                      )}
                    </div>
                    <span className="font-sans text-xs text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                </div>
                <StarRating rating={review.rating} size={14} />
              </div>

              {/* Title */}
              <p className="font-sans font-bold text-sm text-brand-text">
                {review.title}
              </p>

              {/* Comment */}
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {review.comment}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
