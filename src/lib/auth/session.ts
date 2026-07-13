import { cookies } from "next/headers";
import { decodeProtectedHeader, importX509, jwtVerify } from "jose";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_MS,
} from "@/lib/constants/auth";

export type VerifiedFirebaseToken = {
  uid: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
  [claim: string]: unknown;
};

export async function createSessionCookie(idToken: string): Promise<string> {
  const { getAdminAuth } = await import("@/lib/firebase/admin");
  return getAdminAuth().createSessionCookie(idToken, {
    expiresIn: SESSION_MAX_AGE_MS,
  });
}

export async function verifySessionCookie(
  sessionCookie: string
): Promise<VerifiedFirebaseToken> {
  const { getAdminAuth } = await import("@/lib/firebase/admin");
  return getAdminAuth().verifySessionCookie(sessionCookie, true);
}

export async function verifyIdToken(
  idToken: string
): Promise<VerifiedFirebaseToken> {
  const { getAdminAuth } = await import("@/lib/firebase/admin");
  return getAdminAuth().verifyIdToken(idToken);
}

const FIREBASE_CERTS_URL =
  "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";
const certCache = new Map<string, { cert: string; expiresAt: number }>();

/**
 * Verifies a Firebase ID token without service-account credentials.
 * Firebase signs ID tokens with Google's rotating public certificates, so this
 * remains cryptographically verified and is safe for non-Google server hosts.
 */
export async function verifyFirebasePublicIdToken(
  idToken: string
): Promise<VerifiedFirebaseToken> {
  const projectId =
    process.env.FIREBASE_PROJECT_ID ??
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) throw new Error("Firebase project ID is not configured.");

  const { kid, alg } = decodeProtectedHeader(idToken);
  if (!kid || alg !== "RS256") throw new Error("Invalid Firebase token header.");

  let cached = certCache.get(kid);
  if (!cached || cached.expiresAt <= Date.now()) {
    const response = await fetch(FIREBASE_CERTS_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load Firebase signing certificates.");
    const certificates = (await response.json()) as Record<string, string>;
    const maxAgeMatch = response.headers.get("cache-control")?.match(/max-age=(\d+)/);
    const maxAge = Number(maxAgeMatch?.[1] ?? 3600);
    for (const [keyId, cert] of Object.entries(certificates)) {
      certCache.set(keyId, { cert, expiresAt: Date.now() + maxAge * 1000 });
    }
    cached = certCache.get(kid);
  }

  if (!cached) throw new Error("Unknown Firebase signing certificate.");
  const publicKey = await importX509(cached.cert, "RS256");
  const { payload } = await jwtVerify(idToken, publicKey, {
    algorithms: ["RS256"],
    audience: projectId,
    issuer: `https://securetoken.google.com/${projectId}`,
  });

  if (!payload.sub) throw new Error("Firebase token has no subject.");
  if (typeof payload.auth_time !== "number" || typeof payload.firebase !== "object") {
    throw new Error("Firebase token is missing required claims.");
  }
  return {
    ...payload,
    uid: payload.sub,
    email: typeof payload.email === "string" ? payload.email : undefined,
    email_verified: payload.email_verified === true,
    name: typeof payload.name === "string" ? payload.name : undefined,
    picture: typeof payload.picture === "string" ? payload.picture : undefined,
  } as VerifiedFirebaseToken;
}

export async function revokeUserSessions(uid: string): Promise<void> {
  const { getAdminAuth } = await import("@/lib/firebase/admin");
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
