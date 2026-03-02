"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    // Simulate subscription
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section className="py-20 md:py-28 px-6 lg:px-8 bg-gradient-to-b from-stone-100/50 via-[#FAF8F5] to-stone-50/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          <svg viewBox="0 0 600 600" className="text-stone-800 w-full h-full">
            <circle cx="300" cy="300" r="200" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="300" cy="300" r="250" fill="none" stroke="currentColor" strokeWidth="0.3"/>
            <circle cx="300" cy="300" r="150" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </svg>
        </div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        {/* Decorative ornament */}
        <div className="flex justify-center mb-6">
          <svg width="60" height="20" viewBox="0 0 60 20" className="text-slate-700/40">
            <path d="M0 10 Q15 3, 30 10 T60 10" stroke="currentColor" strokeWidth="0.5" fill="none"/>
            <circle cx="30" cy="10" r="3" fill="currentColor"/>
          </svg>
        </div>

        {/* Envelope icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
        </div>

        <h2 className="font-playfair text-3xl md:text-4xl text-stone-800 mb-4">
          Stay in the Loop
        </h2>
        <p className="text-stone-600 text-base md:text-lg mb-8 max-w-lg mx-auto">
          Be the first to know about new collections, exclusive offers, and styling tips.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="flex-1 relative">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="Enter your email"
              className={`w-full px-5 py-3.5 bg-white border rounded-sm text-stone-700 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all ${
                status === "error" ? "border-red-300" : "border-stone-200"
              }`}
              aria-label="Email address"
            />
            {status === "error" && (
              <p className="absolute -bottom-5 left-0 text-red-400 text-xs">
                Please enter a valid email address
              </p>
            )}
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 bg-stone-800 text-white text-sm font-medium tracking-wide rounded-sm hover:bg-stone-900 transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

        {/* Success message */}
        {status === "success" && (
          <div className="mt-6 flex items-center justify-center gap-2 text-stone-600">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">
              Welcome to the DIARA family! Check your inbox soon.
            </span>
          </div>
        )}

        {/* Privacy note */}
        <p className="text-stone-400 text-xs mt-6">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
