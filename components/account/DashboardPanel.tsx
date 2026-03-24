import { SectionTitle } from "./SectionTitle";

export function DashboardPanel() {
  const stats: { label: string; value: string }[] = [
    { label: "Pedidos realizados", value: "8" },
    { label: "Puntos FitFuel",     value: "1.240" },
    { label: "Última compra",      value: "12 Mar 2026" },
    { label: "Miembro desde",      value: "Ene 2024" },
  ];
  return (
    <section aria-label="Panel de control">
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col gap-6">
        <SectionTitle>Panel de Control</SectionTitle>
        <p className="font-sans text-base text-brand-text">
          ¡Bienvenido de vuelta,{" "}
          <span className="font-bold text-brand-orange">Carlos</span>!
        </p>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-secondary rounded-lg p-4 flex flex-col gap-1"
            >
              <span className="font-display text-4xl text-brand-orange leading-none">
                {s.value}
              </span>
              <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
