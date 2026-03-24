import { CreditCard, Plus } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

export function PaymentsPanel() {
  const cards = [
    { id: 1, brand: "Visa",       last4: "4242", expires: "09/27", isDefault: true  },
    { id: 2, brand: "Mastercard", last4: "8310", expires: "12/25", isDefault: false },
  ];
  return (
    <section aria-label="Métodos de pago">
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col gap-6">
        <SectionTitle>Métodos de Pago</SectionTitle>
        <div className="flex flex-col gap-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="border border-border rounded-xl px-5 py-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <CreditCard size={20} className="text-brand-text" />
              </div>
              <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-sm font-bold text-brand-text">
                    {card.brand} ···· {card.last4}
                  </span>
                  {card.isDefault && (
                    <span className="rounded-full bg-brand-orange text-brand-white text-[10px] font-sans font-bold tracking-wide px-2.5 py-0.5 uppercase">
                      Principal
                    </span>
                  )}
                </div>
                <span className="font-sans text-xs text-muted-foreground">
                  Caduca {card.expires}
                </span>
              </div>
              <button
                type="button"
                aria-label={`Eliminar tarjeta ${card.brand} terminada en ${card.last4}`}
                className="font-sans text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded flex-shrink-0"
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            className="border-2 border-dashed border-border rounded-xl px-5 py-4 flex items-center justify-center gap-2 text-brand-orange hover:border-brand-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            aria-label="Añadir nuevo método de pago"
          >
            <Plus size={18} />
            <span className="font-sans text-xs font-bold uppercase tracking-widest">
              Añadir Método de Pago
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
