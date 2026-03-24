import Link from "next/link";

const CATEGORIES = [
  {
    label: "PROTEIN POWDER",
    filter: "Protein",
    video:
      "https://res.cloudinary.com/dsejihoyr/video/upload/v1773648440/Athlete_s_Intense_Bench_Press_Video-optimizado_ro2h4c.mp4",
  },
  {
    label: "PRE-WORKOUT",
    filter: "Pre-Workout",
    video:
      "https://res.cloudinary.com/dsejihoyr/video/upload/v1773648440/Athlete_Scooping_Pre_Workout_Powder-optimizado_yw37rc.mp4",
  },
  {
    label: "CREATINE",
    filter: "Amino Acids",
    video:
      "https://res.cloudinary.com/dsejihoyr/video/upload/v1773648440/Explosive_Start_Block_Motion_Blur-optimizado_kyxuel.mp4",
  },
  {
    label: "VITAMINS",
    filter: "Vitamins",
    video:
      "https://res.cloudinary.com/dsejihoyr/video/upload/v1773648440/video-shopbygoal-burnfat-optimizado_kuxfqs.mp4",
  },
];

export default function CategoriesGrid() {
  return (
    <section
      aria-label="Product categories"
      className="w-full py-16 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <h2 className="sr-only">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.filter}
            href={`/shop?category=${encodeURIComponent(cat.filter)}`}
            className="group relative overflow-hidden rounded-lg aspect-[3/4] block"
            aria-label={`Shop ${cat.label}`}
          >
            {/* Background video — below the fold, defer fetching until visible */}
            <video
              src={cat.video}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/35 transition-colors duration-300" />

            {/* Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-4 z-10">
              <div className="w-8 h-0.5 bg-brand-orange mb-3 transition-all duration-300 group-hover:w-12" />
              <p className="font-display text-brand-white text-xl md:text-2xl tracking-[0.15em] text-center text-balance">
                {cat.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
