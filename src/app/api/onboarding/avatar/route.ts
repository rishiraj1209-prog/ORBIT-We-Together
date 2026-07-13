import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { updateUserProfile } from "@/lib/firebase/profile";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  const photoURL = `data:${file.type};base64,${base64}`;

  if (isFirebaseAdminConfigured()) {
    await updateUserProfile(user.uid, { photoURL });
  }

  return NextResponse.json({ photoURL });
}
