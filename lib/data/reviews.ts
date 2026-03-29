export interface Review {
  id: number;
  name: string;
  initials: string;
  color: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface ProductReviewsData {
  averageRating: number;
  totalReviews: number;
  distribution: Record<5 | 4 | 3 | 2 | 1, number>; // percentages
  reviews: Review[];
}

export const REVIEWS_BY_SLUG: Record<string, ProductReviewsData> = {
  "titan-pre-workout": {
    averageRating: 4.9,
    totalReviews: 2341,
    distribution: { 5: 91, 4: 7, 3: 1, 2: 1, 1: 0 },
    reviews: [
      {
        id: 1,
        name: "Carlos M.",
        initials: "CM",
        color: "bg-orange-600",
        rating: 5,
        date: "10 Mar 2026",
        title: "El mejor pre-workout que he probado",
        comment:
          "Llevo 3 meses usándolo y es increíble. Sin crash, energía limpia durante todo el entrenamiento. El foco mental es brutal. 100% recomendado.",
        verified: true,
      },
      {
        id: 2,
        name: "Diego S.",
        initials: "DS",
        color: "bg-blue-600",
        rating: 5,
        date: "28 Feb 2026",
        title: "Resultados desde el primer día",
        comment:
          "Probé muchas marcas antes y ninguna me dio tanta energía sin los nervios típicos. La mezcla de citrulina y beta-alanina se nota de verdad.",
        verified: true,
      },
      {
        id: 3,
        name: "Andrés V.",
        initials: "AV",
        color: "bg-emerald-600",
        rating: 4,
        date: "15 Feb 2026",
        title: "Muy bueno, solo mejoraría el sabor",
        comment:
          "Funciona genial, la energía dura todo el entrenamiento. Le doy 4 porque el sabor podría ser un poco mejor, pero en cuanto a rendimiento es top.",
        verified: true,
      },
    ],
  },
  "whey-gold-protein": {
    averageRating: 4.8,
    totalReviews: 3120,
    distribution: { 5: 85, 4: 11, 3: 3, 2: 1, 1: 0 },
    reviews: [
      {
        id: 1,
        name: "Andrea R.",
        initials: "AR",
        color: "bg-purple-600",
        rating: 5,
        date: "12 Mar 2026",
        title: "La mejor proteína del mercado",
        comment:
          "Se mezcla perfecta, sin grumos. El sabor chocolate es delicioso y los resultados en recuperación muscular son notables desde la primera semana.",
        verified: true,
      },
      {
        id: 2,
        name: "Miguel T.",
        initials: "MT",
        color: "bg-red-600",
        rating: 5,
        date: "5 Mar 2026",
        title: "25g de proteína pura, sin rellenos",
        comment:
          "He comparado el perfil nutricional con otras marcas y Whey Gold gana en todos los aspectos. Sin azúcares añadidos y se digiere muy bien.",
        verified: true,
      },
      {
        id: 3,
        name: "Laura P.",
        initials: "LP",
        color: "bg-slate-600",
        rating: 4,
        date: "20 Feb 2026",
        title: "Buena proteína, buen precio",
        comment:
          "Llevo 2 meses usándola post-entreno y noto menos agujetas. El sabor vainilla es suave. Esperaría más variedad de sabores pero el producto es sólido.",
        verified: true,
      },
    ],
  },
  "ultra-bcaa": {
    averageRating: 4.7,
    totalReviews: 1875,
    distribution: { 5: 78, 4: 15, 3: 5, 2: 2, 1: 0 },
    reviews: [
      {
        id: 1,
        name: "Valeria T.",
        initials: "VT",
        color: "bg-red-600",
        rating: 5,
        date: "8 Mar 2026",
        title: "Recuperación al siguiente nivel",
        comment:
          "Desde que uso Ultra BCAA el dolor muscular al día siguiente es mínimo. El sabor Lemon Lime está increíble y se mezcla sin problema.",
        verified: true,
      },
      {
        id: 2,
        name: "Javier L.",
        initials: "JL",
        color: "bg-blue-600",
        rating: 5,
        date: "1 Mar 2026",
        title: "El ratio 2:1:1 hace la diferencia",
        comment:
          "He probado BCAAs de otras marcas con ratios distintos y este es el que mejor resultado me da. Menos agujetas y más energía en los entrenamientos consecutivos.",
        verified: true,
      },
      {
        id: 3,
        name: "Sara N.",
        initials: "SN",
        color: "bg-orange-600",
        rating: 4,
        date: "18 Feb 2026",
        title: "Buen producto, lo recomiendo",
        comment:
          "Los uso intra-entrenamiento y noto que aguanto más. El único punto negativo es que el envase podría ser más grande para los que entrenamos 5 días a la semana.",
        verified: false,
      },
    ],
  },
  "creatine-mono": {
    averageRating: 4.9,
    totalReviews: 4210,
    distribution: { 5: 93, 4: 5, 3: 1, 2: 1, 1: 0 },
    reviews: [
      {
        id: 1,
        name: "Rodrigo P.",
        initials: "RP",
        color: "bg-red-600",
        rating: 5,
        date: "14 Mar 2026",
        title: "La creatina más pura del mercado",
        comment:
          "Mi fuerza en sentadilla subió 20kg en 6 semanas. Sin retención excesiva de agua, se disuelve perfectamente. La micronización hace la diferencia.",
        verified: true,
      },
      {
        id: 2,
        name: "Pablo G.",
        initials: "PG",
        color: "bg-emerald-600",
        rating: 5,
        date: "7 Mar 2026",
        title: "Clásico que nunca falla",
        comment:
          "La creatina monohidrato es el suplemento más estudiado que existe. Esta de FitFuel es pura, sin rellenos. Resultados consistentes en fuerza y volumen.",
        verified: true,
      },
      {
        id: 3,
        name: "Marco A.",
        initials: "MA",
        color: "bg-orange-600",
        rating: 5,
        date: "25 Feb 2026",
        title: "Resultados comprobados en 4 semanas",
        comment:
          "Empecé con 5g diarios y en 4 semanas noté un claro aumento en el rendimiento en press banca y peso muerto. Sin efectos secundarios.",
        verified: true,
      },
    ],
  },
  "iron-mass-gainer": {
    averageRating: 4.6,
    totalReviews: 987,
    distribution: { 5: 72, 4: 18, 3: 7, 2: 2, 1: 1 },
    reviews: [
      {
        id: 1,
        name: "Roberto K.",
        initials: "RK",
        color: "bg-emerald-600",
        rating: 5,
        date: "11 Mar 2026",
        title: "Finalmente gano peso de verdad",
        comment:
          "Soy ectomorfo y siempre me costó ganar masa. Con Iron Mass Gainer subí 4kg en un mes. Las calorías son limpias y la proteína de calidad.",
        verified: true,
      },
      {
        id: 2,
        name: "Tomás B.",
        initials: "TB",
        color: "bg-slate-600",
        rating: 4,
        date: "3 Mar 2026",
        title: "Muy bueno para hardgainers",
        comment:
          "1000 calorías por serving es exactamente lo que necesitaba. Me ha ayudado a superar el plateau de peso. El sabor chocolate podría mejorar un poco.",
        verified: true,
      },
      {
        id: 3,
        name: "Felipe H.",
        initials: "FH",
        color: "bg-red-600",
        rating: 4,
        date: "22 Feb 2026",
        title: "Funciona bien para volumen",
        comment:
          "Lo uso en fase de volumen y los resultados son buenos. La mezcla de carbohidratos complejos hace que la energía sea sostenida. Buen producto.",
        verified: false,
      },
    ],
  },
  "multi-complex": {
    averageRating: 4.7,
    totalReviews: 542,
    distribution: { 5: 79, 4: 14, 3: 5, 2: 2, 1: 0 },
    reviews: [
      {
        id: 1,
        name: "Sofía N.",
        initials: "SN",
        color: "bg-purple-600",
        rating: 5,
        date: "9 Mar 2026",
        title: "Noticia en energía desde la primera semana",
        comment:
          "Más energía, mejor sueño, uñas más fuertes. 23 nutrientes en una cápsula. Es el mejor multivitamínico que he tomado y he probado varios.",
        verified: true,
      },
      {
        id: 2,
        name: "Elena M.",
        initials: "EM",
        color: "bg-brand-dark",
        rating: 5,
        date: "2 Mar 2026",
        title: "Formulado para atletas de verdad",
        comment:
          "La diferencia con otros multivitamínicos genéricos es enorme. Dosis de vitaminas adaptadas al desgaste de un atleta. Muy completo.",
        verified: true,
      },
      {
        id: 3,
        name: "Raúl C.",
        initials: "RC",
        color: "bg-brand-orange",
        rating: 4,
        date: "17 Feb 2026",
        title: "Buena base nutricional",
        comment:
          "Lo tomo con el desayuno y se digiere bien. He notado que me canso menos durante el día. Un buen complemento para cualquier rutina de entrenamiento.",
        verified: false,
      },
    ],
  },
  "pure-glutamine": {
    averageRating: 4.8,
    totalReviews: 764,
    distribution: { 5: 83, 4: 13, 3: 3, 2: 1, 1: 0 },
    reviews: [
      {
        id: 1,
        name: "Isabel F.",
        initials: "IF",
        color: "bg-slate-600",
        rating: 5,
        date: "6 Mar 2026",
        title: "Esencial para la recuperación",
        comment:
          "Desde que la añadí post-entreno mi sistema inmune mejoró mucho. En épocas de mucha carga de entrenamiento no me enfermo. Completamente inodora e insípida.",
        verified: true,
      },
      {
        id: 2,
        name: "Nicolás A.",
        initials: "NA",
        color: "bg-blue-600",
        rating: 5,
        date: "27 Feb 2026",
        title: "Pureza 100%, se nota",
        comment:
          "Sin sabor, sin color, se mezcla con todo. La uso en proteína, BCAA o agua y no altera nada. La calidad de FitFuel es consistente en todos sus productos.",
        verified: true,
      },
      {
        id: 3,
        name: "Patricia O.",
        initials: "PO",
        color: "bg-red-600",
        rating: 4,
        date: "14 Feb 2026",
        title: "Buena glutamina, resultados lentos",
        comment:
          "El producto es de calidad sin duda. Los resultados en recuperación son graduales, hay que ser constante. Lo recomiendo para quienes entrenan con alta frecuencia.",
        verified: false,
      },
    ],
  },
  "omega-3-ultra": {
    averageRating: 4.9,
    totalReviews: 2098,
    distribution: { 5: 92, 4: 6, 3: 1, 2: 1, 1: 0 },
    reviews: [
      {
        id: 1,
        name: "Javier L.",
        initials: "JL",
        color: "bg-muted-foreground",
        rating: 5,
        date: "13 Mar 2026",
        title: "Sin sabor a pescado, increíble",
        comment:
          "Probé mil marcas de omega 3 y ninguna como FitFuel. Sin sabor a pescado, las cápsulas son fáciles de tragar y se nota el efecto antiinflamatorio en articulaciones.",
        verified: true,
      },
      {
        id: 2,
        name: "Carmen V.",
        initials: "CV",
        color: "bg-purple-600",
        rating: 5,
        date: "6 Mar 2026",
        title: "Calidad farmacéutica real",
        comment:
          "1200mg de EPA/DHA por serving es una dosis terapéutica de verdad. Lo noto en las articulaciones, en la recuperación y en el estado de ánimo general.",
        verified: true,
      },
      {
        id: 3,
        name: "Héctor M.",
        initials: "HM",
        color: "bg-primary",
        rating: 5,
        date: "21 Feb 2026",
        title: "El mejor omega 3 que existe",
        comment:
          "Llevo 6 meses tomándolo y mis análisis de sangre mejoraron notablemente. El precio es justo para la calidad que ofrece. No volvería a otra marca.",
        verified: true,
      },
    ],
  },
};
