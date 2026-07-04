"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { UserPlus, ArrowRight } from "lucide-react";

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

      const userCredential =
        await createUserWithEmailAndPassword(
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
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600">
            <UserPlus />
          </div>

          <h1 className="text-3xl font-bold">
            Create your Orbit account
          </h1>

          <p className="mt-2 text-slate-400">
            Join the AI Career Intelligence Platform.
          </p>

        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        <div className="space-y-4">

          <input
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
          />

          <input
            placeholder="College Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
          />

          <button
            onClick={signup}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold hover:bg-indigo-500"
          >
            {loading ? "Creating..." : "Create Account"}

            <ArrowRight size={18}/>
          </button>

        </div>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-300">
            Login
          </a>
        </p>

      </div>
    </main>
  );
}