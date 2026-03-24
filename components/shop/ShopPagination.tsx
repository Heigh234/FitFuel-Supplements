"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface ShopPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ShopPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ShopPaginationProps) {
  if (totalPages <= 1) return null;

  function getPages(): (number | "...")[] {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }

  const pages = getPages();

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1.5 pt-10"
    >
      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-2 text-sm text-muted-foreground font-sans select-none"
          >
            ·
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            aria-current={currentPage === page ? "page" : undefined}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-md text-sm font-sans font-semibold transition-colors border",
              currentPage === page
                ? "bg-brand-orange border-brand-orange text-brand-white"
                : "bg-background border-border text-foreground hover:border-brand-orange hover:text-brand-orange"
            )}
          >
            {page}
          </button>
        )
      )}

      {/* Siguiente */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center gap-1 px-3 h-9 rounded-md text-sm font-sans font-semibold border transition-colors",
          currentPage === totalPages
            ? "border-border text-muted-foreground cursor-not-allowed opacity-50"
            : "border-border text-foreground hover:border-brand-orange hover:text-brand-orange"
        )}
        aria-label="Next page"
      >
        Siguiente
        <ChevronRight size={14} />
      </button>
    </nav>
  );
}
