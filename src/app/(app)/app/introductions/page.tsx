import type { Metadata } from "next";
import { IntroductionsView } from "@/components/introductions/introductions-view";
import { requireOnboardingComplete } from "@/lib/auth/guards";
import { listDirectoryProfiles } from "@/lib/firebase/profile";

export const metadata: Metadata = { title: "Introductions" };

export default async function IntroductionsPage() {
  const user = await requireOnboardingComplete();
  const profiles = user.verificationStatus === "verified" || user.role === "admin"
    ? (await listDirectoryProfiles()).filter((profile) => profile.uid !== user.uid)
    : [];
  return <IntroductionsView profiles={profiles} />;
}
