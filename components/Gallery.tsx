import Image from "next/image";
import { galleryImages } from "@/data/content";

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-32 px-6 lg:px-8 bg-gradient-to-b from-[#FAF8F5] via-stone-50/10 to-[#FAF8F5] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-slate-100/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-stone-100/15 to-transparent rounded-full blur-3xl" />

      {/* Decorative pattern */}
      <div className="absolute top-10 right-10 opacity-5">
        <svg width="120" height="120" viewBox="0 0 120 120" className="text-slate-700">
          <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="60" cy="60" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="60" cy="20" r="6" fill="currentColor" opacity="0.3"/>
          <circle cx="100" cy="60" r="6" fill="currentColor" opacity="0.3"/>
          <circle cx="60" cy="100" r="6" fill="currentColor" opacity="0.3"/>
          <circle cx="20" cy="60" r="6" fill="currentColor" opacity="0.3"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Decorative top ornament */}
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
            Lookbook
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          </h2>
          <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto mt-6 italic">
            Explore our latest designs and timeless favourites
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="aspect-square overflow-hidden rounded-sm group cursor-pointer relative hover:scale-[1.02] transition-all duration-500 shadow-md hover:shadow-xl bg-stone-100"
            >
              {/* Real jewellery image */}
              <Image
                src={image.image}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />

              {/* Silver shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              {/* Elegant vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hover text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs text-stone-700 font-medium tracking-wider bg-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center">
          <p className="text-stone-600 text-sm md:text-base mb-4">
            New drops every month. Follow us on Instagram.
          </p>
          <a
            href="https://instagram.com/diara.jewels"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-stone-700 hover:text-stone-900 font-medium text-sm tracking-wide transition-colors group"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @diara.jewels
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
