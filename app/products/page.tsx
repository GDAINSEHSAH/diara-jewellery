"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { products, categoryLabels, typeLabels, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import QuickView from "@/components/QuickView";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (selectedType !== "all") {
      filtered = filtered.filter((p) => p.type === selectedType);
    }
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (a.badge === "New" ? -1 : b.badge === "New" ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) =>
          a.badge === "Bestseller" ? -1 : b.badge === "Bestseller" ? 1 : 0
        );
    }

    return filtered;
  }, [selectedCategory, selectedType, sortBy, priceRange]);

  const categories = ["all", ...Object.keys(categoryLabels)];
  const types = ["all", ...Object.keys(typeLabels)];

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedType("all");
    setPriceRange([0, 15000]);
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedType !== "all" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 15000;

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-stone-900">
      {/* Header spacer */}
      <div className="h-20" />

      {/* Breadcrumb + Title */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-6">
        <nav className="flex items-center gap-2 text-sm text-stone-400 mb-6">
          <Link href="/" className="hover:text-stone-600 transition-colors">
            Home
          </Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-stone-600">Shop</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="font-playfair text-3xl md:text-4xl text-stone-800 dark:text-stone-100">
              Our Collection
            </h1>
            <p className="text-stone-500 mt-2">
              {filteredProducts.length} piece{filteredProducts.length !== 1 ? "s" : ""} of
              handcrafted elegance
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-stone-200 rounded-full text-sm text-stone-600 hover:bg-stone-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-stone-800" />
              )}
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2.5 border border-stone-200 dark:border-stone-600 rounded-full text-sm text-stone-600 dark:text-stone-300 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="flex gap-8">
          {/* Sidebar filters (desktop) */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-64 flex-shrink-0`}
          >
            <div className="lg:sticky lg:top-24 space-y-6 pb-8 lg:pb-0">
              {/* Category filter */}
              <div>
                <h3 className="text-sm font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-3">
                  Collection
                </h3>
                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat
                          ? "bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-800"
                          : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
                      }`}
                    >
                      {cat === "all" ? "All Collections" : categoryLabels[cat]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type filter */}
              <div>
                <h3 className="text-sm font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-3">
                  Type
                </h3>
                <div className="space-y-1.5">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedType === type
                          ? "bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-800"
                          : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
                      }`}
                    >
                      {type === "all" ? "All Types" : typeLabels[type]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <h3 className="text-sm font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-3">
                  Price Range
                </h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min={0}
                    max={15000}
                    step={500}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full accent-stone-800"
                  />
                  <div className="flex justify-between text-sm text-stone-500">
                    <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
                    <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Clear */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2.5 text-sm text-stone-500 hover:text-stone-700 border border-stone-200 rounded-full transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <svg className="w-16 h-16 text-stone-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-medium text-stone-600 mb-2">
                  No products found
                </h3>
                <p className="text-stone-400 mb-6">
                  Try adjusting your filters to find what you&apos;re looking for
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-stone-800 text-white text-sm rounded-full hover:bg-stone-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <QuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
