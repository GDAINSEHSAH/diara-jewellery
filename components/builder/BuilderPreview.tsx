"use client";

import Image from "next/image";
import {
  CustomJewelleryConfig,
  previewImages,
  baseTypeOptions,
  styleOptions,
  finishOptions,
  stoneOptions,
} from "@/data/builder";

interface Props {
  config: Partial<CustomJewelleryConfig>;
}

export default function BuilderPreview({ config }: Props) {
  const imageKey = config.baseType && config.style
    ? `${config.baseType}-${config.style}`
    : config.baseType
      ? `${config.baseType}-minimalist`
      : null;

  const imageSrc = imageKey
    ? previewImages[imageKey] || previewImages["ring-minimalist"]
    : null;

  const getLabel = (options: { value: string; label: string }[], value?: string) =>
    value ? options.find((o) => o.value === value)?.label || null : null;

  const selections = [
    { label: "Type", value: getLabel(baseTypeOptions, config.baseType) },
    { label: "Style", value: getLabel(styleOptions, config.style) },
    { label: "Finish", value: getLabel(finishOptions, config.finish) },
    { label: "Stone", value: getLabel(stoneOptions, config.stone) },
  ].filter((s) => s.value);

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
      <div className="relative aspect-square bg-stone-100 dark:bg-stone-700">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="Preview"
            fill
            className="object-cover transition-all duration-500"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-stone-400 dark:text-stone-500">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Select options to preview</p>
            </div>
          </div>
        )}
      </div>
      {selections.length > 0 && (
        <div className="p-4 space-y-2">
          <h3 className="font-medium text-stone-800 dark:text-stone-100 text-sm">Your Selections</h3>
          <div className="flex flex-wrap gap-2">
            {selections.map((s) => (
              <span
                key={s.label}
                className="text-xs px-2.5 py-1 bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 rounded-full"
              >
                {s.value}
              </span>
            ))}
            {config.engraving && (
              <span className="text-xs px-2.5 py-1 bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 rounded-full">
                &ldquo;{config.engraving}&rdquo;
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
