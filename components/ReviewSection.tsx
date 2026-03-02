"use client";

import { useState, useMemo } from "react";
import { useReviews, UserReview } from "@/context/ReviewContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

interface ReviewSectionProps {
  productId: string;
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const cls = size === "lg" ? "w-6 h-6" : size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`${cls} ${i < Math.floor(rating) ? "text-amber-400" : i < rating ? "text-amber-300" : "text-stone-200 dark:text-stone-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function InteractiveStarRating({ rating, onRate }: { rating: number; onRate: (r: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const star = i + 1;
        return (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onRate(star)}
            className="p-0.5 transition-transform hover:scale-110"
          >
            <svg
              className={`w-7 h-7 transition-colors ${
                star <= (hover || rating) ? "text-amber-400" : "text-stone-200 dark:text-stone-600"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const { getReviews, addReview, markHelpful, hasMarkedHelpful, getAverageRating, getTotalReviews } = useReviews();
  const { isLoggedIn, user } = useAuth();
  const { addToast } = useToast();

  const allReviews = useMemo(() => getReviews(productId), [getReviews, productId]);
  const averageRating = getAverageRating(productId);
  const totalReviews = getTotalReviews(productId);

  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "highest" | "lowest" | "helpful">("newest");
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formRating, setFormRating] = useState(0);
  const [formTitle, setFormTitle] = useState("");
  const [formText, setFormText] = useState("");
  const [formName, setFormName] = useState("");
  const [formPhotos, setFormPhotos] = useState<string[]>([]);

  const starCounts = useMemo(() => {
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    allReviews.forEach((r) => {
      counts[r.rating] = (counts[r.rating] || 0) + 1;
    });
    return counts;
  }, [allReviews]);

  const filteredAndSorted = useMemo(() => {
    let list = starFilter ? allReviews.filter((r) => r.rating === starFilter) : [...allReviews];
    switch (sortBy) {
      case "newest":
        list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "highest":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        list.sort((a, b) => a.rating - b.rating);
        break;
      case "helpful":
        list.sort((a, b) => b.helpfulCount - a.helpfulCount);
        break;
    }
    return list;
  }, [allReviews, starFilter, sortBy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formRating === 0) {
      addToast("error", "Please select a star rating");
      return;
    }
    if (!formTitle.trim() || !formText.trim()) {
      addToast("error", "Please fill in all required fields");
      return;
    }

    addReview({
      productId,
      name: isLoggedIn && user ? user.name : formName || "Anonymous",
      rating: formRating,
      title: formTitle.trim(),
      text: formText.trim(),
      photos: formPhotos,
    });

    addToast("success", "Review submitted successfully! Thank you for your feedback.");
    setShowForm(false);
    setFormRating(0);
    setFormTitle("");
    setFormText("");
    setFormName("");
    setFormPhotos([]);
  };

  const handlePhotoUpload = () => {
    // Simulate photo upload with placeholder
    const placeholders = [
      "https://images.unsplash.com/photo-1602272385319-1dbf089994cf?w=200&q=80&fit=crop",
      "https://images.unsplash.com/photo-1611012670415-a770b4f47c47?w=200&q=80&fit=crop",
      "https://images.unsplash.com/photo-1636103811402-f10d43b62237?w=200&q=80&fit=crop",
    ];
    if (formPhotos.length < 3) {
      setFormPhotos((prev) => [...prev, placeholders[prev.length % placeholders.length]]);
      addToast("success", "Photo added!");
    } else {
      addToast("error", "Maximum 3 photos allowed");
    }
  };

