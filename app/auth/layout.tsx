import Link from "next/link";

export const metadata = {
  title: "Account | DIARA",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-playfair text-3xl text-stone-800 tracking-wider">
            DIARA
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
