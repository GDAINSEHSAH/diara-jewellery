"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const openModal = (type: string) => {
    setModalOpen(type);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  return (
    <>
      <footer className="bg-gradient-to-b from-stone-900 to-stone-950 text-stone-300 py-16 px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700/20 to-transparent" />
        <div className="absolute top-0 right-20 w-32 h-32 bg-gradient-to-bl from-slate-900/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-20 w-40 h-40 bg-gradient-to-tr from-slate-900/5 to-transparent rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Decorative top ornament */}
          <div className="flex justify-center mb-12">
            <svg width="100" height="20" viewBox="0 0 100 20" className="text-slate-700/30">
              <path d="M0 10 Q25 3, 50 10 T100 10" stroke="currentColor" strokeWidth="0.5" fill="none"/>
              <circle cx="50" cy="10" r="2.5" fill="currentColor"/>
              <circle cx="25" cy="7" r="1.5" fill="currentColor" opacity="0.6"/>
              <circle cx="75" cy="7" r="1.5" fill="currentColor" opacity="0.6"/>
            </svg>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="font-playfair text-3xl text-slate-100 mb-3 tracking-wider">
                DIARA
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed italic">
                Crafted for modern elegance.
              </p>
              <div className="mt-4 w-16 h-px bg-gradient-to-r from-slate-700/40 to-transparent" />
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-stone-100 font-medium mb-4 text-sm tracking-wide">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-stone-400 hover:text-stone-100 transition-colors"
                  >
                    Journal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account"
                    className="text-sm text-stone-400 hover:text-stone-100 transition-colors"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/track-order"
                    className="text-sm text-stone-400 hover:text-stone-100 transition-colors"
                  >
                    Track Order
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => openModal("privacy")}
                    className="text-sm text-stone-400 hover:text-stone-100 transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("returns")}
                    className="text-sm text-stone-400 hover:text-stone-100 transition-colors"
                  >
                    Returns & Exchange
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("care")}
                    className="text-sm text-stone-400 hover:text-stone-100 transition-colors"
                  >
                    Jewellery Care
                  </button>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-stone-100 font-medium mb-4 text-sm tracking-wide">
                Connect
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/diara.jewels"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-stone-700 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-stone-800 text-center">
            <p className="text-sm text-stone-500">
              © {new Date().getFullYear()} DIARA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Simple Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative bg-white rounded-sm max-w-md w-full p-8 shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5 text-stone-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h3 className="font-playfair text-2xl text-stone-800 mb-4">
              {modalOpen === "privacy" && "Privacy Policy"}
              {modalOpen === "returns" && "Returns & Exchange"}
              {modalOpen === "care" && "Jewellery Care"}
            </h3>

            <div className="text-stone-600 text-sm leading-relaxed">
              {modalOpen === "privacy" && (
                <p>
                  Your privacy is important to us. We collect only essential
                  information needed to serve you better. Your data is never
                  shared with third parties.
                </p>
              )}
              {modalOpen === "returns" && (
                <p>
                  We accept returns within 7 days of delivery for unused items
                  in original packaging. Exchange requests are processed within
                  3-5 business days. Please contact us for assistance.
                </p>
              )}
              {modalOpen === "care" && (
                <p>
                  To maintain the beauty of your silver jewellery: avoid
                  moisture and chemicals, store in airtight pouches, clean
                  gently with a soft cloth, and wear often to reduce tarnishing.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
