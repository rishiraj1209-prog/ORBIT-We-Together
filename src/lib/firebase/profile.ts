import { getAdminFirestore } from "@/lib/firebase/admin";
import type { UpdateProfileInput, UserDocument } from "@/types/user";
import { USERS_COLLECTION } from "@/lib/firebase/firestore-users";
import { calculateProfileCompleteness } from "@/lib/ai/profile";

function generateReferralCode(uid: string): string {
  return `ORBIT-${uid.slice(0, 6).toUpperCase()}`;
}

function timestampToIso(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  if (value && typeof value === "object" && "toDate" in value) {
    const toDate = (value as { toDate?: () => Date }).toDate;
    if (typeof toDate === "function") return toDate.call(value).toISOString();
  }
  return fallback;
}

function safeExternalUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function safePhotoUrl(value: string | null): string | null {
  if (!value) return null;
  if (value.startsWith("https://")) return value;
  return /^data:image\/(jpeg|png|webp);base64,/i.test(value) ? value : null;
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

  return snapshot.docs.map((doc) => ({
    ...(doc.data() as UserDocument),
    uid: doc.id,
  }));
}

export async function listDirectoryProfiles(
  limit = 100
): Promise<import("@/types/profile").AlumniProfile[]> {
  const users = await listAllUsers(limit);

  return users
    .filter((user) => user.verificationStatus === "verified")
    .sort((a, b) => {
      const aActive = timestampToIso(a.lastActiveAt ?? a.updatedAt);
      const bActive = timestampToIso(b.lastActiveAt ?? b.updatedAt);
      return bActive.localeCompare(aActive);
    })
    .map(userDocumentToAlumniProfile);
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
    displayName: user.displayName ?? "Anonymous",
    photoURL: safePhotoUrl(user.photoURL),
    role: user.role,
    headline: user.headline,
    bio: user.bio,
    aiSummary: user.aiSummary,
    skills: user.skills ?? [],
    experience: user.experience ?? [],
    education: user.education ?? [],
    socialLinks: {
      linkedin: safeExternalUrl(user.socialLinks?.linkedin),
      twitter: safeExternalUrl(user.socialLinks?.twitter),
      github: safeExternalUrl(user.socialLinks?.github),
      website: safeExternalUrl(user.socialLinks?.website),
    },
    location: user.location,
    industry: user.industry,
    graduationYear: user.graduationYear,
    batch: user.batch,
    department: user.department,
    verificationStatus: user.verificationStatus,
    profileCompleteness: user.profileCompleteness ?? 0,
    isOnline: false,
  };
}
