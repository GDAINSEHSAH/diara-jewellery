"use client";

import { useState } from "react";
import { useCoupon } from "@/context/CouponContext";
import { useToast } from "@/context/ToastContext";

interface CouponInputProps {
  orderTotal: number;
}

export default function CouponInput({ orderTotal }: CouponInputProps) {
  const [code, setCode] = useState("");
  const { appliedCoupon, discountAmount, applyCoupon, removeCoupon } = useCoupon();
  const { addToast } = useToast();

  const handleApply = () => {
    if (!code.trim()) return;
    const error = applyCoupon(code.trim(), orderTotal);
    if (error) {
      addToast("error", error);
    } else {
      addToast("success", "Coupon applied!");
      setCode("");
    }
  };

  if (appliedCoupon) {
    return (
      <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-800">{appliedCoupon.code}</p>
              <p className="text-xs text-emerald-600">You save ₹{discountAmount.toLocaleString("en-IN")}</p>
            </div>
          </div>
          <button
            onClick={removeCoupon}
            className="text-xs text-stone-500 hover:text-stone-700 underline"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="Enter coupon code"
        className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent uppercase"
        onKeyDown={(e) => e.key === "Enter" && handleApply()}
      />
      <button
        onClick={handleApply}
        className="px-5 py-2.5 bg-stone-800 text-white text-sm font-medium rounded-xl hover:bg-stone-700 transition-colors"
      >
        Apply
      </button>
    </div>
  );
}
