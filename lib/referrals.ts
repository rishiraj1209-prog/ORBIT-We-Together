import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type Referral = {
  id: string;
  name: string;
  referrals: number;
  badge: string;
};

export async function getReferrals() {
  const snap = await getDocs(collection(db, "referrals"));

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Referral, "id">),
  }));
}