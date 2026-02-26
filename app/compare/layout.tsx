import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";

export const metadata = {
  title: "Compare Products | DIARA",
  description: "Compare DIARA silver jewellery products side by side.",
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
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