  return (
    <div className="mt-16 pt-12 border-t border-stone-100 dark:border-stone-700">
      <h2 className="font-playfair text-2xl md:text-3xl text-stone-800 dark:text-stone-100 text-center mb-10">
        Customer Reviews
      </h2>

      {/* Summary */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start justify-center mb-10">
        {/* Overall rating */}
        <div className="text-center">
          <div className="text-5xl font-bold text-stone-800 dark:text-stone-100 mb-1">{averageRating}</div>
          <StarRating rating={averageRating} size="md" />
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">Based on {totalReviews} reviews</p>
        </div>

        {/* Star breakdown */}
        <div className="space-y-2 w-64">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = starCounts[star] || 0;
            const pct = allReviews.length > 0 ? (count / allReviews.length) * 100 : 0;
            return (
              <button
                key={star}
                onClick={() => setStarFilter(starFilter === star ? null : star)}
                className={`flex items-center gap-3 w-full group transition-colors rounded-md px-1 py-0.5 ${
                  starFilter === star ? "bg-amber-50 dark:bg-amber-900/20" : "hover:bg-stone-50 dark:hover:bg-stone-800"
                }`}
              >
                <span className="text-sm text-stone-600 dark:text-stone-400 w-6 text-right">{star}★</span>
                <div className="flex-1 bg-stone-100 dark:bg-stone-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-sm text-stone-400 w-6">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Write Review Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-800 rounded-full font-medium hover:bg-stone-700 dark:hover:bg-stone-300 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          {showForm ? "Cancel Review" : "Write a Review"}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="max-w-2xl mx-auto mb-12 bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl p-6 md:p-8">
          <h3 className="font-playfair text-xl text-stone-800 dark:text-stone-100 mb-6">Share Your Experience</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                Your Rating <span className="text-red-500">*</span>
              </label>
              <InteractiveStarRating rating={formRating} onRate={setFormRating} />
            </div>

            {/* Name (if not logged in) */}
            {!isLoggedIn && (
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-stone-200 dark:border-stone-600 rounded-xl bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-stone-400 focus:border-transparent outline-none transition-all placeholder:text-stone-400"
                />
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                Review Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Summarize your experience"
                className="w-full px-4 py-3 border border-stone-200 dark:border-stone-600 rounded-xl bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-stone-400 focus:border-transparent outline-none transition-all placeholder:text-stone-400"
                required
              />
            </div>

            {/* Review text */}
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formText}
                onChange={(e) => setFormText(e.target.value)}
                placeholder="Tell us what you loved about this product..."
                rows={4}
                className="w-full px-4 py-3 border border-stone-200 dark:border-stone-600 rounded-xl bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-stone-400 focus:border-transparent outline-none transition-all resize-none placeholder:text-stone-400"
                required
              />
            </div>

            {/* Photo upload */}
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                Add Photos (Optional)
              </label>
              <div className="flex items-center gap-3 flex-wrap">
                {formPhotos.map((photo, idx) => (
                  <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-600">
                    <img src={photo} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormPhotos((prev) => prev.filter((_, i) => i !== idx))}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                {formPhotos.length < 3 && (
                  <button
                    type="button"
                    onClick={handlePhotoUpload}
                    className="w-16 h-16 rounded-lg border-2 border-dashed border-stone-300 dark:border-stone-600 flex items-center justify-center text-stone-400 hover:border-stone-400 hover:text-stone-500 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-xs text-stone-400 mt-1">Up to 3 photos</p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-800 rounded-full font-medium hover:bg-stone-700 dark:hover:bg-stone-300 transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}

      {/* Filter & Sort bar */}
      <div className="flex flex-wrap gap-2 justify-between items-center mb-8 max-w-3xl mx-auto">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStarFilter(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              starFilter === null
                ? "bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-800"
                : "bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600"
            }`}
          >
            All ({allReviews.length})
          </button>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = starCounts[star] || 0;
            if (count === 0) return null;
            return (
              <button
                key={star}
                onClick={() => setStarFilter(starFilter === star ? null : star)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  starFilter === star
                    ? "bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-800"
                    : "bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600"
                }`}
              >
                {star}★ ({count})
              </button>
            );
          })}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="text-sm border border-stone-200 dark:border-stone-600 rounded-lg px-3 py-1.5 bg-white dark:bg-stone-700 text-stone-600 dark:text-stone-300 outline-none focus:ring-2 focus:ring-stone-400"
        >
          <option value="newest">Newest First</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      {/* Review cards */}
      <div className="space-y-6 max-w-3xl mx-auto">
        {filteredAndSorted.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onHelpful={() => markHelpful(review.id)}
            isHelpful={hasMarkedHelpful(review.id)}
          />
        ))}
        {filteredAndSorted.length === 0 && (
          <p className="text-center text-stone-400 py-8">
            No reviews {starFilter ? `with ${starFilter} stars` : ""} yet. Be the first to share your experience!
          </p>
        )}
      </div>
    </div>
  );
}

function ReviewCard({
  review,
  onHelpful,
  isHelpful,
}: {
  review: UserReview;
  onHelpful: () => void;
  isHelpful: boolean;
}) {
  return (
    <div className="bg-stone-50/50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700 rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-stone-800 dark:text-stone-100">{review.name}</span>
            {review.verified && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Verified
              </span>
            )}
          </div>
          <StarRating rating={review.rating} />
        </div>
        <span className="text-xs text-stone-400">
          {new Date(review.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
      <h4 className="font-medium text-stone-700 dark:text-stone-200 mb-1">{review.title}</h4>
      <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{review.text}</p>

      {/* Review photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="flex gap-2 mt-3">
          {review.photos.map((photo, idx) => (
            <div key={idx} className="w-16 h-16 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-600">
              <img src={photo} alt={`Review photo ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Helpful button */}
      <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-700 flex items-center gap-4">
        <button
          onClick={onHelpful}
          className={`flex items-center gap-1.5 text-xs transition-colors ${
            isHelpful
              ? "text-stone-800 dark:text-stone-200 font-medium"
              : "text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
          }`}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill={isHelpful ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          Helpful ({review.helpfulCount + (isHelpful ? 1 : 0)})
        </button>
      </div>
    </div>
  );
}
