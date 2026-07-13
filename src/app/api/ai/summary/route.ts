import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { generateProfileSummary } from "@/lib/ai/profile";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    displayName?: string;
    headline?: string;
    skills?: string[];
    industry?: string;
    role?: string;
  };

  const summary = generateProfileSummary({
    displayName: body.displayName ?? user.displayName ?? "Member",
    headline: body.headline,
    skills: body.skills ?? [],
    industry: body.industry,
    role: body.role,
  });

  return NextResponse.json({ summary });
}
