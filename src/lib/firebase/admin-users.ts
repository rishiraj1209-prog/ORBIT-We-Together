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
  return { ...(snapshot.data() as UserDocument), uid: snapshot.id };
}

export async function getAdminUserDocuments(
  uids: string[]
): Promise<Map<string, UserDocument>> {
  const uniqueUids = [...new Set(uids.filter(Boolean))];
  if (uniqueUids.length === 0) return new Map();

  const db = getAdminFirestore();
  const snapshots = await db.getAll(
    ...uniqueUids.map((uid) => db.collection(USERS_COLLECTION).doc(uid))
  );

  return new Map(
    snapshots
      .filter((snapshot) => snapshot.exists)
      .map((snapshot) => [snapshot.id, { ...(snapshot.data() as UserDocument), uid: snapshot.id }])
  );
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
      lastActiveAt: now,
      updatedAt: now,
    });

    return {
      ...data,
      email: input.email,
      displayName: input.displayName ?? data.displayName,
      photoURL: input.photoURL ?? data.photoURL,
      emailVerified: input.emailVerified,
      lastActiveAt: now,
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
    lastActiveAt: now,
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
