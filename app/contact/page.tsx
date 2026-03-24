"use client";

import Image from "next/image";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Calle Fitness 123, Madrid, España",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+34 912 345 678",
  },
  {
    icon: Mail,
    label: "Email",
    value: "soporte@fitfuel.es",
  },
];

const SOCIAL_LINKS = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z" />
      </svg>
    ),
    label: "TikTok",
    href: "https://tiktok.com",
  },
];

const ASUNTO_OPTIONS = [
  { value: "", label: "Selecciona un asunto" },
  { value: "general", label: "Consulta general" },
  { value: "pedidos", label: "Pedidos y envíos" },
  { value: "productos", label: "Productos" },
  { value: "otro", label: "Otro" },
];

type FormState = {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validate(data: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!data.nombre.trim()) errors.nombre = "El nombre es obligatorio.";
  if (!data.email.trim()) {
    errors.email = "El correo es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Introduce un correo válido.";
  }
  if (!data.asunto) errors.asunto = "Selecciona un asunto.";
  if (!data.mensaje.trim()) errors.mensaje = "El mensaje es obligatorio.";
  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  }

  const inputBase =
    "w-full bg-brand-light border border-border rounded-lg px-4 py-3 text-sm font-sans text-brand-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange transition-shadow";
  const errorClass = "border-destructive focus:ring-destructive/40";

  return (
    <>
      {/* ── SECTION 1: Hero Banner ──────────────────────────────────── */}
      <section aria-label="Contact hero" className="relative w-full h-64 md:h-96 overflow-hidden">
        <Image
          src="/images/contact-hero.jpg"
          alt="Equipo de soporte FitFuel"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-brand-dark/60" aria-hidden="true" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <div className="w-12 h-1 bg-brand-orange rounded-full" aria-hidden="true" />
          <h1 className="font-display text-5xl md:text-7xl tracking-[0.08em] text-brand-white text-balance">
            CONTÁCTANOS
          </h1>
          <p className="font-sans text-brand-white/70 text-sm md:text-base max-w-md leading-relaxed">
            Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: Contact Info + Form ─────────────────────────── */}
      <section
        aria-labelledby="contactanos-heading"
        className="w-full bg-background py-20 px-6 md:px-12"
      >
        <h2 id="contactanos-heading" className="sr-only">
          Contáctanos
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Contact Data ──────────────────────────────────── */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <div className="w-12 h-1 bg-brand-orange rounded-full" aria-hidden="true" />
              <h3 className="font-display text-4xl md:text-5xl tracking-[0.06em] text-brand-text">
                NUESTROS DATOS DE CONTACTO
              </h3>
            </div>

            {/* Contact items */}
            <ul className="flex flex-col gap-5" aria-label="Datos de contacto">
              {CONTACT_ITEMS.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full border border-brand-orange flex items-center justify-center flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <Icon size={18} className="text-brand-orange" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-xs tracking-widest uppercase text-muted-foreground">
                      {label}
                    </span>
                    <span className="font-sans text-sm text-brand-text leading-relaxed">
                      {value}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Horario */}
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-full border border-brand-orange flex items-center justify-center flex-shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <Clock size={18} className="text-brand-orange" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-xs tracking-widest uppercase text-muted-foreground">
                  Horario de atención
                </span>
                <span className="font-sans text-sm text-brand-text leading-relaxed">
                  Lun – Vie &nbsp;·&nbsp; 9:00 – 18:00
                </span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex flex-col gap-3">
              <span className="font-sans font-bold text-xs tracking-widest uppercase text-muted-foreground">
                Síguenos
              </span>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-brand-orange hover:text-brand-orange transition-colors"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Google Maps iframe */}
            <div className="w-full rounded-xl overflow-hidden border border-border aspect-[4/3]">
              <iframe
                title="FitFuel Madrid location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.6128392455935!2d-3.7037902235063505!3d40.41694397143695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42287d7b3b6e2b%3A0x21fcb9a5a0e86f22!2sMadrid%2C%20Spain!5e0!3m2!1sen!2ses!4v1710685200000!5m2!1sen!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* ── Right: Contact Form ─────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="w-12 h-1 bg-brand-orange rounded-full" aria-hidden="true" />
              <h3 className="font-display text-4xl md:text-5xl tracking-[0.06em] text-brand-text">
                ENVÍANOS UN MENSAJE
              </h3>
            </div>

            {submitted ? (
              <div
                role="alert"
                className="flex items-start gap-4 bg-green-50 border border-green-200 rounded-xl px-6 py-5"
              >
                <CheckCircle2 size={22} className="text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="font-sans text-green-800 text-sm leading-relaxed">
                  Mensaje enviado correctamente. Te responderemos pronto.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
                aria-label="Formulario de contacto"
              >
                {/* Nombre */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="nombre"
                    className="font-sans font-semibold text-xs tracking-widest uppercase text-brand-text"
                  >
                    Nombre completo <span className="text-brand-orange" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    autoComplete="name"
                    placeholder="Tu nombre completo"
                    value={form.nombre}
                    onChange={handleChange}
                    aria-invalid={!!errors.nombre}
                    aria-describedby={errors.nombre ? "nombre-error" : undefined}
                    className={`${inputBase} ${errors.nombre ? errorClass : ""}`}
                  />
                  {errors.nombre && (
                    <p id="nombre-error" role="alert" className="text-destructive text-xs font-sans">
                      {errors.nombre}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="font-sans font-semibold text-xs tracking-widest uppercase text-brand-text"
                  >
                    Correo electrónico <span className="text-brand-orange" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`${inputBase} ${errors.email ? errorClass : ""}`}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="text-destructive text-xs font-sans">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Asunto */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="asunto"
                    className="font-sans font-semibold text-xs tracking-widest uppercase text-brand-text"
                  >
                    Asunto <span className="text-brand-orange" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="asunto"
                    name="asunto"
                    value={form.asunto}
                    onChange={handleChange}
                    aria-invalid={!!errors.asunto}
                    aria-describedby={errors.asunto ? "asunto-error" : undefined}
                    className={`${inputBase} ${errors.asunto ? errorClass : ""} appearance-none cursor-pointer`}
                  >
                    {ASUNTO_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.asunto && (
                    <p id="asunto-error" role="alert" className="text-destructive text-xs font-sans">
                      {errors.asunto}
                    </p>
                  )}
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="mensaje"
                    className="font-sans font-semibold text-xs tracking-widest uppercase text-brand-text"
                  >
                    Mensaje <span className="text-brand-orange" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    placeholder="Escribe tu mensaje aquí..."
                    value={form.mensaje}
                    onChange={handleChange}
                    aria-invalid={!!errors.mensaje}
                    aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
                    className={`${inputBase} resize-none ${errors.mensaje ? errorClass : ""}`}
                  />
                  {errors.mensaje && (
                    <p id="mensaje-error" role="alert" className="text-destructive text-xs font-sans">
                      {errors.mensaje}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-brand-orange text-brand-white font-sans font-bold tracking-widest uppercase py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-orange/90 active:scale-[0.98] transition-all text-sm mt-1"
                >
                  <Send size={16} aria-hidden="true" />
                  ENVIAR MENSAJE
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
