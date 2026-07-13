import { NextResponse, type NextRequest } from "next/server";
import { AUTH_ROUTES, PROTECTED_ROUTE_PREFIX, SESSION_COOKIE_NAME } from "@/lib/constants/auth";

function isProtectedPath(pathname: string): boolean {
  return (
    pathname === PROTECTED_ROUTE_PREFIX ||
    pathname.startsWith(`${PROTECTED_ROUTE_PREFIX}/`)
  );
}

function isVerifyEmailPath(pathname: string): boolean {
  return pathname === AUTH_ROUTES.verifyEmail;
}

// ✅ SIMPLE SAFE CHECK (no Node.js code)
function hasValidSessionCookie(request: NextRequest): boolean {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  return !!session; // only checks if cookie exists
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = hasValidSessionCookie(request);

  if (isProtectedPath(pathname) && !isAuthenticated) {
    const loginUrl = new URL(AUTH_ROUTES.login, request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isVerifyEmailPath(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.login, request.url));
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
