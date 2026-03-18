"use client";

import Image from "next/image";
import { useOrders } from "@/context/OrderContext";
import { products } from "@/data/products";

export default function TopProducts() {
  const { orders } = useOrders();

  // Count product appearances across all orders
  const productCounts: Record<string, number> = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      productCounts[item.productId] = (productCounts[item.productId] || 0) + item.quantity;
    });
  });

  // Sort by count and take top 5
  const topProducts = Object.entries(productCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([productId, count], index) => {
      const product = products.find((p) => p.id === productId);
      return {
        rank: index + 1,
        name: product?.name || "Unknown Product",
        image: product?.images?.[0] || "",
        count,
      };
    });

  return (
    <div className="bg-white dark:bg-stone-800 rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 p-6">
      <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-4">
        Top Products
      </h3>

      {topProducts.length === 0 ? (
        <div className="text-center py-6">
          <svg
            className="w-10 h-10 mx-auto text-stone-300 dark:text-stone-600 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <p className="text-sm text-stone-500 dark:text-stone-400">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {topProducts.map((item) => (
            <div
              key={item.rank}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700/30 transition-colors"
            >
              {/* Rank */}
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-stone-100 dark:bg-stone-700 text-xs font-bold text-stone-600 dark:text-stone-300">
                {item.rank}
              </span>

              {/* Image */}
              <div className="w-10 h-10 relative rounded-md overflow-hidden bg-stone-100 dark:bg-stone-700 flex-shrink-0">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                )}
              </div>

              {/* Name */}
              <span className="flex-1 text-sm font-medium text-stone-800 dark:text-stone-200 truncate">
                {item.name}
              </span>

              {/* Count */}
              <span className="text-sm text-stone-500 dark:text-stone-400 whitespace-nowrap">
                {item.count} {item.count === 1 ? "order" : "orders"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
