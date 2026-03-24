export default function ProductLoading() {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="bg-brand-light border-b border-border px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="h-3 w-44 bg-secondary rounded" />
        </div>
      </div>

      {/* Main two-column layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">

          {/* LEFT — image skeleton */}
          <div className="w-full aspect-square rounded-xl bg-secondary" />

          {/* RIGHT — product info skeleton */}
          <div className="flex flex-col gap-6">
            {/* Category */}
            <div className="h-3 w-24 bg-secondary rounded" />
            {/* Name */}
            <div className="flex flex-col gap-2">
              <div className="h-10 w-full bg-secondary rounded" />
              <div className="h-10 w-3/4 bg-secondary rounded" />
            </div>
            {/* Stars */}
            <div className="h-4 w-36 bg-secondary rounded" />
            {/* Price */}
            <div className="h-12 w-28 bg-secondary rounded" />
            {/* Description */}
            <div className="flex flex-col gap-2">
              <div className="h-3 w-full bg-secondary rounded" />
              <div className="h-3 w-5/6 bg-secondary rounded" />
              <div className="h-3 w-4/6 bg-secondary rounded" />
            </div>
            <hr className="border-border" />
            {/* Quantity */}
            <div className="h-11 w-36 bg-secondary rounded-lg" />
            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <div className="h-14 w-full bg-secondary rounded-lg" />
              <div className="h-14 w-full bg-secondary rounded-lg" />
            </div>
          </div>
        </div>

        {/* Accordion skeleton */}
        <div className="mt-16 flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-14 w-full bg-secondary rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
