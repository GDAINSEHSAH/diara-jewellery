export interface Coupon {
  code: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
  validUntil: string;
  isActive: boolean;
}

export const coupons: Coupon[] = [
  {
    code: "WELCOME10",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 999,
    maxDiscount: 500,
    description: "10% off on your first order (up to ₹500)",
    validUntil: "2026-12-31",
    isActive: true,
  },
  {
    code: "DIARA20",
    discountType: "percentage",
    discountValue: 20,
    minOrderValue: 2999,
    maxDiscount: 1000,
    description: "20% off on orders above ₹2,999 (up to ₹1,000)",
    validUntil: "2026-06-30",
    isActive: true,
  },
  {
    code: "FLAT500",
    discountType: "flat",
    discountValue: 500,
    minOrderValue: 3999,
    description: "Flat ₹500 off on orders above ₹3,999",
    validUntil: "2026-06-30",
    isActive: true,
  },
  {
    code: "SILVER15",
    discountType: "percentage",
    discountValue: 15,
    minOrderValue: 1999,
    maxDiscount: 750,
    description: "15% off on orders above ₹1,999 (up to ₹750)",
    validUntil: "2026-04-30",
    isActive: true,
  },
  {
    code: "FESTIVE1000",
    discountType: "flat",
    discountValue: 1000,
    minOrderValue: 5999,
    description: "Flat ₹1,000 off on orders above ₹5,999",
    validUntil: "2026-03-31",
    isActive: true,
  },
  {
    code: "LOVE25",
    discountType: "percentage",
    discountValue: 25,
    minOrderValue: 4999,
    maxDiscount: 1500,
    description: "25% off on orders above ₹4,999 (up to ₹1,500)",
    validUntil: "2026-03-14",
    isActive: true,
  },
];
