import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export type UserProfile = {
  uid: string;
  name: string;
  email: string;
  college: string;
  branch: string;
  graduationYear: string;
  dreamCompany: string;
  bio: string;
  skills: string;
  role: "student" | "alumni";
  createdAt?: unknown;
  updatedAt?: unknown;
};

export async function saveUserProfile(profile: UserProfile) {
  const ref = doc(db, "profiles", profile.uid);

  await setDoc(
    ref,
    {
      ...profile,
      updatedAt: serverTimestamp(),
      createdAt: profile.createdAt || serverTimestamp(),
    },
    { merge: true }
  );
}

export async function getUserProfile(uid: string) {
  const ref = doc(db, "profiles", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data() as UserProfile;
}