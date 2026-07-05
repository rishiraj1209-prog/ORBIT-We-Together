"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ArrowRight, Lock, Mail, Orbit, Sparkles, User } from "lucide-react";

import { auth } from "@/lib/firebase";

const highlights = [
  "Instant AI resume feedback",
  "Weekly personalized roadmaps",
  "Opportunity & referral tracking",
];

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

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (
      e.key === "Enter" &&
      !e.nativeEvent.isComposing &&
      e.keyCode !== 229 &&
      !loading
    ) {
      signup();
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
              Start your career orbit
            </p>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-tight tracking-tight">
              Build a smarter{" "}
              <span className="text-gradient">career identity.</span>
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              Create your Orbit account and unlock AI-powered resume analysis,
              roadmaps, alumni intelligence and opportunity tracking.
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
              <h2 className="mt-4 font-display text-3xl font-bold lg:mt-0">
                Create account
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Join Orbit and start building your career command center.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm text-destructive-foreground">
                {error}
              </div>
            )}

            <div className="space-y-3.5">
              <Field
                icon={User}
                type="text"
                placeholder="Full name"
                value={name}
                onChange={setName}
                onKeyDown={onKeyDown}
              />
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
                onClick={signup}
                disabled={loading}
                className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Account"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-7 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Login
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
