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

  const connections = memoryStore.connections.getByUser(user.uid);
  const profiles = await getAdminUserDocuments(connections.map((connection) =>
    connection.fromUid === user.uid ? connection.toUid : connection.fromUid
  ));

  const enriched = connections.map((c) => {
    const otherUid = c.fromUid === user.uid ? c.toUid : c.fromUid;
    const profile = profiles.get(otherUid);
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
  if (user.verificationStatus !== "verified" && user.role !== "admin") return NextResponse.json({ error: "Verification required" }, { status: 403 });

  const { toUid, message } = (await request.json()) as { toUid?: string; message?: string };
  if (!toUid) return NextResponse.json({ error: "Missing toUid" }, { status: 400 });
  if (toUid === user.uid) return NextResponse.json({ error: "You cannot connect with yourself" }, { status: 400 });
  const target = await getAdminUserDocument(toUid);
  if (!target || target.verificationStatus !== "verified") {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

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
