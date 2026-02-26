"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    const success = login(email, password);
    if (success) {
      addToast("success", "Welcome back!");
      router.push("/account");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
      <h1 className="font-playfair text-2xl text-stone-800 mb-2 text-center">Welcome Back</h1>
      <p className="text-sm text-stone-500 text-center mb-6">Sign in to your DIARA account</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
            placeholder="Your password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-stone-800 text-white font-medium rounded-full hover:bg-stone-700 transition-colors text-sm tracking-wide"
        >
          Sign In
        </button>
      </form>

      <p className="text-sm text-stone-500 text-center mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="text-stone-800 font-medium hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
