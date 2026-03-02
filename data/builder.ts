export type BuilderBaseType = "ring" | "earring" | "necklace" | "bracelet" | "pendant";
export type BuilderStyle = "minimalist" | "statement" | "vintage" | "modern";
export type BuilderFinish = "polished" | "matte" | "oxidized" | "rosegold";
export type BuilderStone = "cz" | "pearl" | "none";

export interface BuilderOption {
  value: string;
  label: string;
  description: string;
  image: string;
  priceModifier: number;
}

export interface CustomJewelleryConfig {
  baseType: BuilderBaseType;
  style: BuilderStyle;
  finish: BuilderFinish;
  stone: BuilderStone;
  engraving: string;
}

export const baseTypeOptions: BuilderOption[] = [
  {
    value: "ring",
    label: "Ring",
    description: "A beautiful band for your finger",
    image: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=400&q=80&fit=crop",
    priceModifier: 0,
  },
  {
    value: "earring",
    label: "Earrings",
    description: "Elegant pair for your ears",
    image: "https://images.unsplash.com/photo-1602272385319-1dbf089994cf?w=400&q=80&fit=crop",
    priceModifier: 200,
  },
  {
    value: "necklace",
    label: "Necklace",
    description: "A stunning chain for your neckline",
    image: "https://images.unsplash.com/photo-1611012670415-a770b4f47c47?w=400&q=80&fit=crop",
    priceModifier: 500,
  },
  {
    value: "bracelet",
    label: "Bracelet",
    description: "A charming piece for your wrist",
    image: "https://images.unsplash.com/photo-1564408000522-05af709fdd09?w=400&q=80&fit=crop",
    priceModifier: 300,
  },
  {
    value: "pendant",
    label: "Pendant",
    description: "A delicate hanging charm",
    image: "https://images.unsplash.com/photo-1611078560771-fe74f0a773d5?w=400&q=80&fit=crop",
    priceModifier: 100,
  },
];

export const styleOptions: BuilderOption[] = [
  {
    value: "minimalist",
    label: "Minimalist",
    description: "Clean lines, understated elegance",
    image: "https://images.unsplash.com/photo-1611012670415-a770b4f47c47?w=400&q=80&fit=crop",
    priceModifier: 0,
  },
  {
    value: "statement",
    label: "Statement",
    description: "Bold & eye-catching design",
    image: "https://images.unsplash.com/photo-1638734205377-f21045bf6ebe?w=400&q=80&fit=crop",
    priceModifier: 400,
  },
  {
    value: "vintage",
    label: "Vintage",
    description: "Classic old-world charm",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400&q=80&fit=crop",
    priceModifier: 300,
  },
  {
    value: "modern",
    label: "Modern",
    description: "Contemporary geometric patterns",
    image: "https://images.unsplash.com/photo-1601544737793-0d21af535968?w=400&q=80&fit=crop",
    priceModifier: 200,
  },
];

export const finishOptions: BuilderOption[] = [
  {
    value: "polished",
    label: "Polished",
    description: "High-shine mirror finish",
    image: "https://images.unsplash.com/photo-1611012670415-a770b4f47c47?w=400&q=80&fit=crop",
    priceModifier: 0,
  },
  {
    value: "matte",
    label: "Matte",
    description: "Subtle brushed texture",
    image: "https://images.unsplash.com/photo-1564408000522-05af709fdd09?w=400&q=80&fit=crop",
    priceModifier: 100,
  },
  {
    value: "oxidized",
    label: "Oxidized",
    description: "Dark antique patina",
    image: "https://images.unsplash.com/photo-1550368566-f9cc32d7392d?w=400&q=80&fit=crop",
    priceModifier: 150,
  },
  {
    value: "rosegold",
    label: "Rose Gold Plated",
    description: "Warm rose gold coating",
    image: "https://images.unsplash.com/photo-1579726670131-487ecc8e1e8a?w=400&q=80&fit=crop",
    priceModifier: 500,
  },
];

