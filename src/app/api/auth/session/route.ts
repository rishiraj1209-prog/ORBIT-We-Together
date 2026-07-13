import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { upsertAdminUserDocument } from "@/lib/firebase/admin-users";
import { isCollegeEmail } from "@/lib/constants/auth";
import {
  checkRateLimit,
  rateLimitHeaders,
} from "@/lib/auth/rate-limit";
import {
  createSessionCookie,
  getSessionCookieOptions,
  revokeUserSessions,
  SESSION_COOKIE_NAME,
  verifyIdToken,
} from "@/lib/auth/session";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";

export const runtime = "nodejs";

const sessionBodySchema = z.object({
  idToken: z.string().min(1),
});

export async function POST(request: NextRequest) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json(
      { error: "Authentication service is not configured." },
      { status: 503 }
    );
  }

  const rateLimit = checkRateLimit(request, "auth-session-post");
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: rateLimitHeaders(rateLimit) }
    );
  }

  try {
    const body = sessionBodySchema.parse(await request.json());
    const decoded = await verifyIdToken(body.idToken);
    const email = decoded.email;

    if (!email) {
      return NextResponse.json(
        { error: "Account must have an email address." },
        { status: 400, headers: rateLimitHeaders(rateLimit) }
      );
    }

    if (!isCollegeEmail(email)) {
      return NextResponse.json(
        { error: "Please use your official college email address." },
        { status: 403, headers: rateLimitHeaders(rateLimit) }
      );
    }

    await upsertAdminUserDocument({
      uid: decoded.uid,
      email,
      displayName: decoded.name ?? null,
      photoURL: decoded.picture ?? null,
      emailVerified: decoded.email_verified ?? false,
    });

    const sessionCookie = await createSessionCookie(body.idToken);
    const response = NextResponse.json(
      {
        success: true,
        emailVerified: decoded.email_verified ?? false,
      },
      { headers: rateLimitHeaders(rateLimit) }
    );

    response.cookies.set(
      SESSION_COOKIE_NAME,
      sessionCookie,
      getSessionCookieOptions()
    );
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request." },
        { status: 400, headers: rateLimitHeaders(rateLimit) }
      );
    }

    return NextResponse.json(
      { error: "Invalid or expired credentials." },
      { status: 401, headers: rateLimitHeaders(rateLimit) }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!isFirebaseAdminConfigured()) {
    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE_NAME, "", {
      ...getSessionCookieOptions(0),
      maxAge: 0,
    });
    response.cookies.set("orbit_onboarded", "", {
      ...getSessionCookieOptions(0),
      maxAge: 0,
    });
    return response;
  }

  const rateLimit = checkRateLimit(request, "auth-session-delete");

  try {
    const sessionCookie = request.cookies.get("orbit_session")?.value;
    if (sessionCookie) {
      const { verifySessionCookie } = await import("@/lib/auth/session");
      const decoded = await verifySessionCookie(sessionCookie);
      await revokeUserSessions(decoded.uid);
    }
  } catch {
    // Best-effort revocation
  }

  const response = NextResponse.json(
    { success: true },
    { headers: rateLimitHeaders(rateLimit) }
  );
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    ...getSessionCookieOptions(0),
    maxAge: 0,
  });
  return response;
}
