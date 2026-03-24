import Link from "next/link";
import { Instagram } from "lucide-react";
import NewsletterForm from "@/components/layout/NewsletterForm";

const PAYMENT_METHODS = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"];
const LEGAL_LINKS = [
  { label: "Legal",   href: "/legal" },
  { label: "Privacy", href: "/privacy" },
  { label: "Policy",  href: "/policy" },
];

export default function Footer() {
  return (
    <footer className="bg-nav-bg text-nav-fg">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">

          {/* Left: Community */}
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-3xl tracking-widest text-nav-fg uppercase">
              Join The Community
            </h2>
            <p className="font-sans text-sm text-nav-fg/70 leading-relaxed max-w-xs">
              Follow us for daily training tips, nutrition hacks, and exclusive
              drops straight from the FitFuel squad.
            </p>
            <Link
              href="https://instagram.com/FHFuel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-orange font-sans text-sm font-semibold hover:text-orange-400 transition-colors group"
            >
              <Instagram size={18} className="group-hover:scale-110 transition-transform" />
              @FHFuel
            </Link>
          </div>

          {/* Right: Subscribe */}
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-3xl tracking-widest text-nav-fg uppercase">
              Subscribe For Deals
            </h2>
            <p className="font-sans text-sm text-nav-fg/70 leading-relaxed max-w-xs">
              Get first access to new products, exclusive promos, and members-only discounts.
            </p>
            {/* Only this subtree is a Client Component */}
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Legal links */}
          <nav className="flex items-center gap-4" aria-label="Legal navigation">
            {LEGAL_LINKS.map(({ label, href }, i) => (
              <span key={label} className="flex items-center gap-4">
                <Link
                  href={href}
                  className="font-sans text-xs text-nav-fg/60 hover:text-brand-orange transition-colors uppercase tracking-wide"
                >
                  {label}
                </Link>
                {i < LEGAL_LINKS.length - 1 && (
                  <span className="text-nav-fg/20 text-xs" aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </nav>

          {/* Payment badges */}
          <div className="flex items-center gap-2" aria-label="Accepted payment methods">
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="border border-white/20 text-nav-fg/70 text-[10px] font-sans font-semibold px-2 py-1 rounded uppercase tracking-wide"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
