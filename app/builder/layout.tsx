import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";

export const metadata = {
  title: "Custom Jewellery Builder | DIARA",
  description: "Design your own custom silver jewellery piece with DIARA's step-by-step builder.",
};

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
