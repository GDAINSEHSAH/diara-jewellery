"use client";

import Link from "next/link";
import { collections } from "@/data/content";
import CollectionCard from "./CollectionCard";

interface CollectionsProps {
  onViewLookbook: () => void;
}

export default function Collections({ onViewLookbook }: CollectionsProps) {
  return (
    <section id="collections" className="py-20 md:py-32 px-6 lg:px-8 bg-gradient-to-b from-[#FAF8F5] via-slate-50/20 to-[#FAF8F5] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-l from-slate-100/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-stone-100/20 to-transparent rounded-full blur-3xl" />

      {/* Decorative corner ornaments */}
      <div className="absolute top-10 left-10 opacity-10">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-slate-700">
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="50" cy="20" r="5" fill="currentColor" opacity="0.3"/>
          <circle cx="80" cy="50" r="5" fill="currentColor" opacity="0.3"/>
          <circle cx="50" cy="80" r="5" fill="currentColor" opacity="0.3"/>
          <circle cx="20" cy="50" r="5" fill="currentColor" opacity="0.3"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Decorative top ornament */}
          <div className="flex justify-center mb-6">
            <svg width="120" height="30" viewBox="0 0 120 30" className="text-slate-700/40">
              <path d="M0 15 Q30 5, 60 15 T120 15" stroke="currentColor" strokeWidth="0.5" fill="none"/>
              <circle cx="60" cy="15" r="3" fill="currentColor"/>
              <circle cx="30" cy="12" r="2" fill="currentColor" opacity="0.6"/>
              <circle cx="90" cy="12" r="2" fill="currentColor" opacity="0.6"/>
              <circle cx="15" cy="15" r="1.5" fill="currentColor" opacity="0.4"/>
              <circle cx="105" cy="15" r="1.5" fill="currentColor" opacity="0.4"/>
            </svg>
          </div>

          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-stone-800 mb-6 relative inline-block">
            Collections
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          </h2>
          <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto mt-6 italic">
            Discover pieces designed for every moment of your journey
          </p>
        </div>

        {/* Collection Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              title={collection.title}
              description={collection.description}
              imageColor={collection.imageColor}
              image={collection.image}
              onViewClick={onViewLookbook}
            />
          ))}
        </div>

        {/* Shop All CTA */}
        <div className="text-center mt-14">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-800 text-white font-medium rounded-full hover:bg-stone-700 transition-colors text-sm tracking-wide group"
          >
            Shop All Products
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
