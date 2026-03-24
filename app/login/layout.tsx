import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión — FitFuel",
  description:
    "Sign in to your FitFuel account to track orders, access exclusive deals, and manage your profile.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
