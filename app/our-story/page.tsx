import Image from "next/image";
import { Target, Handshake } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nuestra Historia — FitFuel",
  description:
    "Conoce la historia detrás de FitFuel: quiénes somos, qué nos impulsa y hacia dónde vamos como referente global en suplementos fitness.",
};

const VALUES = [
  {
    title: "INNOVACIÓN",
    description:
      "Investigamos constantemente nuevas formulaciones y tecnologías de absorción para mantenernos a la vanguardia del rendimiento deportivo.",
  },
  {
    title: "TRANSPARENCIA",
    description:
      "Cada ingrediente de nuestros productos está listado con claridad. Sin rellenos ocultos, sin engaños: solo lo que tu cuerpo necesita.",
  },
  {
    title: "RESULTADOS",
    description:
      "Diseñamos cada suplemento con un objetivo claro: que veas y sientas la diferencia desde la primera toma.",
  },
];

const STORY_IMAGES = [
  {
    src: "/images/story-shelf.jpg",
    alt: "Estantería de productos FitFuel",
  },
  {
    src: "/images/story-team.jpg",
    alt: "Equipo FitFuel trabajando",
  },
  {
    src: "/images/story-event.jpg",
    alt: "Evento de marca FitFuel en expo fitness",
  },
];

export default function OurStoryPage() {
  return (
    <>
      {/* ── SECTION 1: Hero Banner ──────────────────────────────────── */}
      <section aria-label="Our Story hero" className="relative w-full h-64 md:h-96 overflow-hidden">
        <Image
          src="/images/our-story-hero.jpg"
          alt="Grupo de atletas entrenando juntos"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-brand-dark/60" aria-hidden="true" />
      </section>

      {/* ── SECTION 2: Nuestra Historia ─────────────────────────────── */}
      <section
        aria-labelledby="historia-heading"
        className="w-full bg-background py-20 px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div className="flex flex-col gap-8">
            {/* Heading with orange accent bar */}
            <div className="flex flex-col gap-3">
              <div className="w-12 h-1 bg-brand-orange rounded-full" aria-hidden="true" />
              <h1
                id="historia-heading"
                className="font-display text-5xl md:text-6xl tracking-[0.06em] text-brand-text text-balance"
              >
                NUESTRA HISTORIA
              </h1>
            </div>

            <div className="flex flex-col gap-5 text-muted-foreground leading-relaxed text-base">
              <p>
                FitFuel nació en 2018 de la pasión de un grupo de atletas y nutricionistas que estaban
                hartos de suplementos con ingredientes dudosos y etiquetas confusas. Creíamos —y
                seguimos creyendo— que la suplementación debería ser tan transparente como el
                entrenamiento mismo.
              </p>
              <p>
                Lo que empezó en un pequeño laboratorio en Guadalajara se convirtió en una marca con
                presencia en más de 12 países. Cada producto que lanzamos pasa por rigurosos controles
                de calidad y está respaldado por evidencia científica, porque tu rendimiento merece
                lo mejor.
              </p>
            </div>

            {/* Values */}
            <ul className="flex flex-col gap-5" aria-label="Nuestros valores">
              {VALUES.map((value) => (
                <li key={value.title} className="flex flex-col gap-1">
                  <span className="font-sans font-bold text-sm tracking-widest text-brand-text uppercase">
                    {value.title}
                  </span>
                  <div className="w-8 h-0.5 bg-brand-orange rounded-full" aria-hidden="true" />
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Stacked images */}
          <div className="flex flex-col gap-4">
            {STORY_IMAGES.map((img) => (
              <div
                key={img.src}
                className="relative w-full aspect-[2/1] rounded-lg overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Misión & Visión ──────────────────────────────── */}
      <section
        aria-labelledby="mision-vision-heading"
        className="w-full bg-brand-dark py-20 px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <h2
            id="mision-vision-heading"
            className="sr-only"
          >
            Misión y Visión
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {/* Misión */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full border border-brand-orange flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <Target size={26} className="text-brand-orange" />
                </div>
                <h3 className="font-display text-4xl tracking-[0.1em] text-brand-white">
                  MISIÓN
                </h3>
              </div>
              <div className="w-10 h-0.5 bg-brand-orange rounded-full" aria-hidden="true" />
              <p className="text-brand-white/70 text-base leading-relaxed font-sans">
                Empoderar a atletas de todos los niveles con suplementos de la más alta calidad,
                formulados con ingredientes transparentes y respaldados por ciencia. Queremos que
                cada persona que confíe en FitFuel alcance su máximo potencial, dentro y fuera del
                gimnasio.
              </p>
            </div>

            {/* Visión */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full border border-brand-orange flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <Handshake size={26} className="text-brand-orange" />
                </div>
                <h3 className="font-display text-4xl tracking-[0.1em] text-brand-white">
                  VISIÓN
                </h3>
              </div>
              <div className="w-10 h-0.5 bg-brand-orange rounded-full" aria-hidden="true" />
              <p className="text-brand-white/70 text-base leading-relaxed font-sans">
                Convertirnos en el referente global de suplementación deportiva honesta y efectiva.
                Aspiramos a construir una comunidad mundial de atletas que compartan nuestra
                convicción de que el rendimiento real se construye con dedicación, conocimiento
                y los mejores ingredientes posibles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
