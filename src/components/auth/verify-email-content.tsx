"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, RefreshCw } from "lucide-react";
import { AuthAlert } from "@/components/auth/auth-alert";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthSpinner } from "@/components/auth/auth-spinner";
import { Button } from "@/components/ui/button";
import { AUTH_ROUTES, PROTECTED_ROUTE_PREFIX } from "@/lib/constants/auth";
import {
  mapFirebaseAuthError,
  refreshSession,
  resendVerificationEmail,
  signOut,
} from "@/lib/auth/client";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils/cn";

export function VerifyEmailContent() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleResend() {
    setError(null);
    setLoading(true);
    setResent(false);

    try {
      await resendVerificationEmail();
      setResent(true);
    } catch (err) {
      setError(mapFirebaseAuthError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckVerified() {
    setError(null);
    setChecking(true);

    try {
      await refreshSession();
      await refreshUser();
      router.push(PROTECTED_ROUTE_PREFIX);
      router.refresh();
    } catch (err) {
      setError(mapFirebaseAuthError(err));
    } finally {
      setChecking(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    router.push(AUTH_ROUTES.login);
    router.refresh();
  }

  return (
    <AuthCard>
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent-subtle">
          <Mail className="h-7 w-7 text-accent" aria-hidden="true" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
            Verify your email
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            We sent a verification link to{" "}
            <span className="font-medium text-text-primary">
              {user?.email ?? "your college email"}
            </span>
            . Click the link, then return here.
          </p>
        </div>

        {error && <AuthAlert>{error}</AuthAlert>}

        {resent && (
          <AuthAlert variant="success">
            Verification email sent. Check your inbox and spam folder.
          </AuthAlert>
        )}

        <div className="space-y-3">
          <Button
            type="button"
            size="lg"
            className={cn("w-full gap-2", checking && "pointer-events-none")}
            onClick={handleCheckVerified}
            disabled={checking || loading}
            aria-busy={checking}
          >
            {checking ? (
              <AuthSpinner className="text-white" />
            ) : (
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
            )}
            I&apos;ve verified my email
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="lg"
            className={cn("w-full", loading && "pointer-events-none")}
            onClick={handleResend}
            disabled={loading || checking}
            aria-busy={loading}
          >
            {loading ? <AuthSpinner /> : null}
            Resend verification email
          </Button>
        </div>

        <p className="text-sm text-text-secondary">
          Wrong email?{" "}
          <button
            type="button"
            onClick={handleSignOut}
            className="font-medium text-accent hover:text-accent-hover"
          >
            Sign out and try again
          </button>
        </p>

        <Link
          href={AUTH_ROUTES.login}
          className="inline-block text-sm text-text-tertiary hover:text-text-secondary"
        >
          Back to sign in
        </Link>
      </div>
    </AuthCard>
  );
}
