import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create account",
};

export default function SignupPage() {
  return (
    <AuthLayout
      title="Join the network that actually works."
      subtitle="Create your account with an official college email. We'll verify you before you connect."
    >
      <SignupForm />
    </AuthLayout>
  );
}
