"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function PasswordField({
  id,
  label,
  placeholder,
  className,
}: {
  id: string;
  label: string;
  placeholder: string;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-text block"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          className="w-full border border-border rounded-lg px-3.5 py-2.5 pr-10 font-sans text-sm text-brand-text bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange transition-colors placeholder:text-muted-foreground"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-brand-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded"
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}
