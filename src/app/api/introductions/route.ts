import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import {
  memoryStore,
  generateId,
} from "@/lib/data/memory-store";
import { generateIntroductionMessage } from "@/lib/ai/compose";
import { getAdminUserDocument, getAdminUserDocuments } from "@/lib/firebase/admin-users";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.verificationStatus !== "verified" && user.role !== "admin") return NextResponse.json({ error: "Verification required" }, { status: 403 });

  const intros = memoryStore.introductions.getByUser(user.uid);
  const profiles = await getAdminUserDocuments(intros.flatMap((intro) => [
    intro.requesterId,
    intro.connectorId,
    intro.targetId,
  ]));

  const enriched = intros.map((intro) => ({
    ...intro,
    requester: {
      displayName: intro.requesterId === user.uid ? user.displayName : profiles.get(intro.requesterId)?.displayName ?? "Member",
      photoURL: intro.requesterId === user.uid ? user.photoURL : profiles.get(intro.requesterId)?.photoURL ?? null,
    },
    connector: {
      displayName: profiles.get(intro.connectorId)?.displayName ?? "Connector",
      photoURL: profiles.get(intro.connectorId)?.photoURL ?? null,
    },
    target: {
      displayName: profiles.get(intro.targetId)?.displayName ?? "Member",
      photoURL: profiles.get(intro.targetId)?.photoURL ?? null,
    },
  }));

  return NextResponse.json({ introductions: enriched });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.verificationStatus !== "verified" && user.role !== "admin") return NextResponse.json({ error: "Verification required" }, { status: 403 });

  const { connectorId, targetId, context } = (await request.json()) as {
    connectorId?: string;
    targetId?: string;
    context?: string;
  };

  if (!connectorId || !targetId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (connectorId === targetId || connectorId === user.uid || targetId === user.uid) {
    return NextResponse.json({ error: "Choose two different alumni" }, { status: 400 });
  }
  const [connector, target] = await Promise.all([
    getAdminUserDocument(connectorId),
    getAdminUserDocument(targetId),
  ]);
  if (
    !connector ||
    !target ||
    connector.verificationStatus !== "verified" ||
    target.verificationStatus !== "verified"
  ) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const aiMessage = generateIntroductionMessage({
    requesterName: user.displayName ?? "Member",
    connectorName: connector?.displayName ?? "Connector",
    targetName: target?.displayName ?? "Member",
    context,
    requesterHeadline: user.headline ?? undefined,
    targetHeadline: target?.headline,
  });

  const intro = {
    id: generateId("intro"),
    requesterId: user.uid,
    connectorId,
    targetId,
    status: "pending" as const,
    message: context ?? "",
    aiGeneratedMessage: aiMessage,
    context,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    timeline: [
      {
        id: generateId("tl"),
        status: "pending" as const,
        label: "Request sent",
        description: "Waiting for connector approval",
        timestamp: new Date().toISOString(),
      },
    ],
  };

  memoryStore.introductions.set(intro);
  return NextResponse.json({ introduction: intro });
}
