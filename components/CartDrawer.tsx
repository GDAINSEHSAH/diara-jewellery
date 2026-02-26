"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isOpen,
    closeCart,
  } = useCart();
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
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
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
            <h2 className="font-playfair text-xl text-stone-800">Shopping Bag</h2>
            <span className="bg-stone-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
            aria-label="Close cart"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-stone-500 font-medium">Your bag is empty</p>
              <p className="text-stone-400 text-sm mt-1">Add items to get started</p>
              <button
                onClick={closeCart}
                className="mt-6 px-6 py-2.5 bg-stone-800 text-white text-sm rounded-full hover:bg-stone-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 rounded-xl bg-stone-50/50 border border-stone-100"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-stone-800 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-stone-500 mt-0.5">
                      {item.product.material}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-white rounded-full border border-stone-200">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-stone-700 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium text-stone-700 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-stone-700 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-stone-800">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                        <button
                          onClick={() => {
                            removeFromCart(item.product.id);
                            addToast("info", `Removed ${item.product.name} from bag`);
                          }}
                          className="p-1 text-stone-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
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

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-100 px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-stone-600">Subtotal</span>
              <span className="text-lg font-semibold text-stone-800">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Shipping and taxes calculated at checkout
            </p>
            <div className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-lg">
              <svg className="w-4 h-4 text-stone-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <p className="text-xs text-stone-500">Have a coupon? Apply it at checkout!</p>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full py-3.5 bg-stone-800 text-white font-medium rounded-full hover:bg-stone-700 transition-colors text-sm tracking-wide text-center"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={clearCart}
              className="w-full py-2 text-stone-500 text-sm hover:text-stone-700 transition-colors"
            >
              Clear Bag
            </button>
          </div>
        )}
      </div>
    </>
  );
}
