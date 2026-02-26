"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type OrderStatus = "placed" | "confirmed" | "shipped" | "delivered";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  shipping: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  subtotal: number;
  shippingCost: number;
  couponDiscount: number;
  couponCode?: string;
  giftWrap: boolean;
  giftMessage?: string;
  giftWrapCost: number;
  loyaltyDiscount: number;
  total: number;
  paymentMethod: string;
  status: OrderStatus;
  statusHistory: Array<{ status: OrderStatus; date: string }>;
  placedAt: string;
  pointsEarned: number;
  pointsRedeemed: number;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (order: Omit<Order, "id" | "status" | "statusHistory">) => Order;
  getOrder: (orderNumber: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);
const STORAGE_KEY = "diara-orders";

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setOrders(JSON.parse(saved));
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    }
  }, [orders, loaded]);

  const placeOrder = (orderData: Omit<Order, "id" | "status" | "statusHistory">): Order => {
    const now = new Date().toISOString();
    // Simulate progression: placed now, confirmed in "1 day", shipped in "2 days"
    const confirmedDate = new Date(Date.now() + 86400000).toISOString();
    const shippedDate = new Date(Date.now() + 2 * 86400000).toISOString();

    const order: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      status: "confirmed",
      statusHistory: [
        { status: "placed", date: now },
        { status: "confirmed", date: confirmedDate },
      ],
    };

    // For demo: randomly make some orders "shipped"
    if (Math.random() > 0.5) {
      order.status = "shipped";
      order.statusHistory.push({ status: "shipped", date: shippedDate });
    }

    setOrders((prev) => [...prev, order]);
    return order;
  };

  const getOrder = (orderNumber: string): Order | undefined => {
    return orders.find((o) => o.orderNumber === orderNumber);
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
}
