"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthAlert } from "@/components/auth/auth-alert";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthSpinner } from "@/components/auth/auth-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AUTH_ROUTES } from "@/lib/constants/auth";
import { mapFirebaseAuthError, sendPasswordReset } from "@/lib/auth/client";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/auth/validation";
import { cn } from "@/lib/utils/cn";

export function ForgotPasswordForm() {
  const [values, setValues] = useState<ForgotPasswordFormValues>({ email: "" });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ForgotPasswordFormValues, string>>
  >({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setSuccess(false);
    setFieldErrors({});

    const parsed = forgotPasswordSchema.safeParse(values);
    if (!parsed.success) {
      const errors: Partial<Record<keyof ForgotPasswordFormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (
          typeof field === "string" &&
          !errors[field as keyof ForgotPasswordFormValues]
        ) {
          errors[field as keyof ForgotPasswordFormValues] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      await sendPasswordReset(parsed.data.email);
      setSuccess(true);
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
            Reset password
          </h2>
          <p className="mt-1.5 text-sm text-text-secondary">
            We&apos;ll send a reset link to your college email.
          </p>
        </div>

        {formError && <AuthAlert>{formError}</AuthAlert>}

        {success && (
          <AuthAlert variant="success" title="Check your inbox">
            If an account exists for {values.email}, you&apos;ll receive a password
            reset link shortly.
          </AuthAlert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="forgot-email">College email</Label>
            <Input
              id="forgot-email"
              type="email"
              autoComplete="email"
              placeholder="you@college.edu"
              value={values.email}
              onChange={(event) =>
                setValues({ email: event.target.value })
              }
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "forgot-email-error" : undefined}
              disabled={loading}
            />
            {fieldErrors.email && (
              <p id="forgot-email-error" className="text-xs text-error" role="alert">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className={cn("w-full", loading && "pointer-events-none")}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? <AuthSpinner className="text-white" /> : null}
            Send reset link
          </Button>
        </form>

        <p className="text-center text-sm text-text-secondary">
          Remember your password?{" "}
          <Link
            href={AUTH_ROUTES.login}
            className="font-medium text-accent hover:text-accent-hover"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
