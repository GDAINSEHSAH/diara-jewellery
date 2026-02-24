import Image from "next/image";
import { brandPillars } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/10 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-slate-100/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-stone-100/10 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Left: Heading + Accent Image */}
          <div>
            <div className="mb-6">
              <svg width="60" height="15" viewBox="0 0 60 15" className="text-slate-700/40 mb-4">
                <path d="M0 7 Q15 0, 30 7 T60 7" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                <circle cx="30" cy="7" r="1.5" fill="currentColor"/>
              </svg>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-stone-800 mb-6 leading-tight">
              Our Story
            </h2>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-slate-600 to-transparent" />
              <div className="w-2 h-2 rounded-full bg-slate-600/60" />
            </div>
            {/* Accent lifestyle image */}
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1624588057318-5f1b2eb81012?w=800&q=80&fit=crop"
                alt="Jewellery craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right: Story text */}
          <div className="space-y-6 text-stone-600 leading-relaxed md:pt-16">
            <p className="text-base md:text-lg">
              DIARA is where modern design meets timeless craftsmanship. We
              create fine silver jewellery for the contemporary woman who values
              both elegance and versatility.
            </p>
            <p className="text-base md:text-lg">
              Each piece is thoughtfully designed to transition seamlessly from
              everyday moments to extraordinary occasions. Inspired by the
              delicate balance of contemporary aesthetics and Indian elegance,
              our collections speak to those who appreciate understated luxury.
            </p>
            <p className="text-base md:text-lg">
              Crafted in 925 sterling silver, every design embodies our
              commitment to quality, purity, and beauty that lasts.
            </p>
          </div>
        </div>

        {/* Brand Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {brandPillars.map((pillar, index) => (
            <div
              key={index}
              className="group p-8 border border-slate-200/40 rounded-sm hover:border-slate-300/60 hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-slate-50/30 via-white to-stone-50/20 relative overflow-hidden"
            >
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-slate-600/10 rounded-tl-sm" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-slate-600/10 rounded-br-sm" />

              {/* Icon */}
              <div className="w-16 h-16 mb-6 flex items-center justify-center bg-gradient-to-br from-slate-100/50 to-stone-100/30 rounded-full group-hover:scale-110 transition-transform duration-500 shadow-md relative">
                <div className="absolute inset-2 bg-gradient-to-br from-slate-600/20 to-stone-600/20 rounded-full blur-sm" />
                <svg className="w-8 h-8 text-slate-700/70 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />}
                  {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                  {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />}
                </svg>
              </div>

              <h3 className="font-playfair text-xl md:text-2xl text-stone-800 mb-3 group-hover:text-slate-900 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {pillar.description}
              </p>

              {/* Subtle shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
