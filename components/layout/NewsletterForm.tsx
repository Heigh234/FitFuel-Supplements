"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubscribe}
      className="flex items-center"
      aria-label="Subscribe for deals"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 bg-white/10 text-nav-fg placeholder:text-nav-fg/40 font-sans text-sm px-4 py-3 rounded-l-full border border-white/10 focus:outline-none focus:border-brand-orange transition-colors"
        aria-label="Email address for newsletter"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="bg-brand-orange text-brand-white px-4 py-3 rounded-r-full hover:bg-orange-600 transition-colors flex items-center justify-center"
      >
        <ArrowRight size={18} />
      </button>
    </form>
  );
}
