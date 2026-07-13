import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import {
  memoryStore,
  generateId,
  seedInitialConnections,
} from "@/lib/data/memory-store";
import { getSeedAlumniById } from "@/lib/data/seed-alumni";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  seedInitialConnections(user.uid);
  const connections = memoryStore.connections.getByUser(user.uid);

  const enriched = connections.map((c) => {
    const otherUid = c.fromUid === user.uid ? c.toUid : c.fromUid;
    const profile = getSeedAlumniById(otherUid);
    return {
      ...c,
      profile: profile
        ? { displayName: profile.displayName, photoURL: profile.photoURL, headline: profile.headline }
        : null,
    };
  });

  return NextResponse.json({ connections: enriched });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { toUid, message } = (await request.json()) as { toUid?: string; message?: string };
  if (!toUid) return NextResponse.json({ error: "Missing toUid" }, { status: 400 });

  const conn = {
    id: generateId("conn"),
    fromUid: user.uid,
    toUid,
    status: "pending" as const,
    message,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  memoryStore.connections.set(conn);
  return NextResponse.json({ connection: conn });
}
