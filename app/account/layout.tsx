import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mi Cuenta — FitFuel",
  description:
    "Gestiona tu perfil, pedidos, direcciones y métodos de pago en tu cuenta FitFuel.",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
