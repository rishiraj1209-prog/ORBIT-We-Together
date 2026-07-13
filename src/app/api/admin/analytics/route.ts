import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";
import { memoryStore } from "@/lib/data/memory-store";
import type { UserDocument } from "@/types/user";

export const runtime = "nodejs";

function toDate(value: unknown): Date | null {
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (value && typeof value === "object" && "toDate" in value) {
    const converter = (value as { toDate?: () => Date }).toDate;
    return typeof converter === "function" ? converter.call(value) : null;
  }
  return null;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let users: UserDocument[] = [];
  if (isFirebaseAdminConfigured()) {
    const { listAllUsers } = await import("@/lib/firebase/profile");
    users = await listAllUsers();
  }

  const pending = users.filter((u) => u.verificationStatus === "pending").length;

  return NextResponse.json({
    analytics: {
      totalUsers: users.length,
      verifiedUsers: users.filter((u) => u.verificationStatus === "verified").length,
      pendingVerifications: pending,
      activeToday: users.filter((u) => {
        const activeAt = toDate(u.lastActiveAt);
        return activeAt && Date.now() - activeAt.getTime() < 86_400_000;
      }).length,
      totalConnections: memoryStore.connections.getAll().length,
      totalIntroductions: memoryStore.introductions.getAll().length,
      totalMessages: memoryStore.messages.getAll().length,
      signupTrend: Array.from({ length: 7 }, (_, offset) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - offset));
        const day = date.toISOString().slice(0, 10);
        return { date: date.toLocaleDateString("en", { weekday: "short" }), count: users.filter((u) => toDate(u.createdAt)?.toISOString().slice(0, 10) === day).length };
      }),
    },
  });
}

export async function PATCH(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { uid, status } = (await request.json()) as {
    uid?: string;
    status?: "verified" | "rejected" | "pending";
  };

  if (!uid || !status) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  if (isFirebaseAdminConfigured()) {
    const { updateUserVerification } = await import(
      "@/lib/firebase/profile"
    );
    await updateUserVerification(uid, status);
  }

  return NextResponse.json({ success: true });
}
