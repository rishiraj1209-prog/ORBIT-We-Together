import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import {
  memoryStore,
  generateId,
} from "@/lib/data/memory-store";
import { getAdminUserDocument, getAdminUserDocuments } from "@/lib/firebase/admin-users";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.verificationStatus !== "verified" && user.role !== "admin") return NextResponse.json({ error: "Verification required" }, { status: 403 });

  const convs = memoryStore.conversations.getByUser(user.uid);
  const otherUids = convs.map((conversation) =>
    conversation.participantIds.find((id) => id !== user.uid) ?? ""
  );
  const profiles = await getAdminUserDocuments(otherUids);

  const previews = convs.map((c) => {
    const otherUid = c.participantIds.find((id) => id !== user.uid) ?? "";
    const profile = profiles.get(otherUid);
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
  if (user.verificationStatus !== "verified" && user.role !== "admin") return NextResponse.json({ error: "Verification required" }, { status: 403 });

  const { participantId } = (await request.json()) as { participantId?: string };
  if (!participantId) return NextResponse.json({ error: "Missing participantId" }, { status: 400 });
  if (participantId === user.uid) return NextResponse.json({ error: "You cannot message yourself" }, { status: 400 });
  const participant = await getAdminUserDocument(participantId);
  if (!participant || participant.verificationStatus !== "verified") {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

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
