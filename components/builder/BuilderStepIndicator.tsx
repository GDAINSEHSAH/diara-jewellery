"use client";

const steps = [
  { num: 1, label: "Type" },
  { num: 2, label: "Style" },
  { num: 3, label: "Finish" },
  { num: 4, label: "Personalize" },
  { num: 5, label: "Review" },
];

export default function BuilderStepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                currentStep >= step.num
                  ? "bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900"
                  : "bg-stone-200 text-stone-500 dark:bg-stone-700 dark:text-stone-400"
              }`}
            >
              {currentStep > step.num ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.num
              )}
            </div>
            <span className={`text-xs mt-1 hidden sm:block ${
              currentStep >= step.num ? "text-stone-800 dark:text-stone-200 font-medium" : "text-stone-400"
            }`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 mb-4 sm:mb-0 transition-colors duration-300 ${
                currentStep > step.num ? "bg-stone-800 dark:bg-stone-100" : "bg-stone-200 dark:bg-stone-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
