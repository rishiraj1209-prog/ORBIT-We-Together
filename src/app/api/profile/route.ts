import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";
import { z } from "zod";

export const runtime = "nodejs";

const profileUpdateSchema = z.object({
  displayName: z.string().trim().min(1).max(100).optional(),
  headline: z.string().trim().max(160).optional(),
  bio: z.string().trim().max(2_000).optional(),
  location: z.string().trim().max(120).optional(),
  industry: z.string().trim().max(120).optional(),
  skills: z.array(z.string().trim().min(1).max(80)).max(50).optional(),
}).strict();

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

  const result = profileUpdateSchema.safeParse(await request.json());
  if (!result.success) {
    return NextResponse.json({ error: "Invalid profile update." }, { status: 400 });
  }
  const { updateUserProfile, userDocumentToAlumniProfile } = await import(
    "@/lib/firebase/profile"
  );
  const updated = await updateUserProfile(user.uid, result.data);
  return NextResponse.json({ profile: userDocumentToAlumniProfile(updated) });
}
