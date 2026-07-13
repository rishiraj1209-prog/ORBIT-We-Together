import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { getSessionCookieOptions } from "@/lib/auth/session";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";
import { z } from "zod";

export const runtime = "nodejs";

const ONBOARDING_COOKIE = "orbit_onboarded";

const bodySchema = z.object({
  displayName: z.string().optional(),
  role: z.enum(["alumni", "student"]).optional(),
  headline: z.string().optional(),
  bio: z.string().optional(),
  aiSummary: z.string().optional(),
  skills: z.array(z.string()).optional(),
  experience: z.array(z.object({
    id: z.string(),
    title: z.string(),
    company: z.string(),
    location: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean().optional(),
    description: z.string().optional(),
  })).optional(),
  education: z.array(z.object({
    id: z.string(),
    school: z.string(),
    degree: z.string(),
    field: z.string().optional(),
    startYear: z.number().optional(),
    endYear: z.number().optional(),
  })).optional(),
  location: z.string().optional(),
  industry: z.string().optional(),
  graduationYear: z.number().optional(),
  batch: z.string().optional(),
  department: z.string().optional(),
  photoURL: z.string().optional(),
  resumeUrl: z.string().optional(),
  socialLinks: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    github: z.string().optional(),
    website: z.string().optional(),
  }).optional(),
});

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
