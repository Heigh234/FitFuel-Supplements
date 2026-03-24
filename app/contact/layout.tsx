import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contáctanos — FitFuel",
  description:
    "Get in touch with the FitFuel team. We're here to help with orders, products, and any questions you may have.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
