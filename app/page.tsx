"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Collections from "@/components/Collections";
import Craft from "@/components/Craft";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Newsletter from "@/components/Newsletter";
import RecentlyViewed from "@/components/RecentlyViewed";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import LoadingScreen from "@/components/LoadingScreen";

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
      <LoadingScreen />
      <Header />
      <Hero
        onExploreClick={() => scrollToSection("collections")}
        onStoryClick={() => scrollToSection("about")}
      />
      <About />
      <Collections onViewLookbook={() => scrollToSection("gallery")} />
      <Craft />
      <Testimonials />
      <Gallery />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <RecentlyViewed />
      </div>
      <Newsletter />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </main>
  );
}
