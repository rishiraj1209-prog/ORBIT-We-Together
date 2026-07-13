import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";
import { AuthLoadingSkeleton } from "@/components/auth/auth-loading-skeleton";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Your alumni network, finally intelligent."
      subtitle="Sign in with your college email. Verified members only — no spam, no noise."
    >
      <Suspense fallback={<AuthLoadingSkeleton />}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
