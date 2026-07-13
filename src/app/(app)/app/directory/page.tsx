import type { Metadata } from "next";
import { DirectoryView } from "@/components/directory/directory-view";
import { requireOnboardingComplete } from "@/lib/auth/guards";
import { listDirectoryProfiles } from "@/lib/firebase/profile";

export const metadata: Metadata = { title: "Directory" };

export const dynamic = "force-dynamic";

export default async function DirectoryPage() {
  const user = await requireOnboardingComplete();
  const profiles = await listDirectoryProfiles();
  return <DirectoryView profiles={profiles} currentUserId={user.uid} />;
}
