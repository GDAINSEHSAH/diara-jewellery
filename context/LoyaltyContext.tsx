"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export interface LoyaltyTransaction {
  id: string;
  type: "earn" | "redeem";
  points: number;
  description: string;
  date: string;
}

interface LoyaltyContextType {
  totalPoints: number;
  transactions: LoyaltyTransaction[];
  earnPoints: (amount: number, orderNumber: string) => number;
  redeemPoints: (points: number, orderNumber: string) => number;
  getRedemptionValue: (points: number) => number;
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);
const STORAGE_KEY = "diara-loyalty";

// 1 point per ₹10 spent, 100 points = ₹50
const EARN_RATE = 10; // ₹10 = 1 point
const REDEEM_RATE = 0.5; // 1 point = ₹0.50 (100 pts = ₹50)

export function LoyaltyProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [totalPoints, setTotalPoints] = useState(0);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [loaded, setLoaded] = useState(false);

  const storageKey = user ? `${STORAGE_KEY}-${user.id}` : null;

  useEffect(() => {
    if (!storageKey) {
      setTotalPoints(0);
      setTransactions([]);
      setLoaded(true);
      return;
    }
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        setTotalPoints(data.totalPoints || 0);
        setTransactions(data.transactions || []);
      } else {
        setTotalPoints(0);
        setTransactions([]);
      }
    } catch {
      setTotalPoints(0);
      setTransactions([]);
    }
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (loaded && storageKey) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ totalPoints, transactions })
      );
    }
  }, [totalPoints, transactions, loaded, storageKey]);

  const earnPoints = (amount: number, orderNumber: string): number => {
    const points = Math.floor(amount / EARN_RATE);
    if (points <= 0) return 0;

    const tx: LoyaltyTransaction = {
      id: `tx-${Date.now()}`,
      type: "earn",
      points,
      description: `Earned from order ${orderNumber}`,
      date: new Date().toISOString(),
    };

    setTotalPoints((prev) => prev + points);
    setTransactions((prev) => [...prev, tx]);
    return points;
  };

  const redeemPoints = (points: number, orderNumber: string): number => {
    if (points <= 0 || points > totalPoints) return 0;
    const discount = getRedemptionValue(points);

    const tx: LoyaltyTransaction = {
      id: `tx-${Date.now()}`,
      type: "redeem",
      points,
      description: `Redeemed for order ${orderNumber}`,
      date: new Date().toISOString(),
    };

    setTotalPoints((prev) => prev - points);
    setTransactions((prev) => [...prev, tx]);
    return discount;
  };

  const getRedemptionValue = (points: number): number => {
    return Math.floor(points * REDEEM_RATE);
  };

  return (
    <LoyaltyContext.Provider
      value={{ totalPoints, transactions, earnPoints, redeemPoints, getRedemptionValue }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
}

export function useLoyalty() {
  const context = useContext(LoyaltyContext);
  if (!context) throw new Error("useLoyalty must be used within LoyaltyProvider");
  return context;
}
