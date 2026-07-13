import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (isFirebaseAdminConfigured()) {
    const [{ getAdminUserDocument }, { userDocumentToAlumniProfile }] =
      await Promise.all([
        import("@/lib/firebase/admin-users"),
        import("@/lib/firebase/profile"),
      ]);
    const doc = await getAdminUserDocument(user.uid);
    if (doc) return NextResponse.json({ profile: userDocumentToAlumniProfile(doc) });
  }

  return NextResponse.json({
    profile: {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      skills: user.skills ?? [],
    },
  });
}

export async function PATCH(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ success: true });
  }

  const body = await request.json();
  const { updateUserProfile, userDocumentToAlumniProfile } = await import(
    "@/lib/firebase/profile"
  );
  const updated = await updateUserProfile(user.uid, body);
  return NextResponse.json({ profile: userDocumentToAlumniProfile(updated) });
}
