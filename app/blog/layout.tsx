import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";

export const metadata = {
  title: "Journal | DIARA - Silver Jewellery Stories & Tips",
  description: "Discover styling tips, care guides, and behind-the-scenes stories from DIARA's world of fine silver jewellery.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
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
