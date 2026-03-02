"use client";

import { useState, useEffect } from "react";

export default function PromoBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem("promo-banner-dismissed");
    if (!wasDismissed) {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--banner-height",
      dismissed ? "0px" : "40px"
    );
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("promo-banner-dismissed", "true");
  };

  if (dismissed) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-stone-800 text-stone-100 h-[40px] flex items-center justify-center px-4">
      <p className="text-xs sm:text-sm font-medium text-center truncate">
        FREE SHIPPING on orders above ₹999 | Use code <span className="font-bold">DIARA20</span> for 20% off
      </p>
      <button
        onClick={handleDismiss}
        className="absolute right-3 p-1 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Dismiss banner"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
