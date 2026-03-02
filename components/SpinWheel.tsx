"use client";

import { useState, useRef } from "react";
import { wheelSegments, spinForPrize, getRotationForSegment } from "@/data/spinwheel";
import { useCoupon } from "@/context/CouponContext";
import { useLoyalty } from "@/context/LoyaltyContext";
import { useAuth } from "@/context/AuthContext";

interface Props {
  onClose: () => void;
}

type Phase = "email" | "ready" | "spinning" | "result";

export default function SpinWheel({ onClose }: Props) {
  const [phase, setPhase] = useState<Phase>("email");
  const [email, setEmail] = useState("");
  const [rotation, setRotation] = useState(0);
  const [winIndex, setWinIndex] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const wheelRef = useRef<SVGSVGElement>(null);
  const { setWonCoupon } = useCoupon();
  const { earnPoints } = useLoyalty();
  const { isLoggedIn } = useAuth();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      localStorage.setItem("diara-spin-email", email);
    } catch {}
    setPhase("ready");
  };

  const handleSpin = () => {
    const prizeIndex = spinForPrize();
    const targetRotation = getRotationForSegment(prizeIndex);
    setWinIndex(prizeIndex);
    setRotation(targetRotation);
    setPhase("spinning");

    setTimeout(() => {
      setPhase("result");
      try {
        localStorage.setItem("diara-spin-used", "true");
      } catch {}

      const segment = wheelSegments[prizeIndex];
      if (segment.type === "coupon" && segment.couponCode) {
        setWonCoupon(segment.couponCode);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      } else if (segment.type === "points" && segment.pointsValue) {
        if (isLoggedIn) {
          earnPoints(segment.pointsValue * 10, "spin-wheel"); // Convert to spend amount
        }
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }, 4200);
  };

  const segment = winIndex !== null ? wheelSegments[winIndex] : null;
  const segmentAngle = 360 / wheelSegments.length;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[70]">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ["#f59e0b", "#ef4444", "#8b5cf6", "#10b981", "#3b82f6", "#ec4899"][i % 6],
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <div className="relative z-[65] bg-white dark:bg-stone-800 rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-8">
          <h2 className="font-playfair text-2xl text-stone-800 dark:text-stone-100 text-center mb-1">
            Spin &amp; Win
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-sm text-center mb-6">
            Try your luck for an exclusive discount!
          </p>

          {/* Email Phase */}
          {phase === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email to spin"
                required
                className="w-full px-4 py-3 border border-stone-200 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-800"
              />
              <button
                type="submit"
                className="w-full py-3 bg-stone-800 text-white font-medium rounded-full hover:bg-stone-700 transition-colors text-sm"
              >
                Continue
              </button>
            </form>
          )}

          {/* Wheel (ready, spinning, result) */}
          {phase !== "email" && (
            <div className="flex flex-col items-center">
              {/* Pointer Arrow */}
              <div className="relative mb-[-12px] z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" className="text-stone-800 dark:text-stone-100">
                  <polygon points="12,24 4,8 20,8" fill="currentColor" />
                </svg>
              </div>

              {/* Wheel SVG */}
              <div className="relative">
                <svg
                  ref={wheelRef}
                  viewBox="0 0 300 300"
                  className="w-72 h-72"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: phase === "spinning" ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
                  }}
                >
                  {wheelSegments.map((seg, i) => {
                    const startAngle = (i * segmentAngle * Math.PI) / 180;
                    const endAngle = ((i + 1) * segmentAngle * Math.PI) / 180;
                    const cx = 150, cy = 150, r = 140;
                    const x1 = cx + r * Math.cos(startAngle);
                    const y1 = cy + r * Math.sin(startAngle);
                    const x2 = cx + r * Math.cos(endAngle);
                    const y2 = cy + r * Math.sin(endAngle);
                    const largeArc = segmentAngle > 180 ? 1 : 0;
                    const midAngle = (startAngle + endAngle) / 2;
                    const textR = r * 0.65;
                    const tx = cx + textR * Math.cos(midAngle);
                    const ty = cy + textR * Math.sin(midAngle);
                    const textAngle = (midAngle * 180) / Math.PI;

                    return (
                      <g key={i}>
                        <path
                          d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                          fill={seg.color}
                          stroke="#ffffff"
                          strokeWidth="1"
                        />
                        <text
                          x={tx}
                          y={ty}
                          fill={seg.textColor}
                          fontSize="11"
                          fontWeight="600"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${textAngle}, ${tx}, ${ty})`}
                        >
                          {seg.label}
                        </text>
                      </g>
                    );
                  })}
                  {/* Center circle */}
                  <circle cx="150" cy="150" r="20" fill="#292524" stroke="#ffffff" strokeWidth="2" />
                  <text x="150" y="150" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                    DIARA
                  </text>
                </svg>
              </div>

              {/* Spin Button */}
              {phase === "ready" && (
                <button
                  onClick={handleSpin}
                  className="mt-6 px-10 py-3.5 bg-stone-800 text-white font-medium rounded-full hover:bg-stone-700 transition-all text-sm tracking-wide hover:scale-105 active:scale-95"
                >
                  Spin the Wheel!
                </button>
              )}

              {phase === "spinning" && (
                <p className="mt-6 text-stone-500 dark:text-stone-400 text-sm animate-pulse">
                  Spinning...
                </p>
              )}

              {/* Result */}
              {phase === "result" && segment && (
                <div className="mt-6 text-center">
                  {segment.type === "coupon" && segment.couponCode ? (
                    <div>
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium text-lg mb-2">
                        You won {segment.label}!
                      </p>
                      <div className="bg-stone-100 dark:bg-stone-700 rounded-xl px-6 py-3 inline-block">
                        <code className="text-stone-800 dark:text-stone-100 font-mono font-bold text-lg tracking-wider">
                          {segment.couponCode}
                        </code>
                      </div>
                      <p className="text-xs text-stone-400 mt-2">
                        Coupon saved! Apply at checkout.
                      </p>
                    </div>
                  ) : segment.type === "points" ? (
                    <div>
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium text-lg mb-1">
                        You won {segment.pointsValue} Loyalty Points!
                      </p>
                      {!isLoggedIn && (
                        <p className="text-xs text-stone-400">
                          Sign in to claim your points
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-stone-600 dark:text-stone-400 font-medium text-lg mb-1">
                        Better luck next time!
                      </p>
                      <p className="text-xs text-stone-400">
                        Check out our offers page for active coupons
                      </p>
                    </div>
                  )}
                  <button
                    onClick={onClose}
                    className="mt-4 px-8 py-2.5 bg-stone-800 text-white text-sm font-medium rounded-full hover:bg-stone-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
