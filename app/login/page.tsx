"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]             = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/");
      } else {
        setError("Credenciales incorrectas. Intenta de nuevo.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleRegister() {
    alert("Registro deshabilitado en modo demo");
  }

  return (
    <section className="min-h-[80vh] bg-brand-light flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        {/* Title */}
        <h1 className="font-display text-5xl md:text-6xl tracking-widest text-brand-text text-center uppercase mb-10">
          Iniciar Sesión /{" "}
          <span className="text-brand-orange">Registrarse</span>
        </h1>

        {/* Two-column card */}
        <div className="grid md:grid-cols-2 border border-border rounded-xl overflow-hidden bg-background shadow-sm">

          {/* LEFT — Ya soy cliente */}
          <div className="p-8 flex flex-col gap-6">
            <div>
              <h2 className="font-display text-2xl tracking-widest uppercase text-brand-text">
                Ya soy cliente
              </h2>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed font-sans">
                Inicia sesión con tu correo y contraseña.
              </p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4" noValidate>
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-brand-text font-sans">
                  Correo electrónico
                </label>
                <div className="flex items-center border border-border rounded-lg px-3 py-2.5 gap-2 focus-within:ring-2 focus-within:ring-brand-orange transition-all bg-background">
                  <Mail size={16} className="text-muted-foreground flex-shrink-0" aria-hidden="true" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="demo@fitfuel.com"
                    required
                    className="flex-1 bg-transparent text-sm font-sans text-brand-text focus:outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-semibold uppercase tracking-widest text-brand-text font-sans">
                  Contraseña
                </label>
                <div className="flex items-center border border-border rounded-lg px-3 py-2.5 gap-2 focus-within:ring-2 focus-within:ring-brand-orange transition-all bg-background">
                  <Lock size={16} className="text-muted-foreground flex-shrink-0" aria-hidden="true" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="flex-1 bg-transparent text-sm font-sans text-brand-text focus:outline-none placeholder:text-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="text-muted-foreground hover:text-brand-orange transition-colors flex-shrink-0"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <button
                type="button"
                onClick={() => alert("Función no disponible en demo")}
                className="text-xs font-sans text-brand-orange hover:underline self-start -mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded"
              >
                ¿Olvidaste tu contraseña?
              </button>

              {/* Error message */}
              {error && (
                <p role="alert" className="text-sm font-sans text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 leading-relaxed">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-orange text-brand-white font-sans font-bold tracking-widest uppercase py-3.5 rounded-lg hover:bg-brand-orange/90 transition-colors text-sm mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
              </button>

              {/* Demo credentials — only visible in development builds */}
              {process.env.NODE_ENV === "development" && (
                <p className="text-xs font-sans text-muted-foreground text-center">
                  Credenciales demo:{" "}
                  <span className="text-brand-text font-medium">demo@fitfuel.com</span>
                  {" | "}
                  <span className="text-brand-text font-medium">fitfuel123</span>
                </p>
              )}
            </form>
          </div>

          {/* Divider */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-border" aria-hidden="true" />

          {/* RIGHT — Nuevo en FitFuel */}
          <div className="p-8 flex flex-col gap-6 border-t md:border-t-0 md:border-l border-border">
            <div>
              <h2 className="font-display text-2xl tracking-widest uppercase text-brand-text">
                ¿Nuevo en{" "}
                <span className="text-brand-orange">FitFuel</span>?
              </h2>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed font-sans flex-1">
              Únete a la comunidad y obtén acceso exclusivo a ofertas, rastreo de pedidos y más.
            </p>

            {/* Benefits list */}
            <ul className="flex flex-col gap-2" aria-label="Beneficios de registrarse">
              {[
                "Rastreo de pedidos en tiempo real",
                "Acceso anticipado a nuevos productos",
                "Descuentos exclusivos para miembros",
                "Historial de compras y favoritos",
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm font-sans text-brand-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>

            <button
              onClick={handleRegister}
              className="w-full border-2 border-brand-orange text-brand-orange font-sans font-bold tracking-widest uppercase py-3.5 rounded-lg hover:bg-brand-orange hover:text-brand-white transition-colors text-sm mt-auto"
            >
              Crear Cuenta
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
