"use client";

import Image from "next/image";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";

export default function CompareBar() {
  const { items, removeFromCompare, clearCompare } = useCompare();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-sm font-medium text-stone-700 whitespace-nowrap">
              Compare ({items.length}/3):
            </span>
            <div className="flex items-center gap-2 overflow-x-auto">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-2 bg-stone-50 rounded-full pl-1 pr-3 py-1 flex-shrink-0"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-stone-100">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                  <span className="text-xs text-stone-600 max-w-[100px] truncate">
                    {product.name}
                  </span>
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="text-stone-400 hover:text-stone-600 transition-colors"
                    aria-label={`Remove ${product.name} from compare`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={clearCompare}
              className="px-4 py-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
            >
              Clear
            </button>
            {items.length >= 2 && (
              <Link
                href="/compare"
                className="px-5 py-2 bg-stone-800 text-white text-sm font-medium rounded-full hover:bg-stone-700 transition-colors"
              >
                Compare Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
