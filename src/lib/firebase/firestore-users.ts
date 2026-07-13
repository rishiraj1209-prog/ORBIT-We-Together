import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getFirebaseFirestore } from "@/lib/firebase/client";
import type { CreateUserInput, UserDocument } from "@/types/user";

const USERS_COLLECTION = "users";

export async function getUserDocument(uid: string): Promise<UserDocument | null> {
  const snapshot = await getDoc(doc(getFirebaseFirestore(), USERS_COLLECTION, uid));
  if (!snapshot.exists()) return null;
  return snapshot.data() as UserDocument;
}

export async function createUserDocument(input: CreateUserInput): Promise<UserDocument> {
  const now = new Date().toISOString();
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

  await setDoc(doc(getFirebaseFirestore(), USERS_COLLECTION, input.uid), {
    ...userDoc,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return userDoc;
}

export { USERS_COLLECTION };
