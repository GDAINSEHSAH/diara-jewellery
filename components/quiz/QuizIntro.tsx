"use client";

interface Props {
  onStart: () => void;
}

export default function QuizIntro({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="max-w-lg">
        <div className="text-6xl mb-6">&#x2728;</div>
        <h1 className="font-playfair text-4xl md:text-5xl text-stone-800 dark:text-stone-100 mb-4">
          Find Your Perfect Piece
        </h1>
        <p className="text-stone-500 dark:text-stone-400 leading-relaxed mb-8">
          Answer 6 quick questions about your style preferences, and we&apos;ll recommend
          the perfect DIARA jewellery pieces just for you. Plus, get an exclusive coupon!
        </p>
        <button
          onClick={onStart}
          className="px-10 py-4 bg-stone-800 text-white font-medium rounded-full hover:bg-stone-700 transition-all text-sm tracking-wide hover:scale-105 active:scale-95"
        >
          Start the Quiz
        </button>
        <p className="text-xs text-stone-400 mt-4">Takes less than 2 minutes</p>
      </div>
    </div>
  );
}
