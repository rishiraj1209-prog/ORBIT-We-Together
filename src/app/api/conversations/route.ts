import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import {
  memoryStore,
  generateId,
  seedInitialConversations,
} from "@/lib/data/memory-store";
import { getSeedAlumniById } from "@/lib/data/seed-alumni";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  seedInitialConversations(user.uid);
  const convs = memoryStore.conversations.getByUser(user.uid);

  const previews = convs.map((c) => {
    const otherUid = c.participantIds.find((id) => id !== user.uid) ?? "";
    const profile = getSeedAlumniById(otherUid);
    return {
      ...c,
      participants: [
        {
          uid: otherUid,
          displayName: profile?.displayName ?? "Member",
          photoURL: profile?.photoURL ?? null,
          isOnline: c.onlineStatus?.[otherUid] ?? false,
        },
      ],
    };
  });

  return NextResponse.json({ conversations: previews });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { participantId } = (await request.json()) as { participantId?: string };
  if (!participantId) return NextResponse.json({ error: "Missing participantId" }, { status: 400 });

  const conv = {
    id: generateId("conv"),
    participantIds: [user.uid, participantId],
    lastMessage: "",
    lastMessageAt: new Date().toISOString(),
    unreadCount: 0,
  };

  memoryStore.conversations.set(conv);
  return NextResponse.json({ conversation: conv });
}
