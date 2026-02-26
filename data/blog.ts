export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: "styling" | "care" | "behind" | "trends";
  coverImage: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
  relatedPosts: string[];
}

export const blogCategories = {
  styling: "Styling Tips",
  care: "Care Guides",
  behind: "Behind the Scenes",
  trends: "Trends",
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How to Layer Silver Necklaces Like a Pro",
    slug: "how-to-layer-silver-necklaces",
    excerpt:
      "Master the art of necklace layering with our expert tips on mixing chain lengths, textures, and pendant styles for a perfectly curated look.",
    content: `Layering necklaces is one of the easiest ways to elevate any outfit, but getting the balance right can feel tricky. Here's our guide to mastering the art.

**Start with Different Lengths**

The golden rule of layering is varying your chain lengths. We recommend starting with a 14-16 inch choker or short chain, adding a 18 inch mid-length piece, and finishing with a 20-22 inch longer chain. This creates a cascading effect that draws the eye downward.

**Mix Textures, Not Metals**

When layering silver, stick to silver — but play with textures. Combine a sleek snake chain with a delicate cable chain and a bold rope chain. The contrast in textures adds visual interest without looking cluttered.

**Add One Statement Piece**

Every layered look needs an anchor. Choose one necklace with a pendant or distinctive design as your focal point. Our Teardrop Pendant works beautifully as a centrepiece, flanked by simpler chains above and below.

**The Odd Number Rule**

Odd numbers are more visually pleasing. Layer 3 or 5 necklaces rather than 2 or 4. If you're just starting out, 3 is the sweet spot — it's impactful without being overwhelming.

**Consider Your Neckline**

V-necks are perfect for layering as they provide a natural frame. Crew necks work well with shorter layers, while off-shoulder tops let longer chains shine. Avoid layering with high necklines as the chains can get tangled.

**Pro Tip: Use a Layering Clasp**

Keep your chains from tangling by using a multi-strand clasp at the back. This small accessory keeps everything in place throughout the day.`,
    category: "styling",
    coverImage:
      "https://images.unsplash.com/photo-1611012670415-a770b4f47c47?w=800&q=80&fit=crop",
    author: "DIARA Team",
    date: "2025-02-15",
    readTime: 5,
    tags: ["layering", "necklaces", "styling"],
    relatedPosts: ["2", "5"],
  },
  {
    id: "2",
    title: "5 Ways to Style Silver Earrings for Every Occasion",
    slug: "style-silver-earrings-every-occasion",
    excerpt:
      "From boardroom to brunch, discover how to choose the perfect silver earrings for every moment in your day.",
    content: `Silver earrings are the most versatile pieces in your jewellery box. Here's how to make them work for every occasion.

**1. The Office: Minimalist Studs**

For professional settings, less is more. Our Minimalist Stud Earrings add a subtle sparkle without being distracting. They pair perfectly with pulled-back hair or a sleek bob, letting them peek out just enough.

**2. Weekend Brunch: Medium Hoops**

Medium-sized hoops strike the perfect balance between casual and put-together. They frame your face beautifully and work with everything from a simple tee to a flowy blouse.

**3. Date Night: Statement Drops**

This is your moment to shine. Chandelier or drop earrings create instant glamour. Our Chandelier Drop Earrings catch the candlelight beautifully and make you feel like the main character.

**4. Wedding Guest: Heritage Jhumkas**

Traditional events call for traditional pieces. Our Heritage Jhumka Earrings bring the perfect blend of heritage and elegance. They complement sarees, lehengas, and even fusion outfits.

**5. Everyday Elevated: Huggie Hoops**

Small huggie hoops sit close to the earlobe and can be worn 24/7. They're comfortable enough for sleeping and stylish enough for any daytime activity. Stack them with studs in other piercings for an effortlessly cool look.

**Bonus Tip: Match Your Face Shape**

Round faces look great with elongated drop earrings, while angular faces are softened by round hoops. Oval faces can wear virtually any style — lucky you!`,
    category: "styling",
    coverImage:
      "https://images.unsplash.com/photo-1602272385319-1dbf089994cf?w=800&q=80&fit=crop",
    author: "DIARA Team",
    date: "2025-02-08",
    readTime: 4,
    tags: ["earrings", "styling", "occasions"],
    relatedPosts: ["1", "8"],
  },
  {
    id: "3",
    title: "The Complete Guide to Caring for Your Silver Jewellery",
    slug: "complete-guide-silver-jewellery-care",
    excerpt:
      "Keep your DIARA pieces looking stunning for years with our comprehensive silver care guide covering cleaning, storage, and daily wear tips.",
    content: `Sterling silver is a beautiful, durable metal — but it does need a little love to maintain its brilliance. Here's everything you need to know.

**Why Does Silver Tarnish?**

Tarnishing is a natural chemical reaction between silver and sulphur compounds in the air. It's not a sign of poor quality — in fact, it proves your silver is real! The good news is that tarnish is completely reversible.

**Daily Care Tips**

- Put your jewellery on last, after perfume, lotion, and hairspray
- Remove jewellery before swimming, showering, or exercising
- Wipe pieces with a soft microfibre cloth after each wear
- Avoid contact with household chemicals and cleaning products

**How to Clean Tarnished Silver**

*Method 1: Silver Polish Cloth*
The easiest method. Simply rub your piece gently with a treated silver polishing cloth. These cloths are impregnated with a gentle cleaning agent that removes tarnish without scratching.

*Method 2: Mild Soap and Water*
Mix a few drops of mild dish soap with warm water. Soak your jewellery for 5-10 minutes, then gently scrub with a soft-bristled toothbrush. Rinse thoroughly and pat dry.

*Method 3: Baking Soda Paste*
For heavier tarnish, make a paste of baking soda and water. Apply gently with a soft cloth, rinse, and dry. Avoid this method for pieces with gemstones or oxidized finishes.

**Storage Matters**

- Store each piece separately to prevent scratching
- Use anti-tarnish pouches or strips
- Keep in a cool, dry place away from direct sunlight
- Zip-lock bags work in a pinch — squeeze out the air before sealing

**The Best Advice: Wear It Often**

The oils in your skin actually help prevent tarnishing. The more you wear your silver, the better it looks! Your favourite everyday pieces will develop a beautiful patina over time.`,
    category: "care",
    coverImage:
      "https://images.unsplash.com/photo-1617071380442-97e4d5a711e6?w=800&q=80&fit=crop",
    author: "DIARA Team",
    date: "2025-01-28",
    readTime: 6,
    tags: ["care", "silver", "cleaning", "storage"],
    relatedPosts: ["4"],
  },
  {
    id: "4",
    title: "How to Store Your Jewellery Collection Properly",
    slug: "store-jewellery-collection-properly",
    excerpt:
      "Proper storage can extend the life of your jewellery by years. Learn the dos and don'ts of jewellery organisation and storage.",
    content: `Your jewellery deserves more than being tossed in a drawer. Here's how to store your collection like a pro.

**The Number One Rule: Separate Everything**

Pieces touching each other leads to scratches, tangles, and tarnish. Each item should have its own space — whether that's a compartment, pouch, or hook.

**Invest in a Quality Jewellery Box**

Look for a box with:
- Soft fabric lining (velvet or microfibre)
- Individual compartments for rings and earrings
- Hooks or bars for necklaces to hang
- A drawer for bracelets to lay flat

**Travel Smart**

When travelling, use a dedicated jewellery roll or case. In a pinch, thread necklaces through straws to prevent tangling, and store earring pairs in daily pill organisers.

**Climate Control**

Humidity is silver's enemy. If you live in a humid climate:
- Add silica gel packets to your jewellery box
- Use anti-tarnish strips (replace every 6 months)
- Consider a dehumidifier for your closet

**Organise by Frequency**

Keep everyday pieces accessible and special occasion jewellery stored safely away. This prevents unnecessary handling of delicate pieces and keeps your daily routine efficient.

**Ring Storage Tip**

Store rings upright in ring slots rather than laying them flat. This prevents them from rubbing against each other and makes it easy to see your entire collection at a glance.

**Earring Organisation**

Use an earring holder or card to keep pairs together. Nothing is more frustrating than searching for a missing earring partner!`,
    category: "care",
    coverImage:
      "https://images.unsplash.com/photo-1564408000522-05af709fdd09?w=800&q=80&fit=crop",
    author: "DIARA Team",
    date: "2025-01-20",
    readTime: 5,
    tags: ["storage", "care", "organisation"],
    relatedPosts: ["3"],
  },
  {
    id: "5",
    title: "From Sketch to Silver: How a DIARA Piece is Born",
    slug: "from-sketch-to-silver",
    excerpt:
      "Take a behind-the-scenes journey through our design and crafting process, from the first pencil sketch to the final polished piece.",
    content: `Ever wondered how a DIARA piece goes from an idea to the jewellery you wear? Let us take you behind the scenes.

**Step 1: Inspiration**

Every piece starts with inspiration. Our design team draws from Indian heritage, contemporary architecture, nature, and the women who wear our jewellery. We keep extensive mood boards and travel notebooks filled with textures, patterns, and shapes that catch our eye.

**Step 2: Sketching**

Ideas are translated into detailed pencil sketches. Each design goes through multiple iterations — we might sketch 20 versions of a single earring before we're satisfied. We consider wearability, weight, and movement at this stage.

**Step 3: CAD Design**

Once a sketch is approved, our designers create a 3D model using CAD (Computer-Aided Design) software. This allows us to see the piece from every angle, check proportions, and make precise measurements before any metal is touched.

**Step 4: Wax Model**

A wax model is created from the CAD file using 3D printing technology. This physical prototype lets us test the fit, feel, and weight of the piece. We often make adjustments at this stage.

**Step 5: Casting**

The wax model is used to create a mould. Molten 925 sterling silver is poured into the mould using the lost-wax casting method — a technique that's been used for thousands of years.

**Step 6: Finishing**

After casting, each piece is hand-finished by our artisans. This includes filing, sanding, polishing, and adding any detail work like oxidization or texturing. This stage can take several hours per piece.

**Step 7: Quality Check**

Every DIARA piece passes through a rigorous quality check. We test for structural integrity, finish quality, and comfort. Only pieces that meet our exacting standards make it to you.

**Step 8: Packaging**

Finally, each piece is carefully placed in our signature packaging — ready to be unwrapped and loved.`,
    category: "behind",
    coverImage:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80&fit=crop",
    author: "DIARA Team",
    date: "2025-01-12",
    readTime: 7,
    tags: ["craftsmanship", "process", "design"],
    relatedPosts: ["6"],
  },
  {
    id: "6",
    title: "Meet Our Artisans: The Hands Behind DIARA",
    slug: "meet-our-artisans",
    excerpt:
      "Get to know the skilled craftspeople who bring DIARA jewellery to life, carrying forward generations of silversmithing tradition.",
    content: `Behind every piece of DIARA jewellery are hands that have been trained for years in the art of silversmithing. Here are their stories.

**A Legacy of Craftsmanship**

Many of our artisans come from families that have worked with silver for generations. Their skills have been passed down from parent to child, refined over decades of practice. When you wear a DIARA piece, you're wearing the legacy of this tradition.

**The Art of Hand-Finishing**

While we use modern technology for precision, the final touches are always done by hand. Our polishers spend hours bringing each piece to its perfect shine. Our engravers add intricate details that machines simply cannot replicate.

**Training the Next Generation**

We're committed to keeping traditional silversmithing alive. Our workshop includes apprenticeship programs where young artisans learn from masters. This ensures that these valuable skills continue to thrive.

**Fair Practices**

Every artisan in our workshop works in safe, comfortable conditions with fair compensation. We believe that beautiful jewellery should be made ethically, and we're proud of the working environment we've created.

**The Human Touch**

In an age of mass production, there's something special about knowing that a real person crafted your jewellery with care and skill. Each small variation in a hand-finished piece is not an imperfection — it's a signature of human artistry.

**When you choose DIARA, you're not just buying jewellery — you're supporting a community of artisans and a tradition that stretches back centuries.**`,
    category: "behind",
    coverImage:
      "https://images.unsplash.com/photo-1579726670131-487ecc8e1e8a?w=800&q=80&fit=crop",
    author: "DIARA Team",
    date: "2025-01-05",
    readTime: 5,
    tags: ["artisans", "craftsmanship", "behind the scenes"],
    relatedPosts: ["5"],
  },
  {
    id: "7",
    title: "Silver Jewellery Trends to Watch in 2025",
    slug: "silver-jewellery-trends-2025",
    excerpt:
      "From chunky chains to mixed metals, discover the silver jewellery trends that will define style in 2025.",
    content: `The jewellery world is evolving, and silver is leading the charge. Here are the trends we're watching.

**1. Chunky Chains Are Here to Stay**

Bold, substantial chains continue to dominate. Think thick curb chains, oversized links, and statement chokers. These pieces make an impact on their own — no layering needed.

**2. Minimalist Geometry**

Clean lines and geometric shapes are trending. Hexagonal earrings, angular bangles, and structured ring designs offer a modern, architectural aesthetic.

**3. Ear Cuffs and Climbers**

No piercing? No problem. Ear cuffs and climbers are making jewellery more accessible while adding edge to any look. They're perfect for those who love the look of multiple piercings without the commitment.

**4. Personalised Pieces**

Custom engraving, initial pendants, and birthstone accents continue to gain popularity. People want jewellery that tells their story.

**5. Sustainable Silver**

Consumers are increasingly conscious about the origins of their jewellery. Recycled silver and ethically sourced materials are becoming must-haves rather than nice-to-haves.

**6. Mixed Textures**

Combining polished and matte finishes within a single piece creates depth and visual interest. Hammered, brushed, and satin finishes are particularly popular.

**7. Anklets are Back**

After years of being overlooked, anklets are making a strong comeback. Delicate chains with small charms are leading this revival, perfect for showing off during sandal season.

**8. Stacking Rings**

The more, the merrier. Thin, stackable rings allow for creative self-expression. Mix plain bands with textured ones for a unique combination that's entirely your own.

**Our take: The best trend is the one that makes you feel confident. Don't follow trends blindly — choose pieces that resonate with your personal style.**`,
    category: "trends",
    coverImage:
      "https://images.unsplash.com/photo-1638734205377-f21045bf6ebe?w=800&q=80&fit=crop",
    author: "DIARA Team",
    date: "2024-12-28",
    readTime: 6,
    tags: ["trends", "2025", "fashion"],
    relatedPosts: ["8", "1"],
  },
  {
    id: "8",
    title: "Why 925 Sterling Silver is the Smart Choice",
    slug: "why-925-sterling-silver",
    excerpt:
      "Discover why 925 sterling silver offers the perfect combination of beauty, durability, and value for modern jewellery lovers.",
    content: `When it comes to jewellery, the metal you choose matters. Here's why 925 sterling silver should be at the top of your list.

**What Does 925 Mean?**

The "925" stamp means the piece contains 92.5% pure silver, alloyed with 7.5% other metals (usually copper). This combination creates a metal that's strong enough for daily wear while maintaining silver's beautiful lustre.

**Beauty That Rivals Gold**

Silver has a cool, luminous quality that flatters every skin tone. Its versatility means it pairs beautifully with both casual and formal outfits. And unlike gold, silver doesn't compete with your outfit — it complements it.

**Incredible Value**

Sterling silver offers luxury at an accessible price point. You can build a substantial jewellery collection without breaking the bank, and the pieces will last for decades with proper care.

**Hypoallergenic Properties**

Quality 925 sterling silver is naturally hypoallergenic, making it a great choice for sensitive skin. At DIARA, all our pieces are nickel-free, ensuring comfort for all-day wear.

**Durability for Daily Wear**

The copper alloy in sterling silver gives it strength and durability. With reasonable care, your pieces will maintain their beauty for years — even decades. Many people pass down silver jewellery as heirlooms.

**Easy Maintenance**

Unlike some precious metals, silver is easy to maintain at home. A simple polish with a soft cloth keeps it looking brilliant, and any tarnish that develops can be easily reversed.

**Eco-Friendly Option**

Silver is one of the most recycled metals in the world. Choosing silver jewellery is a more sustainable option compared to mining-intensive alternatives.

**The Bottom Line**

925 sterling silver combines beauty, durability, affordability, and sustainability in a way that few other metals can match. It's not just a smart choice — it's the smart choice.`,
    category: "trends",
    coverImage:
      "https://images.unsplash.com/photo-1611078560771-fe74f0a773d5?w=800&q=80&fit=crop",
    author: "DIARA Team",
    date: "2024-12-20",
    readTime: 5,
    tags: ["silver", "925", "education"],
    relatedPosts: ["7", "3"],
  },
  {
    id: "9",
    title: "The Perfect Jewellery Gift Guide",
    slug: "perfect-jewellery-gift-guide",
    excerpt:
      "Struggling to find the perfect jewellery gift? Our comprehensive guide helps you choose the right piece for every person and occasion.",
    content: `Finding the perfect jewellery gift can feel overwhelming. Here's our tried-and-tested guide to getting it right every time.

**For the Minimalist**

Choose understated pieces with clean lines. Our Minimalist Stud Earrings or Classic Silver Band are safe, elegant choices that a minimalist will actually wear every day.

**For the Trendsetter**

Go bold. Statement hoops, chunky cuffs, or our Cocktail Statement Ring will appeal to someone who loves to stand out. Don't be afraid to choose something dramatic.

**For the Traditional Soul**

Heritage-inspired pieces like our Jhumka Earrings or Occasion Bangle Set honour tradition while offering modern wearability. These pieces carry cultural significance that makes them extra meaningful gifts.

**For Brides-to-Be**

Our Bridal Necklace Set is the ultimate bridal gift. It's designed to be both a wedding-day showpiece and a cherished heirloom. Consider pairing it with a care kit to keep it beautiful for years.

**Budget-Friendly Tips**

- Set a budget before you shop
- Consider our everyday range for beautiful pieces under ₹2,000
- A thoughtful, less expensive piece beats a flashy, impersonal one

**Occasion Guide**

- Birthday: Something aligned with their personal style
- Anniversary: A piece that complements something they already own
- Just Because: The most meaningful gifts need no occasion

**When in Doubt**

If you're truly stuck, earrings are the safest bet. They don't require sizing, they suit everyone, and they're instantly wearable. Our Minimalist Studs have a near-perfect gifting track record!

**The DIARA Difference**

Every DIARA piece comes in beautiful gift-ready packaging. No extra wrapping needed — just hand it over and watch them smile.`,
    category: "styling",
    coverImage:
      "https://images.unsplash.com/photo-1636103811402-f10d43b62237?w=800&q=80&fit=crop",
    author: "DIARA Team",
    date: "2024-12-15",
    readTime: 5,
    tags: ["gifts", "guide", "occasions"],
    relatedPosts: ["2", "1"],
  },
  {
    id: "10",
    title: "Building a Capsule Jewellery Collection",
    slug: "building-capsule-jewellery-collection",
    excerpt:
      "Quality over quantity: learn how to curate a versatile jewellery capsule that covers every occasion with just 7 essential pieces.",
    content: `Just like a capsule wardrobe, a capsule jewellery collection focuses on versatile, high-quality essentials. Here's how to build yours.

**The 7 Essential Pieces**

1. **A Pair of Classic Studs** — The foundation of any collection. Choose a style that works from desk to dinner.

2. **A Delicate Chain Necklace** — A timeless piece that layers beautifully or stands alone. Our Delicate Chain Necklace is the perfect starting point.

3. **A Simple Band Ring** — Understated elegance for every day. Wear it on any finger for different effects.

4. **Medium Hoop Earrings** — More impactful than studs but still versatile enough for daily wear.

5. **A Link Bracelet** — Adds interest to your wrist without being overpowering.

6. **A Pendant Necklace** — Your go-to for adding a focal point. Choose a design that resonates with your personal style.

7. **One Statement Piece** — This is your wild card. It could be bold earrings, a cuff bracelet, or a cocktail ring. Save this slot for something that makes your heart sing.

**The Investment Mindset**

Think of jewellery as an investment, not an expense. Seven quality pieces that last years are worth far more than a drawer full of costume jewellery that tarnishes in months.

**Building Over Time**

You don't need to buy everything at once. Start with pieces 1-3 and add the rest gradually. Each addition will expand your styling options exponentially.

**The Mix and Match Magic**

With just these 7 pieces, you can create dozens of different looks. Pair studs with a pendant for subtle elegance. Stack the ring with the bracelet for a coordinated wrist. Layer the chain necklace with your statement piece for evening glamour.

**Quality Markers to Look For**

- 925 sterling silver stamp
- Smooth, comfortable finish
- Secure clasps and closures
- Consistent colour and polish
- Nickel-free certification`,
    category: "trends",
    coverImage:
      "https://images.unsplash.com/photo-1612239396116-4da3087f8f79?w=800&q=80&fit=crop",
    author: "DIARA Team",
    date: "2024-12-10",
    readTime: 6,
    tags: ["capsule", "essentials", "collection"],
    relatedPosts: ["1", "7"],
  },
];
