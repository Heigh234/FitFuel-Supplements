"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { PasswordField } from "./PasswordField";
import { cn } from "@/lib/utils";

export function AccountDetailsPanel() {
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  }

  const inputClass = "w-full border border-border rounded-lg px-3.5 py-2.5 font-sans text-sm text-brand-text bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange transition-colors placeholder:text-muted-foreground";

  return (
    <div className="flex flex-col gap-8">
      {/* Profile info */}
      <section aria-label="Información de perfil">
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <SectionTitle>Detalles de la Cuenta</SectionTitle>
            <p className="font-sans text-base font-semibold text-brand-text mt-1">
              Información de Perfil
            </p>
          </div>

          <form onSubmit={handleSave} noValidate className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="firstName"
                  className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-text block"
                >
                  Nombre
                </label>
                <input
                  id="firstName"
                  type="text"
                  defaultValue="Carlos"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="lastName"
                  className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-text block"
                >
                  Apellido
                </label>
                <input
                  id="lastName"
                  type="text"
                  defaultValue="Gómez"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label
                  htmlFor="email"
                  className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-text block"
                >
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  defaultValue="carlos.g@email.com"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="phone"
                  className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-text block"
                >
                  Teléfono
                </label>
                <input
                  id="phone"
                  type="tel"
                  defaultValue="+34 600 123 456"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="gender"
                  className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-text block"
                >
                  Género
                </label>
                <select
                  id="gender"
                  defaultValue="Hombre"
                  className={inputClass}
                >
                  <option>Hombre</option>
                  <option>Mujer</option>
                  <option>Prefiero no decirlo</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="dob"
                  className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-text block"
                >
                  Fecha de Nacimiento
                </label>
                <input
                  id="dob"
                  type="date"
                  defaultValue="1990-05-15"
                  className={inputClass}
                />
              </div>
            </div>

            {saved && (
              <div
                role="status"
                aria-live="polite"
                className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 font-sans text-sm"
              >
                <CheckCircle2 size={16} className="flex-shrink-0" />
                Cambios guardados correctamente.
              </div>
            )}

            <button
              type="submit"
              className="bg-brand-orange text-brand-white font-sans font-bold tracking-widest uppercase py-3.5 rounded-lg w-full hover:bg-brand-orange/90 active:scale-[0.98] transition-transform text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
            >
              GUARDAR CAMBIOS
            </button>
          </form>
        </div>
      </section>

      {/* Change password */}
      <section aria-label="Cambiar contraseña">
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="font-sans text-xl font-bold text-brand-text">
              Cambiar Contraseña
            </h2>
            <p className="font-sans text-sm text-muted-foreground">
              Por seguridad, usa una contraseña de al menos 8 caracteres.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PasswordField
                id="currentPassword"
                label="Contraseña Actual"
                placeholder="••••••••"
              />
              <PasswordField
                id="newPassword"
                label="Nueva Contraseña"
                placeholder="••••••••"
              />
              <PasswordField
                id="confirmPassword"
                label="Confirmar Nueva Contraseña"
                placeholder="••••••••"
                className="sm:col-span-2"
              />
            </div>

            <button
              type="submit"
              className="bg-brand-orange text-brand-white font-sans font-bold tracking-widest uppercase py-3.5 rounded-lg w-full hover:bg-brand-orange/90 active:scale-[0.98] transition-transform text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
            >
              CAMBIAR CONTRASEÑA
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
