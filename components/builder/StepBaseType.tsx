"use client";

import Image from "next/image";
import { BuilderBaseType, baseTypeOptions } from "@/data/builder";

interface Props {
  selected: BuilderBaseType | null;
  onSelect: (type: BuilderBaseType) => void;
}

export default function StepBaseType({ selected, onSelect }: Props) {
  return (
    <div>
      <h2 className="font-playfair text-2xl text-stone-800 dark:text-stone-100 mb-2">
        Choose Your Jewellery Type
      </h2>
      <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">
        What kind of piece would you like to create?
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {baseTypeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value as BuilderBaseType)}
            className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 text-left group ${
              selected === option.value
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
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-white font-medium text-sm">{option.label}</h3>
              <p className="text-white/70 text-xs mt-0.5">{option.description}</p>
              {option.priceModifier > 0 && (
                <span className="text-white/60 text-xs">+₹{option.priceModifier}</span>
              )}
            </div>
            {selected === option.value && (
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
  );
}
