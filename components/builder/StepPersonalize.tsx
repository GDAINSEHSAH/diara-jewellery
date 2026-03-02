"use client";

import Image from "next/image";
import { BuilderStone, stoneOptions } from "@/data/builder";

interface Props {
  stone: BuilderStone | null;
  onSelectStone: (stone: BuilderStone) => void;
  engraving: string;
  onEngravingChange: (text: string) => void;
}

export default function StepPersonalize({ stone, onSelectStone, engraving, onEngravingChange }: Props) {
  const maxChars = 20;

  return (
    <div className="space-y-8">
      {/* Stone Selection */}
      <div>
        <h2 className="font-playfair text-2xl text-stone-800 dark:text-stone-100 mb-2">
          Add a Stone
        </h2>
        <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">
          Choose a gemstone accent (or keep it simple)
        </p>
        <div className="grid grid-cols-3 gap-4">
          {stoneOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onSelectStone(option.value as BuilderStone)}
              className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 text-left group ${
                stone === option.value
                  ? "border-stone-800 ring-2 ring-stone-800 dark:border-stone-100 dark:ring-stone-100"
                  : "border-stone-200 dark:border-stone-700 hover:border-stone-400"
              }`}
            >
              <div className="relative aspect-square">
                <Image
                  src={option.image}
                  alt={option.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white font-medium text-sm">{option.label}</h3>
                {option.priceModifier > 0 && (
                  <span className="text-white/60 text-xs">+₹{option.priceModifier}</span>
                )}
              </div>
              {stone === option.value && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-stone-800 dark:bg-white rounded-full flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white dark:text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Engraving */}
      <div>
        <h2 className="font-playfair text-2xl text-stone-800 dark:text-stone-100 mb-2">
          Add Engraving
        </h2>
        <p className="text-stone-500 dark:text-stone-400 text-sm mb-4">
          Optional — add a personal message (+₹299)
        </p>
        <div className="relative">
          <input
            type="text"
            value={engraving}
            onChange={(e) => {
              if (e.target.value.length <= maxChars) {
                onEngravingChange(e.target.value);
              }
            }}
            placeholder="e.g. Forever Yours"
            className="w-full px-4 py-3 border border-stone-200 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-800 dark:focus:ring-stone-100 transition-all"
          />
          <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs ${
            engraving.length >= maxChars ? "text-red-500" : "text-stone-400"
          }`}>
            {engraving.length}/{maxChars}
          </span>
        </div>
      </div>
    </div>
  );
}
