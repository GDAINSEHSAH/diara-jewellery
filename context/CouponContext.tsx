"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { coupons, Coupon } from "@/data/coupons";

interface CouponContextType {
  appliedCoupon: Coupon | null;
  discountAmount: number;
  applyCoupon: (code: string, orderTotal: number) => string | null;
  removeCoupon: () => void;
  calculateDiscount: (coupon: Coupon, orderTotal: number) => number;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export function CouponProvider({ children }: { children: ReactNode }) {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const calculateDiscount = (coupon: Coupon, orderTotal: number): number => {
    if (coupon.discountType === "flat") {
      return coupon.discountValue;
    }
    const raw = (orderTotal * coupon.discountValue) / 100;
    return coupon.maxDiscount ? Math.min(raw, coupon.maxDiscount) : raw;
  };

  const applyCoupon = (code: string, orderTotal: number): string | null => {
    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === code.toUpperCase()
    );
    if (!coupon) return "Invalid coupon code";
    if (!coupon.isActive) return "This coupon is no longer active";
    if (new Date(coupon.validUntil) < new Date()) return "This coupon has expired";
    if (orderTotal < coupon.minOrderValue)
      return `Minimum order of ₹${coupon.minOrderValue.toLocaleString("en-IN")} required`;

    const discount = calculateDiscount(coupon, orderTotal);
    setAppliedCoupon(coupon);
    setDiscountAmount(Math.round(discount));
    return null;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  return (
    <CouponContext.Provider
      value={{ appliedCoupon, discountAmount, applyCoupon, removeCoupon, calculateDiscount }}
    >
      {children}
    </CouponContext.Provider>
  );
}

export function useCoupon() {
  const context = useContext(CouponContext);
  if (!context) throw new Error("useCoupon must be used within CouponProvider");
  return context;
}
