"use client";

import { useState } from "react";
import { ZodiacSign, elementColors } from "@/data/zodiac";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import QuickView from "@/components/QuickView";

interface Props {
  sign: ZodiacSign;
}

export default function ZodiacDetail({ sign }: Props) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const colors = elementColors[sign.element];

  const recommended = sign.productRecommendations
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => !!p);

  return (
    <div className={`rounded-3xl border-2 ${colors.border} overflow-hidden`}>
      {/* Sign Info */}
      <div className={`${colors.bg} p-8 md:p-10`}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="text-6xl">{sign.symbol}</div>
          <div className="text-center md:text-left">
            <h2 className="font-playfair text-3xl text-stone-800 mb-2">{sign.name}</h2>
            <p className="text-stone-500 text-sm mb-4">{sign.dateRange}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {sign.traits.map((trait) => (
                <span
                  key={trait}
                  className="text-xs px-3 py-1 bg-white/80 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 rounded-full"
                >
                  {trait}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-stone-600 justify-center md:justify-start">
              <span>
                <span className="text-stone-400">Birthstone:</span>{" "}
                <span className="font-medium">{sign.birthstone}</span>
              </span>
              <span>
                <span className="text-stone-400">Lucky Color:</span>{" "}
                <span className="font-medium">{sign.luckyColor}</span>
              </span>
              <span>
                <span className="text-stone-400">Element:</span>{" "}
                <span className={`font-medium capitalize ${colors.text}`}>{sign.element}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="p-8 md:p-10 bg-white dark:bg-stone-800">
        <h3 className="font-playfair text-xl text-stone-800 dark:text-stone-100 mb-6">
          Recommended for {sign.name}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </div>

      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
