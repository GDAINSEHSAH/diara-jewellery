import { trustFeatures, careGuide } from "@/data/content";
import Accordion from "./Accordion";

export default function Craft() {
  return (
    <section id="craft" className="py-20 md:py-32 px-6 lg:px-8 bg-gradient-to-b from-white via-stone-50/30 to-white relative overflow-hidden">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000000' stroke-width='1'%3E%3Cpath d='M40 10 L50 30 L70 30 L55 45 L60 65 L40 50 L20 65 L25 45 L10 30 L30 30 Z'/%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-bl from-slate-100/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-stone-100/15 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Decorative top ornament */}
          <div className="flex justify-center mb-6">
            <svg width="100" height="25" viewBox="0 0 100 25" className="text-slate-700/40">
              <path d="M0 12 Q25 3, 50 12 T100 12" stroke="currentColor" strokeWidth="0.5" fill="none"/>
              <circle cx="50" cy="12" r="3" fill="currentColor"/>
              <circle cx="25" cy="9" r="2" fill="currentColor" opacity="0.6"/>
              <circle cx="75" cy="9" r="2" fill="currentColor" opacity="0.6"/>
            </svg>
          </div>

          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-stone-800 mb-6 relative inline-block">
            Craft & Care
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          </h2>
          <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto mt-6 italic">
            Quality you can trust, beauty that endures
          </p>
        </div>

        {/* Trust Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustFeatures.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-8 border border-slate-200/40 rounded-sm hover:border-slate-300/60 hover:shadow-xl transition-all duration-500 bg-gradient-to-b from-slate-50/20 via-white to-stone-50/10 relative overflow-hidden"
            >
              {/* Corner decorations */}
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-slate-600/10 rounded-tr-sm" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-slate-600/10 rounded-bl-sm" />

              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100/60 to-stone-100/40 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-md relative">
                <div className="absolute inset-3 bg-gradient-to-br from-slate-600/10 to-stone-600/10 rounded-full blur-sm" />
                <svg
                  className="w-9 h-9 text-slate-700/70 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="font-medium text-stone-800 mb-2 text-base md:text-lg group-hover:text-slate-900 transition-colors">
                {feature.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">{feature.description}</p>

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
          ))}
        </div>

        {/* Care Guide Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            {/* Decorative top ornament */}
            <div className="flex justify-center mb-4">
              <svg width="80" height="20" viewBox="0 0 80 20" className="text-slate-700/30">
                <path d="M0 10 Q20 5, 40 10 T80 10" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                <circle cx="40" cy="10" r="2" fill="currentColor"/>
                <circle cx="20" cy="7" r="1.5" fill="currentColor" opacity="0.6"/>
                <circle cx="60" cy="7" r="1.5" fill="currentColor" opacity="0.6"/>
              </svg>
            </div>

            <h3 className="font-playfair text-2xl md:text-3xl text-stone-800 mb-3 relative inline-block">
              Jewellery Care Guide
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-slate-600/60 to-transparent" />
            </h3>
            <p className="text-stone-600 text-sm italic">Keep your pieces lustrous for years</p>
          </div>
          <Accordion items={careGuide} />
        </div>
      </div>
    </section>
  );
}
