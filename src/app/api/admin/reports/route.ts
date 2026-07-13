import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { memoryStore } from "@/lib/data/memory-store";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const reports = memoryStore.reports.getAll();
  return NextResponse.json({ reports });
}
