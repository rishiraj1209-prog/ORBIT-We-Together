import type { Metadata } from "next";
import { NetworkView } from "@/components/network/network-view";
import { requireOnboardingComplete } from "@/lib/auth/guards";

export const metadata: Metadata = { title: "Network" };

export default async function NetworkPage() {
  const user = await requireOnboardingComplete();
  return <NetworkView user={user} />;
}
