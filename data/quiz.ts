import { products, Product } from "./products";

export interface QuizOption {
  label: string;
  image?: string;
  icon?: string;
  tags: Record<string, number>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  description: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "style",
    question: "What\u2019s your jewellery style?",
    description: "Pick the aesthetic that speaks to you most",
    options: [
      {
        label: "Minimalist & Clean",
        image: "https://images.unsplash.com/photo-1611012670415-a770b4f47c47?w=300&q=80&fit=crop",
        tags: { category_everyday: 5, style_minimalist: 5, type_pendant: 2, type_ring: 2 },
      },
      {
        label: "Bold & Statement",
        image: "https://images.unsplash.com/photo-1638734205377-f21045bf6ebe?w=300&q=80&fit=crop",
        tags: { category_party: 5, style_statement: 5, type_earring: 2, type_bracelet: 2 },
      },
      {
        label: "Vintage & Traditional",
        image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=300&q=80&fit=crop",
        tags: { category_occasion: 5, style_vintage: 5, type_earring: 3 },
      },
      {
        label: "Modern & Trendy",
        image: "https://images.unsplash.com/photo-1601544737793-0d21af535968?w=300&q=80&fit=crop",
        tags: { category_party: 3, category_everyday: 2, style_modern: 5, type_necklace: 2 },
      },
    ],
  },
  {
    id: "occasion",
    question: "When will you wear it most?",
    description: "Choose your primary occasion",
    options: [
      {
        label: "Daily Wear",
        icon: "\u2615",
        tags: { category_everyday: 5, price_low: 3 },
      },
      {
        label: "Office & Work",
        icon: "\uD83D\uDCBC",
        tags: { category_everyday: 3, style_minimalist: 3, type_earring: 2 },
      },
      {
        label: "Parties & Events",
        icon: "\uD83C\uDF89",
        tags: { category_party: 5, style_statement: 3, price_high: 2 },
      },
      {
        label: "Weddings & Festivals",
        icon: "\uD83D\uDC8D",
        tags: { category_occasion: 5, style_vintage: 3, price_high: 3 },
      },
    ],
  },
  {
    id: "type",
    question: "What type of jewellery do you prefer?",
    description: "Pick your favourite category",
    options: [
      {
        label: "Earrings",
        icon: "\u2728",
        tags: { type_earring: 10 },
      },
      {
        label: "Necklaces & Pendants",
        icon: "\uD83D\uDCAB",
        tags: { type_necklace: 5, type_pendant: 5 },
      },
      {
        label: "Rings",
        icon: "\uD83D\uDC8D",
        tags: { type_ring: 10 },
      },
      {
        label: "Bracelets & Bangles",
        icon: "\u26A1",
        tags: { type_bracelet: 10 },
      },
    ],
  },
  {
    id: "budget",
    question: "What\u2019s your budget range?",
    description: "No judgment \u2014 great jewellery at every price",
    options: [
      {
        label: "Under \u20B91,500",
        icon: "\uD83D\uDCB0",
        tags: { price_low: 10 },
      },
      {
        label: "\u20B91,500 - \u20B93,000",
        icon: "\uD83D\uDCB3",
        tags: { price_mid: 10 },
      },
      {
        label: "\u20B93,000 - \u20B96,000",
        icon: "\uD83D\uDC8E",
        tags: { price_high: 10 },
      },
      {
        label: "Above \u20B96,000",
        icon: "\uD83D\uDC51",
        tags: { price_premium: 10 },
      },
    ],
  },
  {
    id: "finish",
    question: "Which finish catches your eye?",
    description: "Choose the look you love",
    options: [
      {
        label: "High Shine / Polished",
        icon: "\u2B50",
        tags: { finish_polished: 5, style_minimalist: 2 },
      },
      {
        label: "Matte / Brushed",
        icon: "\uD83C\uDF19",
        tags: { finish_matte: 5, style_modern: 2 },
      },
      {
        label: "Oxidized / Antique",
        icon: "\uD83D\uDD31",
        tags: { finish_oxidized: 5, style_vintage: 3 },
      },
      {
        label: "Rose Gold / Plated",
        icon: "\uD83C\uDF39",
        tags: { finish_rosegold: 5, category_occasion: 2 },
      },
    ],
  },
  {
    id: "recipient",
    question: "Who is this jewellery for?",
    description: "Helps us tailor the recommendation",
    options: [
      {
        label: "For Myself",
        icon: "\uD83D\uDE0A",
        tags: { category_everyday: 2, style_minimalist: 1 },
      },
      {
        label: "Gift for Partner",
        icon: "\u2764\uFE0F",
        tags: { category_occasion: 2, price_mid: 2, type_necklace: 2, type_ring: 2 },
      },
      {
        label: "Gift for Friend",
        icon: "\uD83C\uDF81",
        tags: { category_everyday: 2, price_low: 2, type_earring: 2, type_bracelet: 2 },
      },
      {
        label: "Gift for Family",
        icon: "\uD83D\uDC96",
        tags: { category_occasion: 3, style_vintage: 2, price_high: 2 },
      },
    ],
  },
];

function scoreProduct(product: Product, tags: Record<string, number>): number {
  let score = 0;

  // Category match
  if (tags[`category_${product.category}`]) {
    score += tags[`category_${product.category}`];
  }

  // Type match
  if (tags[`type_${product.type}`]) {
    score += tags[`type_${product.type}`];
  }

  // Price matching
  if (tags.price_low && product.price <= 1500) score += tags.price_low;
  if (tags.price_mid && product.price > 1500 && product.price <= 3000) score += tags.price_mid;
  if (tags.price_high && product.price > 3000 && product.price <= 6000) score += tags.price_high;
  if (tags.price_premium && product.price > 6000) score += tags.price_premium;

  // Style bonuses
  if (tags.style_minimalist && product.category === "everyday") score += tags.style_minimalist * 0.5;
  if (tags.style_statement && product.category === "party") score += tags.style_statement * 0.5;
  if (tags.style_vintage && product.category === "occasion") score += tags.style_vintage * 0.5;
  if (tags.style_modern && (product.category === "party" || product.category === "everyday"))
    score += (tags.style_modern || 0) * 0.3;

  // Bestseller / rating bonus
  if (product.badge === "Bestseller") score += 2;
  score += product.rating * 0.5;

  return score;
}

export function getRecommendations(answers: Record<string, number>): Product[] {
  // Merge all tags from answers
  const allTags: Record<string, number> = {};

  quizQuestions.forEach((q) => {
    const answerIndex = answers[q.id];
    if (answerIndex !== undefined && q.options[answerIndex]) {
      const option = q.options[answerIndex];
      Object.entries(option.tags).forEach(([key, value]) => {
        allTags[key] = (allTags[key] || 0) + value;
      });
    }
  });

  // Score all products and return top 5
  const scored = products
    .filter((p) => p.inStock)
    .map((p) => ({ product: p, score: scoreProduct(p, allTags) }))
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 5).map((s) => s.product);
}
