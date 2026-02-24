"use client";

import Image from "next/image";

interface HeroProps {
  onExploreClick: () => void;
  onStoryClick: () => void;
}

export default function Hero({ onExploreClick, onStoryClick }: HeroProps) {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20 relative overflow-hidden"
    >
      {/* Background jewellery image */}
      <Image
        src="https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?w=1920&q=80&fit=crop"
        alt=""
        fill
        className="object-cover"
        priority
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/10 to-black/30" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Decorative ornament top */}
        <div className="mb-8 animate-fadeIn flex justify-center">
          <svg width="80" height="20" viewBox="0 0 80 20" className="text-white/40">
            <path d="M0 10 Q20 0, 40 10 T80 10" stroke="currentColor" strokeWidth="0.5" fill="none"/>
            <circle cx="40" cy="10" r="2" fill="currentColor"/>
            <circle cx="20" cy="7" r="1.5" fill="currentColor"/>
            <circle cx="60" cy="7" r="1.5" fill="currentColor"/>
          </svg>
        </div>

        <h1 className="font-playfair text-6xl md:text-7xl lg:text-9xl mb-8 animate-fadeIn relative">
          <span className="relative inline-block bg-gradient-to-br from-white via-stone-200 to-white bg-clip-text text-transparent" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            ✨ DIARA ✨
            <div className="absolute -inset-6 bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-3xl -z-10 animate-pulse-slow" />
            {/* Underline decoration */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
          </span>
        </h1>

        {/* Decorative divider with diamond */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fadeIn animation-delay-200">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/40 to-white/60" />
          <svg width="20" height="20" viewBox="0 0 20 20" className="text-white/60 flex-shrink-0">
            <path d="M10 0 L15 10 L10 20 L5 10 Z" fill="currentColor" opacity="0.6"/>
            <path d="M10 3 L13 10 L10 17 L7 10 Z" fill="currentColor" opacity="0.8"/>
          </svg>
          <div className="w-16 h-px bg-gradient-to-l from-transparent via-white/40 to-white/60" />
        </div>

        <p className="text-2xl md:text-3xl lg:text-4xl mb-6 font-light animate-fadeIn animation-delay-200 text-white/90">
          <span className="font-playfair italic tracking-wide">Fine Silver Jewellery for Modern Elegance</span>
        </p>

        <p className="text-xs md:text-sm text-white/60 mb-14 tracking-[0.35em] uppercase font-medium animate-fadeIn animation-delay-400">
          Daily wear <span className="text-white/40 mx-2">◆</span> Party wear <span className="text-white/40 mx-2">◆</span> Statement pieces
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeIn animation-delay-600">
          <button
            onClick={onExploreClick}
            className="group relative px-12 py-5 bg-white/90 text-stone-800 text-sm tracking-[0.2em] font-semibold hover:bg-white hover:shadow-2xl transition-all duration-500 overflow-hidden backdrop-blur-sm"
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 18 18" className="text-stone-700">
                <path d="M9 0 L12 6 L18 6 L13.5 10.5 L15 18 L9 13.5 L3 18 L4.5 10.5 L0 6 L6 6 Z" fill="currentColor" opacity="0.7"/>
              </svg>
              Explore Collections
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-200/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>

          <button
            onClick={onStoryClick}
            className="group relative px-12 py-5 border-2 border-white/40 text-white text-sm tracking-[0.2em] font-semibold hover:border-white/70 hover:bg-white/10 transition-all duration-500 backdrop-blur-sm overflow-hidden"
          >
            <span className="relative z-10">Our Story</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>
        </div>

        {/* Decorative ornament bottom */}
        <div className="mt-12 animate-fadeIn animation-delay-600 flex justify-center">
          <svg width="60" height="15" viewBox="0 0 60 15" className="text-white/30">
            <path d="M0 7 Q15 0, 30 7 T60 7" stroke="currentColor" strokeWidth="0.5" fill="none"/>
            <circle cx="30" cy="7" r="1.5" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Elegant scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/50 tracking-widest uppercase">Scroll</span>
          <svg
            className="w-5 h-5 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
