"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import SearchModal from "./SearchModal";
import LoyaltyBadge from "./LoyaltyBadge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Collections", id: "collections" },
  { label: "Craft", id: "craft" },
  { label: "Gallery", id: "gallery" },
  { label: "Contact", id: "contact" },
];

const pageLinks = [
  { label: "Shop", href: "/products" },
  { label: "Journal", href: "/blog" },
  { label: "Offers", href: "/offers" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const { totalItems: cartItems, openCart } = useCart();
  const { totalItems: wishlistItems, openWishlist } = useWishlist();
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (isHomePage) {
        const sections = navItems.map((item) => item.id);
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Close user menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // On non-home pages, always use scrolled (white) style
  const showScrolledStyle = scrolled || !isHomePage;

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
          showScrolledStyle
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-100/50"
            : "bg-black/30 backdrop-blur-md"
        }`}
        style={{ top: "var(--banner-height, 0px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              href="/"
              className={`font-playfair text-2xl md:text-3xl tracking-wider transition-all duration-300 relative group ${
                showScrolledStyle ? "text-stone-800 hover:text-slate-800" : "text-white hover:text-white/80"
              }`}
            >
              <span className="relative">
                DIARA
                <div className={`absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-500 ${
                  showScrolledStyle ? "bg-gradient-to-r from-slate-600 to-stone-600" : "bg-gradient-to-r from-white/60 to-white/60"
                }`} />
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <ul className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`text-sm font-medium tracking-wider transition-all duration-300 relative py-2 group ${
                        showScrolledStyle
                          ? isHomePage && activeSection === item.id
                            ? "text-slate-800"
                            : "text-stone-600 hover:text-slate-700"
                          : isHomePage && activeSection === item.id
                            ? "text-white"
                            : "text-white/70 hover:text-white"
                      }`}
                    >
                      {item.label}
                      {isHomePage && activeSection === item.id ? (
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full ${
                          showScrolledStyle ? "bg-gradient-to-r from-slate-600 to-stone-600" : "bg-white/80"
                        }`} />
                      ) : (
                        <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 rounded-full group-hover:w-full group-hover:left-0 transition-all duration-300 ${
                          showScrolledStyle ? "bg-gradient-to-r from-slate-600 to-stone-600" : "bg-white/60"
                        }`} />
                      )}
                    </button>
                  </li>
                ))}

                {/* Page links: Shop, Journal, Offers */}
                {pageLinks.map((link) => {
                  const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`text-sm font-medium tracking-wider transition-all duration-300 relative py-2 group ${
                          showScrolledStyle
                            ? isActive
                              ? "text-slate-800"
                              : "text-stone-600 hover:text-slate-700"
                            : isActive
                              ? "text-white"
                              : "text-white/70 hover:text-white"
                        }`}
                      >
                        {link.label}
                        {isActive ? (
                          <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full ${
                            showScrolledStyle ? "bg-gradient-to-r from-slate-600 to-stone-600" : "bg-white/80"
                          }`} />
                        ) : (
                          <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 rounded-full group-hover:w-full group-hover:left-0 transition-all duration-300 ${
                            showScrolledStyle ? "bg-gradient-to-r from-slate-600 to-stone-600" : "bg-white/60"
                          }`} />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-1">
              {/* Loyalty Badge (when logged in) */}
              {isLoggedIn && showScrolledStyle && <LoyaltyBadge />}

              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2.5 rounded-full transition-colors ${
                  showScrolledStyle ? "hover:bg-stone-100" : "hover:bg-white/10"
                }`}
                aria-label="Search"
              >
                <svg
                  className={`w-5 h-5 ${showScrolledStyle ? "text-stone-700" : "text-white"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* User */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => {
                    if (isLoggedIn) {
                      setUserMenuOpen(!userMenuOpen);
                    } else {
                      window.location.href = "/auth/login";
                    }
                  }}
                  className={`p-2.5 rounded-full transition-colors ${
                    showScrolledStyle ? "hover:bg-stone-100" : "hover:bg-white/10"
                  }`}
                  aria-label="Account"
                >
                  <svg
                    className={`w-5 h-5 ${showScrolledStyle ? "text-stone-700" : "text-white"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>

                {/* User Dropdown */}
                {userMenuOpen && isLoggedIn && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-sm font-medium text-stone-800 truncate">{user?.name}</p>
                      <p className="text-xs text-stone-400 truncate">{user?.email}</p>
                    </div>
                    <Link
                      href="/account"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 transition-colors"
                    >
                      Orders
                    </Link>
                    <Link
                      href="/account/loyalty"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 transition-colors"
                    >
                      Loyalty Points
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={openWishlist}
                className={`relative p-2.5 rounded-full transition-colors ${
                  showScrolledStyle ? "hover:bg-stone-100" : "hover:bg-white/10"
                }`}
                aria-label="Wishlist"
              >
                <svg
                  className={`w-5 h-5 ${showScrolledStyle ? "text-stone-700" : "text-white"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                    {wishlistItems}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                className={`relative p-2.5 rounded-full transition-colors ${
                  showScrolledStyle ? "hover:bg-stone-100" : "hover:bg-white/10"
                }`}
                aria-label="Shopping bag"
              >
                <svg
                  className={`w-5 h-5 ${showScrolledStyle ? "text-stone-700" : "text-white"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-stone-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                    {cartItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`lg:hidden p-2 rounded-full transition-colors ml-1 ${
                  showScrolledStyle ? "hover:bg-stone-100" : "hover:bg-white/10"
                }`}
                aria-label="Open menu"
              >
                <svg
                  className={`w-6 h-6 ${showScrolledStyle ? "text-stone-700" : "text-white"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={scrollToSection}
      />

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
