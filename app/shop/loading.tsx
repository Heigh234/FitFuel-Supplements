export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Hero banner skeleton */}
      <div className="h-[300px] md:h-[400px] w-full bg-brand-dark/20" />

      {/* Main layout */}
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8">
        <div className="flex gap-8 items-start">

          {/* Desktop sidebar skeleton */}
          <div className="hidden lg:flex flex-col gap-4 w-[280px] flex-shrink-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="h-5 w-28 bg-secondary rounded" />
                <div className="h-px w-full bg-border" />
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-4 w-full bg-secondary rounded" />
                ))}
              </div>
            ))}
          </div>

          {/* Product grid skeleton */}
          <div className="flex-1 min-w-0">
            {/* Top bar skeleton */}
            <div className="flex items-end justify-between pb-5 border-b border-border mb-6">
              <div className="flex flex-col gap-2">
                <div className="h-9 w-64 bg-secondary rounded" />
                <div className="h-3 w-20 bg-secondary rounded" />
              </div>
              <div className="h-9 w-36 bg-secondary rounded" />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="aspect-square rounded-lg bg-secondary" />
                  <div className="h-4 w-3/4 bg-secondary rounded" />
                  <div className="h-3 w-1/2 bg-secondary rounded" />
                  <div className="h-8 w-full bg-secondary rounded" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
