import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { getDefaultNotifications } from "@/lib/data/notifications";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ notifications: getDefaultNotifications(user.uid) });
}
