import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (id !== user.uid && user.verificationStatus !== "verified" && user.role !== "admin") {
    return NextResponse.json({ error: "Verification required" }, { status: 403 });
  }

  const [{ getAdminUserDocument }, { userDocumentToAlumniProfile }] =
    await Promise.all([
      import("@/lib/firebase/admin-users"),
      import("@/lib/firebase/profile"),
    ]);
  const doc = await getAdminUserDocument(id);
  if (
    doc &&
    (id === user.uid || user.role === "admin" || doc.verificationStatus === "verified")
  ) {
    return NextResponse.json({ profile: userDocumentToAlumniProfile(doc) });
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
