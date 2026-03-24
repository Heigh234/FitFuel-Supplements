"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface FitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const FitButton = forwardRef<HTMLButtonElement, FitButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:opacity-50 disabled:cursor-not-allowed",
          // Sizes
          size === "sm" && "px-4 py-2 text-xs",
          size === "md" && "px-6 py-3 text-sm",
          size === "lg" && "px-8 py-4 text-base",
          // Variants
          variant === "primary" &&
            "bg-brand-orange text-brand-white hover:bg-orange-600 active:scale-95",
          variant === "secondary" &&
            "bg-transparent text-brand-orange border-2 border-brand-orange hover:bg-brand-orange hover:text-brand-white active:scale-95",
          // Full width
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

FitButton.displayName = "FitButton";

export default FitButton;
