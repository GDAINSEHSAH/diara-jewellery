"use client";

interface GiftWrapOptionProps {
  enabled: boolean;
  message: string;
  onToggle: (enabled: boolean) => void;
  onMessageChange: (message: string) => void;
}

export default function GiftWrapOption({
  enabled,
  message,
  onToggle,
  onMessageChange,
}: GiftWrapOptionProps) {
  return (
    <div className="bg-stone-50 rounded-xl p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
          <div>
            <p className="text-sm font-medium text-stone-800">Gift Wrapping</p>
            <p className="text-xs text-stone-500">Premium gift packaging + ₹99</p>
          </div>
        </div>
        <button
          onClick={() => onToggle(!enabled)}
          className={`relative w-11 h-6 rounded-full transition-colors ${
            enabled ? "bg-stone-800" : "bg-stone-300"
          }`}
          role="switch"
          aria-checked={enabled}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
              enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      {enabled && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            Gift Message <span className="text-stone-400 font-normal">(optional)</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value.slice(0, 150))}
            placeholder="Write a personal message..."
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent resize-none"
          />
          <p className="text-xs text-stone-400 mt-1 text-right">{message.length}/150</p>
        </div>
      )}
    </div>
  );
}
