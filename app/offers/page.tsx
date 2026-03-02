"use client";

import { useState, useEffect } from "react";
import { coupons } from "@/data/coupons";
import OfferCard from "@/components/OfferCard";
import SpinWheel from "@/components/SpinWheel";

export default function OffersPage() {
  const activeCoupons = coupons.filter(
    (c) => c.isActive && new Date(c.validUntil) >= new Date()
  );

  const [hasSpun, setHasSpun] = useState(true);
  const [showWheel, setShowWheel] = useState(false);

  useEffect(() => {
    try {
      setHasSpun(!!localStorage.getItem("diara-spin-used"));
    } catch {}
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-stone-900">
      <div className="h-20" />

      {/* Hero */}
      <div className="bg-gradient-to-b from-stone-100 dark:from-stone-800 to-[#FDFBF7] dark:to-stone-900 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl text-stone-800 dark:text-stone-100 mb-4">
            Offers &amp; Coupons
          </h1>
          <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Save on your favourite silver jewellery with our latest offers
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 pb-20 pt-8">
        {/* Spin the Wheel Section */}
        <div className="mb-12 bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-8 text-center text-white">
          <div className="text-4xl mb-3">&#x1F3B0;</div>
          <h2 className="font-playfair text-2xl mb-2">Spin the Wheel</h2>
          <p className="text-stone-300 text-sm mb-5 max-w-md mx-auto">
            Try your luck and win exclusive discounts, free shipping, or loyalty points!
          </p>
          {hasSpun ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full text-stone-300 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Already Spun — check your coupon at checkout!
            </div>
          ) : (
            <button
              onClick={() => setShowWheel(true)}
              className="px-8 py-3 bg-white text-stone-800 font-medium rounded-full hover:bg-stone-100 transition-all text-sm hover:scale-105 active:scale-95"
            >
              Spin Now
            </button>
          )}
        </div>

        {/* Coupons Grid */}
        {activeCoupons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeCoupons.map((coupon) => (
              <OfferCard key={coupon.code} coupon={coupon} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-stone-500 dark:text-stone-400">No active offers right now. Check back soon!</p>
          </div>
        )}

        <div className="mt-12 bg-stone-50 dark:bg-stone-800 rounded-2xl p-8 text-center">
          <h3 className="font-playfair text-xl text-stone-800 dark:text-stone-100 mb-2">How to Use Coupons</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-lg mx-auto">
            Copy the coupon code and paste it during checkout in the &ldquo;Apply Coupon&rdquo; section.
            The discount will be applied to your order total automatically.
          </p>
        </div>
      </div>

      {showWheel && (
        <SpinWheel
          onClose={() => {
            setShowWheel(false);
            setHasSpun(true);
          }}
        />
      )}
    </div>
  );
}
