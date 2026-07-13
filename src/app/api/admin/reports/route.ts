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
  if (reports.length === 0) {
    return NextResponse.json({
      reports: [
        {
          id: "report-001",
          reporterId: "seed-005",
          targetId: "seed-010",
          targetType: "user" as const,
          reason: "Inappropriate profile content",
          status: "open" as const,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "report-002",
          reporterId: "seed-003",
          targetId: "msg-spam-001",
          targetType: "message" as const,
          reason: "Spam message",
          status: "open" as const,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
      ],
    });
  }

  return NextResponse.json({ reports });
}
