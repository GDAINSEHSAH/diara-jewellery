"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products, categoryLabels, typeLabels } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import ProductCard from "@/components/ProductCard";
import QuickView from "@/components/QuickView";
import ReviewSection from "@/components/ReviewSection";
import SizeGuide from "@/components/SizeGuide";
import ImageZoom from "@/components/ImageZoom";
import ProductLightbox from "@/components/ProductLightbox";
import RecentlyViewed from "@/components/RecentlyViewed";
import { Product } from "@/data/products";
import CompareButton from "@/components/CompareButton";

export default function ProductDetailPage() {
  const params = useParams();
  const product = products.find((p) => p.id === params.id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();
  const { trackProduct } = useRecentlyViewed();

  // Track recently viewed
  useEffect(() => {
    if (product) {
      trackProduct(product.id);
    }
  }, [product, trackProduct]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-3xl text-stone-800 mb-4">
            Product Not Found
          </h1>
          <p className="text-stone-500 mb-6">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/products"
            className="px-6 py-3 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const hasSizeGuide = ["ring", "bracelet", "anklet"].includes(product.type);

  // Related products (same category, different product)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header spacer */}
      <div className="h-20" />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8">
        <nav className="flex items-center gap-2 text-sm text-stone-400 flex-wrap">
          <Link href="/" className="hover:text-stone-600 transition-colors">
            Home
          </Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/products" className="hover:text-stone-600 transition-colors">
            Shop
          </Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-stone-600 truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      {/* Product detail */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-50">
              <ImageZoom
                src={product.images[selectedImage]}
                alt={product.name}
                onClick={() => setLightboxOpen(true)}
              />
              {product.badge && (
                <div
                  className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-medium z-10 pointer-events-none ${
                    product.badge === "New"
                      ? "bg-emerald-500 text-white"
                      : product.badge === "Bestseller"
                      ? "bg-stone-800 text-white"
                      : "bg-amber-500 text-white"
                  }`}
                >
                  {product.badge}
                </div>
              )}
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-medium px-3 py-1.5 rounded-full z-10 pointer-events-none">
                  -{discount}%
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-stone-800 ring-2 ring-stone-200"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                {categoryLabels[product.category]}
              </span>
              <span className="text-stone-300">&middot;</span>
              <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                {typeLabels[product.type]}
              </span>
            </div>

            <h1 className="font-playfair text-3xl md:text-4xl text-stone-800 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-amber-400"
                        : "text-stone-200"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-stone-500">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-semibold text-stone-800">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-stone-400 line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-stone-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Material info */}
            <div className="bg-stone-50 rounded-xl p-5 mb-8">
              <h3 className="text-sm font-semibold text-stone-800 uppercase tracking-wider mb-3">
                Details
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-stone-600">
                  <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {product.material}
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-600">
                  <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Nickel-free
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-600">
                  <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Gift-ready packaging
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-600">
                  <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Free shipping over ₹999
                </div>
              </div>
            </div>

            {/* Size Guide link */}
            {hasSizeGuide && (
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-800 transition-colors mb-6"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                View Size Guide
              </button>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  addToCart(product);
                  addToast("success", `Added ${product.name} to bag`);
                }}
                className={`w-full py-4 rounded-full font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 text-base ${
                  inCart
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-stone-800 text-white hover:bg-stone-700"
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {inCart ? "Added to Bag \u2014 Add Another" : "Add to Bag"}
              </button>

              <button
                onClick={() => {
                  toggleWishlist(product);
                  addToast("success", wishlisted ? `Removed ${product.name} from wishlist` : `Saved ${product.name} to wishlist`);
                }}
                className={`w-full py-4 rounded-full font-medium tracking-wide transition-all duration-300 border flex items-center justify-center gap-2 ${
                  wishlisted
                    ? "border-red-200 text-red-500 bg-red-50 hover:bg-red-100"
                    : "border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill={wishlisted ? "currentColor" : "none"}
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>

              <CompareButton product={product} variant="full" />
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-stone-100">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Certified 925 Silver
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Easy Returns
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ships in 2-4 Days
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <ReviewSection
          productId={product.id}
          productRating={product.rating}
          productReviewCount={product.reviews}
        />

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20 pt-16 border-t border-stone-100">
            <h2 className="font-playfair text-2xl md:text-3xl text-stone-800 text-center mb-2">
              You May Also Like
            </h2>
            <p className="text-stone-400 text-center mb-10">
              More from {categoryLabels[product.category]}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        <RecentlyViewed excludeId={product.id} />
      </div>

      {/* Modals */}
      <QuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
      {hasSizeGuide && (
        <SizeGuide
          isOpen={sizeGuideOpen}
          onClose={() => setSizeGuideOpen(false)}
          defaultTab={product.type as "ring" | "bracelet" | "anklet"}
        />
      )}
      <ProductLightbox
        images={product.images}
        currentIndex={selectedImage}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setSelectedImage}
        productName={product.name}
      />
    </div>
  );
}
