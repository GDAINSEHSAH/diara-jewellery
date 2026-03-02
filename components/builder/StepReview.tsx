"use client";

import Link from "next/link";
import { CustomJewelleryConfig, baseTypeOptions, styleOptions, finishOptions, stoneOptions } from "@/data/builder";

interface Props {
  config: CustomJewelleryConfig;
  price: number;
  onAddToCart: () => void;
  added: boolean;
  onReset: () => void;
}

export default function StepReview({ config, price, onAddToCart, added, onReset }: Props) {
  const getLabel = (options: { value: string; label: string }[], value: string) =>
    options.find((o) => o.value === value)?.label || value;

  const rows = [
    { label: "Type", value: getLabel(baseTypeOptions, config.baseType) },
    { label: "Style", value: getLabel(styleOptions, config.style) },
    { label: "Finish", value: getLabel(finishOptions, config.finish) },
    { label: "Stone", value: getLabel(stoneOptions, config.stone) },
  ];

  if (config.engraving) {
    rows.push({ label: "Engraving", value: `"${config.engraving}"` });
  }

  return (
    <div>
      <h2 className="font-playfair text-2xl text-stone-800 dark:text-stone-100 mb-2">
        Review Your Design
      </h2>
      <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">
        Here&apos;s a summary of your custom piece
      </p>

      <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
        <div className="divide-y divide-stone-100 dark:divide-stone-700">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between px-5 py-3.5">
              <span className="text-stone-500 dark:text-stone-400 text-sm">{row.label}</span>
              <span className="text-stone-800 dark:text-stone-100 font-medium text-sm">{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between px-5 py-4 bg-stone-50 dark:bg-stone-700/50">
            <span className="text-stone-800 dark:text-stone-100 font-semibold">Total</span>
            <span className="text-stone-800 dark:text-stone-100 font-bold text-lg">
              ₹{price.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {!added ? (
          <button
            onClick={onAddToCart}
            className="w-full py-3.5 bg-stone-800 text-white font-medium rounded-full hover:bg-stone-700 transition-colors text-sm tracking-wide"
          >
            Add to Bag — ₹{price.toLocaleString("en-IN")}
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 py-3.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full font-medium text-sm">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Added to Bag!
            </div>
            <div className="flex gap-3">
              <Link
                href="/checkout"
                className="flex-1 py-3 bg-stone-800 text-white font-medium rounded-full hover:bg-stone-700 transition-colors text-sm text-center"
              >
                Checkout
              </Link>
              <button
                onClick={onReset}
                className="flex-1 py-3 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 font-medium rounded-full hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-sm"
              >
                Design Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
