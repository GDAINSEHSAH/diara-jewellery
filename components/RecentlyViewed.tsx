"use client";

import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import QuickView from "@/components/QuickView";

interface RecentlyViewedProps {
  excludeId?: string;
}

export default function RecentlyViewed({ excludeId }: RecentlyViewedProps) {
  const { recentIds } = useRecentlyViewed();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const recentProducts = recentIds
    .filter((id) => id !== excludeId)
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  if (recentProducts.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-stone-100">
      <h2 className="font-playfair text-2xl md:text-3xl text-stone-800 text-center mb-2">
        Recently Viewed
      </h2>
      <p className="text-stone-400 text-center mb-10">
        Continue where you left off
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProducts.slice(0, 4).map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onQuickView={setQuickViewProduct}
          />
        ))}
      </div>
      <QuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
