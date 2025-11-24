"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [signing, setSigning] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
        setSigning(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Registration failed");
      router.push("/auth/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setSigning(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef4ff] px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-3xl p-8">
        <h1 className="text-2xl font-semibold text-center">Create Account</h1>
        <p className="text-center text-gray-500 text-sm mt-1">
          Sign up to manage your jobs
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {/* Name Field */}
          <div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 
                         focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 
                         focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 
                         focus:ring-primary focus:outline-none"
            />
          <div className="mt-2 mb-4">
            {error && <p className="text-sm indent-2 text-red-600">{error}</p>}
          </div>
          </div>


          {/* Sign Up Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
              disabled={signing}
            >
              {signing ? "Registering..." : "Register"}
            </button>
            <div className="text-center mt-3">
              <span className="text-gray-500">Already have an account? </span>
              <Link
                href="/auth/login"
                className=" text-gray-800 hover:text-primary"
              >
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
