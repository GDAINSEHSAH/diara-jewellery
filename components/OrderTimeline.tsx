"use client";

import { OrderStatus } from "@/context/OrderContext";

interface OrderTimelineProps {
  status: OrderStatus;
  statusHistory: Array<{ status: OrderStatus; date: string }>;
}

const steps: { status: OrderStatus; label: string; icon: string }[] = [
  {
    status: "placed",
    label: "Order Placed",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
  {
    status: "confirmed",
    label: "Confirmed",
    icon: "M5 13l4 4L19 7",
  },
  {
    status: "shipped",
    label: "Shipped",
    icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
  },
  {
    status: "delivered",
    label: "Delivered",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
];

const statusOrder: OrderStatus[] = ["placed", "confirmed", "shipped", "delivered"];

export default function OrderTimeline({ status, statusHistory }: OrderTimelineProps) {
  const currentIdx = statusOrder.indexOf(status);

  const getDate = (s: OrderStatus) => {
    const entry = statusHistory.find((h) => h.status === s);
    return entry
      ? new Date(entry.date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;
  };

  return (
    <div className="py-4">
      <div className="flex flex-col space-y-0">
        {steps.map((step, idx) => {
          const isComplete = idx <= currentIdx;
          const isCurrent = idx === currentIdx;
          const date = getDate(step.status);

          return (
            <div key={step.status} className="flex items-start gap-4">
              {/* Indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    isCurrent
                      ? "bg-emerald-500 text-white ring-4 ring-emerald-100"
                      : isComplete
                      ? "bg-emerald-500 text-white"
                      : "bg-stone-200 text-stone-400"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                  </svg>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-0.5 h-12 ${
                      idx < currentIdx ? "bg-emerald-500" : "bg-stone-200"
                    }`}
                  />
                )}
              </div>

              {/* Label */}
              <div className="pt-2 pb-4">
                <p
                  className={`text-sm font-medium ${
                    isComplete ? "text-stone-800" : "text-stone-400"
                  }`}
                >
                  {step.label}
                </p>
                {date && (
                  <p className="text-xs text-stone-400 mt-0.5">{date}</p>
                )}
                {isCurrent && (
                  <span className="inline-block mt-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Current
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
