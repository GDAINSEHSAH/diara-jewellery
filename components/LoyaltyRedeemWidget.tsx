"use client";

import { useState } from "react";
import { useLoyalty } from "@/context/LoyaltyContext";

interface LoyaltyRedeemWidgetProps {
  onRedeem: (discount: number, points: number) => void;
  redeemedPoints: number;
}

export default function LoyaltyRedeemWidget({ onRedeem, redeemedPoints }: LoyaltyRedeemWidgetProps) {
  const { totalPoints, getRedemptionValue } = useLoyalty();
  const [pointsToRedeem, setPointsToRedeem] = useState("");

  const availablePoints = totalPoints - redeemedPoints;
  // Must redeem in multiples of 100
  const maxRedeemable = Math.floor(availablePoints / 100) * 100;

  if (availablePoints < 100) return null;

  const handleRedeem = () => {
    const pts = parseInt(pointsToRedeem);
    if (!pts || pts < 100 || pts > maxRedeemable || pts % 100 !== 0) return;
    const discount = getRedemptionValue(pts);
    onRedeem(discount, pts);
    setPointsToRedeem("");
  };

  if (redeemedPoints > 0) {
    return (
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-amber-800">
              {redeemedPoints} points redeemed
            </p>
            <p className="text-xs text-amber-600">
              You save ₹{getRedemptionValue(redeemedPoints).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <p className="text-sm font-medium text-amber-800">
          Redeem Loyalty Points
        </p>
      </div>
      <p className="text-xs text-amber-600 mb-3">
        You have {availablePoints} points (max {maxRedeemable} redeemable = ₹{getRedemptionValue(maxRedeemable)})
      </p>
      <div className="flex gap-2">
        <input
          type="number"
          value={pointsToRedeem}
          onChange={(e) => setPointsToRedeem(e.target.value)}
          placeholder={`Multiples of 100 (max ${maxRedeemable})`}
          min={100}
          max={maxRedeemable}
          step={100}
          className="flex-1 px-4 py-2.5 rounded-xl border border-amber-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent bg-white"
        />
        <button
          onClick={handleRedeem}
          className="px-5 py-2.5 bg-amber-600 text-white text-sm font-medium rounded-xl hover:bg-amber-700 transition-colors"
        >
          Redeem
        </button>
      </div>
    </div>
  );
}
