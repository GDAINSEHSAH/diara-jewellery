"use client";

import { useLoyalty } from "@/context/LoyaltyContext";

export default function AccountLoyaltyPage() {
  const { totalPoints, transactions } = useLoyalty();

  return (
    <div className="space-y-6">
      {/* Points Summary */}
      <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-8 text-white shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-8 h-8 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <div>
            <p className="text-stone-300 text-sm">Your Points Balance</p>
            <p className="text-4xl font-bold">{totalPoints}</p>
          </div>
        </div>
        <p className="text-stone-400 text-sm">
          Earn 1 point per ₹10 spent. Redeem 100 points for ₹50 off.
        </p>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-100">
        <h2 className="font-playfair text-xl text-stone-800 mb-6">Points History</h2>

        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-stone-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <p className="text-stone-500 font-medium">No points activity yet</p>
            <p className="text-stone-400 text-sm mt-1">Place an order to start earning points</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions
              .slice()
              .reverse()
              .map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-stone-50/50 border border-stone-100"
                >
                  <div>
                    <p className="text-sm font-medium text-stone-800">{tx.description}</p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {new Date(tx.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      tx.type === "earn" ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {tx.type === "earn" ? "+" : "-"}{tx.points} pts
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
