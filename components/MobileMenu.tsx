"use client";

import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
}

const menuItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Collections", id: "collections" },
  { label: "Craft", id: "craft" },
  { label: "Gallery", id: "gallery" },
  { label: "Contact", id: "contact" },
];

export default function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-[#FAF8F5] shadow-2xl">
        <div className="flex justify-between items-center px-6 py-6 border-b border-stone-200">
          <span className="font-playfair text-2xl text-stone-800">DIARA</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6 text-stone-600"
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
        </div>

        <nav className="px-6 py-8">
          <ul className="space-y-6">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className="text-stone-700 text-lg font-medium hover:text-stone-900 transition-colors w-full text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
