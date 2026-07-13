import { getAdminFirestore } from "@/lib/firebase/admin";
import type { UpdateProfileInput, UserDocument } from "@/types/user";
import { USERS_COLLECTION } from "@/lib/firebase/firestore-users";
import { calculateProfileCompleteness } from "@/lib/ai/profile";

function generateReferralCode(uid: string): string {
  return `ORBIT-${uid.slice(0, 6).toUpperCase()}`;
}

export async function updateUserProfile(
  uid: string,
  input: UpdateProfileInput
): Promise<UserDocument> {
  const ref = getAdminFirestore().collection(USERS_COLLECTION).doc(uid);
  const existing = await ref.get();

  if (!existing.exists) {
    throw new Error("User not found");
  }

  const current = existing.data() as UserDocument;
  const now = new Date().toISOString();

  const merged = {
    ...current,
    ...input,
    updatedAt: now,
  };

  merged.profileCompleteness = calculateProfileCompleteness({
    displayName: merged.displayName,
    photoURL: merged.photoURL,
    headline: merged.headline,
    bio: merged.bio,
    skills: merged.skills,
    experience: merged.experience,
    education: merged.education,
    socialLinks: merged.socialLinks as Record<string, string | undefined> | undefined,
    location: merged.location,
  });

  if (!merged.referralCode) {
    merged.referralCode = generateReferralCode(uid);
  }

  await ref.update(merged as Record<string, unknown>);
  return merged;
}

export async function completeOnboarding(
  uid: string,
  input: UpdateProfileInput
): Promise<UserDocument> {
  return updateUserProfile(uid, {
    ...input,
    onboardingComplete: true,
  });
}

export async function listAllUsers(limit = 100): Promise<UserDocument[]> {
  const snapshot = await getAdminFirestore()
    .collection(USERS_COLLECTION)
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => doc.data() as UserDocument);
}

export async function updateUserVerification(
  uid: string,
  status: "pending" | "verified" | "rejected"
): Promise<void> {
  await getAdminFirestore()
    .collection(USERS_COLLECTION)
    .doc(uid)
    .update({
      verificationStatus: status,
      updatedAt: new Date().toISOString(),
    });
}

export function userDocumentToAlumniProfile(user: UserDocument): import("@/types/profile").AlumniProfile {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName ?? "Anonymous",
    photoURL: user.photoURL,
    role: user.role,
    headline: user.headline,
    bio: user.bio,
    aiSummary: user.aiSummary,
    skills: user.skills ?? [],
    experience: user.experience ?? [],
    education: user.education ?? [],
    socialLinks: user.socialLinks ?? {},
    location: user.location,
    industry: user.industry,
    graduationYear: user.graduationYear,
    batch: user.batch,
    department: user.department,
    verificationStatus: user.verificationStatus,
    profileCompleteness: user.profileCompleteness ?? 0,
    isOnline: true,
  };
}
