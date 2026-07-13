import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { extractSkillsFromText } from "@/lib/ai/profile";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { text } = (await request.json()) as { text?: string };
  const skills = extractSkillsFromText(text ?? "");
  return NextResponse.json({ skills });
}
