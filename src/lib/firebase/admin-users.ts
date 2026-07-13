import { getAdminFirestore } from "@/lib/firebase/admin";
import type { CreateUserInput, UserDocument } from "@/types/user";
import { USERS_COLLECTION } from "@/lib/firebase/firestore-users";

export async function getAdminUserDocument(
  uid: string
): Promise<UserDocument | null> {
  const snapshot = await getAdminFirestore()
    .collection(USERS_COLLECTION)
    .doc(uid)
    .get();

  if (!snapshot.exists) return null;
  return snapshot.data() as UserDocument;
}

export async function upsertAdminUserDocument(
  input: CreateUserInput
): Promise<UserDocument> {
  const ref = getAdminFirestore().collection(USERS_COLLECTION).doc(input.uid);
  const existing = await ref.get();
  const now = new Date().toISOString();

  if (existing.exists) {
    const data = existing.data() as UserDocument;
    await ref.update({
      email: input.email,
      displayName: input.displayName ?? data.displayName,
      photoURL: input.photoURL ?? data.photoURL,
      emailVerified: input.emailVerified,
      updatedAt: now,
    });

    return {
      ...data,
      email: input.email,
      displayName: input.displayName ?? data.displayName,
      photoURL: input.photoURL ?? data.photoURL,
      emailVerified: input.emailVerified,
      updatedAt: now,
    };
  }

  const userDoc: UserDocument = {
    uid: input.uid,
    email: input.email,
    displayName: input.displayName,
    photoURL: input.photoURL,
    role: "alumni",
    verificationStatus: "pending",
    emailVerified: input.emailVerified,
    onboardingComplete: false,
    createdAt: now,
    updatedAt: now,
  };

  await ref.set({
    ...userDoc,
    createdAt: now,
    updatedAt: now,
  });

  return userDoc;
}
