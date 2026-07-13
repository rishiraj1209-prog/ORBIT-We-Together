import { cookies } from "next/headers";
import type { DecodedIdToken } from "firebase-admin/auth";
import { getAdminAuth } from "@/lib/firebase/admin";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_MS,
} from "@/lib/constants/auth";

export async function createSessionCookie(idToken: string): Promise<string> {
  return getAdminAuth().createSessionCookie(idToken, {
    expiresIn: SESSION_MAX_AGE_MS,
  });
}

export async function verifySessionCookie(
  sessionCookie: string
): Promise<DecodedIdToken> {
  return getAdminAuth().verifySessionCookie(sessionCookie, true);
}

export async function verifyIdToken(idToken: string): Promise<DecodedIdToken> {
  return getAdminAuth().verifyIdToken(idToken);
}

export async function revokeUserSessions(uid: string): Promise<void> {
  await getAdminAuth().revokeRefreshTokens(uid);
}

export function getSessionCookieOptions(maxAgeMs: number = SESSION_MAX_AGE_MS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: Math.floor(maxAgeMs / 1000),
  } as const;
}

export { SESSION_COOKIE_NAME };

export async function getSessionCookieFromRequest(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

export function parseSessionExpiry(sessionCookie: string): number | null {
  try {
    const parts = sessionCookie.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(
      Buffer.from(parts[1]!, "base64url").toString("utf8")
    ) as { exp?: number };

    return typeof payload.exp === "number" ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

export function isSessionCookieExpired(sessionCookie: string): boolean {
  const expiry = parseSessionExpiry(sessionCookie);
  if (!expiry) return true;
  return Date.now() >= expiry;
}
