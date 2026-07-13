import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { memoryStore, generateId } from "@/lib/data/memory-store";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const conv = memoryStore.conversations.get(id);
  if (!conv || !conv.participantIds.includes(user.uid)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ messages: memoryStore.messages.get(id) });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { content, aiAssisted } = (await request.json()) as {
    content?: string;
    aiAssisted?: boolean;
  };

  if (!content?.trim()) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const msg = {
    id: generateId("msg"),
    conversationId: id,
    senderId: user.uid,
    content: content.trim(),
    createdAt: new Date().toISOString(),
    read: false,
    aiAssisted,
  };

  memoryStore.messages.add(msg);

  const conv = memoryStore.conversations.get(id);
  if (conv) {
    memoryStore.conversations.set({
      ...conv,
      lastMessage: content.trim(),
      lastMessageAt: msg.createdAt,
    });
  }

  return NextResponse.json({ message: msg });
}
