"use client";

import { useState } from "react";
import Image from "next/image";
import { Order } from "@/context/OrderContext";
import OrderTimeline from "./OrderTimeline";

interface OrderCardProps {
  order: Order;
}

const statusColors: Record<string, string> = {
  placed: "bg-blue-100 text-blue-700",
  confirmed: "bg-amber-100 text-amber-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-emerald-100 text-emerald-700",
};

export default function OrderCard({ order }: OrderCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-stone-100 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-stone-50/50 transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {order.items.slice(0, 3).map((item, i) => (
              <div
                key={i}
                className="relative w-10 h-10 rounded-lg overflow-hidden bg-stone-100 border-2 border-white"
              >
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="40px" />
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-800 font-mono">{order.orderNumber}</p>
            <p className="text-xs text-stone-400">
              {new Date(order.placedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              {" | "}
              {order.items.length} item{order.items.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusColors[order.status]}`}>
            {order.status}
          </span>
          <span className="text-sm font-semibold text-stone-800">
            ₹{order.total.toLocaleString("en-IN")}
          </span>
          <svg
            className={`w-4 h-4 text-stone-400 transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-stone-100 p-4 bg-stone-50/30">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Items */}
            <div>
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">Items</h4>
              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-stone-800 truncate">{item.name}</p>
                      <p className="text-xs text-stone-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-stone-700">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">Tracking</h4>
              <OrderTimeline status={order.status} statusHistory={order.statusHistory} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
