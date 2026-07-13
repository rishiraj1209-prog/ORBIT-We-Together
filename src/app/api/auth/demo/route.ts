import { NextResponse } from "next/server";
import { createDemoSession, isDemoAuthEnabled } from "@/lib/auth/demo";
import { getSessionCookieOptions, SESSION_COOKIE_NAME } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST() {
  if (!isDemoAuthEnabled()) {
    return NextResponse.json({ error: "Demo authentication is unavailable." }, { status: 404 });
  }
  const session = await createDemoSession();
  const response = NextResponse.json({ success: true, redirectTo: "/app" });
  response.cookies.set(SESSION_COOKIE_NAME, session, getSessionCookieOptions());
  response.cookies.set("orbit_onboarded", "orbit-demo-member", {
    ...getSessionCookieOptions(),
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}
