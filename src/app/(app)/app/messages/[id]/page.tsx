import type { Metadata } from "next";
import { ChatView } from "@/components/messages/chat-view";
import { requireOnboardingComplete } from "@/lib/auth/guards";

export const metadata: Metadata = { title: "Conversation" };

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireOnboardingComplete();
  const { id } = await params;
  return <ChatView conversationId={id} user={user} />;
}
