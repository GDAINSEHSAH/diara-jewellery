"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import AccountSidebar from "@/components/AccountSidebar";
import { useAuth } from "@/context/AuthContext";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#FDFBF7]">
        <div className="h-20" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <AccountSidebar />
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
