"use client";

import { Product } from "@/data/products";
import { useCompare } from "@/context/CompareContext";
import { useToast } from "@/context/ToastContext";

interface CompareButtonProps {
  product: Product;
  variant?: "icon" | "full";
}

export default function CompareButton({ product, variant = "icon" }: CompareButtonProps) {
  const { addToCompare, removeFromCompare, isInCompare, items } = useCompare();
  const { addToast } = useToast();
  const inCompare = isInCompare(product.id);

  const handleToggle = () => {
    if (inCompare) {
      removeFromCompare(product.id);
      addToast("info", `Removed ${product.name} from compare`);
    } else {
      if (items.length >= 3) {
        addToast("error", "You can compare up to 3 products at a time");
        return;
      }
      addToCompare(product);
      addToast("success", `Added ${product.name} to compare`);
    }
  };

  if (variant === "full") {
    return (
      <button
        onClick={handleToggle}
        className={`w-full py-4 rounded-full font-medium tracking-wide transition-all duration-300 border flex items-center justify-center gap-2 ${
          inCompare
            ? "border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100"
            : "border-stone-200 text-stone-600 hover:bg-stone-50"
        }`}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        {inCompare ? "Added to Compare" : "Compare"}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`p-2.5 rounded-xl transition-colors border ${
        inCompare
          ? "bg-blue-50 border-blue-200 text-blue-600"
          : "bg-white/90 backdrop-blur-sm text-stone-700 border-stone-200 hover:bg-white"
      }`}
      aria-label={inCompare ? "Remove from compare" : "Add to compare"}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    </button>
  );
}
