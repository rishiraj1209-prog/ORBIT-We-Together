import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export type ChatMessage = {
  role: "user" | "ai";
  text: string;
  createdAt?: unknown;
};

export async function saveChat(
  uid: string,
  role: "user" | "ai",
  text: string
) {
  await addDoc(collection(db, "users", uid, "chat"), {
    role,
    text,
    createdAt: serverTimestamp(),
  });
}

export async function loadChat(uid: string) {
  const q = query(
    collection(db, "users", uid, "chat"),
    orderBy("createdAt")
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => doc.data()) as ChatMessage[];
}