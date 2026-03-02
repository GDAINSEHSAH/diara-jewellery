"use client";

import { useState, useEffect } from "react";
import {
  BuilderBaseType,
  BuilderStyle,
  BuilderFinish,
  BuilderStone,
  CustomJewelleryConfig,
  calculateBuilderPrice,
} from "@/data/builder";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import BuilderStepIndicator from "@/components/builder/BuilderStepIndicator";
import StepBaseType from "@/components/builder/StepBaseType";
import StepStyle from "@/components/builder/StepStyle";
import StepFinish from "@/components/builder/StepFinish";
import StepPersonalize from "@/components/builder/StepPersonalize";
import StepReview from "@/components/builder/StepReview";
import BuilderPreview from "@/components/builder/BuilderPreview";
import PriceCalculator from "@/components/builder/PriceCalculator";

const STORAGE_KEY = "diara-builder-draft";

export default function BuilderPage() {
  const [step, setStep] = useState(1);
  const [baseType, setBaseType] = useState<BuilderBaseType | null>(null);
  const [style, setStyle] = useState<BuilderStyle | null>(null);
  const [finish, setFinish] = useState<BuilderFinish | null>(null);
  const [stone, setStone] = useState<BuilderStone | null>(null);
  const [engraving, setEngraving] = useState("");
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();
  const { addToast } = useToast();

  // Load draft from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const draft = JSON.parse(saved);
        if (draft.baseType) setBaseType(draft.baseType);
        if (draft.style) setStyle(draft.style);
        if (draft.finish) setFinish(draft.finish);
        if (draft.stone) setStone(draft.stone);
        if (draft.engraving) setEngraving(draft.engraving);
        if (draft.step) setStep(draft.step);
      }
    } catch {}
  }, []);

  // Save draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ baseType, style, finish, stone, engraving, step })
      );
    } catch {}
  }, [baseType, style, finish, stone, engraving, step]);

  const config: Partial<CustomJewelleryConfig> = {
    baseType: baseType || undefined,
    style: style || undefined,
    finish: finish || undefined,
    stone: stone || undefined,
    engraving,
  };

  const price = baseType ? calculateBuilderPrice(config) : 0;

  const canProceed = () => {
    switch (step) {
      case 1: return !!baseType;
      case 2: return !!style;
      case 3: return !!finish;
      case 4: return !!stone;
      case 5: return true;
      default: return false;
    }
  };

  const handleAddToCart = () => {
    if (!baseType || !style || !finish || !stone) return;

    const fullConfig: CustomJewelleryConfig = {
      baseType,
      style,
      finish,
      stone,
      engraving: engraving.trim(),
    };

    const customProduct = {
      id: `custom-${Date.now()}`,
      name: `Custom ${baseType.charAt(0).toUpperCase() + baseType.slice(1)} - ${style.charAt(0).toUpperCase() + style.slice(1)}`,
      price,
      description: `Custom designed ${style} ${baseType} with ${finish} finish${stone !== "none" ? ` and ${stone}` : ""}${engraving ? `, engraved: "${engraving}"` : ""}.`,
      shortDescription: `Custom ${style} ${baseType}`,
      category: "everyday" as const,
      type: baseType as "ring" | "earring" | "necklace" | "bracelet" | "pendant",
      material: "925 Sterling Silver",
      images: [
        "https://images.unsplash.com/photo-1611012670415-a770b4f47c47?w=800&q=80&fit=crop",
      ],
      inStock: true,
      rating: 5.0,
      reviews: 0,
    };

    addToCart(customProduct, fullConfig);
    addToast("success", "Custom piece added to your bag!");
    setAdded(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleReset = () => {
    setStep(1);
    setBaseType(null);
    setStyle(null);
    setFinish(null);
    setStone(null);
    setEngraving("");
    setAdded(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-stone-900">
      <div className="h-20" />

      {/* Hero */}
      <div className="bg-gradient-to-b from-stone-100 dark:from-stone-800 to-[#FDFBF7] dark:to-stone-900 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl text-stone-800 dark:text-stone-100 mb-3">
            Design Your Piece
          </h1>
          <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
            Create a one-of-a-kind silver jewellery piece, crafted just for you
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <BuilderStepIndicator currentStep={step} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Steps Column */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <StepBaseType selected={baseType} onSelect={setBaseType} />
            )}
            {step === 2 && (
              <StepStyle selected={style} onSelect={setStyle} />
            )}
            {step === 3 && (
              <StepFinish selected={finish} onSelect={setFinish} />
            )}
            {step === 4 && (
              <StepPersonalize
                stone={stone}
                onSelectStone={setStone}
                engraving={engraving}
                onEngravingChange={setEngraving}
              />
            )}
            {step === 5 && (
              <StepReview
                config={config as CustomJewelleryConfig}
                price={price}
                onAddToCart={handleAddToCart}
                added={added}
                onReset={handleReset}
              />
            )}

            {/* Navigation */}
            {step < 5 && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="px-6 py-3 text-sm font-medium text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 rounded-full hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep((s) => Math.min(5, s + 1))}
                  disabled={!canProceed()}
                  className="px-8 py-3 text-sm font-medium bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next Step
                </button>
              </div>
            )}
          </div>

          {/* Preview Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <BuilderPreview config={config} />
              <PriceCalculator config={config} price={price} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
