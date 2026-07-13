import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";
import { checkRateLimit, rateLimitHeaders } from "@/lib/auth/rate-limit";

export const runtime = "nodejs";

const MAX_AVATAR_BYTES = 512 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function hasValidImageSignature(bytes: Uint8Array, type: string): boolean {
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/png") return bytes.slice(0, 8).every((byte, index) => byte === [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a][index]);
  if (type === "image/webp") return new TextDecoder().decode(bytes.slice(0, 4)) === "RIFF" && new TextDecoder().decode(bytes.slice(8, 12)) === "WEBP";
  return false;
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rateLimit = checkRateLimit(request, `avatar:${user.uid}`);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many uploads." }, { status: 429, headers: rateLimitHeaders(rateLimit) });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (!ALLOWED_IMAGE_TYPES.has(file.type) || file.size > MAX_AVATAR_BYTES) {
    return NextResponse.json({ error: "Use a JPEG, PNG, or WebP image smaller than 512 KB." }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  if (!hasValidImageSignature(new Uint8Array(buffer).slice(0, 12), file.type)) {
    return NextResponse.json({ error: "Invalid image file." }, { status: 400 });
  }
  const base64 = Buffer.from(buffer).toString("base64");
  const photoURL = `data:${file.type};base64,${base64}`;

  if (isFirebaseAdminConfigured()) {
    const { updateUserProfile } = await import("@/lib/firebase/profile");
    await updateUserProfile(user.uid, { photoURL });
  }

  return NextResponse.json({ photoURL }, { headers: rateLimitHeaders(rateLimit) });
}
