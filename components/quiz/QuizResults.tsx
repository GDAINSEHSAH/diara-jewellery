"use client";

import { useState } from "react";
import { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import QuickView from "@/components/QuickView";

interface Props {
  products: Product[];
  onRetake: () => void;
}

export default function QuizResults({ products, onRetake }: Props) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("QUIZLOVE").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">&#x1F389;</div>
        <h2 className="font-playfair text-3xl md:text-4xl text-stone-800 dark:text-stone-100 mb-3">
          Your Perfect Matches
        </h2>
        <p className="text-stone-500 dark:text-stone-400 max-w-lg mx-auto">
          Based on your style profile, we think you&apos;ll love these pieces
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={setQuickViewProduct}
          />
        ))}
      </div>

      {/* Coupon Reveal */}
      <div className="max-w-md mx-auto bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-8 text-center text-white">
        <div className="text-3xl mb-3">&#x1F381;</div>
        <h3 className="font-playfair text-xl mb-2">A Gift for You!</h3>
        <p className="text-stone-300 text-sm mb-5">
          Use this exclusive code for 10% off your next order
        </p>
        <div className="flex items-center justify-center gap-3">
          <code className="bg-white/10 px-6 py-3 rounded-lg text-lg font-mono font-bold tracking-wider">
            QUIZLOVE
          </code>
          <button
            onClick={handleCopy}
            className="px-4 py-3 bg-white text-stone-800 text-sm font-medium rounded-lg hover:bg-stone-100 transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-stone-400 text-xs mt-3">Min. order ₹999 · Up to ₹500 off</p>
      </div>

      {/* Retake */}
      <div className="text-center mt-8">
        <button
          onClick={onRetake}
          className="px-8 py-3 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 font-medium rounded-full hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-sm"
        >
          Retake Quiz
        </button>
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
