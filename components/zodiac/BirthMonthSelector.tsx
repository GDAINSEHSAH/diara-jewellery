"use client";

import { useState } from "react";
import { zodiacSigns, getZodiacByDate, ZodiacSign } from "@/data/zodiac";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface Props {
  onSelectSign: (sign: ZodiacSign) => void;
  onSaveBirthday: (month: number, day: number) => void;
}

export default function BirthMonthSelector({ onSelectSign, onSaveBirthday }: Props) {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [day, setDay] = useState("");

  const handleMonthClick = (monthIndex: number) => {
    setSelectedMonth(monthIndex + 1);
    setDay("");
  };

  const handleFindSign = () => {
    if (!selectedMonth || !day) return;
    const dayNum = parseInt(day, 10);
    if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) return;

    const sign = getZodiacByDate(selectedMonth, dayNum);
    if (sign) {
      onSaveBirthday(selectedMonth, dayNum);
      onSelectSign(sign);
    }
  };

  // Show zodiac signs for the selected month
  const monthSigns = selectedMonth
    ? zodiacSigns.filter((sign) => {
        const range = sign.dateRange;
        const parts = range.split(" - ");
        const startMonth = months.findIndex((m) => parts[0].startsWith(m.substring(0, 3))) + 1;
        const endMonth = months.findIndex((m) => parts[1].startsWith(m.substring(0, 3))) + 1;
        return startMonth === selectedMonth || endMonth === selectedMonth;
      })
    : [];

  return (
    <div>
      {/* Month Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {months.map((month, i) => (
          <button
            key={month}
            onClick={() => handleMonthClick(i)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              selectedMonth === i + 1
                ? "bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
            }`}
          >
            {month}
          </button>
        ))}
      </div>

      {selectedMonth && (
        <div className="max-w-md mx-auto">
          {/* Signs for this month */}
          <div className="flex justify-center gap-4 mb-6">
            {monthSigns.map((sign) => (
              <button
                key={sign.name}
                onClick={() => onSelectSign(sign)}
                className="flex flex-col items-center gap-1 p-4 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-stone-400 transition-all"
              >
                <span className="text-3xl">{sign.symbol}</span>
                <span className="text-sm font-medium text-stone-800 dark:text-stone-100">{sign.name}</span>
                <span className="text-xs text-stone-400">{sign.dateRange}</span>
              </button>
            ))}
          </div>

          {/* Save Birthday */}
          <div className="bg-stone-50 dark:bg-stone-800 rounded-2xl p-6 text-center">
            <h3 className="font-playfair text-lg text-stone-800 dark:text-stone-100 mb-3">
              Save My Birthday
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
              Enter your birth day to always see your sign highlighted
            </p>
            <div className="flex items-center gap-3 justify-center">
              <span className="text-sm text-stone-600 dark:text-stone-400">
                {months[(selectedMonth || 1) - 1]}
              </span>
              <input
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="Day"
                className="w-20 px-3 py-2 border border-stone-200 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-center focus:outline-none focus:ring-2 focus:ring-stone-800"
              />
              <button
                onClick={handleFindSign}
                disabled={!day}
                className="px-5 py-2 bg-stone-800 text-white text-sm font-medium rounded-lg hover:bg-stone-700 transition-colors disabled:opacity-40"
              >
                Find My Sign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
