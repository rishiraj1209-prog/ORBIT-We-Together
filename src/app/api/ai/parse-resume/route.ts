import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { parseResumeText } from "@/lib/ai/profile";

export const runtime = "nodejs";

const MAX_RESUME_BYTES = 256 * 1024;
const MAX_RESUME_TEXT = 100_000;

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const contentType = request.headers.get("content-type") ?? "";
  let text = "";
  let fileName = "resume.txt";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (file) {
      if (file.size > MAX_RESUME_BYTES || file.type !== "text/plain") {
        return NextResponse.json({ error: "Use a plain-text resume smaller than 256 KB." }, { status: 400 });
      }
      text = await file.text();
      fileName = file.name;
    }
  } else {
    const body = (await request.json()) as { text?: string; fileName?: string };
    text = body.text ?? "";
    fileName = body.fileName ?? "resume.txt";
  }

  if (text.length > MAX_RESUME_TEXT) {
    return NextResponse.json({ error: "Resume text is too long." }, { status: 400 });
  }

  if (!text.trim()) {
    return NextResponse.json({ error: "Resume text is required." }, { status: 400 });
  }

  await new Promise((r) => setTimeout(r, 1200));
  const parsed = parseResumeText(text, fileName);
  return NextResponse.json(parsed);
}
