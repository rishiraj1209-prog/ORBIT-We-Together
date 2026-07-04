

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export async function saveRoadmap(
  uid: string,
  roadmap: string
) {
  await setDoc(
    doc(db, "roadmaps", uid),
    {
      roadmap,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function loadRoadmap(uid: string) {
  const snap = await getDoc(doc(db, "roadmaps", uid));

  if (!snap.exists()) return "";

  return snap.data().roadmap as string;
}