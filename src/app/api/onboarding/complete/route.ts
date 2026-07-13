import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { getSessionCookieOptions } from "@/lib/auth/session";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";
import { z } from "zod";

export const runtime = "nodejs";

const ONBOARDING_COOKIE = "orbit_onboarded";
const safeWebUrl = z.string().trim().max(2_048).refine(
  (value) => value === "" || value.startsWith("https://"),
  "Only secure HTTPS URLs are allowed."
);
const safePhotoUrl = z.string().trim().max(750_000).refine(
  (value) =>
    value === "" ||
    value.startsWith("https://") ||
    /^data:image\/(jpeg|png|webp);base64,/i.test(value),
  "Invalid profile image."
);

const bodySchema = z.object({
  displayName: z.string().trim().min(1).max(100).optional(),
  role: z.enum(["alumni", "student"]).optional(),
  headline: z.string().trim().max(160).optional(),
  bio: z.string().trim().max(2_000).optional(),
  aiSummary: z.string().trim().max(2_000).optional(),
  skills: z.array(z.string().trim().min(1).max(80)).max(50).optional(),
  experience: z.array(z.object({
    id: z.string(),
    title: z.string(),
    company: z.string(),
    location: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean().optional(),
    description: z.string().max(2_000).optional(),
  })).max(30).optional(),
  education: z.array(z.object({
    id: z.string(),
    school: z.string(),
    degree: z.string(),
    field: z.string().optional(),
    startYear: z.number().optional(),
    endYear: z.number().optional(),
  })).max(20).optional(),
  location: z.string().trim().max(120).optional(),
  industry: z.string().trim().max(120).optional(),
  graduationYear: z.number().int().min(1940).max(2100).optional(),
  batch: z.string().trim().max(40).optional(),
  department: z.string().trim().max(120).optional(),
  photoURL: safePhotoUrl.optional(),
  resumeUrl: safeWebUrl.optional(),
  socialLinks: z.object({
    linkedin: safeWebUrl.optional(),
    twitter: safeWebUrl.optional(),
    github: safeWebUrl.optional(),
    website: safeWebUrl.optional(),
  }).strict().optional(),
}).strict();

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = bodySchema.parse(await request.json());

    if (isFirebaseAdminConfigured()) {
      const { completeOnboarding } = await import("@/lib/firebase/profile");
      const updated = await completeOnboarding(user.uid, body);
      const response = NextResponse.json({ success: true, user: updated });
      response.cookies.set(ONBOARDING_COOKIE, user.uid, {
        ...getSessionCookieOptions(),
        maxAge: 60 * 60 * 24 * 365,
      });
      return response;
    }

    const response = NextResponse.json({ success: true, onboardingComplete: true });
    response.cookies.set(ONBOARDING_COOKIE, user.uid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
