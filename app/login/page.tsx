"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { ArrowRight, BrainCircuit } from "lucide-react";

import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, Input } from "@/components/ui/field";
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
    <AuthShell
      badge="AI Career Intelligence"
      marketingTitle={
        <>
          Return to your{" "}
          <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            career mission control.
          </span>
        </>
      }
      marketingDescription="Continue building your profile, roadmap, resume feedback, and alumni-powered career strategy."
      formIcon={<BrainCircuit size={22} />}
      formTitle="Welcome back"
      formDescription="Sign in to continue your Orbit career journey."
    >
      {error && (
        <div role="alert" className="mb-5 rounded-2xl border border-red-500/18 bg-red-500/[0.07] p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          loginWithEmail();
        }}
      >
        <Field>
          <FieldLabel htmlFor="login-email">Email address</FieldLabel>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="login-password">Password</FieldLabel>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
          />
        </Field>

        <Button type="submit" variant="gradient" size="lg" disabled={loading} className="w-full">
          {loading ? "Signing in..." : "Sign in"}
          <ArrowRight />
        </Button>

        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-white/8" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700">
            or
          </span>
          <span className="h-px flex-1 bg-white/8" />
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={loginWithGoogle}
          disabled={loading}
          className="w-full"
        >
          <span className="flex size-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-950">
            G
          </span>
          Continue with Google
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        New to Orbit?{" "}
        <Link href="/signup" className="font-medium text-indigo-300 transition hover:text-indigo-200">
          Create account
        </Link>
      </p>
    </AuthShell>
  );
}
