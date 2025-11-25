"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { refresh } = useAuth();
  const [logging, setLogging] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
        setLogging(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Login failed");
      router.push("/");
      await refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setLogging(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef4ff] px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-3xl p-8">
        <h1 className="text-2xl font-semibold text-center">Welcome Back</h1>
        <p className="text-center text-gray-500 text-sm mt-1">
          Sign in to your account to manage jobs
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {/* Email Field */}
          <div>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <div className="text-right ">
              <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                Forgot password?
              </Link>
            </div>
            <div className="mb-2">
              {error && <p className="text-sm indent-2 text-red-600">{error}</p>}
            </div>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
                disabled={logging}
            >
              {logging ? 'Logging in...' : 'Login'}
            </button>
            <div className="text-center mt-3">
                <span className="text-gray-500">Don&apos;t have an account? </span>
              <Link
                href="/auth/register"
                className=" text-gray-800 hover:text-primary"
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
