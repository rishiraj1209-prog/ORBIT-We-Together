import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { listAllUsers } from "@/lib/firebase/profile";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = isFirebaseAdminConfigured() ? await listAllUsers() : [];
  return NextResponse.json({ users });
}
