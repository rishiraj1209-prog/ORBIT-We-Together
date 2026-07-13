import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { getSeedAlumniById } from "@/lib/data/seed-alumni";
import { getAdminUserDocument } from "@/lib/firebase/admin-users";
import { userDocumentToAlumniProfile } from "@/lib/firebase/profile";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  if (id.startsWith("seed-")) {
    const profile = getSeedAlumniById(id);
    if (!profile) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ profile });
  }

  if (isFirebaseAdminConfigured()) {
    const doc = await getAdminUserDocument(id);
    if (doc) return NextResponse.json({ profile: userDocumentToAlumniProfile(doc) });
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
