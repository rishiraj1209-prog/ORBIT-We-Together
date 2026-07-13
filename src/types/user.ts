import type { UserRole, VerificationStatus } from "@/types/index";
import type {
  Education,
  Experience,
  SocialLinks,
} from "@/types/profile";

export interface UserDocument {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  verificationStatus: VerificationStatus;
  emailVerified: boolean;
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt: string;
  headline?: string;
  bio?: string;
  aiSummary?: string;
  skills?: string[];
  experience?: Experience[];
  education?: Education[];
  socialLinks?: SocialLinks;
  location?: string;
  industry?: string;
  graduationYear?: number;
  batch?: string;
  department?: string;
  resumeUrl?: string;
  achievements?: string[];
  profileCompleteness?: number;
  referralCode?: string;
  referredBy?: string;
  referralCount?: number;
  lastActiveAt?: string;
}

export interface CreateUserInput {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export interface UpdateProfileInput {
  displayName?: string;
  headline?: string;
  bio?: string;
  aiSummary?: string;
  skills?: string[];
  experience?: Experience[];
  education?: Education[];
  socialLinks?: SocialLinks;
  location?: string;
  industry?: string;
  graduationYear?: number;
  batch?: string;
  department?: string;
  photoURL?: string;
  resumeUrl?: string;
  role?: UserRole;
  profileCompleteness?: number;
  onboardingComplete?: boolean;
}
