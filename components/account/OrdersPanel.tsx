import { cn } from "@/lib/utils";
import { SectionTitle } from "./SectionTitle";
import { ORDERS } from "@/lib/data/orders";

export function OrdersPanel() {
  return (
    <section aria-label="Mis pedidos">
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col gap-6">
        <SectionTitle>Mis Pedidos</SectionTitle>
        <div className="flex flex-col divide-y divide-border">
          {ORDERS.map((order) => (
            <div
              key={order.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-xs font-bold tracking-widest uppercase text-muted-foreground">
                  {order.id}
                </span>
                <span className="font-sans text-sm font-semibold text-brand-text">
                  {order.items}
                </span>
                <span className="font-sans text-xs text-muted-foreground">
                  {order.date}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="font-sans text-sm font-bold text-brand-text">
                  {order.total}
                </span>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-sans font-bold tracking-wide",
                    order.statusColor === "green"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-brand-orange/10 text-brand-orange border border-brand-orange/30"
                  )}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
