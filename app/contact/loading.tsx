export default function ContactLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="relative w-full h-64 md:h-96 bg-brand-dark/20" />

      {/* Content */}
      <div className="w-full bg-background py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — contact info */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="h-1 w-12 bg-secondary rounded-full" />
              <div className="h-10 w-3/4 bg-secondary rounded" />
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex-shrink-0" />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-3 w-20 bg-secondary rounded" />
                  <div className="h-4 w-40 bg-secondary rounded" />
                </div>
              </div>
            ))}
            {/* Map skeleton */}
            <div className="w-full aspect-[4/3] rounded-xl bg-secondary" />
          </div>

          {/* Right — form */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="h-1 w-12 bg-secondary rounded-full" />
              <div className="h-10 w-3/4 bg-secondary rounded" />
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="h-3 w-28 bg-secondary rounded" />
                <div className="h-11 w-full bg-secondary rounded-lg" />
              </div>
            ))}
            <div className="h-14 w-full bg-secondary rounded-lg" />
          </div>

        </div>
      </div>
    </div>
  );
}
