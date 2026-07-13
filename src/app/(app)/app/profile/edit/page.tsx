import type { Metadata } from "next";
import { EditProfileForm } from "@/components/profile/edit-profile-form";
import { requireOnboardingComplete } from "@/lib/auth/guards";

export const metadata: Metadata = { title: "Edit Profile" };

export default async function EditProfilePage() {
  const user = await requireOnboardingComplete();
  return <EditProfileForm user={user} />;
}
