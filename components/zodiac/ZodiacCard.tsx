"use client";

import { ZodiacSign, elementColors } from "@/data/zodiac";

interface Props {
  sign: ZodiacSign;
  isSelected: boolean;
  isUserSign: boolean;
  onClick: () => void;
}

export default function ZodiacCard({ sign, isSelected, isUserSign, onClick }: Props) {
  const colors = elementColors[sign.element];

  return (
    <button
      onClick={onClick}
      className={`relative p-5 rounded-2xl border-2 transition-all duration-300 text-center group hover:shadow-lg ${
        isSelected
          ? "border-stone-800 dark:border-stone-100 shadow-lg scale-[1.02]"
          : isUserSign
            ? "border-amber-400 shadow-amber-100"
            : "border-stone-200 dark:border-stone-700 hover:border-stone-400"
      }`}
    >
      {isUserSign && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap">
          Your Sign
        </div>
      )}
      <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
        {sign.symbol}
      </div>
      <h3 className="font-playfair text-stone-800 dark:text-stone-100 font-medium">{sign.name}</h3>
      <p className="text-xs text-stone-400 mt-1">{sign.dateRange}</p>
      <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
        {sign.element}
      </span>
    </button>
  );
}
