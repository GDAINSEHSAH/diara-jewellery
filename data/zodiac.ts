export interface ZodiacSign {
  name: string;
  symbol: string;
  dateRange: string;
  element: "fire" | "earth" | "air" | "water";
  birthstone: string;
  luckyColor: string;
  traits: string[];
  productRecommendations: string[];
}

export const zodiacSigns: ZodiacSign[] = [
  {
    name: "Aries",
    symbol: "\u2648",
    dateRange: "Mar 21 - Apr 19",
    element: "fire",
    birthstone: "Diamond",
    luckyColor: "Red",
    traits: ["Bold", "Ambitious", "Energetic"],
    productRecommendations: ["statement-hoop-earrings", "cocktail-ring", "party-choker"],
  },
  {
    name: "Taurus",
    symbol: "\u2649",
    dateRange: "Apr 20 - May 20",
    element: "earth",
    birthstone: "Emerald",
    luckyColor: "Green",
    traits: ["Reliable", "Patient", "Devoted"],
    productRecommendations: ["classic-silver-ring", "delicate-chain-necklace", "silver-charm-bracelet"],
  },
  {
    name: "Gemini",
    symbol: "\u264A",
    dateRange: "May 21 - Jun 20",
    element: "air",
    birthstone: "Pearl",
    luckyColor: "Yellow",
    traits: ["Curious", "Adaptable", "Expressive"],
    productRecommendations: ["layered-chain-set", "minimalist-stud-earrings", "teardrop-pendant"],
  },
  {
    name: "Cancer",
    symbol: "\u264B",
    dateRange: "Jun 21 - Jul 22",
    element: "water",
    birthstone: "Ruby",
    luckyColor: "Silver",
    traits: ["Intuitive", "Sentimental", "Compassionate"],
    productRecommendations: ["heritage-jhumka-earrings", "occasion-bangle-set", "bridal-necklace-set"],
  },
  {
    name: "Leo",
    symbol: "\u264C",
    dateRange: "Jul 23 - Aug 22",
    element: "fire",
    birthstone: "Peridot",
    luckyColor: "Gold",
    traits: ["Dramatic", "Confident", "Passionate"],
    productRecommendations: ["statement-cuff-bracelet", "chandelier-earrings", "cocktail-ring"],
  },
  {
    name: "Virgo",
    symbol: "\u264D",
    dateRange: "Aug 23 - Sep 22",
    element: "earth",
    birthstone: "Sapphire",
    luckyColor: "Navy",
    traits: ["Analytical", "Practical", "Loyal"],
    productRecommendations: ["minimalist-stud-earrings", "classic-silver-ring", "teardrop-pendant"],
  },
  {
    name: "Libra",
    symbol: "\u264E",
    dateRange: "Sep 23 - Oct 22",
    element: "air",
    birthstone: "Opal",
    luckyColor: "Pink",
    traits: ["Harmonious", "Fair", "Social"],
    productRecommendations: ["layered-chain-set", "delicate-chain-necklace", "silver-charm-bracelet"],
  },
  {
    name: "Scorpio",
    symbol: "\u264F",
    dateRange: "Oct 23 - Nov 21",
    element: "water",
    birthstone: "Topaz",
    luckyColor: "Black",
    traits: ["Passionate", "Resourceful", "Magnetic"],
    productRecommendations: ["ornate-statement-ring", "chandelier-earrings", "party-choker"],
  },
  {
    name: "Sagittarius",
    symbol: "\u2650",
    dateRange: "Nov 22 - Dec 21",
    element: "fire",
    birthstone: "Tanzanite",
    luckyColor: "Purple",
    traits: ["Adventurous", "Optimistic", "Free-spirited"],
    productRecommendations: ["statement-hoop-earrings", "statement-cuff-bracelet", "layered-chain-set"],
  },
  {
    name: "Capricorn",
    symbol: "\u2651",
    dateRange: "Dec 22 - Jan 19",
    element: "earth",
    birthstone: "Garnet",
    luckyColor: "Brown",
    traits: ["Disciplined", "Responsible", "Ambitious"],
    productRecommendations: ["classic-silver-ring", "delicate-chain-necklace", "minimalist-stud-earrings"],
  },
  {
    name: "Aquarius",
    symbol: "\u2652",
    dateRange: "Jan 20 - Feb 18",
    element: "air",
    birthstone: "Amethyst",
    luckyColor: "Blue",
    traits: ["Progressive", "Original", "Independent"],
    productRecommendations: ["cocktail-ring", "layered-chain-set", "teardrop-pendant"],
  },
  {
    name: "Pisces",
    symbol: "\u2653",
    dateRange: "Feb 19 - Mar 20",
    element: "water",
    birthstone: "Aquamarine",
    luckyColor: "Sea Green",
    traits: ["Intuitive", "Artistic", "Gentle"],
    productRecommendations: ["heritage-jhumka-earrings", "silver-anklet-pair", "bridal-necklace-set"],
  },
];

const zodiacDateRanges: { name: string; startMonth: number; startDay: number; endMonth: number; endDay: number }[] = [
  { name: "Capricorn", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  { name: "Aquarius", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { name: "Pisces", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
  { name: "Aries", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { name: "Taurus", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { name: "Gemini", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
  { name: "Cancer", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
  { name: "Leo", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { name: "Virgo", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { name: "Libra", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
  { name: "Scorpio", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
  { name: "Sagittarius", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
];

export function getZodiacByDate(month: number, day: number): ZodiacSign | null {
  for (const range of zodiacDateRanges) {
    if (range.startMonth === range.endMonth) {
      if (month === range.startMonth && day >= range.startDay && day <= range.endDay) {
        return zodiacSigns.find((z) => z.name === range.name) || null;
      }
    } else if (range.startMonth > range.endMonth) {
      // Capricorn wraps around year
      if (
        (month === range.startMonth && day >= range.startDay) ||
        (month === range.endMonth && day <= range.endDay)
      ) {
        return zodiacSigns.find((z) => z.name === range.name) || null;
      }
    } else {
      if (
        (month === range.startMonth && day >= range.startDay) ||
        (month === range.endMonth && day <= range.endDay)
      ) {
        return zodiacSigns.find((z) => z.name === range.name) || null;
      }
    }
  }
  return null;
}

export const elementColors: Record<string, { bg: string; text: string; border: string }> = {
  fire: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  earth: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  air: { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
  water: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
};
