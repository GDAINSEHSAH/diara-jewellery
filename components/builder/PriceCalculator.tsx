"use client";

import {
  CustomJewelleryConfig,
  baseTypeOptions,
  styleOptions,
  finishOptions,
  stoneOptions,
} from "@/data/builder";

const basePrices: Record<string, number> = {
  ring: 1499,
  earring: 1799,
  necklace: 2999,
  bracelet: 2499,
  pendant: 1999,
};

interface Props {
  config: Partial<CustomJewelleryConfig>;
  price: number;
}

export default function PriceCalculator({ config, price }: Props) {
  const lines: { label: string; amount: number }[] = [];

  if (config.baseType) {
    const opt = baseTypeOptions.find((o) => o.value === config.baseType);
    lines.push({ label: `Base (${opt?.label || config.baseType})`, amount: basePrices[config.baseType] || 1499 });
  }

  if (config.style) {
    const opt = styleOptions.find((o) => o.value === config.style);
    if (opt && opt.priceModifier > 0) {
      lines.push({ label: opt.label, amount: opt.priceModifier });
    }
  }

  if (config.finish) {
    const opt = finishOptions.find((o) => o.value === config.finish);
    if (opt && opt.priceModifier > 0) {
      lines.push({ label: opt.label, amount: opt.priceModifier });
    }
  }

  if (config.stone && config.stone !== "none") {
    const opt = stoneOptions.find((o) => o.value === config.stone);
    if (opt && opt.priceModifier > 0) {
      lines.push({ label: opt.label, amount: opt.priceModifier });
    }
  }

  if (config.engraving && config.engraving.trim().length > 0) {
    lines.push({ label: "Engraving", amount: 299 });
  }

  if (lines.length === 0) {
    return (
      <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 p-5">
        <p className="text-stone-400 dark:text-stone-500 text-sm text-center">
          Start building to see pricing
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 p-5">
      <h3 className="font-medium text-stone-800 dark:text-stone-100 text-sm mb-3">Price Breakdown</h3>
      <div className="space-y-2">
        {lines.map((line) => (
          <div key={line.label} className="flex justify-between text-sm">
            <span className="text-stone-500 dark:text-stone-400">{line.label}</span>
            <span className="text-stone-700 dark:text-stone-300">₹{line.amount.toLocaleString("en-IN")}</span>
          </div>
        ))}
        <div className="border-t border-stone-100 dark:border-stone-700 pt-2 mt-2 flex justify-between">
          <span className="font-semibold text-stone-800 dark:text-stone-100">Total</span>
          <span className="font-bold text-stone-800 dark:text-stone-100 text-lg">
            ₹{price.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
}
