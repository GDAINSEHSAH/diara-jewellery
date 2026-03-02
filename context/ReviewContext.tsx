"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { reviews as staticReviews, Review } from "@/data/reviews";

export interface UserReview {
  id: string;
  productId: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  verified: boolean;
  helpfulCount: number;
  helpfulBy: string[];
  photos: string[];
}

interface ReviewContextType {
  getReviews: (productId: string) => UserReview[];
  addReview: (review: Omit<UserReview, "id" | "date" | "helpfulCount" | "helpfulBy" | "verified">) => void;
  markHelpful: (reviewId: string) => void;
  hasMarkedHelpful: (reviewId: string) => boolean;
  getAverageRating: (productId: string) => number;
  getTotalReviews: (productId: string) => number;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

function staticToUserReview(r: Review): UserReview {
  return {
    ...r,
    helpfulCount: Math.floor(Math.random() * 15) + 1,
    helpfulBy: [],
    photos: [],
  };
}

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [helpfulSet, setHelpfulSet] = useState<Set<string>>(new Set());

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("diara-user-reviews");
    if (saved) {
      try { setUserReviews(JSON.parse(saved)); } catch {}
    }
    const savedHelpful = localStorage.getItem("diara-helpful-reviews");
    if (savedHelpful) {
      try { setHelpfulSet(new Set(JSON.parse(savedHelpful))); } catch {}
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (userReviews.length > 0) {
      localStorage.setItem("diara-user-reviews", JSON.stringify(userReviews));
    }
  }, [userReviews]);

  useEffect(() => {
    if (helpfulSet.size > 0) {
      localStorage.setItem("diara-helpful-reviews", JSON.stringify(Array.from(helpfulSet)));
    }
  }, [helpfulSet]);

  const getReviews = useCallback((productId: string): UserReview[] => {
    const staticList = staticReviews
      .filter((r) => r.productId === productId)
      .map(staticToUserReview);
    const userList = userReviews.filter((r) => r.productId === productId);
    return [...userList, ...staticList];
  }, [userReviews]);

  const addReview = useCallback((review: Omit<UserReview, "id" | "date" | "helpfulCount" | "helpfulBy" | "verified">) => {
    const newReview: UserReview = {
      ...review,
      id: `user-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      helpfulCount: 0,
      helpfulBy: [],
      verified: false,
    };
    setUserReviews((prev) => [newReview, ...prev]);
  }, []);

  const markHelpful = useCallback((reviewId: string) => {
    setHelpfulSet((prev) => {
      const next = new Set(prev);
      if (next.has(reviewId)) {
        next.delete(reviewId);
      } else {
        next.add(reviewId);
      }
      return next;
    });
  }, []);

  const hasMarkedHelpful = useCallback((reviewId: string) => {
    return helpfulSet.has(reviewId);
  }, [helpfulSet]);

  const getAverageRating = useCallback((productId: string): number => {
    const all = getReviews(productId);
    if (all.length === 0) return 0;
    const sum = all.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / all.length) * 10) / 10;
  }, [getReviews]);

  const getTotalReviews = useCallback((productId: string): number => {
    return getReviews(productId).length;
  }, [getReviews]);

  return (
    <ReviewContext.Provider value={{ getReviews, addReview, markHelpful, hasMarkedHelpful, getAverageRating, getTotalReviews }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (!context) throw new Error("useReviews must be used within ReviewProvider");
  return context;
}
