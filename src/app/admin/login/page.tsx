"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/admin";

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    // Full page navigation so proxy.ts receives fresh session cookies
    window.location.href = redirectTo;
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-600 text-gray-700 mb-1.5">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-brand/30 focus:border-orange-brand transition-colors"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-600 text-gray-700 mb-1.5">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-brand/30 focus:border-orange-brand transition-colors"
        />
      </div>
      {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="btn-orange w-full justify-center py-3.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeDasharray="40 20"/>
            </svg>
            Signing in...
          </>
        ) : "Sign In"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="relative w-[140px] h-[48px]">
            <Image src="/images/logo-orange.png" alt="Salam Society" fill sizes="140px" loading="eager" priority className="object-contain brightness-0 invert" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="mb-7">
            <h1 className="text-xl font-700 text-gray-900">Admin Login</h1>
            <p className="text-gray-400 text-sm mt-1">Sign in to manage Salam Society content</p>
          </div>
          <Suspense fallback={<div className="h-40 flex items-center justify-center text-gray-400 text-sm">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Salam Society Admin · Authorized access only
        </p>
      </div>
    </div>
  );
}
