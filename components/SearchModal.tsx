"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, Product, categoryLabels, typeLabels } from "@/data/products";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        categoryLabels[p.category]?.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Search panel */}
      <div className="relative max-w-2xl mx-auto mt-20 mx-4 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-stone-100">
            <svg className="w-5 h-5 text-stone-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for rings, necklaces, earrings..."
              className="flex-1 text-stone-800 placeholder-stone-400 outline-none text-lg bg-transparent"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 hover:bg-stone-100 rounded-full transition-colors"
              >
                <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-sm text-stone-400 hover:text-stone-600 transition-colors px-2"
            >
              ESC
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query && results.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-12 h-12 text-stone-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-stone-500">No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-sm text-stone-400 mt-1">
                  Try searching for &ldquo;rings&rdquo;, &ldquo;silver&rdquo;, or &ldquo;necklace&rdquo;
                </p>
              </div>
            )}

            {!query && (
              <div className="p-6">
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-3">
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Earrings", "Necklaces", "Rings", "Bracelets", "Bestseller", "Sterling Silver"].map(
                    (term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 bg-stone-50 text-stone-600 text-sm rounded-full hover:bg-stone-100 transition-colors border border-stone-100"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {results.length > 0 && (
              <div className="p-3">
                <p className="text-xs text-stone-400 px-3 mb-2">
                  {results.length} result{results.length !== 1 ? "s" : ""}
                </p>
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 transition-colors"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-stone-800 truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-stone-400 mt-0.5">
                        {categoryLabels[product.category]} &middot;{" "}
                        {typeLabels[product.type]}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-sm font-semibold text-stone-800">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice && (
                        <span className="block text-xs text-stone-400 line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
