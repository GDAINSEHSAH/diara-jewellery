export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  category: "everyday" | "party" | "occasion";
  type: "ring" | "earring" | "necklace" | "bracelet" | "pendant" | "anklet";
  material: string;
  images: string[];
  badge?: "New" | "Bestseller" | "Limited";
  inStock: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: "minimalist-stud-earrings",
    name: "Minimalist Stud Earrings",
    price: 1299,
    originalPrice: 1799,
    description:
      "Elegant minimalist studs crafted in 925 sterling silver. These versatile earrings feature a polished finish that catches light beautifully. Perfect for daily wear, they add a subtle touch of sophistication to any outfit. Secured with butterfly backs for comfortable, all-day wear.",
    shortDescription: "Polished 925 silver studs for effortless daily elegance.",
    category: "everyday",
    type: "earring",
    material: "925 Sterling Silver",
    images: [
      "https://images.unsplash.com/photo-1602272385319-1dbf089994cf?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1636103811402-f10d43b62237?w=800&q=80&fit=crop",
    ],
    badge: "Bestseller",
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "delicate-chain-necklace",
    name: "Delicate Chain Necklace",
    price: 2499,
    description:
      "A timeless cable chain necklace in 925 sterling silver. Its delicate profile makes it ideal for layering or wearing alone as a statement of refined simplicity. Adjustable length with a lobster clasp closure. Length: 16-18 inches.",
    shortDescription: "Timeless silver chain, perfect for layering.",
    category: "everyday",
    type: "necklace",
    material: "925 Sterling Silver",
    images: [
      "https://images.unsplash.com/photo-1611012670415-a770b4f47c47?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1601544737793-0d21af535968?w=800&q=80&fit=crop",
    ],
    badge: "Bestseller",
    inStock: true,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "classic-silver-ring",
    name: "Classic Silver Band",
    price: 999,
    originalPrice: 1499,
    description:
      "A beautifully simple band ring in 925 sterling silver. Features a smooth, high-polish finish with a comfort-fit interior. Available in multiple sizes, this ring is the perfect everyday accessory that transitions seamlessly from desk to dinner.",
    shortDescription: "Smooth polished band for timeless style.",
    category: "everyday",
    type: "ring",
    material: "925 Sterling Silver",
    images: [
      "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1550368566-f9cc32d7392d?w=800&q=80&fit=crop",
    ],
    inStock: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "silver-charm-bracelet",
    name: "Silver Charm Bracelet",
    price: 1899,
    description:
      "A delicate link bracelet in 925 sterling silver with subtle charm accents. The adjustable toggle clasp ensures a perfect fit. Light enough for everyday wear yet elegant enough for evenings out. Length: 6.5-7.5 inches.",
    shortDescription: "Charming link bracelet for everyday elegance.",
    category: "everyday",
    type: "bracelet",
    material: "925 Sterling Silver",
    images: [
      "https://images.unsplash.com/photo-1564408000522-05af709fdd09?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1617071380442-97e4d5a711e6?w=800&q=80&fit=crop",
    ],
    badge: "New",
    inStock: true,
    rating: 4.6,
    reviews: 67,
  },
  {
    id: "layered-chain-set",
    name: "Layered Chain Set",
    price: 3499,
    originalPrice: 4299,
    description:
      "A curated set of three sterling silver chains in varying lengths (16, 18, and 20 inches) designed to be worn together or individually. Each chain features a different texture — box, cable, and snake — for a dimensional layered look.",
    shortDescription: "Three textured chains for the perfect layered look.",
    category: "everyday",
    type: "necklace",
    material: "925 Sterling Silver",
    images: [
      "https://images.unsplash.com/photo-1617071380442-97e4d5a711e6?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1611012670415-a770b4f47c47?w=800&q=80&fit=crop",
    ],
    inStock: true,
    rating: 4.9,
    reviews: 43,
  },
  {
    id: "teardrop-pendant",
    name: "Teardrop Pendant",
    price: 1799,
    description:
      "An elegant teardrop-shaped pendant in 925 sterling silver with a mirror-polished finish. Suspended on a 16-inch fine cable chain. The pendant catches light from every angle, creating a mesmerizing play of reflections.",
    shortDescription: "Mirror-polished teardrop that captures light.",
    category: "everyday",
    type: "pendant",
    material: "925 Sterling Silver",
    images: [
      "https://images.unsplash.com/photo-1611078560771-fe74f0a773d5?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1612239396116-4da3087f8f79?w=800&q=80&fit=crop",
    ],
    inStock: true,
    rating: 4.8,
    reviews: 91,
  },
  {
    id: "statement-hoop-earrings",
    name: "Statement Hoop Earrings",
    price: 2799,
    originalPrice: 3499,
    description:
      "Bold, oversized hoops in 925 sterling silver with a brushed satin finish. These lightweight hoops make a dramatic statement without weighing you down. Diameter: 45mm. Secured with hinged snap-back closures.",
    shortDescription: "Bold oversized hoops with satin finish.",
    category: "party",
    type: "earring",
    material: "925 Sterling Silver",
    images: [
      "https://images.unsplash.com/photo-1638734205377-f21045bf6ebe?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1636103811402-f10d43b62237?w=800&q=80&fit=crop",
    ],
    badge: "Bestseller",
    inStock: true,
    rating: 4.7,
    reviews: 78,
  },
  {
    id: "cocktail-ring",
    name: "Cocktail Statement Ring",
    price: 2299,
    description:
      "A bold geometric cocktail ring in 925 sterling silver with an oxidized accent detail. This eye-catching piece features a modern architectural design that commands attention at any gathering.",
    shortDescription: "Geometric ring that commands attention.",
    category: "party",
    type: "ring",
    material: "925 Sterling Silver, Oxidized Accents",
    images: [
      "https://images.unsplash.com/photo-1550368566-f9cc32d7392d?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=800&q=80&fit=crop",
    ],
    badge: "New",
    inStock: true,
    rating: 4.6,
    reviews: 34,
  },
  {
    id: "chandelier-earrings",
    name: "Chandelier Drop Earrings",
    price: 3299,
    description:
      "Exquisite chandelier earrings in 925 sterling silver with cascading teardrop elements. These showstopping earrings move gracefully with every turn of your head, creating a dazzling display of light. Drop length: 65mm.",
    shortDescription: "Cascading teardrops for a dazzling evening look.",
    category: "party",
    type: "earring",
    material: "925 Sterling Silver",
    images: [
      "https://images.unsplash.com/photo-1636103811402-f10d43b62237?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1602272385319-1dbf089994cf?w=800&q=80&fit=crop",
    ],
    inStock: true,
    rating: 4.8,
    reviews: 56,
  },
  {
    id: "statement-cuff-bracelet",
    name: "Statement Cuff Bracelet",
    price: 3999,
    description:
      "A sculpted cuff bracelet in 925 sterling silver with a contemporary hammered texture. This bold, adjustable cuff sits beautifully on the wrist and serves as a conversation-starting centrepiece.",
    shortDescription: "Sculpted hammered cuff for bold style.",
    category: "party",
    type: "bracelet",
    material: "925 Sterling Silver",
    images: [
      "https://images.unsplash.com/photo-1676291055501-286c48bb186f?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1564408000522-05af709fdd09?w=800&q=80&fit=crop",
    ],
    badge: "Limited",
    inStock: true,
    rating: 4.9,
    reviews: 28,
  },
  {
    id: "party-choker",
    name: "Modern Party Choker",
    price: 2999,
    originalPrice: 3799,
    description:
      "A sleek, modern choker in 925 sterling silver with a flat snake chain design. Sits perfectly against the collarbone for a chic, contemporary look. Adjustable length: 14-16 inches.",
    shortDescription: "Sleek snake chain choker for modern chic.",
    category: "party",
    type: "necklace",
    material: "925 Sterling Silver",
    images: [
      "https://images.unsplash.com/photo-1601544737793-0d21af535968?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1611012670415-a770b4f47c47?w=800&q=80&fit=crop",
    ],
    inStock: true,
    rating: 4.7,
    reviews: 62,
  },
  {
    id: "bridal-necklace-set",
    name: "Bridal Necklace Set",
    price: 8999,
    originalPrice: 11999,
    description:
      "A luxurious bridal necklace set in 925 sterling silver featuring intricate filigree work and traditional Indian motifs. This heirloom-worthy set includes a statement necklace and matching earrings, perfect for wedding ceremonies and receptions.",
    shortDescription: "Heirloom filigree set for your special day.",
    category: "occasion",
    type: "necklace",
    material: "925 Sterling Silver, Rhodium Plated",
    images: [
      "https://images.unsplash.com/photo-1579726670131-487ecc8e1e8a?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80&fit=crop",
    ],
    badge: "Bestseller",
    inStock: true,
    rating: 5.0,
    reviews: 47,
  },
  {
    id: "heritage-jhumka-earrings",
    name: "Heritage Jhumka Earrings",
    price: 4999,
    description:
      "Traditional jhumka earrings reimagined in 925 sterling silver with delicate granulation work. These heritage-inspired earrings blend centuries-old craftsmanship with contemporary wearability. Drop length: 55mm.",
    shortDescription: "Traditional jhumkas with contemporary craft.",
    category: "occasion",
    type: "earring",
    material: "925 Sterling Silver",
    images: [
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1636103811402-f10d43b62237?w=800&q=80&fit=crop",
    ],
    badge: "Limited",
    inStock: true,
    rating: 4.9,
    reviews: 38,
  },
  {
    id: "occasion-bangle-set",
    name: "Occasion Bangle Set",
    price: 6499,
    originalPrice: 7999,
    description:
      "A set of three ornate bangles in 925 sterling silver, each featuring a different traditional pattern — braided, embossed, and filigree. Stackable for a rich, layered look or beautiful worn individually.",
    shortDescription: "Three ornate bangles for a regal look.",
    category: "occasion",
    type: "bracelet",
    material: "925 Sterling Silver, Rhodium Plated",
    images: [
      "https://images.unsplash.com/photo-1620968867360-5cda83d2bffd?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1564408000522-05af709fdd09?w=800&q=80&fit=crop",
    ],
    inStock: true,
    rating: 4.8,
    reviews: 29,
  },
  {
    id: "ornate-statement-ring",
    name: "Ornate Statement Ring",
    price: 3799,
    description:
      "A stunning statement ring in 925 sterling silver featuring intricate hand-engraved floral motifs. This showpiece ring is perfect for special occasions and celebrations. The rhodium plating ensures lasting brilliance.",
    shortDescription: "Hand-engraved floral ring for celebrations.",
    category: "occasion",
    type: "ring",
    material: "925 Sterling Silver, Rhodium Plated",
    images: [
      "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1550368566-f9cc32d7392d?w=800&q=80&fit=crop",
    ],
    badge: "New",
    inStock: true,
    rating: 4.7,
    reviews: 19,
  },
  {
    id: "silver-anklet-pair",
    name: "Silver Anklet Pair",
    price: 1599,
    description:
      "A charming pair of anklets in 925 sterling silver with tiny bell charms that create a gentle tinkling sound as you walk. A celebration of traditional Indian jewellery with a modern twist. Adjustable length: 9-10.5 inches.",
    shortDescription: "Charming bell anklets with traditional appeal.",
    category: "occasion",
    type: "anklet",
    material: "925 Sterling Silver",
    images: [
      "https://images.unsplash.com/photo-1612239396116-4da3087f8f79?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1617071380442-97e4d5a711e6?w=800&q=80&fit=crop",
    ],
    inStock: true,
    rating: 4.6,
    reviews: 53,
  },
];

export const categoryLabels: Record<string, string> = {
  everyday: "Everyday Essentials",
  party: "Party & Statement",
  occasion: "Occasion / Heavy Edit",
};

export const typeLabels: Record<string, string> = {
  ring: "Rings",
  earring: "Earrings",
  necklace: "Necklaces",
  bracelet: "Bracelets",
  pendant: "Pendants",
  anklet: "Anklets",
};
