"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Collections from "@/components/Collections";
import Craft from "@/components/Craft";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
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
    <main className="bg-gradient-to-b from-slate-50 via-white to-stone-50">
      <Header />
      <Hero
        onExploreClick={() => scrollToSection("collections")}
        onStoryClick={() => scrollToSection("about")}
      />
      <About />
      <Collections onViewLookbook={() => scrollToSection("gallery")} />
      <Craft />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
