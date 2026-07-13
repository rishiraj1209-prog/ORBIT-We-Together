import { SignJWT, jwtVerify } from "jose";
import type { AuthUser } from "@/types/auth";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";

const issuer = "orbit-local-development";

function demoSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET ?? "orbit-local-development-session-key-change-me";
  return new TextEncoder().encode(secret);
}

export function isDemoAuthEnabled(): boolean {
  return process.env.NODE_ENV !== "production" && !isFirebaseAdminConfigured();
}

export async function createDemoSession(): Promise<string> {
  if (!isDemoAuthEnabled()) throw new Error("Demo authentication is disabled.");
  return new SignJWT({
    email: "demo@orbit.local",
    name: "Alex Morgan",
    email_verified: true,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("orbit-demo-member")
    .setIssuer(issuer)
    .setIssuedAt()
    .setExpirationTime("14d")
    .sign(demoSecret());
}

export async function verifyDemoSession(token: string): Promise<AuthUser | null> {
  if (!isDemoAuthEnabled()) return null;
  try {
    const { payload } = await jwtVerify(token, demoSecret(), { issuer });
    if (!payload.sub || typeof payload.email !== "string") return null;
    return {
      uid: payload.sub,
      email: payload.email,
      displayName: typeof payload.name === "string" ? payload.name : "Orbit Member",
      photoURL: null,
      emailVerified: true,
      role: "alumni",
      verificationStatus: "verified",
      onboardingComplete: true,
      headline: "Building meaningful things with remarkable people",
      profileCompleteness: 92,
      skills: ["Product Strategy", "Community", "Artificial Intelligence"],
      industry: "Technology",
    };
  } catch {
    return null;
  }
}
