import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: "ai" | "resume" | "roadmap" | "referral" | "system";
  createdAt?: unknown;
};

export async function createNotification(
  uid: string,
  notification: Omit<Notification, "id" | "createdAt">
) {
  await addDoc(collection(db, "users", uid, "notifications"), {
    ...notification,
    createdAt: serverTimestamp(),
  });
}

export async function getNotifications(uid: string) {
  const q = query(
    collection(db, "users", uid, "notifications"),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Notification, "id">),
  }));
}