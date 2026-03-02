"use client";

import { useState, useEffect } from "react";

type SizeTab = "ring" | "bracelet" | "anklet";

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: SizeTab;
}

const ringData = [
  { size: "5", diameter: "15.7 mm", circumference: "49.3 mm" },
  { size: "6", diameter: "16.5 mm", circumference: "51.8 mm" },
  { size: "7", diameter: "17.3 mm", circumference: "54.4 mm" },
  { size: "8", diameter: "18.1 mm", circumference: "56.9 mm" },
  { size: "9", diameter: "19.0 mm", circumference: "59.5 mm" },
  { size: "10", diameter: "19.8 mm", circumference: "62.1 mm" },
];

const braceletData = [
  { size: "XS", wrist: "13–14 cm", bracelet: "15–16 cm" },
  { size: "S", wrist: "14–15 cm", bracelet: "16–17 cm" },
  { size: "M", wrist: "15–16.5 cm", bracelet: "17–18 cm" },
  { size: "L", wrist: "16.5–18 cm", bracelet: "18–19 cm" },
  { size: "XL", wrist: "18–19 cm", bracelet: "19–20 cm" },
];

const ankletData = [
  { size: "S", ankle: "20–21 cm", anklet: "22–23 cm" },
  { size: "M", ankle: "21–23 cm", anklet: "23–25 cm" },
  { size: "L", ankle: "23–25 cm", anklet: "25–27 cm" },
  { size: "XL", ankle: "25–27 cm", anklet: "27–29 cm" },
];

export default function SizeGuide({ isOpen, onClose, defaultTab = "ring" }: SizeGuideProps) {
  const [activeTab, setActiveTab] = useState<SizeTab>(defaultTab);

  useEffect(() => {
    if (isOpen) setActiveTab(defaultTab);
  }, [isOpen, defaultTab]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs: { id: SizeTab; label: string }[] = [
    { id: "ring", label: "Ring" },
    { id: "bracelet", label: "Bracelet" },
    { id: "anklet", label: "Anklet" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <h2 className="font-playfair text-xl text-stone-800">Size Guide</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors" aria-label="Close">
            <svg className="w-5 h-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-stone-800"
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-800" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {activeTab === "ring" && (
            <>
              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="text-left py-2 font-semibold text-stone-700">Size (US)</th>
                    <th className="text-left py-2 font-semibold text-stone-700">Diameter</th>
                    <th className="text-left py-2 font-semibold text-stone-700">Circumference</th>
                  </tr>
                </thead>
                <tbody>
                  {ringData.map((row) => (
                    <tr key={row.size} className="border-b border-stone-50">
                      <td className="py-2.5 text-stone-700 font-medium">{row.size}</td>
                      <td className="py-2.5 text-stone-500">{row.diameter}</td>
                      <td className="py-2.5 text-stone-500">{row.circumference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-stone-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-stone-700 mb-2">How to Measure</h3>
                <ol className="text-sm text-stone-500 space-y-1.5 list-decimal list-inside">
                  <li>Wrap a thin strip of paper or string snugly around the base of your finger.</li>
                  <li>Mark where the strip overlaps and measure the length in millimetres.</li>
                  <li>Match the circumference to the chart above to find your ring size.</li>
                  <li>For the best fit, measure at the end of the day when fingers are slightly larger.</li>
                </ol>
              </div>
            </>
          )}

          {activeTab === "bracelet" && (
            <>
              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="text-left py-2 font-semibold text-stone-700">Size</th>
                    <th className="text-left py-2 font-semibold text-stone-700">Wrist</th>
                    <th className="text-left py-2 font-semibold text-stone-700">Bracelet Length</th>
                  </tr>
                </thead>
                <tbody>
                  {braceletData.map((row) => (
                    <tr key={row.size} className="border-b border-stone-50">
                      <td className="py-2.5 text-stone-700 font-medium">{row.size}</td>
                      <td className="py-2.5 text-stone-500">{row.wrist}</td>
                      <td className="py-2.5 text-stone-500">{row.bracelet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-stone-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-stone-700 mb-2">How to Measure</h3>
                <ol className="text-sm text-stone-500 space-y-1.5 list-decimal list-inside">
                  <li>Use a flexible measuring tape around the widest part of your wrist.</li>
                  <li>If using string, wrap it comfortably and measure against a ruler.</li>
                  <li>Add 1–2 cm for a comfortable fit, or choose snug for bangles.</li>
                  <li>If between sizes, size up for chain bracelets, size down for cuffs.</li>
                </ol>
              </div>
            </>
          )}

          {activeTab === "anklet" && (
            <>
              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="text-left py-2 font-semibold text-stone-700">Size</th>
                    <th className="text-left py-2 font-semibold text-stone-700">Ankle</th>
                    <th className="text-left py-2 font-semibold text-stone-700">Anklet Length</th>
                  </tr>
                </thead>
                <tbody>
                  {ankletData.map((row) => (
                    <tr key={row.size} className="border-b border-stone-50">
                      <td className="py-2.5 text-stone-700 font-medium">{row.size}</td>
                      <td className="py-2.5 text-stone-500">{row.ankle}</td>
                      <td className="py-2.5 text-stone-500">{row.anklet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-stone-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-stone-700 mb-2">How to Measure</h3>
                <ol className="text-sm text-stone-500 space-y-1.5 list-decimal list-inside">
                  <li>Wrap a flexible measuring tape around the narrowest part of your ankle, just above the ankle bone.</li>
                  <li>Add 2 cm for a standard hanging fit.</li>
                  <li>For a snug fit, add only 1 cm.</li>
                  <li>Most DIARA anklets are adjustable for a perfect fit.</li>
                </ol>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
