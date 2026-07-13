import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { listAllUsers, updateUserVerification } from "@/lib/firebase/profile";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";
import { SEED_ALUMNI } from "@/lib/data/seed-alumni";
import type { UserDocument } from "@/types/user";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let users: UserDocument[] = [];
  if (isFirebaseAdminConfigured()) {
    users = await listAllUsers();
  }

  const pending = users.filter((u) => u.verificationStatus === "pending").length;

  return NextResponse.json({
    analytics: {
      totalUsers: users.length + SEED_ALUMNI.length,
      verifiedUsers: users.filter((u) => u.verificationStatus === "verified").length + SEED_ALUMNI.length,
      pendingVerifications: pending,
      activeToday: 47,
      totalConnections: 156,
      totalIntroductions: 34,
      totalMessages: 892,
      signupTrend: [
        { date: "Mon", count: 12 },
        { date: "Tue", count: 18 },
        { date: "Wed", count: 15 },
        { date: "Thu", count: 22 },
        { date: "Fri", count: 28 },
        { date: "Sat", count: 8 },
        { date: "Sun", count: 5 },
      ],
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
    await updateUserVerification(uid, status);
  }

  return NextResponse.json({ success: true });
}
