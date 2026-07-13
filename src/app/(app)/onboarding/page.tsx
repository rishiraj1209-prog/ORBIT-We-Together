import type { Metadata } from "next";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { requireOnboardingIncomplete } from "@/lib/auth/guards";

export const metadata: Metadata = {
  title: "Onboarding",
};

export default async function OnboardingPage() {
  const user = await requireOnboardingIncomplete();
  return <OnboardingWizard user={user} />;
}
