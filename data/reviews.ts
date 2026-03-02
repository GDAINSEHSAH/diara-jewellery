export interface Review {
  id: string;
  productId: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  verified: boolean;
}

export const reviews: Review[] = [
  // Minimalist Stud Earrings
  { id: "r1", productId: "minimalist-stud-earrings", name: "Priya S.", rating: 5, date: "2025-12-10", title: "Perfect everyday studs", text: "These are my go-to earrings now. Lightweight, elegant, and the silver quality is outstanding. I wear them every single day.", verified: true },
  { id: "r2", productId: "minimalist-stud-earrings", name: "Ananya R.", rating: 5, date: "2025-11-28", title: "Beautiful and comfortable", text: "The butterfly backs hold securely and they look so classy. Got compliments on the very first day I wore them.", verified: true },
  { id: "r3", productId: "minimalist-stud-earrings", name: "Meera K.", rating: 4, date: "2025-11-15", title: "Lovely but small", text: "They're beautiful and well-made, just a tad smaller than I expected. Still love them for daily wear.", verified: true },
  { id: "r4", productId: "minimalist-stud-earrings", name: "Kavya D.", rating: 5, date: "2025-10-22", title: "Great gift!", text: "Bought these for my sister's birthday and she absolutely loved them. The packaging was gorgeous too.", verified: false },

  // Delicate Chain Necklace
  { id: "r5", productId: "delicate-chain-necklace", name: "Sita M.", rating: 5, date: "2025-12-05", title: "So delicate and elegant", text: "This necklace is exactly what I was looking for. It layers beautifully with my other chains and the adjustable length is a plus.", verified: true },
  { id: "r6", productId: "delicate-chain-necklace", name: "Roshni P.", rating: 5, date: "2025-11-20", title: "Amazing quality", text: "The sterling silver quality is evident. It hasn't tarnished even after weeks of daily wear. Highly recommended!", verified: true },
  { id: "r7", productId: "delicate-chain-necklace", name: "Divya L.", rating: 4, date: "2025-11-01", title: "Beautiful chain", text: "Really pretty chain. Wish it came in a longer length option but the quality is undeniable.", verified: true },

  // Classic Silver Band
  { id: "r8", productId: "classic-silver-ring", name: "Aditi G.", rating: 5, date: "2025-12-12", title: "Comfort fit is real", text: "I never take this ring off. The comfort fit interior makes it so easy to wear all day. Sizing was perfect.", verified: true },
  { id: "r9", productId: "classic-silver-ring", name: "Nisha T.", rating: 4, date: "2025-11-30", title: "Simple and elegant", text: "A beautiful basic ring. The polish is gorgeous and it goes with everything. Great value for money.", verified: true },
  { id: "r10", productId: "classic-silver-ring", name: "Pooja W.", rating: 5, date: "2025-11-18", title: "Stacking favourite", text: "I bought two in different sizes to stack. They look incredible together. Minimal and modern.", verified: true },
  { id: "r11", productId: "classic-silver-ring", name: "Rekha V.", rating: 5, date: "2025-10-25", title: "Perfect everyday ring", text: "Exactly what you'd want in a daily wear ring. Smooth, comfortable, and beautifully made.", verified: true },

  // Silver Charm Bracelet
  { id: "r12", productId: "silver-charm-bracelet", name: "Sneha J.", rating: 5, date: "2025-12-08", title: "Adorable bracelet", text: "The charms are so cute and the toggle clasp is really easy to use. Love wearing this to work.", verified: true },
  { id: "r13", productId: "silver-charm-bracelet", name: "Tanvi B.", rating: 4, date: "2025-11-25", title: "Lovely gift", text: "Gifted this to my best friend. She wears it every day. The quality is impressive at this price point.", verified: false },
  { id: "r14", productId: "silver-charm-bracelet", name: "Ishita C.", rating: 5, date: "2025-11-10", title: "Dainty and perfect", text: "It's the right amount of dainty without being too fragile. The adjustable length is very convenient.", verified: true },

  // Layered Chain Set
  { id: "r15", productId: "layered-chain-set", name: "Megha S.", rating: 5, date: "2025-12-15", title: "Best layering set", text: "All three chains are different textures and they look stunning together. Saves so much effort styling!", verified: true },
  { id: "r16", productId: "layered-chain-set", name: "Aisha K.", rating: 5, date: "2025-11-22", title: "Worth every rupee", text: "Three quality chains at this price is amazing. I wear them individually too. So versatile.", verified: true },
  { id: "r17", productId: "layered-chain-set", name: "Neha R.", rating: 4, date: "2025-10-30", title: "Beautiful set", text: "The chains are lovely and tangle-free which is great. One clasp was a bit stiff initially but loosened up.", verified: true },

  // Teardrop Pendant
  { id: "r18", productId: "teardrop-pendant", name: "Sakshi A.", rating: 5, date: "2025-12-01", title: "Catches light beautifully", text: "This pendant is mesmerizing in sunlight. The mirror finish is perfect. Gets so many compliments!", verified: true },
  { id: "r19", productId: "teardrop-pendant", name: "Kriti M.", rating: 5, date: "2025-11-15", title: "Elegant simplicity", text: "Sometimes less is more and this pendant proves it. Goes with everything from casual to formal.", verified: true },
  { id: "r20", productId: "teardrop-pendant", name: "Rhea P.", rating: 4, date: "2025-10-28", title: "Pretty pendant", text: "Very pretty and well-made. The chain is nice too. Would love it in a slightly larger size option.", verified: true },

  // Statement Hoop Earrings
  { id: "r21", productId: "statement-hoop-earrings", name: "Tara N.", rating: 5, date: "2025-12-10", title: "Obsessed with these!", text: "These hoops are EVERYTHING. They look expensive, feel lightweight, and the satin finish is unique.", verified: true },
  { id: "r22", productId: "statement-hoop-earrings", name: "Lavanya D.", rating: 4, date: "2025-11-28", title: "Great statement piece", text: "Bold and beautiful. A little heavier than expected but the snap-back closure keeps them secure.", verified: true },
  { id: "r23", productId: "statement-hoop-earrings", name: "Gauri S.", rating: 5, date: "2025-11-05", title: "Party essential", text: "Wore these to a cocktail party and got endless compliments. They elevate any outfit instantly.", verified: true },

  // Cocktail Statement Ring
  { id: "r24", productId: "cocktail-ring", name: "Vidya R.", rating: 5, date: "2025-12-03", title: "Unique design", text: "The geometric design is so modern and eye-catching. I've never seen anything quite like it. Love!", verified: true },
  { id: "r25", productId: "cocktail-ring", name: "Pallavi K.", rating: 4, date: "2025-11-18", title: "Bold and beautiful", text: "A real conversation starter. The oxidized accents add so much character. Sizing runs slightly large.", verified: true },
  { id: "r26", productId: "cocktail-ring", name: "Anu G.", rating: 5, date: "2025-10-15", title: "Statement maker", text: "This ring gets noticed every time I wear it. The quality is exceptional for the price.", verified: true },

  // Chandelier Drop Earrings
  { id: "r27", productId: "chandelier-earrings", name: "Jaya M.", rating: 5, date: "2025-12-08", title: "Showstopper earrings", text: "These are absolutely gorgeous. The cascading teardrops catch light from every angle. Wore them to a wedding and everyone asked where I got them.", verified: true },
  { id: "r28", productId: "chandelier-earrings", name: "Deepa S.", rating: 5, date: "2025-11-22", title: "Worth the investment", text: "Premium quality that you can feel. They move so gracefully and the craftsmanship is impeccable.", verified: true },
  { id: "r29", productId: "chandelier-earrings", name: "Mala T.", rating: 4, date: "2025-11-01", title: "Beautiful but heavy", text: "Stunning earrings but a bit heavy for extended wear. Perfect for special events though.", verified: true },

  // Statement Cuff Bracelet
  { id: "r30", productId: "statement-cuff-bracelet", name: "Rina L.", rating: 5, date: "2025-12-12", title: "Incredible craftsmanship", text: "The hammered texture is so beautiful in person. This cuff is a work of art. My favourite piece from DIARA.", verified: true },
  { id: "r31", productId: "statement-cuff-bracelet", name: "Sumi K.", rating: 5, date: "2025-11-30", title: "Conversation starter", text: "Everyone asks about this bracelet when I wear it. The adjustable size is perfect and it's comfortable too.", verified: true },
  { id: "r32", productId: "statement-cuff-bracelet", name: "Aruna P.", rating: 5, date: "2025-10-20", title: "Luxurious feel", text: "It feels and looks so luxurious. The silver has a beautiful weight to it without being uncomfortable.", verified: true },

  // Modern Party Choker
  { id: "r33", productId: "party-choker", name: "Kiran J.", rating: 5, date: "2025-12-05", title: "Sleek and modern", text: "The snake chain design is so chic. It sits perfectly on the collarbone and looks amazing with off-shoulder tops.", verified: true },
  { id: "r34", productId: "party-choker", name: "Leela B.", rating: 4, date: "2025-11-15", title: "Great party piece", text: "Love the modern design. The adjustable length is handy. Would be perfect with a slightly smoother clasp.", verified: true },
  { id: "r35", productId: "party-choker", name: "Maya R.", rating: 5, date: "2025-10-25", title: "Exactly as pictured", text: "This choker looks exactly like the photos. Flattering on the neck and very comfortable to wear.", verified: true },

  // Bridal Necklace Set
  { id: "r36", productId: "bridal-necklace-set", name: "Prerna S.", rating: 5, date: "2025-12-15", title: "Stunning bridal set", text: "Wore this for my engagement ceremony. The filigree work is exquisite and the rhodium plating gives it such a beautiful shine.", verified: true },
  { id: "r37", productId: "bridal-necklace-set", name: "Anjali M.", rating: 5, date: "2025-11-28", title: "Heirloom quality", text: "This set is truly heirloom-worthy. The craftsmanship is outstanding. Worth every penny for such a special piece.", verified: true },
  { id: "r38", productId: "bridal-necklace-set", name: "Deepti K.", rating: 5, date: "2025-11-10", title: "Dream bridal jewellery", text: "Bought this for my wedding and I'm so glad I did. The earrings match perfectly and the set photographs beautifully.", verified: true },
  { id: "r39", productId: "bridal-necklace-set", name: "Swati G.", rating: 5, date: "2025-10-15", title: "Beautiful set", text: "Gifted this to my daughter for her wedding. She looked absolutely radiant. The packaging was also exquisite.", verified: false },

  // Heritage Jhumka Earrings
  { id: "r40", productId: "heritage-jhumka-earrings", name: "Radha V.", rating: 5, date: "2025-12-10", title: "Masterpiece jhumkas", text: "The granulation work is incredible. These jhumkas are a perfect blend of traditional art and modern style.", verified: true },
  { id: "r41", productId: "heritage-jhumka-earrings", name: "Kamala P.", rating: 5, date: "2025-11-20", title: "Heritage beauty", text: "Reminds me of my grandmother's jewellery but with a contemporary twist. Absolutely love them.", verified: true },
  { id: "r42", productId: "heritage-jhumka-earrings", name: "Uma S.", rating: 4, date: "2025-10-30", title: "Lovely traditional piece", text: "Beautiful jhumkas with great detail. They're a bit heavy for all-day wear but perfect for occasions.", verified: true },

  // Occasion Bangle Set
  { id: "r43", productId: "occasion-bangle-set", name: "Latha R.", rating: 5, date: "2025-12-08", title: "Gorgeous bangle set", text: "Each bangle has a unique pattern and they look stunning stacked together. The rhodium plating is flawless.", verified: true },
  { id: "r44", productId: "occasion-bangle-set", name: "Geetha M.", rating: 5, date: "2025-11-25", title: "Royal elegance", text: "These bangles make me feel like royalty. The filigree one is my favourite. Perfect for festive occasions.", verified: true },
  { id: "r45", productId: "occasion-bangle-set", name: "Hema D.", rating: 4, date: "2025-11-05", title: "Beautiful craftsmanship", text: "The braided and embossed patterns are stunning. I wish they came in more size options for smaller wrists.", verified: true },

  // Ornate Statement Ring
  { id: "r46", productId: "ornate-statement-ring", name: "Chitra N.", rating: 5, date: "2025-12-01", title: "Exquisite engraving", text: "The hand-engraved floral motifs are breathtaking. This ring is a true showpiece for special events.", verified: true },
  { id: "r47", productId: "ornate-statement-ring", name: "Padma J.", rating: 5, date: "2025-11-15", title: "Celebration worthy", text: "Bought this for Diwali and it was the highlight of my outfit. The rhodium finish is stunning.", verified: true },
  { id: "r48", productId: "ornate-statement-ring", name: "Vasundhara K.", rating: 4, date: "2025-10-20", title: "Beautiful but bold", text: "The detail work is amazing. It's quite a bold ring so perfect for occasions but too statement for daily wear.", verified: true },

  // Silver Anklet Pair
  { id: "r49", productId: "silver-anklet-pair", name: "Saritha B.", rating: 5, date: "2025-12-12", title: "Charming anklets", text: "The tiny bells make the sweetest sound! Love the traditional feel with modern craftsmanship. So comfortable.", verified: true },
  { id: "r50", productId: "silver-anklet-pair", name: "Janaki S.", rating: 4, date: "2025-11-28", title: "Pretty and practical", text: "These anklets are beautiful. The adjustable length is great. The bell sound is subtle and pleasant.", verified: true },
  { id: "r51", productId: "silver-anklet-pair", name: "Nalini R.", rating: 5, date: "2025-11-10", title: "Perfect traditional touch", text: "I wear these with my sarees and kurtas. They add the perfect traditional touch. Quality is excellent.", verified: true },
  { id: "r52", productId: "silver-anklet-pair", name: "Bhavna M.", rating: 4, date: "2025-10-18", title: "Lovely pair", text: "Nice weight, not too heavy. The silver quality is good and they haven't tarnished. Great for the price.", verified: true },
];

export function getProductReviews(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}
