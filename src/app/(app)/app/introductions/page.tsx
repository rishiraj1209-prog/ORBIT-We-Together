import type { Metadata } from "next";
import { IntroductionsView } from "@/components/introductions/introductions-view";

export const metadata: Metadata = { title: "Introductions" };

export default function IntroductionsPage() {
  return <IntroductionsView />;
}
