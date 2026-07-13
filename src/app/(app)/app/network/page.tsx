import type { Metadata } from "next";
import { NetworkView } from "@/components/network/network-view";
import { requireOnboardingComplete } from "@/lib/auth/guards";
import { listDirectoryProfiles } from "@/lib/firebase/profile";

export const metadata: Metadata = { title: "Network" };

export default async function NetworkPage() {
  const user = await requireOnboardingComplete();
  const profiles = user.verificationStatus === "verified" || user.role === "admin"
    ? await listDirectoryProfiles()
    : [];
  return <NetworkView user={user} profiles={profiles} />;
}
