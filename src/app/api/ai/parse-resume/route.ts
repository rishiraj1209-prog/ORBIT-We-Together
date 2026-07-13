import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { parseResumeText } from "@/lib/ai/profile";

export const runtime = "nodejs";

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
      text = await file.text();
      fileName = file.name;
    }
  } else {
    const body = (await request.json()) as { text?: string; fileName?: string };
    text = body.text ?? "";
    fileName = body.fileName ?? "resume.txt";
  }

  if (!text.trim()) {
    text = `Software Engineer at Tech Company (2020-present)\nB.S. Computer Science, University (2018)\nSkills: JavaScript, TypeScript, React, Node.js, Python, AWS`;
  }

  await new Promise((r) => setTimeout(r, 1200));
  const parsed = parseResumeText(text, fileName);
  return NextResponse.json(parsed);
}
