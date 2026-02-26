"use client";

import { useState } from "react";
import { Coupon } from "@/data/coupons";

interface OfferCardProps {
  coupon: Coupon;
}

export default function OfferCard({ coupon }: OfferCardProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = coupon.code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-stone-800 to-stone-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="text-white font-semibold text-lg">
            {coupon.discountType === "percentage"
              ? `${coupon.discountValue}% OFF`
              : `₹${coupon.discountValue} OFF`}
          </span>
          <span className="text-stone-300 text-xs">
            Valid till{" "}
            {new Date(coupon.validUntil).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-stone-600 text-sm mb-4">{coupon.description}</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-stone-50 border border-dashed border-stone-300 rounded-lg px-4 py-2.5 text-center">
            <span className="font-mono font-semibold text-stone-800 tracking-wider">
              {coupon.code}
            </span>
          </div>
          <button
            onClick={copyCode}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              copied
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-stone-800 text-white hover:bg-stone-700"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-xs text-stone-400 mt-3">
          Min. order: ₹{coupon.minOrderValue.toLocaleString("en-IN")}
          {coupon.maxDiscount && ` | Max discount: ₹${coupon.maxDiscount.toLocaleString("en-IN")}`}
        </p>
      </div>
    </div>
  );
}
