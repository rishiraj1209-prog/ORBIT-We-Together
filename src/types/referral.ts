export interface ReferralStats {
  referralCode: string;
  totalReferrals: number;
  pendingReferrals: number;
  convertedReferrals: number;
  rank: number;
  points: number;
}

export interface ReferralEntry {
  id: string;
  referrerId: string;
  referredEmail: string;
  referredName?: string;
  status: "pending" | "signed_up" | "verified";
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  uid: string;
  displayName: string;
  photoURL: string | null;
  referralCount: number;
  points: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-referral",
    title: "Network Starter",
    description: "Refer your first alumni",
    icon: "users",
    unlocked: false,
    maxProgress: 1,
  },
  {
    id: "five-referrals",
    title: "Community Builder",
    description: "Refer 5 alumni to Orbit",
    icon: "trophy",
    unlocked: false,
    maxProgress: 5,
  },
  {
    id: "first-intro",
    title: "Connector",
    description: "Make your first warm introduction",
    icon: "handshake",
    unlocked: false,
    maxProgress: 1,
  },
  {
    id: "profile-complete",
    title: "All Star",
    description: "Complete your profile 100%",
    icon: "star",
    unlocked: false,
    maxProgress: 100,
  },
  {
    id: "ten-connections",
    title: "Super Connector",
    description: "Build 10 connections",
    icon: "network",
    unlocked: false,
    maxProgress: 10,
  },
];
