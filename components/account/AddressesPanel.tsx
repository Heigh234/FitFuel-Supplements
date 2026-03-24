import { Plus } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

export function AddressesPanel() {
  const addresses = [
    {
      label: "Dirección Principal",
      isPrimary: true,
      line1: "Calle Gran Vía 45, 2°B",
      line2: "28013 Madrid, España",
    },
    {
      label: "Dirección de Trabajo",
      isPrimary: false,
      line1: "Avenida de la Castellana 100",
      line2: "28046 Madrid, España",
    },
  ];
  return (
    <section aria-label="Mis direcciones">
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col gap-6">
        <SectionTitle>Mis Direcciones</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.label}
              className="border border-border rounded-xl p-5 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-brand-text">
                  {addr.label}
                </span>
                {addr.isPrimary && (
                  <span className="rounded-full bg-brand-orange text-brand-white text-[10px] font-sans font-bold tracking-wide px-2.5 py-0.5 uppercase">
                    Principal
                  </span>
                )}
              </div>
              <div className="font-sans text-sm text-muted-foreground leading-relaxed">
                <p>{addr.line1}</p>
                <p>{addr.line2}</p>
              </div>
              <button
                type="button"
                className="self-start font-sans text-xs font-bold uppercase tracking-widest text-brand-orange hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded"
              >
                Editar
              </button>
            </div>
          ))}
          <button
            type="button"
            className="border-2 border-dashed border-border rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-brand-orange hover:border-brand-orange transition-colors min-h-[120px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            aria-label="Añadir nueva dirección"
          >
            <Plus size={22} />
            <span className="font-sans text-xs font-bold uppercase tracking-widest">
              Añadir Dirección
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
