"use client";

import { useMemo } from "react";
import { products, Product, categoryLabels, typeLabels } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import Image from "next/image";
import Link from "next/link";

interface ProductRecommendationsProps {
  currentProduct: Product;
}

export default function ProductRecommendations({ currentProduct }: ProductRecommendationsProps) {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  // "Frequently Bought Together" - same category, different type
  const frequentlyBought = useMemo(() => {
    return products
      .filter(
        (p) =>
          p.id !== currentProduct.id &&
          p.category === currentProduct.category &&
          p.type !== currentProduct.type &&
          p.inStock
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }, [currentProduct]);

  // "You May Also Like" - same type, any category
  const youMayLike = useMemo(() => {
    return products
      .filter(
        (p) =>
          p.id !== currentProduct.id &&
          p.type === currentProduct.type &&
          p.inStock
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }, [currentProduct]);

  const bundleTotal = useMemo(() => {
    return frequentlyBought.reduce((sum, p) => sum + p.price, 0) + currentProduct.price;
  }, [frequentlyBought, currentProduct]);

  const bundleDiscount = Math.round(bundleTotal * 0.1);

  const handleAddBundle = () => {
    frequentlyBought.forEach((p) => addToCart(p));
    addToast("success", `Added ${frequentlyBought.length} items to bag!`);
  };

  return (
    <>
      {/* Frequently Bought Together */}
      {frequentlyBought.length >= 2 && (
        <div className="mt-16 pt-12 border-t border-stone-100 dark:border-stone-700">
          <h2 className="font-playfair text-2xl md:text-3xl text-stone-800 dark:text-stone-100 text-center mb-2">
            Frequently Bought Together
          </h2>
          <p className="text-stone-400 text-center mb-8">
            Complete your look with these curated picks
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8">
              {/* Current product */}
              <div className="text-center">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-2 border-stone-800 dark:border-stone-200 mx-auto">
                  <Image
                    src={currentProduct.images[0]}
                    alt={currentProduct.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 max-w-[120px] truncate">{currentProduct.name}</p>
                <p className="text-sm font-semibold text-stone-800 dark:text-stone-100">₹{currentProduct.price.toLocaleString("en-IN")}</p>
              </div>

              {frequentlyBought.map((product, idx) => (
                <div key={product.id} className="flex items-center gap-3 md:gap-4">
                  <span className="text-xl text-stone-300 dark:text-stone-600 font-light">+</span>
                  <div className="text-center">
                    <Link href={`/products/${product.id}`}>
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-600 mx-auto hover:border-stone-400 dark:hover:border-stone-400 transition-colors">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      </div>
                    </Link>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 max-w-[120px] truncate">{product.name}</p>
                    <p className="text-sm font-semibold text-stone-800 dark:text-stone-100">₹{product.price.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              ))}

              {/* Bundle price */}
              <div className="flex items-center gap-3 md:gap-4">
                <span className="text-xl text-stone-300 dark:text-stone-600 font-light">=</span>
                <div className="text-center bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-600 rounded-xl px-4 py-3 md:px-6 md:py-4">
                  <p className="text-xs text-stone-400 mb-1">Bundle Price</p>
                  <p className="text-lg font-bold text-stone-800 dark:text-stone-100">
                    ₹{(bundleTotal - bundleDiscount).toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    Save ₹{bundleDiscount.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleAddBundle}
                className="px-8 py-3 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-800 rounded-full font-medium hover:bg-stone-700 dark:hover:bg-stone-300 transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add All to Bag
              </button>
            </div>
          </div>
        </div>
      )}

      {/* You May Also Like - same type */}
      {youMayLike.length > 0 && (
        <div className="mt-16 pt-12 border-t border-stone-100 dark:border-stone-700">
          <h2 className="font-playfair text-2xl md:text-3xl text-stone-800 dark:text-stone-100 text-center mb-2">
            More {typeLabels[currentProduct.type]} You&apos;ll Love
          </h2>
          <p className="text-stone-400 text-center mb-10">
            Similar styles handpicked for you
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {youMayLike.map((product) => (
              <RecommendationCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function RecommendationCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-50 dark:bg-stone-800 mb-3">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {product.badge && (
            <div
              className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-medium ${
                product.badge === "New"
                  ? "bg-emerald-500 text-white"
                  : product.badge === "Bestseller"
                  ? "bg-stone-800 text-white"
                  : "bg-amber-500 text-white"
              }`}
            >
              {product.badge}
            </div>
          )}
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              -{discount}%
            </div>
          )}
        </div>
      </Link>
      <div>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-medium text-stone-800 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors truncate">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-amber-400" : "text-stone-200 dark:text-stone-600"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-stone-400">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold text-stone-800 dark:text-stone-100">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-stone-400 line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
        <button
          onClick={() => {
            addToCart(product);
            addToast("success", `Added ${product.name} to bag`);
          }}
          className="mt-2 w-full py-2 text-xs font-medium rounded-full border border-stone-200 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:bg-stone-800 hover:text-white dark:hover:bg-stone-200 dark:hover:text-stone-800 hover:border-stone-800 dark:hover:border-stone-200 transition-all"
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
}
