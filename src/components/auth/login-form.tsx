"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AuthAlert } from "@/components/auth/auth-alert";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthSpinner } from "@/components/auth/auth-spinner";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AUTH_ROUTES, PROTECTED_ROUTE_PREFIX } from "@/lib/constants/auth";
import {
  mapFirebaseAuthError,
  signInWithEmail,
  signInWithGoogle,
} from "@/lib/auth/client";
import { loginSchema, type LoginFormValues } from "@/lib/auth/validation";
import { cn } from "@/lib/utils/cn";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { ArrowRight, Sparkles } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? PROTECTED_ROUTE_PREFIX;

  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof LoginFormValues, string>>
  >({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const demoMode = process.env.NODE_ENV === "development" && !isFirebaseConfigured();

  async function handleDemoSignIn() {
    setFormError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/auth/demo", { method: "POST" });
      const data = await response.json() as { error?: string; redirectTo?: string };
      if (!response.ok) throw new Error(data.error ?? "Unable to open demo workspace.");
      router.push(data.redirectTo ?? PROTECTED_ROUTE_PREFIX);
      router.refresh();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Unable to open demo workspace.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setFormError(null);
    setGoogleLoading(true);

    try {
      const user = await signInWithGoogle();
      router.push(user.emailVerified ? redirectTo : AUTH_ROUTES.verifyEmail);
      router.refresh();
    } catch (error) {
      setFormError(mapFirebaseAuthError(error));
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      const errors: Partial<Record<keyof LoginFormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !errors[field as keyof LoginFormValues]) {
          errors[field as keyof LoginFormValues] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const user = await signInWithEmail(parsed.data.email, parsed.data.password);
      router.push(user.emailVerified ? redirectTo : AUTH_ROUTES.verifyEmail);
      router.refresh();
    } catch (error) {
      setFormError(mapFirebaseAuthError(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
            Welcome back
          </h2>
          <p className="mt-1.5 text-sm text-text-secondary">
            Sign in with your college email to continue.
          </p>
        </div>

        {formError && <AuthAlert>{formError}</AuthAlert>}

        {demoMode ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-gold/25 bg-ai-subtle/55 p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-ai"><Sparkles className="h-4 w-4"/> Local showcase mode</div>
              <p className="mt-2 text-xs leading-5 text-text-secondary">Firebase credentials are not installed, so Orbit can create a secure local demo session for this development environment.</p>
            </div>
            <Button type="button" size="lg" className="w-full" onClick={handleDemoSignIn} disabled={loading}>
              {loading ? <AuthSpinner /> : <Sparkles className="h-4 w-4 text-gold"/>}
              Enter demo workspace
              {!loading && <ArrowRight className="h-4 w-4"/>}
            </Button>
          </div>
        ) : (
          <GoogleSignInButton
            onClick={handleGoogleSignIn}
            loading={googleLoading}
            disabled={loading}
          />
        )}

        {!demoMode && <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/60" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-text-tertiary">
              or with email
            </span>
          </div>
        </div>}

        {!demoMode && <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="login-email">College email</Label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@college.edu"
              value={values.email}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, email: event.target.value }))
              }
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "login-email-error" : undefined}
              disabled={loading || googleLoading}
            />
            {fieldErrors.email && (
              <p id="login-email-error" className="text-xs text-error" role="alert">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="login-password">Password</Label>
              <Link
                href={AUTH_ROUTES.forgotPassword}
                className="text-xs text-accent hover:text-accent-hover"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={values.password}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, password: event.target.value }))
              }
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={
                fieldErrors.password ? "login-password-error" : undefined
              }
              disabled={loading || googleLoading}
            />
            {fieldErrors.password && (
              <p id="login-password-error" className="text-xs text-error" role="alert">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className={cn("w-full", loading && "pointer-events-none")}
            disabled={loading || googleLoading}
            aria-busy={loading}
          >
            {loading ? <AuthSpinner className="text-white" /> : null}
            Sign in
          </Button>
        </form>}

        <p className="text-center text-sm text-text-secondary">
          New to Orbit?{" "}
          <Link
            href={AUTH_ROUTES.signup}
            className="font-medium text-accent hover:text-accent-hover"
          >
            Create an account
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
