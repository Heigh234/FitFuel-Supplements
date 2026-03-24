"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/app/context/AuthContext";

import { DashboardPanel } from "@/components/account/DashboardPanel";
import { OrdersPanel } from "@/components/account/OrdersPanel";
import { AddressesPanel } from "@/components/account/AddressesPanel";
import { PaymentsPanel } from "@/components/account/PaymentsPanel";
import { AccountDetailsPanel } from "@/components/account/AccountDetailsPanel";

// ─── Types ───────────────────────────────────────────────────────────────────

type MenuKey =
  | "dashboard"
  | "orders"
  | "addresses"
  | "payments"
  | "account";

interface MenuItem {
  key: MenuKey;
  label: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MENU_ITEMS: MenuItem[] = [
  { key: "dashboard", label: "PANEL DE CONTROL" },
  { key: "orders",    label: "MIS PEDIDOS" },
  { key: "addresses", label: "MIS DIRECCIONES" },
  { key: "payments",  label: "MÉTODOS DE PAGO" },
  { key: "account",   label: "DETALLES DE LA CUENTA" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const [activeKey, setActiveKey] = useState<MenuKey>("account");
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  // Server-level protection is handled by proxy.ts (httpOnly cookie check).
  // This client-side guard is a UI-layer defence-in-depth fallback.
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  // Prevent rendering the account UI before auth is confirmed.
  if (!isAuthenticated) return null;

  return (
    <>
      {/* Hero */}
      <div className="relative h-[220px] md:h-[280px] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dsejihoyr/image/upload/v1773716251/ChatGPT_Image_Mar_16_2026_09_13_14_PM_mpedif.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-brand-dark/70" aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="font-display text-5xl md:text-7xl tracking-widest text-brand-white uppercase">
            MI CUENTA
          </h1>
          <div className="w-16 h-1 bg-brand-orange rounded-full mx-auto mt-3" aria-hidden="true" />
        </div>
      </div>

      {/* Main */}
      <main className="bg-brand-light min-h-screen py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">

          {/* Sidebar */}
          <div className="w-full lg:w-[260px] flex-shrink-0 lg:sticky lg:top-24">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="bg-brand-dark px-5 py-4">
                <p className="font-display text-xl tracking-widest text-brand-white uppercase">
                  MI MENÚ
                </p>
              </div>

              <nav aria-label="Account navigation">
                <ul className="divide-y divide-border">
                  {MENU_ITEMS.map(({ key, label }) => {
                    const isActive = activeKey === key;
                    return (
                      <li key={key}>
                        <button
                          type="button"
                          onClick={() => setActiveKey(key)}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "w-full flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-orange",
                            isActive
                              ? "text-brand-orange bg-brand-orange/5 border-l-2 border-brand-orange"
                              : "text-muted-foreground hover:text-brand-orange hover:bg-secondary border-l-2 border-transparent"
                          )}
                        >
                          <CheckCircle2
                            size={15}
                            className={cn(
                              "flex-shrink-0",
                              isActive ? "text-brand-orange" : "text-muted-foreground"
                            )}
                          />
                          <span className="font-sans text-sm font-semibold tracking-widest uppercase">
                            {label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Logout */}
              <div className="border-t border-border px-5 py-4">
                <button
                  type="button"
                  onClick={async () => {
                    await logout();
                    router.replace("/login");
                  }}
                  className="flex items-center gap-2 text-sm font-sans font-semibold text-muted-foreground hover:text-red-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
                >
                  <LogOut size={15} />
                  <span className="uppercase tracking-widest">CERRAR SESIÓN</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right panel — only the active panel is mounted */}
          <div className="flex-1 min-w-0">
            {activeKey === "dashboard"  && <DashboardPanel />}
            {activeKey === "orders"     && <OrdersPanel />}
            {activeKey === "addresses"  && <AddressesPanel />}
            {activeKey === "payments"   && <PaymentsPanel />}
            {activeKey === "account"    && <AccountDetailsPanel />}
          </div>
        </div>
      </main>
    </>
  );
}
