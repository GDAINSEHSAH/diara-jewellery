import Link from "next/link";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Minimal header for checkout */}
      <header className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="font-playfair text-2xl tracking-wider text-stone-800 hover:text-stone-600 transition-colors"
            >
              DIARA
            </Link>
            <Link
              href="/products"
              className="text-sm text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
