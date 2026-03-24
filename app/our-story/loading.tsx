export default function OurStoryLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="w-full h-64 md:h-96 bg-brand-dark/20" />

      {/* Story section */}
      <div className="w-full bg-background py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — text */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="h-1 w-12 bg-secondary rounded-full" />
              <div className="h-14 w-3/4 bg-secondary rounded" />
            </div>
            <div className="flex flex-col gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-3 w-full bg-secondary rounded" />
              ))}
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="h-4 w-32 bg-secondary rounded" />
                <div className="h-1 w-8 bg-secondary rounded-full" />
                <div className="h-3 w-full bg-secondary rounded" />
              </div>
            ))}
          </div>

          {/* Right — stacked images */}
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="relative w-full aspect-[2/1] rounded-lg bg-secondary" />
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision dark section */}
      <div className="w-full bg-brand-dark/40 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-secondary flex-shrink-0" />
                <div className="h-10 w-28 bg-secondary rounded" />
              </div>
              <div className="h-1 w-10 bg-secondary rounded-full" />
              <div className="flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="h-3 w-full bg-secondary/30 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
