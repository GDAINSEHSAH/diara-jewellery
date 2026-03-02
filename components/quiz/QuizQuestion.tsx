"use client";

import Image from "next/image";
import { QuizQuestion as QuizQuestionType } from "@/data/quiz";

interface Props {
  question: QuizQuestionType;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export default function QuizQuestion({ question, selectedIndex, onSelect }: Props) {
  const hasImages = question.options.some((o) => o.image);

  return (
    <div>
      <h2 className="font-playfair text-2xl md:text-3xl text-stone-800 dark:text-stone-100 mb-2">
        {question.question}
      </h2>
      <p className="text-stone-500 dark:text-stone-400 text-sm mb-8">
        {question.description}
      </p>

      <div className={`grid gap-4 ${hasImages ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`relative rounded-2xl border-2 transition-all duration-300 overflow-hidden text-left group ${
              selectedIndex === i
                ? "border-stone-800 ring-2 ring-stone-800 dark:border-stone-100 dark:ring-stone-100 scale-[0.98]"
                : "border-stone-200 dark:border-stone-700 hover:border-stone-400 hover:shadow-md"
            }`}
          >
            {option.image ? (
              <>
                <div className="relative aspect-[4/3]">
                  <Image
                    src={option.image}
                    alt={option.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white font-medium">{option.label}</span>
                </div>
              </>
            ) : (
              <div className="p-5 flex items-center gap-4">
                {option.icon && (
                  <span className="text-2xl flex-shrink-0">{option.icon}</span>
                )}
                <span className="text-stone-800 dark:text-stone-100 font-medium">
                  {option.label}
                </span>
              </div>
            )}
            {selectedIndex === i && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-stone-800 dark:bg-white rounded-full flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white dark:text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
