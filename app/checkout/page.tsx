"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useCoupon } from "@/context/CouponContext";
import { useOrders } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { useLoyalty } from "@/context/LoyaltyContext";
import CouponInput from "@/components/CouponInput";
import GiftWrapOption from "@/components/GiftWrapOption";
import LoyaltyEarnedNotice from "@/components/LoyaltyEarnedNotice";
import LoyaltyRedeemWidget from "@/components/LoyaltyRedeemWidget";

type Step = 1 | 2 | 3 | 4;

interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const emptyShipping: ShippingInfo = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

const stepLabels = ["Shipping", "Review", "Payment", "Confirmation"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { addToast } = useToast();
  const { appliedCoupon, discountAmount, removeCoupon } = useCoupon();
  const { placeOrder } = useOrders();
  const { isLoggedIn } = useAuth();
  const { earnPoints, redeemPoints, getRedemptionValue } = useLoyalty();

  const [step, setStep] = useState<Step>(1);
  const [shipping, setShipping] = useState<ShippingInfo>(emptyShipping);
  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "upi" | "card">("cod");
  const [orderNumber, setOrderNumber] = useState("");

  // Gift wrap state
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const giftWrapCost = giftWrap ? 99 : 0;

  // Loyalty state
  const [loyaltyPointsUsed, setLoyaltyPointsUsed] = useState(0);
  const [loyaltyDiscount, setLoyaltyDiscount] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);

  const shippingCost = totalPrice >= 999 ? 0 : 49;
  const orderTotal = totalPrice + shippingCost + giftWrapCost - discountAmount - loyaltyDiscount;

  useEffect(() => {
    if (items.length === 0 && step !== 4) {
      router.push("/products");
    }
  }, [items.length, step, router]);

  const validateShipping = (): boolean => {
    const newErrors: Partial<ShippingInfo> = {};
    if (!shipping.name.trim()) newErrors.name = "Name is required";
    if (!shipping.email.trim() || !/\S+@\S+\.\S+/.test(shipping.email))
      newErrors.email = "Valid email is required";
    if (!shipping.phone.trim() || !/^\d{10}$/.test(shipping.phone))
      newErrors.phone = "10-digit phone number required";
    if (!shipping.address.trim()) newErrors.address = "Address is required";
    if (!shipping.city.trim()) newErrors.city = "City is required";
    if (!shipping.state.trim()) newErrors.state = "State is required";
    if (!shipping.pincode.trim() || !/^\d{6}$/.test(shipping.pincode))
      newErrors.pincode = "6-digit pincode required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoyaltyRedeem = (discount: number, points: number) => {
    setLoyaltyDiscount(discount);
    setLoyaltyPointsUsed(points);
  };

  const handleNextStep = () => {
    if (step === 1 && !validateShipping()) return;
    if (step === 3) {
      if (paymentMethod !== "cod") {
        addToast("info", "Only Cash on Delivery is available right now");
        return;
      }
      const num = `DIARA-${Date.now()}`;
      setOrderNumber(num);

      // Place order in OrderContext
      const order = placeOrder({
        orderNumber: num,
        items: items.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.images[0],
        })),
        shipping,
        subtotal: totalPrice,
        shippingCost,
        couponDiscount: discountAmount,
        couponCode: appliedCoupon?.code,
        giftWrap,
        giftMessage: giftWrap ? giftMessage : undefined,
        giftWrapCost,
        loyaltyDiscount,
        total: orderTotal,
        paymentMethod,
        placedAt: new Date().toISOString(),
        pointsEarned: 0,
        pointsRedeemed: loyaltyPointsUsed,
      });

      // Handle loyalty points
      if (isLoggedIn) {
        if (loyaltyPointsUsed > 0) {
          redeemPoints(loyaltyPointsUsed, num);
        }
        const earned = earnPoints(orderTotal, num);
        setPointsEarned(earned);
      }

      clearCart();
      removeCoupon();
      addToast("success", "Order placed successfully!");
    }
    setStep((s) => Math.min(s + 1, 4) as Step);
  };

  if (items.length === 0 && step !== 4) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-10">
        {/* Step indicator */}
        {step < 4 && (
          <div className="flex items-center justify-center mb-12">
            {stepLabels.map((label, i) => {
              const stepNum = i + 1;
              const isActive = stepNum === step;
              const isComplete = stepNum < step;
              return (
                <div key={label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        isComplete
                          ? "bg-emerald-500 text-white"
                          : isActive
                          ? "bg-stone-800 text-white"
                          : "bg-stone-200 text-stone-500"
                      }`}
                    >
                      {isComplete ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        stepNum
                      )}
                    </div>
                    <span
                      className={`text-xs mt-1.5 font-medium ${
                        isActive ? "text-stone-800" : "text-stone-400"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <div
                      className={`w-12 sm:w-20 h-0.5 mx-2 mb-5 ${
                        stepNum < step ? "bg-emerald-500" : "bg-stone-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Step 1: Shipping */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-100">
            <h2 className="font-playfair text-2xl text-stone-800 mb-6">Shipping Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <InputField label="Full Name" value={shipping.name} error={errors.name} onChange={(v) => setShipping({ ...shipping, name: v })} />
              <InputField label="Email Address" type="email" value={shipping.email} error={errors.email} onChange={(v) => setShipping({ ...shipping, email: v })} />
              <InputField label="Phone Number" type="tel" value={shipping.phone} error={errors.phone} onChange={(v) => setShipping({ ...shipping, phone: v })} placeholder="10-digit number" />
              <div className="md:col-span-2">
                <InputField label="Address" value={shipping.address} error={errors.address} onChange={(v) => setShipping({ ...shipping, address: v })} />
              </div>
              <InputField label="City" value={shipping.city} error={errors.city} onChange={(v) => setShipping({ ...shipping, city: v })} />
              <InputField label="State" value={shipping.state} error={errors.state} onChange={(v) => setShipping({ ...shipping, state: v })} />
              <InputField label="Pincode" value={shipping.pincode} error={errors.pincode} onChange={(v) => setShipping({ ...shipping, pincode: v })} placeholder="6-digit pincode" />
            </div>
            <button
              onClick={handleNextStep}
              className="mt-8 w-full py-3.5 bg-stone-800 text-white font-medium rounded-full hover:bg-stone-700 transition-colors text-sm tracking-wide"
            >
              Continue to Review
            </button>
          </div>
        )}

        {/* Step 2: Order Summary */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-100">
            <h2 className="font-playfair text-2xl text-stone-800 mb-6">Order Summary</h2>

            {/* Shipping address preview */}
            <div className="bg-stone-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-stone-700">Shipping to</h3>
                <button onClick={() => setStep(1)} className="text-xs text-stone-500 hover:text-stone-700 underline">
                  Edit
                </button>
              </div>
              <p className="text-sm text-stone-600">
                {shipping.name}<br />
                {shipping.address}<br />
                {shipping.city}, {shipping.state} - {shipping.pincode}<br />
                {shipping.phone} &middot; {shipping.email}
              </p>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-800 truncate">{item.product.name}</p>
                    <p className="text-xs text-stone-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-stone-800">
                    ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-stone-700 mb-2">Apply Coupon</h3>
              <CouponInput orderTotal={totalPrice} />
            </div>

            {/* Gift Wrap */}
            <div className="mb-4">
              <GiftWrapOption
                enabled={giftWrap}
                message={giftMessage}
                onToggle={setGiftWrap}
                onMessageChange={setGiftMessage}
              />
            </div>

            {/* Loyalty Points */}
            {isLoggedIn && (
              <div className="mb-4">
                <LoyaltyRedeemWidget
                  onRedeem={handleLoyaltyRedeem}
                  redeemedPoints={loyaltyPointsUsed}
                />
              </div>
            )}

            {/* Totals */}
            <div className="border-t border-stone-100 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Subtotal</span>
                <span className="text-stone-700">₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Shipping</span>
                <span className={shippingCost === 0 ? "text-emerald-600 font-medium" : "text-stone-700"}>
                  {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                </span>
              </div>
              {giftWrapCost > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Gift Wrapping</span>
                  <span className="text-stone-700">₹{giftWrapCost}</span>
                </div>
              )}
              {discountAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-600">Coupon ({appliedCoupon?.code})</span>
                  <span className="text-emerald-600 font-medium">-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              {loyaltyDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-amber-600">Loyalty Points ({loyaltyPointsUsed} pts)</span>
                  <span className="text-amber-600 font-medium">-₹{loyaltyDiscount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-stone-100">
                <span className="text-stone-800">Total</span>
                <span className="text-stone-800">₹{orderTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Loyalty earned notice */}
            {isLoggedIn && (
              <div className="mt-4">
                <LoyaltyEarnedNotice orderTotal={orderTotal} />
              </div>
            )}

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3.5 border border-stone-200 text-stone-600 font-medium rounded-full hover:bg-stone-50 transition-colors text-sm"
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                className="flex-1 py-3.5 bg-stone-800 text-white font-medium rounded-full hover:bg-stone-700 transition-colors text-sm tracking-wide"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-100">
            <h2 className="font-playfair text-2xl text-stone-800 mb-6">Payment Method</h2>

            <div className="space-y-3 mb-8">
              <label
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  paymentMethod === "cod" ? "border-stone-800 bg-stone-50" : "border-stone-100 hover:border-stone-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-stone-800"
                />
                <div>
                  <p className="font-medium text-stone-800">Cash on Delivery</p>
                  <p className="text-xs text-stone-500">Pay when you receive your order</p>
                </div>
              </label>

              <label
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  paymentMethod === "upi" ? "border-stone-800 bg-stone-50" : "border-stone-100 hover:border-stone-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                  className="accent-stone-800"
                />
                <div>
                  <p className="font-medium text-stone-800">
                    UPI <span className="text-xs text-stone-400 ml-2">Coming Soon</span>
                  </p>
                  <p className="text-xs text-stone-500">Pay using Google Pay, PhonePe, etc.</p>
                </div>
              </label>

              <label
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  paymentMethod === "card" ? "border-stone-800 bg-stone-50" : "border-stone-100 hover:border-stone-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="accent-stone-800"
                />
                <div>
                  <p className="font-medium text-stone-800">
                    Credit / Debit Card <span className="text-xs text-stone-400 ml-2">Coming Soon</span>
                  </p>
                  <p className="text-xs text-stone-500">Visa, Mastercard, RuPay</p>
                </div>
              </label>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 mb-8">
              <div className="flex justify-between text-base font-semibold">
                <span className="text-stone-800">Total to Pay</span>
                <span className="text-stone-800">₹{orderTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3.5 border border-stone-200 text-stone-600 font-medium rounded-full hover:bg-stone-50 transition-colors text-sm"
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                className="flex-1 py-3.5 bg-stone-800 text-white font-medium rounded-full hover:bg-stone-700 transition-colors text-sm tracking-wide"
              >
                Place Order
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-stone-100 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-playfair text-3xl text-stone-800 mb-2">Order Confirmed!</h2>
            <p className="text-stone-500 mb-6">Thank you for shopping with DIARA</p>

            <div className="bg-stone-50 rounded-xl p-5 inline-block mb-6">
              <p className="text-sm text-stone-500 mb-1">Order Number</p>
              <p className="text-lg font-semibold text-stone-800 font-mono">{orderNumber}</p>
            </div>

            {pointsEarned > 0 && (
              <div className="bg-amber-50 rounded-xl p-4 mb-6 max-w-sm mx-auto border border-amber-100">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="text-sm font-medium text-amber-800">
                    You earned {pointsEarned} loyalty points!
                  </p>
                </div>
              </div>
            )}

            <div className="text-sm text-stone-500 mb-8 max-w-md mx-auto">
              <p>
                A confirmation has been sent to <strong className="text-stone-700">{shipping.email}</strong>.
                Your order will be shipped within 2-4 business days.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/track-order`}
                className="px-8 py-3 bg-stone-800 text-white font-medium rounded-full hover:bg-stone-700 transition-colors text-sm text-center"
              >
                Track Order
              </Link>
              <button
                onClick={() => router.push("/products")}
                className="px-8 py-3 border border-stone-200 text-stone-600 font-medium rounded-full hover:bg-stone-50 transition-colors text-sm"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-8 py-3 border border-stone-200 text-stone-600 font-medium rounded-full hover:bg-stone-50 transition-colors text-sm"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  value,
  error,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-xl border ${
          error ? "border-red-300 bg-red-50/50" : "border-stone-200"
        } text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-colors`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
