import Link from "next/link";

export default function VideoHero() {
  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center justify-center"
      aria-label="Hero"
    >
      {/* Background video
          preload="auto"  — buffer immediately; this plays on mount above the fold.
          poster          — first-frame image eliminates the blank-screen flash before
                            the video is ready. Generate from the first frame of the
                            video using Cloudinary's transformation API or a static export. */}
      <video
        src="https://res.cloudinary.com/dsejihoyr/video/upload/v1773648440/video-homepage-optimizado_rvlcm8.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-6">
        <p className="font-display text-brand-orange text-base sm:text-xl md:text-2xl tracking-[0.2em] uppercase">
          UNLEASH YOUR POTENTIAL.
        </p>
        <h1 className="font-display text-brand-white text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] leading-none tracking-wide text-balance uppercase">
          PREMIUM GYM
          <br />
          SUPPLEMENTS.
        </h1>
        <Link
          href="/shop"
          className="mt-4 inline-flex items-center gap-2 bg-brand-orange text-brand-white font-sans font-bold tracking-widest uppercase text-sm px-8 py-4 rounded-full hover:bg-brand-orange/90 transition-colors"
        >
          SHOP BEST SELLERS
        </Link>
      </div>
    </section>
  );
}
