"use client";

import { coupons } from "@/data/coupons";
import OfferCard from "@/components/OfferCard";

export default function OffersPage() {
  const activeCoupons = coupons.filter(
    (c) => c.isActive && new Date(c.validUntil) >= new Date()
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="h-20" />

      {/* Hero */}
      <div className="bg-gradient-to-b from-stone-100 to-[#FDFBF7] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl text-stone-800 mb-4">
            Offers & Coupons
          </h1>
          <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Save on your favourite silver jewellery with our latest offers
          </p>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 pb-20 pt-8">
        {activeCoupons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeCoupons.map((coupon) => (
              <OfferCard key={coupon.code} coupon={coupon} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-stone-500">No active offers right now. Check back soon!</p>
          </div>
        )}

        <div className="mt-12 bg-stone-50 rounded-2xl p-8 text-center">
          <h3 className="font-playfair text-xl text-stone-800 mb-2">How to Use Coupons</h3>
          <p className="text-sm text-stone-500 max-w-lg mx-auto">
            Copy the coupon code and paste it during checkout in the &ldquo;Apply Coupon&rdquo; section.
            The discount will be applied to your order total automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
