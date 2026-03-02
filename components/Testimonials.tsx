"use client";

import { useState, useEffect, useCallback } from "react";
import { testimonials } from "@/data/content";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  const testimonial = testimonials[current];

  return (
    <section className="py-20 md:py-32 px-6 lg:px-8 bg-gradient-to-b from-[#FAF8F5] via-stone-50/30 to-[#FAF8F5] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-br from-slate-100/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-tl from-stone-100/15 to-transparent rounded-full blur-3xl" />

      {/* Decorative quote marks */}
      <div className="absolute top-20 left-10 md:left-20 opacity-[0.03]">
        <svg width="120" height="100" viewBox="0 0 120 100" className="text-stone-800">
          <text x="0" y="90" fontSize="140" fontFamily="Georgia, serif" fill="currentColor">&ldquo;</text>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <svg width="140" height="35" viewBox="0 0 140 35" className="text-slate-700/40">
              <path d="M0 17 Q35 7, 70 17 T140 17" stroke="currentColor" strokeWidth="0.5" fill="none"/>
              <circle cx="70" cy="17" r="4" fill="currentColor"/>
              <circle cx="35" cy="13" r="2.5" fill="currentColor" opacity="0.6"/>
              <circle cx="105" cy="13" r="2.5" fill="currentColor" opacity="0.6"/>
              <circle cx="17" cy="17" r="2" fill="currentColor" opacity="0.4"/>
              <circle cx="123" cy="17" r="2" fill="currentColor" opacity="0.4"/>
              <path d="M65 22 L70 27 L75 22" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5"/>
            </svg>
          </div>

          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-stone-800 mb-6 relative inline-block">
            What Our Customers Say
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          </h2>
          <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto mt-6 italic">
            Loved by women across India
          </p>
        </div>

        {/* Testimonial Card */}
        <div
          className="relative bg-white/60 backdrop-blur-sm rounded-sm p-8 md:p-12 shadow-lg border border-stone-100/50"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-stone-300/40" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-stone-300/40" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-stone-300/40" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-stone-300/40" />

          {/* Quote icon */}
          <div className="flex justify-center mb-6">
            <svg width="32" height="24" viewBox="0 0 32 24" className="text-stone-300">
              <path d="M0 24V14.4C0 10.4 0.8 7.2 2.4 4.8C4.1 2.4 6.5 0.8 9.6 0L11.2 3.2C9.1 3.8 7.5 4.9 6.4 6.4C5.3 7.9 4.8 9.7 4.8 11.8H9.6V24H0ZM20.4 24V14.4C20.4 10.4 21.2 7.2 22.8 4.8C24.5 2.4 26.9 0.8 30 0L31.6 3.2C29.5 3.8 27.9 4.9 26.8 6.4C25.7 7.9 25.2 9.7 25.2 11.8H30V24H20.4Z" fill="currentColor"/>
            </svg>
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Testimonial text */}
          <p className="text-stone-700 text-base md:text-lg leading-relaxed text-center max-w-2xl mx-auto mb-8 italic">
            &ldquo;{testimonial.text}&rdquo;
          </p>

          {/* Author */}
          <div className="text-center">
            <p className="font-playfair text-lg text-stone-800 mb-1">
              {testimonial.name}
            </p>
            <p className="text-stone-500 text-sm">
              {testimonial.location} &middot; {testimonial.product}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          {/* Prev button */}
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-100 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-4 h-4 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-stone-700 w-6"
                    : "bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-100 transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-4 h-4 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
