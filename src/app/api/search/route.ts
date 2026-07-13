import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { semanticSearch } from "@/lib/ai/matching";
import { SEED_ALUMNI } from "@/lib/data/seed-alumni";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const q = request.nextUrl.searchParams.get("q") ?? "";
  const results = q ? semanticSearch(q, SEED_ALUMNI) : SEED_ALUMNI;
  return NextResponse.json({ results, query: q });
}
