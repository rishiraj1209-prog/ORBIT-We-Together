import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export type Alumni = {
  id: string;
  name: string;
  company: string;
  role: string;
  branch: string;
  graduationYear: string;
};

export async function getAlumni() {
  const snap = await getDocs(collection(db, "alumni"));

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Alumni, "id">),
  }));
}