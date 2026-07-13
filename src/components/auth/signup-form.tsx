"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthAlert } from "@/components/auth/auth-alert";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthSpinner } from "@/components/auth/auth-spinner";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AUTH_ROUTES } from "@/lib/constants/auth";
import {
  mapFirebaseAuthError,
  signInWithGoogle,
  signUpWithEmail,
} from "@/lib/auth/client";
import { signupSchema, type SignupFormValues } from "@/lib/auth/validation";
import { cn } from "@/lib/utils/cn";

export function SignupForm() {
  const router = useRouter();

  const [values, setValues] = useState<SignupFormValues>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof SignupFormValues, string>>
  >({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleGoogleSignIn() {
    setFormError(null);
    setGoogleLoading(true);

    try {
      const user = await signInWithGoogle();
      router.push(user.emailVerified ? "/app" : AUTH_ROUTES.verifyEmail);
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

    const parsed = signupSchema.safeParse(values);
    if (!parsed.success) {
      const errors: Partial<Record<keyof SignupFormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !errors[field as keyof SignupFormValues]) {
          errors[field as keyof SignupFormValues] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      await signUpWithEmail(parsed.data.email, parsed.data.password);
      router.push(AUTH_ROUTES.verifyEmail);
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
            Join Orbit
          </h2>
          <p className="mt-1.5 text-sm text-text-secondary">
            Use your official college email to get verified access.
          </p>
        </div>

        {formError && <AuthAlert>{formError}</AuthAlert>}

        <GoogleSignInButton
          onClick={handleGoogleSignIn}
          loading={googleLoading}
          disabled={loading}
        />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/60" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-text-tertiary">
              or with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="signup-email">College email</Label>
            <Input
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="you@college.edu"
              value={values.email}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, email: event.target.value }))
              }
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "signup-email-error" : undefined}
              disabled={loading || googleLoading}
            />
            {fieldErrors.email && (
              <p id="signup-email-error" className="text-xs text-error" role="alert">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              value={values.password}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, password: event.target.value }))
              }
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={
                fieldErrors.password ? "signup-password-error" : undefined
              }
              disabled={loading || googleLoading}
            />
            {fieldErrors.password && (
              <p id="signup-password-error" className="text-xs text-error" role="alert">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-confirm-password">Confirm password</Label>
            <Input
              id="signup-confirm-password"
              type="password"
              autoComplete="new-password"
              placeholder="Repeat your password"
              value={values.confirmPassword}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  confirmPassword: event.target.value,
                }))
              }
              aria-invalid={Boolean(fieldErrors.confirmPassword)}
              aria-describedby={
                fieldErrors.confirmPassword
                  ? "signup-confirm-password-error"
                  : undefined
              }
              disabled={loading || googleLoading}
            />
            {fieldErrors.confirmPassword && (
              <p
                id="signup-confirm-password-error"
                className="text-xs text-error"
                role="alert"
              >
                {fieldErrors.confirmPassword}
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
            Create account
          </Button>
        </form>

        <p className="text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link
            href={AUTH_ROUTES.login}
            className="font-medium text-accent hover:text-accent-hover"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
