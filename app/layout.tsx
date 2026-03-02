import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";
import { RecentlyViewedProvider } from "@/context/RecentlyViewedContext";
import { AuthProvider } from "@/context/AuthContext";
import { LoyaltyProvider } from "@/context/LoyaltyContext";
import { OrderProvider } from "@/context/OrderContext";
import { CouponProvider } from "@/context/CouponContext";
import { CompareProvider } from "@/context/CompareContext";
import { ReviewProvider } from "@/context/ReviewContext";
import { ThemeProvider } from "@/context/ThemeContext";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import ToastContainer from "@/components/Toast";
import PromoBanner from "@/components/PromoBanner";
import CompareBar from "@/components/CompareBar";
import SpinWheelTrigger from "@/components/SpinWheelTrigger";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DIARA - Fine Silver Jewellery for Modern Elegance",
  description:
    "Discover DIARA's collection of contemporary 925 sterling silver jewellery. From everyday essentials to statement pieces, crafted for modern elegance.",
  keywords: [
    "silver jewellery",
    "sterling silver",
    "925 silver",
    "modern jewellery",
    "Indian jewellery",
    "DIARA",
    "women's jewellery",
    "fine jewellery",
  ],
  authors: [{ name: "DIARA" }],
  openGraph: {
    title: "DIARA - Fine Silver Jewellery for Modern Elegance",
    description:
      "Contemporary 925 sterling silver jewellery crafted for everyday elegance and special occasions.",
    url: "https://diara.in",
    siteName: "DIARA",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DIARA Silver Jewellery Collection",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DIARA - Fine Silver Jewellery for Modern Elegance",
    description:
      "Contemporary 925 sterling silver jewellery crafted for everyday elegance and special occasions.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} font-inter antialiased bg-[#FDFBF7] dark:bg-stone-900 text-stone-700 dark:text-stone-300 transition-colors duration-300`}
      >
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <LoyaltyProvider>
                <RecentlyViewedProvider>
                  <OrderProvider>
                    <CartProvider>
                      <CouponProvider>
                        <WishlistProvider>
                          <CompareProvider>
                            <ReviewProvider>
                              <PromoBanner />
                              {children}
                              <CartDrawer />
                              <WishlistDrawer />
                              <CompareBar />
                              <SpinWheelTrigger />
                              <ToastContainer />
                            </ReviewProvider>
                          </CompareProvider>
                        </WishlistProvider>
                      </CouponProvider>
                    </CartProvider>
                  </OrderProvider>
                </RecentlyViewedProvider>
              </LoyaltyProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
