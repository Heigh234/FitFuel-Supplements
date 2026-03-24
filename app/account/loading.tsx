export default function AccountLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[220px] md:h-[280px] bg-brand-dark/20" />

      {/* Content */}
      <div className="bg-brand-light min-h-screen py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">

          {/* Sidebar skeleton */}
          <div className="w-full lg:w-[260px] flex-shrink-0">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="h-14 bg-brand-dark/30" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-5 py-3.5 border-b border-border">
                  <div className="h-4 w-40 bg-secondary rounded" />
                </div>
              ))}
              <div className="px-5 py-4">
                <div className="h-4 w-32 bg-secondary rounded" />
              </div>
            </div>
          </div>

          {/* Panel skeleton */}
          <div className="flex-1 min-w-0">
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col gap-6">
              <div className="h-8 w-48 bg-secondary rounded" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-24 bg-secondary rounded-lg" />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
