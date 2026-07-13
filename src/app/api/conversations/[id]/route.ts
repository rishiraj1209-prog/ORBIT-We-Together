import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { memoryStore, generateId } from "@/lib/data/memory-store";
import { z } from "zod";
import { checkRateLimit, rateLimitHeaders } from "@/lib/auth/rate-limit";

export const runtime = "nodejs";

const messageSchema = z.object({
  content: z.string().trim().min(1).max(4_000),
  aiAssisted: z.boolean().optional(),
}).strict();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.verificationStatus !== "verified" && user.role !== "admin") return NextResponse.json({ error: "Verification required" }, { status: 403 });

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
  if (user.verificationStatus !== "verified" && user.role !== "admin") return NextResponse.json({ error: "Verification required" }, { status: 403 });
  const rateLimit = checkRateLimit(request, `message:${user.uid}`);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many messages. Please slow down." }, { status: 429, headers: rateLimitHeaders(rateLimit) });
  }

  const { id } = await params;
  const conv = memoryStore.conversations.get(id);
  if (!conv || !conv.participantIds.includes(user.uid)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const parsed = messageSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }
  const { content, aiAssisted } = parsed.data;

  const msg = {
    id: generateId("msg"),
    conversationId: id,
    senderId: user.uid,
    content,
    createdAt: new Date().toISOString(),
    read: false,
    aiAssisted,
  };

  memoryStore.messages.add(msg);

  memoryStore.conversations.set({
    ...conv,
    lastMessage: content,
    lastMessageAt: msg.createdAt,
  });

  return NextResponse.json({ message: msg }, { headers: rateLimitHeaders(rateLimit) });
}
