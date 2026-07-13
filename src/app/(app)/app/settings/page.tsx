import type { Metadata } from "next";
import { SettingsView } from "@/components/settings/settings-view";
import { requireOnboardingComplete } from "@/lib/auth/guards";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const user = await requireOnboardingComplete();
  return <SettingsView user={user} />;
}
