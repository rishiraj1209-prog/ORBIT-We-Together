"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { ArrowRight, BrainCircuit } from "lucide-react";

import { auth, googleProvider } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loginWithEmail() {
    try {
      setLoading(true);
      setError("");

      await signInWithEmailAndPassword(auth, email, password);

      router.push("/dashboard");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  async function loginWithGoogle() {
    try {
      setLoading(true);
      setError("");

      await signInWithPopup(auth, googleProvider);

      router.push("/dashboard");
    } catch {
      setError("Google login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600">
            <BrainCircuit />
          </div>

          <h1 className="text-3xl font-bold">Welcome back</h1>

          <p className="mt-2 text-slate-400">
            Sign in to continue your career orbit.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="College email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
          />

          <button
            onClick={loginWithEmail}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold transition hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
            <ArrowRight size={18} />
          </button>

          <button
            onClick={loginWithGoogle}
            disabled={loading}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-semibold transition hover:bg-white/10 disabled:opacity-60"
          >
            Continue with Google
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-slate-400">
          New to Orbit?{" "}
          <a href="/signup" className="text-indigo-300">
            Create account
          </a>
        </p>
      </div>
    </main>
  );
}