import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import {
  memoryStore,
  generateId,
  seedInitialIntroductions,
} from "@/lib/data/memory-store";
import { generateIntroductionMessage } from "@/lib/ai/compose";
import { getSeedAlumniById } from "@/lib/data/seed-alumni";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  seedInitialIntroductions(user.uid);
  const intros = memoryStore.introductions.getByUser(user.uid);

  const enriched = intros.map((intro) => ({
    ...intro,
    requester: {
      displayName: intro.requesterId === user.uid ? user.displayName : getSeedAlumniById(intro.requesterId)?.displayName ?? "Member",
      photoURL: intro.requesterId === user.uid ? user.photoURL : getSeedAlumniById(intro.requesterId)?.photoURL ?? null,
    },
    connector: {
      displayName: getSeedAlumniById(intro.connectorId)?.displayName ?? "Connector",
      photoURL: getSeedAlumniById(intro.connectorId)?.photoURL ?? null,
    },
    target: {
      displayName: getSeedAlumniById(intro.targetId)?.displayName ?? "Member",
      photoURL: getSeedAlumniById(intro.targetId)?.photoURL ?? null,
    },
  }));

  return NextResponse.json({ introductions: enriched });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { connectorId, targetId, context } = (await request.json()) as {
    connectorId?: string;
    targetId?: string;
    context?: string;
  };

  if (!connectorId || !targetId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const connector = getSeedAlumniById(connectorId);
  const target = getSeedAlumniById(targetId);

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
