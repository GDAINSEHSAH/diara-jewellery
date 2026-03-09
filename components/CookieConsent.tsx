"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("diara-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("diara-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("diara-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up">
      <div className="max-w-2xl mx-auto bg-white dark:bg-stone-800 rounded-2xl shadow-2xl border border-stone-100 dark:border-stone-700 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            We use cookies to enhance your browsing experience and provide
            personalised recommendations.{" "}
            <button
              onClick={() => window.open("/privacy", "_blank")}
              className="underline underline-offset-2 text-stone-800 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400 transition-colors"
            >
              Learn more
            </button>
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2 text-sm tracking-wide text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-6 py-2.5 bg-stone-800 dark:bg-stone-100 text-white dark:text-stone-900 text-sm tracking-widest uppercase rounded-full hover:bg-stone-700 dark:hover:bg-stone-200 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
