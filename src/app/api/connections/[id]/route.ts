import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { memoryStore } from "@/lib/data/memory-store";

export const runtime = "nodejs";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { status } = (await request.json()) as { status?: "accepted" | "declined" };
  const conn = memoryStore.connections.get(id);

  if (!conn) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (conn.toUid !== user.uid && conn.fromUid !== user.uid) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updated = {
    ...conn,
    status: status ?? conn.status,
    updatedAt: new Date().toISOString(),
  };
  memoryStore.connections.set(updated);
  return NextResponse.json({ connection: updated });
}
