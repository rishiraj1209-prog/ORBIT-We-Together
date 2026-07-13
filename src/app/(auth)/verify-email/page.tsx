import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthLayout } from "@/components/auth/auth-layout";
import { VerifyEmailContent } from "@/components/auth/verify-email-content";
import { AUTH_ROUTES, PROTECTED_ROUTE_PREFIX } from "@/lib/constants/auth";
import { getCurrentUser } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verify email",
};

export default async function VerifyEmailPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(AUTH_ROUTES.login);
  }

  if (user.emailVerified) {
    redirect(PROTECTED_ROUTE_PREFIX);
  }

  return (
    <AuthLayout
      title="One more step."
      subtitle="Verify your college email to unlock your Orbit network."
    >
      <VerifyEmailContent />
    </AuthLayout>
  );
}
