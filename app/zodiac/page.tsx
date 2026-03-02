"use client";

import { useState, useEffect, useRef } from "react";
import { zodiacSigns, getZodiacByDate, ZodiacSign } from "@/data/zodiac";
import ZodiacCard from "@/components/zodiac/ZodiacCard";
import ZodiacDetail from "@/components/zodiac/ZodiacDetail";
import BirthMonthSelector from "@/components/zodiac/BirthMonthSelector";

export default function ZodiacPage() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [userSign, setUserSign] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"zodiac" | "month">("zodiac");
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("diara-user-birthday");
      if (saved) {
        const { month, day } = JSON.parse(saved);
        const sign = getZodiacByDate(month, day);
        if (sign) setUserSign(sign.name);
      }
    } catch {}
  }, []);

  const handleSelectSign = (sign: ZodiacSign) => {
    setSelectedSign(sign);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleSaveBirthday = (month: number, day: number) => {
    try {
      localStorage.setItem("diara-user-birthday", JSON.stringify({ month, day }));
    } catch {}
    const sign = getZodiacByDate(month, day);
    if (sign) {
      setUserSign(sign.name);
      handleSelectSign(sign);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-stone-900">
      <div className="h-20" />

      {/* Hero */}
      <div className="relative bg-gradient-to-b from-indigo-950 via-purple-950 to-[#FDFBF7] dark:to-stone-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-playfair text-4xl md:text-5xl text-white mb-4">
            Zodiac &amp; Birthstone Collection
          </h1>
          <p className="text-purple-200 max-w-2xl mx-auto leading-relaxed">
            Discover jewellery that aligns with your stars. Find pieces curated for your zodiac sign,
            birthstone, and celestial energy.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        {/* Toggle */}
        <div className="flex justify-center mt-8 mb-10">
          <div className="inline-flex bg-stone-100 dark:bg-stone-800 rounded-full p-1">
            <button
              onClick={() => setViewMode("zodiac")}
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all ${
                viewMode === "zodiac"
                  ? "bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
              }`}
            >
              By Zodiac Sign
            </button>
            <button
              onClick={() => setViewMode("month")}
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all ${
                viewMode === "month"
                  ? "bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
              }`}
            >
              By Birth Month
            </button>
          </div>
        </div>

        {viewMode === "zodiac" ? (
          <>
            {/* Zodiac Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {zodiacSigns.map((sign) => (
                <ZodiacCard
                  key={sign.name}
                  sign={sign}
                  isSelected={selectedSign?.name === sign.name}
                  isUserSign={userSign === sign.name}
                  onClick={() => handleSelectSign(sign)}
                />
              ))}
            </div>
          </>
        ) : (
          <BirthMonthSelector
            onSelectSign={handleSelectSign}
            onSaveBirthday={handleSaveBirthday}
          />
        )}

        {/* Detail Panel */}
        {selectedSign && (
          <div ref={detailRef} className="mt-12">
            <ZodiacDetail sign={selectedSign} />
          </div>
        )}
      </div>
    </div>
  );
}
