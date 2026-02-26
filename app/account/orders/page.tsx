"use client";

import { useOrders } from "@/context/OrderContext";
import OrderCard from "@/components/OrderCard";

export default function AccountOrdersPage() {
  const { orders } = useOrders();

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-100">
      <h1 className="font-playfair text-2xl text-stone-800 mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-stone-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p className="text-stone-500 font-medium">No orders yet</p>
          <p className="text-stone-400 text-sm mt-1">Your order history will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders
            .slice()
            .reverse()
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </div>
      )}
    </div>
  );
}
