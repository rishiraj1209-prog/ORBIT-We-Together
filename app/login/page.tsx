"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ArrowRight, Lock, Mail, Orbit, Sparkles } from "lucide-react";

import { auth, googleProvider } from "@/lib/firebase";

const highlights = [
  "AI-powered resume analysis",
  "Personalized career roadmaps",
  "Alumni intelligence & referrals",
];

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

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (
      e.key === "Enter" &&
      !e.nativeEvent.isComposing &&
      e.keyCode !== 229 &&
      !loading
    ) {
      loginWithEmail();
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-80 w-80 rounded-full bg-accent/15 blur-[120px]" />

      <div className="glass-strong relative grid w-full max-w-5xl overflow-hidden rounded-3xl lg:grid-cols-2">
        {/* Brand side */}
        <section className="hidden flex-col justify-between border-r border-border p-10 lg:flex">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
              <Orbit className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-2xl font-bold">Orbit</span>
          </Link>

          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI Career Intelligence
            </p>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-tight tracking-tight">
              Welcome back to your{" "}
              <span className="text-gradient">career mission control.</span>
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              Continue building your profile, roadmap, resume feedback and
              alumni-powered career strategy.
            </p>
          </div>

          <ul className="space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Form side */}
        <section className="p-6 sm:p-10">
          <div className="mx-auto flex h-full max-w-sm flex-col justify-center">
            <div className="mb-8 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25 lg:hidden">
                <Orbit className="h-6 w-6 text-primary-foreground" />
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold lg:mt-0">Sign in</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Continue your Orbit career journey.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm text-destructive-foreground">
                {error}
              </div>
            )}

            <div className="space-y-3.5">
              <Field
                icon={Mail}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={setEmail}
                onKeyDown={onKeyDown}
              />
              <Field
                icon={Lock}
                type="password"
                placeholder="Password"
                value={password}
                onChange={setPassword}
                onKeyDown={onKeyDown}
              />

              <button
                onClick={loginWithEmail}
                disabled={loading}
                className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 py-1">
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <button
                onClick={loginWithGoogle}
                disabled={loading}
                className="w-full rounded-xl border border-border bg-white/5 px-5 py-3.5 font-medium transition hover:border-primary/40 hover:bg-primary/10 disabled:opacity-60"
              >
                Continue with Google
              </button>
            </div>

            <p className="mt-7 text-center text-sm text-muted-foreground">
              New to Orbit?{" "}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
}: {
  icon: typeof Mail;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-black/30 px-4 transition focus-within:border-primary/50">
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
