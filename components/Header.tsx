"use client";

import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Collections", id: "collections" },
  { label: "Craft", id: "craft" },
  { label: "Gallery", id: "gallery" },
  { label: "Contact", id: "contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
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
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-100/50"
            : "bg-black/30 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className={`font-playfair text-2xl md:text-3xl tracking-wider transition-all duration-300 relative group ${
                scrolled ? "text-stone-800 hover:text-slate-800" : "text-white hover:text-white/80"
              }`}
            >
              <span className="relative">
                DIARA
                <div className={`absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-500 ${
                  scrolled ? "bg-gradient-to-r from-slate-600 to-stone-600" : "bg-gradient-to-r from-white/60 to-white/60"
                }`} />
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <ul className="flex items-center space-x-10">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`text-sm font-medium tracking-wider transition-all duration-300 relative py-2 group ${
                        scrolled
                          ? activeSection === item.id
                            ? "text-slate-800"
                            : "text-stone-600 hover:text-slate-700"
                          : activeSection === item.id
                            ? "text-white"
                            : "text-white/70 hover:text-white"
                      }`}
                    >
                      {item.label}
                      {activeSection === item.id ? (
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full ${
                          scrolled ? "bg-gradient-to-r from-slate-600 to-stone-600" : "bg-white/80"
                        }`} />
                      ) : (
                        <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 rounded-full group-hover:w-full group-hover:left-0 transition-all duration-300 ${
                          scrolled ? "bg-gradient-to-r from-slate-600 to-stone-600" : "bg-white/60"
                        }`} />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden p-2 rounded-full transition-colors ${
                scrolled ? "hover:bg-stone-100" : "hover:bg-white/10"
              }`}
              aria-label="Open menu"
            >
              <svg
                className={`w-6 h-6 ${scrolled ? "text-stone-700" : "text-white"}`}
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
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={scrollToSection}
      />
    </>
  );
}
