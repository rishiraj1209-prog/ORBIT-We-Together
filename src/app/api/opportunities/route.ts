import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { SEED_OPPORTUNITIES } from "@/lib/data/seed-opportunities";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ opportunities: SEED_OPPORTUNITIES });
}
