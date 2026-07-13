import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { semanticSearch } from "@/lib/ai/matching";
import { listDirectoryProfiles } from "@/lib/firebase/profile";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const q = request.nextUrl.searchParams.get("q") ?? "";
  const profiles = await listDirectoryProfiles();
  const availableProfiles = profiles.filter((profile) => profile.uid !== user.uid);
  const results = q ? semanticSearch(q, availableProfiles) : availableProfiles;
  return NextResponse.json({ results, query: q });
}
