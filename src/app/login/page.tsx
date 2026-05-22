"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      let role: "student" | "teacher" | "parent" | "admin" =
        "student";

      if (email.includes("admin")) {
        role = "admin";
      } else if (email.includes("teacher")) {
        role = "teacher";
      } else if (email.includes("parent")) {
        role = "parent";
      }

      const fakeUser = {
        uid: Date.now().toString(),
        name: email.split("@")[0],
        email,
        role,
      };

      localStorage.setItem(
        "clazo-user",
        JSON.stringify(fakeUser)
      );

      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "teacher") {
        router.push("/teacher/dashboard");
      } else if (role === "parent") {
        router.push("/parent/dashboard");
      } else {
        router.push("/student/dashboard");
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="Clazo Logo"
            className="h-16 mx-auto mb-4"
          />

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to Clazo
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 font-medium"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}