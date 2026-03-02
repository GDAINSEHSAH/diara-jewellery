"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function WishlistDrawer() {
  const { items, removeFromWishlist, clearWishlist, totalItems, isOpen, closeWishlist } =
    useWishlist();
  const { addToCart, openCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeWishlist();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeWishlist]);

  const handleMoveToCart = (product: typeof items[0]) => {
    addToCart(product);
    removeFromWishlist(product.id);
    addToast("success", `Moved ${product.name} to bag`);
  };

  const handleMoveAllToCart = () => {
    items.forEach((product) => addToCart(product));
    clearWishlist();
    closeWishlist();
    openCart();
    addToast("success", "Moved all items to bag");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeWishlist}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <h2 className="font-playfair text-xl text-stone-800">Wishlist</h2>
            <span className="bg-stone-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            onClick={closeWishlist}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
            aria-label="Close wishlist"
          >
            <svg className="w-5 h-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="w-16 h-16 text-stone-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="text-stone-500 font-medium">Your wishlist is empty</p>
              <p className="text-stone-400 text-sm mt-1">
                Save your favourite pieces here
              </p>
              <button
                onClick={closeWishlist}
                className="mt-6 px-6 py-2.5 bg-stone-800 text-white text-sm rounded-full hover:bg-stone-700 transition-colors"
              >
                Explore Products
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 rounded-xl bg-stone-50/50 border border-stone-100"
                >
                  <Link
                    href={`/products/${product.id}`}
                    onClick={closeWishlist}
                    className="relative w-20 h-20 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0"
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                      sizes="80px"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${product.id}`}
                      onClick={closeWishlist}
                      className="text-sm font-medium text-stone-800 hover:text-stone-600 transition-colors truncate block"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm text-stone-500 mt-0.5">
                      {product.material}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-stone-800">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveToCart(product)}
                          className="p-1.5 text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
                          aria-label="Move to cart"
                          title="Move to bag"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            removeFromWishlist(product.id);
                            addToast("info", `Removed ${product.name} from wishlist`);
                          }}
                          className="p-1.5 text-stone-400 hover:text-red-500 transition-colors rounded-full hover:bg-stone-100"
                          aria-label="Remove from wishlist"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Move All to Bag */}
        {items.length > 0 && (
          <div className="border-t border-stone-100 px-6 py-5">
            <button
              onClick={handleMoveAllToCart}
              className="w-full py-3.5 bg-stone-800 text-white font-medium rounded-full hover:bg-stone-700 transition-colors text-sm tracking-wide flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Move All to Bag
            </button>
          </div>
        )}
      </div>
    </>
  );
}
