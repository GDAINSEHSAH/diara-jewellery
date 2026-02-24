"use client";

import { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-slate-200/40 rounded-sm overflow-hidden bg-gradient-to-r from-white via-slate-50/20 to-white backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 relative group"
        >
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-slate-600/5 rounded-tr-sm" />

          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-slate-50/30 transition-all duration-300 relative z-10"
            aria-expanded={openIndex === index}
          >
            <span className="font-medium text-stone-800 text-sm md:text-base pr-4 group-hover:text-slate-900 transition-colors">
              {item.question}
            </span>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              openIndex === index ? "bg-slate-100 rotate-180" : "bg-stone-100 group-hover:bg-slate-50"
            }`}>
              <svg
                className={`w-5 h-5 transition-colors duration-300 ${
                  openIndex === index ? "text-slate-700" : "text-stone-400 group-hover:text-slate-600"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-48" : "max-h-0"
            }`}
          >
            <div className="px-6 pb-5 text-stone-600 text-sm leading-relaxed border-t border-slate-100/50 pt-4 bg-gradient-to-b from-slate-50/10 to-transparent">
              {item.answer}
            </div>
          </div>

          {/* Subtle shimmer effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
