import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";
import type { UserDocument } from "@/types/user";

export const runtime = "nodejs";

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
  return NextResponse.json({ users });
}
