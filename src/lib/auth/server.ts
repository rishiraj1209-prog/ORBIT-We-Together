import { cookies } from "next/headers";
import { isCollegeEmail } from "@/lib/constants/auth";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";
import {
  getSessionCookieFromRequest,
  SESSION_COOKIE_NAME,
  verifyFirebasePublicIdToken,
  verifySessionCookie,
} from "@/lib/auth/session";
import type { AuthUser } from "@/types/auth";
import { verifyDemoSession } from "@/lib/auth/demo";

const ONBOARDING_COOKIE = "orbit_onboarded";

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!isFirebaseAdminConfigured()) {
    const sessionCookie = await getSessionCookieFromRequest();
    if (!sessionCookie) return null;
    const demoUser = await verifyDemoSession(sessionCookie);
    if (demoUser) return demoUser;
    try {
      const decoded = await verifyFirebasePublicIdToken(sessionCookie);
      const email = decoded.email;
      if (!email || !isCollegeEmail(email)) return null;
      const cookieStore = await cookies();
      const onboardedUid = cookieStore.get(ONBOARDING_COOKIE)?.value;
      return {
        uid: decoded.uid,
        email,
        displayName: decoded.name ?? null,
        photoURL: decoded.picture ?? null,
        emailVerified: decoded.email_verified ?? false,
        role: "alumni",
        verificationStatus: "pending",
        onboardingComplete: onboardedUid === decoded.uid,
      };
    } catch {
      return null;
    }
  }

  const sessionCookie = await getSessionCookieFromRequest();
  if (!sessionCookie) return null;

  try {
    const decoded = await verifySessionCookie(sessionCookie);
    const email = decoded.email;

    if (!email || !isCollegeEmail(email)) {
      return null;
    }

    const { getAdminUserDocument } = await import("@/lib/firebase/admin-users");
    const userDoc = await getAdminUserDocument(decoded.uid);
    const cookieStore = await cookies();
    const onboardedUid = cookieStore.get(ONBOARDING_COOKIE)?.value;

    return {
      uid: decoded.uid,
      email,
      displayName: userDoc?.displayName ?? decoded.name ?? null,
      photoURL: userDoc?.photoURL ?? decoded.picture ?? null,
      emailVerified: decoded.email_verified ?? false,
      role: userDoc?.role ?? "alumni",
      verificationStatus: userDoc?.verificationStatus ?? "pending",
      onboardingComplete: userDoc?.onboardingComplete ?? onboardedUid === decoded.uid,
      headline: userDoc?.headline,
      profileCompleteness: userDoc?.profileCompleteness,
      skills: userDoc?.skills,
      industry: userDoc?.industry,
    };
  } catch {
    return null;
  }
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