export const stoneOptions: BuilderOption[] = [
  {
    value: "none",
    label: "No Stone",
    description: "Pure silver beauty",
    image: "https://images.unsplash.com/photo-1611012670415-a770b4f47c47?w=400&q=80&fit=crop",
    priceModifier: 0,
  },
  {
    value: "cz",
    label: "Cubic Zirconia",
    description: "Brilliant sparkling stones",
    image: "https://images.unsplash.com/photo-1602272385319-1dbf089994cf?w=400&q=80&fit=crop",
    priceModifier: 400,
  },
  {
    value: "pearl",
    label: "Pearl",
    description: "Elegant freshwater pearl",
    image: "https://images.unsplash.com/photo-1579726670131-487ecc8e1e8a?w=400&q=80&fit=crop",
    priceModifier: 600,
  },
];

const basePrices: Record<BuilderBaseType, number> = {
  ring: 1499,
  earring: 1799,
  necklace: 2999,
  bracelet: 2499,
  pendant: 1999,
};

const ENGRAVING_PRICE = 299;

export function calculateBuilderPrice(config: Partial<CustomJewelleryConfig>): number {
  let price = basePrices[config.baseType || "ring"];

  if (config.style) {
    const style = styleOptions.find((s) => s.value === config.style);
    if (style) price += style.priceModifier;
  }

  if (config.finish) {
    const finish = finishOptions.find((f) => f.value === config.finish);
    if (finish) price += finish.priceModifier;
  }

  if (config.stone && config.stone !== "none") {
    const stone = stoneOptions.find((s) => s.value === config.stone);
    if (stone) price += stone.priceModifier;
  }

  if (config.engraving && config.engraving.trim().length > 0) {
    price += ENGRAVING_PRICE;
  }

  return price;
}

export const previewImages: Record<string, string> = {
  "ring-minimalist": "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80&fit=crop",
  "ring-statement": "https://images.unsplash.com/photo-1550368566-f9cc32d7392d?w=600&q=80&fit=crop",
  "ring-vintage": "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80&fit=crop",
  "ring-modern": "https://images.unsplash.com/photo-1550368566-f9cc32d7392d?w=600&q=80&fit=crop",
  "earring-minimalist": "https://images.unsplash.com/photo-1602272385319-1dbf089994cf?w=600&q=80&fit=crop",
  "earring-statement": "https://images.unsplash.com/photo-1638734205377-f21045bf6ebe?w=600&q=80&fit=crop",
  "earring-vintage": "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600&q=80&fit=crop",
  "earring-modern": "https://images.unsplash.com/photo-1636103811402-f10d43b62237?w=600&q=80&fit=crop",
  "necklace-minimalist": "https://images.unsplash.com/photo-1611012670415-a770b4f47c47?w=600&q=80&fit=crop",
  "necklace-statement": "https://images.unsplash.com/photo-1601544737793-0d21af535968?w=600&q=80&fit=crop",
  "necklace-vintage": "https://images.unsplash.com/photo-1579726670131-487ecc8e1e8a?w=600&q=80&fit=crop",
  "necklace-modern": "https://images.unsplash.com/photo-1601544737793-0d21af535968?w=600&q=80&fit=crop",
  "bracelet-minimalist": "https://images.unsplash.com/photo-1564408000522-05af709fdd09?w=600&q=80&fit=crop",
  "bracelet-statement": "https://images.unsplash.com/photo-1676291055501-286c48bb186f?w=600&q=80&fit=crop",
  "bracelet-vintage": "https://images.unsplash.com/photo-1620968867360-5cda83d2bffd?w=600&q=80&fit=crop",
  "bracelet-modern": "https://images.unsplash.com/photo-1617071380442-97e4d5a711e6?w=600&q=80&fit=crop",
  "pendant-minimalist": "https://images.unsplash.com/photo-1611078560771-fe74f0a773d5?w=600&q=80&fit=crop",
  "pendant-statement": "https://images.unsplash.com/photo-1612239396116-4da3087f8f79?w=600&q=80&fit=crop",
  "pendant-vintage": "https://images.unsplash.com/photo-1611078560771-fe74f0a773d5?w=600&q=80&fit=crop",
  "pendant-modern": "https://images.unsplash.com/photo-1612239396116-4da3087f8f79?w=600&q=80&fit=crop",
};
