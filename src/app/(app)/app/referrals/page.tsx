import type { Metadata } from "next";
import { ReferralsView } from "@/components/referrals/referrals-view";

export const metadata: Metadata = { title: "Referrals" };

export default function ReferralsPage() {
  return <ReferralsView />;
}
