"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ArrowRight, UserPlus } from "lucide-react";

import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel, Input } from "@/components/ui/field";
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
    <AuthShell
      badge="Start your career orbit"
      marketingTitle={
        <>
          Build a smarter{" "}
          <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            career identity.
          </span>
        </>
      }
      marketingDescription="Create your Orbit account and unlock AI-powered resume analysis, roadmaps, alumni intelligence, and opportunity tracking."
      formIcon={<UserPlus size={22} />}
      formTitle="Create your account"
      formDescription="Join Orbit and start building your career command center."
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
          signup();
        }}
      >
        <Field>
          <FieldLabel htmlFor="signup-name">Full name</FieldLabel>
          <Input
            id="signup-name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your full name"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="signup-email">Email address</FieldLabel>
          <Input
            id="signup-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="signup-password">Password</FieldLabel>
          <Input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a password"
          />
          <FieldDescription>Use a password that meets Firebase requirements.</FieldDescription>
        </Field>

        <Button type="submit" variant="gradient" size="lg" disabled={loading} className="w-full">
          {loading ? "Creating account..." : "Create account"}
          <ArrowRight />
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-indigo-300 transition hover:text-indigo-200">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
