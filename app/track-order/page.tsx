"use client";

import { useState } from "react";
import Image from "next/image";
import { useOrders } from "@/context/OrderContext";
import OrderTimeline from "@/components/OrderTimeline";

export default function TrackOrderPage() {
  const [input, setInput] = useState("");
  const [searched, setSearched] = useState(false);
  const { getOrder } = useOrders();
  const order = searched ? getOrder(input.trim()) : undefined;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) setSearched(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="h-20" />

      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h1 className="font-playfair text-3xl md:text-4xl text-stone-800 mb-4">
            Track Your Order
          </h1>
          <p className="text-stone-500">
            Enter your order number to see the latest status
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-10">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setSearched(false);
            }}
            placeholder="e.g. DIARA-1234567890"
            className="flex-1 px-5 py-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent font-mono"
          />
          <button
            type="submit"
            className="px-6 py-3.5 bg-stone-800 text-white font-medium rounded-xl hover:bg-stone-700 transition-colors text-sm"
          >
            Track
          </button>
        </form>

        {/* Result */}
        {searched && !order && (
          <div className="bg-white rounded-2xl p-8 border border-stone-100 text-center">
            <svg className="w-12 h-12 text-stone-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-stone-600 font-medium">Order not found</p>
            <p className="text-sm text-stone-400 mt-1">Please check your order number and try again</p>
          </div>
        )}

        {order && (
          <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
            {/* Order Header */}
            <div className="p-6 border-b border-stone-100">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-mono font-semibold text-stone-800">{order.orderNumber}</h2>
                <span className="text-sm text-stone-500">
                  {new Date(order.placedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="text-sm text-stone-500">
                {order.items.length} item{order.items.length > 1 ? "s" : ""} | Total: ₹{order.total.toLocaleString("en-IN")}
              </p>
            </div>

            {/* Timeline */}
            <div className="p-6 border-b border-stone-100">
              <OrderTimeline status={order.status} statusHistory={order.statusHistory} />
            </div>

            {/* Items */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-stone-700 mb-4">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-800 truncate">{item.name}</p>
                      <p className="text-xs text-stone-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-stone-700">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div className="p-6 bg-stone-50/50 border-t border-stone-100">
              <h3 className="text-sm font-semibold text-stone-700 mb-2">Shipping Address</h3>
              <p className="text-sm text-stone-500">
                {order.shipping.name}<br />
                {order.shipping.address}<br />
                {order.shipping.city}, {order.shipping.state} - {order.shipping.pincode}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
