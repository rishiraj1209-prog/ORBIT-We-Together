"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ArrowRight, Sparkles, UserPlus } from "lucide-react";

import { auth } from "@/lib/firebase";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signup() {
    try {
      setLoading(true);
      setError("");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      router.push("/dashboard");
    } catch {
      setError("Unable to create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-6 py-12 text-white">
      <div className="absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-green-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-lime-400/10 blur-[110px]" />

      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-green-950/40 backdrop-blur-2xl lg:grid-cols-[0.9fr_1fr]">
        <section className="hidden border-r border-white/10 p-10 lg:block">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-lime-400">
              <Sparkles className="text-slate-950" size={20} />
            </div>

            <span className="text-3xl font-black">Orbit</span>
          </Link>

          <div className="mt-24">
            <p className="mb-5 inline-flex rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">
              Start your career orbit
            </p>

            <h1 className="text-5xl font-black leading-tight">
              Build a smarter{" "}
              <span className="green-text">career identity.</span>
            </h1>

            <p className="mt-6 max-w-md leading-8 text-slate-400">
              Create your Orbit account and unlock AI-powered resume analysis,
              roadmaps, alumni intelligence and opportunity tracking.
            </p>
          </div>
        </section>

        <section className="p-8 md:p-12">
          <div className="mx-auto max-w-md">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 shadow-lg shadow-green-500/25">
                <UserPlus className="text-slate-950" />
              </div>

              <h2 className="text-4xl font-black">Create account</h2>

              <p className="mt-3 text-slate-400">
                Join Orbit and start building your career command center.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <input
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 outline-none transition focus:border-green-400/50"
              />

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 outline-none transition focus:border-green-400/50"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 outline-none transition focus:border-green-400/50"
              />

              <button
                onClick={signup}
                disabled={loading}
                className="green-button flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Account"}
                <ArrowRight size={18} />
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link href="/login" className="text-green-300 hover:text-green-200">
                Login
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}