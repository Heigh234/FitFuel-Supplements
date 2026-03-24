import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tu Carrito — FitFuel",
  description:
    "Revisa y gestiona tu carrito de compras de FitFuel. Envío gratis en todos los pedidos.",
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
