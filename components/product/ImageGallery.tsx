import Image from "next/image";
import type { Product } from "@/types";

interface ImageGalleryProps {
  product: Product;
}

export default function ImageGallery({ product }: ImageGalleryProps) {
  return (
    <div className="w-full aspect-square rounded-xl overflow-hidden bg-white border border-border flex items-center justify-center">
      {/* LCP candidate on the product detail page — load immediately */}
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        loading="eager"
        fetchPriority="high"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
