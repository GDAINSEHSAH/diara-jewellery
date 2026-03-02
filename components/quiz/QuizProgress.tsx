"use client";

interface Props {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: Props) {
  const pct = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-stone-500 dark:text-stone-400">
          Question {current} of {total}
        </span>
        <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
          {Math.round(pct)}%
        </span>
      </div>
      <div className="h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-stone-800 dark:bg-stone-100 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
