import { NextResponse, type NextRequest } from "next/server";
import {
  AUTH_ROUTES,
  PROTECTED_ROUTE_PREFIX,
  SESSION_COOKIE_NAME,
} from "@/lib/constants/auth";

function isProtectedPath(pathname: string): boolean {
  return (
    pathname === PROTECTED_ROUTE_PREFIX ||
    pathname.startsWith(`${PROTECTED_ROUTE_PREFIX}/`)
  );
}

function isVerifyEmailPath(pathname: string): boolean {
  return pathname === AUTH_ROUTES.verifyEmail;
}

function hasUsableSessionCookie(request: NextRequest): boolean {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!session) return false;

  try {
    const parts = session.split(".");
    if (parts.length !== 3) return false;
    const payload = JSON.parse(
      Buffer.from(parts[1]!, "base64url").toString("utf8")
    ) as { exp?: number };
    return typeof payload.exp === "number" && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

function redirectToLogin(request: NextRequest, includeReturnPath: boolean) {
  const loginUrl = new URL(AUTH_ROUTES.login, request.url);
  if (includeReturnPath) loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = hasUsableSessionCookie(request);

  if (isProtectedPath(pathname) && !hasSession) {
    return redirectToLogin(request, true);
  }

  if (isVerifyEmailPath(pathname) && !hasSession) {
    return redirectToLogin(request, false);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/app/:path*",
    "/onboarding",
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-email",
  ],
};
