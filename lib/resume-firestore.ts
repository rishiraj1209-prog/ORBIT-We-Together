import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export async function saveResumeAnalysis(
  uid: string,
  analysis: string
) {
  await setDoc(
    doc(db, "resumeAnalysis", uid),
    {
      analysis,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function loadResumeAnalysis(uid: string) {
  const snap = await getDoc(doc(db, "resumeAnalysis", uid));

  if (!snap.exists()) return "";

  return snap.data().analysis as string;
}