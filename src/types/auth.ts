import type { UserRole, VerificationStatus } from "@/types/index";

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  role: UserRole;
  verificationStatus: VerificationStatus;
  onboardingComplete: boolean;
  headline?: string;
  profileCompleteness?: number;
  skills?: string[];
  industry?: string;
}

export interface SessionUserClaims {
  uid: string;
  email?: string;
  email_verified?: boolean;
}

export type AuthLoadingState = "idle" | "loading" | "success" | "error";

export interface AuthError {
  code: string;
  message: string;
}
