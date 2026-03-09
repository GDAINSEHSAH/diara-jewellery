import type { Metadata } from "next";
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
import { ReferralProvider } from "@/context/ReferralContext";
import { PriceAlertProvider } from "@/context/PriceAlertContext";
import { StockAlertProvider } from "@/context/StockAlertContext";
import { QAProvider } from "@/context/QAContext";
import { GiftCardProvider } from "@/context/GiftCardContext";
import { NotificationProvider } from "@/context/NotificationContext";
import InstallPrompt from "@/components/InstallPrompt";
import { LanguageProvider } from "@/context/LanguageContext";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import ToastContainer from "@/components/Toast";
import PromoBanner from "@/components/PromoBanner";
import CompareBar from "@/components/CompareBar";
import SpinWheelTrigger from "@/components/SpinWheelTrigger";
import AbandonedCartPopup from "@/components/AbandonedCartPopup";
import EmailPopup from "@/components/EmailPopup";
import LiveChatWidget from "@/components/LiveChatWidget";
import SocialProofPopup from "@/components/SocialProofPopup";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import CookieConsent from "@/components/CookieConsent";

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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#292524" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`,
          }}
        />
      </head>
      <body
        className="font-inter antialiased bg-[#FDFBF7] dark:bg-stone-900 text-stone-700 dark:text-stone-300 transition-colors duration-300"
      >
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <ThemeProvider>
        <LanguageProvider>
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
                            <PriceAlertProvider>
                            <StockAlertProvider>
                            <QAProvider>
                            <GiftCardProvider>
                            <NotificationProvider>
                            <ReferralProvider>
                              <AnalyticsTracker />
                              <PromoBanner />
                              <main id="main-content">
                              {children}
                              </main>
                              <CartDrawer />
                              <WishlistDrawer />
                              <CompareBar />
                              <SpinWheelTrigger />
                              <AbandonedCartPopup />
                              <EmailPopup />
                              <LiveChatWidget />
                              <SocialProofPopup />
                              <ExitIntentPopup />
                              <KeyboardShortcuts />
                              <InstallPrompt />
                              <CookieConsent />
                              <ToastContainer />
                            </ReferralProvider>
                            </NotificationProvider>
                            </GiftCardProvider>
                            </QAProvider>
                            </StockAlertProvider>
                            </PriceAlertProvider>
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
        </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
