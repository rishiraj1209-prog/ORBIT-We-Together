import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type Opportunity = {
  id: string;
  role: string;
  company: string;
  location: string;
  type: string;
  match: string;
};

export async function getOpportunities() {
  const snap = await getDocs(collection(db, "opportunities"));

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Opportunity, "id">),
  }));
}