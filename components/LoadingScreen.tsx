"use client";

import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FDFBF7] transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <div className="relative">
        <h1
          className="font-playfair text-5xl md:text-6xl tracking-wider text-stone-800"
          style={{ animationDelay: "0.2s" }}
        >
          DIARA
        </h1>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent" />
      </div>

      {/* Tagline */}
      <p className="mt-6 text-sm tracking-[0.3em] text-stone-400 uppercase">
        Fine Silver Jewellery
      </p>

      {/* Loader */}
      <div className="mt-10 flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-stone-300 animate-bounce" style={{ animationDelay: "0s" }} />
        <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "0.15s" }} />
        <span className="w-2 h-2 rounded-full bg-stone-500 animate-bounce" style={{ animationDelay: "0.3s" }} />
      </div>
    </div>
  );
}
