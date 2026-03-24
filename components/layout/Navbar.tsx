"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, UserCircle, ShoppingCart, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import SearchBar from "@/components/layout/SearchBar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-nav-bg text-nav-fg shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0" aria-label="FitFuel Home">
              <Image
                src="https://res.cloudinary.com/dsejihoyr/image/upload/v1773816279/logo-fondo-removido_dbv82c.webp"
                alt="FitFuel"
                width={140}
                height={40}
                loading="eager"
                fetchPriority="high"
                style={{ width: 140, height: "auto" }}
              />
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={label}
                    href={href}
                    className={cn(
                      "relative font-sans text-xs font-semibold tracking-widest uppercase transition-colors duration-200 pb-1",
                      isActive
                        ? "text-brand-orange after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-orange after:rounded-full"
                        : "text-nav-fg hover:text-brand-orange"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Search + Icons */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Desktop search bar */}
              <SearchBar className="hidden sm:block" />

              {/* User icon / dropdown */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      aria-label="Mi Cuenta"
                      className="hidden sm:flex items-center gap-1.5 p-1.5 rounded-full hover:bg-white/10 transition-colors text-nav-fg text-xs font-sans font-semibold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                    >
                      <User size={18} />
                      <span className="hidden lg:inline">Mi Cuenta</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="w-44 bg-[#111111] border border-white/10 rounded-xl shadow-2xl p-1"
                  >
                    <DropdownMenuItem asChild className="hover:bg-white/10 hover:text-brand-orange focus:bg-white/10 focus:text-brand-orange rounded-lg cursor-pointer">
                      <Link href="/account" className="flex items-center gap-2 px-2 py-2">
                        <UserCircle size={15} />
                        <span className="font-sans text-sm font-semibold text-white">Mi Cuenta</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-2 py-2 hover:bg-red-500/10 hover:text-red-400 focus:bg-red-500/10 focus:text-red-400 rounded-lg cursor-pointer text-red-400"
                    >
                      <LogOut size={15} />
                      <span className="font-sans text-sm font-semibold">Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href="/login"
                  aria-label="Iniciar Sesión"
                  title="Iniciar Sesión"
                  className="hidden sm:flex items-center gap-1.5 p-1.5 rounded-full hover:bg-white/10 transition-colors text-nav-fg text-xs font-sans font-semibold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                >
                  <User size={18} />
                  <span className="hidden lg:inline">Iniciar Sesión</span>
                </Link>
              )}

              {/* Cart icon */}
              <button
                onClick={openCart}
                aria-label={`Shopping cart, ${cartCount} items`}
                className="relative p-1.5 rounded-full hover:bg-white/10 transition-colors text-nav-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-1 -right-1 bg-brand-orange text-brand-white text-[9px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none"
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="md:hidden p-1.5 rounded-full hover:bg-white/10 transition-colors text-nav-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-dark/70 md:hidden"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-72 bg-nav-bg text-nav-fg flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 flex-shrink-0">
          <Link href="/" aria-label="FitFuel Home" onClick={() => setMobileOpen(false)}>
            <Image
              src="https://res.cloudinary.com/dsejihoyr/image/upload/v1773786504/ChatGPT_Image_Mar_17_2026_11_05_37_AM_o7p1kz.png"
              alt="FitFuel"
              width={110}
              height={32}
              style={{ width: 110, height: "auto" }}
            />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar menú"
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer nav links */}
        <div className="flex flex-col flex-1 px-5 py-6 gap-1 overflow-y-auto">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "font-sans font-semibold text-sm tracking-widest uppercase py-3.5 px-4 rounded-lg transition-colors",
                  isActive
                    ? "bg-brand-orange text-brand-white"
                    : "text-nav-fg hover:bg-white/10"
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Drawer footer: search + auth */}
        <div className="px-5 pb-8 flex flex-col gap-3 border-t border-white/10 pt-5">
          <SearchBar fullWidth popupDirection="up" className="w-full" />

          {isAuthenticated ? (
            <>
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 font-sans text-sm font-semibold tracking-wide text-nav-fg hover:text-brand-orange transition-colors px-1"
              >
                <UserCircle size={16} />
                Mi Cuenta
              </Link>
              <button
                onClick={async () => {
                  setMobileOpen(false);
                  await handleLogout();
                }}
                className="flex items-center gap-2 font-sans text-sm font-semibold tracking-wide text-nav-fg hover:text-brand-orange transition-colors px-1"
              >
                <LogOut size={16} />
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 font-sans text-sm font-semibold tracking-wide text-nav-fg hover:text-brand-orange transition-colors px-1"
            >
              <User size={16} />
              Iniciar Sesión
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
