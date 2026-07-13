import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot password",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="We've got you."
      subtitle="Enter your college email and we'll send you a secure link to reset your password."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
